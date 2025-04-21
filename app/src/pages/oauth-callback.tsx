import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShowTwoFactorModal } from '@/components/Common/TwoFactorModal';
import { RootStore } from '@/store';
import { ToastPlugin } from '@/store/module/Toast/Toast';
import { DialogStore } from '@/store/module/Dialog';
import { useTranslation } from 'react-i18next';
import { LoadingPage } from '@/components/Common/LoadingPage';
import { signIn, getTokenData } from '@/components/Auth/auth-client';
import { eventBus } from '@/lib/event';
import { UserStore } from '@/store/user';

export default function OAuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userStore = RootStore.Get(UserStore);
  
  const handleTwoFactorAuth = async (code: string) => {
    try {
      const params = new URLSearchParams(location.search);
      const userId = params.get('userId') || userStore.id;
      
      if (!userId) {
        RootStore.Get(ToastPlugin).error(t('verification-failed'));
        return { ok: false, error: 'Missing user ID' };
      }
      
      console.log('OAuth callback 处理两因素验证, userId:', userId);
      
      const res = await signIn('oauth-2fa', {
        userId: userId,
        twoFactorCode: code,
        callbackUrl: '/',
        redirect: false,
      });
      
      if (res && res.ok) {
        eventBus.emit('user:twoFactorResult', { success: true });
        const tokenData = await getTokenData();
        if (tokenData) {
          eventBus.emit('user:token', tokenData);
        }
        RootStore.Get(DialogStore).close();
        navigate('/');
      } else {
        eventBus.emit('user:twoFactorResult', {
          success: false,
          error: res?.error || t('invalid-2fa-code'),
        });
        RootStore.Get(ToastPlugin).error(res?.error || t('invalid-2fa-code'));
      }
      
      return res;
    } catch (error) {
      RootStore.Get(ToastPlugin).error(t('verification-failed'));
      return { ok: false, error: 'Failed to verify code' };
    }
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const errorMsg = params.get('error');
        const success = params.get('success');
        const requiresTwoFactor = params.get('requiresTwoFactor');
        const userId = params.get('userId');
        const token = params.get('token');
        
        if (errorMsg) {
          setError(errorMsg);
          RootStore.Get(ToastPlugin).error(`${t('login-failed')}: ${errorMsg}`);
          setTimeout(() => {
            navigate('/signin');
          }, 3000);
          return;
        }
        
        if (requiresTwoFactor === 'true' && userId) {
          userStore.tokenData.save({
            ...userStore.tokenData.value,
            requiresTwoFactor: true,
            user: {
              ...(userStore.tokenData.value?.user || {}),
              id: userId
            }
          });
          
          ShowTwoFactorModal(handleTwoFactorAuth, false);
          setIsLoading(false);
          return;
        }
        
        if (success === 'true') {
          if (token) {
            try {
              const tokenData = {
                user: {
                  id: userStore.id || '',
                },
                token: token
              };
              eventBus.emit('user:token', tokenData);
              
              const userData = await getTokenData();
              if (userData && userData.user && userData.user.id) {
                navigate('/');
              } else {
              }
            } catch (err) {
              RootStore.Get(ToastPlugin).error(t('login-failed'));
              navigate('/signin');
            }
            return;
          } else {
            const tokenData = await getTokenData();
            if (tokenData?.user) {
              navigate('/');
            } else {
              RootStore.Get(ToastPlugin).error(t('login-failed'));
              navigate('/signin');
            }
            return;
          }
        }
        
        const tokenData = await getTokenData();
        
        if (tokenData?.requiresTwoFactor) {
          ShowTwoFactorModal(handleTwoFactorAuth, false);
        } else if (tokenData?.user) {
          navigate('/');
        } else {
          RootStore.Get(ToastPlugin).error(t('login-failed'));
          navigate('/signin');
        }
        
        setIsLoading(false);
      } catch (error) {
        setError('handle oauth callback error');
        RootStore.Get(ToastPlugin).error(t('login-failed'));
        setTimeout(() => {
          navigate('/signin');
        }, 3000);
      }
    };

    const handleTwoFactorSubmit = (code: string) => {
      handleTwoFactorAuth(code);
    };
    
    eventBus.on('user:twoFactorSubmit', handleTwoFactorSubmit);
    
    checkAuthStatus();
    
    return () => {
      eventBus.off('user:twoFactorSubmit', handleTwoFactorSubmit);
    };
  }, [navigate, t, location]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="mb-4 text-3xl">😢</div>
        <h1 className="text-xl font-bold mb-2">{t('authentication-failed')}</h1>
        <p className="text-sm text-red-500 mb-4">{error}</p>
        <p>{t('redirecting-to-login')}...</p>
      </div>
    );
  }

  return <LoadingPage />;
} 
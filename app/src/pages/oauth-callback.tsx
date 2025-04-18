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
  const userStore = RootStore.Get(UserStore);
  
  // 处理两因素认证
  const handleTwoFactorAuth = async (code: string) => {
    try {
      // 从URL参数中获取用户ID
      const params = new URLSearchParams(location.search);
      const userId = params.get('userId') || userStore.id;
      
      if (!userId) {
        RootStore.Get(ToastPlugin).error(t('verification-failed'));
        return { ok: false, error: 'Missing user ID' };
      }
      
      const res = await signIn('oauth-2fa', {
        userId: userId,
        twoFactorCode: code,
        callbackUrl: '/',
        redirect: false,
      });
      
      if (res && res.ok) {
        eventBus.emit('user:twoFactorResult', { success: true });
        // 获取最新的用户会话数据
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
      console.error('OAuth 2FA验证错误:', error);
      RootStore.Get(ToastPlugin).error(t('verification-failed'));
      return { ok: false, error: 'Failed to verify code' };
    }
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // 解析URL参数
        const params = new URLSearchParams(location.search);
        const error = params.get('error');
        const success = params.get('success');
        const requiresTwoFactor = params.get('requiresTwoFactor');
        const userId = params.get('userId');
        
        // 如果有错误参数，显示错误信息并跳转回登录页
        if (error) {
          console.error('OAuth提供商返回错误:', error);
          RootStore.Get(ToastPlugin).error(`${t('login-failed')}: ${error}`);
          navigate('/signin');
          return;
        }
        
        // 处理两因素认证请求
        if (requiresTwoFactor === 'true' && userId) {
          console.log('需要两因素认证:', { userId });
          // 保存userId到UserStore，以便两因素认证验证时使用
          userStore.tokenData.save({
            ...userStore.tokenData.value,
            requiresTwoFactor: true,
            user: {
              ...userStore.tokenData.value?.user,
              id: userId
            }
          });
          
          // 显示两因素认证对话框
          ShowTwoFactorModal(handleTwoFactorAuth, false);
          setIsLoading(false);
          return;
        }
        
        // 登录成功直接跳转，或获取最新的会话数据
        if (success === 'true') {
          const tokenData = await getTokenData();
          if (tokenData?.user) {
            navigate('/');
          } else {
            RootStore.Get(ToastPlugin).error(t('login-failed'));
            navigate('/signin');
          }
          return;
        }
        
        // 尝试获取会话状态
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
        console.error('OAuth回调处理错误:', error);
        RootStore.Get(ToastPlugin).error(t('login-failed'));
        navigate('/signin');
      }
    };

    // 设置两因素认证事件监听
    const handleTwoFactorSubmit = (code: string) => {
      handleTwoFactorAuth(code);
    };
    
    eventBus.on('user:twoFactorSubmit', handleTwoFactorSubmit);
    
    // 页面加载时检查认证状态
    checkAuthStatus();
    
    return () => {
      eventBus.off('user:twoFactorSubmit', handleTwoFactorSubmit);
    };
  }, [navigate, t, location]);

  // 始终显示加载页面，路由跳转在useEffect中处理
  return <LoadingPage />;
} 
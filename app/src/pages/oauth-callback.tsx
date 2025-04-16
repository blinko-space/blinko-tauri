import { useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import { signIn } from 'next-auth/react';
import { ShowTwoFactorModal } from '@/components/Common/TwoFactorModal';
import { RootStore } from '@/store';
import { ToastPlugin } from '@/store/module/Toast/Toast';
import { useTranslation } from 'react-i18next';
import { LoadingPage } from '@/components/Common/LoadingPage';

export default function OAuthCallback() {
  return <></>
  const router = useRouter();
  // const { data: session } = useSession();
  const { t } = useTranslation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // @ts-ignore
        if (session?.requiresTwoFactor) {
          ShowTwoFactorModal(async (code) => {
            // const twoFactorRes = await signIn('oauth-2fa', {
            //   name: session.user?.name,
            //   twoFactorCode: code,
            //   callbackUrl: '/',
            //   redirect: false,
            // });
            // if (twoFactorRes?.ok) {
            //   RootStore.Get(DialogStore).close();
            //   router.push('/');
            // } else {
            //   RootStore.Get(ToastPlugin).error(twoFactorRes?.error ?? t('invalid-2fa-code'));
            // }
          }, false);
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('OAuth callback error:', error);
        RootStore.Get(ToastPlugin).error(t('login-failed'));
        router.push('/signin');
      }
    };

    if (session) {
      handleCallback();
    }
  }, [session, router, t]);

  return <LoadingPage />
} 
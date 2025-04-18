// import { User } from 'next-auth';
// import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { RootStore } from './root';
import { Store } from './standard/base';
import { eventBus } from '@/lib/event';
import { makeAutoObservable } from 'mobx';
import { PromiseState } from './standard/PromiseState';
import { api } from '@/lib/trpc';
import { BlinkoStore } from './blinkoStore';
import { BaseStore } from './baseStore';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';
import { useNavigate, useLocation } from 'react-router-dom';
import { signIn, TokenData, navigate } from '@/components/Auth/auth-client';
import { DialogStore } from './module/Dialog';
import { ShowTwoFactorModal } from '@/components/Common/TwoFactorModal';
import { ToastPlugin } from './module/Toast/Toast';
import { StorageState } from './standard/StorageState';



export class UserStore implements Store {
  sid = 'user';
  constructor() {
    makeAutoObservable(this)
  }
  tokenData = new StorageState<TokenData | null>({ key: 'blinkoToken', value: null });
  theme: any = 'light';
  isSetup: boolean = false;
  languageInitialized: boolean = false;
  themeInitialized: boolean = false;
  isHubInitialized: boolean = false;
  isUseAIInitialized: boolean = false;

  get id(): string {
    return this.tokenData.value?.user?.id || '';
  }

  get name(): string {
    return this.tokenData.value?.user?.name || '';
  }

  get nickname(): string {
    return this.tokenData.value?.user?.nickname || '';
  }

  get image(): string {
    return this.tokenData.value?.user?.image || '';
  }

  get role(): string {
    return this.tokenData.value?.user?.role || '';
  }

  get token(): string | null {
    return this.tokenData.value?.token || null;
  }

  get requiresTwoFactor(): boolean {
    return !!this.tokenData.value?.requiresTwoFactor;
  }

  wait() {
    return new Promise<UserStore>((res) => {
      if (this.id) {
        res(this);
      } else {
        //@ts-ignore
        this.event.once('user:ready', () => res(this));
      }
    });
  }

  get isSuperAdmin() {
    return this.role === 'superadmin';
  }

  static wait() {
    return RootStore.Get(UserStore).wait();
  }

  get isLogin() {
    return !!this.token;
  }

  get blinko() {
    return RootStore.Get(BlinkoStore);
  }

  userInfo = new PromiseState({
    function: async (id: number) => {
      return await api.users.detail.query({ id });
    }
  });

  canRegister = new PromiseState({
    function: async () => {
      return await api.users.canRegister.mutate();
    }
  });

  handleTwoFactorAuth = async (twoFactorCode: string) => {
    try {
      const res = await signIn('oauth-2fa', {
        userId: this.id,
        twoFactorCode,
        callbackUrl: '/',
        redirect: false,
      });

      if (res?.ok) {
        eventBus.emit('user:twoFactorResult', { success: true });
        return true;
      }

      eventBus.emit('user:twoFactorResult', {
        success: false,
        error: res?.error || 'Invalid verification code'
      });
      return false;
    } catch (error) {
      console.error('Failed to handle 2FA:', error);
      return false;
    }
  };

  setData(args: Partial<UserStore>) {
    Object.assign(this, args);
    eventBus.emit('user:ready', this);
  }

  ready(userData: any) {
    if (userData.token) {
      const tokenData: TokenData = {
        user: {
          id: userData.id,
          name: userData.name,
          nickname: userData.nickname,
          image: userData.image,
          role: userData.role
        },
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        requiresTwoFactor: userData.requiresTwoFactor,
        token: userData.token
      };
      this.tokenData.save(tokenData);
    }
    this.isSetup = true;
    eventBus.emit('user:ready', this);
  }

  clear() {
    this.tokenData.save(null);
    this.isSetup = false;
    localStorage.removeItem('token');
    eventBus.emit('user:clear', this);
  }

  updatePWAColor(theme: string) {
    const themeColor = theme === 'dark' ? '#1C1C1E' : '#F8F8F8';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor);
    document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')?.setAttribute('content', themeColor);
  }

  async initializeSettings(setTheme: (theme: string) => void, i18n: any) {
    const base = RootStore.Get(BaseStore);
    const config = await this.blinko.config.call();

    const handleFeatureRoute = (
      featureKey: 'hub' | 'ai',
      storageKey: string,
      routeConfig: {
        title: string;
        href: string;
        icon: string;
      } & any,
      stateFlag: 'isHubInitialized' | 'isUseAIInitialized'
    ) => {
      const savedValue = localStorage.getItem(storageKey);
      const configKey = featureKey === 'ai' ? 'isUseAI' : `isUseBlinkoHub`;
      const configValue = config?.[configKey];
      const currentValue = configValue ?? (savedValue === 'true');

      if (configValue !== undefined && savedValue !== String(configValue)) {
        localStorage.setItem(storageKey, String(configValue));
      }

      const routeIndex = base.routerList.findIndex(route => route.href === routeConfig.href);

      if (currentValue) {
        if (!this[stateFlag]) {
          if (routeIndex === -1) {
            base.routerList.splice(2, 0, routeConfig);
          }
          this[stateFlag] = true;
        }
      } else {
        if (this[stateFlag]) {
          if (routeIndex !== -1) {
            base.routerList.splice(routeIndex, 1);
          }
          this[stateFlag] = false;
        }
      }
    };

    handleFeatureRoute('ai', 'useAI', {
      title: "AI",
      href: '/ai',
      icon: 'mingcute:ai-line'
    }, 'isUseAIInitialized');

    handleFeatureRoute('hub', 'hubEnabled', {
      title: "hub",
      href: '/hub',
      icon: 'fluent:people-community-16-regular'
    }, 'isHubInitialized');

    const savedLanguage = localStorage.getItem('userLanguage');
    const savedTheme = localStorage.getItem('userTheme');

    if (savedLanguage && !this.languageInitialized) {
      RootStore.Get(BaseStore).changeLanugage(i18n, savedLanguage);
      this.languageInitialized = true;
    }

    if (savedTheme && !this.themeInitialized) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      const themeToSet = savedTheme === 'system' ? systemTheme : savedTheme;
      setTheme(themeToSet);
      this.updatePWAColor(themeToSet);
      this.themeInitialized = true;
    }

    const darkElement = document.querySelector('.dark')
    const lightElement = document.querySelector('.light')

    if (config?.themeColor && config?.themeForegroundColor) {
      if (darkElement) {
        //@ts-ignore
        darkElement.style.setProperty('--primary', config.themeColor)
        //@ts-ignore
        darkElement.style.setProperty('--primary-foreground', config.themeForegroundColor)
      }
      if (lightElement) {
        //@ts-ignore
        lightElement.style.setProperty('--primary', config.themeColor)
        //@ts-ignore
        lightElement.style.setProperty('--primary-foreground', config.themeForegroundColor)
      }
    }

    if (this.isLogin) {
      try {
        if (config) {
          if (config.language && config.language !== savedLanguage) {
            localStorage.setItem('userLanguage', config.language);
            RootStore.Get(BaseStore).changeLanugage(i18n, config.language);
          }

          if (config.theme && config.theme !== savedTheme) {
            localStorage.setItem('userTheme', config.theme);
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            const newTheme = config.theme === 'system' ? systemTheme : config.theme;
            setTheme(newTheme);
            this.updatePWAColor(newTheme);
          }
        }
      } catch (error) {
        console.error('Failed to fetch user config:', error);
      }
    }
  }

  handleToken(tokenData: TokenData | null, successCallback?: () => void) {
    const location = window.location;
    console.log('handleToken', tokenData);

    if (tokenData && tokenData.user) {
      this.tokenData.save(tokenData);
      this.isSetup = true;

      if (tokenData.requiresTwoFactor) {
        this.showTwoFactorDialog();
      }
      else if (location.pathname === '/signin' || location.pathname === '/signup') {
        navigate('/');
      }

      if (successCallback) {
        successCallback();
      }
    } else {
      console.log('clearing user token');
      this.clear();

      const pathname = location.pathname;
      const isInitialLoad = !this.isSetup;

      if (pathname !== '/signin' &&
        pathname !== '/signup' &&
        !pathname.includes('/share') &&
        !isInitialLoad) {
        navigate('/signin');
      }
    }
  }

  showTwoFactorDialog() {
    if (this.requiresTwoFactor) {
      console.log('Showing 2FA modal due to requiresTwoFactor flag');

      ShowTwoFactorModal(async (code) => {
        try {
          await this.handleTwoFactorAuth(code);
        } catch (error) {
          console.error('2FA verification failed:', error);
          RootStore.Get(ToastPlugin).error('verification-failed');
        }
      }, false);
    }
  }

  use() {
    const { i18n } = useTranslation()
    const { setTheme } = useTheme()
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      this.initializeSettings(setTheme, i18n);
    }, []);

    useEffect(() => {
      eventBus.on('user:token', (tokenData) => {
        this.handleToken(tokenData, () => {
          this.initializeSettings(setTheme, i18n);
          if (tokenData?.user?.id) {
            this.userInfo.call(Number(tokenData.user.id));
            this.canRegister.call();
          }
        });
      });

      eventBus.on('user:showTwoFactor', (data) => {
        console.log('Received showTwoFactor event:', data);
        if (data && data.userId) {
          this.tokenData.save({
            ...this.tokenData.value,
            requiresTwoFactor: true,
            user: {
              ...this.tokenData.value?.user,
              id: data.userId.toString()
            }
          });
          
          this.showTwoFactorDialog();
        }
      });

      eventBus.on('user:twoFactorResult', (result) => {
        if (result.success) {
          RootStore.Get(DialogStore).close();
          if (!this.requiresTwoFactor) {
            navigate('/');
          }
        } else {
          RootStore.Get(ToastPlugin).error('verification-failed');
        }
      });

      return () => {
        eventBus.off('user:token', this.handleToken);
        eventBus.off('user:showTwoFactor', () => {});
        eventBus.off('user:twoFactorResult', () => {});
      };
    }, []);

    useEffect(() => {
      const handleSignout = () => {
        const pathname = location.pathname;
        if (pathname === '/signup' || pathname.includes('/share')) {
          return
        }
        this.clear()
        navigate('/signin')
      }

      eventBus.on('user:signout', handleSignout)

      return () => {
        eventBus.off('user:signout', handleSignout)
      }
    }, []);
  }
}

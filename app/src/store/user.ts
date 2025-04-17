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
import { getSession } from '@/components/Auth/auth-client';


export class UserStore implements Store {
  sid = 'user';
  constructor() {
    makeAutoObservable(this)
  }
  id: string = '';
  name?: string = '';
  nickname?: string = '';
  image?: string = '';
  role: string = '';
  theme: any = 'light';
  isSetup: boolean = false;
  languageInitialized: boolean = false;
  themeInitialized: boolean = false;
  isHubInitialized: boolean = false;
  isUseAIInitialized: boolean = false;
  requiresTwoFactor: boolean = false;

  wait() {
    return new Promise<UserStore>((res, rej) => {
      if (this.id) {
        res(this);
      }

      //@ts-ignore
      this.event.once('user:ready', (user) => {
        res(this);
      });
    });
  }

  get isSuperAdmin() {
    return this.role === 'superadmin'
  }

  static wait() {
    return RootStore.Get(UserStore).wait();
  }

  get isLogin() {
    return !!this.name;
  }

  get blinko() {
    return RootStore.Get(BlinkoStore)
  }

  userInfo = new PromiseState({
    function: async (id: number) => {
      return await api.users.detail.query({ id })
    }
  })

  canRegister = new PromiseState({
    function: async () => {
      return await api.users.canRegister.mutate()
    }
  })

  checkSession = new PromiseState({
    function: async () => {
      try {
        const session = await getSession();
        if (session && session.user) {
          this.ready({
            id: session.user.id ?? '',
            name: session.user.name ?? '',
            nickname: session.user.nickname ?? '',
            image: session.user.image ?? '',
            role: session.user.role ?? '',
          });
          return true;
        }
        return false;
      } catch (error) {
        console.error('Failed to check session:', error);
        return false;
      }
    }
  });

  // Create session data object from UserStore
  getSessionData() {
    if (!this.isLogin) return null;
    
    return {
      user: {
        id: this.id,
        name: this.name,
        nickname: this.nickname,
        image: this.image,
        role: this.role
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      requiresTwoFactor: this.requiresTwoFactor
    };
  }

  setData(args: Partial<UserStore>) {
    Object.assign(this, args);
    // Emit state update event
    eventBus.emit('user:ready', this);
  }

  ready(args: Partial<UserStore>) {
    this.setData(args);
  }

  clear() {
    this.id = ''
    this.name = ''
    this.nickname = ''
    this.image = ''
    this.role = ''
    this.isSetup = false
    this.requiresTwoFactor = false
    // Emit state clear event
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

  handleSession(session: any, successCallback: () => void) {
    const location = window.location;
    console.log('handleSession', session);
    
    if (session && session.user) {
      // Update user information
      const userData: Partial<UserStore> = {
        id: session.user.id ?? '0',
        name: session.user.name ?? '',
        nickname: session.user.nickname ?? '',
        role: session.user.role ?? '',
        requiresTwoFactor: !!session.requiresTwoFactor
      };
      
      // Optional properties, avoid overwriting existing values
      if (session.user.image) {
        userData.image = session.user.image;
      }
      
      this.ready(userData);

      // Only redirect when on login page and 2FA is not required
      if (!session.requiresTwoFactor && 
          (location.pathname === '/signin' || location.pathname === '/signup')) {
        window.location.href = '/';
      }
      
      if (successCallback) {
        successCallback();
      }
    } else {
      console.log('clearing user session');
      this.clear();

      // Only redirect to login page when not logged in and not on login-related pages
      const pathname = location.pathname;
      const isInitialLoad = !this.isSetup;
      
      if (pathname !== '/signin' &&
          pathname !== '/signup' &&
          !pathname.includes('/share') &&
          !isInitialLoad) {
        window.location.href = '/signin';
      }
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
      eventBus.on('user:session', (session) => {
        this.handleSession(session, () => {
          this.initializeSettings(setTheme, i18n);
          this.userInfo.call(Number(session.user.id ?? '0'));
          this.canRegister.call();
        });
      });

      return () => {
        eventBus.off('user:session', (session) => {
          this.handleSession(session, () => {
            this.initializeSettings(setTheme, i18n);
            this.userInfo.call(Number(session.user.id));
            this.canRegister.call();
          });
        });
      };
    }, []);

    useEffect(() => {
      const handleSignout = () => {
        const pathname = location.pathname;
        if (pathname === '/signup' || pathname.includes('/share')) {
          return
        }
        localStorage.removeItem('username')
        localStorage.removeItem('password')
        RootStore.Get(UserStore).clear()
        navigate('/signin')
      }

      eventBus.on('user:signout', handleSignout)

      return () => {
        eventBus.off('user:signout', handleSignout)
      }
    }, []);
  }
}

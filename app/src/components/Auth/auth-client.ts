// import { Session } from './auth-context';
import { eventBus } from '@/lib/event';
import { RootStore } from '@/store';
import { UserStore } from '@/store/user';

let navigateFunction: ((path: string) => void) | null = null;

export function setNavigate(navigate: (path: string) => void) {
  navigateFunction = navigate;
}

export function navigate(path: string) {
  if (navigateFunction) {
    navigateFunction(path);
  } else {
    window.location.href = path;
  }
}

export interface TokenData {
  user?: {
    name?: string;
    email?: string;
    image?: string;
    id?: string;
    role?: string;
    nickname?: string;
  };
  expires?: string;
  requiresTwoFactor?: boolean;
  csrfToken?: string;
  [key: string]: any;
}

type SignInOptions = {
  redirect?: boolean;
  callbackUrl?: string;
  [key: string]: any;
};

type SignInResponse = {
  ok: boolean;
  error?: string;
  status: number;
  url?: string;
  requiresTwoFactor?: boolean;
  userId?: number;
  csrfToken?: string;
};

/**
 * Get current session data
 */
export async function getTokenData(): Promise<TokenData | null> {
  try {
    const response = await fetch('/api/auth/profile', {
      credentials: 'include',
    });
    
    if (response.ok) {
      const data = await response.json();
      eventBus.emit('user:token', data);
      return data;
    }
    
    return null;
  } catch (error) {
    console.error('Failed to get session data:', error);
    return null;
  }
}

export async function getCsrfToken(): Promise<string | null> {
  try {
    const response = await fetch('/api/auth/csrf-token', {
      credentials: 'include',
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.csrfToken;
    }
    return null;
  } catch (error) {
    console.error('Failed to get CSRF token:', error);
    return null;
  }
}

/**
 * Sign in function
 */
export async function signIn(
  provider: string,
  options: SignInOptions = {}
): Promise<SignInResponse | undefined> {
  try {
    if (provider === 'credentials') {
      const csrfToken = await getCsrfToken();
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include', 
        headers: { 
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken || '',
        },
        body: JSON.stringify({
          username: options.username,
          password: options.password,
        }),
      });

      const data = await response.json();

      if (data.requiresTwoFactor) {
        eventBus.emit('user:showTwoFactor', { userId: data.userId });
        
        return {
          ok: true,
          requiresTwoFactor: true,
          userId: data.userId,
          status: response.status,
        };
      }

      if (response.ok) {
        eventBus.emit('user:token', data);
        
        if (options.redirect) {
          navigate(options.callbackUrl || '/');
          return undefined;
        }
        
        return { 
          ok: true, 
          status: response.status,
          csrfToken: data.csrfToken,
        };
      }

      return {
        ok: false,
        error: data.error,
        status: response.status,
      };
    }

    if (provider === 'oauth-2fa') {
      const csrfToken = await getCsrfToken();
      
      const response = await fetch('/api/auth/verify-2fa', {
        method: 'POST',
        credentials: 'include',
        headers: { 
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken || '',
        },
        body: JSON.stringify({
          userId: options.userId,
          code: options.twoFactorCode,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        eventBus.emit('user:token', data);
        
        if (options.redirect) {
          navigate(options.callbackUrl || '/');
          return undefined;
        }
        
        return { 
          ok: true, 
          status: response.status,
          csrfToken: data.csrfToken,
        };
      }

      return {
        ok: false,
        error: data.error,
        status: response.status,
      };
    }

    return {
      ok: false,
      error: 'Unsupported provider',
      status: 400,
    };
  } catch (error) {
    console.error('SignIn error:', error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      status: 500,
    };
  }
}

/**
 * Sign out function
 */
export async function signOut(options: { redirect?: boolean; callbackUrl?: string } = {}): Promise<{ url: string }> {
  try {
    const userStore = RootStore.Get(UserStore);
    const csrfToken = userStore.tokenData.value?.csrfToken;
    
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken || '',
      },
    });

    eventBus.emit('user:token', null);
    
    if (options.redirect) {
      navigate(options.callbackUrl || '/');
    }

    return { url: options.callbackUrl || '/' };
  } catch (error) {
    console.error('SignOut error:', error);
    return { url: options.callbackUrl || '/' };
  }
}
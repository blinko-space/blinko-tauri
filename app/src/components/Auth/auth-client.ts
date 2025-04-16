import { Session } from './auth-context';

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
};

/**
 * Get CSRF token
 */
export async function getCsrfToken(): Promise<string> {
  try {
    const response = await fetch('/api/auth/csrf');
    if (response.ok) {
      const data = await response.json();
      return data.csrfToken;
    }
    return '';
  } catch (error) {
    console.error('Failed to get CSRF token:', error);
    return '';
  }
}

/**
 * Get current session
 */
export async function getSession(): Promise<Session | null> {
  try {
    const response = await fetch('/api/auth/session');
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error('Failed to get session:', error);
    return null;
  }
}

/**
 * Sign in function, supports credentials and OAuth
 * @param provider Authentication provider ID
 * @param options Sign in options
 */
export async function signIn(
  provider: string,
  options: SignInOptions = {}
): Promise<SignInResponse | undefined> {
  // Default callback URL
  const callbackUrl = options.callbackUrl || '/';
  // Redirect is enabled by default
  const redirect = options.redirect !== false;

  try {
    // Handle credentials sign in
    if (provider === 'credentials') {
      const csrfToken = await getCsrfToken();
      
      // Prepare form parameters
      const params = new URLSearchParams();
      params.append('csrfToken', csrfToken);
      params.append('callbackUrl', callbackUrl);
      
      params.append('redirect', redirect ? 'true' : 'false');
      
      Object.entries(options).forEach(([key, value]) => {
        if (value !== undefined && key !== 'callbackUrl' && key !== 'redirect') {
          params.append(key, String(value));
        }
      });
      
      // Add json=true to get JSON response back
      params.append('json', 'true');
      
      
      const response = await fetch('/api/auth/callback/credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
        credentials: 'include'
      });
      
      console.log('Response status:', response.status);

      let data;
      try {
        data = await response.json();
      } catch (error) {
        console.error('Failed to parse response:', error);
        data = { error: 'SignIn failed' };
      }
      
      if (redirect && response.ok) {
        window.location.href = callbackUrl;
        return undefined;
      }
      
      return {
        ok: response.ok || response.status === 302,
        error: data.error,
        status: response.status,
        url: callbackUrl,
        requiresTwoFactor: data.requiresTwoFactor
      };
    }
    
    // Handle OAuth sign in
    if (redirect) {
      window.location.href = `/api/auth/signin/${provider}?callbackUrl=${encodeURIComponent(callbackUrl)}`;
      return undefined;
    }
    
    // OAuth doesn't support non-redirect mode, return an error
    return {
      ok: false,
      error: 'OAuth providers require redirect',
      status: 400,
      url: callbackUrl,
      requiresTwoFactor: false
    };
  } catch (error) {
    console.error('SignIn error:', error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      status: 500,
      url: callbackUrl,
      requiresTwoFactor: false
    };
  }
}

/**
 * Sign out function
 * @param options Sign out options
 */
export async function signOut(options: { redirect?: boolean; callbackUrl?: string } = {}): Promise<{ url: string }> {
  const callbackUrl = options.callbackUrl || '/';
  const redirect = options.redirect !== false;
  
  try {
    const csrfToken = await getCsrfToken();
    const response = await fetch('/api/auth/signout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ csrfToken, callbackUrl }),
    });
    
    if (redirect) {
      window.location.href = callbackUrl;
      return { url: callbackUrl };
    }
    
    return { url: callbackUrl };
  } catch (error) {
    console.error('SignOut error:', error);
    return { url: callbackUrl };
  }
} 
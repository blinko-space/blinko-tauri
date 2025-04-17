import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { eventBus } from '@/lib/event';

// Session state type
interface SessionContextType {
  data: Session | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  update: (data?: Session | null) => Promise<Session | null>;
}

// Session type
export interface Session {
  user?: {
    name?: string;
    email?: string;
    image?: string;
    id?: string;
    role?: string;
    nickname?: string;
  };
  expires: string;
  requiresTwoFactor?: boolean;
  [key: string]: any;
}

// Create context
const SessionContext = createContext<SessionContextType>({
  data: null,
  status: 'loading',
  update: async () => null,
});

// SessionProvider component props
interface SessionProviderProps {
  children: ReactNode;
  session?: Session | null;
  refetchInterval?: number;
}

// SessionProvider component
export function SessionProvider({ 
  children, 
  session: initialSession = null, 
  refetchInterval = 0 
}: SessionProviderProps) {
  const [session, setSession] = useState<Session | null>(initialSession);
  const [loading, setLoading] = useState<boolean>(initialSession === null);

  // Session update function
  const update = async (newSession?: Session | null) => {
    if (newSession !== undefined) {
      setSession(newSession);
      eventBus.emit('user:session', newSession);
      return newSession;
    }
    
    // If no new session is provided, fetch from server
    try {
      const response = await fetch('/api/auth/session');
      if (response.ok) {
        const data = await response.json();
        setSession(data);
        setLoading(false);
        eventBus.emit('user:session', data);
        return data;
      } else {
        setSession(null);
        setLoading(false);
        eventBus.emit('user:session', null);
        
        const currentPath = window.location.pathname;
        if (currentPath !== '/signin' && 
            currentPath !== '/signup' && 
            !currentPath.includes('/share')) {
          const eventBus = (window as any).eventBus;
          if (eventBus) {
            eventBus.emit('user:signout');
          }
        }
        
        return null;
      }
    } catch (error) {
      console.error('Failed to fetch session:', error);
      setSession(null);
      setLoading(false);
      eventBus.emit('user:session', null);
      return null;
    }
  };

  // Initial loading and periodic refresh
  useEffect(() => {
    if (initialSession === null) {
      update();
    } else {
      eventBus.emit('user:session', initialSession);
    }

    // Set up periodic refresh
    if (refetchInterval > 0) {
      const intervalId = setInterval(() => {
        update();
      }, refetchInterval * 1000);

      return () => clearInterval(intervalId);
    }
  }, [refetchInterval]);

  const status = loading 
    ? 'loading' 
    : session 
      ? 'authenticated' 
      : 'unauthenticated';
  
  const value: SessionContextType = {
    data: session,
    status: status as 'loading' | 'authenticated' | 'unauthenticated',
    update,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

// useSession hook
export function useSession() {
  const context = useContext(SessionContext);
  
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  
  return context;
} 
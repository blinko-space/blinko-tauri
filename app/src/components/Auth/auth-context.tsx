import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { eventBus } from '@/lib/event';
import { RootStore } from '@/store';
import { UserStore } from '@/store/user';

// Session state type
interface SessionContextType {
  data: Session | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  update: () => Promise<Session | null>;
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
}

// SessionProvider component
export function SessionProvider({ children }: SessionProviderProps) {
  const userStore = RootStore.Get(UserStore);
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>(
    userStore.isLogin ? 'authenticated' : 'loading'
  );
  
  // 创建会话数据对象
  const getSessionData = useCallback((): Session | null => {
    if (!userStore.isLogin) return null;
    
    return {
      user: {
        id: userStore.id,
        name: userStore.name,
        nickname: userStore.nickname,
        image: userStore.image,
        role: userStore.role
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      requiresTwoFactor: userStore.requiresTwoFactor
    };
  }, [userStore.id, userStore.name, userStore.isLogin, userStore.requiresTwoFactor]);
  
  // 监听UserStore状态变化
  useEffect(() => {
    const handleUserChange = () => {
      setStatus(userStore.isLogin ? 'authenticated' : 'unauthenticated');
    };
    
    eventBus.on('user:ready', handleUserChange);
    eventBus.on('user:clear', handleUserChange);
    
    // 初始状态检查
    if (userStore.isLogin) {
      setStatus('authenticated');
    } else {
      // 从服务器获取一次初始状态
      fetch('/api/auth/session')
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.user) {
            // 通过事件系统更新UserStore
            eventBus.emit('user:session', data);
          }
          setStatus(userStore.isLogin ? 'authenticated' : 'unauthenticated');
        })
        .catch(() => {
          setStatus('unauthenticated');
        });
    }
    
    return () => {
      eventBus.off('user:ready', handleUserChange);
      eventBus.off('user:clear', handleUserChange);
    };
  }, [userStore]);
  
  // 更新会话状态的函数
  const update = async (): Promise<Session | null> => {
    try {
      const response = await fetch('/api/auth/session');
      if (response.ok) {
        const data = await response.json();
        // 通过事件系统更新UserStore
        eventBus.emit('user:session', data);
        return data;
      }
      return null;
    } catch (error) {
      console.error('Failed to fetch session:', error);
      return null;
    }
  };
  
  const value: SessionContextType = {
    data: getSessionData(),
    status,
    update
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
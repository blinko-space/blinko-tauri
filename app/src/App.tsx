import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider } from 'next-themes';
// import { SessionProvider } from 'next-auth/react';
import { HeroUIProvider } from '@heroui/react';
import './styles/nprogress.css';
import './styles/github-markdown.css';
import 'react-photo-view/dist/react-photo-view.css';
import '@/lib/i18n';

import { initStore } from '@/store/init';
import { CommonLayout } from '@/components/Layout';
import { AppProvider } from '@/store/module/AppProvider';
import { BlinkoMultiSelectPop } from '@/components/BlinkoMultiSelectPop';
import { BlinkoMusicPlayer } from '@/components/BlinkoMusicPlayer';
import { LoadingPage } from '@/components/Common/LoadingPage';
import { PluginManagerStore } from '@/store/plugin/pluginManagerStore';
import { RootStore } from '@/store';
import { UserStore } from '@/store/user';
import { SessionProvider, useSession } from '@/components/Auth/auth-context';

import HomePage from './pages/index';
import SignInPage from './pages/signin';
import SignUpPage from './pages/signup';
import HubPage from './pages/hub';
import AIPage from './pages/ai';
import ResourcesPage from './pages/resources';
import ReviewPage from './pages/review';
import SettingsPage from './pages/settings';
import PluginPage from './pages/plugin';
import AnalyticsPage from './pages/analytics';
import AllPage from './pages/all';
import OAuthCallbackPage from './pages/oauth-callback';
import DetailPage from './pages/detail';
import ShareIndexPage from './pages/share';
import ShareDetailPage from './pages/share/[id]';
import OfflinePage from './pages/_offline';

import NProgress from 'nprogress';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const { data: session, status } = useSession();
  
  useEffect(() => {
    const checkAuth = async () => {
      const userStore = RootStore.Get(UserStore);
      
      const publicRoutes = ['/signin', '/signup', '/share', '/_offline'];
      const isPublicRoute = publicRoutes.some(route => 
        location.pathname === route || location.pathname.startsWith('/share/')
      );
      
      if (status === 'unauthenticated' && !isPublicRoute) {
        console.log('no session, redirect to signin');
        navigate('/signin', { replace: true });
      } else if (status === 'authenticated' && !userStore.isLogin) {
        console.log('has session, but userStore not initialized');
        if (session?.user) {
          userStore.ready({
            id: session.user.id ?? '',
            name: session.user.name ?? '',
            nickname: session.user.nickname ?? '',
            image: session.user.image ?? '',
            role: session.user.role ?? '',
          });
        }
      }
      
      setIsChecking(false);
    };
    
    checkAuth();
  }, [navigate, location, status, session]);
  
  if (status === 'loading' || isChecking) {
    return <LoadingPage />;
  }
  
  return children;
};

function AppRoutes() {
  
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/hub" element={<ProtectedRoute><HubPage /></ProtectedRoute>} />
      <Route path="/ai" element={<ProtectedRoute><AIPage /></ProtectedRoute>} />
      <Route path="/resources" element={<ProtectedRoute><ResourcesPage /></ProtectedRoute>} />
      <Route path="/review" element={<ProtectedRoute><ReviewPage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="/plugin" element={<ProtectedRoute><PluginPage /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
      <Route path="/all" element={<ProtectedRoute><AllPage /></ProtectedRoute>} />
      <Route path="/oauth-callback" element={<OAuthCallbackPage />} />
      <Route path="/detail/*" element={<ProtectedRoute><DetailPage /></ProtectedRoute>} />
      <Route path="/share" element={<ShareIndexPage />} />
      <Route path="/share/:id" element={<ShareDetailPage />} />
      <Route path="/_offline" element={<OfflinePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  initStore();
  useEffect(() => {
 
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    RootStore.Get(PluginManagerStore).initInstalledPlugins();
    
    setupProgressBar();
    
    return () => clearTimeout(timer);
  }, []);

  const setupProgressBar = () => {
    const startProgress = () => NProgress.start();
    const endProgress = () => NProgress.done(true);
    
    window.addEventListener('popstate', startProgress);
    window.addEventListener('beforeunload', endProgress);
    
    return () => {
      window.removeEventListener('popstate', startProgress);
      window.removeEventListener('beforeunload', endProgress);
    };
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <BrowserRouter>
      <SessionProvider refetchInterval={60}>
        <HeroUIProvider>
          <ThemeProvider attribute="class" enableSystem={false}>
            <AppProvider />
            <CommonLayout>
              <AppRoutes />
              <BlinkoMultiSelectPop />
            </CommonLayout>
          </ThemeProvider>
        </HeroUIProvider>
      </SessionProvider>
      <BlinkoMusicPlayer />
    </BrowserRouter>
  );
}

export default App;

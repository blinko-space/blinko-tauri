import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider } from 'next-themes';
import { Inspector, InspectParams } from 'react-dev-inspector';
import { HeroUIProvider } from '@heroui/react';
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

const HomePage = lazy(() => import('./pages/index'));
const SignInPage = lazy(() => import('./pages/signin'));
const SignUpPage = lazy(() => import('./pages/signup'));
const HubPage = lazy(() => import('./pages/hub'));
const AIPage = lazy(() => import('./pages/ai'));
const ResourcesPage = lazy(() => import('./pages/resources'));
const ReviewPage = lazy(() => import('./pages/review'));
const SettingsPage = lazy(() => import('./pages/settings'));
const PluginPage = lazy(() => import('./pages/plugin'));
const AnalyticsPage = lazy(() => import('./pages/analytics'));
const AllPage = lazy(() => import('./pages/all'));
const OAuthCallbackPage = lazy(() => import('./pages/oauth-callback'));
const DetailPage = lazy(() => import('./pages/detail'));
const ShareIndexPage = lazy(() => import('./pages/share'));
const ShareDetailPage = lazy(() => import('./pages/share/[id]'));
const OfflinePage = lazy(() => import('./pages/_offline'));

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
    <Suspense fallback={<LoadingPage />}>
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
    </Suspense>
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

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Inspector
        keys={['control', 'alt', 'x']}
        onClickElement={({ codeInfo }: InspectParams) => {
          if (!codeInfo?.absolutePath) return
          const { absolutePath, lineNumber, columnNumber } = codeInfo
          window.open(`cursor://file/${absolutePath}:${lineNumber}:${columnNumber}`)
        }}
      />
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
    </>
  );
}

export default App;

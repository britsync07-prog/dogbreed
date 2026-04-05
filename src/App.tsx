/**
 * App Component - Main application with routing
 */

import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '@/components/ui-custom/Header';
import { Footer } from '@/components/ui-custom/Footer';
import { LoadingSpinner } from '@/components/ui-custom/LoadingSpinner';
import { useFavorites } from '@/hooks/useFavorites';
import { useScrollToTop } from '@/hooks/useScrollToTop';

// Lazy load pages for code splitting
const Home = lazy(() => import('@/pages/Home'));
const BreedList = lazy(() => import('@/pages/BreedList'));
const BreedDetail = lazy(() => import('@/pages/BreedDetail'));
const Favorites = lazy(() => import('@/pages/Favorites'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Scroll to top wrapper
function ScrollToTopWrapper({ children }: { children: React.ReactNode }) {
  useScrollToTop();
  return <>{children}</>;
}

function App() {
  const { favoritesCount } = useFavorites();

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white">
        <Header favoritesCount={favoritesCount} />
        
        <main className="flex-1">
          <ScrollToTopWrapper>
            <Suspense fallback={<LoadingSpinner fullScreen />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/breeds" element={<BreedList />} />
                <Route path="/breed/:breed" element={<BreedDetail />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ScrollToTopWrapper>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

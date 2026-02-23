import { Suspense, useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import Chatbot from './Chatbot';
import ParishPreloader from './ParishPreloader';
import PageParticles from './PageParticles';
import { usePageMeta } from '@/hooks/usePageMeta';

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  usePageMeta();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <ParishPreloader />;

  return (
    <div className="min-h-screen bg-background relative">
      {location.pathname !== '/' && <PageParticles />}
      <Navigation />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center pt-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Layout;

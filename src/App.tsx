import { useState, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { LanguageProvider } from './contexts/LanguageContext';
import { ServicesPage } from './pages/ServicesPage';
import { HomePage } from './pages/HomePage';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<'home' | 'services'>('home');
  const [scrollToService, setScrollToService] = useState<string | undefined>(undefined);

  // Handle browser navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/services') {
        setCurrentPage('services');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    handlePopState(); // Check initial URL

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToServices = (serviceId?: string) => {
    setCurrentPage('services');
    setScrollToService(serviceId);
    window.history.pushState({}, '', '/services');
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    setScrollToService(undefined);
    window.history.pushState({}, '', '/');
    window.scrollTo(0, 0);
  };

  if (currentPage === 'services') {
    return <ServicesPage onNavigateHome={navigateToHome} scrollToService={scrollToService} />;
  }

  return <HomePage onNavigateToServices={navigateToServices} />;
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
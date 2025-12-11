import { useState, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { LanguageProvider } from './contexts/LanguageContext';
import { ServicesPage } from './pages/ServicesPage';
import { HomePage } from './pages/HomePage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<'home' | 'services' | 'privacy' | 'terms'>('home');
  const [scrollToService, setScrollToService] = useState<string | undefined>(undefined);

  // Handle browser navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/services') {
        setCurrentPage('services');
      } else if (path === '/privacy') {
        setCurrentPage('privacy');
      } else if (path === '/terms') {
        setCurrentPage('terms');
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

  const navigateToPrivacy = () => {
    setCurrentPage('privacy');
    window.history.pushState({}, '', '/privacy');
    window.scrollTo(0, 0);
  };

  const navigateToTerms = () => {
    setCurrentPage('terms');
    window.history.pushState({}, '', '/terms');
    window.scrollTo(0, 0);
  };

  if (currentPage === 'services') {
    return <ServicesPage onNavigateHome={navigateToHome} scrollToService={scrollToService} />;
  }

  if (currentPage === 'privacy') {
    return <PrivacyPolicyPage onNavigateBack={navigateToHome} />;
  }

  if (currentPage === 'terms') {
    return <TermsOfServicePage onNavigateBack={navigateToHome} />;
  }

  return <HomePage onNavigateToServices={navigateToServices} onNavigateToPrivacy={navigateToPrivacy} onNavigateToTerms={navigateToTerms} />;
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
import { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { StoryHero } from './components/StoryHero';
import { Gallery } from './components/Gallery';
import { FeaturedServices } from './components/FeaturedServices';
import { Testimonials } from './components/Testimonials';
import { GoogleReviews } from './components/GoogleReviews';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ThemeProvider } from './components/ThemeProvider';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ScrollProgress } from './components/ScrollProgress';
import { FloatingCTA } from './components/FloatingCTA';
import { StepIndicator } from './components/StepIndicator';
import { StoryTransition } from './components/StoryTransition';
import { CTABanner } from './components/CTABanner';
import { BookingModal } from './components/BookingModal';
import { SkipLinks } from './components/SkipLinks';

// Code splitting for Services page - loads only when needed
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));

// Loading fallback component
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
    </div>
  );
}

function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div id="main-content" className="min-h-screen bg-white dark:bg-black transition-colors duration-500" style={{ scrollBehavior: 'smooth' }}>
      <ScrollProgress />
      <StepIndicator />
      <FloatingCTA onBookClick={() => setIsBookingOpen(true)} />
      
      {/* Chapter 1: The Beginning */}
      <StoryHero onNavigateToServices={() => navigate('/services')} />
      
      {/* Story Transition */}
      <StoryTransition 
        chapter={t('story.chapter2.number')}
        title={t('story.chapter2.title')}
        subtitle={t('story.chapter2.subtitle')}
      />
      
      <Gallery />
      
      {/* Featured Services Section */}
      <FeaturedServices />
      
      {/* Mid-Story CTA */}
      <CTABanner onBookClick={() => setIsBookingOpen(true)} />
      
      {/* Story Transition */}
      <StoryTransition 
        chapter={t('story.chapter3.number')}
        title={t('story.chapter3.title')}
        subtitle={t('story.chapter3.subtitle')}
      />
      
      <Testimonials />
      
      {/* Google Reviews Section */}
      <GoogleReviews />
      
      {/* Story Transition */}
      <StoryTransition 
        chapter={t('story.chapter4.number')}
        title={t('story.chapter4.title')}
        subtitle={t('story.chapter4.subtitle')}
      />
      
      <Contact />
      
      <Footer />
      
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}

function AppContent() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={
          <Suspense fallback={<PageLoader />}>
            <ServicesPage />
          </Suspense>
        } />
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SkipLinks />
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

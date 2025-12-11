import { useState } from 'react';
import { Navigation } from '../components/home/Navigation';
import { HeroSection } from '../components/home/HeroSection';
import { ServicesPreview } from '../components/home/ServicesPreview';
import { AboutSection } from '../components/home/AboutSection';
import { CenteredCTASection } from '../components/home/CenteredCTASection';
import { GallerySection } from '../components/home/GallerySection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { ContactSection } from '../components/home/ContactSection';
import { Footer } from '../components/Footer';
import { BookingModal } from '../components/BookingModal';
import { ScrollToTopButton } from '../components/ScrollToTopButton';

interface HomePageProps {
  onNavigateToServices: (serviceId?: string) => void;
  onNavigateToPrivacy: () => void;
  onNavigateToTerms: () => void;
}

export function HomePage({ onNavigateToServices, onNavigateToPrivacy, onNavigateToTerms }: HomePageProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      {/* SEO Meta Tags */}
      <title>Queen's Nails Hair & Skincare - Premier Nail Salon in San Diego</title>
      
      {/* Navigation */}
      <Navigation onBookClick={() => setIsBookingOpen(true)} />
      
      {/* Hero Section */}
      <HeroSection 
        onBookClick={() => setIsBookingOpen(true)} 
        onNavigateToServices={onNavigateToServices}
      />
      
            {/* About Section */}
      <AboutSection />
      
      {/* Centered CTA Section */}
      <CenteredCTASection />
      
      {/* Services Preview */}
      <ServicesPreview 
        onViewAll={(serviceId?: string) => onNavigateToServices(serviceId)} 
        onBookClick={() => setIsBookingOpen(true)} 
      />
      
      {/* Gallery Section */}
      <GallerySection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* Contact Section */}
      <ContactSection onBookClick={() => setIsBookingOpen(true)} />
      
      {/* Footer */}
      <Footer onNavigateToPrivacy={onNavigateToPrivacy} onNavigateToTerms={onNavigateToTerms} />

      {/* Scroll to Top Button */}
      <ScrollToTopButton />

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
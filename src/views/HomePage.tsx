"use client";

import { useState } from 'react';
import { SEO } from '../components/SEO/SEO';
import { generateLocalBusinessSchema, generateWebPageSchema } from '../utils/schema-generators';
import { Navigation } from '../components/home/Navigation';
import { HeroSection } from '../components/home/HeroSection';
import { ServicesPreview } from '../components/home/ServicesPreview';
import { AboutSection } from '../components/home/AboutSection';
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

  // SEO schemas
  const schemas = [
    generateLocalBusinessSchema(),
    generateWebPageSchema({
      name: "Home - Queen's Nails Hair & Skincare",
      description: "Premier nail salon in San Diego offering luxury manicures, pedicures, nail art, and spa services. Expert technicians, premium products, beautiful results.",
      url: "https://queensobnail.com/"
    })
  ];

  return (
    <>
      <SEO
        title="Queen's Nails Hair & Skincare - Premier Nail Salon in San Diego"
        description="Premier nail salon in San Diego offering luxury manicures, pedicures, gel nails, nail art, and spa services. Expert technicians, premium products. Book your appointment today!"
        canonical="https://queensobnail.com/"
        keywords="nail salon San Diego, manicure San Diego, pedicure San Diego, gel nails, nail art, spa services, Ocean Beach salon, nail salon near me"
        ogImage="https://queensobnail.com/og-home.jpg"
        schema={schemas}
      />

      <main className="min-h-screen bg-background text-foreground transition-colors duration-500">
        {/* Navigation */}
        <Navigation onBookClick={() => setIsBookingOpen(true)} transparentOnTop />
      
      {/* Hero Section */}
      <HeroSection 
        onBookClick={() => setIsBookingOpen(true)} 
        onNavigateToServices={onNavigateToServices}
      />
      
                        {/* About Section */}
      <AboutSection />

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
      </main>
    </>
  );
}
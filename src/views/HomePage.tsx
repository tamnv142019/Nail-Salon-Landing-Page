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
      name: 'Home - Queen’s Nails Hair and Skincare',
      description:
        "Queen’s Nails Hair and Skincare in Ocean Beach, San Diego offers professional manicures, pedicures, gel nails, nail art, hair and skincare services. Book your appointment today.",
      url: "https://queensobnail.com/"
    })
  ];

  return (
    <>
      <SEO
        title="Queen’s Nails Hair and Skincare – Nail Salon in Ocean Beach, San Diego"
        description="Queen’s Nails Hair and Skincare in Ocean Beach, San Diego offers professional manicures, pedicures, gel nails, nail art, hair and skincare services. Book your appointment today."
        canonical="https://queensobnail.com/"
        keywords="nail salon in Ocean Beach, gel nails Ocean Beach, pedicure Ocean Beach, Queen’s Nails Hair and Skincare San Diego, manicure Ocean Beach, nail art Ocean Beach"
        ogImage="https://queensobnail.com/images/misc/og-home.png"
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
"use client";

import { useState } from 'react';
import { SEO } from '../../components/SEO/SEO';
import { getPageSEOConfig } from '../../config/seo.config';
import { Contact } from '../../components/Contact';
import { Navigation } from '../../components/home/Navigation';
import { BookingModal } from '../../components/BookingModal';

export default function Page() {
  const cfg = getPageSEOConfig('contact');
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <SEO
        title={cfg.title}
        description={cfg.description}
        canonical={cfg.canonical}
        keywords={cfg.keywords.join(', ')}
      />

      {/* Navigation/Header */}
      <Navigation onBookClick={() => setIsBookingOpen(true)} />

      <main className="max-w-7xl mx-auto py-12 px-4">
        <Contact />
      </main>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}

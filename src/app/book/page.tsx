"use client";

import { useState } from 'react';
import { SEO } from '../../components/SEO/SEO';
import { getPageSEOConfig } from '../../config/seo.config';
import { Navigation } from '../../components/home/Navigation';
import { BookingModal } from '../../components/BookingModal';

export default function Page() {
  const cfg = getPageSEOConfig('book');
  const [isBookingOpen, setIsBookingOpen] = useState(true);

  return (
    <>
      <SEO
        title={cfg.title}
        description={cfg.description}
        canonical={cfg.canonical}
        keywords={cfg.keywords?.join(', ') || ''}
      />

      <Navigation onBookClick={() => setIsBookingOpen(true)} />

      <main className="max-w-4xl mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Book Appointment</h1>
        <p className="text-lg text-muted-foreground mb-8">Choose a date and time that works for you. We'll confirm via email or phone.</p>
        <button
          onClick={() => setIsBookingOpen(true)}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-[image:var(--gradient-primary-action)] text-[color:var(--gold-champagne)]"
        >
          Open Booking
        </button>
      </main>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}

"use client";

import { useState } from 'react';
import { Navigation } from './home/Navigation';
import { BookingModal } from './BookingModal';

export function ClientHeader() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <Navigation onBookClick={() => setIsBookingOpen(true)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}

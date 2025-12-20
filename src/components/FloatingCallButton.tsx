"use client";

import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { businessInfo } from '../config/seo.config';

export function FloatingCallButton() {
  // Use explicit international format for clicking on the button
  const phoneDigits = '+1' + businessInfo.phone.replace(/[^0-9]/g, '');

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      try {
        setVisible(window.scrollY > 150);
      } catch (e) {
        // server-side safety
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // run once to set initial state
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={`tel:${phoneDigits}`}
      aria-label={`Call ${businessInfo.phone}`}
      aria-hidden={!visible}
      className={`fixed bottom-6 left-6 z-30 inline-flex items-center gap-3 transform ${
        visible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
      } transition-opacity transition-transform duration-300 ease-out will-change-transform will-change-opacity`}
    >
      <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl transition-transform duration-300 hover:scale-105 hover:bg-red-700 animate-sway group-hover:scale-105">
        <Phone size={20} className="relative z-10" />

        {/* Continuous ring (always visible) */}
        <span className="absolute inset-0 rounded-full opacity-60 transform scale-100 border-2 border-red-400/40 animate-pulse transition-opacity duration-300 group-hover:opacity-90" />

        {/* Subtle continuous ping behind the button */}
        <span className="absolute -inset-3 rounded-full bg-red-600/16 opacity-30 animate-ping transition-opacity duration-300 group-hover:opacity-60" />
      </div>

      {/* Phone number pill - visible on all sizes, responsive padding/text */}
      <span className="inline-flex items-center px-2 py-1 rounded-lg bg-red-700 text-white text-sm font-semibold shadow-lg select-none md:px-3 md:py-2 md:text-base animate-sway-float transition-transform duration-300 ease-out transform group-hover:-translate-y-1 group-hover:scale-105 group-hover:bg-red-800">
        {businessInfo.phone}
      </span>
    </a>
  );
}

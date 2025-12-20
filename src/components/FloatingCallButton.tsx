"use client";

import { Phone } from 'lucide-react';
import { businessInfo } from '../config/seo.config';

export function FloatingCallButton() {
  // Use explicit international format for clicking on the button
  const phoneDigits = '+1' + businessInfo.phone.replace(/[^0-9]/g, '');

  return (
    <a
      href={`tel:${phoneDigits}`}
      aria-label={`Call ${businessInfo.phone}`}
      className="fixed bottom-6 left-6 z-50 inline-flex items-center gap-3"
    >
      <div className="group relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl transition-transform duration-300 hover:scale-105 hover:bg-red-700 animate-sway">
        <Phone size={20} className="relative z-10" />

        {/* Continuous ring (always visible) */}
        <span className="absolute inset-0 rounded-full opacity-60 transform scale-100 border-2 border-red-400/40 animate-pulse" />

        {/* Subtle continuous ping behind the button */}
        <span className="absolute -inset-3 rounded-full bg-red-600/16 opacity-30 animate-ping" />
      </div>

      {/* Phone number pill - visible on all sizes, responsive padding/text */}
      <span className="inline-flex items-center px-2 py-1 rounded-lg bg-red-700 text-white text-sm font-semibold shadow-lg select-none md:px-3 md:py-2 md:text-base animate-sway">
        {businessInfo.phone}
      </span>
    </a>
  );
}

"use client";

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { businessInfo } from '../config/seo.config';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    // reveal CTAs at top for a short period (use global flag so TopCTAs can read it)
    (window as any).__showTopCTAs = true;
    window.clearTimeout((scrollToTop as any).__ctaTimer);
    (scrollToTop as any).__ctaTimer = window.setTimeout(() => {
      (window as any).__showTopCTAs = false;
    }, 6000);
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 group"
      aria-label="Scroll to Top"
    >
      {/* iOS-style Glass Button */}
      <div className="relative flex items-center justify-center w-12 h-12 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-xl transition-all duration-300 hover:scale-110 hover:bg-white/80 dark:hover:bg-gray-900/80">
        <ArrowUp size={20} className="text-gray-900 dark:text-white" />
      </div>
    </button>
  );
}

// Top CTA bar rendered globally (can be placed here for simplicity)
export function TopCTAs() {
  const [visible, setVisible] = useState(false);
  // We rely on the ScrollToTopButton to toggle a DOM flag — simpler: read from window.__showTopCTAs if present
  useEffect(() => {
    let mounted = true;
    const check = () => {
      if (!mounted) return;
      const val = (window as any).__showTopCTAs;
      setVisible(Boolean(val));
    };
    const interval = setInterval(check, 100);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3">
      <a href={`tel:${businessInfo.phone.replace(/[^0-9+]/g, '')}`} className="px-4 py-2 rounded-xl bg-white/90 text-[color:var(--brand-emerald)] font-semibold shadow-lg animate-sway">
        Gọi: {businessInfo.phone}
      </a>
      <a href="/book" className="px-4 py-2 rounded-xl bg-[image:var(--gradient-primary-action)] text-[color:var(--gold-champagne)] font-semibold shadow-lg animate-sway">
        Book Now
      </a>
    </div>
  );
}
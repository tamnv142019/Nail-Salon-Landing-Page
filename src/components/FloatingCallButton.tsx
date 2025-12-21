"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Phone } from 'lucide-react';
import { businessInfo } from '../config/seo.config';

export function FloatingCallButton() {
  // Use explicit international format for clicking on the button
  const phoneDigits = '+1' + businessInfo.phone.replace(/[^0-9]/g, '');

  const [visible, setVisible] = useState(false);
  const [isModalOpenFlag, setIsModalOpenFlag] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    // If on a book route, always show the button.
    if (pathname && pathname.includes('book')) {
      setVisible(true);
      return;
    }

    // Observe the hero section: hide buttons when hero is in view, show otherwise.
    const hero = typeof document !== 'undefined' ? document.getElementById('hero') : null;
    if (!hero) {
      setVisible(true);
      return;
    }

    const updateVisibilityFromRect = () => {
      // If any modal is open on mobile, hide buttons
      const modalOpen = typeof document !== 'undefined' && (document.body.dataset?.modalOpen === 'true');
      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
      if (modalOpen && isMobile) {
        setVisible(false);
        return;
      }
      const rect = hero.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      setVisible(!inView);
    };

    // Initial visibility
    updateVisibilityFromRect();

    const observer = new IntersectionObserver((entries) => {
      const isVisible = entries.some((e) => e.isIntersecting);
      setVisible(!isVisible);
    }, { threshold: 0.1 });

    observer.observe(hero);

    // fallback for browsers without IntersectionObserver firing immediately
    window.addEventListener('resize', updateVisibilityFromRect, { passive: true });
    window.addEventListener('scroll', updateVisibilityFromRect, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateVisibilityFromRect);
      window.removeEventListener('scroll', updateVisibilityFromRect);
    };
  }, [pathname]);

  // watch for body dataset changes (modal open) and update local flag to adjust z-index
  useEffect(() => {
    const update = () => {
      try {
        setIsModalOpenFlag(document.body.dataset?.modalOpen === 'true');
      } catch (e) {
        setIsModalOpenFlag(false);
      }
    };

    update();
    const mo = new MutationObserver(() => update());
    try {
      mo.observe(document.body, { attributes: true, attributeFilter: ['data-modal-open', 'data-booking-open'] });
    } catch (e) {
      // ignore
    }

    return () => mo.disconnect();
  }, []);

  return (
    <a
      href={`tel:${phoneDigits}`}
      aria-label={`Call ${businessInfo.phone}`}
      aria-hidden={!visible}
      className={`fixed bottom-6 left-6 ${isModalOpenFlag ? 'z-20' : 'z-[9999]'} inline-flex items-center gap-3 transform floating-control ${
        visible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
      } transition-opacity transition-transform duration-300 ease-out will-change-transform will-change-opacity`}
    >
      <div className="relative w-10 h-10 md:w-16 md:h-16 rounded-full text-white flex items-center justify-center shadow-xl transition-transform duration-300 hover:scale-105 animate-sway group-hover:scale-105 bg-red-600/70 md:bg-red-600">
        <Phone className="relative z-10 w-3 h-3 md:w-5 md:h-5" />

        {/* Continuous ring (always visible) */}
        <span className="absolute inset-0 rounded-full opacity-60 transform scale-100 border-2 border-red-400/40 animate-pulse transition-opacity duration-300 group-hover:opacity-90" />

        {/* Subtle continuous ping behind the button */}
        <span className="absolute -inset-3 rounded-full bg-red-600/16 opacity-30 animate-ping transition-opacity duration-300 group-hover:opacity-60" />
      </div>

      {/* Phone number pill - visible on all sizes, responsive padding/text */}
      <span className="inline-flex items-center px-2 py-1 rounded-lg bg-red-700/80 text-white text-xs font-semibold shadow-lg select-none md:px-3 md:py-2 md:text-base animate-sway-float transition-transform duration-300 ease-out transform group-hover:-translate-y-1 group-hover:scale-105 md:group-hover:bg-red-800 max-w-[9rem] truncate">
        {businessInfo.phone}
      </span>
    </a>
  );
}

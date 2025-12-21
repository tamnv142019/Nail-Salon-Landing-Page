"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { businessInfo } from '../config/seo.config';

/**
 * FloatingFollowButtons
 * - vertical icon-only buttons aligned center-left
 * - uses official site icons from simpleicons CDN
 * - reveals label on hover (desktop)
 */
export function FloatingFollowButtons() {
  const [visible, setVisible] = useState(false);
  const [isModalOpenFlag, setIsModalOpenFlag] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // If on a book route, always show the follow buttons.
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
      // If any modal is open on mobile, hide follow buttons
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

  const links = [
    {
      key: 'facebook',
      href: businessInfo.social.facebook,
      label: 'Facebook',
      // official brand color used as background for the icon circle
      color: '#1877F2',
      // simpleicons CDN returns an SVG for the brand
      iconSrc: 'https://cdn.simpleicons.org/facebook/ffffff',
    },
    {
      key: 'yelp',
      href: businessInfo.social.yelp,
      label: 'Yelp',
      color: '#C41200',
      iconSrc: 'https://cdn.simpleicons.org/yelp/ffffff',
    },
    {
      key: 'google',
      href: `https://www.google.com/search?q=${encodeURIComponent(
        businessInfo.name + ' ' + businessInfo.address.addressLocality
      )}`,
      label: 'Google',
      color: '#4285F4',
      iconSrc: 'https://cdn.simpleicons.org/google/ffffff',
    },
  ];

  return (
    <div
      aria-hidden={!visible}
      className={`fixed left-4 top-1/2 ${isModalOpenFlag ? 'z-20' : 'z-[9999]'} transform -translate-y-1/2 flex flex-col items-start space-y-3 transition-opacity duration-300 ease-out floating-control ${
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {links.map((l) => (
        <a
          key={l.key}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow us on ${l.label}`}
          title={l.label}
          className="group relative flex items-center"
        >
          <div
            className="w-8 h-8 md:w-11 md:h-11 rounded-full flex items-center justify-center shadow-lg transition-transform duration-150 opacity-70 md:opacity-100"
            style={{ background: l.color }}
          >
            <img src={l.iconSrc} alt="" className="w-3 h-3 md:w-5 md:h-5 object-contain" />
          </div>

          {/* label revealed on hover for md+ */}
          <span className="ml-3 hidden md:inline-block px-3 py-1.5 rounded-full bg-white text-sm font-medium text-gray-800 shadow -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150">
            {l.label}
          </span>
        </a>
      ))}
    </div>
  );
}

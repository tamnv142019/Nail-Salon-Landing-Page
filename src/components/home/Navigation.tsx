"use client";

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Phone, Calendar, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { useLanguage } from '../../contexts/LanguageContext';
import { LanguageSwitcher } from '../LanguageSwitcher';

interface NavigationProps {
  onBookClick: () => void;
  onNavigateHome?: () => boolean | void;
  /** When true, the nav starts transparent until scrolled (use on Home hero). */
  transparentOnTop?: boolean;
}

export function Navigation({ onBookClick, onNavigateHome, transparentOnTop = false }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  // Map section IDs to their clean paths for URL updates
  const sectionPathMapping: Record<string, string> = {
    services: '/services',
    about: '/queens-nails-hair-skincare',
    gallery: '/gallery',
    testimonials: '/reviews',
    contact: '/contact',
  };

  const isSolid = !transparentOnTop || isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 60;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
      setIsMobileMenuOpen(false);
      try {
        const targetPath = sectionPathMapping[id] || `/${id}`;
        window.history.replaceState(null, '', targetPath);
      } catch (e) {
        // fallback to router replace for environments without history
        const targetPath = sectionPathMapping[id] || `/${id}`;
        router.replace(targetPath);
      }
    } else {
      // If section not found on the current page, navigate to the dedicated page
      const target = sectionPathMapping[id] || '/';
      router.push(target);
    }
  };

  const { t } = useLanguage();
  
  const isHome = typeof pathname === 'string' && (pathname === '/' || pathname === '');

  const handleNavClick = (id: string) => {
    const targetPath = sectionPathMapping[id] || `/${id}`;
    // On the home page, prefer scrolling to sections if present.
    if (isHome) {
      scrollToSection(id);
      return;
    }

    // On other pages always navigate to the page.
    setIsMobileMenuOpen(false);
    router.push(targetPath);
  };
  
  const navLinks = [
    { id: 'services', label: t('nav.services', 'Services') },
    { id: 'about', label: t('nav.about', 'About') },
    { id: 'gallery', label: t('nav.gallery', 'Gallery') },
    { id: 'testimonials', label: t('nav.reviews', 'Reviews') },
    { id: 'contact', label: t('nav.contact', 'Contact') },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 animate-fade-down"
    >
      <div
        className={`relative overflow-visible border-b transition-all duration-500 ease-out ${
          isSolid
            ? 'bg-background/60 backdrop-blur-2xl backdrop-saturate-200 border-border/60 shadow-lg ring-1 ring-inset ring-(--glass-ring) before:opacity-70 after:opacity-100 after:animate-[glass-shine_3.8s_ease-in-out_infinite]'
            : 'bg-transparent border-transparent shadow-none before:opacity-0 after:opacity-0'
        } before:content-[''] before:pointer-events-none before:absolute before:inset-0 before:bg-linear-to-b before:from-(--glass-top-from) before:via-(--glass-top-via) before:to-transparent after:content-[''] after:pointer-events-none after:absolute after:inset-y-0 after:left-0 after:w-1/3 after:bg-linear-to-r after:from-transparent after:via-(--glass-sheen-via) after:to-transparent`}
      >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => {
              // If a parent provided a custom handler, call it first.
              // If it returns `false`, treat that as "prevent navigation".
              if (onNavigateHome) {
                try {
                  const res = onNavigateHome();
                  if (res === false) return;
                } catch (e) {
                  // ignore errors from provided handler
                }
              }

              // If we're already on the homepage, just scroll to top.
              if (typeof window !== 'undefined' && window.location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
              }

              // Prefer SPA navigation, but fall back to a full reload if it fails.
              try {
                router.push('/');
              } catch (e) {
                window.location.href = '/';
              }
            }}
            className="group shrink-0 flex items-center gap-3 cursor-pointer transition-all duration-300 hover:opacity-90"
          >
            <span
              className="relative shrink-0 overflow-hidden rounded-xl p-1 bg-transparent transition-[transform,box-shadow] duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md"
            >
              <img
                src="/images/logos/logo.png"
                alt="Queen's Nails Hair & Skincare Logo"
                className="h-12 md:h-14 w-auto transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <span className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-(--glass-logo-sheen) to-transparent opacity-30 mix-blend-overlay animate-[glass-shine_2.8s_ease-in-out_infinite] motion-reduce:animate-none" />
            </span>
            <div className="hidden sm:flex flex-col">
              <div className="relative leading-tight transition-all duration-300 group-hover:-translate-y-0.5">
                <div className="relative inline-block leading-none">
                  <span className="block font-[var(--font-display)] font-normal text-4xl md:text-5xl leading-none pr-20 queens-glitter">
                    Queen's
                  </span>
                  <span
                    className={`absolute right-0 bottom-0 text-[10px] md:text-[11px] font-semibold tracking-[0.28em] uppercase bg-clip-text text-transparent bg-linear-to-r from-(--primary) via-(--gold-champagne) to-(--primary-hover) ${
                      isSolid || isDark ? '' : 'opacity-95'
                    }`}
                  >
                    Nails Hair & Skincare
                  </span>
                </div>
                <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-linear-to-r from-transparent via-brand-gold/70 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
              </div>
              <span className={`text-[11px] md:text-xs font-medium tracking-wide ${
                isSolid || isDark
                  ? 'text-foreground/70 group-hover:text-brand-gold/90'
                  : 'text-(--on-image-foreground-muted)'
              }`}>
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-medium transition-colors duration-300 hover:text-brand-gold cursor-pointer ${
                  isSolid || isDark
                    ? 'text-foreground/90'
                    : 'text-(--on-image-foreground-muted)'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="hidden md:block">
              <LanguageSwitcher isScrolled={isScrolled} isDark={isDark} />
            </div>

            {/* Theme Toggle - iOS Glass Style */}
            <button
              onClick={toggleTheme}
              className={`flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200 ease-out cursor-pointer hover:cursor-pointer outline-none focus-visible:ring-[3px] focus-visible:ring-(--focus-ring) focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                isSolid || isDark
                  ? 'bg-background/70 backdrop-blur-xl border border-border/40 text-foreground'
                  : 'bg-(--glass-on-image-bg) text-(--on-image-foreground) backdrop-blur-xl border border-(--glass-on-image-border) hover:bg-(--glass-on-image-bg-hover)'
              }`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {/* mobile call anchor removed (reverted) */}
            {/* Book Button (in-nav) */}
            <button
              onClick={onBookClick}
              className="relative group cursor-pointer"
            >
              <span className="pointer-events-none absolute -inset-1 rounded-xl bg-(image:--gradient-primary-action) opacity-80 animate-[pulse_0.9s_ease-in-out_infinite]"></span>
              <div
                className="relative z-10 flex items-center justify-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ease-out cursor-pointer bg-(image:--gradient-primary-action) text-(--gold-champagne) hover:brightness-110 active:brightness-95 shadow-sm hover:shadow-md overflow-hidden animate-sway"
              >
                <Calendar size={16} />
                <span className="text-sm font-semibold">{t('servicesPage.bookNow', 'Book Now')}</span>
              </div>
            </button>
            {/* Mobile menu toggle (hamburger) */}
            <button
              onClick={() => setIsMobileMenuOpen((s) => !s)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200 ease-out cursor-pointer outline-none focus-visible:ring-[3px] focus-visible:ring-(--focus-ring) focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - iOS Glass Style */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/40 bg-background/80 backdrop-blur-xl origin-top animate-scale-in">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="text-left px-4 py-2 text-foreground hover:bg-secondary rounded-xl transition-colors duration-200 backdrop-blur-xl cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <div className="flex items-center gap-2 px-4 pt-2">
                <div className="flex flex-wrap gap-2 flex-1">
                  {[
                    { code: 'en' as const, flag: '🇺🇸' },
                    { code: 'vi' as const, flag: '🇻🇳' },
                    { code: 'fr' as const, flag: '🇫🇷' },
                    { code: 'es' as const, flag: '🇪🇸' },
                    { code: 'zh' as const, flag: '🇨🇳' },
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 text-lg cursor-pointer ${
                        language === lang.code
                          ? 'bg-btn-accent shadow-md scale-110'
                          : 'bg-background/50 hover:bg-background/70 border border-border/40'
                      }`}
                    >
                      {lang.flag}
                    </button>
                  ))}
                </div>
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center w-11 h-11 bg-background/70 text-foreground rounded-xl backdrop-blur-xl border border-border/40 cursor-pointer outline-none focus-visible:ring-[3px] focus-visible:ring-(--focus-ring) focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </nav>
  );
}
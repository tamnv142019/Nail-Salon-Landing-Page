import { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { useLanguage } from '../../contexts/LanguageContext';
import { LanguageSwitcher } from '../LanguageSwitcher';
import logoImage from '../../assets/9bec472ae90f90102b38538430cb42ea555b4e96.png';

interface NavigationProps {
  onBookClick: () => void;
  onNavigateHome?: () => void;
  /** When true, the nav starts transparent until scrolled (use on Home hero). */
  transparentOnTop?: boolean;
}

export function Navigation({ onBookClick, onNavigateHome, transparentOnTop = false }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

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
    } else {
      // If section not found, navigate to home page with hash
      window.location.href = `/#${id}`;
    }
  };

  const { t } = useLanguage();
  
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
            ? 'bg-background/60 backdrop-blur-2xl backdrop-saturate-200 border-border/60 shadow-lg ring-1 ring-inset ring-[color:var(--glass-ring)] before:opacity-70 after:opacity-100 after:animate-[glass-shine_3.8s_ease-in-out_infinite]'
            : 'bg-transparent border-transparent shadow-none before:opacity-0 after:opacity-0'
        } before:content-[''] before:pointer-events-none before:absolute before:inset-0 before:bg-linear-to-b before:from-[color:var(--glass-top-from)] before:via-[color:var(--glass-top-via)] before:to-transparent after:content-[''] after:pointer-events-none after:absolute after:inset-y-0 after:left-0 after:w-1/3 after:bg-linear-to-r after:from-transparent after:via-[color:var(--glass-sheen-via)] after:to-transparent`}
      >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => {
              if (onNavigateHome) {
                onNavigateHome();
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="group shrink-0 flex items-center gap-3 cursor-pointer transition-all duration-300 hover:opacity-90"
          >
            <span className="relative shrink-0 overflow-hidden rounded-md">
              <img
                src={logoImage.src}
                alt="Queen's Nails Hair & Skincare Logo"
                className="h-10 md:h-12 transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <span className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-[color:var(--glass-logo-sheen)] to-transparent opacity-30 mix-blend-overlay animate-[glass-shine_2.8s_ease-in-out_infinite] motion-reduce:animate-none" />
            </span>
            <div className="hidden sm:flex flex-col">
              <div className={`relative text-xl md:text-2xl font-bold leading-tight transition-all duration-300 group-hover:-translate-y-0.5 group-hover:tracking-wide ${
                isSolid || isDark
                  ? 'text-foreground group-hover:text-brand-gold'
                  : 'text-[color:var(--on-image-foreground)] group-hover:text-[color:var(--on-image-foreground)]'
              }`}>
                <span className="block">Queen's</span>
                <span className="block">Nails Hair & Skincare</span>
                <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-linear-to-r from-transparent via-brand-gold/70 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
              </div>
              <span className={`text-[11px] md:text-xs font-medium tracking-wide ${
                isSolid || isDark
                  ? 'text-foreground/70 group-hover:text-brand-gold/90'
                  : 'text-[color:var(--on-image-foreground-muted)]'
              }`}>
                {t('nav.holidayGreeting', 'Merry Christmas & Happy New Year')}
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-sm font-medium transition-colors duration-300 hover:text-brand-gold cursor-pointer ${
                  isSolid || isDark
                    ? 'text-foreground/90'
                    : 'text-[color:var(--on-image-foreground-muted)]'
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
              className={`flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200 ease-out cursor-pointer hover:cursor-pointer outline-none focus-visible:ring-[3px] focus-visible:ring-[color:var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                isSolid || isDark
                  ? 'bg-background/70 backdrop-blur-xl border border-border/40 text-foreground'
                  : 'bg-[color:var(--glass-on-image-bg)] text-[color:var(--on-image-foreground)] backdrop-blur-xl border border-[color:var(--glass-on-image-border)] hover:bg-[color:var(--glass-on-image-bg-hover)]'
              }`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Phone Button - iOS Glass Style */}
            <a
              href="tel:6192245050"
              className={`hidden md:flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer hover:cursor-pointer ${
                isSolid || isDark
                  ? 'bg-card/70 backdrop-blur-xl border border-border/40 text-foreground hover:border-brand-gold/40'
                  : 'bg-[color:var(--glass-on-image-bg)] text-[color:var(--on-image-foreground)] backdrop-blur-xl border border-[color:var(--glass-on-image-border)] hover:border-brand-gold/40 hover:bg-[color:var(--glass-on-image-bg-hover)]'
              }`}
            >
              <Phone
                size={16}
                className={isSolid || isDark ? 'text-brand-gold' : 'text-[color:var(--on-image-foreground)]'}
              />
              <span className="hidden xl:inline text-sm font-semibold">(619) 224-5050</span>
            </a>

            {/* Book Button - iOS Glass Style */}
            <button
              onClick={onBookClick}
              className="relative group cursor-pointer"
            >
              <span className="pointer-events-none absolute -inset-1 rounded-xl bg-[image:var(--gradient-primary-action)] opacity-80 animate-[pulse_0.9s_ease-in-out_infinite]"></span>
              <div
                className="relative z-10 flex items-center justify-center gap-2 px-4 md:px-6 py-2 rounded-xl transition-all duration-200 ease-out cursor-pointer hover:cursor-pointer bg-[image:var(--gradient-primary-action)] text-[color:var(--gold-champagne)] hover:brightness-110 active:brightness-95 shadow-sm hover:shadow-md overflow-hidden before:content-[''] before:pointer-events-none before:absolute before:inset-0 before:bg-linear-to-r before:from-transparent before:via-[color:var(--btn-sheen)] before:to-transparent before:-skew-x-12 before:translate-x-[-200%] before:transition-transform before:duration-700 before:ease-out hover:before:translate-x-[200%] hover:before:via-[color:var(--btn-sheen-hover)]"
              >
                <Calendar size={16} />
                <span className="text-sm font-semibold">{t('servicesPage.bookNow', 'Book Now')}</span>
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200 ease-out cursor-pointer outline-none focus-visible:ring-[3px] focus-visible:ring-[color:var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                isSolid || isDark
                  ? 'text-foreground bg-background/70 backdrop-blur-xl border border-border/40'
                  : 'text-[color:var(--on-image-foreground)] bg-[color:var(--glass-on-image-bg)] backdrop-blur-xl border border-[color:var(--glass-on-image-border)] hover:bg-[color:var(--glass-on-image-bg-hover)]'
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
                  onClick={() => scrollToSection(link.id)}
                  className="text-left px-4 py-2 text-muted-foreground hover:bg-secondary rounded-xl transition-colors duration-200 backdrop-blur-xl cursor-pointer"
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
                  className="flex items-center justify-center w-11 h-11 bg-background/70 text-foreground rounded-xl backdrop-blur-xl border border-border/40 cursor-pointer outline-none focus-visible:ring-[3px] focus-visible:ring-[color:var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
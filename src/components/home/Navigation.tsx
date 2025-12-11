import { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { useLanguage } from '../../contexts/LanguageContext';
import { LanguageSwitcher } from '../LanguageSwitcher';
import logoImage from 'figma:asset/9bec472ae90f90102b38538430cb42ea555b4e96.png';

interface NavigationProps {
  onBookClick: () => void;
  onNavigateHome?: () => void;
}

export function Navigation({ onBookClick, onNavigateHome }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

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
      const offset = 80;
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-white/20 dark:border-gray-700/30'
          : 'bg-transparent'
      }`}
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
            className="flex-shrink-0 flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity duration-300"
          >
            <img
              src={logoImage}
              alt="Queen's Nails Logo"
              className="h-10 md:h-12 transition-colors duration-300"
            />
            <span className={`hidden sm:block text-xl md:text-2xl font-bold transition-colors duration-300 ${
              isScrolled || isDark
                ? 'text-gray-900 dark:text-white'
                : 'text-white'
            }`}>
              Queen's Nails
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-sm font-medium transition-colors duration-300 hover:text-rose-500 cursor-pointer ${
                  isScrolled || isDark
                    ? 'text-gray-700 dark:text-gray-300'
                    : 'text-white/90'
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
              className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 cursor-pointer hover:cursor-pointer ${
                isScrolled || isDark
                  ? 'bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 text-gray-900 dark:text-white'
                  : 'bg-white/20 text-white backdrop-blur-xl border border-white/20'
              }`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Phone Button - iOS Glass Style */}
            <a
              href="tel:6192245050"
              className="hidden md:block relative group cursor-pointer"
            >
              <div className="relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-lg text-sm font-semibold backdrop-blur-xl cursor-pointer">
                <Phone size={16} />
                <span className="hidden xl:inline">(619) 224-5050</span>
              </div>
            </a>

            {/* Book Button - iOS Glass Style */}
            <button
              onClick={onBookClick}
              className="relative group cursor-pointer"
            >
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-75 animate-ping"></span>
              <div className="relative flex items-center gap-2 px-4 md:px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-lg text-sm font-semibold backdrop-blur-xl cursor-pointer">
                <Calendar size={16} />
                <span>{t('servicesPage.bookNow', 'Book Now')}</span>
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 cursor-pointer ${
                isScrolled || isDark
                  ? 'text-gray-900 dark:text-white bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/30'
                  : 'text-white bg-white/20 backdrop-blur-xl border border-white/20'
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - iOS Glass Style */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/20 dark:border-gray-700/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-xl transition-colors duration-200 backdrop-blur-xl cursor-pointer"
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
                          ? 'bg-rose-500 shadow-md scale-110'
                          : 'bg-white/50 dark:bg-gray-700/50 hover:bg-white/70 dark:hover:bg-gray-700/70'
                      }`}
                    >
                      {lang.flag}
                    </button>
                  ))}
                </div>
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center w-10 h-10 bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-white rounded-xl backdrop-blur-xl border border-white/20 dark:border-gray-700/30 cursor-pointer"
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
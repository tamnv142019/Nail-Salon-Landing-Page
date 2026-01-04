import { Calendar, Star, Sparkles, Moon, Sun, Menu, ChevronDown, Gem } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';
import { useLanguage } from '../contexts/LanguageContext';
import { BookingModal } from './BookingModal';
import { MobileMenu } from './MobileMenu';
import { LanguageSelector } from './LanguageSelector';

export function StoryHero({ onNavigateToServices }: { onNavigateToServices?: () => void }) {
  const [scrollY, setScrollY] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const [currentBgImage, setCurrentBgImage] = useState(0);

  const storyWords = [
    t('hero.word1'),
    t('hero.word2'),
    t('hero.word3'),
    t('hero.word4'),
  ];

  const backgroundImages = [
    'https://images.unsplash.com/photo-1720086196723-a1e0656a90a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWlsJTIwc2Fsb24lMjBsdXh1cnl8ZW58MXx8fHwxNzY1MjYwOTI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1758225490983-0fae7961e425?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBwZWRpY3VyZXxlbnwxfHx8fDE3NjUyMDU2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1737214475365-e4f06281dcf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWlsJTIwYXJ0JTIwbWFuaWN1cmV8ZW58MXx8fHwxNzY1MjM0NDE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1626383137804-ff908d2753a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMGludGVyaW9yfGVufDF8fHx8MTc2NTIyODM3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % storyWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scale = 1 + scrollY * 0.0003;
  const opacity = 1 - scrollY * 0.001;
  const parallaxY = scrollY * 0.5;

  const handleViewServices = () => {
    if (onNavigateToServices) {
      onNavigateToServices();
    } else {
      document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background Images with Slideshow */}
        <div className="absolute inset-0 z-0">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className="absolute inset-0 will-change-transform transition-opacity duration-1000"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: `scale(${scale}) translateY(${parallaxY}px)`,
                opacity: currentBgImage === index ? 1 : 0,
                transition: 'opacity 1s ease-in-out, transform 0.1s ease-out',
              }}
            >
              <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-white/90 dark:to-black transition-colors duration-500"></div>
            </div>
          ))}
        </div>

        {/* Animated particles with parallax */}
        <div className="absolute inset-0 z-1">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-rose-400/40 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                transform: `translateY(${scrollY * (0.1 + Math.random() * 0.3)}px)`,
              }}
            />
          ))}
        </div>

        {/* Glass Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
          <div className="max-w-7xl mx-auto bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-3xl px-8 py-4 shadow-2xl transition-all duration-500">
            <div className="flex items-center justify-between">
              <div className="text-gray-900 dark:text-white flex items-center gap-3 transition-colors duration-500">
                <div className="relative">
                  <div className="text-4xl bg-linear-to-r from-(--primary) via-(--gold-champagne) to-(--primary-hover) bg-clip-text text-transparent tracking-tight font-[var(--font-display)] font-normal">
                    Queen's
                  </div>
                </div>
                <span className="text-xs md:text-sm font-semibold tracking-[0.28em] uppercase text-gray-900 dark:text-gray-100">
                  Nails Hair & Skincare
                </span>
              </div>
              <div className="hidden md:flex gap-8 text-gray-900 dark:text-white items-center transition-colors duration-500">
                <button 
                  onClick={() => onNavigateToServices && onNavigateToServices()}
                  className="hover:text-rose-500 dark:hover:text-rose-300 transition-all duration-300 relative group"
                  aria-label={t('nav.services')}
                >
                  {t('nav.services')}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 dark:bg-rose-400 group-hover:w-full transition-all duration-300"></span>
                </button>
                <a href="#gallery" className="hover:text-rose-500 dark:hover:text-rose-300 transition-all duration-300 relative group">
                  {t('nav.gallery')}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 dark:bg-rose-400 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="#testimonials" className="hover:text-rose-500 dark:hover:text-rose-300 transition-all duration-300 relative group">
                  {t('nav.reviews')}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 dark:bg-rose-400 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="#contact" className="hover:text-rose-500 dark:hover:text-rose-300 transition-all duration-300 relative group">
                  {t('nav.contact')}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 dark:bg-rose-400 group-hover:w-full transition-all duration-300"></span>
                </a>
                <LanguageSelector />
                <button
                  onClick={toggleTheme}
                  className="ml-4 p-2.5 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="text-yellow-500" size={20} />
                  ) : (
                    <Moon className="text-gray-700" size={20} />
                  )}
                </button>
              </div>
              <div className="md:hidden flex items-center gap-3">
                <LanguageSelector />
                <button
                  onClick={toggleTheme}
                  className="p-2.5 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 rounded-xl transition-all duration-300"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="text-yellow-500" size={20} />
                  ) : (
                    <Moon className="text-gray-700" size={20} />
                  )}
                </button>
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2.5 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 rounded-xl transition-all duration-300"
                  aria-label="Open menu"
                >
                  <Menu className="text-gray-900 dark:text-white" size={20} />
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Content with Story */}
        <div 
          className="relative z-10 text-center text-gray-900 dark:text-white px-6 max-w-5xl transition-all duration-500"
          style={{ opacity, transform: `translateY(${scrollY * 0.2}px)` }}
        >
          {/* Story Introduction */}
          <div className="mb-8 inline-block animate-in fade-in slide-in-from-top-5 duration-1000">
            <span className="px-6 py-2 bg-rose-500/20 backdrop-blur-sm border border-rose-400/30 rounded-full text-rose-600 dark:text-rose-300 text-sm transition-colors duration-500">
              ✨ {t('hero.badge')}
            </span>
          </div>
          
          {/* Dynamic Title */}
          <h1 className="text-6xl md:text-8xl mb-8 leading-tight">
            <span className="block mb-4 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
              <span className="bg-linear-to-r from-gray-900 via-rose-600 to-rose-700 dark:from-white dark:via-rose-100 dark:to-rose-200 bg-clip-text text-transparent">
                {t('hero.title1')}
              </span>
            </span>
            <span className="block relative h-24 md:h-32 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-400">
              {storyWords.map((word, index) => (
                <span
                  key={word}
                  className={`absolute inset-0 bg-linear-to-r from-rose-600 via-rose-500 to-rose-700 dark:from-rose-200 dark:via-rose-300 dark:to-rose-400 bg-clip-text text-transparent transition-all duration-700 ${
                    index === currentWord
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-0 translate-y-8 scale-95'
                  }`}
                >
                  {word}
                </span>
              ))}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-700 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed transition-colors duration-500 animate-in fade-in slide-in-from-bottom-5 delay-600">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-in fade-in slide-in-from-bottom-5 duration-700 delay-800">
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="group relative bg-linear-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white px-10 py-5 rounded-full transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl shadow-rose-500/50 hover:shadow-rose-500/70 hover:scale-105 overflow-hidden cursor-pointer"
            >
              <Calendar size={22} className="relative z-10" />
              <span className="relative z-10">{t('hero.cta1')}</span>
              <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            </button>
            <button 
              onClick={handleViewServices}
              className="group bg-white/80 dark:bg-white/10 backdrop-blur-sm hover:bg-white dark:hover:bg-white/20 text-gray-900 dark:text-white px-10 py-5 rounded-full border-2 border-gray-300 dark:border-white/30 hover:border-rose-500 dark:hover:border-rose-400/50 transition-all duration-300 shadow-lg hover:scale-105 cursor-pointer"
              aria-label={t('hero.cta2')}
            >
              {t('hero.cta2')}
            </button>
          </div>

          {/* Story Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700 delay-1000">
            {[
              { number: '10+', label: t('hero.stat1') },
              { number: '500+', label: t('hero.stat2') },
              { number: '5.0', label: t('hero.stat3') },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl bg-linear-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Animated Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-sm text-gray-600 dark:text-gray-400">{t('hero.scroll')}</span>
          <div className="w-8 h-12 border-2 border-gray-600 dark:border-white/50 rounded-full flex items-start justify-center p-2 transition-colors duration-500">
            <div className="w-1.5 h-4 bg-rose-500 dark:bg-rose-400 rounded-full animate-pulse transition-colors duration-500"></div>
          </div>
          <ChevronDown className="text-gray-600 dark:text-gray-400 animate-pulse" size={20} />
        </div>
      </section>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        onBookAppointment={() => setIsBookingOpen(true)}
        onNavigateToServices={onNavigateToServices}
      />
      <LanguageSelector />
    </>
  );
}
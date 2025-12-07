import { Calendar, Star, Sparkles, Moon, Sun, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';
import { useTranslation } from '../contexts/TranslationContext';
import { BookingModal } from './BookingModal';
import { MobileMenu } from './MobileMenu';

export function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scale = 1 + scrollY * 0.0003;
  const opacity = 1 - scrollY * 0.001;

  const handleViewServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Zoom Effect */}
        <div 
          className="absolute inset-0 z-0 transition-transform duration-100 ease-out will-change-transform"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1650176491728-a5e6edd08575?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWlsJTIwc2Fsb24lMjBtYW5pY3VyZXxlbnwxfHx8fDE3NjQ5NjQ5NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `scale(${scale})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-white/90 dark:to-black transition-colors duration-500"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 z-[1]">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-rose-400/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
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
                  <Star className="fill-rose-500 text-rose-500 dark:fill-rose-400 dark:text-rose-400 transition-colors duration-500" size={32} />
                  <Sparkles className="absolute -top-1 -right-1 text-rose-400 dark:text-rose-300 transition-colors duration-500" size={16} />
                </div>
                <span className="text-2xl bg-gradient-to-r from-gray-900 to-rose-600 dark:from-white dark:to-rose-200 bg-clip-text text-transparent">
                  Luxe Nails
                </span>
              </div>
              <div className="hidden md:flex gap-8 text-gray-900 dark:text-white items-center transition-colors duration-500">
                <a href="#services" className="hover:text-rose-500 dark:hover:text-rose-300 transition-all duration-300 relative group">
                  {t('nav.services')}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 dark:bg-rose-400 group-hover:w-full transition-all duration-300"></span>
                </a>
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
                <button
                  onClick={toggleTheme}
                  className="p-2.5 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="text-yellow-500" size={20} />
                  ) : (
                    <Moon className="text-gray-700" size={20} />
                  )}
                </button>
              </div>
              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center gap-3">
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

        {/* Hero Content */}
        <div 
          className="relative z-10 text-center text-gray-900 dark:text-white px-6 max-w-5xl transition-all duration-500"
          style={{ opacity }}
        >
          <div className="mb-6 inline-block">
            <span className="px-6 py-2 bg-rose-500/20 backdrop-blur-sm border border-rose-400/30 rounded-full text-rose-600 dark:text-rose-300 text-sm transition-colors duration-500">
              {t('hero.badge')}
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl mb-8 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-rose-600 to-rose-700 dark:from-white dark:via-rose-100 dark:to-rose-200 bg-clip-text text-transparent">
              {t('hero.title1')}
            </span>
            <br />
            <span className="bg-gradient-to-r from-rose-600 via-rose-500 to-rose-700 dark:from-rose-200 dark:via-rose-300 dark:to-rose-400 bg-clip-text text-transparent">
              {t('hero.title2')}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-700 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed transition-colors duration-500">
            {t('hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="group relative bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white px-10 py-5 rounded-full transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl shadow-rose-500/50 hover:shadow-rose-500/70 hover:scale-105"
            >
              <Calendar size={22} />
              <span>{t('hero.bookBtn')}</span>
              <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button 
              onClick={handleViewServices}
              className="group bg-white/80 dark:bg-white/10 backdrop-blur-sm hover:bg-white dark:hover:bg-white/20 text-gray-900 dark:text-white px-10 py-5 rounded-full border-2 border-gray-300 dark:border-white/30 hover:border-rose-500 dark:hover:border-rose-400/50 transition-all duration-300 shadow-lg hover:scale-105"
            >
              {t('hero.servicesBtn')}
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-8 h-12 border-2 border-gray-600 dark:border-white/50 rounded-full flex items-start justify-center p-2 transition-colors duration-500">
            <div className="w-1.5 h-4 bg-rose-500 dark:bg-rose-400 rounded-full transition-colors duration-500"></div>
          </div>
        </div>
      </section>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        onBookAppointment={() => setIsBookingOpen(true)}
      />
    </>
  );
}
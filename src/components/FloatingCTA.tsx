import { Calendar, ArrowUp, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FloatingCTAProps {
  onBookClick: () => void;
}

export function FloatingCTA({ onBookClick }: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling past hero (viewport height)
      setIsVisible(window.scrollY > window.innerHeight);
      // Show scroll to top after scrolling 500px
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Book Button */}
      <button
        onClick={onBookClick}
        className={`fixed bottom-8 right-8 z-40 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white px-6 py-4 rounded-full shadow-2xl shadow-rose-500/50 flex items-center gap-3 transition-all duration-500 hover:scale-110 group cursor-pointer ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        <Sparkles size={20} className="group-hover:rotate-12 transition-transform duration-300" />
        <span className="hidden sm:inline">Book Now</span>
        
        {/* Ripple effect */}
        <span className="absolute inset-0 rounded-full bg-rose-400 animate-ping opacity-20"></span>
      </button>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        className={`fixed bottom-8 right-8 z-30 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 ${
          showScrollTop && !isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
}
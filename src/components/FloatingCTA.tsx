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
        className={`fixed bottom-8 right-8 z-40 bg-brand-gold-soft hover:bg-brand-gold-muted text-brand-dark dark:bg-brand-gold-soft dark:hover:bg-brand-gold dark:text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 transition-all duration-500 hover:scale-110 group cursor-pointer ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        <Sparkles size={20} className="group-hover:rotate-12 transition-transform duration-300" />
        <span className="hidden sm:inline">Book Now</span>
        
        {/* Ripple effect */}
        <span className="absolute inset-0 rounded-full bg-brand-gold-soft animate-ping opacity-20"></span>
      </button>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        className={`fixed bottom-8 right-8 z-30 bg-card border-2 border-border text-foreground p-3 rounded-full shadow-xl hover:shadow-2xl hover:border-brand-gold-muted transition-all duration-500 hover:scale-110 ${
          showScrollTop && !isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
}
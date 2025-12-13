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
        className={`fixed bottom-8 right-8 z-40 relative overflow-hidden bg-[image:var(--gradient-primary-action)] text-[color:var(--gold-champagne)] px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 transition-all duration-500 hover:scale-110 hover:brightness-110 active:brightness-95 group cursor-pointer before:content-[''] before:pointer-events-none before:absolute before:inset-0 before:bg-linear-to-r before:from-transparent before:via-[color:var(--btn-sheen)] before:to-transparent before:-skew-x-12 before:translate-x-[-200%] before:transition-transform before:duration-700 before:ease-out hover:before:translate-x-[200%] hover:before:via-[color:var(--btn-sheen-hover)] ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        <Sparkles size={20} className="group-hover:rotate-12 transition-transform duration-300" />
        <span className="hidden sm:inline">Book Now</span>
        
        {/* Ripple effect */}
        <span className="absolute inset-0 rounded-full bg-[image:var(--gradient-primary-action)] animate-ping opacity-20"></span>
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
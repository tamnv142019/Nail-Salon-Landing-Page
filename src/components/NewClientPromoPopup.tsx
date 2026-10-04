import { useEffect, useState } from 'react';
import { X, Gift, Sparkles, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function NewClientPromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const hasSeenBefore = localStorage.getItem('newClientPromoSeen');
    if (!hasSeenBefore) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('newClientPromoSeen', 'true');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border-2 transition-all duration-300 relative">
          {/* Header with animated sparkles */}
          <div className="relative bg-gradient-to-r from-rose-600 via-primary-600 to-amber-500 p-6 text-white overflow-hidden">
            {/* Background sparkles */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(5)].map((_, i) => (
                <Sparkles
                  key={i}
                  className="absolute animate-pulse"
                  size={20 + (i % 3) * 10}
                  style={{
                    left: `${20 + (i * 15) % 60}%`,
                    top: `${15 + (i * 20) % 50}%`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white cursor-pointer hover:bg-white/30 hover:scale-110 transition-all duration-200 shadow-sm z-10"
              aria-label="Close"
              title="Close"
            >
              <X size={24} />
            </button>

            {/* Title */}
            <div className="relative z-10 pt-4">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Gift size={28} />
                <h2 className="text-2xl sm:text-3xl font-bold">Special Offer</h2>
              </div>
              <p className="text-sm text-white/80 text-center">Exclusive welcome offer for new clients</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Discount badge */}
            <div className="text-center mb-6">
              <div className="inline-block bg-gradient-to-r from-rose-500 to-amber-500 text-white px-6 py-3 rounded-full font-bold text-3xl sm:text-4xl mb-3 shadow-lg">
                10% OFF
              </div>
              <p className="text-foreground text-lg font-bold">Your First Visit</p>
              <p className="text-sm text-muted-foreground mt-1">
                On any of our premium nail, hair, or skincare services
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-3 mb-6 bg-secondary/50 dark:bg-secondary p-4 rounded-xl">
              {['Valid for all services', 'No coupon code needed', 'First-time customers only'].map(
                (item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-green-500 font-bold text-lg shrink-0">✓</span>
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                )
              )}
            </div>

            {/* Promo Code */}
            <div className="bg-rose-50 dark:bg-rose-900/30 border-2 border-rose-200 dark:border-rose-700 p-4 rounded-xl mb-6 text-center">
              <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide font-medium">Use code</p>
              <p className="text-2xl font-bold text-rose-600 dark:text-rose-400 font-mono tracking-wider">WELCOME10</p>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  handleClose();
                  window.location.href = 'tel:(619)2245050';
                }}
                className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <Phone size={20} />
                Call Now to Book
              </button>
              <button
                onClick={handleClose}
                className="w-full bg-white dark:bg-primary-foreground text-foreground dark:text-foreground border-2 border-border font-semibold py-2 rounded-lg hover:bg-secondary dark:hover:bg-secondary transition-colors"
              >
                Maybe Later
              </button>
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-muted-foreground mt-4">
              Offer valid for first-time customers only. Valid through April 30, 2026.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
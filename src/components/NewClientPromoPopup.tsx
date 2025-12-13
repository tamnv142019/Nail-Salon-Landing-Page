import { useEffect, useState } from 'react';
import { X, Gift, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function NewClientPromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSeenPopup, setHasSeenPopup] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenBefore = localStorage.getItem('newClientPopupSeen');
    if (!hasSeenBefore) {
      // Show popup after 2 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasSeenPopup(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setHasSeenPopup(true);
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
    localStorage.setItem('newClientPopupSeen', 'true');
  };

  if (!isOpen || hasSeenPopup) {
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
        <div className="bg-gradient-to-br from-red-50 via-white to-yellow-50 dark:from-red-900/20 dark:via-slate-900 dark:to-yellow-900/20 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border-2 border-red-200 dark:border-red-700 animate-in scale-in-95 duration-300">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-red-500 via-green-500 to-yellow-500 p-6 text-white overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(5)].map((_, i) => (
                <Sparkles
                  key={i}
                  className="absolute animate-pulse"
                  size={20 + Math.random() * 20}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors z-10"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Title */}
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Gift size={28} />
                <h2 className="text-2xl font-bold">Special Welcome!</h2>
              </div>
              <p className="text-sm opacity-90">Exclusive offer for new clients</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="text-center mb-6">
              <div className="inline-block bg-gradient-to-r from-red-500 to-yellow-500 text-white px-6 py-3 rounded-full font-bold text-2xl mb-4 shadow-lg">
                20% OFF
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold mb-2">
                Your First Service
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Enjoy a special discount on any of our premium nail, hair, or skincare services
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-3 mb-6 bg-white/50 dark:bg-white/5 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">Valid for all services</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">No coupon code needed</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">First-time customers only</span>
              </div>
            </div>

            {/* Promo Code */}
            <div className="bg-gradient-to-r from-red-100 to-yellow-100 dark:from-red-900/30 dark:to-yellow-900/30 p-3 rounded-lg mb-6 text-center border-2 border-red-200 dark:border-red-700">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Use code:</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400 font-mono">WELCOME20</p>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleClose}
                className="w-full bg-gradient-to-r from-red-500 to-green-500 hover:from-red-600 hover:to-green-600 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Book Your Appointment
              </button>
              <button
                onClick={handleClose}
                className="w-full bg-white dark:bg-slate-800 text-gray-900 dark:text-white border-2 border-red-200 dark:border-red-700 font-semibold py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                Maybe Later
              </button>
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
              Offer valid for first-time customers only. Valid through December 31, 2025.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

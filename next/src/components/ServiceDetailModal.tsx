import { X, Clock, DollarSign, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { BookingModal } from './BookingModal';

interface Service {
  icon: any;
  title: string;
  description: string;
  price: string;
  duration: string;
  gradient: string;
  details: string[];
  benefits: string[];
}

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

export function ServiceDetailModal({ isOpen, onClose, service }: ServiceDetailModalProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
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
  }, [isOpen, onClose]);

  if (!isOpen || !service) return null;

  const handleBookNow = () => {
    setIsBookingOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}>
        <div 
          className="relative w-full max-w-3xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with gradient */}
          <div className={`relative bg-gradient-to-r ${service.gradient} px-8 py-12`}>
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90"
              aria-label="Close service details"
            >
              <X className="text-white" size={20} />
            </button>
            
            <div className="flex items-center gap-6 animate-in slide-in-from-left-5 duration-500">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <service.icon className="text-white" size={40} strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-4xl text-white mb-2">{service.title}</h2>
                <p className="text-white/90">{service.description}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Price & Duration */}
            <div className="flex gap-6 mb-8">
              <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="text-rose-500 dark:text-rose-400" size={24} />
                  <span className="text-gray-600 dark:text-gray-300">Price</span>
                </div>
                <p className={`text-3xl bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent font-semibold`}>
                  {service.price}
                </p>
              </div>
              <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="text-purple-500 dark:text-purple-400" size={24} />
                  <span className="text-gray-600 dark:text-gray-300">Duration</span>
                </div>
                <p className="text-3xl text-gray-900 dark:text-white font-semibold">{service.duration}</p>
              </div>
            </div>

            {/* What's Included */}
            <div className="mb-8">
              <h3 className="text-2xl mb-4 text-gray-900 dark:text-white">What{"'"}s Included</h3>
              <div className="space-y-3">
                {service.details.map((detail, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 animate-in slide-in-from-left-3 duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`w-6 h-6 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Check className="text-white" size={14} />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-8">
              <h3 className="text-2xl mb-4 text-gray-900 dark:text-white">Benefits</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {service.benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 rounded-xl p-4 hover:scale-105 transition-transform duration-300 animate-in zoom-in duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="text-2xl">✨</span>
                    <p className="text-gray-700 dark:text-gray-300">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Book Button */}
            <button
              onClick={handleBookNow}
              className={`group relative w-full bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white py-5 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 overflow-hidden`}
            >
              <span className="relative z-10">Book This Service Now</span>
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            </button>
          </div>
        </div>
      </div>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onBookClick: () => void;
  onNavigateToServices?: (serviceId?: string) => void;
}

const backgroundImages = [
  'https://images.unsplash.com/photo-1595944024804-733665a112db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBuYWlsJTIwc2Fsb24lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjUyNzM3NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1715848503470-9fa455906001?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW5pY3VyZSUyMHNlcnZpY2V8ZW58MXx8fHwxNzY1Mjk1MTAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5pY3VyZXxlbnwxfHx8fDE3NjUyOTI5NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1610992015732-2449b76344bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWlsJTIwc2Fsb258ZW58MXx8fHwxNzY1MjkyOTcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
];

export function HeroSection({ onBookClick, onNavigateToServices }: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Images with Slideshow */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              opacity: index === currentImageIndex ? 1 : 0,
            }}
          >
            <img
              src={image}
              alt="Nail Salon"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-4 md:mb-6 leading-tight">
            Queen's Nails Hair<br />& Skincare
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-2xl text-white/90 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
            Premier Nail Salon & Spa in San Diego
          </p>

          {/* Location */}
          <div className="flex items-center justify-center gap-2 text-white/80 mb-10">
            <MapPin size={20} />
            <span className="text-base md:text-lg">4869 Santa Monica Ave, San Diego, CA 92107</span>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => {
              const servicesElement = document.getElementById('about');
              if (servicesElement) {
                // Smooth scroll animation with easing effect
                const startPosition = window.scrollY;
                const targetPosition = servicesElement.getBoundingClientRect().top + window.scrollY;
                const distance = targetPosition - startPosition;
                const duration = 1500; // 1.5 seconds for smooth scroll
                let start = null;

                const easeInOutCubic = (t) => {
                  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                };

                const scroll = (timestamp) => {
                  if (!start) start = timestamp;
                  const progress = (timestamp - start) / duration;

                  if (progress < 1) {
                    window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));
                    requestAnimationFrame(scroll);
                  } else {
                    window.scrollTo(0, targetPosition);
                  }
                };

                requestAnimationFrame(scroll);
              }
            }}
            className="group relative px-8 py-4 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white rounded-full transition-all duration-300 hover:scale-105 shadow-2xl text-lg font-semibold w-full sm:w-auto cursor-pointer"
          >
            <span className="flex items-center justify-center gap-2">
              Find Out More
            </span>
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/70 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
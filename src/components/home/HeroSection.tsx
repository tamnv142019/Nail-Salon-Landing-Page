import { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';

interface HeroSectionProps {
  onBookClick: () => void;
  onNavigateToServices?: (serviceId?: string) => void;
}

const backgroundImages = [
  '/background/1.jpg',
  '/background/2.jpg',
  '/background/3.jpg',
  '/background/4.jpg',
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5pY3VyZXxlbnwxfHx8fDE3NjUyOTI5NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
];

export function HeroSection({ onBookClick, onNavigateToServices }: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useLanguage();
  const magicRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleMagicMouseMove = (e: React.MouseEvent) => {
    const el = magicRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--x', `${x}%`);
    el.style.setProperty('--y', `${y}%`);
  };

  const handleMagicMouseLeave = () => {
    const el = magicRef.current;
    if (!el) return;
    el.style.setProperty('--x', `50%`);
    el.style.setProperty('--y', `50%`);
  };


  return (
    <section className="relative h-screen min-h-150 flex items-center justify-center overflow-hidden">
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
        <div className="absolute inset-0 bg-linear-to-br from-[color:var(--scrim-60)] via-[color:var(--scrim-50)] to-[color:var(--scrim-60)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center group">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-[color:var(--on-image-foreground)] font-bold mb-4 md:mb-6 leading-tight transition-transform duration-300 will-change-transform motion-reduce:transition-none group-hover:-translate-y-1">
            <span
              ref={magicRef}
              onMouseMove={handleMagicMouseMove}
              onMouseLeave={handleMagicMouseLeave}
              className="magic-light-wrap inline-block"
              style={{ ['--x' as any]: '50%', ['--y' as any]: '50%' } as React.CSSProperties}
            >
              <span className="magic-light-text">{t('home.hero.title.line1', "Queen's")}</span>
              <br />
              <span className="magic-light-text">{t('home.hero.title.line2', 'Nails Hair & Skincare')}</span>
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-2xl text-[color:var(--on-image-foreground-muted)] mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed transition-colors duration-300 motion-reduce:transition-none group-hover:text-[color:var(--on-image-foreground)]">
            {t('home.hero.description', 'Premier Nail Salon & Spa in Ocean Beach')}
          </p>

          {/* Location */}
          <a
            href="https://maps.app.goo.gl/Bc8jystzMK7y5Ct49"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-[color:var(--on-image-foreground-muted)] mb-10 transition-transform duration-300 will-change-transform motion-reduce:transition-none group-hover:-translate-y-0.5 transform hover:scale-105 hover:text-brand-gold hover:underline"
          >
            <MapPin size={20} />
            <span className="text-base md:text-lg transition-opacity duration-300 motion-reduce:transition-none group-hover:opacity-100">4869 Santa Monica Ave, San Diego, CA 92107</span>
          </a>

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
                let start: number | null = null;

                const easeInOutCubic = (t: number) => {
                  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                };

                const scroll = (timestamp: number) => {
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
            className="group relative overflow-hidden px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-2xl text-lg font-semibold w-full sm:w-auto cursor-pointer bg-[image:var(--gradient-primary-action)] text-[color:var(--gold-champagne)] hover:brightness-110 active:brightness-95 before:content-[''] before:pointer-events-none before:absolute before:inset-0 before:bg-linear-to-r before:from-transparent before:via-[color:var(--btn-sheen)] before:to-transparent before:-skew-x-12 before:translate-x-[-200%] before:transition-transform before:duration-700 before:ease-out hover:before:translate-x-[200%] hover:before:via-[color:var(--btn-sheen-hover)]"
          >
            <span className="flex items-center justify-center gap-2">
              <span className="transition-all duration-300 motion-reduce:transition-none group-hover:tracking-wide">
                {t('home.hero.button', 'Find Out More')}
              </span>
            </span>
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[color:var(--on-image-foreground-muted)] rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-[color:var(--on-image-foreground-muted)] rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
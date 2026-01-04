import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { Phone } from 'lucide-react';
import { businessInfo } from '../../config/seo.config';
import { motion } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';

interface HeroSectionProps {
  onBookClick: () => void;
  onNavigateToServices?: (serviceId?: string) => void;
}

const backgroundImages = [
  '/images/backgrounds/salon-bg-01.jpg',
  '/images/backgrounds/salon-bg-02.jpg',
  '/images/backgrounds/salon-bg-03.jpg',
  '/images/backgrounds/salon-bg-04.jpg',
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5pY3VyZXxlbnwxfHx8fDE3NjUyOTI5NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
];

function Hover3DText({ text, className }: { text: string; className?: string }) {
  return (
    <span
      className="inline-block perspective-[900px] cursor-default select-none"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <span
        className={`inline-block will-change-transform transition-[transform,filter] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none hover:transform-[translateY(-2px)_translateZ(18px)_rotateX(10deg)] hover:brightness-110 hover:filter-[drop-shadow(0_18px_28px_var(--scrim-60))] ${className ?? ''}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {text}
      </span>
    </span>
  );
}

export function HeroSection({ onBookClick, onNavigateToServices }: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [glitterParticles, setGlitterParticles] = useState<
    Array<{
      id: string;
      x: number;
      y: number;
      sizePx: number;
      floatDurS: number;
      floatDelayS: number;
      twinkleDurS: number;
      twinkleDelayS: number;
      glyph: '✦' | '✧' | '⋆';
      colorVar: '--gold-champagne' | '--primary';
      opacity: number;
    }>
  >([]);
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const glyphs: Array<'✦' | '✧' | '⋆'> = ['✦', '✧', '⋆'];
    const particles = Array.from({ length: 12 }, (_, index) => {
      const isBlue = index % 5 === 0;
      const colorVar: '--gold-champagne' | '--primary' = isBlue ? '--primary' : '--gold-champagne';
      return {
        id: `glitter-${index}`,
        x: 6 + Math.random() * 88,
        y: 8 + Math.random() * 84,
        sizePx: 6 + Math.random() * 6,
        floatDurS: 4.8 + Math.random() * 3.2,
        floatDelayS: Math.random() * 1.8,
        twinkleDurS: 1.4 + Math.random() * 1.8,
        twinkleDelayS: Math.random() * 1.6,
        glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
        colorVar,
        opacity: isBlue ? 0.55 : 0.75,
      };
    });

    setGlitterParticles(particles);
  }, []);

  return (
    <section id="hero" className="relative h-screen min-h-150 flex items-center justify-center overflow-hidden">
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
        <div className="absolute inset-0 bg-linear-to-br from-(--scrim-60) via-(--scrim-50) to-(--scrim-60)"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-(--on-image-foreground) font-bold mb-4 md:mb-6 leading-tight">
            <span className="relative inline-block leading-none">
              {/* Subtle glossy reflection sweep */}
              <span
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-transparent via-(--on-image-foreground) to-transparent opacity-[0.12] mix-blend-overlay -skew-x-12 animate-[glass-shine_4.8s_ease-in-out_infinite] motion-reduce:hidden"
                aria-hidden="true"
              />

              {/* Elegant glitter particles (small count, non-noisy) */}
              {glitterParticles.length > 0 && (
                <span
                  className="pointer-events-none absolute -inset-10 md:-inset-14"
                  aria-hidden="true"
                >
                  {glitterParticles.map((p) => (
                    <span
                      key={p.id}
                      className="absolute animate-float-soft motion-reduce:animate-none"
                      style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        animationDuration: `${p.floatDurS}s`,
                        animationDelay: `${p.floatDelayS}s`,
                      }}
                    >
                      <span
                        className="animate-glitter"
                        style={{
                          fontSize: `${p.sizePx}px`,
                          opacity: p.opacity,
                          color: `var(${p.colorVar})`,
                          animationDelay: `${p.twinkleDelayS}s`,
                          ['--glitter-dur' as any]: `${p.twinkleDurS}s`,
                        }}
                      >
                        {p.glyph}
                      </span>
                    </span>
                  ))}
                </span>
              )}

              <Hover3DText
                text={t('home.hero.title.line1', "Queen's")}
                className="block font-[var(--font-display)] leading-none pr-28 md:pr-40 queens-glitter"
              />

              {/* Magic Queen: crown + sparkles */}
              <span
                className="pointer-events-none absolute -top-2 right-28 md:right-40 text-(--gold-champagne) text-[10px] md:text-[12px] animate-bling motion-reduce:animate-none"
                style={{ animationDelay: '0.15s' }}
                aria-hidden="true"
              >
                ✦
              </span>

              <span className="absolute right-0 bottom-0 text-[11px] md:text-xs lg:text-sm font-semibold tracking-[0.28em] uppercase bg-linear-to-r from-(--primary) via-(--gold-champagne) to-(--primary-hover) bg-clip-text text-transparent">
                {t('home.hero.title.line2', 'Nails Hair & Skincare')}
              </span>
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-2xl text-(--on-image-foreground-muted) mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
            {t('home.hero.description', 'Best Nail Salon & Spa in Ocean Beach')}
          </p>

          {/* Location */}
          {/* Elegant Call Button with Glass Morphism */}
          <a
            href={`tel:${'+1' + businessInfo.phone.replace(/[^0-9]/g, '')}`}
            className="group relative inline-flex items-center justify-center gap-2 px-5 py-3 mb-4 rounded-full bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent outline-none shadow-lg hover:shadow-xl sm:gap-3 sm:px-6"
            aria-label={`Call ${businessInfo.phone}`}
          >
            <span className="call-ring-blur motion-reduce:hidden" aria-hidden="true" />
            <span className="call-ring-animated motion-reduce:hidden" aria-hidden="true" />
            <span className="call-ring-hover motion-reduce:hidden" aria-hidden="true" />

            {/* Phone icon */}
            <span className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:rotate-12 group-hover:animate-sway shrink-0">
              <Phone size={16} className="text-white shrink-0" />
            </span>

            {/* Phone number */}
            <span className="relative z-10 font-semibold text-base leading-none whitespace-nowrap">{businessInfo.phone}</span>
          </a>
          <a
            href="https://maps.app.goo.gl/Bc8jystzMK7y5Ct49"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start justify-center gap-2 text-(--on-image-foreground-muted) mb-10 transition-transform duration-300 will-change-transform motion-reduce:transition-none transform hover:scale-105 hover:text-brand-gold hover:underline sm:items-center"
          >
            <MapPin size={20} className="mt-0.5 shrink-0 sm:mt-0" />
            <span className="text-base md:text-lg">4869 Santa Monica Ave, San Diego, CA 92107</span>
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
            className="group relative overflow-hidden px-8 py-4 rounded-full text-lg font-semibold w-full sm:w-auto cursor-pointer bg-(image:--gradient-primary-action) text-(--gold-champagne) shadow-2xl transition-[transform,filter,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.03] hover:brightness-110 active:brightness-95 outline-none focus-visible:ring-[3px] focus-visible:ring-(--focus-ring) focus-visible:ring-offset-2 focus-visible:ring-offset-background before:content-[''] before:pointer-events-none before:absolute before:inset-0 before:bg-linear-to-r before:from-transparent before:via-(--btn-sheen) before:to-transparent before:-skew-x-12 before:translate-x-[-200%] before:transition-transform before:duration-700 before:ease-out hover:before:translate-x-[200%] hover:before:via-(--btn-sheen-hover)"
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
        <div className="w-6 h-10 border-2 border-(--on-image-foreground-muted) rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-(--on-image-foreground-muted) rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
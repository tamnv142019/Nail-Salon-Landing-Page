import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideShowProps {
  autoplay?: boolean;
  interval?: number;
  onNavigateToServices?: () => void;
}

export function BackgroundSlideshow({ autoplay = true, interval = 5000, onNavigateToServices }: SlideShowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [nextSlide, setNextSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/3629547/pexels-photo-3629547.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Luxury Nail Salon',
      description: 'Premium manicure & pedicure services',
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/3622675/pexels-photo-3622675.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Spa Pedicure',
      description: 'Relaxing foot spa with massage',
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/3585325/pexels-photo-3585325.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Nail Art Design',
      description: 'Custom artistic nail designs',
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Beauty Salon',
      description: 'Complete beauty & skincare treatments',
    },
  ];

  // Scroll effect for parallax
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Auto-play effect
  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      handleNextSlide();
    }, interval);

    return () => clearInterval(timer);
  }, [currentSlide, autoplay, interval]);

  const handleNextSlide = useCallback(() => {
    setIsTransitioning(true);
    setNextSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsTransitioning(false);
    }, 500);
  }, [slides.length]);

  const handlePrevSlide = useCallback(() => {
    setIsTransitioning(true);
    setNextSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsTransitioning(false);
    }, 500);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    if (index === currentSlide) return;
    setIsTransitioning(true);
    setNextSlide(index);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 500);
  }, [currentSlide]);

  const scale = 1 + scrollY * 0.0003;
  const opacity = 1 - scrollY * 0.001;
  const parallaxY = scrollY * 0.5;

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Current Slide Background */}
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          backgroundImage: `url(${slides[currentSlide].image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          transform: `scale(${scale}) translateY(${parallaxY}px)`,
          transition: 'background-image 0.1s ease-out',
          contain: 'layout style paint',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-white/90 dark:to-black transition-colors duration-500"></div>
      </div>

      {/* Fade transition effect */}
      {isTransitioning && (
        <div
          className="absolute inset-0 z-[1] will-change-transform"
          style={{
            backgroundImage: `url(${slides[nextSlide].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            animation: 'fadeIn 0.5s ease-in-out forwards',
            contain: 'layout style paint',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-white/90 dark:to-black transition-colors duration-500"></div>
        </div>
      )}

      {/* Animated particles with parallax */}
      <div className="absolute inset-0 z-[1]">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-rose-400/40 rounded-full animate-pulse will-change-transform"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              transform: `translateY(${scrollY * (0.05 + Math.random() * 0.1)}px)`,
              contain: 'layout style paint',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div
          style={{
            opacity: opacity,
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
          className="will-change-transform"
        >
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl leading-tight">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl text-white/95 mb-8 drop-shadow-lg font-light">
            {slides[currentSlide].description}
          </p>

          <button
            onClick={onNavigateToServices}
            className="inline-block px-10 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl"
          >
            Discover Our Services
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrevSlide}
        aria-label="Previous slide"
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full transition-all duration-300 text-white hover:scale-110 group"
      >
        <ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform duration-300" />
      </button>

      <button
        onClick={handleNextSlide}
        aria-label="Next slide"
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full transition-all duration-300 text-white hover:scale-110 group"
      >
        <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform duration-300" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-3 rounded-full transition-all duration-500 ${
              index === currentSlide
                ? 'w-12 bg-white shadow-lg'
                : 'w-3 bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 z-20 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-white font-semibold">
        {currentSlide + 1} / {slides.length}
      </div>

      {/* CSS Animation for fade transition */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}

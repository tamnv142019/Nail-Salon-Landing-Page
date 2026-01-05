"use client";

import { useEffect, useRef, useState, memo, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import { ImageLightbox } from './ImageLightbox';
import { useMagicClickAnimation } from '../hooks/useMagicClickAnimation';
import { ImageWithFallback } from './figma/ImageWithFallback';

const galleryImages = [
  { url: '/images/gallery/work-01.jpg', title: 'Short Gel Manicure — Soft Pink Finish', category: 'Manicure' },
  { url: '/images/gallery/work-02.jpg', title: 'Hand-Painted Floral Nail Art — Custom Design', category: 'Nail Art' },
  { url: '/images/gallery/work-03.jpg', title: 'Ombre Gel Manicure — Long-Lasting Shine', category: 'Gel' },
  { url: '/images/gallery/work-04.jpg', title: 'Deluxe Spa Pedicure — Relaxing Foot Treatment', category: 'Pedicure' },
  { url: '/images/gallery/work-05.jpg', title: 'Classic Manicure — Clean Natural Look', category: 'Classic' },
  { url: '/images/gallery/work-06.jpg', title: 'Elegant Nail Design with Gold Foil Accent', category: 'Nail Art' },
  { url: '/images/gallery/work-07.jpg', title: 'Premium Gel Manicure — Cuticle Care Included', category: 'Manicure' },
  { url: '/images/gallery/work-08.jpg', title: 'Glossy Gel Nails — High-Shine Finish', category: 'Gel' },
  { url: '/images/gallery/work-09.jpg', title: 'Geometric Nail Art — Modern Minimalist', category: 'Nail Art' },
  { url: '/images/gallery/work-10.jpg', title: 'Rhinestone Accent Nail Design — Creative Details', category: 'Nail Art' },
  { url: '/images/gallery/work-11.jpg', title: 'Luxury Nail Set — High-End Salon Finish', category: 'Luxury' },
  { url: '/images/gallery/work-12.jpg', title: 'Stylish Short Nails — Everyday Chic', category: 'Style' },
  { url: '/images/gallery/work-13.jpg', title: 'Bold Color Trend — Bright Salon Shades', category: 'Style' },
  { url: '/images/gallery/work-14.jpg', title: 'Professional Gel Finish — Deep Gloss', category: 'Gel' },
  { url: '/images/gallery/work-15.jpg', title: 'Matte and Gloss Contrast — Modern Manicure', category: 'Design' },
  { url: '/images/gallery/work-16.jpg', title: 'Soft Nude Manicure — Natural-Looking Nails', category: 'Manicure' },
  { url: '/images/gallery/work-17.jpg', title: 'Bridal Nail Design — Subtle Sparkle', category: 'Bridal' },
  { url: '/images/gallery/work-18.jpg', title: 'Vibrant Summer Nail Art — Seasonal Collection', category: 'Nail Art' },
  { url: '/images/gallery/work-19.jpg', title: '3D Embellishment Trend — Textured Nail Art', category: 'Nail Art' },
  { url: '/images/gallery/work-20.jpg', title: 'Classic French Manicure — Timeless Elegance', category: 'Classic' },
  { url: '/images/gallery/work-21.jpg', title: 'Salon Color Statement — Bold and Bright Tips', category: 'Style' },
  { url: '/images/gallery/work-22.jpg', title: 'Fine Brush Nail Art — Detailed Handwork', category: 'Nail Art' },
  { url: '/images/gallery/work-23.jpg', title: 'Durable Salon Acrylics — Professional Extensions', category: 'Acrylic' },
  { url: '/images/gallery/work-24.jpg', title: 'Trendy Short Gel — Low-Maintenance Chic', category: 'Gel' },
  { url: '/images/gallery/work-25.jpg', title: 'Holiday Nail Art — Seasonal Designs', category: 'Nail Art' },
  { url: '/images/gallery/work-26.jpg', title: 'Ombre Gradient Nails — Soft Color Blend', category: 'Gel' },
  { url: '/images/gallery/work-27.jpg', title: 'Custom Hand-Painted Nail Art — Unique Creations', category: 'Nail Art' },
  { url: '/images/gallery/work-28.jpg', title: 'Luxury Spa Pedicure — Revitalizing Treatment', category: 'Pedicure' },
];

function GalleryImage({ image, index, onClick }: { image: typeof galleryImages[0]; index: number; onClick: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [scale, setScale] = useState(0.9);
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => setScale(1), 50);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div
      ref={imageRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer bg-card border border-border hover:border-brand-gold/50 transition-all duration-500 will-change-transform hover:shadow-xl hover:shadow-brand-gold/10"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `scale(${scale}) ${isHovered ? 'translateY(-4px)' : 'translateY(0)'}`,
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDelay: `${index * 50}ms`,
      }}
    >
      <ImageWithFallback
        src={image.url}
        alt={image.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-start justify-end p-4 md:p-5">
        <span className="px-3 py-1 bg-brand-gold/90 backdrop-blur-sm rounded-full text-white text-xs font-semibold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          {image.category}
        </span>
        <h3 className="text-white text-sm md:text-base font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 line-clamp-2">
          {image.title}
        </h3>
      </div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
    </div>
  );
}

const MemoizedGalleryImage = memo(GalleryImage);

export function Gallery() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const magicClick = useMagicClickAnimation({ particleCount: 15, duration: 500 });

  const handleImageClick = useCallback((index: number, event?: React.MouseEvent<HTMLDivElement>) => {
    if (event && 'currentTarget' in event) {
      magicClick(event as any);
    }
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  }, []);

  const handlePrevious = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  }, []);

  const handleLightboxClose = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  return (
    <>
      <section id="gallery" className="py-20 md:py-24 px-4 md:px-6 bg-background text-foreground relative overflow-hidden transition-colors duration-500">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-btn-accent/35 dark:bg-brand-gold/10 blur-3xl" />
          <div className="absolute -bottom-28 -left-24 h-96 w-96 rounded-full bg-brand-sapphire/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Header Section */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl mb-4 font-bold text-black dark:text-white">
              Our Stunning Work
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Browse our portfolio of stunning nail designs and transformations. Each piece showcases our commitment to artistry and excellence.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {galleryImages.map((image, index) => (
              <MemoizedGalleryImage 
                key={index} 
                image={image} 
                index={index}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <ImageLightbox
        isOpen={isLightboxOpen}
        onClose={handleLightboxClose}
        images={galleryImages}
        currentIndex={currentImageIndex}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </>
  );
}
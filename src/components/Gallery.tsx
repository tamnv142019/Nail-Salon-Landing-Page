"use client";

import { useEffect, useRef, useState, memo, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import { ImageLightbox } from './ImageLightbox';
import { useMagicClickAnimation } from '../hooks/useMagicClickAnimation';
import { ImageWithFallback } from './figma/ImageWithFallback';

const galleryImages = [
  { url: '/gallery/o(14).jpg', title: 'Short Gel Manicure — Soft Pink Finish', category: 'Manicure' },
  { url: '/gallery/z7306818957474_7bbf145cb65ce362bf316b2186e3ec94.jpg', title: 'Hand-Painted Floral Nail Art — Custom Design', category: 'Nail Art' },
  { url: '/gallery/z7306818969485_f1c7a367fbfd2a5297ebf5f55edffc94.jpg', title: 'Ombre Gel Manicure — Long-Lasting Shine', category: 'Gel' },
  { url: '/gallery/z7306818985679_5434cd64c962b9879bc6c30adc947b71.jpg', title: 'Deluxe Spa Pedicure — Relaxing Foot Treatment', category: 'Pedicure' },
  { url: '/gallery/z7306819004726_7744781e7b76b3a59c9016cd4fd51cc8.jpg', title: 'Classic Manicure — Clean Natural Look', category: 'Classic' },
  { url: '/gallery/z7306819011825_f70b49effdbf8e58ab381ce39704dca8.jpg', title: 'Elegant Nail Design with Gold Foil Accent', category: 'Nail Art' },
  { url: '/gallery/z7306819030776_4b75cfa8a628ad74cc1fa04a62190967.jpg', title: 'Premium Gel Manicure — Cuticle Care Included', category: 'Manicure' },
  { url: '/gallery/z7306819037746_3d289f83ddf83fcf4f8cbcd2c55564a5.jpg', title: 'Glossy Gel Nails — High-Shine Finish', category: 'Gel' },
  { url: '/gallery/z7306819064614_2408df597e0630b0a1c8300bc96dc200.jpg', title: 'Geometric Nail Art — Modern Minimalist', category: 'Nail Art' },
  { url: '/gallery/z7306819075298_b6ed5c116ec835ba896819471201c1ba.jpg', title: 'Rhinestone Accent Nail Design — Creative Details', category: 'Nail Art' },
  { url: '/gallery/z7306819105783_7e5957d5b883ee54db70296934904dbd.jpg', title: 'Luxury Nail Set — High-End Salon Finish', category: 'Luxury' },
  { url: '/gallery/o.jpg', title: 'Stylish Short Nails — Everyday Chic', category: 'Style' },
  { url: '/gallery/o (1).jpg', title: 'Bold Color Trend — Bright Salon Shades', category: 'Style' },
  { url: '/gallery/o (2).jpg', title: 'Professional Gel Finish — Deep Gloss', category: 'Gel' },
  { url: '/gallery/o (3).jpg', title: 'Matte & Gloss Contrast — Modern Manicure', category: 'Design' },
  { url: '/gallery/o (4).jpg', title: 'Soft Nude Manicure — Natural-Looking Nails', category: 'Manicure' },
  { url: '/gallery/o (5).jpg', title: 'Bridal Nail Design — Subtle Sparkle', category: 'Bridal' },
  { url: '/gallery/o (6).jpg', title: 'Vibrant Summer Nail Art — Seasonal Collection', category: 'Nail Art' },
  { url: '/gallery/o (7).jpg', title: '3D Embellishment Trend — Textured Nail Art', category: 'Nail Art' },
  { url: '/gallery/o (8).jpg', title: 'Classic French Manicure — Timeless Elegance', category: 'Classic' },
  { url: '/gallery/o (9).jpg', title: 'Salon Color Statement — Bold & Bright Tips', category: 'Style' },
  { url: '/gallery/o (10).jpg', title: 'Fine Brush Nail Art — Detailed Handwork', category: 'Nail Art' },
  { url: '/gallery/o (11).jpg', title: 'Durable Salon Acrylics — Professional Extensions', category: 'Acrylic' },
  { url: '/gallery/o(12).jpg', title: 'Trendy Short Gel — Low-Maintenance Chic', category: 'Gel' },
  { url: '/gallery/o(15).jpg', title: 'Holiday Nail Art — Seasonal Designs', category: 'Nail Art' },
  { url: '/gallery/o(16).jpg', title: 'Ombre Gradient Nails — Soft Color Blend', category: 'Gel' },
  { url: '/gallery/o(17).jpg', title: 'Custom Hand-Painted Nail Art — Unique Creations', category: 'Nail Art' },
  { url: '/gallery/o(18).jpg', title: 'Luxury Spa Pedicure — Revitalizing Treatment', category: 'Pedicure' },
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
      className="group relative aspect-square overflow-hidden rounded-3xl cursor-pointer border-2 border-gray-200 dark:border-gray-700 hover:border-rose-500 dark:hover:border-rose-500 transition-all duration-500 will-change-transform hover:shadow-2xl hover:shadow-rose-500/30"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `scale(${scale}) ${isHovered ? 'translateY(-8px)' : 'translateY(0)'}`,
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <ImageWithFallback
        src={image.url}
        alt={image.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
      />
      
      {/* Overlay with glassmorphism */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center backdrop-blur-sm">
        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 border border-white/30 scale-0 group-hover:scale-110 transition-all duration-500 delay-100">
          <Sparkles className="text-white" size={28} />
        </div>
        <h3 className="text-white text-xl mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">{image.title}</h3>
        <span className="px-4 py-1 bg-rose-500/90 backdrop-blur-sm rounded-full text-white text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
          {image.category}
        </span>
      </div>
      
      {/* Corner accent with animation */}
      <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-rose-400/0 group-hover:border-rose-400 transition-all duration-500 rounded-tr-2xl"></div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
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
      <section id="gallery" className="py-32 px-6 bg-background text-foreground relative overflow-hidden transition-colors duration-500">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse transition-colors duration-500"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <h2 className="text-5xl md:text-7xl mb-6 bg-linear-to-r from-foreground via-brand-gold-muted to-foreground bg-clip-text text-transparent">
              Our Stunning Work
            </h2>

            <p className="text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed transition-colors duration-500">
              Browse our portfolio of stunning nail designs and transformations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
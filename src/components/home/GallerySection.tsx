"use client";

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const galleryImages = [
  '/gallery/o(14).jpg',
  '/gallery/z7306818957474_7bbf145cb65ce362bf316b2186e3ec94.jpg',
  '/gallery/z7306818969485_f1c7a367fbfd2a5297ebf5f55edffc94.jpg',
  '/gallery/z7306818985679_5434cd64c962b9879bc6c30adc947b71.jpg',
  '/gallery/z7306819004726_7744781e7b76b3a59c9016cd4fd51cc8.jpg',
  '/gallery/z7306819011825_f70b49effdbf8e58ab381ce39704dca8.jpg',
  '/gallery/z7306819030776_4b75cfa8a628ad74cc1fa04a62190967.jpg',
  '/gallery/z7306819037746_3d289f83ddf83fcf4f8cbcd2c55564a5.jpg',
  '/gallery/z7306819064614_2408df597e0630b0a1c8300bc96dc200.jpg',
  '/gallery/z7306819075298_b6ed5c116ec835ba896819471201c1ba.jpg',
  '/gallery/z7306819105783_7e5957d5b883ee54db70296934904dbd.jpg',
  '/gallery/o.jpg',
  '/gallery/o (1).jpg',
  '/gallery/o (2).jpg',
  '/gallery/o (3).jpg',
  '/gallery/o (4).jpg',
  '/gallery/o (5).jpg',
  '/gallery/o (6).jpg',
  '/gallery/o (7).jpg',
  '/gallery/o (8).jpg',
  '/gallery/o (9).jpg',
  '/gallery/o (10).jpg',
  '/gallery/o (11).jpg',
  '/gallery/o(12).jpg',
  '/gallery/o(15).jpg',
  '/gallery/o(16).jpg',
  '/gallery/o(17).jpg',
  '/gallery/o(18).jpg',
];

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="gallery" className="py-20 md:py-32 bg-secondary dark:bg-background transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              {t('gallerySection.title', 'Our Work')}
            </h2>
            <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto">
              {t('gallerySection.subtitle', 'Browse our gallery of beautiful nails and satisfied clients')}
            </p>
          </motion.div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => setSelectedImage(image)}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
            >
              <ImageWithFallback
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[color:var(--scrim-60)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-[color:var(--overlay-backdrop-strong)] flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 w-12 h-12 bg-[color:var(--glass-on-image-bg)] hover:bg-[color:var(--glass-on-image-bg-hover)] border border-[color:var(--glass-on-image-border)] rounded-full flex items-center justify-center transition-colors backdrop-blur-sm outline-none focus-visible:ring-[3px] focus-visible:ring-[color:var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <X className="text-[color:var(--on-image-foreground)]" size={24} />
          </button>
          <ImageWithFallback
            src={selectedImage}
            alt="Gallery"
            className="max-w-full max-h-full rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

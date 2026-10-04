"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, X, Pause, Play } from 'lucide-react';
import { useCarouselAutoplay } from '../../hooks/useCarouselAutoplay';
import { useLanguage } from '../../contexts/LanguageContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useIsMobile } from '../ui/use-mobile';

const galleryImages = [
  '/images/gallery/work-01.jpg',
  '/images/gallery/work-02.jpg',
  '/images/gallery/work-03.jpg',
  '/images/gallery/work-04.jpg',
  '/images/gallery/work-05.jpg',
  '/images/gallery/work-06.jpg',
  '/images/gallery/work-07.jpg',
  '/images/gallery/work-08.jpg',
  '/images/gallery/work-09.jpg',
  '/images/gallery/work-10.jpg',
  '/images/gallery/work-11.jpg',
  '/images/gallery/work-12.jpg',
  '/images/gallery/work-13.jpg',
  '/images/gallery/work-14.jpg',
  '/images/gallery/work-15.jpg',
  '/images/gallery/work-16.jpg',
  '/images/gallery/work-17.jpg',
  '/images/gallery/work-18.jpg',
  '/images/gallery/work-19.jpg',
  '/images/gallery/work-20.jpg',
  '/images/gallery/work-21.jpg',
  '/images/gallery/work-22.jpg',
  '/images/gallery/work-23.jpg',
  '/images/gallery/work-24.jpg',
  '/images/gallery/work-25.jpg',
  '/images/gallery/work-26.jpg',
  '/images/gallery/work-27.jpg',
  '/images/gallery/work-28.jpg',
];

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [explicitlyPlaying, setExplicitlyPlaying] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [focused, setFocused] = useState(false);
  const galleryRegion = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  const imagesPerPage = isMobile ? 6 : 5;
  const totalPages = Math.max(1, Math.ceil(galleryImages.length / imagesPerPage));

  const pageImages = useMemo(() => {
    const start = pageIndex * imagesPerPage;
    return galleryImages.slice(start, start + imagesPerPage);
  }, [pageIndex, imagesPerPage]);

  const goNext = useCallback(() => {
    setPageIndex((current) => (current + 1) % totalPages);
  }, [totalPages]);

  const goBack = useCallback(() => {
    setPageIndex((current) => (current - 1 + totalPages) % totalPages);
  }, [totalPages]);
  const playing = useCarouselAutoplay(goNext, paused || interacting || focused || !!selectedImage, galleryRegion, 7000, explicitlyPlaying);
  const playbackRequested = !paused && playing;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (pageIndex < totalPages) return;
    setPageIndex(0);
  }, [pageIndex, totalPages]);

  return (
    <section id="gallery" ref={galleryRegion} aria-label="Our work gallery" className="py-12 md:py-16 bg-secondary dark:bg-background transition-colors duration-500"
      onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
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

        {/* Compact Carousel (5 images per page) */}
        <div className="relative">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {pageImages.map((image, index) => (
              <motion.div
                key={image}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                onClick={() => setSelectedImage(image)}
                role="button"
                tabIndex={0}
                aria-label={`View salon gallery photo ${pageIndex * imagesPerPage + index + 1}`}
                onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelectedImage(image); } }}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
              >
                <ImageWithFallback
                  src={image}
                  loading="lazy"
                  alt={`Gallery ${pageIndex * imagesPerPage + index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-(--scrim-60) to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>

          {/* Controls below the grid */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => { setPaused(true); goBack(); }}
              aria-label={t('gallerySection.back', 'Back')}
              className="w-12 h-12 bg-accent hover:bg-accent-hover active:bg-accent-active text-accent-foreground rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <ChevronLeft className="text-current" size={24} />
            </button>
            <button
              type="button"
              onClick={() => { setPaused(true); goNext(); }}
              aria-label={t('gallerySection.next', 'Next')}
              className="w-12 h-12 bg-accent hover:bg-accent-hover active:bg-accent-active text-accent-foreground rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <ChevronRight className="text-current" size={24} />
            </button>
            <button type="button" className="salon-gallery-play" onClick={() => { setPaused(playbackRequested); setExplicitlyPlaying(!playbackRequested); }} aria-label={playbackRequested ? 'Pause gallery slideshow' : 'Play gallery slideshow'}>
              {playbackRequested ? <Pause size={18} /> : <Play size={18} />}<span>{playbackRequested ? 'Pause' : 'Play'}</span>
            </button>
            <span className="salon-gallery-page">{pageIndex + 1} / {totalPages}</span>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Salon gallery photo"
          className="fixed inset-0 z-[200] bg-(--overlay-backdrop-strong) flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            aria-label="Close gallery photo"
            autoFocus
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 w-12 h-12 bg-(--glass-on-image-bg) hover:bg-(--glass-on-image-bg-hover) border border-(--glass-on-image-border) rounded-full flex items-center justify-center transition-colors backdrop-blur-sm outline-none focus-visible:ring-[3px] focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <X className="text-(--on-image-foreground)" size={24} />
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

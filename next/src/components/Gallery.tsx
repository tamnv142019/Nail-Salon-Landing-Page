import { useEffect, useRef, useState, memo, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import { ImageLightbox } from './ImageLightbox';
import { useMagicClickAnimation } from '../hooks/useMagicClickAnimation';
import { ImageWithFallback } from './figma/ImageWithFallback';

const galleryImages = [
  {
    url: '/gallery/o(14).jpg',
    title: 'Gallery Image 14',
    category: 'Gallery',
  },
  {
    url: '/gallery/z7306818957474_7bbf145cb65ce362bf316b2186e3ec94.jpg',
    title: 'Nail Art Design',
    category: 'Art',
  },
  {
    url: '/gallery/z7306818969485_f1c7a367fbfd2a5297ebf5f55edffc94.jpg',
    title: 'Gel Manicure',
    category: 'Gel',
  },
  {
    url: '/gallery/z7306818985679_5434cd64c962b9879bc6c30adc947b71.jpg',
    title: 'Spa Pedicure',
    category: 'Spa',
  },
  {
    url: '/gallery/z7306819004726_7744781e7b76b3a59c9016cd4fd51cc8.jpg',
    title: 'Classic Manicure',
    category: 'Classic',
  },
  {
    url: '/gallery/z7306819011825_f70b49effdbf8e58ab381ce39704dca8.jpg',
    title: 'Elegant Nail Design',
    category: 'Design',
  },
  {
    url: '/gallery/z7306819030776_4b75cfa8a628ad74cc1fa04a62190967.jpg',
    title: 'Premium Manicure',
    category: 'Manicure',
  },
  {
    url: '/gallery/z7306819037746_3d289f83ddf83fcf4f8cbcd2c55564a5.jpg',
    title: 'Gel Nails',
    category: 'Gel',
  },
  {
    url: '/gallery/z7306819064614_2408df597e0630b0a1c8300bc96dc200.jpg',
    title: 'Nail Art',
    category: 'Art',
  },
  {
    url: '/gallery/z7306819075298_b6ed5c116ec835ba896819471201c1ba.jpg',
    title: 'Creative Design',
    category: 'Design',
  },
  {
    url: '/gallery/z7306819105783_7e5957d5b883ee54db70296934904dbd.jpg',
    title: 'Luxury Nails',
    category: 'Luxury',
  },
  {
    url: '/gallery/o.jpg',
    title: 'Stylish Nails',
    category: 'Style',
  },
  {
    url: '/gallery/o (1).jpg',
    title: 'Gallery Image 1',
    category: 'Gallery',
  },
  {
    url: '/gallery/o (2).jpg',
    title: 'Gallery Image 2',
    category: 'Gallery',
  },
  {
    url: '/gallery/o (3).jpg',
    title: 'Gallery Image 3',
    category: 'Gallery',
  },
  {
    url: '/gallery/o (4).jpg',
    title: 'Gallery Image 4',
    category: 'Gallery',
  },
  {
    url: '/gallery/o (5).jpg',
    title: 'Gallery Image 5',
    category: 'Gallery',
  },
  {
    url: '/gallery/o (6).jpg',
    title: 'Gallery Image 6',
    category: 'Gallery',
  },
  {
    url: '/gallery/o (7).jpg',
    title: 'Gallery Image 7',
    category: 'Gallery',
  },
  {
    url: '/gallery/o (8).jpg',
    title: 'Gallery Image 8',
    category: 'Gallery',
  },
  {
    url: '/gallery/o (9).jpg',
    title: 'Gallery Image 9',
    category: 'Gallery',
  },
  {
    url: '/gallery/o (10).jpg',
    title: 'Gallery Image 10',
    category: 'Gallery',
  },
  {
    url: '/gallery/o (11).jpg',
    title: 'Gallery Image 11',
    category: 'Gallery',
  },
  {
    url: '/gallery/o(12).jpg',
    title: 'Gallery Image 12',
    category: 'Gallery',
  },
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
      <section id="gallery" className="py-32 px-6 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-500">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse transition-colors duration-500"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <span className="inline-block px-6 py-2 bg-purple-100 dark:bg-purple-900/30 backdrop-blur-sm border border-purple-300 dark:border-purple-700 rounded-full text-purple-600 dark:text-purple-400 text-sm mb-6 transition-colors duration-500">
              🎨 Portfolio
            </span>
            
            <h2 className="text-5xl md:text-7xl mb-6 bg-linear-to-r from-gray-900 via-purple-600 to-blue-600 dark:from-white dark:via-purple-300 dark:to-blue-400 bg-clip-text text-transparent">
              Our Stunning Work
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed transition-colors duration-500">
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

          {/* Flow CTA */}
          <div className="mt-16 text-center animate-in fade-in slide-in-from-bottom-5 duration-700 delay-500">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Follow us on Instagram for more inspiration
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full text-white transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @LuxeNails
            </a>
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
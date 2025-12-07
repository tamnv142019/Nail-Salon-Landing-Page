import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

interface Image {
  url: string;
  title: string;
  category: string;
}

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: Image[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function ImageLightbox({ 
  isOpen, 
  onClose, 
  images, 
  currentIndex,
  onPrevious,
  onNext 
}: ImageLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrevious();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrevious, onNext]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
      >
        <X className="text-white" size={24} />
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white z-10">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Previous Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrevious();
        }}
        className="absolute left-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
      >
        <ChevronLeft className="text-white" size={28} />
      </button>

      {/* Next Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
      >
        <ChevronRight className="text-white" size={28} />
      </button>

      {/* Image Container */}
      <div 
        className="relative max-w-7xl max-h-[90vh] w-full px-20 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.url}
          alt={currentImage.title}
          className="w-full h-full object-contain rounded-2xl"
        />
        
        {/* Image Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 rounded-b-2xl">
          <h3 className="text-2xl text-white mb-2">{currentImage.title}</h3>
          <span className="inline-block px-4 py-1 bg-rose-500/80 backdrop-blur-sm rounded-full text-white text-sm">
            {currentImage.category}
          </span>
        </div>
      </div>
    </div>
  );
}

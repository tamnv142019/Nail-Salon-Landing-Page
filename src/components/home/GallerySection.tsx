import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

const galleryImages = [
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80',
  'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=600&q=80',
  'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&q=80',
  'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?w=600&q=80',
  'https://images.unsplash.com/photo-1595944024804-733665a112db?w=600&q=80',
  'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=600&q=80',
  '/Images/z7306818957474_7bbf145cb65ce362bf316b2186e3ec94.jpg',
  '/Images/z7306818969485_f1c7a367fbfd2a5297ebf5f55edffc94.jpg',
  '/Images/z7306818985679_5434cd64c962b9879bc6c30adc947b71.jpg',
  '/Images/z7306819004726_7744781e7b76b3a59c9016cd4fd51cc8.jpg',
  '/Images/z7306819011825_f70b49effdbf8e58ab381ce39704dca8.jpg',
  '/Images/z7306819030776_4b75cfa8a628ad74cc1fa04a62190967.jpg',
  '/Images/z7306819037746_3d289f83ddf83fcf4f8cbcd2c55564a5.jpg',
  '/Images/z7306819064614_2408df597e0630b0a1c8300bc96dc200.jpg',
  '/Images/z7306819075298_b6ed5c116ec835ba896819471201c1ba.jpg',
  '/Images/z7306819105783_7e5957d5b883ee54db70296934904dbd.jpg',
];

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
    <section id="gallery" className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-gray-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our Work
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Browse our gallery of beautiful nails and satisfied clients
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
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="text-white" size={24} />
          </button>
          <img
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

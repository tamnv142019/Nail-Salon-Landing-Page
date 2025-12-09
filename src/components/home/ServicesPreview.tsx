import { ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface ServicesPreviewProps {
  onViewAll: (serviceId?: string) => void;
  onBookClick: () => void;
}

const services = [
  {
    id: 'regular-pedicure',
    title: 'Pedicure Services',
    image: 'https://images.unsplash.com/photo-1746143795871-dcb6ddd9d9ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWRpY3VyZSUyMGZsb3dlcnMlMjBzcGF8ZW58MXx8fHwxNzY1MjkyNDg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Luxury spa treatments for your feet with premium products and relaxing massage',
    features: [
      'Regular Pedicure',
      'Gel Pedicure',
      'Spa Pedicure with Sugar Scrub',
      'Callus Removal Treatment',
      'Paraffin Wax Treatment',
    ],
  },
  {
    id: 'manicure',
    title: 'Manicure Services',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5pY3VyZXxlbnwxfHx8fDE3NjUyOTI5NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Expert nail care and design with attention to every detail',
    features: [
      'Classic Manicure',
      'Gel Manicure',
      'French Manicure',
      'Nail Art & Design',
      'Nail Repair & Strengthening',
    ],
  },
  {
    id: 'acrylic',
    title: 'Acrylic & Gel',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3J5bGljJTIwbmFpbHN8ZW58MXx8fHwxNzY1MTkyNzA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Long-lasting beautiful nails with various shapes and designs',
    features: [
      'Full Set Acrylic',
      'Acrylic Refill',
      'Pink & White',
      'Ombre Powder',
      'Gel X Extensions',
    ],
  },
  {
    id: 'lashes',
    title: 'Lash Extensions',
    image: 'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleWVsYXNoJTIwZXh0ZW5zaW9uc3xlbnwxfHx8fDE3NjUyMzQ0MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Professional eyelash extensions for dramatic, natural beauty',
    features: [
      'Classic Lashes',
      'Hybrid Lashes',
      'Volume Lashes',
      'Mega Volume',
      'Wispy Style & Color Lashes',
    ],
  },
  {
    id: 'waxing',
    title: 'Waxing Services',
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXhpbmclMjBzcGF8ZW58MXx8fHwxNzY1MjkyOTcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Smooth & professional hair removal services',
    features: [
      'Eyebrow Shaping',
      'Facial Waxing',
      'Full Body Waxing',
      'Brazilian Waxing',
      'Bikini Line Waxing',
    ],
  },
  {
    id: 'facial',
    title: 'Facial Services',
    image: 'https://images.unsplash.com/photo-1664549760921-2198b054a592?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNpYWwlMjBzcGElMjB0cmVhdG1lbnR8ZW58MXx8fHwxNzY1MjkyOTcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Rejuvenating skincare treatments for radiant, healthy skin',
    features: [
      'Express Facial',
      'Classic Facial',
      'Acne Treatment Facial',
      'Microdermabrasion',
      'Ultimate Glow Facial',
    ],
  },
];

export function ServicesPreview({ onViewAll, onBookClick }: ServicesPreviewProps) {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <>
      <section id="services" className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black transition-colors duration-500">
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
                Our Services
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Discover our premium beauty services designed to make you look and feel amazing
              </p>
            </motion.div>
          </div>

          {/* Services Grid - Circular Images */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 mb-12">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedService(service)}
                className="flex flex-col items-center cursor-pointer group"
              >
                {/* Circular Image */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4 overflow-hidden rounded-full border-4 border-gray-100 dark:border-gray-800 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Title */}
                <h3 className="text-center text-sm md:text-base font-semibold text-gray-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                  {service.title}
                </h3>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <button
              onClick={onViewAll}
              aria-label="View all services and prices"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white rounded-full transition-all duration-300 hover:scale-105 shadow-lg text-lg font-semibold"
            >
              <span className="cursor-pointer hover:opacity-90 transition-opacity">View All Services & Prices</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 dark:bg-gray-700/50 dark:hover:bg-gray-600/50 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
              >
                <X className="text-white dark:text-gray-300" size={20} />
              </button>

              {/* Image Header */}
              <div className="relative h-48 md:h-64">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-6 left-6 text-2xl md:text-3xl font-bold text-white">
                  {selectedService.title}
                </h3>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-base md:text-lg leading-relaxed">
                  {selectedService.description}
                </p>

                {/* Features List */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    What's Included:
                  </h4>
                  <div className="space-y-2">
                    {selectedService.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 flex-shrink-0"></div>
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setSelectedService(null);
                      onViewAll(selectedService.id);
                    }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white rounded-full transition-all duration-300 hover:scale-105 shadow-lg font-semibold cursor-pointer"
                  >
                    View Prices
                  </button>
                  <button
                    onClick={() => {
                      setSelectedService(null);
                      onBookClick();
                    }}
                    className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-full transition-all duration-300 hover:scale-105 font-semibold cursor-pointer"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
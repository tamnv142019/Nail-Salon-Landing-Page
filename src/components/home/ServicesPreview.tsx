import { ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface ServicesPreviewProps {
  onViewAll: (serviceId?: string) => void;
  onBookClick: () => void;
}

const getServices = (t: (key: string, fallback: string) => string) => [
  {
    id: 'manicure',
    title: t('servicesPage.manicureCategory', 'Manicure Services'),
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5pY3VyZXxlbnwxfHx8fDE3NjUyOTI5NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: t('servicesPreview.manicureDesc', 'Expert nail care and design with attention to every detail'),
    features: [
      `${t('servicesPage.regularManicure', 'Regular Manicure')} - $20`,
      `${t('servicesPage.europeanManicure', 'European Manicure')} - $25`,
      `${t('servicesPage.deluxeManicure', 'Deluxe Manicure')} - $30`,
      `${t('servicesPage.signatureSpaManicure', 'Signature Spa Manicure')} - $35`,
    ],
  },
  {
    id: 'pedicure',
    title: t('servicesPage.pedicureCategory', 'Pedicure Services'),
    image: 'https://images.unsplash.com/photo-1746143795871-dcb6ddd9d9ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWRpY3VyZSUyMGZsb3dlcnMlMjBzcGF8ZW58MXx8fHwxNzY1MjkyNDg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: t('servicesPreview.pedicureDesc', 'Luxury spa treatments for your feet with premium products'),
    features: [
      `${t('servicesPage.regularSpaPedicure', 'Regular Spa Pedicure')} - $25`,
      `${t('servicesPage.fullFace', 'Full Face')} - $40`,
      `${t('servicesPage.bikini', 'Bikini')} - $35`,
      `${t('servicesPage.chest', 'Chest')} - $35`,
      `${t('servicesPage.fullArms', 'Full Arms')} - $45`,
      `${t('servicesPage.halfLegs', 'Half Legs')} - $35`,
    ],
  },
  {
    id: 'powder',
    title: t('servicesPage.powderCategory', 'Organic Nail Powder'),
    image: 'https://images.unsplash.com/photo-1535588986102-0e9c0c60cba2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwcG93ZGVyJTIwbmFpbHN8ZW58MXx8fHwxNzY1MjE2MzQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: t('servicesPreview.powderDesc', 'Dipping powder collection with beautiful finishes'),
    features: [
      `${t('servicesPage.ombre2ColorPowder', 'Ombre 2 Color Powder')} - $50`,
      `${t('servicesPage.frenchTipPowder', 'French Tip Powder')} - $55`,
      `${t('servicesPage.dippingColor', 'Dipping Color')} - $45`,
      `${t('servicesPage.hybridGel', 'Hybrid Gel')} - $60`,
      `${t('servicesPage.gelX', 'Gel X')} - $60`,
    ],
  },
  {
    id: 'waxing',
    title: t('servicesPage.waxingCategory', 'Waxing Services'),
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXhpbmclMjBzcGF8ZW58MXx8fHwxNzY1MjkyOTcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: t('servicesPreview.waxingDesc', 'Smooth & professional hair removal services'),
    features: [
      `${t('servicesPage.fullLegs', 'Full Legs')} - $60`,
      `${t('servicesPage.fullBack', 'Full Back')} - $45`,
      `${t('servicesPage.brazilian', 'Brazilian')} - $60`,
      `${t('servicesPage.fullFace', 'Full Face')} - $40`,
      `${t('servicesPage.fullArms', 'Full Arms')} - $45`,
      `${t('servicesPage.eyebrows', 'Eyebrows')} - $15`,
    ],
  },
  {
    id: 'additional',
    title: t('servicesPage.additionalCategory', 'Additional Services'),
    image: 'https://images.unsplash.com/photo-1737214475365-e4f06281dcf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWlsJTIwYXJ0JTIwZGVzaWdufGVufDF8fHx8MTc2NTIxNjM0MHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: t('servicesPreview.additionalDesc', 'Enhance your beauty experience with add-on services'),
    features: [
      `${t('servicesPage.french', 'French')} - $5`,
      `${t('servicesPage.twoDesigns', 'Two Designs')} - $5`,
      `${t('servicesPage.naturalBuffShine', 'Natural Buff Shine')} - $5`,
      `${t('servicesPage.massageFoot', '15 Minutes Massage Foots')} - $20`,
      `${t('servicesPage.massageNeck', '15 Minutes Massage Neck Shoulder')} - $20`,
    ],
  },
];

export function ServicesPreview({ onViewAll, onBookClick }: ServicesPreviewProps) {
  const { t } = useLanguage();
  const services = getServices(t);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedService) {
        setSelectedService(null);
      }
    };

    if (selectedService) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedService]);

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
                {t('services.heading', 'Our Services')}
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                {t('home.services.subtitle', 'Discover our premium beauty services designed to make you look and feel amazing')}
              </p>
            </motion.div>
          </div>

          {/* Services Grid - Circular Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 mb-12 place-items-center">
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
              onClick={() => onViewAll()}
              aria-label={t('contactSection.viewAllServicesAndPrices', 'View All Services & Prices')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white rounded-full transition-all duration-300 hover:scale-105 shadow-lg text-lg font-semibold"
            >
              <span className="cursor-pointer hover:opacity-90 transition-opacity">{t('contactSection.viewAllServicesAndPrices', 'View All Services & Prices')}</span>
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
                    {t('home.services.whatsIncluded', "What's Included:")}
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
                    {t('home.services.viewPrices', 'View Prices')}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedService(null);
                      onBookClick();
                    }}
                    className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-full transition-all duration-300 hover:scale-105 font-semibold cursor-pointer"
                  >
                    {t('home.services.bookNow', 'Book Now')}
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
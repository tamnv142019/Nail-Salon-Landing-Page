import { Phone, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { BookingModal } from '../components/BookingModal';
import { Navigation } from '../components/home/Navigation';
import { Footer } from '../components/Footer';
import { ScrollToTopButton } from '../components/ScrollToTopButton';
import { useMagicClickAnimation } from '../hooks/useMagicClickAnimation';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';

interface ServicesPageProps {
  onNavigateHome?: () => void;
  scrollToService?: string;
}

const getServicesData = (t: (key: string, fallback: string) => string) => [
  {
    id: 'manicure',
    category: t('servicesPage.manicureCategory', 'Manicure Services'),
    title: t('servicesPage.manicureTitle', 'MANICURE'),
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5pY3VyZXxlbnwxfHx8fDE3NjUyOTI5NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: t('servicesPage.manicureDesc', 'Your satisfaction deserves our attention. Expert manicure services with premium products and skilled technicians.'),
    popular: true,
    services: [
      { name: t('servicesPage.regularManicure', 'Regular Manicure'), price: '$20' },
      { name: t('servicesPage.europeanManicure', 'European Manicure'), price: '$25', note: t('servicesPage.europeanManicureNote', 'Exfoliates – exfoliating crystal, Deep moisturization – Special Lotion') },
      { name: t('servicesPage.deluxeManicure', 'Deluxe Manicure'), price: '$30', note: t('servicesPage.deluxeManicureNote', 'Exfoliates – exfoliating crystal, Deep moisturization – Special Lotion, Rejuvenate – Marine Mask'), popular: true },
      { name: t('servicesPage.signatureSpaManicure', 'Signature Spa Manicure'), price: '$35', note: t('servicesPage.signatureSpaManicureNote', 'Exfoliates – exfoliating crystal, Rejuvenate – Marine Mask, Deep moisturization – Special Lotion, Deep Penetration – Paraffin Wax, 10 Minutes Massage – Warming Lotion') },
    ],
  },
  {
    id: 'pedicure',
    category: t('servicesPage.pedicureCategory', 'Pedicure Services'),
    title: t('servicesPage.pedicureTitle', 'PEDICURE SERVICES'),
    image: 'https://images.unsplash.com/photo-1746143795871-dcb6ddd9d9ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWRpY3VyZSUyMGZsb3dlcnMlMjBzcGF8ZW58MXx8fHwxNzY1MjkyNDg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: t('servicesPage.pedicureDesc', 'Your satisfaction deserves our attention. Indulge in our luxurious pedicure services featuring premium products and relaxing massage.'),
    popular: true,
    services: [
      { name: t('servicesPage.regularSpaPedicure', 'Regular Spa Pedicure'), price: '$25', popular: true },
      { name: t('servicesPage.fullFace', 'Full Face'), price: '$40' },
      { name: t('servicesPage.bikini', 'Bikini'), price: '$35' },
      { name: t('servicesPage.chest', 'Chest'), price: '$35' },
      { name: t('servicesPage.fullArms', 'Full Arms'), price: '$45' },
      { name: t('servicesPage.halfLegs', 'Half Legs'), price: '$35' },
    ],
  },
  {
    id: 'powder',
    category: t('servicesPage.powderCategory', 'Organic Nail Powder'),
    title: t('servicesPage.powderTitle', 'ORGANIC NAIL POWDER (DIPPING POWDER)'),
    image: 'https://images.unsplash.com/photo-1535588986102-0e9c0c60cba2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwcG93ZGVyJTIwbmFpbHN8ZW58MXx8fHwxNzY1MjE2MzQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: t('servicesPage.powderDesc', 'Dipping powder collection with beautiful and long-lasting finishes.'),
    services: [
      { name: t('servicesPage.ombre2ColorPowder', 'Ombre 2 Color Powder'), price: '$50' },
      { name: t('servicesPage.frenchTipPowder', 'French Tip Powder'), price: '$55' },
      { name: t('servicesPage.dippingColor', 'Dipping Color'), price: '$45' },
      { name: t('servicesPage.hybridGel', 'Hybrid Gel'), price: '$60' },
      { name: t('servicesPage.gelX', 'Gel X'), price: '$60' },
    ],
  },
  {
    id: 'waxing',
    category: t('servicesPage.waxingCategory', 'Waxing Services'),
    title: t('servicesPage.waxingTitle', 'WAXING SERVICES'),
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHdheGluZyUyMHNwYXxlbnwxfHx8fDE3NjUyOTI5NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: t('servicesPage.waxingDesc', 'Smooth and professional hair removal services for your entire body.'),
    sale: true,
    services: [
      { name: t('servicesPage.fullLegs', 'Full Legs'), price: '$60' },
      { name: t('servicesPage.fullBack', 'Full Back'), price: '$45' },
      { name: t('servicesPage.brazilian', 'Brazilian'), price: '$60' },
      { name: t('servicesPage.fullFace', 'Full Face'), price: '$40' },
      { name: t('servicesPage.bikini', 'Bikini'), price: '$35' },
      { name: t('servicesPage.chest', 'Chest'), price: '$35' },
      { name: t('servicesPage.fullArms', 'Full Arms'), price: '$45' },
      { name: t('servicesPage.halfLegs', 'Half Legs'), price: '$35' },
      { name: t('servicesPage.halfArms', 'Half Arms'), price: '$30' },
      { name: t('servicesPage.underArms', 'Under Arms'), price: '$20' },
      { name: t('servicesPage.eyebrows', 'Eyebrows'), price: '$15' },
      { name: t('servicesPage.stomach', 'Stomach'), price: '$15' },
      { name: t('servicesPage.chin', 'Chin'), price: '$10' },
      { name: t('servicesPage.sideBurns', 'Side Burns'), price: '$10' },
      { name: t('servicesPage.upperLip', 'Upper Lip'), price: '$8' },
    ],
  },
  {
    id: 'additional',
    category: t('servicesPage.additionalCategory', 'Additional Services'),
    title: t('servicesPage.additionalTitle', 'ADDITIONAL SERVICES'),
    image: 'https://images.unsplash.com/photo-1737214475365-e4f06281dcf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWlsJTIwYXJ0JTIwZGVzaWdufGVufDF8fHx8MTc2NTIxNjM0MHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: t('servicesPage.additionalDesc', 'Enhance your beauty experience with our add-on services.'),
    services: [
      { name: t('servicesPage.french', 'French'), price: '$5' },
      { name: t('servicesPage.twoDesigns', 'Two Designs'), price: '$5' },
      { name: t('servicesPage.naturalBuffShine', 'Natural Buff Shine'), price: '$5' },
      { name: t('servicesPage.massageFoot', '15 Minutes Massage Foots'), price: '$20' },
      { name: t('servicesPage.massageNeck', '15 Minutes Massage Neck Shoulder'), price: '$20' },
    ],
  },
];

export function ServicesPage({ onNavigateHome, scrollToService }: ServicesPageProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const magicClick = useMagicClickAnimation();
  const { t } = useLanguage();
  
  const servicesData = getServicesData(t);
  const [expandedServices, setExpandedServices] = useState<string[]>([servicesData[0].id]);

  const handleBookService = useCallback((serviceName: string) => {
    setSelectedService(serviceName);
    setIsBookingOpen(true);
  }, []);

  useEffect(() => {
    if (scrollToService) {
      // Wait for the page to render
      setTimeout(() => {
        const element = document.getElementById(scrollToService);
        if (element) {
          const offset = 100;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth',
          });
          // Auto-expand the service
          setExpandedServices((prev) => 
            prev.includes(scrollToService) ? prev : [...prev, scrollToService]
          );
        }
      }, 100);
    }
  }, [scrollToService]);

  const toggleService = (serviceId: string) => {
    setExpandedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      {/* SEO Meta Tags */}
      <title>Services & Pricing - Queen's Nails Hair & Skincare | San Diego Nail Salon</title>

      {/* Navigation */}
      <Navigation onBookClick={() => setIsBookingOpen(true)} onNavigateHome={onNavigateHome} />

      {/* Header */}
      <div className="pt-32 pb-16 md:pb-20 px-4 md:px-6 bg-gradient-to-br from-rose-500 via-purple-600 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl text-white mb-6 font-bold drop-shadow-lg">
              {t('servicesPage.title', 'Services & Pricing')}
            </h1>
            <p className="text-base md:text-xl text-white/95 max-w-3xl leading-relaxed drop-shadow-md">
              {t('servicesPage.subtitle', 'Explore our comprehensive menu of premium beauty services. All prices are starting prices and may vary based on length, design, and complexity.')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Services Content */}
      <div className="py-16 md:py-24 px-4 md:px-6 bg-white dark:bg-gray-900 transition-colors duration-500">
        <div className="max-w-6xl mx-auto">
          {/* Services List */}
          <div className="space-y-6">
            {servicesData.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-rose-300 dark:hover:border-rose-600"
              >
                {/* Service Header - Always Visible */}
                <div
                  onClick={() => toggleService(service.id)}
                  className="cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors duration-300"
                >
                  <div className="relative flex items-center gap-4 md:gap-6 p-4 md:p-6">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-white dark:border-gray-700 shadow-lg hover:scale-110 transition-transform duration-300">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Title & Category */}
                    <div className="flex-1 min-w-0">
                      <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                        {service.category}
                      </div>
                      <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {service.title}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                        {service.description}
                      </p>
                    </div>

                    {/* Expand Icon */}
                    <div className="flex-shrink-0">
                      {expandedServices.includes(service.id) ? (
                        <ChevronUp className="text-gray-400" size={24} />
                      ) : (
                        <ChevronDown className="text-gray-400" size={24} />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedServices.includes(service.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="p-4 md:p-6 bg-white dark:bg-gray-800/50">
                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Services Grid */}
                      <div className="grid gap-3">
                        {service.services.map((item, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleBookService(item.name)}
                            className="group relative flex items-start justify-between gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="text-sm md:text-base font-medium text-gray-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                                {item.name}
                              </div>
                              {item.note && (
                                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                  {item.note}
                                </div>
                              )}
                            </div>
                            <div className="text-base md:text-lg font-bold text-gray-900 dark:text-white whitespace-nowrap flex-shrink-0">
                              {item.price}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Book Button */}
                      <button
                        onClick={(e) => {
                          magicClick(e);
                          handleBookService(service.title);
                        }}
                        className="mt-6 w-full relative px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white rounded-full transition-all duration-300 hover:scale-110 hover:shadow-xl shadow-lg font-semibold cursor-pointer overflow-hidden group"
                      >
                        <span className="relative z-10">{t('servicesPage.bookNow', 'Book Now')} {service.title}</span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 md:mt-20 text-center">
            <div className="inline-block bg-gradient-to-br from-gray-50 to-rose-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-3xl p-8 md:p-12 shadow-xl max-w-3xl">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-rose-500 to-purple-600 rounded-2xl mb-6 shadow-xl">
                <Phone className="text-white" size={32} />
              </div>
              <h3 className="text-2xl md:text-4xl mb-4 text-gray-900 dark:text-white font-bold">
                {t('servicesPage.questionsTitle', 'Questions About Our Services?')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-base md:text-lg leading-relaxed">
                {t('servicesPage.questionsDesc', 'Our experienced staff is ready to help you choose the perfect service for your needs. Call us or book online!')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:6192245050"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white rounded-full transition-all duration-300 hover:scale-110 hover:shadow-xl shadow-lg text-lg font-semibold cursor-pointer relative overflow-hidden group"
                >
                  <Phone size={20} className="relative z-10" />
                  <span className="relative z-10">(619) 224-5050</span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                <button
                  onClick={(e) => {
                    magicClick(e);
                    handleBookService('Consultation');
                  }}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 hover:border-rose-500 dark:hover:border-rose-500 text-gray-900 dark:text-white rounded-full transition-all duration-300 hover:scale-110 hover:shadow-rose-500/30 hover:shadow-lg shadow-lg text-lg font-semibold cursor-pointer relative overflow-hidden group"
                >
                  <Calendar size={20} className="relative z-10" />
                  <span className="relative z-10">{t('contactSection.bookAppointment', 'Book Appointment')}</span>
                  <div className="absolute inset-0 bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preSelectedService={selectedService}
      />

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
}
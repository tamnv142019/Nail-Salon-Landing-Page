import { Phone, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { BookingModal } from '../components/BookingModal';
import { Navigation } from '../components/home/Navigation';
import { Footer } from '../components/Footer';
import { ScrollToTopButton } from '../components/ScrollToTopButton';
import { useMagicClickAnimation } from '../hooks/useMagicClickAnimation';
import { motion } from 'motion/react';

interface ServicesPageProps {
  onNavigateHome?: () => void;
  scrollToService?: string;
}

const servicesData = [
  {
    id: 'regular-pedicure',
    category: 'Pedicure Services',
    title: 'SPA REGULAR PEDICURE SERVICE',
    image: 'https://images.unsplash.com/photo-1746143795871-dcb6ddd9d9ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWRpY3VyZSUyMGZsb3dlcnMlMjBzcGF8ZW58MXx8fHwxNzY1MjkyNDg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Indulge in our luxurious pedicure services featuring premium products, relaxing massage, and meticulous nail care.',
    services: [
      { name: 'REGULAR MANICURE', price: '$25' },
      { name: 'REGULAR PEDICURE & FRENCH OR NAIL COLOR TIPS', price: '$30' },
      { name: 'REGULAR PEDICURE & CALLUS REMOVER', price: '$35' },
      { name: 'REGULAR PEDICURE & SUGAR SCRUB', price: '$30' },
      { name: 'REGULAR PEDICURE & MASK', price: '$30' },
      { name: 'REGULAR PEDICURE & PARAFFIN', price: '$33' },
      { name: 'REGULAR PEDICURE DELUXE', price: '$55', note: 'Includes callus, sugar scrub, paraffin wax' },
      { name: 'BOMB GEL PEDICURE (SAVE)', price: '$53', note: 'With bomb gel add on with service' },
      { name: 'BOMB DELUXE PEDICURE (SAVE)', price: '$63', note: 'With bomb gel add on with service and callus remover, sugar scrub, paraffin wax' },
    ],
  },
  {
    id: 'gel-pedicure',
    category: 'Pedicure Services',
    title: 'SPA GEL PEDICURE SERVICE',
    image: 'https://images.unsplash.com/photo-1657726736244-455fc25d777b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZWwlMjBwZWRpY3VyZSUyMHBvbGlzaHxlbnwxfHx8fDE3NjUyOTI0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Long-lasting gel pedicure with vibrant colors that won\'t chip for weeks. Perfect for busy lifestyles.',
    services: [
      { name: 'GEL PEDICURE', price: '$35' },
      { name: 'GEL PEDICURE & FRENCH OR NAIL COLOR TIPS', price: '$40' },
      { name: 'GEL PEDICURE & SUGAR SCRUB', price: '$40' },
      { name: 'GEL PEDICURE & MASK', price: '$40' },
      { name: 'GEL PEDICURE & CALLUS REMOVAL', price: '$45' },
      { name: 'GEL PEDICURE & PARAFFIN', price: '$43' },
      { name: 'GEL DELUXE PEDICURE', price: '$60' },
      { name: 'BOMB GEL PEDICURE (SAVE)', price: '$65', note: 'With bomb gel add on with package' },
    ],
  },
  {
    id: 'manicure',
    category: 'Manicure Services',
    title: 'ADD-ON SERVICE FOR PEDICURE & MANICURE',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5pY3VyZXxlbnwxfHx8fDE3NjUyOTI5NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Expert nail care and design with attention to every detail.',
    services: [
      { name: 'FILL PRICE TIPS', price: '$5' },
      { name: 'DESIGN ON 3 BIG TOES', price: '$5' },
      { name: 'SHINY BUFFER', price: '$5' },
      { name: 'CALLUS REMOVAL', price: '$10' },
      { name: 'SUGAR SCRUB', price: '$5' },
      { name: 'MASK', price: '$5' },
      { name: 'PARAFFIN', price: '$8' },
      { name: 'TAKE OFF GEL COLOR', price: '$5', note: 'With the service' },
      { name: 'TAKE OFF GEL COLOR ONLY', price: '$10' },
      { name: 'REGULAR MANICURE (NO COLOR)', price: '$10' },
      { name: 'REGULAR MANICURE WITH COLOR', price: '$20' },
      { name: 'GEL MANICURE', price: '$30' },
      { name: 'GEL MANICURE WITH TAKE OFF OR COLOR', price: '$35' },
      { name: 'TAKE OFF GEL COLOR ONLY', price: '$10' },
    ],
  },
  {
    id: 'acrylic',
    category: 'Nail Enhancements',
    title: 'ACRYLIC',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3J5bGljJTIwbmFpbHN8ZW58MXx8fHwxNzY1MTkyNzA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Durable and beautiful acrylic nails customized to your preferred length and shape. Professional application guaranteed.',
    services: [
      { name: 'FULL SET SHORT OR OVERLAY', price: '$35+', note: 'Refill: $30+' },
      { name: 'FULL SET SHORT NAILS WITH WHITE TIPS', price: '$40+', note: 'Refill: $30+' },
      { name: 'FULL SET REGULAR WITH ANY SHAPE', price: '$45+', note: 'Refill: $30+' },
      { name: 'FULL SET PINK & WHITE OR GLITTER POWDER', price: '$60+', note: 'Refill: $40+' },
      { name: 'FULL SET OMBRE POWDER WITH ANY SHAPE', price: '$55+', note: 'Refill: $40+' },
      { name: 'NAIL FIX', price: '$5+' },
      { name: 'CUT SHORT NAILS AND RESHAPE', price: '$10' },
      { name: 'TAKE OFF ACRYLIC POWDER & DO NEW SET', price: '$10' },
      { name: 'TAKE OFF ACRYLIC POWDER ONLY', price: '$15' },
      { name: 'FULL SET GEL X', price: '$50+', note: 'Refill: $40+' },
    ],
  },
  {
    id: 'lashes',
    category: 'Lash Services',
    title: 'LASH SERVICE',
    image: 'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleWVsYXNoJTIwZXh0ZW5zaW9uc3xlbnwxfHx8fDE3NjUyMzQ0MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Professional eyelash extensions for dramatic, natural beauty. Wake up with perfect lashes every day.',
    services: [
      { name: 'CLASSIC', price: '$95', note: '2 weeks refill: $60 | 3 weeks refill or more: $95+' },
      { name: 'HYBRID SET', price: '$105', note: '2 weeks refill: $70 | 3 weeks refill: $95+' },
      { name: 'VOLUME LOAD', price: '$125+', note: '2 weeks refill: $75+ | 3 weeks refill: $105+' },
      { name: 'MEGA VOLUME', price: '$140+', note: '(Mega lash price depend on how thick, how long you like) | 2 weeks refill: $85+ | 3 weeks refill: $130+' },
      { name: 'STYLE WISPY', price: '$30+' },
      { name: 'STYLE COLOR LASH', price: '$50' },
      { name: 'REMOVAL, HYGIENE AND REDO NEW SET', price: '$30' },
      { name: 'REMOVE, HYGIENE ONLY', price: '$20' },
    ],
  },
  {
    id: 'waxing',
    category: 'Waxing Services',
    title: 'WAXING SERVICE',
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXhpbmclMjBzcGF8ZW58MXx8fHwxNzY1MjkyOTcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Smooth, professional hair removal services using premium wax for sensitive skin. Quick and efficient.',
    services: [
      { name: 'EYEBROW', price: '$12' },
      { name: 'UPPER LIP', price: '$5' },
      { name: 'CHIN', price: '$10' },
      { name: 'SIDEBURNS OR CHEEK', price: '$15+' },
      { name: 'FULL FACE', price: '$25+' },
      { name: 'FULL ARM', price: '$35+' },
      { name: 'HALF ARM', price: '$25+' },
      { name: 'UNDER ARM', price: '$20+' },
      { name: 'STOMACH', price: '$15+' },
      { name: 'CHEST OR BACK', price: '$30+' },
      { name: 'FULL LEGS', price: '$50+' },
      { name: 'HALF LEGS', price: '$30+' },
      { name: 'BIKINI LINES', price: '$30+' },
      { name: 'BRAZILIAN', price: '$40+' },
    ],
  },
  {
    id: 'facial',
    category: 'Facial Services',
    title: 'FACIAL SERVICES',
    image: 'https://images.unsplash.com/photo-1664549760921-2198b054a592?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNpYWwlMjBzcGElMjB0cmVhdG1lbnR8ZW58MXx8fHwxNzY1MjkyOTcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Rejuvenating skincare treatments customized for your skin type. Professional products and techniques.',
    services: [
      { name: 'EXPRESS FACIAL', price: '$30', note: 'Double cleanse, exfoliation, mask, finishing products' },
      { name: 'CLASSIC FACIAL', price: '$50', note: 'Double cleanse, exfoliation, extractions (if needed), massage & scalp massage, mask, finishing prod more...' },
      { name: 'ACNE FACIAL', price: '$60', note: 'Double cleanse, exfoliation, extractions (if needed), high frequency, massage & scalp massage, mask, read more...' },
      { name: 'MICRODERMABRASION FACIAL', price: '$70', note: 'Double cleanse, microdermabrasion, extractions (if needed), massage & scalp massage, mask, finishing read more...' },
      { name: 'ULTIMATE GLOW FACIAL', price: '$80', note: 'Double cleanse, enzyme mask, microdermabrasion, extractions (if needed), massage & scalp massage, red read more...' },
      { name: 'BACK FACIAL', price: '$50', note: 'Double cleanse, exfoliation, extractions (if needed), massage, mask, finishing products' },
    ],
  },
];

export function ServicesPage({ onNavigateHome, scrollToService }: ServicesPageProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [expandedServices, setExpandedServices] = useState<string[]>([servicesData[0].id]);
  const magicClick = useMagicClickAnimation();

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
              Services & Pricing
            </h1>
            <p className="text-base md:text-xl text-white/95 max-w-3xl leading-relaxed drop-shadow-md">
              Explore our comprehensive menu of premium beauty services. All prices are starting prices and may vary based on length, design, and complexity.
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
                  <div className="flex items-center gap-4 md:gap-6 p-4 md:p-6">
                    {/* Image */}
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
                            className="group flex items-start justify-between gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer"
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
                        <span className="relative z-10">Book {service.title}</span>
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
                Questions About Our Services?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-base md:text-lg leading-relaxed">
                Our experienced staff is ready to help you choose the perfect service for your needs. Call us or book online!
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
                  <span className="relative z-10">Book Appointment</span>
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
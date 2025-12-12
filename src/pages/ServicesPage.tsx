import { Phone, Calendar, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { SEO } from '../components/SEO/SEO';
import { generateBreadcrumbSchema, generateServiceSchema } from '../utils/schema-generators';
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

interface ServiceItem {
  name: string;
  price: string;
  note?: string;
  bestSeller?: boolean;
  popular?: boolean;
}

interface ServiceCategory {
  id: string;
  category: string;
  title: string;
  image: string;
  description: string;
  popular?: boolean;
  sale?: boolean;
  services: ServiceItem[];
}

const getServicesData = (t: (key: string, fallback: string) => string): ServiceCategory[] => [
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
      { name: t('servicesPage.deluxeManicure', 'Deluxe Manicure'), price: '$30', note: t('servicesPage.deluxeManicureNote', 'Exfoliates – exfoliating crystal, Deep moisturization – Special Lotion, Rejuvenate – Marine Mask'), bestSeller: true },
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
      { name: t('servicesPage.regularSpaPedicure', 'Regular Spa Pedicure'), price: '$25', bestSeller: true },
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
      { name: t('servicesPage.dippingColor', 'Dipping Color'), price: '$45', bestSeller: true },
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

  // SEO schemas
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://queensnails.live/" },
    { name: "Services", url: "https://queensnails.live/services" }
  ]);

  const serviceSchemas = [
    generateServiceSchema({
      name: "Manicure Services",
      description: "Professional manicure services including regular, European, deluxe, and signature spa manicures with premium products",
      price: "20.00"
    }),
    generateServiceSchema({
      name: "Pedicure Services",
      description: "Luxury pedicure services featuring premium products, exfoliation, and relaxing massage",
      price: "25.00"
    }),
    generateServiceSchema({
      name: "Organic Nail Powder",
      description: "Dipping powder collection with beautiful and long-lasting finishes including ombre and French tips",
      price: "45.00"
    }),
    generateServiceSchema({
      name: "Waxing Services",
      description: "Professional hair removal services for smooth skin using premium waxing products",
      price: "8.00"
    })
  ];

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
    <>
      <SEO
        title="Services & Pricing - Nail Salon in San Diego"
        description="Explore our nail services: manicures from $20, pedicures from $25, gel nails, dipping powder, nail art, and waxing. Premium quality, expert technicians. Book online!"
        canonical="https://queensnails.live/services"
        keywords="nail services San Diego, manicure prices, pedicure prices, gel nails cost, dipping powder, nail art pricing, waxing services"
        ogImage="https://queensnails.live/og-services.jpg"
        schema={[breadcrumbSchema, ...serviceSchemas]}
      />

      <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
        {/* Navigation */}
        <Navigation onBookClick={() => setIsBookingOpen(true)} onNavigateHome={onNavigateHome} />

      {/* Header */}
      <div className="relative pt-32 pb-16 md:pb-20 px-4 md:px-6 bg-secondary dark:bg-secondary border-b border-border overflow-hidden transition-colors duration-500">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-brand-gold-soft/35 dark:bg-brand-gold/10 blur-3xl" />
          <div className="absolute -bottom-28 -left-24 h-96 w-96 rounded-full bg-brand-sapphire/10 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl mb-6 font-bold bg-linear-to-r from-foreground via-brand-gold to-brand-gold-muted bg-clip-text text-transparent">
              {t('servicesPage.title', 'Services & Pricing')}
            </h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              {t('servicesPage.subtitle', 'Explore our comprehensive menu of premium beauty services. All prices are starting prices and may vary based on length, design, and complexity.')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Services Content */}
      <div className="py-16 md:py-24 px-4 md:px-6 bg-background transition-colors duration-500">
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
                className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-brand-gold-muted dark:hover:border-brand-gold"
              >
                {/* Service Header - Always Visible */}
                <div
                  onClick={() => toggleService(service.id)}
                  className="cursor-pointer hover:bg-secondary/60 dark:hover:bg-secondary/60 transition-colors duration-300"
                >
                  <div className="relative flex items-center gap-4 md:gap-6 p-4 md:p-6">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden shrink-0 border-4 border-card shadow-lg hover:scale-110 transition-transform duration-300">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Title & Category */}
                    <div className="flex-1 min-w-0">
                      <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mb-1">
                        {service.category}
                      </div>
                      <h2 className="text-lg md:text-2xl font-bold text-foreground mb-1">
                        {service.title}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {service.description}
                      </p>
                    </div>

                    {/* Expand Icon */}
                    <div className="shrink-0">
                      {expandedServices.includes(service.id) ? (
                        <ChevronUp className="text-muted-foreground" size={24} />
                      ) : (
                        <ChevronDown className="text-muted-foreground" size={24} />
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
                    className="border-t border-border"
                  >
                    <div className="p-4 md:p-6 bg-background">
                      {/* Description */}
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Services Grid */}
                      <div className="grid gap-3">
                        {service.services.map((item, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleBookService(item.name)}
                            className="group relative flex items-start justify-between gap-4 p-3 rounded-xl hover:bg-secondary/60 dark:hover:bg-secondary/60 transition-all duration-200 cursor-pointer"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <div className="text-sm md:text-base font-medium text-foreground group-hover:text-brand-gold-muted dark:group-hover:text-brand-gold transition-colors">
                                  {item.name}
                                </div>
                                {item.bestSeller && (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-ruby text-white border border-white/25 shadow-sm ring-1 ring-inset ring-white/10 transition-all duration-300 motion-reduce:transition-none hover:-translate-y-0.5 hover:shadow-lg">
                                    <Star className="w-3.5 h-3.5" />
                                    <span className="text-outline">
                                      {t('servicesPage.bestSeller', 'Best Seller')}
                                    </span>
                                  </span>
                                )}
                              </div>
                              {item.note && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  {item.note}
                                </div>
                              )}
                            </div>
                            <div className="text-base md:text-lg font-bold text-foreground whitespace-nowrap shrink-0">
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
                        className="mt-6 w-full relative px-6 py-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-xl shadow-lg font-semibold cursor-pointer overflow-hidden group bg-brand-gold-soft hover:bg-brand-gold-muted text-brand-dark dark:bg-brand-gold-soft dark:hover:bg-brand-gold dark:text-white"
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
            <div className="inline-block bg-card border-2 border-border rounded-3xl p-8 md:p-12 shadow-xl max-w-3xl">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-brand-gold-soft rounded-2xl mb-6 shadow-xl">
                <Phone className="text-brand-dark" size={32} />
              </div>
              <h3 className="text-2xl md:text-4xl mb-4 text-foreground font-bold">
                {t('servicesPage.questionsTitle', 'Questions About Our Services?')}
              </h3>
              <p className="text-muted-foreground mb-8 text-base md:text-lg leading-relaxed">
                {t('servicesPage.questionsDesc', 'Our experienced staff is ready to help you choose the perfect service for your needs. Call us or book online!')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:6192245050"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-xl shadow-lg text-lg font-semibold cursor-pointer relative overflow-hidden group bg-brand-gold-soft hover:bg-brand-gold-muted text-brand-dark dark:bg-brand-gold-soft dark:hover:bg-brand-gold dark:text-white"
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
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-card border-2 border-border hover:border-brand-gold-muted dark:hover:border-brand-gold text-foreground rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg shadow-lg text-lg font-semibold cursor-pointer relative overflow-hidden group"
                >
                  <Calendar size={20} className="relative z-10" />
                  <span className="relative z-10">{t('contactSection.bookAppointment', 'Book Appointment')}</span>
                  <div className="absolute inset-0 bg-brand-gold-soft/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
    </>
  );
}
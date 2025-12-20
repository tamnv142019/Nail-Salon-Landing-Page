"use client";

import { Phone, Calendar } from 'lucide-react';
import { OptimizedImage } from '../components/OptimizedImage';
import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { SEO } from '../components/SEO/SEO';
import { generateBreadcrumbSchema, generateServiceSchema } from '../utils/schema-generators';
import { Suspense, lazy } from 'react';

// Lazy-load BookingModal to avoid adding it to the initial client bundle
const BookingModal = lazy(() => import('../components/BookingModal').then((m) => ({ default: m.BookingModal })));
import { Navigation } from '../components/home/Navigation';
import { Footer } from '../components/Footer';
import { ScrollToTopButton } from '../components/ScrollToTopButton';
import { useMagicClickAnimation } from '../hooks/useMagicClickAnimation';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';
import { NailPolishIcon } from '../components/NailPolishIcon';

interface ServicesPageProps {
  onNavigateHome?: () => void;
  scrollToService?: string;
}

interface ServiceItem {
  name: string;
  price: string;
  note?: string;
  duration?: string;
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
    id: 'combo',
    category: t('servicesPage.comboCategory', 'Combo Specials'),
    title: t('servicesPage.comboTitle', 'COMBO SPECIALS'),
    image: 'gallery/comboImage.jpg',
    description: t('servicesPage.comboDesc', 'Special combo packages combining manicure and pedicure signature services.'),
    popular: true,
    sale: true,
    services: [
      {
        name: t('servicesPage.comboPedicureManicureSignature', 'Combo Pedicure + Manicure Signature'),
        price: '$85',
        duration: '120 min',
        note: t('servicesPage.comboPedicureNote', 'Full Signature pedicure and manicure package'),
      },
    ],
  },
  {
    id: 'manicure',
    category: t('servicesPage.manicureCategory', 'Manicure Services'),
    title: t('servicesPage.manicureTitle', 'MANICURE'),
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5pY3VyZXxlbnwxfHx8fDE3NjUyOTI5NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: t('servicesPage.manicureDesc', 'Your satisfaction deserves our attention. Expert manicure services with premium products and skilled technicians.'),
    popular: true,
      services: [
      { name: t('servicesPage.regularManicure', 'Regular Manicure'), price: '$20', duration: '20 min' },
      { name: t('servicesPage.europeanManicure', 'European Manicure'), price: '$25', duration: '30 min', note: t('servicesPage.europeanManicureNote', 'Exfoliates – exfoliating crystal, Deep moisturization – Special Lotion') },
      { name: t('servicesPage.deluxeManicure', 'Deluxe Manicure'), price: '$30', duration: '35 min', note: t('servicesPage.deluxeManicureNote', 'Exfoliates – exfoliating crystal, Deep moisturization – Special Lotion, Rejuvenate – Marine Mask'), bestSeller: true },
      { name: t('servicesPage.extraGel', 'Extra Gel'), price: '$15', duration: '15 min' },
      { name: t('servicesPage.signatureSpaManicure', 'Signature Spa Manicure'), price: '$35', duration: '45 min', note: t('servicesPage.signatureSpaManicureNote', 'Exfoliates – exfoliating crystal, Rejuvenate – Marine Mask, Deep moisturization – Special Lotion, Deep Penetration – Paraffin Wax, 10 Minutes Massage – Warming Lotion') },
    ],
  },
  {
    id: 'pedicure',
    category: t('servicesPage.pedicureCategory', 'Pedicure Services'),
    title: t('servicesPage.pedicureTitle', 'PEDICURE SERVICES'),
    image: 'gallery/pedicure.jpg',
    description: t('servicesPage.pedicureDesc', 'Your satisfaction deserves our attention. Indulge in our luxurious pedicure services featuring premium products and relaxing massage.'),
    popular: true,
      services: [
        {
          name: t('servicesPage.regularSpaPedicure', 'Regular Spa Pedicure'),
          price: '$25',
          duration: '30 min',
          bestSeller: true,
          note: t('servicesPage.regularSpaPedicureNote', 'Includes a 6-minute foot massage'),
        },
        {
          name: t('servicesPage.europeanSpaPedicure', 'European Spa Pedicure'),
          price: '$35',
          duration: '35 min',
          note: t('servicesPage.europeanSpaPedicureNote', 'Exfoliation – Callus Treatment or Sea Salt Glow\nIncludes a 6-minute foot massage'),
        },
        {
          name: t('servicesPage.deluxeSpaPedicure', 'Deluxe Spa Pedicure'),
          price: '$45',
          duration: '45 min',
          note: t('servicesPage.deluxeSpaPedicureNote', 'Callus Removal Treatment\nExfoliation – Sea Salt Glow\nRejuvenating Marine Mask\n10-minute foot massage\nHot Stone Massage'),
        },
        {
          name: t('servicesPage.signatureSpaPedicure', 'Signature Spa Pedicure'),
          price: '$55',
          duration: '60 min',
          note: t('servicesPage.signatureSpaPedicureNote', 'Callus Removal Treatment\nExfoliation – Sea Salt Glow\nRejuvenating Marine Mask\nDeep Penetration – Paraffin Wax\n10-minute foot massage with warming lotion\nHot Stone Massage'),
        },
      ],
  },
  {
    id: 'powder',
    category: t('servicesPage.powderCategory', 'Organic Nail Powder'),
    title: t('servicesPage.powderTitle', 'ORGANIC NAIL POWDER (DIPPING POWDER)'),
    image: 'https://images.unsplash.com/photo-1535588986102-0e9c0c60cba2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwcG93ZGVyJTIwbmFpbHN8ZW58MXx8fHwxNzY1MjE2MzQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: t('servicesPage.powderDesc', 'Dipping powder collection with beautiful and long-lasting finishes.'),
    services: [
      { name: t('servicesPage.ombre2ColorPowder', 'Ombre 2 Color Powder'), price: '$50', duration: '60 min' },
      { name: t('servicesPage.frenchTipPowder', 'French Tip Powder'), price: '$55', duration: '60 min' },
      { name: t('servicesPage.dippingColor', 'Dipping Color'), price: '$45', duration: '55 min', bestSeller: true },
      { name: t('servicesPage.hybridGel', 'Hybrid Gel'), price: '$60', duration: '75 min' },
      { name: t('servicesPage.gelX', 'Gel X'), price: '$60', duration: '75 min' },
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
      { name: t('servicesPage.fullLegs', 'Full Legs'), price: '$60', duration: '45 min' },
      { name: t('servicesPage.fullBack', 'Full Back'), price: '$45', duration: '40 min' },
      { name: t('servicesPage.brazilian', 'Brazilian'), price: '$60', duration: '35 min' },
      { name: t('servicesPage.fullFace', 'Full Face'), price: '$40', duration: '30 min' },
      { name: t('servicesPage.bikini', 'Bikini'), price: '$35', duration: '25 min' },
      { name: t('servicesPage.chest', 'Chest'), price: '$35', duration: '20 min' },
      { name: t('servicesPage.fullArms', 'Full Arms'), price: '$45', duration: '30 min' },
      { name: t('servicesPage.halfLegs', 'Half Legs'), price: '$35', duration: '25 min' },
      { name: t('servicesPage.halfArms', 'Half Arms'), price: '$30', duration: '20 min' },
      { name: t('servicesPage.underArms', 'Under Arms'), price: '$20', duration: '15 min' },
      { name: t('servicesPage.eyebrows', 'Eyebrows'), price: '$15', duration: '10 min' },
      { name: t('servicesPage.stomach', 'Stomach'), price: '$15', duration: '15 min' },
      { name: t('servicesPage.chin', 'Chin'), price: '$10', duration: '10 min' },
      { name: t('servicesPage.sideBurns', 'Side Burns'), price: '$10', duration: '10 min' },
      { name: t('servicesPage.upperLip', 'Upper Lip'), price: '$8', duration: '10 min' },
    ],
  },
  {
    id: 'additional',
    category: t('servicesPage.additionalCategory', 'Additional Services'),
    title: t('servicesPage.additionalTitle', 'ADDITIONAL SERVICES'),
    image: 'https://images.unsplash.com/photo-1737214475365-e4f06281dcf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWlsJTIwYXJ0JTIwZGVzaWdufGVufDF8fHx8MTc2NTIxNjM0MHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: t('servicesPage.additionalDesc', 'Enhance your beauty experience with our add-on services.'),
    services: [
      { name: t('servicesPage.french', 'French'), price: '$5', duration: '10 min' },
      { name: t('servicesPage.twoDesigns', 'Two Designs'), price: '$5', duration: '15 min' },
      { name: t('servicesPage.naturalBuffShine', 'Natural Buff Shine'), price: '$5', duration: '10 min' },
      { name: t('servicesPage.massageFoot', '15 Minutes Massage Foots'), price: '$20', duration: '15 min' },
      { name: t('servicesPage.massageNeck', '15 Minutes Massage Neck Shoulder'), price: '$20', duration: '15 min' },
    ],
  },
];

function stripDiacritics(str: string) {
  try {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  } catch (e) {
    return str;
  }
}

function formatNote(note: string) {
  if (!note) return null;
  // split on newlines, commas, semicolons, bullets, en/em dashes (do NOT split on plain hyphen so 'add-on' stays intact)
  const parts = note.split(/[\n,;]/).map(p => p.trim()).filter(Boolean);
  if (parts.length <= 1) {
    return <div>{stripDiacritics(note)}</div>;
  }
  return parts.map((p, i) => (
    <div key={i}>{stripDiacritics(p)}</div>
 ));
}

// Static SEO schemas (defined once to avoid recreating each render)
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://queensobnail.com/' },
  { name: 'Services', url: 'https://queensobnail.com/services' },
]);

const serviceSchemas = [
  // Combo Manicure (removed)
  generateServiceSchema({
    name: 'Combo Pedicure + Manicure Signature',
    description: 'Combo Pedicure + Manicure Signature package',
    price: '85',
  }),
  generateServiceSchema({
    name: 'Manicure Services',
    description: 'Professional manicure services including regular, European, deluxe, and signature spa manicures with premium products',
    price: '20',
  }),
  generateServiceSchema({
    name: 'Pedicure Services',
    description: 'Luxury pedicure services featuring premium products, exfoliation, and relaxing massage',
    price: '25',
  }),
  generateServiceSchema({
    name: 'Organic Nail Powder',
    description: 'Dipping powder collection with beautiful and long-lasting finishes including ombre and French tips',
    price: '45',
  }),
  generateServiceSchema({
    name: 'Waxing Services',
    description: 'Professional hair removal services for smooth skin using premium waxing products',
    price: '8',
  }),
];

export function ServicesPage({ onNavigateHome, scrollToService }: ServicesPageProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const magicClick = useMagicClickAnimation();
  const { t } = useLanguage();
  
  const servicesData = useMemo(() => getServicesData(t), [t]);
  const waxingService = useMemo(() => servicesData.find((service) => service.id === 'waxing'), [servicesData]);
  const comboService = useMemo(() => servicesData.find((service) => service.id === 'combo'), [servicesData]);
  const nonComboNonWaxingServices = useMemo(() => servicesData.filter((service) => service.id !== 'waxing' && service.id !== 'combo'), [servicesData]);

  const handleBookService = useCallback((serviceName: string) => {
    setSelectedService(serviceName);
    setIsBookingOpen(true);
  }, []);

  useEffect(() => {
    if (!scrollToService) return;

    // Respect user's reduced motion preference
    const prefersReduced = typeof window !== 'undefined' &&
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const behavior: ScrollBehavior = prefersReduced ? 'auto' : 'smooth';

    let rafId: number | null = null;
    let attempts = 0;

    const tryScroll = () => {
      const element = document.getElementById(scrollToService);
      if (element) {
        const offset = 100;
        const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior });
        return;
      }

      // Retry for up to ~1s (60 frames) while the DOM settles
      attempts += 1;
      if (attempts < 60) {
        rafId = requestAnimationFrame(tryScroll);
      }
    };

    rafId = requestAnimationFrame(tryScroll);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [scrollToService]);

  return (
    <>
      <SEO
        title="Services & Pricing - Nail Salon in San Diego"
        description="Explore our nail services: manicures from $20, pedicures from $25, gel nails, dipping powder, nail art, and waxing. Premium quality, expert technicians. Book online!"
        canonical="https://queensobnail.com/services"
        keywords="nail services San Diego, manicure prices, pedicure prices, gel nails cost, dipping powder, nail art pricing, waxing services"
        ogImage="https://queensobnail.com/og-services.jpg"
        schema={[breadcrumbSchema, ...serviceSchemas]}
      />

      <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
        {/* Navigation */}
        <Navigation onBookClick={() => setIsBookingOpen(true)} onNavigateHome={onNavigateHome} />

      {/* Header */}
      <div className="relative pt-24 pb-10 md:pb-12 px-4 md:px-6 bg-secondary dark:bg-secondary border-b border-border overflow-hidden transition-colors duration-500">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-btn-accent/35 dark:bg-brand-gold/10 blur-3xl" />
          <div className="absolute -bottom-28 -left-24 h-96 w-96 rounded-full bg-brand-sapphire/10 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl mb-4 font-bold bg-linear-to-r from-foreground via-brand-gold to-brand-gold-muted bg-clip-text text-transparent">
              {t('servicesPage.title', 'Services & Pricing')}
            </h1>
            <p className="text-sm md:text-lg text-foreground max-w-4xl leading-relaxed">
              {t('servicesPage.subtitle', 'Explore our comprehensive menu of premium beauty services. All prices are starting prices and may vary based on length, design, and complexity.')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Services Content */}
      <div className="py-10 md:py-14 px-4 md:px-6 bg-background transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          {/* Services List */}
          {/* Combo Specials (prominent, full-width) */}
          {comboService && (
            <div className="mb-5">
              <ServiceCard service={comboService} index={0} onBook={handleBookService} />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {nonComboNonWaxingServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} onBook={handleBookService} />
            ))}
          </div>

          {/* Waxing - Separate Section */}
          {waxingService && (
            <div className="mt-5">
              {(() => {
                const accent = getServiceAccent(waxingService.id);
                return (
              <motion.div
                key={waxingService.id}
                id={waxingService.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: nonComboNonWaxingServices.length * 0.1 }}
                className={`bg-card rounded-2xl shadow-lg border border-border overflow-hidden transition-all duration-300 hover:shadow-xl ${accent.card}`}
              >
                {/* Service Header - Always Visible */}
                <div className={`transition-colors duration-300 ${accent.header} hover:bg-secondary/60 dark:hover:bg-secondary/60`}>
                  <div className="relative flex flex-col items-center text-center gap-4 p-4 md:p-5">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shrink-0 border-4 border-card shadow-lg hover:scale-110 transition-transform duration-300">
                      <OptimizedImage
                        src={waxingService.image}
                        alt={waxingService.title}
                        className="w-full h-full object-cover"
                        width={160}
                        height={160}
                      />
                    </div>

                    {/* Title & Category */}
                    <div className="w-full max-w-2xl">
                      {waxingService.category && stripDiacritics(waxingService.category).toLowerCase() !== stripDiacritics(waxingService.title).toLowerCase() && (
                        <div className="text-base md:text-lg text-foreground uppercase tracking-wider mb-1">
                          {waxingService.category}
                        </div>
                      )}
                      <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-1">
                        {waxingService.title}
                      </h2>
                      <p className="text-base text-foreground leading-relaxed">
                        {waxingService.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content (always visible) */}
                <div className="border-t border-border">
                  <div className="p-4 md:p-5 bg-background">
                    {/* Description */}
                    <p className="text-foreground mb-6 leading-relaxed">
                      {waxingService.description}
                    </p>

                    {/* Waxing Services Grid (2 columns) */}
                    <div className="grid gap-3 sm:grid-cols-2">
                      {waxingService.services.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setSelectedService(item.name);
                            setIsBookingOpen(true);
                          }}
                          className="group relative flex items-start justify-between gap-4 p-3 rounded-xl border border-border/60 bg-secondary/20 backdrop-blur-md shadow-sm hover:bg-secondary/60 dark:hover:bg-secondary/60 transition-all duration-200 cursor-pointer"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <div className="text-[20px] md:text-[22px] font-semibold text-foreground group-hover:text-brand-gold-muted dark:group-hover:text-brand-gold transition-colors whitespace-normal wrap-break-word">
                                {item.name}
                              </div>
                            </div>
                            {item.note && (
                              <div className="text-[18px] md:text-[20px] text-foreground mt-1 whitespace-normal wrap-break-word">
                                {formatNote(item.note)}
                              </div>
                            )}
                          </div>
                          <div className="text-[20px] md:text-[22px] font-bold whitespace-nowrap shrink-0">
                            <div style={{ color: 'oklch(.592 .249 .584)' }}>{item.price}</div>
                            {item.duration && <div className="text-sm text-foreground mt-0.5">{item.duration}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
                );
              })()}
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 md:mt-20 text-center">
            <div className="inline-block bg-card border-2 border-border rounded-3xl p-8 md:p-12 shadow-xl max-w-3xl">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-btn-accent rounded-2xl mb-6 shadow-xl">
                <Phone className="text-brand-dark" size={32} />
              </div>
              <h3 className="text-2xl md:text-4xl mb-4 text-foreground font-bold">
                {t('servicesPage.questionsTitle', 'Questions About Our Services?')}
              </h3>
              <p className="text-foreground mb-8 text-base md:text-lg leading-relaxed">
                {t('servicesPage.questionsDesc', 'Our experienced staff is ready to help you choose the perfect service for your needs. Call us or book online!')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:6192245050"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-xl shadow-lg text-lg font-semibold cursor-pointer relative overflow-hidden group bg-btn-accent hover:bg-btn-accent-hover active:bg-btn-accent-active text-btn-theme-foreground"
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
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 group relative overflow-hidden rounded-full transition-all duration-300 hover:scale-105 shadow-2xl text-lg font-semibold cursor-pointer bg-[image:var(--gradient-primary-action)] text-[color:var(--gold-champagne)] hover:brightness-110 active:brightness-95 before:content-[''] before:pointer-events-none before:absolute before:inset-0 before:bg-linear-to-r before:from-transparent before:via-[color:var(--btn-sheen)] before:to-transparent before:-skew-x-12 before:translate-x-[-200%] before:transition-transform before:duration-700 before:ease-out hover:before:translate-x-[200%] hover:before:via-[color:var(--btn-sheen-hover)]"
                >
                  <Calendar size={20} className="relative z-10" />
                  <span className="relative z-10">{t('contactSection.bookAppointment', 'Book Appointment')}</span>
                  <div className="absolute inset-0 bg-btn-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Booking Modal */}
      {isBookingOpen && (
        <Suspense fallback={null}>
          <BookingModal
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            preSelectedService={selectedService}
          />
        </Suspense>
      )}

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
      </div>
    </>
  );
}

const getServiceAccent = (serviceId: string) => {
  switch (serviceId) {
    case 'combo':
      return { card: 'border-l-4 border-l-orange-500', header: 'bg-gradient-to-r from-orange-400/10 via-orange-300/10 to-amber-400/8' };
    case 'manicure':
      return { card: 'border-l-4 border-l-rose-500', header: 'bg-rose-500/10' };
    case 'pedicure':
      return { card: 'border-l-4 border-l-emerald-500', header: 'bg-emerald-500/10' };
    case 'powder':
      return { card: 'border-l-4 border-l-violet-500', header: 'bg-violet-500/10' };
    case 'additional':
      return { card: 'border-l-4 border-l-amber-500', header: 'bg-amber-500/10' };
    case 'waxing':
      return { card: 'border-l-4 border-l-sky-500', header: 'bg-sky-500/10' };
    default:
      return { card: 'border-l-4 border-l-border', header: '' };
  }
};



// Small memoized card to avoid rerendering all service rows when unrelated state updates
interface ServiceCardProps {
  service: ServiceCategory;
  index?: number;
  onBook: (name: string) => void;
}

const ServiceCard = memo(function ServiceCard({ service, index = 0, onBook }: ServiceCardProps) {
  const accent = getServiceAccent(service.id);
  const { t } = useLanguage();

  return (
    <motion.div
      key={service.id}
      id={service.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`bg-card rounded-2xl shadow-lg border border-border overflow-hidden transition-all duration-300 hover:shadow-xl ${accent.card}`}
    >
      <div className={`relative transition-colors duration-300 ${accent.header} hover:bg-secondary/60 dark:hover:bg-secondary/60`}>
        {service.sale && (
          <div className="absolute top-3 right-3 transform rotate-12">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-semibold px-3 py-1 rounded shadow-lg animate-pulse">{t('servicesPage.saleTag', 'SALE')}</div>
          </div>
        )}
        <div className="relative flex items-center gap-4 md:gap-5 p-4 md:p-5">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shrink-0 border-4 border-card shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center">
            {service.id === 'combo' ? (
              <NailPolishIcon size={36} className="text-brand-gold" />
            ) : (
              <OptimizedImage src={service.image} alt={service.title} className="w-full h-full object-cover" width={160} height={160} />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-1">{service.title}</h2>
            <p className="text-base text-foreground leading-relaxed">{service.description}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="p-4 md:p-5 bg-background">
          <div className="grid gap-3">
            {service.services.map((item, idx) => (
              <div
                key={idx}
                onClick={() => onBook(item.name)}
                className="group relative flex items-start justify-between gap-4 p-3 rounded-xl border border-border/60 bg-secondary/20 backdrop-blur-md shadow-sm hover:bg-secondary/60 dark:hover:bg-secondary/60 transition-all duration-200 cursor-pointer"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="text-[20px] md:text-[22px] font-semibold text-foreground group-hover:text-brand-gold-muted dark:group-hover:text-brand-gold transition-colors whitespace-normal wrap-break-word">{item.name}</div>
                    {item.bestSeller && (
                      <img
                        src="/assets/badges/best-seller-badge.svg"
                        alt={t('servicesPage.bestSellerTag', 'Best Seller')}
                        className="w-9 h-9 object-contain"
                      />
                    )}
                  </div>
                  {item.note && <div className="text-[18px] md:text-[20px] text-foreground mt-1 whitespace-normal wrap-break-word">{formatNote(item.note)}</div>}
                </div>
                <div className="text-[20px] md:text-[22px] font-bold whitespace-nowrap shrink-0">
                  <div style={{ color: 'oklch(.592 .249 .584)' }}>{item.price}</div>
                  {item.duration && <div className="text-sm text-foreground mt-0.5">{item.duration}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});
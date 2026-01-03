import { ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface ServicesPreviewProps {
  onViewAll: (serviceId?: string) => void;
  onBookClick: () => void;
}

function BestSellerBadge({ label }: { label: string }) {
  return (
    <span className="ml-2 flex items-center" aria-hidden>
      {/* Use public asset to ensure runtime availability in Next.js */}
      <img
        src="/images/badges/best-seller-badge.svg"
        alt={label}
        width={84}
        height={84}
        className="w-20 h-20 object-contain drop-shadow-lg"
      />
    </span>
  );
}

const getServices = (t: (key: string, fallback: string) => string) => [
  {
    id: 'combo',
    title: t('servicesPage.comboCategory', 'Combo Specials'),
    image: '/images/gallery/service-combo.jpg',
    description: t('servicesPreview.comboDesc', 'Combo packages combining manicure and pedicure signature services'),
    features: [
      `${t('servicesPage.comboPedicureManicureSignature', 'Combo Pedicure + Manicure Signature')} - $85`,
    ],
  },
  {
    id: 'manicure',
    title: t('servicesPage.manicureCategory', 'Manicure Services'),
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5pY3VyZXxlbnwxfHx8fDE3NjUyOTI5NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: t('servicesPreview.manicureDesc', 'Expert nail care and design with attention to every detail'),
    features: [
      `${t('servicesPage.regularManicure', 'Regular Manicure')} - $20`,
      `${t('servicesPage.europeanManicure', 'European Manicure')} - $25`,
      `${t('servicesPage.deluxeManicure', 'Deluxe Manicure')} - $30 ${t('servicesPage.bestSellerTag', '(Best Seller)')}`,
      `${t('servicesPage.signatureSpaManicure', 'Signature Spa Manicure')} - $35`,
    ],
  },
  {
    id: 'pedicure',
    title: t('servicesPage.pedicureCategory', 'Pedicure Services'),
    image: '/images/gallery/service-pedicure.jpg',
    description: t('servicesPage.pedicureDesc', 'Your satisfaction deserves our attention. Indulge in our luxurious pedicure services featuring premium products and relaxing massage.'),
    features: [
      `${t('servicesPage.regularSpaPedicure', 'Regular Spa Pedicure')} - $25 — Includes a 6-minute foot massage ${t('servicesPage.bestSellerTag', '(Best Seller)')}`,
      `${t('servicesPage.europeanSpaPedicure', 'European Spa Pedicure')} - $35 — Exfoliation – Callus Treatment or Sea Salt Glow; Includes a 6-minute foot massage`,
      `${t('servicesPage.deluxeSpaPedicure', 'Deluxe Spa Pedicure')} - $45 — Callus Removal Treatment; Exfoliation – Sea Salt Glow; Rejuvenating Marine Mask; 10-minute foot massage; Hot Stone Massage`,
      `${t('servicesPage.signatureSpaPedicure', 'Signature Spa Pedicure')} - $55 — Callus Removal Treatment; Exfoliation – Sea Salt Glow; Rejuvenating Marine Mask; Deep Penetration – Paraffin Wax; 10-minute foot massage with warming lotion; Hot Stone Massage`,
    ],
  },
  {
    id: 'powder',
    title: t('servicesPage.powderCategory', 'Organic Nail Powder'),
    image: '/images/gallery/service-organic.jpg',
    description: t('servicesPreview.powderDesc', 'Dipping powder collection with beautiful finishes'),
    features: [
      `${t('servicesPage.ombre2ColorPowder', 'Ombre 2 Color Powder')} - $50`,
      `${t('servicesPage.frenchTipPowder', 'French Tip Powder')} - $55`,
      `${t('servicesPage.dippingColor', 'Dipping Color')} - $45 ${t('servicesPage.bestSellerTag', '(Best Seller)')}`,
      `${t('servicesPage.hybridGel', 'Hybrid Gel')} - $60`,
      `${t('servicesPage.gelX', 'Gel X')} - $60`,
    ],
  },
  {
    id: 'waxing',
    title: t('servicesPage.waxingCategory', 'Waxing Services'),
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHdheGluZyUyMHNwYXxlbnwxfHx8fDE3NjUyOTI5NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: t('servicesPage.waxingDesc', 'Smooth and professional hair removal services for your entire body.'),
    features: [
      `${t('servicesPage.fullLegs', 'Full Legs')} - $60`,
      `${t('servicesPage.fullBack', 'Full Back')} - $45`,
      `${t('servicesPage.brazilian', 'Brazilian')} - $60`,
      `${t('servicesPage.fullFace', 'Full Face')} - $40`,
      `${t('servicesPage.bikini', 'Bikini')} - $35`,
      `${t('servicesPage.chest', 'Chest')} - $35`,
      `${t('servicesPage.fullArms', 'Full Arms')} - $45`,
      `${t('servicesPage.halfLegs', 'Half Legs')} - $35`,
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

  const gradientMap: Record<string, string> = {
    combo: 'from-rose-500 via-pink-500 to-fuchsia-500',
    manicure: 'from-rose-500 to-pink-500',
    pedicure: 'from-blue-500 to-purple-500',
    powder: 'from-pink-500 to-orange-500',
    waxing: 'from-purple-500 to-rose-500',
    additional: 'from-cyan-500 to-blue-500',
  };

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
      <section id="services" className="py-20 md:py-32 bg-secondary dark:bg-background transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                {t('services.heading', 'Our Services')}
              </h2>
              <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto">
                {t('home.services.subtitle', 'Discover our premium beauty services designed to make you look and feel amazing')}
              </p>
            </motion.div>
          </div>

          {/* Services Grid - Compact 3x2 (3 items per row on md+) */}
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 mb-12 place-items-center">
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
                <div className="relative w-28 h-28 md:w-36 md:h-36 mb-3 overflow-hidden rounded-full border-4 border-border shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[color:var(--scrim-40)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Title */}
                <h3 className="text-center text-sm md:text-base font-semibold text-foreground group-hover:text-brand-gold-muted dark:group-hover:text-brand-gold transition-colors">
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
              className="inline-flex relative overflow-hidden items-center gap-2 px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg text-lg font-semibold bg-[image:var(--gradient-primary-action)] text-[color:var(--gold-champagne)] hover:brightness-110 active:brightness-95 before:content-[''] before:pointer-events-none before:absolute before:inset-0 before:bg-linear-to-r before:from-transparent before:via-[color:var(--btn-sheen)] before:to-transparent before:-skew-x-12 before:translate-x-[-200%] before:transition-transform before:duration-700 before:ease-out hover:before:translate-x-[200%] hover:before:via-[color:var(--btn-sheen-hover)]"
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[color:var(--overlay-backdrop)] backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-card shadow-2xl overflow-hidden border border-border sm:rounded-3xl rounded-t-3xl h-[calc(100vh-3.5rem)] sm:h-auto flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 z-10 w-11 h-11 bg-background/70 dark:bg-card/70 hover:bg-background/85 dark:hover:bg-card/85 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm border border-border/40 outline-none focus-visible:ring-[3px] focus-visible:ring-[color:var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <X className="text-foreground" size={20} />
              </button>

              {/* Image Header */}
              <div className="flex-none relative h-40 md:h-64">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[color:var(--scrim-60)] to-transparent"></div>
                <h3 className="absolute bottom-6 left-6 text-2xl md:text-3xl font-bold text-[color:var(--on-image-foreground)]">
                  {selectedService.title}
                </h3>
              </div>

              {/* Content (scrollable) */}
              <div className="p-6 md:p-8 flex-1 overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' as any }}>
                <p className="text-foreground mb-6 text-base md:text-lg leading-relaxed">
                  {selectedService.description}
                </p>

                {/* Features List */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-foreground mb-4">
                    {t('home.services.whatsIncluded', "What's Included:")}
                  </h4>
                  <div className="space-y-2">
                    {selectedService.features.map((feature, index) => {
                      const bsTag = t('servicesPage.bestSellerTag', '(Best Seller)');
                      const hasBadge = feature.includes(bsTag);
                      // remove badge text first so it doesn't interfere with note-splitting
                      const featureNoBadge = hasBadge ? feature.replace(bsTag, '').trim() : feature;

                      // For pedicure preview, strip trailing notes (after em-dash or semicolon)
                      const displayTextRaw = selectedService.id === 'pedicure'
                        ? featureNoBadge.split(/—|–|;/)[0].trim()
                        : featureNoBadge;

                      const gradient = gradientMap[selectedService.id] || 'from-rose-500 to-pink-500';

                      // Extract price if present, e.g. "$25" or "$45.00"
                      const priceMatch = displayTextRaw.match(/(\$\d+(?:\.\d+)?)/);
                      let beforeText = displayTextRaw;
                      let priceText: string | null = null;
                      if (priceMatch) {
                        priceText = priceMatch[0];
                        beforeText = displayTextRaw.replace(priceText, '').replace(/[-–—]\s*$/, '').trim();
                      }

                      const bsLabel = bsTag.replace(/^[\(\[]+|[\)\]]+$/g, '').trim();

                      return (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-brand-gold shrink-0"></div>
                          <div className="flex items-center gap-3">
                            <span className="text-foreground-secondary">
                              {beforeText}
                              {priceText && (
                                <span className="ml-2 font-semibold" style={{ color: 'oklch(0.592 0.249 0.584)' }}>
                                  {priceText}
                                </span>
                              )}
                            </span>
                            {hasBadge && <BestSellerBadge label={bsLabel} />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setSelectedService(null);
                      onViewAll(selectedService.id);
                    }}
                    className="flex-1 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg font-semibold cursor-pointer bg-btn-accent hover:bg-btn-accent-hover active:bg-btn-accent-active text-btn-theme-foreground"
                  >
                    {t('home.services.viewPrices', 'View Prices')}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedService(null);
                      onBookClick();
                    }}
                    className="flex-1 relative overflow-hidden px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg font-semibold cursor-pointer bg-[image:var(--gradient-primary-action)] text-[color:var(--gold-champagne)] hover:brightness-110 active:brightness-95 before:content-[''] before:pointer-events-none before:absolute before:inset-0 before:bg-linear-to-r before:from-transparent before:via-[color:var(--btn-sheen)] before:to-transparent before:-skew-x-12 before:translate-x-[-200%] before:transition-transform before:duration-700 before:ease-out hover:before:translate-x-[200%] hover:before:via-[color:var(--btn-sheen-hover)]"
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
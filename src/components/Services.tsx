import { Scissors, Droplet, Sparkles, Gem, Hand, Check, Calendar, Flame, Star, BadgePercent } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { BookingModal } from './BookingModal';

const serviceCategories = [
  {
    id: 'manicure',
    icon: Scissors,
    title: 'Manicure',
    tagline: 'YOUR SATISFACTION DESERVES OUR ATTENTION',
    gradient: 'from-rose-500 to-pink-500',
    image: 'https://images.unsplash.com/photo-1599458348985-236f9b110da1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5pY3VyZSUyMG5haWwlMjBwb2xpc2h8ZW58MXx8fHwxNzY1MjE2MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tiers: [
      {
        name: 'Regular Manicure',
        price: '$20',
        features: [
          'Classic nail care',
          'Nail shaping and filing',
          'Cuticle care',
          'Polish application',
        ],
      },
      {
        name: 'European Manicure',
        price: '$25',
        features: [
          'Exfoliates – exfoliating crystal',
          'Deep moisturization – Special Lotion',
        ],
      },
      {
        name: 'Deluxe Manicure',
        price: '$30',
        features: [
          'Exfoliates – exfoliating crystal',
          'Deep moisturization – Special Lotion',
          'Rejuvenate – Marine Mask',
        ],
        popular: true,
      },
      {
        name: 'Signature Spa Manicure',
        price: '$35',
        features: [
          'Exfoliates – exfoliating crystal',
          'Rejuvenate – Marine Mask',
          'Deep moisturization – Special Lotion',
          'Deep Penetration – Paraffin Wax',
          '10 Minutes Massage – Warming Lotion',
        ],
      },
    ],
  },
  {
    id: 'pedicure',
    icon: Droplet,
    title: 'Pedicure',
    tagline: 'YOUR SATISFACTION DESERVES OUR ATTENTION',
    gradient: 'from-blue-500 to-purple-500',
    image: 'https://images.unsplash.com/photo-1638859460750-181fcc7936a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWRpY3VyZSUyMHNwYSUyMGZlZXR8ZW58MXx8fHwxNzY1MjE2MzM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    services: [
      { name: 'Regular Spa Pedicure', price: '$25' },
      { name: 'Full Face', price: '$40' },
      { name: 'Bikini', price: '$35' },
      { name: 'Chest', price: '$35' },
      { name: 'Full Arms', price: '$45' },
      { name: 'Half Legs', price: '$35' },
    ],
  },
  {
    id: 'waxing',
    icon: Sparkles,
    title: 'Waxing Services',
    tagline: 'SMOOTH & PROFESSIONAL HAIR REMOVAL',
    gradient: 'from-purple-500 to-rose-500',
    image: 'https://images.unsplash.com/photo-1743617206507-447c78118622?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWlsJTIwd2F4aW5nJTIwYmVhdXR5fGVufDF8fHx8MTc2NTIxNjM0MHww&ixlib=rb-4.1.0&q=80&w=1080',
    services: [
      { name: 'Full Legs', price: '$60' },
      { name: 'Half Legs', price: '$35' },
      { name: 'Full Arms', price: '$45' },
      { name: 'Half Arms', price: '$30' },
      { name: 'Full Back', price: '$45' },
      { name: 'Chest', price: '$35' },
      { name: 'Brazilian', price: '$60' },
      { name: 'Bikini', price: '$35' },
      { name: 'Full Face', price: '$40' },
      { name: 'Eyebrows', price: '$15' },
      { name: 'Upper Lip', price: '$8' },
      { name: 'Chin', price: '$10' },
      { name: 'Side Burns', price: '$10' },
      { name: 'Under Arms', price: '$20' },
      { name: 'Stomach', price: '$15' },
    ],
  },
  {
    id: 'powder',
    icon: Gem,
    title: 'Organic Nail Powder',
    tagline: 'DIPPING POWDER COLLECTION',
    gradient: 'from-pink-500 to-orange-500',
    image: 'https://images.unsplash.com/photo-1535588986102-0e9c0c60cba2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwcG93ZGVyJTIwbmFpbHN8ZW58MXx8fHwxNzY1MjE2MzQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    services: [
      { name: 'Ombre 2 Color Powder', price: '$50' },
      { name: 'French Tip Powder', price: '$55' },
      { name: 'Dipping Color', price: '$45' },
      { name: 'Hybrid Gel', price: '$60' },
      { name: 'Gel X', price: '$60' },
    ],
  },
  {
    id: 'additional',
    icon: Hand,
    title: 'Additional Services',
    tagline: 'ENHANCE YOUR EXPERIENCE',
    gradient: 'from-cyan-500 to-blue-500',
    image: 'https://images.unsplash.com/photo-1737214475365-e4f06281dcf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWlsJTIwYXJ0JTIwZGVzaWdufGVufDF8fHx8MTc2NTIxNjM0MHww&ixlib=rb-4.1.0&q=80&w=1080',
    services: [
      { name: 'French', price: '$5' },
      { name: 'Two Designs', price: '$5' },
      { name: 'Natural Buff Shine', price: '$5' },
      { name: '15 Minutes Massage Foots', price: '$20' },
      { name: '15 Minutes Massage Neck Shoulder', price: '$20' },
    ],
  },
];

type BadgeType = 'Popular' | 'Save' | 'Best Seller' | string;

function ServiceBadge({ type }: { type: BadgeType }) {
  const { t } = useLanguage();
  const styles = {
    Popular: {
      gradient: 'from-rose-500 via-pink-500 to-fuchsia-500',
      Icon: Flame,
    },
    Save: {
      gradient: 'from-emerald-400 via-teal-400 to-sky-400',
      Icon: BadgePercent,
    },
    'Best Seller': {
      gradient: 'from-amber-400 via-yellow-400 to-orange-400',
      Icon: Star,
    },
  } as const;

  const style = styles[type as keyof typeof styles];
  const IconComp = style?.Icon ?? Sparkles;
  const gradient = style?.gradient ?? 'from-rose-300 via-pink-300 to-amber-200';

  const labelKey =
    type === 'Popular' ? 'common.popular' : type === 'Best Seller' ? 'common.bestSeller' : type === 'Save' ? 'common.save' : undefined;
  const label = labelKey ? t(labelKey, type) : type;

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg shadow-black/10 border border-white/40 bg-gradient-to-r ${gradient}`}>
      <IconComp className="w-4 h-4" />
      <span className="uppercase tracking-wide">{label}</span>
    </span>
  );
}

const priceList = [
  {
    title: 'REGULAR PEDICURE DELUXE',
    description: 'Classic soak, cuticle care, hot towels, polish finish.',
    price: '$55',
    badge: 'Popular',
    gradient: 'from-rose-500 via-pink-500 to-fuchsia-500',
    icon: Flame,
  },
  {
    title: 'BOMB GEL PEDICURE (SAVE)',
    description: 'Gel finish with extended shine and gentle exfoliation.',
    price: '$53',
    badge: 'Save',
    gradient: 'from-emerald-400 via-teal-400 to-sky-400',
    icon: BadgePercent,
  },
  {
    title: 'VOLCANO SPA PEDICURE',
    description: 'Volcanic mineral soak, massage, detox mask, polish.',
    price: '$63',
    badge: 'Best Seller',
    gradient: 'from-amber-400 via-yellow-400 to-orange-400',
    icon: Star,
  },
  {
    title: 'COLLAGEN SPA PEDICURE',
    description: 'Collagen mask, extended massage, deep hydration.',
    price: '$69',
    badge: 'Popular',
    gradient: 'from-rose-500 via-pink-500 to-fuchsia-500',
    icon: Flame,
  },
];

function ServiceTier({ tier, gradient, index, onBook }: { tier: any; gradient: string; index: number; onBook: (service: string) => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const tierRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (tierRef.current) {
      observer.observe(tierRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={tierRef}
      className={`relative bg-white dark:bg-gray-800 backdrop-blur-xl border-2 ${
        tier.featured
          ? 'border-rose-500 dark:border-rose-500 shadow-2xl shadow-rose-500/40 scale-105 md:scale-110'
          : tier.popular
          ? 'border-rose-400 dark:border-rose-400 shadow-xl shadow-rose-500/25 scale-102 md:scale-105'
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      } p-8 rounded-2xl transition-all duration-500 hover:shadow-2xl group h-full flex flex-col`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : 40}px)`,
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {tier.featured && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
          <span className="px-6 py-2 bg-gradient-to-r from-yellow-400 via-rose-500 to-purple-600 text-white text-sm rounded-full shadow-lg font-bold uppercase tracking-wider">
            ⭐ BEST VALUE
          </span>
        </div>
      )}

      {tier.popular && !tier.featured && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
          <span className={`px-5 py-2 bg-gradient-to-r ${gradient} text-white text-sm rounded-full shadow-lg font-semibold uppercase tracking-wider`}>
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <h4 className="text-2xl md:text-xl mb-4 text-gray-900 dark:text-white font-bold min-h-[3rem] flex items-center justify-center leading-snug">
          {tier.name}
        </h4>
        <div className={`text-5xl md:text-4xl bg-gradient-to-r ${gradient} bg-clip-text text-transparent font-bold`}>
          {tier.price}
        </div>
      </div>

      <ul className="space-y-4 mb-8 flex-grow">
        {tier.features.map((feature: string, idx: number) => (
          <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            <Check className="text-rose-500 dark:text-rose-400 flex-shrink-0 mt-1" size={20} />
            <span className="font-medium">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onBook(tier.name)}
        className={`w-full py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer font-semibold uppercase tracking-wider ${
          tier.featured || tier.popular
            ? `bg-gradient-to-r ${gradient} text-white hover:shadow-2xl hover:scale-105 transform`
            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105'
        }`}
      >
        <Calendar size={20} />
        <span>Book Now</span>
      </button>
    </div>
  );
}

function SimpleServiceCard({ service, gradient, index, onBook }: { service: any; gradient: string; index: number; onBook: (service: string) => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`bg-white dark:bg-gray-800 backdrop-blur-xl border-2 ${
        service.popular
          ? 'border-rose-400 dark:border-rose-400 shadow-lg shadow-rose-500/25'
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      } p-6 rounded-xl transition-all duration-300 hover:shadow-xl group cursor-pointer h-full flex items-center`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : 20}px)`,
        transitionDelay: `${index * 50}ms`,
      }}
      onClick={() => onBook(service.name)}
    >
      <div className="w-full">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex-1">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors duration-300 mb-2">
              {service.name}
            </h4>
            {service.popular && <ServiceBadge type="Popular" />}
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <span className={`text-3xl bg-gradient-to-r ${gradient} bg-clip-text text-transparent font-bold`}>
            {service.price}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBook(service.name);
            }}
            className={`p-3 bg-gradient-to-r ${gradient} text-white rounded-lg hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg`}
            aria-label={`Book ${service.name}`}
          >
            <Calendar size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ServiceCategory({ category, index, onBook }: { category: any; index: number; onBook: (service: string) => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (categoryRef.current) {
      observer.observe(categoryRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={categoryRef}
      className="mb-28 scroll-mt-32"
      id={category.id}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : 60}px)`,
        transition: 'all 0.7s ease-out',
        transitionDelay: `${index * 200}ms`,
      }}
    >
      {/* Category Header */}
      <div className="text-center mb-16">
        <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br ${category.gradient} rounded-3xl mb-8 shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-2xl`}>
          <category.icon className="text-white" size={40} strokeWidth={1.5} />
        </div>
        <h3 className={`text-5xl md:text-6xl mb-6 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent font-bold leading-tight`}>
          {category.title}
        </h3>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 tracking-wide mb-8 font-medium">
          {category.tagline}
        </p>
        <div className="flex justify-center gap-2">
          <div className="w-12 h-1.5 bg-gradient-to-r from-transparent to-current rounded-full opacity-40"></div>
          <div className={`w-3 h-1.5 bg-gradient-to-r ${category.gradient} rounded-full`}></div>
          <div className="w-12 h-1.5 bg-gradient-to-r from-current to-transparent rounded-full opacity-40"></div>
        </div>
      </div>

      {/* Render Tiers or Simple Services */}
      {category.tiers ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7 max-w-7xl mx-auto px-2">
          {category.tiers.map((tier: any, idx: number) => (
            <ServiceTier key={idx} tier={tier} gradient={category.gradient} index={idx} onBook={onBook} />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-2">
          {category.services.map((service: any, idx: number) => (
            <SimpleServiceCard key={idx} service={service} gradient={category.gradient} index={idx} onBook={onBook} />
          ))}
        </div>
      )}
    </div>
  );
}

export function Services() {
  const { t } = useLanguage();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [activeTab, setActiveTab] = useState('manicure');

  // Update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = serviceCategories.map(cat => ({
        id: cat.id,
        element: document.getElementById(cat.id),
      }));

      const scrollPosition = window.scrollY + 200; // Offset for sticky nav

      for (const section of sections) {
        if (section.element) {
          const { offsetTop, offsetHeight } = section.element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveTab(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookService = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsBookingOpen(true);
  };

  const scrollToCategory = (categoryId: string) => {
    setActiveTab(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <section id="services" className="py-32 px-6 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-500">
        {/* Animated background gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-300/20 dark:bg-rose-500/10 rounded-full blur-3xl animate-pulse transition-colors duration-500"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse transition-colors duration-500" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Main Header */}
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <span className="px-6 py-2.5 bg-gradient-to-r from-rose-500/10 to-purple-500/10 border border-rose-300/30 dark:border-rose-600/30 text-rose-600 dark:text-rose-400 rounded-full text-sm font-semibold uppercase tracking-wider">
                ✨ Comprehensive Selection
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-gray-900 via-rose-600 to-purple-600 dark:from-white dark:via-rose-300 dark:to-purple-400 bg-clip-text text-transparent font-bold leading-tight">
              Our Services
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Discover our carefully curated collection of beauty services, each designed to elevate your experience and reveal your most confident self
            </p>
            <div className="flex justify-center gap-2 mt-8">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent to-rose-500 rounded-full"></div>
              <div className="w-2 h-1 bg-rose-500 rounded-full"></div>
              <div className="w-16 h-1 bg-gradient-to-r from-rose-500 to-transparent rounded-full"></div>
            </div>
          </div>

          {/* Premium Price List */}
          <div className="mb-16 md:mb-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Signature Pedicures</p>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">Transparent pricing, premium finish</h3>
              </div>
              <div className="hidden md:flex h-px flex-1 mx-6 bg-gradient-to-r from-slate-200 via-rose-100 to-transparent"></div>
            </div>

            <div className="space-y-4">
              {priceList.slice(0, 4).map((item) => (
                <PriceListCard key={item.title} item={item} />
              ))}
            </div>
          </div>

          {/* Quick Navigation Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-20 sticky top-20 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl py-5 px-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300">
            <span className="hidden sm:inline-block text-gray-600 dark:text-gray-400 font-medium mr-2">Quick Navigation:</span>
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl transition-all duration-300 font-medium whitespace-nowrap ${
                  activeTab === category.id
                    ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg scale-105 transform`
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-md'
                }`}
                aria-label={`Filter services by ${category.title}`}
              >
                <category.icon size={20} strokeWidth={2.5} />
                <span className="text-sm md:text-base">{category.title}</span>
              </button>
            ))}
          </div>

          {/* Service Categories */}
          {serviceCategories.map((category, index) => (
            <ServiceCategory key={category.id} category={category} index={index} onBook={handleBookService} />
          ))}

          {/* Bottom CTA */}
          <div className="mt-32 text-center">
            <div className="inline-block bg-gradient-to-br from-white to-rose-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-3xl p-12 shadow-2xl max-w-3xl">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-500 to-purple-600 rounded-2xl mb-8 shadow-xl transform transition-all duration-300 hover:scale-110">
                <Calendar className="text-white" size={36} />
              </div>
              <h3 className="text-4xl md:text-5xl mb-6 text-gray-900 dark:text-white font-bold">Need Help Choosing?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-xl leading-relaxed">
                Our experienced team is here to help you find the perfect service tailored to your unique needs and beauty goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:6192245050"
                  className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl font-bold uppercase tracking-wider"
                >
                  <span className="text-lg">📞 Call: (619) 224-5050</span>
                </a>
                <button
                  onClick={() => handleBookService('Consultation')}
                  className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 hover:border-rose-500 dark:hover:border-rose-500 text-gray-900 dark:text-white rounded-full transition-all duration-300 hover:scale-105 cursor-pointer font-bold uppercase tracking-wider hover:shadow-xl"
                  aria-label="Book an appointment"
                >
                  <Calendar size={22} />
                  <span className="text-lg">Book Appointment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)}
        preSelectedService={selectedService}
      />
    </>
  );
}

function PriceListCard({ item }: { item: typeof priceList[number] }) {
  return (
    <div
      className="relative w-full rounded-3xl bg-white shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)] border border-slate-100 px-6 py-5 md:px-8 md:py-6 flex items-center justify-between gap-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_-34px_rgba(15,23,42,0.28)]"
    >
      <div className="flex-1 min-w-0">
        <div className="text-base md:text-lg font-extrabold tracking-wide text-slate-900 uppercase mb-1">
          {item.title}
        </div>
        <div className="text-sm md:text-base text-slate-500 mb-3 line-clamp-2">
          {item.description}
        </div>
        <ServiceBadge type={item.badge as BadgeType} />
      </div>

      <div className="text-3xl md:text-4xl font-extrabold text-slate-900 whitespace-nowrap">
        {item.price}
      </div>
    </div>
  );
}
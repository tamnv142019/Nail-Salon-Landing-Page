import { Scissors, Droplet, Sparkles, Gem, Hand, Check, Calendar } from 'lucide-react';
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
          'Exfoliates - exfoliating crystal',
          'Deep moisturization - Special Lotion',
        ],
      },
      {
        name: 'Deluxe Manicure',
        price: '$30',
        features: [
          'Exfoliates - exfoliating crystal',
          'Deep moisturization - Special Lotion',
          'Rejuvenate - Marine Mask',
        ],
        popular: true,
      },
      {
        name: 'Signature Spa Manicure',
        price: '$35',
        features: [
          'Exfoliates - exfoliating crystal',
          'Rejuvenate - Marine Mask',
          'Deep moisturization - Special Lotion',
          'Deep Penetration - Paraffin Wax',
          '10 Minutes Massage - Warming Lotion',
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
    tiers: [
      {
        name: 'Regular Spa Pedicure',
        price: '$25',
        features: [
          'Include 5 minutes foot Massage',
        ],
      },
      {
        name: 'European Spa Pedicure',
        price: '$35',
        features: [
          'Exfoliates Callus Treatment or Sea Salt glow',
          'Include 6 minutes foot Massage',
        ],
      },
      {
        name: 'Deluxe Spa Pedicure',
        price: '$45',
        features: [
          'Callus Removal Treatment',
          'Exfoliates Sea Salt Glow',
          'Rejuvenation - Marine Mask',
          'Include 10 minutes foot Massage',
          'Hot stone massage',
        ],
        popular: true,
      },
      {
        name: 'Signature Spa Pedicure',
        price: '$55',
        features: [
          'Callus Removal Treatment',
          'Exfoliates Sea Salt Glow',
          'Rejuvenation - Mask',
          'Include 12 minutes foot Massage',
          'Hot stone massage',
        ],
      },
      {
        name: 'Signature Package',
        price: '$85',
        features: [
          'Manicure & Pedicure combo signature',
          'Callus Removal Treatment',
          'Sea Salt - Mask',
          'Paraffin Wax',
          '12 minutes Massage',
        ],
        featured: true,
      },
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
      { name: 'Dipping Color', price: '$45', popular: true },
      { name: 'Ombre 2 Color Powder', price: '$50' },
      { name: 'French Tip Powder', price: '$55' },
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
          ? 'border-rose-500 dark:border-rose-500 shadow-2xl shadow-rose-500/30 scale-105 md:scale-110'
          : tier.popular
          ? 'border-rose-400 dark:border-rose-400 shadow-xl shadow-rose-500/20 scale-102 md:scale-105'
          : 'border-gray-200 dark:border-gray-700'
      } p-6 rounded-2xl transition-all duration-500 hover:shadow-xl group`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : 40}px)`,
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {tier.featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <span className="px-5 py-1.5 bg-gradient-to-r from-yellow-400 via-rose-500 to-purple-600 text-white text-sm rounded-full shadow-lg animate-pulse">
            ⭐ BEST VALUE
          </span>
        </div>
      )}

      {tier.popular && !tier.featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <span className={`px-4 py-1 bg-gradient-to-r ${gradient} text-white text-sm rounded-full shadow-lg`}>
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h4 className="text-xl mb-3 text-gray-900 dark:text-white min-h-[3.5rem] flex items-center justify-center">
          {tier.name}
        </h4>
        <div className={`text-4xl md:text-5xl bg-gradient-to-r ${gradient} bg-clip-text text-transparent font-bold`}>
          {tier.price}
        </div>
      </div>

      <ul className="space-y-3 mb-6 min-h-[12rem]">
        {tier.features.map((feature: string, idx: number) => (
          <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-300 text-sm">
            <Check className="text-rose-500 dark:text-rose-400 flex-shrink-0 mt-0.5" size={18} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onBook(tier.name)}
        className={`w-full py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
          tier.featured || tier.popular
            ? `bg-gradient-to-r ${gradient} text-white hover:shadow-lg hover:scale-105`
            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
        type="button"
      >
        <Calendar size={18} />
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
          ? 'border-rose-400 dark:border-rose-400 shadow-lg shadow-rose-500/20'
          : 'border-gray-200 dark:border-gray-700'
      } p-5 rounded-xl transition-all duration-300 hover:shadow-lg hover:border-rose-300 dark:hover:border-rose-600 group`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : 20}px)`,
        transitionDelay: `${index * 50}ms`,
      }}
    >
      <div className="flex items-center justify-between">
        <div 
          className="flex-1 cursor-pointer"
          onClick={() => onBook(service.name)}
          role="button"
          tabIndex={0}
        >
          <h4 className="text-lg text-gray-900 dark:text-white mb-1 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors duration-300">
            {service.name}
          </h4>
          {service.popular && (
            <span className="text-xs text-rose-600 dark:text-rose-400">Popular</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-2xl bg-gradient-to-r ${gradient} bg-clip-text text-transparent font-bold`}>
            {service.price}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBook(service.name);
            }}
            className={`p-2 bg-gradient-to-r ${gradient} text-white rounded-lg hover:scale-110 transition-all duration-300 shadow-md`}
            type="button"
          >
            <Calendar size={18} />
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
      className="mb-24 scroll-mt-32"
      id={category.id}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : 60}px)`,
        transition: 'all 0.7s ease-out',
        transitionDelay: `${index * 200}ms`,
      }}
    >
      {/* Category Header */}
      <div className="text-center mb-12">
        <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${category.gradient} rounded-3xl mb-6 shadow-xl animate-pulse`}>
          <category.icon className="text-white" size={36} strokeWidth={2} />
        </div>
        <h3 className={`text-4xl md:text-5xl mb-4 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent font-bold`}>
          {category.title}
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 tracking-wider">
          {category.tagline}
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent mx-auto mt-6"></div>
      </div>

      {/* Render Tiers or Simple Services */}
      {category.tiers ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {category.tiers.map((tier: any, idx: number) => (
            <ServiceTier key={idx} tier={tier} gradient={category.gradient} index={idx} onBook={onBook} />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
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
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-gray-900 via-rose-600 to-purple-600 dark:from-white dark:via-rose-300 dark:to-purple-400 bg-clip-text text-transparent font-bold">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Choose from our carefully crafted services, each designed to elevate your experience
            </p>
          </div>

          {/* Quick Navigation Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-16 sticky top-20 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl py-4 rounded-full px-6 shadow-lg border border-gray-200 dark:border-gray-800">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 ${
                  activeTab === category.id
                    ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg scale-105`
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                type="button"
              >
                <category.icon size={18} />
                <span className="text-sm font-medium">{category.title}</span>
              </button>
            ))}
          </div>

          {/* Service Categories */}
          {serviceCategories.map((category, index) => (
            <ServiceCategory key={category.id} category={category} index={index} onBook={handleBookService} />
          ))}

          {/* Bottom CTA */}
          <div className="mt-20 text-center">
            <div className="inline-block bg-gradient-to-br from-white to-rose-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-3xl p-10 shadow-2xl max-w-2xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-500 to-purple-600 rounded-2xl mb-6">
                <Calendar className="text-white" size={32} />
              </div>
              <h3 className="text-3xl mb-4 text-gray-900 dark:text-white font-bold">Need Help Choosing?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                Our experienced staff is here to help you select the perfect service for your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:6192245050"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <span className="text-lg">📞 Call: (619) 224-5050</span>
                </a>
                <button
                  onClick={() => handleBookService('Consultation')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 hover:border-rose-500 dark:hover:border-rose-500 text-gray-900 dark:text-white rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Calendar size={20} />
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
import { Scissors, Droplet, Sparkles, Gem, Hand, Check, Calendar, ArrowLeft, Phone } from 'lucide-react';
import { useEffect, useRef, useState, memo, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BookingModal } from '../components/BookingModal';

const serviceCategories = [
  {
    id: 'manicure',
    icon: Scissors,
    title: 'Manicure Services',
    tagline: 'YOUR SATISFACTION DESERVES OUR ATTENTION',
    gradient: 'from-rose-500 to-pink-500',
    heroImage: 'https://images.unsplash.com/photo-1650176491728-a5e6edd08575?w=800&q=80',
    description: 'Experience the ultimate in hand care with our premium manicure services. From classic to signature spa treatments, we use only the finest products.',
    tiers: [
      {
        name: 'Regular Manicure',
        price: '$20',
        image: 'https://images.unsplash.com/photo-1762373349045-c2decd4ec3f3?w=400&q=80',
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
        image: 'https://images.unsplash.com/photo-1650176491728-a5e6edd08575?w=400&q=80',
        features: [
          'Exfoliates - exfoliating crystal',
          'Deep moisturization - Special Lotion',
        ],
      },
      {
        name: 'Deluxe Manicure',
        price: '$30',
        image: 'https://images.unsplash.com/photo-1571290274554-6a2eaa771e5f?w=400&q=80',
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
        image: 'https://images.unsplash.com/photo-1660324350911-124de1e4154a?w=400&q=80',
        features: [
          'Exfoliates - exfoliating crystal',
          'Rejuvenation - Marine Mask',
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
    title: 'Pedicure Services',
    tagline: 'YOUR SATISFACTION DESERVES OUR ATTENTION',
    gradient: 'from-blue-500 to-purple-500',
    heroImage: 'https://images.unsplash.com/photo-1638859460750-181fcc7936a6?w=800&q=80',
    description: 'Indulge in our luxurious pedicure treatments featuring hot stone massages, marine masks, and deep callus removal treatments.',
    tiers: [
      {
        name: 'Regular Spa Pedicure',
        price: '$25',
        image: 'https://images.unsplash.com/photo-1638859460750-181fcc7936a6?w=400&q=80',
        features: [
          'Include 5 minutes foot Massage',
        ],
      },
      {
        name: 'European Spa Pedicure',
        price: '$35',
        image: 'https://images.unsplash.com/photo-1660324350911-124de1e4154a?w=400&q=80',
        features: [
          'Exfoliates Callus Treatment or Sea Salt glow',
          'Include 6 minutes foot Massage',
        ],
      },
      {
        name: 'Deluxe Spa Pedicure',
        price: '$45',
        image: 'https://images.unsplash.com/photo-1633681926019-03bd9325ec20?w=400&q=80',
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
        image: 'https://images.unsplash.com/photo-1650176491728-a5e6edd08575?w=400&q=80',
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
        image: 'https://images.unsplash.com/photo-1571290274554-6a2eaa771e5f?w=400&q=80',
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
    heroImage: 'https://images.unsplash.com/photo-1660324350911-124de1e4154a?w=800&q=80',
    description: 'Professional waxing services using premium quality wax for smooth, long-lasting results with minimal discomfort.',
    services: [
      { name: 'Full Legs', price: '$60' },
      { name: 'Half Legs', price: '$35' },
      { name: 'Full Arms', price: '$45' },
      { name: 'Half Arms', price: '$30' },
      { name: 'Full Back', price: '$45' },
      { name: 'Chest', price: '$35' },
      { name: 'Brazilian', price: '$60', popular: true },
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
    heroImage: 'https://images.unsplash.com/photo-1571290274554-6a2eaa771e5f?w=800&q=80',
    description: 'Our organic dipping powder system provides a long-lasting, durable manicure without UV light. Healthier for your nails!',
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
    heroImage: 'https://images.unsplash.com/photo-1633681926019-03bd9325ec20?w=800&q=80',
    description: 'Add extra touches to make your visit even more special with our add-on services and nail art designs.',
    services: [
      { name: 'French', price: '$5' },
      { name: 'Two Designs', price: '$5' },
      { name: 'Natural Buff Shine', price: '$5' },
      { name: '15 Minutes Massage Foots', price: '$20' },
      { name: '15 Minutes Massage Neck Shoulder', price: '$20' },
    ],
  },
];

const ServiceTierCard = memo(({ tier, gradient, index, onBook }: { tier: any; gradient: string; index: number; onBook: (service: string) => void }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
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
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border-2 transition-all duration-500 hover:shadow-2xl group ${
        tier.featured
          ? 'border-yellow-400 dark:border-yellow-500 md:scale-105 shadow-yellow-500/30'
          : tier.popular
          ? 'border-rose-400 dark:border-rose-400 shadow-rose-500/20'
          : 'border-gray-200 dark:border-gray-700 hover:border-rose-300 dark:hover:border-rose-600'
      }`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : 40}px)`,
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {tier.featured && (
        <div className="absolute top-2 md:top-4 right-2 md:right-4 z-10">
          <span className="px-2 md:px-4 py-1 md:py-1.5 bg-gradient-to-r from-yellow-400 via-orange-500 to-rose-500 text-white text-xs md:text-sm rounded-full shadow-lg font-semibold">
            ⭐ BEST VALUE
          </span>
        </div>
      )}
      {tier.popular && !tier.featured && (
        <div className="absolute top-2 md:top-4 right-2 md:right-4 z-10">
          <span className={`px-2 md:px-4 py-1 md:py-1.5 bg-gradient-to-r ${gradient} text-white text-xs md:text-sm rounded-full shadow-lg font-semibold`}>
            🔥 Popular
          </span>
        </div>
      )}

      <div className="relative h-36 md:h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-300 dark:bg-gray-600"></div>
        )}
        {isVisible && (
          <img
            src={tier.image}
            alt={tier.name}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent`}></div>
        <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4">
          <h4 className="text-base md:text-xl text-white mb-1">{tier.name}</h4>
          <div className={`inline-block px-3 md:px-4 py-1 bg-white/90 backdrop-blur-sm rounded-full`}>
            <span className={`text-lg md:text-2xl bg-gradient-to-r ${gradient} bg-clip-text text-transparent font-bold`}>
              {tier.price}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6">
        <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
          {tier.features.map((feature: string, idx: number) => (
            <li key={idx} className="flex items-start gap-2 md:gap-3 text-gray-600 dark:text-gray-300 text-xs md:text-sm">
              <Check className="text-rose-500 dark:text-rose-400 flex-shrink-0 mt-0.5" size={16} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => onBook(tier.name)}
          aria-label={`Book ${tier.name} service`}
          className={`w-full py-2.5 md:py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base font-semibold ${
            tier.featured || tier.popular
              ? `bg-gradient-to-r ${gradient} text-white hover:shadow-lg hover:scale-105`
              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <Calendar size={16} />
          <span>Book Now</span>
        </button>
      </div>
    </div>
  );
});

ServiceTierCard.displayName = 'ServiceTierCard';

const SimpleServiceCard = memo(({ service, gradient, index, onBook }: { service: any; gradient: string; index: number; onBook: (service: string) => void }) => {
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
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border-2 transition-all duration-300 hover:shadow-lg group cursor-pointer ${
        service.popular
          ? 'border-rose-400 dark:border-rose-400 shadow-rose-500/20'
          : 'border-gray-200 dark:border-gray-700 hover:border-rose-300 dark:hover:border-rose-600'
      }`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : 20}px)`,
        transitionDelay: `${index * 50}ms`,
      }}
      onClick={() => onBook(service.name)}
    >
      <div className="p-4">
        {service.popular && (
          <div className="mb-2">
            <span className={`inline-block px-2 md:px-3 py-0.5 md:py-1 bg-gradient-to-r ${gradient} text-white text-xs rounded-full shadow-md`}>
              🔥 Popular
            </span>
          </div>
        )}
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm md:text-lg text-gray-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors duration-300 flex-1">
            {service.name}
          </h4>
          <span className={`text-base md:text-xl bg-gradient-to-r ${gradient} bg-clip-text text-transparent font-bold ml-2`}>
            {service.price}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBook(service.name);
          }}
          aria-label={`Book ${service.name} service`}
          className={`w-full py-2 md:py-2.5 bg-gradient-to-r ${gradient} text-white rounded-lg hover:scale-105 transition-all duration-300 shadow-md flex items-center justify-center gap-2 text-xs md:text-sm`}
        >
          <Calendar size={14} />
          <span>Book Now</span>
        </button>
      </div>
    </div>
  );
});

SimpleServiceCard.displayName = 'SimpleServiceCard';

const ServiceCategory = memo(({ category, index, onBook }: { category: any; index: number; onBook: (service: string) => void }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
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
      { threshold: 0.05, rootMargin: '100px' }
    );

    if (categoryRef.current) {
      observer.observe(categoryRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={categoryRef}
      className="mb-20 md:mb-32 scroll-mt-32"
      id={category.id}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : 60}px)`,
        transition: 'all 0.8s ease-out',
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <div className="relative h-48 md:h-80 rounded-2xl md:rounded-3xl overflow-hidden mb-8 md:mb-12 shadow-2xl bg-gray-200 dark:bg-gray-700">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-300 dark:bg-gray-600"></div>
        )}
        {isVisible && (
          <img
            src={category.heroImage}
            alt={category.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
        <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-80`}></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6">
          <div className="inline-flex items-center justify-center w-14 h-14 md:w-20 md:h-20 bg-white/20 backdrop-blur-xl rounded-2xl md:rounded-3xl mb-3 md:mb-4 shadow-xl">
            <category.icon className="text-white" size={window.innerWidth < 768 ? 28 : 40} strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl md:text-6xl text-white mb-2 md:mb-4 font-bold drop-shadow-lg">
            {category.title}
          </h2>
            <p className="text-sm md:text-xl text-white max-w-2xl tracking-wide font-medium drop-shadow-md">
            {category.tagline}
          </p>
        </div>
      </div>

      <div className="text-center mb-8 md:mb-12 max-w-3xl mx-auto px-4">
        <p className="text-sm md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {category.description}
        </p>
      </div>

      {category.tiers ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {category.tiers.map((tier: any, idx: number) => (
            <ServiceTierCard key={idx} tier={tier} gradient={category.gradient} index={idx} onBook={onBook} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {category.services.map((service: any, idx: number) => (
            <SimpleServiceCard key={idx} service={service} gradient={category.gradient} index={idx} onBook={onBook} />
          ))}
        </div>
      )}
    </div>
  );
});

ServiceCategory.displayName = 'ServiceCategory';

export function ServicesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [activeTab, setActiveTab] = useState('manicure');

  // Handle scroll to service from featured services
  useEffect(() => {
    const state = location.state as { scrollToService?: string } | null;
    if (state?.scrollToService) {
      setTimeout(() => {
        const element = document.getElementById(state.scrollToService);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveTab(state.scrollToService);
        }
      }, 100);
    }
  }, [location.state]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = serviceCategories.map(cat => ({
        id: cat.id,
        element: document.getElementById(cat.id),
      }));

      const scrollPosition = window.scrollY + 200;

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
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Enhanced Hero Section */}
      <div className="bg-gradient-to-br from-rose-500 via-purple-600 to-pink-500 py-12 md:py-16 px-4 md:px-6 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <button
            onClick={() => navigate('/')}
            aria-label="Back to home page"
            className="inline-flex items-center gap-2 text-white hover:text-white mb-6 md:mb-8 transition-all duration-300 group px-4 py-2 rounded-full hover:bg-white/15 backdrop-blur-sm border border-white/20 hover:border-white/40 text-sm md:text-base font-medium"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Home</span>
          </button>
          
          <div className="mb-6 md:mb-8">
            <h1 className="text-4xl md:text-6xl text-white mb-4 font-black drop-shadow-2xl leading-tight">
              Our Services
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-white via-rose-200 to-transparent rounded-full mb-6"></div>
            <p className="text-base md:text-lg text-white/95 max-w-3xl leading-relaxed drop-shadow-lg font-light">
              Premium nail care, spa treatments, and beauty services to elevate your experience.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-8">
            {[
              { label: 'Services', value: '50+' },
              { label: 'Expert Staff', value: '2+' },
              { label: 'Years Experience', value: '10+' },
              { label: 'Happy Clients', value: '500+' }
            ].map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 md:p-4 text-center hover:bg-white/15 transition-all duration-300 group">
                <div className="text-xl md:text-3xl font-bold text-white mb-0.5 md:mb-1 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
                <div className="text-white/95 text-xs font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Pills */}
      <div className="sticky top-0 z-50 bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-xl transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5">
          <div className="flex overflow-x-auto gap-2 md:gap-3 justify-start md:justify-center scrollbar-hide pb-2">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                aria-label={`View ${category.title}`}
                className={`flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-full transition-all duration-300 font-semibold whitespace-nowrap text-xs md:text-sm flex-shrink-0 group ${
                  activeTab === category.id
                    ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg scale-105 shadow-lg`
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-md'
                }`}
              >
                <category.icon size={18} className="group-hover:scale-110 transition-transform duration-300" />
                <span className="hidden sm:inline">{category.title.replace(' Services', '')}</span>
                <span className="sm:hidden">{category.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Main Content */}
      <div className="py-16 md:py-28 px-4 md:px-6 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-black dark:via-gray-900 dark:to-black relative overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-rose-300/15 dark:bg-rose-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-purple-300/15 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {serviceCategories.map((category, index) => (
            <ServiceCategory key={category.id} category={category} index={index} onBook={handleBookService} />
          ))}

          {/* Enhanced CTA Section */}
          <div className="mt-16 md:mt-28 text-center px-4">
            <div className="inline-block bg-gradient-to-br from-white via-gray-50 to-rose-50 dark:from-gray-800 dark:via-gray-850 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-3xl md:rounded-4xl p-8 md:p-16 shadow-2xl max-w-4xl relative overflow-hidden group">
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-rose-100/30 dark:from-rose-900/10 to-transparent rounded-full blur-3xl -z-10"></div>
              
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 rounded-2xl md:rounded-3xl mb-6 md:mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <Phone className="text-white" size={window.innerWidth < 768 ? 28 : 40} />
              </div>
              
              <h3 className="text-3xl md:text-5xl mb-4 md:mb-6 text-gray-900 dark:text-white font-bold">
                Ready to Transform Your Look?
              </h3>
              
              <p className="text-gray-700 dark:text-gray-300 mb-8 md:mb-12 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Our experienced team is excited to help you discover the perfect service for your unique style. Get personalized recommendations and expert care.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
                <a
                  href="tel:6192245050"
                  className="inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:via-pink-600 hover:to-purple-700 text-white rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl text-base md:text-lg font-bold"
                >
                  <Phone size={20} />
                  <span>(619) 224-5050</span>
                </a>
                <button
                  onClick={() => handleBookService('Consultation')}
                  aria-label="Book an appointment with our team"
                  className="inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 hover:border-rose-500 dark:hover:border-rose-500 text-gray-900 dark:text-white rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl text-base md:text-lg font-bold"
                >
                  <Calendar size={20} />
                  <span>Book Appointment</span>
                </button>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm mt-6 md:mt-8">
                📍 4869 Santa Monica Ave, San Diego | Open Daily 9 AM - 7 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)}
        preSelectedService={selectedService}
      />
    </>
  );
}

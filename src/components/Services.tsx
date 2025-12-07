import { Sparkles, Palette, Droplet, Clock, Scissors, Brush, Hand, Gem } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ServiceDetailModal } from './ServiceDetailModal';

const services = [
  {
    icon: Scissors,
    title: 'Classic Manicure',
    description: 'Traditional nail care with shaping, cuticle care, and polish application.',
    price: '$35',
    duration: '45 min',
    gradient: 'from-rose-500 to-pink-500',
    details: [
      'Nail shaping and filing',
      'Cuticle care and treatment',
      'Hand massage with moisturizer',
      'Polish application (base, color, top coat)',
      'Quick-dry treatment',
    ],
    benefits: [
      'Healthier nails',
      'Improved appearance',
      'Relaxing experience',
      'Long-lasting results',
    ],
  },
  {
    icon: Brush,
    title: 'Gel Manicure',
    description: 'Long-lasting gel polish with UV/LED curing for up to 3 weeks of shine.',
    price: '$55',
    duration: '60 min',
    gradient: 'from-purple-500 to-rose-500',
    details: [
      'Nail preparation and shaping',
      'Cuticle care and grooming',
      'Base coat application',
      'Premium gel polish application',
      'UV/LED curing for durability',
      'Top coat for extra shine',
    ],
    benefits: [
      'Lasts up to 3 weeks',
      'Chip-resistant',
      'High-gloss finish',
      'No drying time',
    ],
  },
  {
    icon: Droplet,
    title: 'Spa Pedicure',
    description: 'Luxurious foot treatment with exfoliation, massage, and polish.',
    price: '$65',
    duration: '75 min',
    gradient: 'from-blue-500 to-purple-500',
    details: [
      'Warm foot soak with aromatherapy',
      'Nail trimming and shaping',
      'Cuticle care and removal',
      'Exfoliating scrub treatment',
      'Callus removal',
      'Relaxing foot and calf massage',
      'Moisturizing mask',
      'Polish application',
    ],
    benefits: [
      'Ultimate relaxation',
      'Softer, smoother feet',
      'Improved circulation',
      'Stress relief',
    ],
  },
  {
    icon: Gem,
    title: 'Nail Art Design',
    description: 'Custom nail art and creative designs to express your unique style.',
    price: '$75+',
    duration: '90 min',
    gradient: 'from-pink-500 to-rose-500',
    details: [
      'Consultation and design planning',
      'Full manicure service',
      'Custom hand-painted nail art',
      'Embellishments and decorations',
      'Gel or regular polish options',
      'Top coat for protection',
    ],
    benefits: [
      'Unique designs',
      'Personal expression',
      'Instagram-worthy nails',
      'Professional artistry',
    ],
  },
];

function ServiceCard({ service, index, onClick }: { service: typeof services[0]; index: number; onClick: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [scale, setScale] = useState(0.8);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setScale(1);
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
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white dark:bg-gray-800 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 hover:border-rose-500 dark:hover:border-rose-500 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `scale(${scale}) translateY(${isVisible ? 0 : 40}px) rotateX(${isHovered ? '5deg' : '0deg'}) rotateY(${isHovered ? '2deg' : '0deg'})`,
        transitionDelay: `${index * 150}ms`,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500`}></div>
      
      {/* Animated background circles */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-rose-200 dark:bg-rose-900/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-150"></div>
      
      {/* Number badge */}
      <div className="absolute top-4 right-4 w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm group-hover:bg-rose-500 group-hover:text-white transition-all duration-300">
        {index + 1}
      </div>
      
      {/* Icon with perfect centering */}
      <div className={`relative w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg mx-auto`}>
        <service.icon className="text-white" size={32} strokeWidth={2} />
      </div>
      
      <h3 className="text-2xl mb-3 text-gray-900 dark:text-white text-center transition-all duration-500 group-hover:scale-105">
        {service.title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6 text-center leading-relaxed transition-colors duration-500">
        {service.description}
      </p>
      
      <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700 transition-colors duration-500">
        <span className={`text-xl bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent font-semibold`}>
          {service.price}
        </span>
        <span className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2 transition-colors duration-500">
          <Clock size={16} />
          {service.duration}
        </span>
      </div>

      {/* Learn More hint with animation */}
      <div className="mt-4 text-center text-sm text-rose-600 dark:text-rose-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
        Discover your story →
      </div>
      
      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
      </div>
    </div>
  );
}

export function Services() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleServiceClick = (service: typeof services[0]) => {
    setSelectedService(service);
    setIsModalOpen(true);
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard 
                key={index} 
                service={service} 
                index={index}
                onClick={() => handleServiceClick(service)}
              />
            ))}
          </div>

          {/* Flow CTA */}
          <div className="mt-20 text-center animate-in fade-in slide-in-from-bottom-5 duration-700 delay-500">
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
              Still choosing your path? Let us guide you.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 hover:border-rose-500 dark:hover:border-rose-500 rounded-full text-gray-900 dark:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              <span>Get a Free Consultation</span>
              <span className="text-rose-500 group-hover:translate-x-2 transition-transform duration-300">→</span>
            </a>
          </div>
        </div>
      </section>

      <ServiceDetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      />
    </>
  );
}
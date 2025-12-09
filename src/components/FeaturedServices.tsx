import { Scissors, Droplets, Sparkles, Leaf, Wand2, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

interface Service {
  icon: React.ComponentType<{ size: number; className: string }>;
  title: string;
  description: string;
  price: string;
  gradient: string;
  delay: number;
  serviceId: string;
}

export function FeaturedServices() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const services: Service[] = [
    {
      icon: Scissors,
      title: 'Manicure',
      description: 'Expert nail care with premium polishes. Choose from classic, gel, or artistic designs.',
      price: 'From $20',
      gradient: 'from-rose-500 to-pink-500',
      delay: 0,
      serviceId: 'manicure',
    },
    {
      icon: Droplets,
      title: 'Pedicure',
      description: 'Relaxing foot spa treatments with exfoliation, massage, and premium care.',
      price: 'From $25',
      gradient: 'from-blue-500 to-cyan-500',
      delay: 100,
      serviceId: 'pedicure',
    },
    {
      icon: Sparkles,
      title: 'Gel Nails',
      description: 'Long-lasting gel polish with stunning finishes. Perfect for any occasion.',
      price: 'From $35',
      gradient: 'from-purple-500 to-pink-500',
      delay: 200,
      serviceId: 'gel',
    },
    {
      icon: Heart,
      title: 'Nail Art',
      description: 'Custom artistic designs and decorative nail art created by our skilled artists.',
      price: 'From $30',
      gradient: 'from-red-500 to-orange-500',
      delay: 300,
      serviceId: 'art',
    },
    {
      icon: Leaf,
      title: 'Skincare',
      description: 'Rejuvenating facials and skincare treatments for glowing, healthy skin.',
      price: 'From $40',
      gradient: 'from-green-500 to-emerald-500',
      delay: 400,
      serviceId: 'skincare',
    },
    {
      icon: Wand2,
      title: 'Hair Services',
      description: 'Professional hair styling, coloring, and treatments for all hair types.',
      price: 'From $25',
      gradient: 'from-amber-500 to-orange-500',
      delay: 500,
      serviceId: 'hair',
    },
  ];

  const handleLearnMore = (serviceId: string) => {
    navigate('/services', { state: { scrollToService: serviceId } });
  };

  return (
    <section id="services" className="py-32 px-6 bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-gray-950 dark:to-black transition-colors duration-500 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-rose-300/10 dark:bg-rose-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-blue-300/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <span className="inline-block px-6 py-2 bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 backdrop-blur-sm border border-rose-300/50 dark:border-rose-700/50 rounded-full text-rose-600 dark:text-rose-400 text-sm mb-6 transition-colors duration-500">
            ✨ Our Services
          </span>

          <h2 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-gray-900 via-rose-600 to-gray-900 dark:from-white dark:via-rose-400 dark:to-white bg-clip-text text-transparent">
            Premium Beauty Services
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed transition-colors duration-500">
            From expert nail care to luxurious skincare and professional hair services, we offer everything you need to look and feel your absolute best.
          </p>
        </div>

         <div className="mt-25 pt-20 border-t border-gray-200 dark:border-gray-800">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-2">
                10+
              </div>
              <p className="text-gray-600 dark:text-gray-400">Years of Experience</p>
            </div>
            <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 delay-400">
              <div className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-2">
                5000+
              </div>
              <p className="text-gray-600 dark:text-gray-400">Happy Customers</p>
            </div>
            <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 delay-500">
              <div className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-2">
                100%
              </div>
              <p className="text-gray-600 dark:text-gray-400">Satisfaction Guaranteed</p>
            </div>
          </div>
        </div>
        
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:border-rose-400 dark:hover:border-rose-600 transition-all duration-500 hover:shadow-2xl dark:hover:shadow-rose-500/10 overflow-hidden will-change-transform"
                style={{
                  animationDelay: `${service.delay}ms`,
                }}
              >
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                ></div>

                {/* Icon container */}
                <div className="relative mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} p-0.5 group-hover:scale-110 transition-transform duration-500`}>
                    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-[10px] flex items-center justify-center">
                      <IconComponent size={32} className={`bg-gradient-to-br ${service.gradient} bg-clip-text text-transparent`} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-rose-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-500">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed transition-colors duration-500">
                    {service.description}
                  </p>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <span className={`text-lg font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                      {service.price}
                    </span>
                    <button 
                      onClick={() => handleLearnMore(service.serviceId)}
                      className="px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                      Learn More
                    </button>
                  </div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}

        {/* Trust badges */}
       
      </div>
    </section>
  );
}

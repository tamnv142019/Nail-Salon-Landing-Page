import { Scissors, Droplets, Sparkles, Leaf, Wand2, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Service {
  icon: React.ComponentType<{ size?: string | number; className?: string }>;
  title: string;
  description: string;
  price: string;
  gradient: string;
  delay: number;
  serviceId: string;
}

export function FeaturedServices() {
  const navigate = useNavigate();

  const services: Service[] = [
    {
      icon: Scissors,
      title: 'Manicure',
      description: 'Expert nail care with premium polishes. Choose from classic, gel, or artistic designs.',
      price: 'From $20',
      gradient: 'from-brand-gold-soft to-brand-gold',
      delay: 0,
      serviceId: 'manicure',
    },
    {
      icon: Droplets,
      title: 'Pedicure',
      description: 'Relaxing foot spa treatments with exfoliation, massage, and premium care.',
      price: 'From $25',
      gradient: 'from-brand-sapphire to-brand-gold-soft',
      delay: 100,
      serviceId: 'pedicure',
    },
    {
      icon: Sparkles,
      title: 'Gel Nails',
      description: 'Long-lasting gel polish with stunning finishes. Perfect for any occasion.',
      price: 'From $35',
      gradient: 'from-brand-gold-muted to-brand-gold',
      delay: 200,
      serviceId: 'gel',
    },
    {
      icon: Heart,
      title: 'Nail Art',
      description: 'Custom artistic designs and decorative nail art created by our skilled artists.',
      price: 'From $30',
      gradient: 'from-brand-ruby to-brand-gold-soft',
      delay: 300,
      serviceId: 'art',
    },
    {
      icon: Leaf,
      title: 'Skincare',
      description: 'Rejuvenating facials and skincare treatments for glowing, healthy skin.',
      price: 'From $40',
      gradient: 'from-brand-emerald to-brand-gold-soft',
      delay: 400,
      serviceId: 'skincare',
    },
    {
      icon: Wand2,
      title: 'Hair Services',
      description: 'Professional hair styling, coloring, and treatments for all hair types.',
      price: 'From $25',
      gradient: 'from-brand-gold-muted to-brand-gold',
      delay: 500,
      serviceId: 'hair',
    },
  ];

  const handleLearnMore = (serviceId: string) => {
    navigate('/services', { state: { scrollToService: serviceId } });
  };

  return (
    <section id="services" className="py-32 px-6 bg-background transition-colors duration-500 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-btn-accent/15 dark:bg-brand-gold/6 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-brand-sapphire/10 dark:bg-brand-sapphire/6 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <span className="inline-block px-6 py-2 bg-btn-accent/25 dark:bg-brand-gold/15 backdrop-blur-sm border border-border rounded-full text-btn-theme-foreground text-sm mb-6 transition-colors duration-500">
            ✨ Our Services
          </span>

          <h2 className="text-5xl md:text-7xl mb-6 bg-linear-to-r from-foreground via-brand-gold-muted to-foreground bg-clip-text text-transparent">
            Premium Beauty Services
          </h2>

          <p className="text-xl text-foreground max-w-2xl mx-auto leading-relaxed transition-colors duration-500">
            From expert nail care to luxurious skincare and professional hair services, we offer everything you need to look and feel your absolute best.
          </p>
        </div>

         <div className="mt-25 pt-20 border-t border-border">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
              <div className="text-4xl font-bold bg-linear-to-r from-brand-gold-soft to-brand-gold bg-clip-text text-transparent mb-2">
                10+
              </div>
              <p className="text-foreground">Years of Experience</p>
            </div>
            <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 delay-400">
              <div className="text-4xl font-bold bg-linear-to-r from-brand-gold-soft to-brand-gold bg-clip-text text-transparent mb-2">
                5000+
              </div>
              <p className="text-foreground">Happy Customers</p>
            </div>
            <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 delay-500">
              <div className="text-4xl font-bold bg-linear-to-r from-brand-gold-soft to-brand-gold bg-clip-text text-transparent mb-2">
                100%
              </div>
              <p className="text-foreground">Satisfaction Guaranteed</p>
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
                className="group relative bg-card rounded-2xl p-8 border border-border hover:border-brand-gold-muted transition-all duration-500 hover:shadow-2xl overflow-hidden will-change-transform"
                style={{
                  animationDelay: `${service.delay}ms`,
                }}
              >
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                ></div>

                {/* Icon container */}
                <div className="relative mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-linear-to-br ${service.gradient} p-0.5 group-hover:scale-110 transition-transform duration-500`}>
                    <div className="w-full h-full bg-card rounded-[10px] flex items-center justify-center">
                      <IconComponent size={32} className={`bg-linear-to-br ${service.gradient} bg-clip-text text-transparent`} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-brand-gold-muted group-hover:to-brand-gold group-hover:bg-clip-text transition-all duration-500">
                    {service.title}
                  </h3>

                  <p className="text-foreground mb-6 leading-relaxed transition-colors duration-500">
                    {service.description}
                  </p>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <span className={`text-lg font-bold bg-linear-to-r ${service.gradient} bg-clip-text text-transparent`}>
                      {service.price}
                    </span>
                    <button 
                      onClick={() => handleLearnMore(service.serviceId)}
                      className="px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer bg-btn-accent hover:bg-btn-accent-hover active:bg-btn-accent-active text-btn-theme-foreground">
                      Learn More
                    </button>
                  </div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-brand-gold-soft/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 pointer-events-none"></div>
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

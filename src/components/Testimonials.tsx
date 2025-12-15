import { Star, Quote, Heart, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    text: 'Absolutely love this salon! The attention to detail is incredible and my nails have never looked better. The gel manicure lasted over 3 weeks!',
    rating: 5,
    role: 'Fashion Designer',
  },
  {
    name: 'Emma Davis',
    text: 'The staff is so talented and professional. I always leave feeling pampered and beautiful. Best nail salon in town!',
    rating: 5,
    role: 'Entrepreneur',
  },
  {
    name: 'Jessica Martinez',
    text: 'Clean, elegant atmosphere and amazing nail artists. They really listen to what you want and deliver perfection every time.',
    rating: 5,
    role: 'Marketing Director',
  },
];

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-card backdrop-blur-xl border-2 border-border hover:border-brand-gold-muted dark:hover:border-brand-gold p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `scale(${isVisible ? 1 : 0.9}) translateY(${isVisible ? 0 : 40}px) ${isHovered ? 'translateY(-8px)' : 'translateY(0)'}`,
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDelay: `${index * 150}ms`,
      }}
    >
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-brand-gold-muted via-brand-gold-soft to-brand-gold"></div>
      
      {/* Animated background */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-btn-accent/30 dark:bg-brand-gold/15 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-150"></div>
      
      {/* Quote icon with centered alignment */}
      <div className="w-16 h-16 bg-btn-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg mx-auto">
        <Heart className="text-white fill-white" size={28} strokeWidth={2} />
      </div>
      
      <div className="flex gap-2 mb-6 justify-center">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star 
            key={i} 
            className="fill-brand-gold text-brand-gold dark:fill-brand-gold-soft dark:text-brand-gold-soft transition-all duration-300 animate-in zoom-in" 
            size={18}
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
      
      <p className="text-foreground-secondary dark:text-foreground-secondary mb-6 text-center leading-relaxed italic transition-colors duration-500">
        {testimonial.text}
      </p>
      
      <div className="pt-6 border-t border-border text-center transition-colors duration-500">
        <p className="text-foreground mb-1 transition-colors duration-500">{testimonial.name}</p>
        <p className="text-brand-gold-muted dark:text-brand-gold-soft text-sm transition-colors duration-500">{testimonial.role}</p>
      </div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-32 px-6 bg-secondary dark:bg-secondary relative overflow-hidden transition-colors duration-500">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-linear-to-r from-brand-gold-soft/20 via-brand-sapphire/10 to-brand-emerald/10 dark:from-brand-gold/12 dark:via-brand-sapphire/8 dark:to-brand-emerald/8 rounded-full blur-3xl transition-colors duration-500"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <span className="inline-block px-6 py-2 bg-btn-accent/25 dark:bg-brand-gold/15 backdrop-blur-sm border border-brand-gold-muted/40 dark:border-brand-gold/40 rounded-full text-brand-gold-muted dark:text-brand-gold-soft text-sm mb-6 transition-colors duration-500">
            ⭐ Testimonials
          </span>
          
          <h2 className="text-5xl md:text-7xl mb-6 bg-linear-to-r from-foreground via-brand-gold-muted to-brand-gold dark:from-foreground dark:via-brand-gold-soft dark:to-brand-gold bg-clip-text text-transparent">
            Client Love Stories
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed transition-colors duration-500">
            Don{"'"}t just take our word for it - hear from our satisfied clients.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Flow CTA */}
        <div className="mt-16 text-center animate-in fade-in slide-in-from-bottom-5 duration-700 delay-500">
          <div className="inline-flex items-center gap-8 px-8 py-6 bg-card rounded-2xl border-2 border-border shadow-lg">
            <div className="flex -space-x-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full bg-linear-to-br from-brand-gold-soft to-brand-gold border-4 border-card flex items-center justify-center text-brand-dark"
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-2xl text-foreground mb-1">500+ Happy Clients</p>
              <p className="text-muted-foreground text-sm">Join them today!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
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
      className="group relative bg-white dark:bg-gray-800 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 hover:border-rose-500 dark:hover:border-rose-500 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `scale(${isVisible ? 1 : 0.9}) translateY(${isVisible ? 0 : 40}px) ${isHovered ? 'translateY(-8px)' : 'translateY(0)'}`,
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDelay: `${index * 150}ms`,
      }}
    >
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500"></div>
      
      {/* Animated background */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-rose-200 dark:bg-rose-900/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-150"></div>
      
      {/* Quote icon with centered alignment */}
      <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg mx-auto">
        <Heart className="text-white fill-white" size={28} strokeWidth={2} />
      </div>
      
      <div className="flex gap-2 mb-6 justify-center">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star 
            key={i} 
            className="fill-rose-500 text-rose-500 dark:fill-rose-400 dark:text-rose-400 transition-all duration-300 animate-in zoom-in" 
            size={18}
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 mb-6 text-center leading-relaxed italic transition-colors duration-500">
        {testimonial.text}
      </p>
      
      <div className="pt-6 border-t border-gray-200 dark:border-gray-700 text-center transition-colors duration-500">
        <p className="text-gray-900 dark:text-white mb-1 transition-colors duration-500">{testimonial.name}</p>
        <p className="text-rose-600 dark:text-rose-400 text-sm transition-colors duration-500">{testimonial.role}</p>
      </div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-32 px-6 bg-gray-50 dark:bg-gray-950 relative overflow-hidden transition-colors duration-500">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-rose-300/20 via-purple-300/20 to-blue-300/20 dark:from-rose-500/10 dark:via-purple-500/10 dark:to-blue-500/10 rounded-full blur-3xl transition-colors duration-500"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <span className="inline-block px-6 py-2 bg-rose-100 dark:bg-rose-900/30 backdrop-blur-sm border border-rose-300 dark:border-rose-700 rounded-full text-rose-600 dark:text-rose-400 text-sm mb-6 transition-colors duration-500">
            ⭐ Testimonials
          </span>
          
          <h2 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-gray-900 via-rose-600 to-purple-600 dark:from-white dark:via-rose-300 dark:to-purple-400 bg-clip-text text-transparent">
            Client Love Stories
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed transition-colors duration-500">
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
          <div className="inline-flex items-center gap-8 px-8 py-6 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="flex -space-x-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-purple-500 border-4 border-white dark:border-gray-800 flex items-center justify-center text-white"
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-2xl text-gray-900 dark:text-white mb-1">500+ Happy Clients</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Join them today!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import { useState } from 'react';
import { motion } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    rating: 5,
    text: 'Absolutely love this place! The staff is so friendly and professional. My nails always look amazing and last for weeks. Best nail salon in San Diego!',
    service: 'Gel Manicure',
  },
  {
    name: 'Maria Garcia',
    rating: 5,
    text: 'Queen\'s Nails is my go-to spot! The atmosphere is relaxing, the service is top-notch, and the results are always perfect. I wouldn\'t trust anyone else with my nails.',
    service: 'Acrylic Set',
  },
  {
    name: 'Emily Chen',
    rating: 5,
    text: 'I\'ve been coming here for years and they never disappoint. The lash extensions are flawless and the nail art is incredible. Highly recommend!',
    service: 'Lash Extensions',
  },
  {
    name: 'Jessica Williams',
    rating: 5,
    text: 'Amazing experience every single time! The pedicure is so relaxing and my feet feel brand new. The staff really knows what they\'re doing.',
    service: 'Deluxe Pedicure',
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-gradient-to-br from-rose-500 via-purple-600 to-pink-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </motion.div>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                <Quote className="text-white" size={24} />
              </div>
            </div>

            {/* Testimonial Content */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={24} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed italic">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Author */}
              <div>
                <div className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {testimonials[currentIndex].service}
                </div>
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 bg-gradient-to-br from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <ChevronLeft className="text-white" size={24} />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'w-8 bg-gradient-to-r from-rose-500 to-purple-600'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-12 h-12 bg-gradient-to-br from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <ChevronRight className="text-white" size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Google Reviews Badge */}
        <div className="text-center mt-12">
          {/* Removed Google rating badge as requested */}
        </div>
      </div>
    </section>
  );
}
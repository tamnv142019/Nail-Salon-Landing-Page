import { MapPin, Phone, Mail, Sparkles, Send, Scissors, Brush } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { BookingModal } from './BookingModal';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Location',
    content: '123 Beauty Boulevard\nSuite 100\nLos Angeles, CA 90001',
    gradient: 'from-rose-500 to-pink-500',
  },
  {
    icon: Phone,
    title: 'Phone',
    content: '(555) 123-4567',
    gradient: 'from-purple-500 to-blue-500',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'hello@luxenails.com',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Sparkles,
    title: 'Hours',
    content: 'Monday - Friday: 9:00 AM - 7:00 PM\nSaturday: 10:00 AM - 6:00 PM\nSunday: 11:00 AM - 5:00 PM',
    gradient: 'from-rose-500 to-orange-500',
  },
];

export function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section id="contact" className="py-32 px-6 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-500" ref={sectionRef}>
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-rose-300/20 dark:bg-rose-500/10 rounded-full blur-3xl animate-pulse transition-colors duration-500"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse transition-colors duration-500" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <span className="inline-block px-6 py-2 bg-blue-100 dark:bg-blue-900/30 backdrop-blur-sm border border-blue-300 dark:border-blue-700 rounded-full text-blue-600 dark:text-blue-400 text-sm mb-6 transition-colors duration-500">
              📍 Get In Touch
            </span>
            
            <h2 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-300 dark:to-purple-400 bg-clip-text text-transparent">
              Visit Our Salon
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed transition-colors duration-500">
              Book your appointment today and experience the luxury you deserve.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div
              className="space-y-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: `translateX(${isVisible ? 0 : -40}px)`,
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {contactInfo.map((info, index) => (
                <div 
                  key={index}
                  className="group bg-white dark:bg-gray-800 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 hover:border-rose-500 dark:hover:border-rose-500 p-6 rounded-3xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="flex gap-4 items-start">
                    <div className={`w-14 h-14 bg-gradient-to-br ${info.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <info.icon className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl mb-2 text-gray-900 dark:text-white transition-colors duration-500">{info.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-500 whitespace-pre-line">
                        {info.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Booking Card */}
            <div
              className="bg-white dark:bg-gray-800 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 p-10 rounded-3xl shadow-xl transition-colors duration-500 hover:border-rose-500 dark:hover:border-rose-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: `translateX(${isVisible ? 0 : 40}px)`,
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: '200ms',
              }}
            >
              <h3 className="text-3xl mb-4 text-gray-900 dark:text-white bg-gradient-to-r from-gray-900 to-rose-600 dark:from-white dark:to-rose-300 bg-clip-text text-transparent transition-all duration-500">
                Ready to Book?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed transition-colors duration-500">
                Schedule your appointment in just a few clicks. Choose your preferred service, date, and time.
              </p>
              
              <div className="space-y-4 mb-8">
                {['Instant confirmation', 'Email reminders', 'Easy rescheduling'].map((benefit, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300 animate-in slide-in-from-left-5 duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-8 h-8 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center">
                      <span className="text-rose-600 dark:text-rose-400">✓</span>
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setIsBookingOpen(true)}
                className="group w-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white py-5 rounded-2xl transition-all duration-300 shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 hover:scale-105 flex items-center justify-center gap-3 relative overflow-hidden"
              >
                <Send size={20} className="group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                <span className="relative z-10">Book Your Appointment</span>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
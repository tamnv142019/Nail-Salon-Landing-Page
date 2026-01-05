'use client';

import { MapPin, Phone, Mail, Clock, Send, CheckCircle, X, ExternalLink, Navigation, MessageCircle, Sparkles, Calendar } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BookingModal } from './BookingModal';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { isBusinessOpenNow } from '../utils/business-hours';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    content: '4869 Santa Monica Ave, San Diego, CA 92107',
    subContent: '',
    gradient: 'from-rose-500 to-pink-500',
    link: 'https://maps.app.goo.gl/Bc8jystzMK7y5Ct49',
    action: 'Get Directions',
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: '(619) 224-5050',
    subContent: 'Available during business hours',
    gradient: 'from-emerald-500 to-teal-500',
    link: 'tel:6192245050',
    action: 'Call Now',
  },
  {
    icon: Mail,
    title: 'Email Us',
    content: 'helenpham505@gmail.com',
    subContent: 'We respond within 24 hours',
    gradient: 'from-blue-500 to-cyan-500',
    link: 'mailto:helenpham505@gmail.com',
    action: 'Send Email',
  },
];

const businessHours = [
  { day: 'Monday - Friday', hours: '9:00 AM - 7:00 PM', isToday: false },
  { day: 'Saturday', hours: '9:00 AM - 6:00 PM', isToday: false },
  { day: 'Sunday', hours: '10:00 AM - 5:00 PM', isToday: false },
];

export function Contact() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
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

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone is required';
    } else if (!/^[\d\s\-\(\)]+$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || 'Failed to send message');
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Contact submission error', error);
      alert('Could not send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors({ ...formErrors, [field]: '' });
    }
  };

  // Keep consistent with the Home contact section: use San Diego timezone.
  const isOpen = useMemo(() => isBusinessOpenNow(), []);

  return (
    <>
      <section id="contact" className="py-16 md:py-20 px-4 md:px-6 bg-gradient-to-br from-secondary via-background to-secondary dark:from-background dark:via-secondary/20 dark:to-background relative overflow-hidden transition-colors duration-500" ref={sectionRef}>
        {/* Animated Background Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-rose-500/10 via-pink-500/10 to-transparent rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Header Section */}
          <motion.div 
            className="text-center mb-8 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl mb-4 font-bold text-black dark:text-white">
              Get in Touch
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience exceptional nail care in Ocean Beach. We're here to make your beauty dreams come true.
            </p>
            <p className="mt-4 text-sm md:text-base text-foreground/80">
              <span className="font-semibold">Queen’s Nails Hair and Skincare</span>
              <span className="mx-2">•</span>
              <span>4869 Santa Monica Ave, San Diego, CA 92107</span>
              <span className="mx-2">•</span>
              <span>(619) 224-5050</span>
            </p>
          </motion.div>

          {/* Quick Contact Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 md:mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="group relative bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-border/50 hover:shadow-2xl hover:border-border transition-all duration-500 z-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500 pointer-events-none`}></div>
                
                <div className={`relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${info.gradient} rounded-2xl mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500 pointer-events-none`}>
                  <info.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{info.title}</h3>
                <p className="text-foreground/90 mb-1 font-semibold text-lg">{info.content}</p>
                {info.subContent ? (
                  <p className="text-sm text-foreground/60 mb-6">{info.subContent}</p>
                ) : (
                  <div className="mb-6" />
                )}
                <a
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`relative inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r ${info.gradient} text-white rounded-xl hover:shadow-lg transition-all duration-300 text-sm font-semibold group-hover:gap-3 cursor-pointer z-20`}
                >
                  <span>{info.action}</span>
                  <ExternalLink size={16} />
                </a>
              </motion.div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
            {/* Left Column - Form (3 cols) */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl border border-border/50">
                <div className="flex items-center gap-4 mb-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
                    <MessageCircle className="text-white" size={26} />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground">Send a Message</h3>
                    <p className="text-sm text-foreground/60">We'll respond within 24 hours</p>
                  </div>
                </div>

                {isSubmitted ? (
                  <motion.div 
                    className="text-center py-16"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full mb-6 shadow-xl">
                      <CheckCircle className="text-white" size={48} />
                    </div>
                    <h4 className="text-3xl font-bold text-foreground mb-3">Message Sent!</h4>
                    <p className="text-lg text-foreground/80">
                      Thank you for reaching out. We'll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full px-5 py-4 rounded-2xl bg-background/60 backdrop-blur-sm border-2 ${
                          formErrors.name ? 'border-rose-500' : 'border-border/40'
                        } focus:outline-none focus:border-rose-500 text-foreground placeholder-foreground/40 transition-all duration-300`}
                        placeholder="Enter your full name"
                      />
                      {formErrors.name && (
                        <p className="mt-2 text-sm text-rose-500 flex items-center gap-1">
                          <X size={14} /> {formErrors.name}
                        </p>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full px-5 py-4 rounded-2xl bg-background/60 backdrop-blur-sm border-2 ${
                            formErrors.email ? 'border-rose-500' : 'border-border/40'
                          } focus:outline-none focus:border-blue-500 text-foreground placeholder-foreground/40 transition-all duration-300`}
                          placeholder="your@email.com"
                        />
                        {formErrors.email && (
                          <p className="mt-2 text-sm text-rose-500 flex items-center gap-1">
                            <X size={14} /> {formErrors.email}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Phone Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={`w-full px-5 py-4 rounded-2xl bg-background/60 backdrop-blur-sm border-2 ${
                            formErrors.phone ? 'border-rose-500' : 'border-border/40'
                          } focus:outline-none focus:border-emerald-500 text-foreground placeholder-foreground/40 transition-all duration-300`}
                          placeholder="(619) 224-5050"
                        />
                        {formErrors.phone && (
                          <p className="mt-2 text-sm text-rose-500 flex items-center gap-1">
                            <X size={14} /> {formErrors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Your Message <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        rows={6}
                        className={`w-full px-5 py-4 rounded-2xl bg-background/60 backdrop-blur-sm border-2 ${
                          formErrors.message ? 'border-rose-500' : 'border-border/40'
                        } focus:outline-none focus:border-purple-500 text-foreground placeholder-foreground/40 transition-all duration-300 resize-none`}
                        placeholder="Tell us about your nail care needs, preferred services, or any special requests..."
                      ></textarea>
                      {formErrors.message && (
                        <p className="mt-2 text-sm text-rose-500 flex items-center gap-1">
                          <X size={14} /> {formErrors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-5 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send size={22} />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Right Column - Hours and Map (2 cols) */}
            <motion.div
              className="lg:col-span-2 space-y-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Business Hours Card */}
              <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-border/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl shadow-lg">
                    <Clock className="text-white" size={26} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Business Hours</h3>
                    <div className={`inline-flex items-center gap-2 mt-1 px-3 py-1 rounded-full text-sm font-semibold ${
                      isOpen 
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' 
                        : 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></div>
                      <span>
                        {isOpen
                          ? t('contactSection.openNow', 'Open Now')
                          : t('contactSection.closedNow', 'Closed Now')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {businessHours.map((schedule, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                      <span className="text-foreground/80 font-medium">{schedule.day}</span>
                      <span className="text-foreground font-semibold">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-bold transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Calendar size={20} />
                  <span>Book Appointment</span>
                </button>
              </div>

              {/* Map Card */}
              <div className="bg-card/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-border/50">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl shadow-lg">
                      <Navigation className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Find Us</h3>
                      <p className="text-sm text-foreground/60">Ocean Beach, San Diego</p>
                    </div>
                  </div>
                </div>
                <div className="relative h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3356.7789!2d-117.2508972!3d32.7461198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80deaa3766bc71cd%3A0x58947b412e099a07!2sQueen's%20Nails%20Hair%20and%20Skincare!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full"
                  ></iframe>
                </div>
                <div className="p-6">
                  <a
                    href="https://maps.app.goo.gl/Bc8jystzMK7y5Ct49"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <Navigation size={20} />
                    <span>Open in Google Maps</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(20px) translateX(-20px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </>
  );
}
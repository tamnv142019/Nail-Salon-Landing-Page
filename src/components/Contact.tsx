import { MapPin, Phone, Mail, Clock, Send, CheckCircle, X, ExternalLink, Navigation, MessageCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { BookingModal } from './BookingModal';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    content: '4869 Santa Monica Ave',
    subContent: 'San Diego, CA 92107',
    gradient: 'from-brand-gold-soft to-brand-gold',
    link: 'https://www.google.com/maps/place/Queen\'s+Nails+Hair+and+Skincare/@32.7461198,-117.2508972,17z/data=!4m15!1m8!3m7!1s0x80deaa3766574c6f:0xf7a6636c79fc1c5d!2s4869+Santa+Monica+Ave,+San+Diego,+CA+92107,+USA!3b1!8m2!3d32.7461198!4d-117.2483223!16s%2Fg%2F11bw3xx9cy!3m5!1s0x80deaa3766bc71cd:0x58947b412e099a07!8m2!3d32.7462568!4d-117.2482123!16s%2Fg%2F1tjytxy4?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D',
    action: 'Get Directions',
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: '(619) 224-5050',
    subContent: 'Available during business hours',
    gradient: 'from-brand-sapphire to-brand-gold-soft',
    link: 'tel:6192245050',
    action: 'Call Now',
  },
  {
    icon: Mail,
    title: 'Email Us',
    content: 'helenpham505@gmail.com',
    subContent: 'We respond within 24 hours',
    gradient: 'from-brand-emerald to-brand-gold-soft',
    link: 'mailto:helenpham505@gmail.com',
    action: 'Send Email',
  },
];

const businessHours = [
  { day: 'Monday - Friday', hours: '9:00 AM - 7:00 PM', isToday: false },
  { day: 'Saturday', hours: '9:00 AM - 6:00 PM', isToday: false },
  { day: 'Sunday', hours: '10:00 AM - 5:00 PM', isToday: false },
];

// Check if salon is currently open
function isCurrentlyOpen(): boolean {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 6 = Saturday
  const hour = now.getHours();
  const minute = now.getMinutes();
  const timeInMinutes = hour * 60 + minute;

  if (day >= 1 && day <= 5) { // Monday - Friday
    return timeInMinutes >= 9 * 60 && timeInMinutes < 19 * 60;
  } else if (day === 6) { // Saturday
    return timeInMinutes >= 9 * 60 && timeInMinutes < 18 * 60;
  } else if (day === 0) { // Sunday
    return timeInMinutes >= 10 * 60 && timeInMinutes < 17 * 60;
  }
  return false;
}

export function Contact() {
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
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors({ ...formErrors, [field]: '' });
    }
  };

  const isOpen = isCurrentlyOpen();

  return (
    <>
      <section id="contact" className="py-24 px-6 bg-secondary dark:bg-background relative overflow-hidden transition-colors duration-500" ref={sectionRef}>
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-btn-accent/15 dark:bg-brand-gold/6 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-brand-sapphire/10 dark:bg-brand-sapphire/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl mb-6 bg-linear-to-r from-foreground via-brand-gold-muted to-foreground bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We'd love to hear from you. Visit us, call us, or send us a message.
            </p>
          </div>

          {/* Quick Contact Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-all duration-300 hover:scale-105"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: `translateY(${isVisible ? 0 : 40}px)`,
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-linear-to-br ${info.gradient} rounded-2xl mb-4 shadow-lg`}>
                  <info.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl text-foreground mb-2">{info.title}</h3>
                <p className="text-foreground mb-1 font-medium">{info.content}</p>
                <p className="text-sm text-muted-foreground mb-4">{info.subContent}</p>
                <a
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r ${info.gradient} text-white rounded-lg hover:scale-105 transition-all duration-300 shadow-md text-sm font-medium`}
                >
                  <span>{info.action}</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            ))}
          </div>

          {/* Business Hours Card */}
          <div className="bg-card rounded-3xl p-8 shadow-xl border border-border mb-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-linear-to-br from-brand-gold-soft to-brand-gold rounded-xl shadow-lg">
                    <Clock className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl text-foreground">Business Hours</h3>
                </div>
                <div className="space-y-2">
                  {businessHours.map((schedule, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-8">
                      <span className="text-muted-foreground">{schedule.day}</span>
                      <span className="text-foreground font-medium">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center md:text-right">
                <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${
                  isOpen 
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' 
                    : 'bg-secondary text-muted-foreground border border-border'
                } mb-4`}>
                  <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-muted-foreground'}`}></div>
                  <span className="font-semibold">{isOpen ? 'Open Now' : 'Closed Now'}</span>
                </div>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg font-semibold bg-btn-accent hover:bg-btn-accent-hover active:bg-btn-accent-active text-btn-theme-foreground"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div
              className="bg-card rounded-3xl p-8 shadow-xl border border-border"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: `translateX(${isVisible ? 0 : -40}px)`,
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-linear-to-br from-brand-gold-soft to-brand-gold rounded-xl shadow-lg">
                  <MessageCircle className="text-white" size={24} />
                </div>
                <h3 className="text-2xl text-foreground">Send us a Message</h3>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12 animate-in fade-in zoom-in-95 duration-500">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-6">
                    <CheckCircle className="text-emerald-600 dark:text-emerald-400" size={40} />
                  </div>
                  <h4 className="text-2xl text-foreground mb-2">Message Sent!</h4>
                  <p className="text-muted-foreground">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-muted-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl bg-background border ${
                        formErrors.name ? 'border-red-500' : 'border-border'
                      } focus:outline-none focus:border-brand-gold-muted text-foreground placeholder-muted-foreground transition-colors duration-300`}
                      placeholder="Your name"
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-muted-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl bg-background border ${
                        formErrors.email ? 'border-red-500' : 'border-border'
                      } focus:outline-none focus:border-brand-gold-muted text-foreground placeholder-muted-foreground transition-colors duration-300`}
                      placeholder="your@email.com"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-muted-foreground mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl bg-background border ${
                        formErrors.phone ? 'border-red-500' : 'border-border'
                      } focus:outline-none focus:border-brand-gold-muted text-foreground placeholder-muted-foreground transition-colors duration-300`}
                      placeholder="(619) 224-5050"
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-muted-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={5}
                      className={`w-full px-4 py-3 rounded-xl bg-background border ${
                        formErrors.message ? 'border-red-500' : 'border-border'
                      } focus:outline-none focus:border-brand-gold-muted text-foreground placeholder-muted-foreground transition-colors duration-300 resize-none`}
                      placeholder="Tell us about your nail care needs..."
                    ></textarea>
                    {formErrors.message && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed font-semibold bg-btn-accent hover:bg-btn-accent-hover active:bg-btn-accent-active text-btn-theme-foreground"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Google Maps */}
            <div
              className="bg-card rounded-3xl overflow-hidden shadow-xl border border-border"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: `translateX(${isVisible ? 0 : 40}px)`,
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-linear-to-br from-brand-gold-soft to-brand-gold rounded-xl shadow-lg">
                    <Navigation className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl text-foreground">Find Us</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Located in the heart of Ocean Beach, San Diego
                </p>
              </div>
              <div className="relative h-96">
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
                  href="https://www.google.com/maps/place/Queen%27s+Nails+Hair+and+Skincare/@32.7461198,-117.2508972,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2 font-semibold bg-btn-accent hover:bg-btn-accent-hover active:bg-btn-accent-active text-btn-theme-foreground"
                >
                  <Navigation size={20} />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
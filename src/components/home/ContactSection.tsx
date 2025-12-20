'use client';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { useMemo } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface ContactSectionProps {
  onBookClick: () => void;
  onNavigateToServices?: (serviceId?: string) => void;
}

const businessHours = [
  { dayKey: 'contactSection.mondayFriday', hours: '9:00 AM - 7:00 PM', dayIndex: [1, 2, 3, 4, 5], startTime: 9, endTime: 19 },
  { dayKey: 'contactSection.saturday', hours: '9:00 AM - 6:00 PM', dayIndex: [6], startTime: 9, endTime: 18 },
  { dayKey: 'contactSection.sunday', hours: '10:00 AM - 5:00 PM', dayIndex: [0], startTime: 10, endTime: 17 },
];

// Function to check if business is currently open (San Diego timezone: America/Los_Angeles)
const isBusinessOpen = (): { isOpen: boolean; message: string } => {
  const now = new Date();
  
  // Get the day of week (0 = Sunday, 1 = Monday, etc.) in San Diego timezone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const parts = formatter.formatToParts(now);
  const hour = parseInt(parts.find(p => p.type === 'hour')?.value || '0');
  const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0');
  const currentTime = hour + minute / 60;

  // Get day of week by creating a date string and using Date object
  const dateParts = dateFormatter.formatToParts(now);
  const dateStr = dateParts.map(p => p.value).join('');
  const tempDate = new Date(dateStr);
  const weekday = tempDate.getDay(); // 0 = Sunday, 1 = Monday, etc.

  for (const schedule of businessHours) {
    if (schedule.dayIndex.includes(weekday)) {
      if (currentTime >= schedule.startTime && currentTime < schedule.endTime) {
        return { isOpen: true, message: 'Open Now' };
      }
    }
  }

  return { isOpen: false, message: 'Closed Now' };
};

export function ContactSection({ onBookClick, onNavigateToServices }: ContactSectionProps) {
  const businessStatus = useMemo(() => isBusinessOpen(), []);
  const { t } = useLanguage();
  
  return (
    <section id="contact" className="py-20 md:py-32 bg-secondary dark:bg-background transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              {t('contactSection.title', 'Visit Us Today')}
            </h2>
            <p className="text-lg text-foreground mb-8 leading-relaxed">
              {t('contactSection.subtitle', 'We\'re conveniently located in Ocean Beach, San Diego. Walk-ins welcome, but appointments are recommended for your preferred time slot.')}
            </p>

            {/* Contact Cards */}
            <div className="space-y-4 mb-8">
              {/* Phone */}
              <a
                href="tel:6192245050"
                className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl hover:border-brand-gold/40 transition-colors group"
              >
                <div className="w-12 h-12 bg-card text-[color:var(--gold-champagne)] rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="text-[color:var(--gold-champagne)]" size={20} />
                </div>
                <div>
                  <div className="text-sm text-foreground mb-1">{t('contactSection.phone', 'Phone')}</div>
                  <div className="text-lg font-semibold text-foreground">(619) 224-5050</div>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:helenpham505@gmail.com"
                className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl hover:border-brand-gold/40 transition-colors group"
              >
                <div className="w-12 h-12 bg-card text-[color:var(--gold-champagne)] rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="text-[color:var(--gold-champagne)]" size={20} />
                </div>
                <div>
                  <div className="text-sm text-foreground mb-1">{t('contactSection.email', 'Email')}</div>
                  <div className="text-lg font-semibold text-foreground">helenpham505@gmail.com</div>
                </div>
              </a>

              {/* Address */}
              <a
                href="https://maps.app.goo.gl/Bc8jystzMK7y5Ct49"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl hover:border-brand-gold/40 transition-colors transform transition-transform duration-200 hover:scale-[1.02] hover:shadow-xl group"
              >
                <div className="w-12 h-12 bg-card text-[color:var(--gold-champagne)] rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="text-[color:var(--gold-champagne)]" size={20} />
                </div>
                <div>
                  <div className="text-sm text-foreground mb-1">{t('contactSection.location', 'Address')}</div>
                  <div className="text-lg font-semibold text-foreground">
                    4869 Santa Monica Ave<br />San Diego, CA 92107
                  </div>
                </div>
              </a>
            </div>

            {/* Business Hours */}
            <motion.div 
              className="bg-card rounded-2xl p-6 border border-border group hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-10 h-10 bg-linear-to-r from-brand-gold to-brand-gold-muted text-white rounded-xl flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Clock className="text-[color:var(--gold-champagne)]" size={20} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground">{t('contactSection.hours', 'Business Hours')}</h3>
                </div>
                <div className="flex items-center gap-2">
                  {businessStatus.isOpen ? (
                    <>
                      <CheckCircle className="text-[color:var(--brand-emerald)]" size={20} />
                      <span className="text-sm font-semibold text-[color:var(--brand-emerald)] dark:text-[color:var(--brand-emerald)]">{t('contactSection.openNow', businessStatus.message)}</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="text-[color:var(--destructive)]" size={20} />
                      <span className="text-sm font-semibold text-[color:var(--destructive)] dark:text-[color:var(--destructive)]">{t('contactSection.closedNow', businessStatus.message)}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                {businessHours.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center justify-between"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1, x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-foreground">{t(item.dayKey, item.dayKey)}</span>
                    <span className="font-semibold text-foreground">{item.hours}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-125 lg:h-full rounded-3xl overflow-hidden shadow-2xl"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3356.7789!2d-117.2508972!3d32.7461198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80deaa3766bc71cd%3A0x58947b412e099a07!2sQueen's%20Nails%20Hair%20and%20Skincare!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Queen's Nails Hair & Skincare Location"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
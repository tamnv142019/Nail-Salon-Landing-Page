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
    <section id="contact" className="py-20 md:py-32 bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t('contactSection.title', 'Visit Us Today')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              {t('contactSection.subtitle', 'We\'re conveniently located in Ocean Beach, San Diego. Walk-ins welcome, but appointments are recommended for your preferred time slot.')}
            </p>

            {/* Contact Cards */}
            <div className="space-y-4 mb-8">
              {/* Phone */}
              <a
                href="tel:6192245050"
                className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('contactSection.phone', 'Phone')}</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">(619) 224-5050</div>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:queenspham505@gmail.com"
                className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('contactSection.email', 'Email')}</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">queenspham505@gmail.com</div>
                </div>
              </a>

              {/* Address */}
              <a
                href="https://maps.google.com/?q=4869+Santa+Monica+Ave+San+Diego+CA+92107"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="text-white" size={20} />
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('contactSection.location', 'Address')}</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    4869 Santa Monica Ave<br />San Diego, CA 92107
                  </div>
                </div>
              </a>
            </div>

            {/* Business Hours */}
            <motion.div 
              className="bg-gradient-to-br from-gray-50 to-rose-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 group hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-10 h-10 bg-gradient-to-br from-rose-500 to-purple-600 rounded-xl flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Clock className="text-white" size={20} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t('contactSection.hours', 'Business Hours')}</h3>
                </div>
                <div className="flex items-center gap-2">
                  {businessStatus.isOpen ? (
                    <>
                      <CheckCircle className="text-green-500" size={20} />
                      <span className="text-sm font-semibold text-green-600 dark:text-green-400">{t('contactSection.openNow', businessStatus.message)}</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="text-red-500" size={20} />
                      <span className="text-sm font-semibold text-red-600 dark:text-red-400">{t('contactSection.closedNow', businessStatus.message)}</span>
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
                    <span className="text-gray-600 dark:text-gray-400">{t(item.dayKey, item.dayKey)}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{item.hours}</span>
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
            className="relative h-[500px] lg:h-full rounded-3xl overflow-hidden shadow-2xl"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3356.7789!2d-117.2508972!3d32.7461198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80deaa3766bc71cd%3A0x58947b412e099a07!2sQueen's%20Nails%20Hair%20and%20Skincare!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Queen's Nails Location"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
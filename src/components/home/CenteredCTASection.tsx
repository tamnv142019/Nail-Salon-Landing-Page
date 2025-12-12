import { motion } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';

export function CenteredCTASection() {
  const { t } = useLanguage();
  
  return (
    <section className="py-24 md:py-32 bg-secondary dark:bg-background transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center min-h-[400px]"
        >
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8 text-center max-w-2xl">
            {t('cta.title', 'Ready to Transform Your Beauty?')}
          </h2>
            <p className="text-xl text-muted-foreground mb-12 text-center max-w-2xl">
            {t('cta.subtitle', 'Discover our exclusive services and book your appointment today')}
          </p>
          
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative cursor-pointer"
          >
            
            {/* Main button */}
            <button
              onClick={() => {
                const servicesElement = document.getElementById('services');
                if (servicesElement) {
                  const startPosition = window.scrollY;
                  const targetPosition = servicesElement.getBoundingClientRect().top + window.scrollY;
                  const distance = targetPosition - startPosition;
                  const duration = 1500;
                  let start: number | null = null;

                  const easeInOutCubic = (t: number) => {
                    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                  };

                  const scroll = (timestamp: number) => {
                    if (!start) start = timestamp;
                    const progress = (timestamp - start) / duration;

                    if (progress < 1) {
                      window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));
                      requestAnimationFrame(scroll);
                    } else {
                      window.scrollTo(0, targetPosition);
                    }
                  };

                  requestAnimationFrame(scroll);
                }
              }}
              className="group relative px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-2xl text-lg font-semibold cursor-pointer bg-brand-gold-soft hover:bg-brand-gold-muted text-brand-dark dark:bg-brand-gold-soft dark:hover:bg-brand-gold dark:text-white"
            >
              <span className="flex items-center justify-center gap-2">
                {t('cta.button', 'Get Started!')}
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

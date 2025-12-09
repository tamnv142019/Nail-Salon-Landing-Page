import { motion } from 'motion/react';

export function CenteredCTASection() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-rose-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center min-h-[400px]"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8 text-center max-w-2xl">
            Ready to Transform Your Beauty?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 text-center max-w-2xl">
            Discover our exclusive services and book your appointment today
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
              className="group relative px-8 py-4 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white rounded-full transition-all duration-300 hover:scale-105 shadow-2xl text-lg font-semibold cursor-pointer"
            >
              <span className="flex items-center justify-center gap-2">
                Get Started!
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

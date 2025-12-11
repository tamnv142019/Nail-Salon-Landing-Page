import { motion } from 'motion/react';
import { Award, Heart, Users, Clock } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function AboutSection() {
  const { t } = useLanguage();
  
  const stats = [
    { icon: Users, value: '1000+', labelKey: 'aboutStats.happyClients' },
    { icon: Award, value: '10+', labelKey: 'aboutStats.yearsExperience' },
    { icon: Heart, value: '5.0', labelKey: 'aboutStats.averageRating' },
    { icon: Clock, value: '7 Days', labelKey: 'aboutStats.openWeekly' },
  ];
  
  return (
    <section id="about" className="py-20 md:py-32 bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1595944024804-733665a112db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBuYWlsJTIwc2Fsb24lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjUyNzM3NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Queen's Nails Interior"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center">
                  <Award className="text-white" size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">10+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('aboutStats.yearsOfExcellence', 'Years of Excellence')}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 whitespace-nowrap">
              {t('home.about.title', 'Welcome to Queen\'s Nails')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              {t('home.about.text1', 'Since 2015, Queen\'s Nails Hair & Skincare has been San Diego\'s premier destination for luxury nail care and beauty services. Located in the heart of Ocean Beach, we pride ourselves on delivering exceptional service in a relaxing, upscale environment.')}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              {t('home.about.text2', 'Our team of experienced professionals is dedicated to providing you with the highest quality treatments using premium products and the latest techniques. From classic manicures to intricate nail art, we ensure every visit leaves you feeling pampered and beautiful.')}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-rose-500 to-purple-600 rounded-xl mb-3">
                    <stat.icon className="text-white" size={24} />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {t(stat.labelKey, stat.labelKey)}
                  </div>
                </div>
              ))}
            </div>

            {/* Features List */}
            <div className="space-y-3 mb-12">
              {[
                'aboutFeatures.feature1',
                'aboutFeatures.feature2',
                'aboutFeatures.feature3',
                'aboutFeatures.feature4',
              ].map((featureKey, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{t(featureKey, featureKey)}</span>
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

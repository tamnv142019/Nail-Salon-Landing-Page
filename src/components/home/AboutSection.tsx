"use client";

import { motion } from 'motion/react';
import { Award, Heart, Users, Clock } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function AboutSection() {
  const { t } = useLanguage();
  
  const iconAccentByKey: Record<string, string> = {
    'aboutStats.happyClients': 'text-rose-500',
    'aboutStats.yearsExperience': 'text-amber-500',
    'aboutStats.averageRating': 'text-pink-500',
    'aboutStats.openWeekly': 'text-sky-500',
  };
  
  const stats = [
    { icon: Users, value: '1000+', labelKey: 'aboutStats.happyClients' },
    { icon: Award, value: '10+', labelKey: 'aboutStats.yearsExperience' },
    { icon: Heart, value: '5.0', labelKey: 'aboutStats.averageRating' },
    { icon: Clock, value: '7 Days', labelKey: 'aboutStats.openWeekly' },
  ];

  const features = [
    { key: 'aboutFeatures.feature1', accent: 'text-cyan-600' },
    { key: 'aboutFeatures.feature2', accent: 'text-cyan-600' },
    { key: 'aboutFeatures.feature3', accent: 'text-cyan-600' },
    { key: 'aboutFeatures.feature4', accent: 'text-cyan-600' },
  ];
  
  return (
    <section id="about" className="py-20 md:py-32 bg-background transition-colors duration-500">
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
                src="/images/backgrounds/salon-bg-02.jpg"
                alt="Queens OB Nail salon interior"
                className="w-full h-130 md:h-140 object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -right-6 bg-background/70 dark:bg-card/70 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-border/40">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-background/60 dark:bg-card/60 backdrop-blur-xl border border-border/40 shadow-sm ring-1 ring-inset ring-(--glass-ring) text-amber-500 flex items-center justify-center transition-[transform,background-color,box-shadow] duration-200 ease-out hover:bg-background/75 dark:hover:bg-card/75 hover:-translate-y-0.5 hover:shadow-md">
                  <Award className="text-current" size={22} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">10+</div>
                  <div className="text-sm text-foreground">{t('aboutStats.yearsOfExcellence', 'Years of Excellence')}</div>
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
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              {t('home.about.title', 'About Us')}
            </h2>
            <p className="text-lg text-foreground mb-6 leading-relaxed">
              {t('home.about.text1', 'Since 2015, Queen\'s Nails Hair and Skincare has been San Diego\'s premier destination for luxury nail care and beauty services. Located in the heart of Ocean Beach, we pride ourselves on delivering exceptional service in a relaxing, upscale environment.')}
            </p>
            <p className="text-lg text-foreground mb-8 leading-relaxed">
              {t('home.about.text2', 'Our team of experienced professionals is dedicated to providing you with the highest quality treatments using premium products and the latest techniques. From classic manicures to intricate nail art, we ensure every visit leaves you feeling pampered and beautiful.')}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group text-center p-4 bg-background/70 dark:bg-card/70 backdrop-blur-xl border border-border/40 rounded-xl transition-[transform,box-shadow,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:bg-background/80 dark:hover:bg-card/80"
                >
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 bg-background/60 dark:bg-card/60 backdrop-blur-xl border border-border/40 shadow-sm ring-1 ring-inset ring-(--glass-ring) rounded-2xl mb-3 transition-[transform,box-shadow,background-color] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:shadow-md group-hover:bg-background/75 dark:group-hover:bg-card/75"
                  >
                    <stat.icon className={iconAccentByKey[stat.labelKey] ?? 'text-foreground'} size={22} />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-foreground">
                    {t(stat.labelKey, stat.labelKey)}
                  </div>
                </div>
              ))}
            </div>

            {/* Features List */}
            <div className="space-y-3 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full bg-background/70 dark:bg-card/70 backdrop-blur-xl border border-border/40 ring-1 ring-inset ring-(--glass-ring) flex items-center justify-center shrink-0 ${feature.accent}`}>
                    <svg className="w-4 h-4 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-foreground">{t(feature.key, feature.key)}</span>
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

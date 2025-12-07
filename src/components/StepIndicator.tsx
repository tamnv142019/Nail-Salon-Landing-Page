import { useEffect, useState } from 'react';
import { Sparkles, Image, Star, Phone, Scissors, Brush, Heart, MessageCircle } from 'lucide-react';

const steps = [
  { id: 'services', label: 'Services', icon: Scissors },
  { id: 'gallery', label: 'Gallery', icon: Brush },
  { id: 'testimonials', label: 'Reviews', icon: Heart },
  { id: 'contact', label: 'Contact', icon: MessageCircle },
];

export function StepIndicator() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero
      setIsVisible(window.scrollY > window.innerHeight);

      // Determine active step based on scroll position
      const sections = steps.map(step => document.getElementById(step.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveStep(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-8 transition-all duration-500 ${
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
      }`}
    >
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = index === activeStep;
        const isPast = index < activeStep;

        return (
          <a
            key={step.id}
            href={`#${step.id}`}
            className="group relative flex items-center gap-4"
          >
            {/* Dot/Icon */}
            <div
              className={`relative w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-rose-500 to-purple-600 border-transparent scale-110'
                  : isPast
                  ? 'bg-rose-500 border-rose-500'
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-rose-500 dark:hover:border-rose-500'
              }`}
            >
              <Icon
                size={20}
                className={`transition-colors duration-300 ${
                  isActive || isPast ? 'text-white' : 'text-gray-600 dark:text-gray-400 group-hover:text-rose-500'
                }`}
              />
              
              {/* Active ring */}
              {isActive && (
                <span className="absolute inset-0 rounded-full border-2 border-rose-500 animate-ping opacity-75" />
              )}
            </div>

            {/* Label */}
            <span
              className={`absolute left-16 whitespace-nowrap px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none ${
                isActive
                  ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
              }`}
            >
              {step.label}
            </span>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={`absolute top-12 left-6 w-0.5 h-8 transition-all duration-500 ${
                  isPast ? 'bg-rose-500' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              />
            )}
          </a>
        );
      })}
    </div>
  );
}
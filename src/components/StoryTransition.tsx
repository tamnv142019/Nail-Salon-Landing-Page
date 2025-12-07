import { useEffect, useRef, useState } from 'react';

interface StoryTransitionProps {
  title: string;
  subtitle: string;
  chapter: string;
}

export function StoryTransition({ title, subtitle, chapter }: StoryTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);
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
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="relative py-32 px-6 flex items-center justify-center overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
        <div className="absolute inset-0 opacity-30">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-rose-400 dark:bg-rose-500 rounded-full transition-all duration-1000 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              }`}
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                transitionDelay: `${i * 100}ms`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center max-w-4xl">
        {/* Chapter number */}
        <div
          className={`inline-block mb-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="px-6 py-2 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 rounded-full text-rose-600 dark:text-rose-400 text-sm">
            {chapter}
          </span>
        </div>

        {/* Main title */}
        <h2
          className={`text-5xl md:text-7xl mb-6 bg-gradient-to-r from-gray-900 via-rose-600 to-purple-600 dark:from-white dark:via-rose-300 dark:to-purple-400 bg-clip-text text-transparent transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {title}
        </h2>

        {/* Subtitle */}
        <p
          className={`text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {subtitle}
        </p>

        {/* Decorative line */}
        <div
          className={`mt-12 mx-auto w-24 h-1 bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 rounded-full transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 w-24' : 'opacity-0 w-0'
          }`}
        />
      </div>
    </div>
  );
}

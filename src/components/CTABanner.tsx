import { Calendar, Sparkles, Heart, Gem } from 'lucide-react';

interface CTABannerProps {
  onBookClick: () => void;
}

export function CTABanner({ onBookClick }: CTABannerProps) {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-purple-600 to-blue-600 animate-gradient-x">
        <div className="absolute inset-0 opacity-30">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-float"
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Animated badge */}
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white mb-8 animate-bounce-slow">
          <Gem className="animate-pulse fill-white" size={20} />
          <span className="text-sm">Limited Time Offer</span>
          <Sparkles size={16} className="animate-spin-slow" />
        </div>

        {/* Main title with animation */}
        <h2 className="text-5xl md:text-7xl text-white mb-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
          Your Story Deserves
          <br />
          <span className="bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent animate-gradient-x">
            The Best Beginning
          </span>
        </h2>
        
        <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
          Start your transformation today with 20% off your first visit. Because every beautiful story starts with a single step.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-400">
          <button
            onClick={onBookClick}
            className="group relative bg-white hover:bg-gray-100 text-gray-900 px-10 py-5 rounded-full transition-all duration-300 shadow-2xl hover:shadow-white/50 hover:scale-110 flex items-center justify-center gap-3 overflow-hidden"
          >
            <Calendar size={22} className="group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-lg">Begin Your Story Now</span>
            
            {/* Shine effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-yellow-200/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
          </button>

          <a
            href="#services"
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-10 py-5 rounded-full border-2 border-white/30 hover:border-white/50 transition-all duration-300 shadow-lg hover:scale-110 flex items-center justify-center"
          >
            Explore Services
          </a>
        </div>

        {/* Trust badges with icons */}
        <div className="flex flex-wrap justify-center gap-12 text-white text-sm animate-in fade-in slide-in-from-bottom-5 duration-700 delay-600">
          {[
            { icon: '👩‍⚕️', text: 'Licensed Professionals' },
            { icon: '✨', text: 'Premium Products' },
            { icon: '⭐', text: '5-Star Rated' },
          ].map((badge, index) => (
            <div key={index} className="flex items-center gap-3 group">
              <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                {badge.icon}
              </span>
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Add custom animations */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 3s ease infinite; }
        .animate-float { animation: float linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
      `}</style>
    </section>
  );
}
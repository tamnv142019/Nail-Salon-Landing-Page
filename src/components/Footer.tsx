import { Star, Instagram, Facebook, Twitter, Heart, Send, Gem } from 'lucide-react';
import { useState } from 'react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-950 border-t border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white py-16 px-6 relative overflow-hidden transition-colors duration-500">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-rose-100/50 dark:from-rose-950/20 to-transparent transition-colors duration-500"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <Gem className="fill-rose-500 text-rose-500 dark:fill-rose-400 dark:text-rose-400 transition-colors duration-500" size={32} />
              </div>
              <span className="text-2xl bg-gradient-to-r from-gray-900 to-rose-600 dark:from-white dark:to-rose-300 bg-clip-text text-transparent">
                Luxe Nails
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 transition-colors duration-500">
              Premium nail care services for the modern individual. Experience luxury and elegance.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: 'https://instagram.com' },
                { Icon: Facebook, href: 'https://facebook.com' },
                { Icon: Twitter, href: 'https://twitter.com' }
              ].map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 bg-gray-200 dark:bg-gray-800 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-2xl flex items-center justify-center hover:bg-gradient-to-br hover:from-rose-500 hover:to-purple-600 hover:border-transparent transition-all duration-300 hover:scale-110 hover:-rotate-6"
                >
                  <Icon size={20} className="text-gray-700 dark:text-gray-300 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-700" style={{ animationDelay: '100ms' }}>
            <h4 className="mb-6 text-lg text-gray-900 dark:text-white transition-all duration-500">
              Quick Links
            </h4>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400 transition-colors duration-500">
              {['Services', 'Gallery', 'Reviews', 'Contact'].map((link, index) => (
                <li key={index}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-rose-600 dark:bg-rose-400 group-hover:w-4 transition-all duration-300"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-700" style={{ animationDelay: '200ms' }}>
            <h4 className="mb-6 text-lg text-gray-900 dark:text-white transition-all duration-500">
              Services
            </h4>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400 transition-colors duration-500">
              {['Classic Manicure', 'Gel Manicure', 'Spa Pedicure', 'Nail Art Design'].map((service, index) => (
                <li key={index} className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors duration-300 cursor-pointer">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-700" style={{ animationDelay: '300ms' }}>
            <h4 className="mb-6 text-lg text-gray-900 dark:text-white transition-all duration-500">
              Stay Updated
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed transition-colors duration-500">
              Subscribe to get special offers and beauty tips.
            </p>
            {isSubscribed ? (
              <div className="flex items-center gap-2 p-4 bg-green-100 dark:bg-green-900/30 rounded-xl border border-green-300 dark:border-green-700 transition-all duration-300 animate-in zoom-in">
                <Heart size={18} className="text-green-600 dark:text-green-400 fill-green-600 dark:fill-green-400 animate-pulse" />
                <span className="text-green-700 dark:text-green-300 text-sm">Subscribed successfully!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="flex-1 px-4 py-3 rounded-xl bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-rose-500 dark:focus:border-rose-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 text-sm backdrop-blur-sm transition-all duration-300"
                />
                <button 
                  type="submit"
                  className="px-4 py-3 bg-gradient-to-r from-rose-500 to-purple-600 rounded-xl hover:from-rose-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 group"
                >
                  <Send size={18} className="text-white group-hover:translate-x-0.5 transition-transform duration-300" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-gray-300 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 transition-colors duration-500">
          <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-500">
            &copy; 2025 Luxe Nails. All rights reserved.
          </p>
          <div className="flex gap-6 text-gray-600 dark:text-gray-400 text-sm transition-colors duration-500">
            <a href="#" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
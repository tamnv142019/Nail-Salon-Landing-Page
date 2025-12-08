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
                <img src="/logo.png" alt="Queen's Nails Logo" className="w-10 h-10 object-contain" />
              </div>
              <span className="text-2xl bg-gradient-to-r from-gray-900 to-rose-600 dark:from-white dark:to-rose-300 bg-clip-text text-transparent">
                Queen's Nails Hair & Skincare
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xs transition-colors duration-500">
              Experience luxury nail care with premium services and professional artistry.
            </p>
            <div className="flex gap-2">
              <span className="text-gray-600 dark:text-gray-400 text-sm">📍 4869 Santa Monica Ave, San Diego</span>
            </div>
            <div className="flex gap-2 mt-2">
              <span className="text-gray-600 dark:text-gray-400 text-sm">📞 (619) 224-5050</span>
            </div>
            <div className="flex gap-3 mt-6">
              <a 
                href="https://www.facebook.com/profile.php?id=100075740667723&mibextid=LQQJ4d" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-10 h-10 bg-gray-200 dark:bg-gray-800 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 hover:border-transparent transition-all duration-300 hover:scale-110"
                aria-label="Visit our Facebook page"
              >
                <Facebook size={18} className="text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors duration-300" />
              </a>
              <a 
                href="https://www.instagram.com/yourpage" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-10 h-10 bg-gray-200 dark:bg-gray-800 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-pink-500 hover:to-rose-600 hover:border-transparent transition-all duration-300 hover:scale-110"
                aria-label="Visit our Instagram page"
              >
                <Instagram size={18} className="text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors duration-300" />
              </a>
              <a 
                href="https://www.x.com/yourpage" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-10 h-10 bg-gray-200 dark:bg-gray-800 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-black hover:to-gray-800 dark:hover:from-gray-700 dark:hover:to-black hover:border-transparent transition-all duration-300 hover:scale-110"
                aria-label="Visit our X page"
              >
                <svg className="w-4 h-4 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.6l-5.165-6.75-5.913 6.75h-3.308l7.73-8.835L.424 2.25h6.7l4.8 6.356 5.52-6.356zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
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

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-600 transition-colors duration-500">
          <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-500">
            © {new Date().getFullYear()} Queen's Nails Hair & Skincare. All rights reserved.
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
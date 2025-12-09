import { Star, Instagram, Facebook, MapPin, Heart, Send, Clock } from 'lucide-react';
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
                <img src="/logo.png" alt="Queen's Nails Hair & Skincare Logo" className="h-8 w-auto transition-transform duration-500 hover:scale-110" />
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
          </div>

          {/* Quick Links */}
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-700" style={{ animationDelay: '100ms' }}>
            <h4 className="mb-6 text-lg text-gray-900 dark:text-white transition-all duration-500">
              Hours
            </h4>
            <div className="space-y-2 text-gray-600 dark:text-gray-400 transition-colors duration-500">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-rose-500 dark:text-rose-400 flex-shrink-0" />
                <span className="text-sm">Mon - Fri: 9AM - 7PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-rose-500 dark:text-rose-400 flex-shrink-0" />
                <span className="text-sm">Saturday: 9AM - 6PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-rose-500 dark:text-rose-400 flex-shrink-0" />
                <span className="text-sm">Sunday: 10AM - 5PM</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="mb-3 text-lg text-gray-900 dark:text-white">Follow Us</h4>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/profile.php?id=100075740667723&mibextid=LQQJ4d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="Visit our Facebook page"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center hover:bg-pink-600 dark:hover:bg-pink-600 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="Visit our Instagram page"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://www.google.com/maps/place/Queen's+Nails+Hair+and+Skincare/@32.7461198,-117.2483223,17z/data=!4m9!1m2!10m1!1e1!3m5!1s0x80deaa3766bc71cd:0x58947b412e099a07!8m2!3d32.7462568!4d-117.2482123!16s%2Fg%2F1tjytxy4?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center hover:bg-red-600 dark:hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="Find us on Google Maps"
                >
                  <MapPin size={18} />
                </a>
              </div>
            </div>
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
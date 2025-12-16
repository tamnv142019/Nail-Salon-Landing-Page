"use client";

import { Star, Instagram, Facebook, MapPin, Heart, Send, Clock } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { businessInfo } from '../config/seo.config';

interface FooterProps {
  onNavigateToPrivacy?: () => void;
  onNavigateToTerms?: () => void;
}

export function Footer({ onNavigateToPrivacy, onNavigateToTerms }: FooterProps = {}) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { t } = useLanguage();

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

  // Simple inline Yelp icon (lightweight, avoids new dependencies)
  const YelpIcon = ({ size = 18 }: { size?: number }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2c1.1 0 2 .9 2 2v6.5l3.5 3.5c.6.6.6 1.6 0 2.2l-1.2 1.2c-.6.6-1.6.6-2.2 0L9.5 14H6c-1.1 0-2-.9-2-2V6c0-2.2 1.8-4 4-4h4z" />
    </svg>
  );

  return (
    <footer className="bg-secondary dark:bg-background border-t border-border text-foreground py-16 px-6 relative overflow-hidden transition-colors duration-500">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-brand-gold-soft/30 dark:from-brand-gold/10 to-transparent transition-colors duration-500"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <img src="/logo.png" alt="Queen's Nails Hair & Skincare Logo" className="h-8 w-auto transition-transform duration-500 hover:scale-110" />
              </div>
              <div className="text-2xl leading-tight bg-linear-to-r from-foreground via-brand-gold-muted to-foreground bg-clip-text text-transparent">
                <span className="block">Queen's Nails Hair</span>
                <span className="block">& Skincare</span>
              </div>
            </div>
            <p className="text-foreground mb-6 max-w-xs transition-colors duration-500">
              {t('footer.description', 'Experience luxury nail care with premium services and professional artistry.')}
            </p>
            <div className="flex gap-2">
              <span className="text-foreground text-sm">📍 4869 Santa Monica Ave, San Diego</span>
            </div>
            <div className="flex gap-2 mt-2">
              <span className="text-foreground text-sm">📞 (619) 224-5050</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-700" style={{ animationDelay: '100ms' }}>
            <h4 className="mb-6 text-lg text-foreground transition-all duration-500">
              {t('footer.hours', 'Hours')}
            </h4>
            <div className="space-y-2 text-foreground transition-colors duration-500">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-brand-gold-muted dark:text-brand-gold-soft shrink-0" />
                <span className="text-sm">Mon - Fri: 9AM - 7PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-brand-gold-muted dark:text-brand-gold-soft shrink-0" />
                <span className="text-sm">Saturday: 9AM - 6PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-brand-gold-muted dark:text-brand-gold-soft shrink-0" />
                <span className="text-sm">Sunday: 10AM - 5PM</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="mb-3 text-lg text-foreground">{t('footer.followUs', 'Follow Us')}</h4>
              <div className="flex gap-3">
                <a
                  href={businessInfo.social.facebook || 'https://www.facebook.com/profile.php?id=100075740667723'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-card border border-border text-foreground flex items-center justify-center hover:bg-brand-sapphire hover:text-white hover:border-transparent transition-all duration-300 hover:scale-110"
                  aria-label="Visit our Facebook page"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href={businessInfo.social.yelp || 'https://www.yelp.com/biz/queen-s-nails-hair-and-skincare-san-diego-2'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-card border border-border text-foreground flex items-center justify-center hover:bg-[#d32323] hover:text-white hover:border-transparent transition-all duration-300 hover:scale-110"
                  aria-label="Visit our Yelp page"
                >
                  <YelpIcon size={18} />
                </a>
                <a
                  href={"https://www.google.com/maps/place/Queen's+Nails+Hair+and+Skincare/@32.7461198,-117.2483223,17z/data=!4m9!1m2!10m1!1e1!3m5!1s0x80deaa3766bc71cd:0x58947b412e099a07!8m2!3d32.7462568!4d-117.2482123!16s%2Fg%2F1tjytxy4?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-card border border-border text-foreground flex items-center justify-center hover:bg-brand-emerald hover:text-white hover:border-transparent transition-all duration-300 hover:scale-110"
                  aria-label="Find us on Google Maps"
                >
                  <MapPin size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-700" style={{ animationDelay: '200ms' }}>
            <h4 className="mb-6 text-lg text-foreground transition-all duration-500">
              {t('footer.services', 'Services')}
            </h4>
            <ul className="space-y-3 text-foreground transition-colors duration-500">
              {[
                { key: 'services.classicManicure.title', default: 'Classic Manicure' },
                { key: 'services.gelManicure.title', default: 'Gel Manicure' },
                { key: 'services.spaPedicure.title', default: 'Spa Pedicure' },
                { key: 'services.nailArt.title', default: 'Nail Art Design' },
              ].map((service, index) => (
                <li key={index} className="hover:text-brand-gold-muted transition-colors duration-300 cursor-pointer">
                  {t(service.key, service.default)}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-700" style={{ animationDelay: '300ms' }}>
            <h4 className="mb-6 text-lg text-foreground transition-all duration-500">
              {t('footer.stayUpdated', 'Stay Updated')}
            </h4>
            <p className="text-foreground mb-4 text-sm leading-relaxed transition-colors duration-500">
              {t('footer.newsletterText', 'Subscribe to get special offers and beauty tips.')}
            </p>
            {isSubscribed ? (
              <div className="flex items-center gap-2 p-4 bg-green-100 dark:bg-green-900/30 rounded-xl border border-green-300 dark:border-green-700 transition-all duration-300 animate-in zoom-in">
                <Heart size={18} className="text-green-600 dark:text-green-400 fill-green-600 dark:fill-green-400 animate-pulse" />
                <span className="text-green-700 dark:text-green-300 text-sm">{t('footer.subscribeSuccess', 'Subscribed successfully!')}</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.emailPlaceholder', 'Your email')}
                  required
                  className="flex-1 px-4 py-3 rounded-xl bg-card border border-border focus:outline-none focus:border-brand-gold-muted text-foreground placeholder-muted-foreground text-sm backdrop-blur-sm transition-all duration-300"
                />
                <button 
                  type="submit"
                  className="px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 group bg-btn-accent hover:bg-btn-accent-hover active:bg-btn-accent-active text-btn-theme-foreground"
                >
                  <Send size={18} className="text-current group-hover:translate-x-0.5 transition-transform duration-300" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-600 transition-colors">
          <p className="text-foreground text-sm transition-colors duration-500">
            © {new Date().getFullYear()} Queen's Nails Hair & Skincare. All rights reserved.
          </p>
          <div className="flex gap-6 text-foreground text-sm transition-colors duration-500">
            <button
              onClick={onNavigateToPrivacy}
              className="hover:text-brand-gold-muted transition-colors duration-300 cursor-pointer underline-offset-4 hover:underline"
            >
              {t('footer.privacyPolicy', 'Privacy Policy')}
            </button>
            <button
              onClick={onNavigateToTerms}
              className="hover:text-brand-gold-muted transition-colors duration-300 cursor-pointer underline-offset-4 hover:underline"
            >
              {t('footer.termsOfService', 'Terms of Service')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
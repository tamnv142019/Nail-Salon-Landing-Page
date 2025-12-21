"use client";

import { Star, MapPin, Heart, Send, Clock } from 'lucide-react';
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

  

  // Simple Apple Maps-like pin icon (generic, avoids using trademarked artwork)
  const AppleMapsIcon = ({ size = 18 }: { size?: number }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
    </svg>
  );

  // Simple Google 'G' icon (multi-color)
  const GoogleIcon = ({ size = 18 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M12 11.5v2.9h4.7c-.2 1.3-1.5 3.8-4.7 3.8-2.8 0-5-2.3-5-5s2.2-5 5-5c1.6 0 2.7.7 3.3 1.3l2.6-2.6C16.4 5.3 14.5 4.3 12 4.3 7.3 4.3 3.7 7.9 3.7 12.6 3.7 17.2 7.3 20.8 12 20.8c4.6 0 8.1-3.4 8.1-8.1 0-.6-.1-1.1-.2-1.6H12z" />
      <path fill="#34A853" d="M7.5 14.9c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9v0a5 5 0 015-3.1c1.3 0 2.3.4 3.1 1l-2.9 2.9H12v3.9c-.9 0-1.8-.3-2.5-.9z" opacity="0"/>
      <path fill="#FBBC05" d="M12 4.3c1.6 0 2.7.7 3.3 1.3l2.6-2.6C16.4 2 14.6 1 12 1 7.3 1 3.7 4.6 3.7 9.3c0 .9.2 1.8.5 2.6l3.3-2.9C9.7 8 10.8 4.3 12 4.3z" opacity="0"/>
      <path fill="#EA4335" d="M17.4 19.2A7.8 7.8 0 0012 20.8c-4.6 0-8.1-3.6-8.1-8.1 0-.9.2-1.8.5-2.6L9 12.4c.7.6 1.6.9 2.5.9v3.9c0 .5.1 1 .2 1.9z" opacity="0"/>
    </svg>
  );

  const FacebookIcon = ({ size = 18 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        d="M15.1 8h-1.6c-.4 0-.9.2-.9.9V9.9h2.5l-.3 2.2H12.6V19h-2.6v-6.9H7.7V9.9h2.3V8.3C10 6.1 11.4 5 13.9 5h1.2v3z"
        fill="#fff"
      />
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
                <img src="/logo.jpg" alt="Queen's Nails Hair & Skincare Logo" className="h-8 w-auto transition-transform duration-500 hover:scale-110" />
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
              <a
                href="https://maps.app.goo.gl/Bc8jystzMK7y5Ct49"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground text-sm inline-block transition-transform duration-200 transform hover:scale-105 hover:text-brand-gold hover:underline"
              >
                📍 4869 Santa Monica Ave, San Diego, CA 92107
              </a>
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
                  <FacebookIcon size={18} />
                </a>
                
                <a
                  href={businessInfo.social.yelp || 'https://www.yelp.com/biz/queen-s-nails-hair-and-skincare-san-diego-2'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-card border border-border text-foreground flex items-center justify-center hover:bg-[#b91c1c] hover:text-white hover:border-transparent transition-all duration-300 hover:scale-110"
                  aria-label="Visit our Yelp page"
                >
                  <img src="https://cdn.simpleicons.org/yelp/d32323" alt="Yelp" className="w-5 h-5" />
                </a>
                <a
                  href="https://www.google.com/search?sca_esv=33e8307878b681b3&authuser=0&hl=en&output=search&q=Queen%27s+Nails+Hair+and+Skincare&ludocid=6382862091766307335&lsig=AB86z5WX6M9quvqsaKYvOUbD8IQv&ved=1i%3A4%2Ct%3A109124%2Ce%3A3%2Cp%3Am45Hadm_F-Ln2roPzLfKuAM%3A66"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-card border border-border text-foreground flex items-center justify-center hover:bg-[#4285F4] hover:text-white hover:border-transparent transition-all duration-300 hover:scale-110"
                  aria-label="Find us on Google Search"
                >
                  <GoogleIcon size={18} />
                </a>
                <a
                  href="https://maps.app.goo.gl/Bc8jystzMK7y5Ct49"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-card border border-border text-foreground flex items-center justify-center hover:bg-brand-emerald hover:text-white hover:border-transparent transition-all duration-300 hover:scale-110"
                  aria-label="Find us on Google Maps"
                >
                  <MapPin size={18} />
                </a>
                <a
                  href="https://maps.apple.com/place?place-id=IBD99B74E4A250AE4&address=4869+Santa+Monica+Ave%2C+Unit+A%2C+San+Diego%2C+CA++92107%2C+United+States&coordinate=32.7462649%2C-117.248207&name=Queen%E2%80%99s+Nails+Hair+and+Skincare&_provider=9902"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-card border border-border text-foreground flex items-center justify-center hover:bg-[#111111] hover:text-white hover:border-transparent transition-all duration-300 hover:scale-110"
                  aria-label="Find us on Apple Maps"
                >
                  <AppleMapsIcon size={18} />
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
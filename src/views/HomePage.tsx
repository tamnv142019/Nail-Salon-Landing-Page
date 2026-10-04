"use client";

import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, Phone, MapPin, Check, ArrowRight } from 'lucide-react';
import { Navigation } from '../components/home/Navigation';
import { HeroSection } from '../components/home/HeroSection';
import { GallerySection } from '../components/home/GallerySection';
import { ContactSection } from '../components/home/ContactSection';
import { Footer } from '../components/Footer';
import { Analytics } from '@vercel/analytics/next';

interface HomePageProps {
  onNavigateToServices: (serviceId?: string) => void;
  onNavigateToPrivacy: () => void;
  onNavigateToTerms: () => void;
}

const services = [
  { name: 'Manicures', price: 'From $20', image: '/images/gallery/service-organic-1200.webp', description: 'Fresh color, neat nails and a finish you love. Explore regular, gel and powder options.', href: '/services#manicure', alt: 'Nail color and manicure detail' },
  { name: 'Pedicures', price: 'From $25', image: '/images/gallery/service-pedicure-1200.webp', description: 'Sit back and enjoy a little time for yourself with our spa pedicure treatments.', href: '/services#pedicure', alt: 'Nail care tools and treatment detail' },
  { name: 'More beauty care', price: 'See our menu', image: '/images/gallery/service-combo-1200.webp', description: 'Explore waxing, combo packages and add-ons. Call us for hair and skincare options.', href: '/services', alt: 'Beauty care at Queen’s Nails salon' },
];

export function HomePage({ onNavigateToServices, onNavigateToPrivacy, onNavigateToTerms }: HomePageProps) {
  return (
    <>
      <Navigation onBookClick={() => {}} />
      <main>
        <HeroSection onBookClick={() => {}} onNavigateToServices={onNavigateToServices} />
        <div className="salon-visit-strip">
          <Link href="/contact"><MapPin aria-hidden="true" /><span><strong>Easy to find</strong>4869 Santa Monica Ave, Ocean Beach</span></Link>
          <Link href="/contact"><CalendarDays aria-hidden="true" /><span><strong>Open every day</strong>View our hours & directions</span></Link>
          <a href="tel:+16192245050"><Phone aria-hidden="true" /><span><strong>Prefer to call?</strong>(619) 224-5050 · We’re happy to help</span></a>
        </div>

        <section className="salon-section" aria-labelledby="home-services-title">
          <div className="salon-section-heading"><div><p className="studio-eyebrow">SERVICES & PRICES</p><h2 id="home-services-title">Find your favorite treatment.</h2><p>Clear starting prices. Care that fits your day.</p></div><Link className="salon-button-outline" href="/services">View full menu <ArrowRight size={20} aria-hidden="true" /></Link></div>
          <div className="salon-service-grid">
            {services.map(service => <article className="salon-service-card" key={service.name}><div className="salon-service-photo"><Image src={service.image} alt={service.alt} fill sizes="(max-width: 700px) 100vw, 33vw" /></div><div className="salon-service-copy"><div className="salon-service-title"><h3>{service.name}</h3><span>{service.price}</span></div><p>{service.description}</p><Link href={service.href}>View {service.name.toLowerCase()} <ArrowRight size={18} aria-hidden="true" /></Link></div></article>)}
          </div>
          <p className="salon-price-note">Starting prices may vary with nail length, design and additional treatments.</p>
        </section>

        <section className="salon-booking-guide" aria-labelledby="booking-guide-title"><div className="salon-section"><div className="salon-centered-heading"><p className="studio-eyebrow">BOOKING MADE SIMPLE</p><h2 id="booking-guide-title">Your next appointment, in 3 steps.</h2><p>Book online at your own pace, or give us a call.</p></div><ol className="salon-steps"><li><span>1</span><h3>Choose your service</h3><p>Select one or more treatments and see your estimated price.</p></li><li><span>2</span><h3>Choose a day & time</h3><p>Tell us when you would like to visit our salon.</p></li><li><span>3</span><h3>Send your request</h3><p>We will contact you to confirm your appointment.</p></li></ol><div className="salon-centered-actions"><Link href="/book" className="studio-button">Book an appointment <ArrowRight size={20} aria-hidden="true" /></Link><a className="studio-text-link" href="tel:+16192245050">Or call (619) 224-5050</a></div></div></section>

        <section className="salon-about salon-section" aria-labelledby="home-about-title"><div className="salon-about-photo"><Image src="/images/backgrounds/queens-nails-hair-skincare-ocean-beach-salon-02.jpg" alt="Inside our neighborhood salon on Santa Monica Avenue" fill sizes="(max-width: 850px) 100vw, 50vw" /></div><div><p className="studio-eyebrow">WELCOME TO QUEEN’S</p><h2 id="home-about-title">A neighborhood salon.<br />A personal touch.</h2><p>Whether you’re stopping in for your usual color or trying something new, we want your visit to feel comfortable and easy.</p><ul className="salon-about-list"><li><Check aria-hidden="true" /> Manicures, pedicures and beauty care</li><li><Check aria-hidden="true" /> Walk-ins and appointment requests</li><li><Check aria-hidden="true" /> Convenient Ocean Beach location</li></ul><Link className="salon-button-outline" href="/queens-nails-hair-skincare">About our salon <ArrowRight size={20} aria-hidden="true" /></Link></div></section>

        <GallerySection />
        <section className="salon-reviews-link salon-section"><div><p className="studio-eyebrow">CLIENT EXPERIENCES</p><h2>See what our clients say.</h2><p>Read reviews from salon visitors and share your experience after your visit.</p></div><Link href="/reviews" className="salon-button-outline">Read client reviews <ArrowRight size={20} aria-hidden="true" /></Link></section>
        <ContactSection onBookClick={() => window.location.assign('/book')} />
      </main>
      <Footer onNavigateToPrivacy={onNavigateToPrivacy} onNavigateToTerms={onNavigateToTerms} />
      <Analytics />
    </>
  );
}

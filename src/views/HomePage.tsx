"use client";
import Link from 'next/link';
import { Navigation } from '../components/home/Navigation';
import { HeroSection } from '../components/home/HeroSection';
import { ScrollExperience } from '../components/home/ScrollExperience';
import { GallerySection } from '../components/home/GallerySection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { ContactSection } from '../components/home/ContactSection';
import { Footer } from '../components/Footer';
import { Analytics } from '@vercel/analytics/next';
interface HomePageProps { onNavigateToServices: (serviceId?: string) => void; onNavigateToPrivacy: () => void; onNavigateToTerms: () => void; }
export function HomePage({ onNavigateToServices, onNavigateToPrivacy, onNavigateToTerms }: HomePageProps) {
  return <><Navigation onBookClick={() => {}} /><main>
    <HeroSection onBookClick={() => {}} onNavigateToServices={onNavigateToServices} />
    <div className="studio-intro"><p className="studio-eyebrow">YOUR NEIGHBORHOOD BEAUTY DESTINATION</p><h2>Small details.<br />A world of difference.</h2><p>From a fresh manicure to a relaxing pedicure, make space for the care you love at Queen’s Nails Hair and Skincare in Ocean Beach, San Diego.</p></div>
    <ScrollExperience image="/images/gallery/service-organic-1200.webp" alt="Detailed nail finish at Queen’s Nails in Ocean Beach" eyebrow="01 / NAILS" title="Made to feel like you." description="Classic manicures, gel, dipping powder and nail art. Discover a finish that fits your everyday, or your next special occasion." href="/services#manicure" linkText="Discover nail services" />
    <div className="studio-intro"><p className="studio-eyebrow">CARE AT YOUR PACE</p><h2>Your next favorite ritual.</h2><p>Explore our service menu and starting prices. Choose your treatment, send an appointment request, and let our team take care of the details.</p></div>
    <div className="studio-service-grid">
      <div className="studio-service-card"><span>01 / HANDS</span><h3>A fresh perspective.</h3><p>Manicures, gel and detailed nail finishes. Regular manicures from $20.</p><Link href="/services#manicure">Explore manicures ↗</Link></div>
      <div className="studio-service-card"><span>02 / FEET</span><h3>Time to unwind.</h3><p>Take a seat and enjoy a spa pedicure. Regular spa pedicures from $25.</p><Link href="/services#pedicure">Explore pedicures ↗</Link></div>
      <div className="studio-service-card"><span>03 / MORE CARE</span><h3>Complete your visit.</h3><p>Browse waxing and additional treatments, or contact our team about hair and skincare.</p><Link href="/services">View the full menu ↗</Link></div>
    </div>
    <ScrollExperience image="/images/gallery/service-pedicure-1200.webp" alt="Spa pedicure treatment at Queen’s Nails" eyebrow="02 / PEDICURES" title="Slow down. Feel renewed." description="A little pause in your day. Explore spa pedicures, massage and our signature treatments." href="/services#pedicure" linkText="Find your treatment" />
    <GallerySection /><section className="studio-intro"><p className="studio-eyebrow">THE EXPERIENCE, IN YOUR WORDS</p><h2>Find your new favorite salon.</h2><p>Explore client reviews and share your experience after your next visit.</p><Link className="studio-text-link" href="/reviews">Read client reviews ↗</Link></section>
    <ScrollExperience image="/images/backgrounds/queens-nails-hair-skincare-ocean-beach-salon-02.jpg" alt="Queen’s Nails Hair and Skincare salon in Ocean Beach, San Diego" eyebrow="03 / OCEAN BEACH" title="Your moment, right here." description="Visit us at 4869 Santa Monica Avenue in Ocean Beach. Explore our salon, meet your next beauty ritual, and make time for yourself." href="/queens-nails-hair-skincare" linkText="Get to know Queen’s" />
    <ContactSection onBookClick={() => window.location.assign('/book')} />
  </main><Footer onNavigateToPrivacy={onNavigateToPrivacy} onNavigateToTerms={onNavigateToTerms} /><Analytics /></>;
}

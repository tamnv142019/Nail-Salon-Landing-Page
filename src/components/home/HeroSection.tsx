"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Phone, MapPin, CalendarDays, Check } from 'lucide-react';
import { businessInfo } from '../../config/seo.config';

interface HeroSectionProps {
  onBookClick: () => void;
  onNavigateToServices?: (serviceId?: string) => void;
}

export function HeroSection(_props: HeroSectionProps) {
  return (
    <section className="salon-hero">
      <div className="salon-hero-content">
        <p className="studio-eyebrow"><MapPin size={18} aria-hidden="true" /> YOUR OCEAN BEACH SALON</p>
        <h1>Beautiful nails.<br /><span>Feel-good care.</span></h1>
        <p className="salon-hero-description">Enjoy a fresh manicure, a relaxing pedicure and friendly, personal service at Queen’s Nails Hair and Skincare in San Diego.</p>
        <div className="salon-hero-buttons">
          <Link href="/book" className="studio-button"><CalendarDays size={20} aria-hidden="true" /> Book an appointment</Link>
          <a href="tel:+16192245050" className="salon-button-outline"><Phone size={20} aria-hidden="true" /> {businessInfo.phone}</a>
        </div>
        <Link href="/services" className="studio-text-link">View all services & prices <span aria-hidden="true">→</span></Link>
        <div className="salon-hero-benefits"><span><Check size={18} aria-hidden="true" /> Walk-ins welcome</span><span><Check size={18} aria-hidden="true" /> Open 7 days a week</span></div>
      </div>
      <div className="salon-hero-photo">
        <Image src="/images/backgrounds/queens-nails-hair-skincare-ocean-beach-salon-01.jpg" alt="Comfortable pedicure chairs inside Queen’s Nails Hair and Skincare in Ocean Beach" fill priority sizes="(max-width: 850px) 100vw, 50vw" />
        <div className="salon-photo-label"><span className="salon-photo-dot" /> A little care. A lovely new day.</div>
      </div>
    </section>
  );
}

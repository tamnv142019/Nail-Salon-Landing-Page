"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import { Phone, MapPin, CalendarDays, Check, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { businessInfo } from '../../config/seo.config';
import { useCarouselAutoplay } from '../../hooks/useCarouselAutoplay';

const salonPhotos = [
  { image: '01', alt: 'Comfortable pedicure chairs inside Queen’s Nails in Ocean Beach', caption: 'A little care. A lovely new day.' },
  { image: '02', alt: 'Colorful fish-inspired nail art with sparkling details', caption: 'A little color. A lot of personality.' },
  { image: '03', alt: 'Pink and red nail art with delicate floral details', caption: 'Beautiful details, just for you.' },
  { image: '04', alt: 'A fresh bright pink manicure outside the salon', caption: 'Fresh nails. A fresh perspective.' },
];

interface HeroSectionProps {
  onBookClick: () => void;
  onNavigateToServices?: (serviceId?: string) => void;
}

export function HeroSection(_props: HeroSectionProps) {
  const [activePhoto, setActivePhoto] = useState(0);
  const [paused, setPaused] = useState(false);
  const [explicitlyPlaying, setExplicitlyPlaying] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [focused, setFocused] = useState(false);
  const photoRegion = useRef<HTMLDivElement>(null);
  const nextPhoto = useCallback(() => setActivePhoto(current => (current + 1) % salonPhotos.length), []);
  const playing = useCarouselAutoplay(nextPhoto, paused || interacting || focused, photoRegion, 6000, explicitlyPlaying);
  const playbackRequested = !paused && playing;
  const choosePhoto = (index: number) => { setPaused(true); setActivePhoto(index); };

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
      <div className="salon-hero-photo" ref={photoRegion} role="region" aria-roledescription="carousel" aria-label="Our salon"
        onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)}
        onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
        {salonPhotos.map((photo, index) => <div key={photo.image} className={`salon-slide${activePhoto === index ? ' is-active' : ''}`} aria-hidden={activePhoto !== index}>
          <Image src={`/images/backgrounds/queens-nails-hair-skincare-ocean-beach-salon-${photo.image}.jpg`} alt={photo.alt} fill priority={index === 0} sizes="(max-width: 850px) 100vw, 50vw" />
        </div>)}
        <div className="salon-photo-topline"><span>THE QUEEN’S EXPERIENCE</span><span>{String(activePhoto + 1).padStart(2, '0')} / 04</span></div>
        <div className="salon-photo-label"><div className="salon-photo-caption"><span className="salon-photo-dot" /><span>{salonPhotos[activePhoto].caption}</span></div>
          <div className="salon-carousel-controls">
            <button type="button" onClick={() => choosePhoto((activePhoto - 1 + salonPhotos.length) % salonPhotos.length)} aria-label="Previous salon photo"><ChevronLeft size={20} /></button>
            <div className="salon-carousel-dots">{salonPhotos.map((photo, index) => <button type="button" key={photo.image} onClick={() => choosePhoto(index)} aria-label={`Show salon photo ${index + 1}`} aria-pressed={activePhoto === index}><span /></button>)}</div>
            <button type="button" onClick={() => choosePhoto((activePhoto + 1) % salonPhotos.length)} aria-label="Next salon photo"><ChevronRight size={20} /></button>
            <button type="button" onClick={() => { setPaused(playbackRequested); setExplicitlyPlaying(!playbackRequested); }} aria-label={playbackRequested ? 'Pause salon slideshow' : 'Play salon slideshow'}>{playbackRequested ? <Pause size={18} /> : <Play size={18} />}</button>
          </div>
        </div>
      </div>
    </section>
  );
}

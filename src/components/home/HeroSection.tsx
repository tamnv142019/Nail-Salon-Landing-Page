"use client";
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
interface HeroSectionProps { onBookClick: () => void; onNavigateToServices?: (serviceId?: string) => void; }
export function HeroSection(_props: HeroSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, .75], [.94, 1]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const radius = useTransform(scrollYProgress, [0, .6], [32, 0]);
  return <section ref={ref} className="studio-hero">
    <div className="studio-hero-heading"><p className="studio-eyebrow">OCEAN BEACH, SAN DIEGO</p><h1>A little time for you.<br /><span>A beautiful new feeling.</span></h1><p>Nails, hair and skincare. Thoughtful care, right here in Ocean Beach.</p><div className="studio-hero-actions"><Link href="/book" className="studio-button">Book your appointment <span aria-hidden="true">↗</span></Link><Link href="/services" className="studio-text-link">Explore our services <span aria-hidden="true">→</span></Link></div></div>
    <motion.div className="studio-hero-media" style={reduced ? undefined : { scale, borderRadius: radius }}><motion.div className="studio-hero-image" style={reduced ? undefined : { scale: imageScale }}><Image src="/images/backgrounds/queens-nails-hair-skincare-ocean-beach-salon-01.jpg" alt="Inside Queen’s Nails Hair and Skincare salon in Ocean Beach" fill priority sizes="100vw" /></motion.div><div className="studio-hero-caption"><span>Queen’s Nails Hair and Skincare</span><span>Scroll to discover ↓</span></div></motion.div>
  </section>;
}

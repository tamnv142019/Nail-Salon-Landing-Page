"use client";
import Link from 'next/link';
import { businessInfo } from '../config/seo.config';
interface FooterProps { onNavigateToPrivacy?: () => void; onNavigateToTerms?: () => void; }
export function Footer(_props: FooterProps = {}) {
  return <footer className="studio-footer"><div className="studio-footer-grid"><div><p className="studio-eyebrow">QUEEN’S NAILS HAIR AND SKINCARE</p><h2>Make time<br />for yourself.</h2><Link href="/book" className="studio-button">Book a visit ↗</Link></div><div><h3>Visit us</h3><p>{businessInfo.address.streetAddress}<br />{businessInfo.address.addressLocality}, CA {businessInfo.address.postalCode}</p><a href={`tel:+1${businessInfo.phone.replace(/\D/g, '')}`}>{businessInfo.phone}</a><a className="studio-footer-email" href={`mailto:${businessInfo.email}`}>{businessInfo.email}</a></div><div><h3>Opening hours</h3><p>Monday–Friday · 9am–7pm<br />Saturday · 9am–6pm<br />Sunday · 10am–5pm</p><Link href="/contact">Get directions ↗</Link></div><div><h3>Explore</h3><Link href="/services">Services & prices</Link><Link href="/gallery">Our work</Link><Link href="/reviews">Client reviews</Link><Link href="/blog">Beauty journal</Link></div></div><div className="studio-footer-bottom"><span>© {new Date().getFullYear()} Queen’s Nails Hair and Skincare</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></div></footer>;
}

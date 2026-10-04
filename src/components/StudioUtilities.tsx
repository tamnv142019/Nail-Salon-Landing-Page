"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarDays, Phone, MapPin } from 'lucide-react';
import { businessInfo } from '../config/seo.config';
export function StudioUtilities() {
  const pathname = usePathname();
  if (pathname === '/book') return null;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${businessInfo.address.streetAddress}, ${businessInfo.address.addressLocality}, ${businessInfo.address.addressRegion}`)}`;
  return <nav className="studio-mobile-dock" aria-label="Quick actions">
    <Link href="/book"><CalendarDays size={18} />Book</Link>
    <a href={`tel:+1${businessInfo.phone.replace(/\D/g, '')}`}><Phone size={18} />Call</a>
    <a href={directions} target="_blank" rel="noopener noreferrer"><MapPin size={18} />Directions</a>
  </nav>;
}

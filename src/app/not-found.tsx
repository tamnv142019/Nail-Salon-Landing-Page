import Link from 'next/link';
import { ClientHeader } from '../components/ClientHeader';
import { Footer } from '../components/Footer';
export default function NotFound() {
  return <><ClientHeader /><main className="studio-not-found"><p className="studio-eyebrow">404 / A LITTLE DETOUR</p><h1>Let’s get you<br />back to beautiful.</h1><p>This page could not be found. Explore our services or book your next visit.</p><div className="studio-hero-actions"><Link href="/" className="studio-button">Back to home ↗</Link><Link href="/services" className="studio-text-link">Explore services →</Link></div></main><Footer /></>;
}

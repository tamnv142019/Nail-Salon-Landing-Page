"use client";
import { Navigation } from '../../components/home/Navigation';
import { BookingModal } from '../../components/BookingModal';
import { Footer } from '../../components/Footer';
export default function Page({ searchParams }: { searchParams?: { service?: string } }) {
  return <><Navigation onBookClick={() => {}} /><main><div className="studio-page-intro"><p className="studio-eyebrow">A LITTLE TIME FOR YOU</p><h1>Your next visit starts here.</h1><p>Choose your services and preferred time. We will contact you to confirm your appointment.</p></div><div className="studio-booking"><BookingModal preSelectedService={searchParams?.service} inline isOpen onClose={() => {}} /><p className="studio-booking-note">Prices are estimates and may vary with design and length.<br />Prefer to speak with us? <a href="tel:+16192245050">Call (619) 224-5050.</a></p></div></main><Footer /></>;
}

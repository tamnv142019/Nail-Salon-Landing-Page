import { Metadata } from 'next';

import { LocalBusinessSchema } from '@/components/SEO/LocalBusinessSchema';
import { AboutSection } from '@/components/home/AboutSection';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ClientHeader } from '@/components/ClientHeader';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: "Queens Nails Hair & Skincare — Top‑Rated Nails Salon in Ocean Beach, San Diego",
  description:
    "Queens Nails Hair & Skincare is a top-rated nails salon in Ocean Beach, San Diego offering manicures, pedicures, nail art, hair styling, and skincare treatments. Book online for expert service and friendly care.",
  keywords: [
    "Queens Nails Hair & Skincare",
    "nails salon Ocean Beach",
    "nails salon near me",
    "best nails salon San Diego",
    "nail art Ocean Beach",
    "nails San Diego",
    "manicure pedicure Ocean Beach",
    "hair salon Ocean Beach",
    "skincare facial Ocean Beach",
  ],
  authors: [{ name: "Queens Nails Hair & Skincare", url: "https://queensobnail.com" }],
  alternates: {
    canonical: "https://queensobnail.com/queens-nails-hair-skincare",
  },
  openGraph: {
    title: "Queens Nails Hair & Skincare — Top‑Rated Nails Salon in Ocean Beach, San Diego",
    description:
      "Top-rated Ocean Beach salon for nails, hair, and skincare — expert technicians, clean environment, and easy online booking.",
    url: "https://queensobnail.com/queens-nails-hair-skincare",
    type: "website",
    images: [
      {
        url: "https://queensobnail.com/background/2.jpg",
        width: 1200,
        height: 630,
        alt: "Queens Nails Hair & Skincare — Salon interior and services",
      },
    ],
    locale: "en_US",
    siteName: "Queens Nails Hair & Skincare",
  },
  twitter: {
    card: "summary_large_image",
    title: "Queens Nails Hair & Skincare — Top‑Rated Nails Salon in Ocean Beach, San Diego",
    description:
      "Visit Queens Nails Hair & Skincare for premier nail, hair & skincare services in Ocean Beach. Book online or call to reserve your appointment.",
    images: ["https://queensobnail.com/background/2.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export default function QueensNailsPage() {
  return (
    <LanguageProvider>
      <LocalBusinessSchema />

      {/* Navigation/Header (client) */}
      <ClientHeader />

      <main>
        {/* About Section from HomePage */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />

    </LanguageProvider>
  );
}

// Revalidate the page with ISR to keep content fresh while serving static HTML to crawlers
export const revalidate = 3600; // 1 hour

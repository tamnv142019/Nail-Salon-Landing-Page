import { Metadata } from 'next';

import { LocalBusinessSchema } from '@/components/SEO/LocalBusinessSchema';
import { AboutSection } from '@/components/home/AboutSection';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ClientHeader } from '@/components/ClientHeader';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: "Queens Nails, Hair & Skincare | Best Beauty Salon in Your City",
  description: "Award-winning beauty salon in Your City offering expert nail, hair, and skincare services. Book your appointment at Queens Nails, Hair & Skincare today!",
    alternates: {
    canonical: "https://queensobnail.com/queens-nails-hair-skincare",
  },
  openGraph: {
    title: "Queens Nails, Hair & Skincare | Best Beauty Salon in Your City",
    description: "Top-rated salon for nails, hair, and skincare in Your City. See our services and book online.",
    url: "https://queensobnail.com/queens-nails-hair-skincare",
    type: "website",
    images: [
      {
        url: "https://queensobnail.com/gallery/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Queens Nails, Hair & Skincare - Salon Interior",
      },
    ],
    locale: "en_US",
    siteName: "Queens Nails, Hair & Skincare",
  },
  twitter: {
    card: "summary_large_image",
    title: "Queens Nails, Hair & Skincare",
    description: "Award-winning beauty salon in Your City. Nails, hair, skincare & more.",
    images: ["https://queensobnail.com/gallery/og-image.jpg"],
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

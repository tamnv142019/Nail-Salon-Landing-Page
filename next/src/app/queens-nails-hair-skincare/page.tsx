import { Metadata } from 'next';
import Image from 'next/image';
import { LocalBusinessSchema } from '@/components/SEO/LocalBusinessSchema';

export const metadata: Metadata = {
  title: "Queens Nails, Hair & Skincare | Best Beauty Salon in Your City",
  description: "Award-winning beauty salon in Your City offering expert nail, hair, and skincare services. Book your appointment at Queens Nails, Hair & Skincare today!",
  alternates: {
    canonical: "https://queensnails.live/queens-nails-hair-skincare",
  },
  openGraph: {
    title: "Queens Nails, Hair & Skincare | Best Beauty Salon in Your City",
    description: "Top-rated salon for nails, hair, and skincare in Your City. See our services and book online.",
    url: "https://queensnails.live/queens-nails-hair-skincare",
    type: "website",
    images: [
      {
        url: "https://queensnails.live/gallery/og-image.jpg",
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
    images: ["https://queensnails.live/gallery/og-image.jpg"],
  },
};

export default function QueensNailsPage() {
  return (
    <>
      <LocalBusinessSchema />
      <header>
        <nav aria-label="Main navigation">
          <ul className="flex gap-4">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/#services">Services</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
        <h1>Queens Nails, Hair & Skincare</h1>
        <p className="sr-only">Award-winning beauty salon in Your City</p>
      </header>
      <main>
        <section aria-labelledby="services">
          <h2 id="services">Our Beauty Services</h2>
          <article>
            <h3>Nail Services</h3>
            <p>Manicures, pedicures, gel nails, nail art, and more.</p>
          </article>
          <article>
            <h3>Hair Services</h3>
            <p>Haircuts, coloring, styling, and treatments for all hair types.</p>
          </article>
          <article>
            <h3>Skincare</h3>
            <p>Facials, waxing, and advanced skincare treatments.</p>
          </article>
        </section>
        <section aria-labelledby="about">
          <h2 id="about">About Queens Nails, Hair & Skincare</h2>
          <p>Located in the heart of Your City, we provide top-rated beauty services with a focus on customer satisfaction and hygiene.</p>
        </section>
        <section aria-labelledby="gallery">
          <h2 id="gallery">Gallery</h2>
          <Image
            src="/gallery/salon-interior.jpg"
            alt="Modern interior of Queens Nails, Hair & Skincare salon"
            width={800}
            height={533}
            priority
          />
        </section>
        <section aria-labelledby="contact">
          <h2 id="contact">Contact & Location</h2>
          <address>
            <strong>Queens Nails, Hair & Skincare</strong><br />
            123 Main St, Your City, State ZIP<br />
            <a href="tel:+1234567890">(123) 456-7890</a><br />
            <span>Open: Mon–Sat 9am–7pm</span>
          </address>
          <div style={{ width: '100%', maxWidth: 800 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d..."
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Queens Nails, Hair & Skincare Location"
            ></iframe>
          </div>
        </section>
      </main>
      <footer>
        <nav aria-label="Footer navigation">
          {/* ...footer links... */}
        </nav>
        <p>&copy; {new Date().getFullYear()} Queens Nails, Hair & Skincare</p>
      </footer>
    </>
  );
}

// Revalidate the page with ISR to keep content fresh while serving static HTML to crawlers
export const revalidate = 3600; // 1 hour

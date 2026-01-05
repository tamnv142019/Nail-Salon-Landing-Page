import dynamic from 'next/dynamic';
import { SEO } from '../../components/SEO/SEO';
import { getPageSEOConfig } from '../../config/seo.config';
import { ClientHeader } from '../../components/ClientHeader';
import { Footer } from '../../components/Footer';

// Dynamically load the client-only GoogleReviews component on the client (no SSR)
const GoogleReviewsClient = dynamic(
  () => import('../../components/GoogleReviews').then((m) => m.GoogleReviews),
  { ssr: false }
);

export default function Page() {
  const cfg = getPageSEOConfig('home');

  return (
    <>
      <SEO
        title={"Reviews - Queen's Nails Hair and Skincare"}
        description={"See what our clients say — real Google reviews and testimonials for our San Diego salon."}
        canonical={`${cfg.canonical.replace(/\/$/, '')}/reviews`}
        keywords={"nail salon reviews, queen's nails reviews, san diego reviews"}
      />

      {/* Navigation/Header (client) */}
      <ClientHeader />

      <main>
        <GoogleReviewsClient />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

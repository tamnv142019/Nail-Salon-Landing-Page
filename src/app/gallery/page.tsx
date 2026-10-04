import { SEO } from '../../components/SEO/SEO';
import { getPageSEOConfig } from '../../config/seo.config';
import { Gallery } from '../../components/Gallery';
import { ClientHeader } from '../../components/ClientHeader';
import { Footer } from '../../components/Footer';
import { PageIntro } from '../../components/PageIntro';

export default function Page() {
  const cfg = getPageSEOConfig('home'); // use home config as base; can add specific config later

  return (
    <>
      <SEO
        title={"Gallery - Queen’s Nails Hair and Skincare"}
        description={"Browse our gallery of nail art, manicures, pedicures and salon transformations in San Diego."}
        canonical={`${cfg.canonical.replace(/\/$/, '')}/gallery`}
        keywords={"nail gallery, nail art San Diego, manicure gallery, pedicure gallery"}
      />

      {/* Navigation/Header (client) */}
      <ClientHeader />

      <main>
        <PageIntro eyebrow="THE DETAILS MAKE THE DIFFERENCE" title="A closer look at our work." description="Explore nail finishes, colors and inspiration from our Ocean Beach salon. Select a photo to see the details." />
        <Gallery />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

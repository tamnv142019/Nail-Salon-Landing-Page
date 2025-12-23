
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { TopCTAs } from '../components/ScrollToTopButton';
import { FloatingCallButton } from '../components/FloatingCallButton';
import { FloatingFollowButtons } from '../components/FloatingFollowButtons';
import { Roboto } from 'next/font/google';
import Script from 'next/script';
import { GoogleTagManager } from '@next/third-parties/google';
import { seoConfig, businessInfo, generateBusinessSchema, generateFAQSchema, generateServiceSchema, generateBreadcrumbSchema } from '../config/seo.config';

const roboto = Roboto({ subsets: ['latin'], weight: ['300', '400', '500', '700'], display: 'swap' });

export const metadata: Metadata = {
  title: "Queen's Nails Hair & Skincare | Best Nail Salon in Ocean Beach, San Diego",
  description:
    "Best nail salon in Ocean Beach offering luxury manicures, pedicures, nail art, and spa services.",
  icons: {
    icon: [
      { url: "/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon.ico", type: "image/x-icon" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      { rel: "manifest", url: "/favicon/site.webmanifest" },
    ],
  },
  themeColor: seoConfig.metaTags?.themeColor || '#be123c',
  openGraph: {
    title: "Queen's Nails Hair & Skincare",
    description:
      "Best nail salon in Ocean Beach offering luxury manicures, pedicures, nail art, and spa services.",
    url: businessInfo.url,
    siteName: businessInfo.name,
    images: [
      {
        url: 'https://queensobnail.com/logo.jpg',
        width: 1200,
        height: 630,
        alt: businessInfo.name,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Queen's Nails Hair & Skincare",
    description:
      "Best nail salon in Ocean Beach offering luxury manicures, pedicures, nail art, and spa services.",
    images: ['https://queensobnail.com/logo.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-PLDJTM4B';
  const gtagId = process.env.NEXT_PUBLIC_GTAG_ID || 'AW-17818536782';
  // Build JSON-LD payloads based on configuration flags
  const ld: Array<string> = [];
  if (seoConfig.structuredData?.enableOrganizationSchema || seoConfig.structuredData?.enableLocalBusinessSchema) {
    ld.push(JSON.stringify(generateBusinessSchema(), null, 2));
  }

  if (seoConfig.structuredData?.enableFAQSchema) {
    ld.push(JSON.stringify(generateFAQSchema(), null, 2));
  }

  if (seoConfig.structuredData?.enableServiceSchema) {
    ld.push(JSON.stringify(generateServiceSchema(), null, 2));
  }

  if (seoConfig.structuredData?.enableBreadcrumbSchema) {
    ld.push(JSON.stringify(generateBreadcrumbSchema(), null, 2));
  }

  return (
    <html lang="en" className={roboto.className}>
      <head>
        {/* Favicons & manifest */}
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="theme-color" content={seoConfig.metaTags?.themeColor || '#be123c'} />
        {ld.map((d, i) => (
          <script
            key={`ld-${i}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: d }}
          />
        ))}
        {gtagId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);} 
gtag('js', new Date());
gtag('config', '${gtagId}');`}
            </Script>
          </>
        ) : null}
      </head>
        <body className="antialiased" style={{ fontWeight: 'var(--font-weight-normal)' }}>
        {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
        {/* GA4 gtag removed — tracking now handled via Google Tag Manager */}
        <Providers>{children}</Providers>
        <FloatingCallButton />
        <FloatingFollowButtons />
        <TopCTAs />
      </body>
    </html>
  );
}

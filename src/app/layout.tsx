import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { TopCTAs } from '../components/ScrollToTopButton';
import { FloatingCallButton } from '../components/FloatingCallButton';
import { FloatingFollowButtons } from '../components/FloatingFollowButtons';
import { Great_Vibes, Roboto } from 'next/font/google';
import Script from 'next/script';
import { GoogleTagManager } from '@next/third-parties/google';
import { seoConfig, businessInfo, generateBusinessSchema, generateFAQSchema, generateServiceSchema, generateBreadcrumbSchema, generateWebSiteSchema } from '../config/seo.config';

const roboto = Roboto({ subsets: ['latin'], weight: ['300', '400', '500', '700'], display: 'swap' });
const displayFont = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-display',
});

/**
 * Metadata chuẩn Next.js cho SEO
 * metadataBase: URL gốc cho tất cả các relative URLs (bắt buộc cho Google)
 * applicationName: Tên doanh nghiệp (giúp Google hiển thị Site name)
 */
export const metadata: Metadata = {
  // metadataBase: URL gốc của website (bắt buộc)
  metadataBase: new URL('https://queensobnail.com'),
  
  // applicationName: Tên doanh nghiệp xuất hiện trong Google Search
  applicationName: 'Queen’s Nails Hair and Skincare',
  
  // Title and Description
  title: {
    default: 'Queen’s Nails Hair and Skincare | Ocean Beach Nail Salon', // 58 characters (optimal for SEO)
    template: '%s | Queen’s Nails Hair and Skincare',
  },
  description:
    "Queen’s Nails Hair and Skincare in Ocean Beach, San Diego offers professional manicures, pedicures, gel nails, nail art, hair and skincare services. Book your appointment today.",
  
  // Keywords (optional, nhưng tốt cho SEO)
  keywords: [
    "nail salon ocean beach",
    "manicure san diego",
    "pedicure ocean beach",
    "nail art san diego",
    "beauty salon ocean beach",
    "spa services san diego",
    "gel nails ocean beach",
    "queen’s nails hair and skincare san diego",
  ],
  
  // Authors
  authors: [{ name: 'Queen’s Nails Hair and Skincare' }],
  
  // Creator
  creator: 'Queen’s Nails Hair and Skincare',
  publisher: 'Queen’s Nails Hair and Skincare',
  
  // Favicon - Cấu hình đầy đủ cho Google Search
  icons: {
    // Favicon chính (Google yêu cầu >= 48x48px)
    icon: [
      { url: "/favicon.ico", sizes: "any" }, // Root favicon (crawler-friendly)
      { url: "/favicon/favicon.ico", sizes: "any" }, // Hỗ trợ legacy browsers
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    // Apple Touch Icon (iOS Safari)
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    // Manifest
    other: [
      { rel: "manifest", url: "/favicon/site.webmanifest" },
    ],
  },
  
  // Manifest
  manifest: "/favicon/site.webmanifest",
  
  // OpenGraph (Facebook, LinkedIn)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: businessInfo.url,
    siteName: 'Queen’s Nails Hair and Skincare',
    title: 'Queen’s Nails Hair and Skincare – Nail Salon in Ocean Beach, San Diego',
    description:
      "Queen’s Nails Hair and Skincare in Ocean Beach, San Diego offers professional manicures, pedicures, gel nails, nail art, hair and skincare services. Book your appointment today.",
    images: [
      {
          url: '/images/logos/logo.png', // Sẽ tự động thêm metadataBase
        width: 1200,
        height: 630,
        alt: 'Queen’s Nails Hair and Skincare Logo',
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Queen’s Nails Hair and Skincare',
    description:
      "Queen’s Nails Hair and Skincare in Ocean Beach, San Diego offers professional manicures, pedicures, gel nails, nail art, hair and skincare services. Book your appointment today.",
      images: ['/images/logos/logo.png'],
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verification (nếu bạn có Google Search Console)
  // verification: {
  //   google: 'your-google-verification-code',
  // },
};

export const viewport: Viewport = {
  themeColor: seoConfig.metaTags?.themeColor || '#be123c',
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
  
  // WebSite Schema - QUAN TRỌNG NHẤT cho Site name trong Google Search
  if (seoConfig.structuredData?.enableWebSiteSchema) {
    ld.push(JSON.stringify(generateWebSiteSchema(), null, 2));
  }
  
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
    <html lang="en" className={`${roboto.className} ${displayFont.variable}`}>
      <head>
        {/* Favicons and manifest */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
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

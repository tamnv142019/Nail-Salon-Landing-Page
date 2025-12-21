
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { TopCTAs } from '../components/ScrollToTopButton';
import { FloatingCallButton } from '../components/FloatingCallButton';
import { Roboto } from 'next/font/google';
import Script from 'next/script';
import { seoConfig, businessInfo, generateBusinessSchema, generateFAQSchema, generateServiceSchema, generateBreadcrumbSchema } from '../config/seo.config';

const roboto = Roboto({ subsets: ['latin'], weight: ['300', '400', '500', '700'], display: 'swap' });

export const metadata: Metadata = {
  title: "Queen's Nails Hair & Skincare",
  description:
    "Premier nail salon in Ocean Beach offering luxury manicures, pedicures, nail art, and spa services.",
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
      "Premier nail salon in Ocean Beach offering luxury manicures, pedicures, nail art, and spa services.",
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
      "Premier nail salon in Ocean Beach offering luxury manicures, pedicures, nail art, and spa services.",
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
        {gtmId ? (
          <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }} />
        ) : null}
        {/* GA4 gtag removed — tracking now handled via Google Tag Manager */}
        <Providers>{children}</Providers>
        <FloatingCallButton />
        <TopCTAs />
        {gtmId ? (
          <Script id="gtm-script" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','` + gtmId + `');`}
          </Script>
        ) : null}
      </body>
    </html>
  );
}

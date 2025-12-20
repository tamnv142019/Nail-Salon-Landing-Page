
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { TopCTAs } from '../components/ScrollToTopButton';
import { Roboto } from 'next/font/google';
import { GoogleTagManager } from '@next/third-parties/google';
import { seoConfig } from '../config/seo.config';

const roboto = Roboto({ subsets: ['latin'], weight: ['300', '400', '500', '700'], display: 'swap' });

export const metadata: Metadata = {
  title: "Queen's Nails Hair & Skincare",
  description:
    "Premier nail salon in San Diego offering luxury manicures, pedicures, nail art, and spa services.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtagId = process.env.NEXT_PUBLIC_GTAG_ID || 'G-2E6K5EK8E1';
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-PLDJTM4B';

  return (
    <html lang="en" className={roboto.className}>
        <body className="antialiased" style={{ fontWeight: 'var(--font-weight-normal)' }}>
        {gtagId ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gtagId}');`,
              }}
            />
          </>
        ) : null}
        <Providers>{children}</Providers>
        <TopCTAs />
        {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
      </body>
    </html>
  );
}

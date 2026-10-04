import type { Metadata } from 'next';
import { businessInfo } from '../config/seo.config';

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${businessInfo.url}${path}`;
  const images = [{ url: '/images/misc/og-home.png', alt: businessInfo.name }];
  return {
    title, description, alternates: { canonical: url },
    openGraph: { title, description, url, siteName: businessInfo.name, type: 'website', images },
    twitter: { card: 'summary_large_image', title, description, images: ['/images/misc/og-home.png'] },
  };
}

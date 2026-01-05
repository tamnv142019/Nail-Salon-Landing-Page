"use client";

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { businessInfo } from '../../config/seo.config';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'business.business';
  keywords?: string;
  schema?: object | object[];
  noindex?: boolean;
}

export function SEO({
  title,
  description,
  canonical = businessInfo.url,
  ogImage = `${businessInfo.url}/favicon/android-chrome-512x512.png`,
  ogType = 'website',
  keywords,
  schema,
  noindex = false,
}: SEOProps) {
  const fullTitle = title.includes('Queen\'s Nails') 
    ? title 
    : `${title} | Queen's Nails Hair and Skincare`;

  useEffect(() => {
    // Ensure document title is set (Next metadata can override on hydration)
    try {
      if (typeof document !== 'undefined') {
        document.title = fullTitle;

        const setMeta = (selector: string, attr: string, value: string) => {
          let el = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
          if (el) {
            if (attr === 'href') (el as HTMLLinkElement).href = value;
            else (el as HTMLMetaElement).content = value;
          } else {
            if (selector.startsWith('link')) {
              const link = document.createElement('link');
              link.setAttribute('rel', 'canonical');
              link.setAttribute('href', value);
              document.head.appendChild(link);
            } else {
              const meta = document.createElement('meta');
              const parts = selector.replace(/^meta\[|\]$/g, '').split('=');
              if (parts[0] === 'name') meta.setAttribute('name', parts[1].replace(/"/g, ''));
              if (parts[0] === 'property') meta.setAttribute('property', parts[1].replace(/"/g, ''));
              meta.setAttribute('content', value);
              document.head.appendChild(meta);
            }
          }
        };

        setMeta('meta[name="description"]', 'content', description);
        setMeta('meta[property="og:title"]', 'content', fullTitle);
        setMeta('meta[property="og:description"]', 'content', description);
        setMeta('meta[property="og:image"]', 'content', ogImage);
        setMeta('link[rel="canonical"]', 'href', canonical);
      }
    } catch (e) {
      // noop
    }
  }, [fullTitle, description, ogImage, canonical]);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={description} />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta itemProp="name" content={fullTitle} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={ogImage} />
      <meta property="og:site_name" content="Queen's Nails Hair and Skincare" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={description} />
      
      {/* JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(schema) ? schema : schema)}
        </script>
      )}
    </Helmet>
  );
}

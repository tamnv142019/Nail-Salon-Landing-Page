/**
 * SEO Utility Components
 * Provides semantic HTML components and utilities for better SEO optimization
 */

import React from 'react';

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * Semantic heading component with proper hierarchy
 */
export function Heading({ level, children, className = '', id }: HeadingProps) {
  const Component = `h${level}` as const;
  return (
    <Component id={id} className={className}>
      {children}
    </Component>
  );
}

interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
}

export function Paragraph({ children, className = '' }: ParagraphProps) {
  return <p className={className}>{children}</p>;
}

/**
 * Image component with lazy loading and responsive images
 */
interface ImageProps {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export function Image({
  src,
  alt,
  title,
  width,
  height,
  className = '',
  loading = 'lazy',
}: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      title={title}
      width={width}
      height={height}
      className={className}
      loading={loading}
    />
  );
}

/**
 * SEO-friendly link component
 */
interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
  title?: string;
  ariaLabel?: string;
}

export function Link({
  href,
  children,
  className = '',
  target,
  rel,
  title,
  ariaLabel,
}: LinkProps) {
  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      title={title}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}

/**
 * Schema.org structured data generator
 */
interface SchemaProps {
  data: Record<string, any>;
}

export function StructuredData({ data }: SchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

/**
 * Meta tags helper for dynamic content
 */
interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
}

export function MetaTags({
  title,
  description,
  keywords,
  ogImage,
  ogUrl,
  ogType = 'website',
}: MetaTagsProps) {
  // This component should be used in the document head
  // You may need to use a library like react-helmet for better meta tag management
  return null;
}

/**
 * Breadcrumb navigation for better SEO
 */
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <nav aria-label="breadcrumb" className="flex gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <a href={item.url} className="text-brand-gold-muted hover:text-brand-gold">
              {item.name}
            </a>
            {index < items.length - 1 && <span className="text-foreground">/</span>}
          </div>
        ))}
      </nav>
    </>
  );
}

/**
 * FAQ Schema for SEO
 */
// FAQ schema is generated centrally in `src/config/seo.config.ts` via `generateFAQSchema()`
// to avoid duplicate JSON-LD blocks on pages. Use that generator instead of
// including another inline FAQ JSON-LD component here.

/**
 * Review/Rating Schema
 */
interface ReviewProps {
  productName: string;
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}

export function ReviewSchema({
  productName,
  author,
  rating,
  reviewBody,
  datePublished,
}: ReviewProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: productName,
    },
    author: {
      '@type': 'Person',
      name: author,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: reviewBody,
    datePublished: datePublished,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

/**
 * Service schema for SEO - used to describe salon services
 */
interface ServiceProps {
  name: string;
  description: string;
  image?: string;
  price?: string | number;
  priceCurrency?: string;
  serviceType?: string;
}

export function ServiceSchema({
  name,
  description,
  image,
  price,
  priceCurrency = 'USD',
  serviceType = 'BeautySalon',
}: ServiceProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: name,
    description: description,
    serviceType: serviceType,
    ...(image && { image: image }),
    ...(price && {
      offers: {
        '@type': 'Offer',
        price: price,
        priceCurrency: priceCurrency,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

/**
 * Main entity schema for enhanced SEO visibility
 */
interface MainEntityProps {
  '@context'?: string;
  '@type': string;
  name: string;
  description?: string;
  image?: string | string[];
  [key: string]: any;
}

export function MainEntity(props: MainEntityProps) {
  const schema = {
    '@context': props['@context'] || 'https://schema.org',
    ...props,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

/**
 * Article/BlogPost schema for content pages
 */
interface ArticleSchemaProps {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  publisher?: string;
}

export function ArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author = "Queen's Nails Hair & Skincare",
  publisher = "Queen's Nails Hair & Skincare",
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: headline,
    description: description,
    ...(image && { image: image }),
    datePublished: datePublished,
    ...(dateModified && { dateModified: dateModified }),
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: publisher,
        logo: {
        '@type': 'ImageObject',
        url: 'https://queensobnail.com/images/logos/logo.jpg',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

/**
 * Section element with semantic HTML
 */
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  ariaLabel?: string;
}

export function Section({
  children,
  className = '',
  id,
  ariaLabel,
}: SectionProps) {
  return (
    <section id={id} className={className} aria-label={ariaLabel}>
      {children}
    </section>
  );
}

/**
 * Article element with semantic HTML
 */
interface ArticleProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Article({ children, className = '', id }: ArticleProps) {
  return (
    <article id={id} className={className}>
      {children}
    </article>
  );
}

/**
 * Aside element with semantic HTML
 */
interface AsideProps {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function Aside({ children, className = '', ariaLabel }: AsideProps) {
  return (
    <aside className={className} aria-label={ariaLabel}>
      {children}
    </aside>
  );
}

/**
 * Navigation with semantic HTML
 */
interface NavProps {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function Nav({ children, className = '', ariaLabel }: NavProps) {
  return (
    <nav className={className} aria-label={ariaLabel}>
      {children}
    </nav>
  );
}

/**
 * Utility function to generate Open Graph meta tags
 */
export function getOpenGraphTags(config: {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
}) {
  return {
    'og:title': config.title,
    'og:description': config.description,
    ...(config.image && { 'og:image': config.image }),
    ...(config.url && { 'og:url': config.url }),
    ...(config.type && { 'og:type': config.type }),
  };
}

/**
 * Utility function to generate Twitter Card meta tags
 */
export function getTwitterCardTags(config: {
  title: string;
  description: string;
  image?: string;
  card?: 'summary' | 'summary_large_image' | 'app' | 'player';
}) {
  return {
    'twitter:card': config.card || 'summary_large_image',
    'twitter:title': config.title,
    'twitter:description': config.description,
    ...(config.image && { 'twitter:image': config.image }),
  };
}

/**
 * Performance metrics for SEO monitoring
 */
export interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  cls?: number; // Cumulative Layout Shift
  fid?: number; // First Input Delay
  ttfb?: number; // Time to First Byte
}

/**
 * Get Core Web Vitals metrics
 */
export function getCoreWebVitals(callback: (metrics: PerformanceMetrics) => void) {
  const metrics: PerformanceMetrics = {};

  // Use Web Vitals if available
  if ('PerformanceObserver' in window) {
    // Largest Contentful Paint
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
          renderTime?: number;
          loadTime?: number;
        };
        metrics.lcp = Math.round(lastEntry.renderTime ?? lastEntry.loadTime ?? 0);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // LCP not supported
    }

    // Cumulative Layout Shift
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            const firstSessionEntry = (entry as any);
            clsValue += firstSessionEntry.value;
            metrics.cls = Math.round(clsValue * 1000) / 1000;
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // CLS not supported
    }
  }

  // Get navigation timing
  if ('PerformanceTiming' in window) {
    const perfTiming = window.performance.timing;
    metrics.ttfb = perfTiming.responseStart - perfTiming.navigationStart;
  }

  callback(metrics);
}

/**
 * Generate structured breadcrumb JSON-LD
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate service item schema
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  price?: string | number;
  priceCurrency?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    ...(service.image && { image: service.image }),
    ...(service.price && {
      offers: {
        '@type': 'Offer',
        price: service.price,
        priceCurrency: service.priceCurrency || 'USD',
      },
    }),
  };
}

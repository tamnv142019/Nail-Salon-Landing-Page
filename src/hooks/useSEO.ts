/**
 * SEO Hook
 * Custom React hook for managing SEO metadata and dynamic page titles
 */

import { useEffect } from 'react';
import { PageSEOConfig } from '../config/seo.config';

export function useSEO(config: PageSEOConfig) {
  useEffect(() => {
    // Update document title
    document.title = config.title;

    // Update description meta tag
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.setAttribute('name', 'description');
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.setAttribute('content', config.description);

    // Update keywords meta tag
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (!keywordsMeta) {
      keywordsMeta = document.createElement('meta');
      keywordsMeta.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsMeta);
    }
    keywordsMeta.setAttribute('content', config.keywords.join(', '));

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', config.canonical);

    // Update Open Graph tags
    updateMetaProperty('og:title', config.title);
    updateMetaProperty('og:description', config.description);
    if (config.ogImage) {
      updateMetaProperty('og:image', config.ogImage);
    }
    if (config.ogType) {
      updateMetaProperty('og:type', config.ogType);
    }
    updateMetaProperty('og:url', config.canonical);

    // Update Twitter Card tags
    updateMeta('twitter:title', config.title);
    updateMeta('twitter:description', config.description);

    // Scroll to top when page changes (optional)
    window.scrollTo(0, 0);
  }, [config]);
}

/**
 * Update or create meta tag
 */
function updateMeta(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

/**
 * Update or create meta property tag (for og:, twitter:, etc.)
 */
function updateMetaProperty(property: string, content: string) {
  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

/**
 * Hook to add structured data to page head
 */
export function useStructuredData(schema: Record<string, any>) {
  useEffect(() => {
    // Create script tag for structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    // Cleanup - remove script on unmount
    return () => {
      script.remove();
    };
  }, [schema]);
}

/**
 * Hook to set page title and description
 */
export function usePageTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = title;

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }
  }, [title, description]);
}

/**
 * Hook to add breadcrumb navigation schema
 */
export function useBreadcrumbs(
  items: Array<{
    name: string;
    url: string;
  }>
) {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [items]);
}

/**
 * Hook for tracking Core Web Vitals and performance metrics
 */
export function useWebVitals(
  callback?: (metrics: {
    fcp?: number;
    lcp?: number;
    cls?: number;
    fid?: number;
  }) => void
) {
  useEffect(() => {
    const metrics: Record<string, number> = {};

    // Check if PerformanceObserver is available
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          const lcp = Math.round((lastEntry.renderTime || lastEntry.loadTime) || 0);
          metrics['lcp'] = lcp;

          if (callback) {
            callback(metrics as any);
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        return () => lcpObserver.disconnect();
      } catch (e) {
        // LCP not supported
      }
    }
  }, [callback]);
}

/**
 * Hook to add Open Graph meta tags
 */
export function useOpenGraph(config: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}) {
  useEffect(() => {
    if (config.title) updateMetaProperty('og:title', config.title);
    if (config.description)
      updateMetaProperty('og:description', config.description);
    if (config.image) updateMetaProperty('og:image', config.image);
    if (config.url) updateMetaProperty('og:url', config.url);
    if (config.type) updateMetaProperty('og:type', config.type);
  }, [config]);
}

/**
 * Hook to add Twitter Card meta tags
 */
export function useTwitterCard(config: {
  title?: string;
  description?: string;
  image?: string;
  card?: string;
}) {
  useEffect(() => {
    if (config.title) updateMeta('twitter:title', config.title);
    if (config.description) updateMeta('twitter:description', config.description);
    if (config.image) updateMeta('twitter:image', config.image);
    if (config.card) updateMeta('twitter:card', config.card);
  }, [config]);
}

import React, { createContext, useContext, useEffect } from 'react';

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  canonical?: string;
}

interface SEOContextType {
  metadata: SEOMetadata;
  setMetadata: (metadata: SEOMetadata) => void;
  updateTitle: (title: string) => void;
  updateDescription: (description: string) => void;
}

const SEOContext = createContext<SEOContextType | undefined>(undefined);

interface SEOProviderProps {
  children: React.ReactNode;
}

export function SEOProvider({ children }: SEOProviderProps) {
  const [metadata, setMetadata] = React.useState<SEOMetadata>({
    title: "Queen's Nails Hair & Skincare - Premium Nail Salon in San Diego",
    description:
      'Premium nail salon in San Diego offering professional nail care, hair services, and skincare treatments. Book your appointment today!',
    keywords:
      'nail salon, nail care, manicure, pedicure, hair salon, skincare, San Diego',
    ogImage: 'https://queensnails.live/og-image.jpg',
    ogUrl: 'https://queensnails.live',
    ogType: 'website',
    canonical: 'https://queensnails.live/',
  });

  const updateTitle = (title: string) => {
    setMetadata((prev) => ({ ...prev, title }));
    document.title = title;
  };

  const updateDescription = (description: string) => {
    setMetadata((prev) => ({ ...prev, description }));
    updateMetaTag('description', description);
  };

  const updateMetaTag = (name: string, content: string) => {
    let element = document.querySelector(`meta[name="${name}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute('name', name);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  const updateOGMetaTag = (property: string, content: string) => {
    let element = document.querySelector(`meta[property="${property}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute('property', property);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  useEffect(() => {
    // Update all meta tags when metadata changes
    document.title = metadata.title;
    updateMetaTag('description', metadata.description);

    if (metadata.keywords) {
      updateMetaTag('keywords', metadata.keywords);
    }

    if (metadata.ogImage) {
      updateOGMetaTag('og:image', metadata.ogImage);
    }

    if (metadata.ogUrl) {
      updateOGMetaTag('og:url', metadata.ogUrl);
    }

    if (metadata.ogType) {
      updateOGMetaTag('og:type', metadata.ogType);
    }

    if (metadata.canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', metadata.canonical);
    }
  }, [metadata]);

  return (
    <SEOContext.Provider
      value={{
        metadata,
        setMetadata,
        updateTitle,
        updateDescription,
      }}
    >
      {children}
    </SEOContext.Provider>
  );
}

export function useSEO() {
  const context = useContext(SEOContext);
  if (!context) {
    throw new Error('useSEO must be used within SEOProvider');
  }
  return context;
}

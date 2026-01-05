import { businessInfo } from '../config/seo.config';

interface BusinessSchemaProps {
  name?: string;
  description?: string;
  url?: string;
  telephone?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  image?: string;
  priceRange?: string;
}

const BRAND_NAME = 'Queen’s Nails Hair and Skincare';
const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/Bc8jystzMK7y5Ct49';

function toOpeningHoursStrings(hours: Array<{ dayOfWeek: string[]; opens: string; closes: string }>) {
  const dayToAbbrev: Record<string, string> = {
    Monday: 'Mo',
    Tuesday: 'Tu',
    Wednesday: 'We',
    Thursday: 'Th',
    Friday: 'Fr',
    Saturday: 'Sa',
    Sunday: 'Su',
  };

  return hours.map(({ dayOfWeek, opens, closes }) => {
    const abbrevs = dayOfWeek.map((d) => dayToAbbrev[d] ?? d);
    const dayPart =
      abbrevs.length >= 2 && abbrevs[0] === 'Mo' && abbrevs[abbrevs.length - 1] === 'Fr'
        ? 'Mo-Fr'
        : abbrevs.join(',');
    return `${dayPart} ${opens}-${closes}`;
  });
}

export function generateLocalBusinessSchema(props?: BusinessSchemaProps) {
  const defaults = {
    name: BRAND_NAME,
    description: businessInfo.description,
    url: businessInfo.url,
    telephone: businessInfo.phone,
    address: {
      streetAddress: businessInfo.address.streetAddress,
      addressLocality: 'San Diego',
      addressRegion: businessInfo.address.addressRegion,
      postalCode: businessInfo.address.postalCode,
      addressCountry: 'US'
    },
    geo: {
      latitude: businessInfo.geo.latitude,
      longitude: businessInfo.geo.longitude
    },
    image: "https://queensobnail.com/images/logos/logo.png",
    priceRange: "$$"
  };

  const data = { ...defaults, ...props };

  return {
    "@context": "https://schema.org",
    "@type": "NailSalon",
    "name": data.name,
    "description": data.description,
    "url": data.url,
    "telephone": data.telephone,
    "email": "support@queensobnail.com",
    "areaServed": "Ocean Beach, San Diego",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": data.address.streetAddress,
      "addressLocality": data.address.addressLocality,
      "addressRegion": data.address.addressRegion,
      "postalCode": data.address.postalCode,
      "addressCountry": data.address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": data.geo.latitude.toString(),
      "longitude": data.geo.longitude.toString()
    },
    "image": data.image,
    "priceRange": data.priceRange,
    "openingHours": toOpeningHoursStrings(businessInfo.openingHours),
    "openingHoursSpecification": businessInfo.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": h.dayOfWeek,
      "opens": h.opens,
      "closes": h.closes,
    })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": Array.from(
      new Set(
        [
          GOOGLE_MAPS_URL,
          businessInfo.social?.facebook,
          businessInfo.social?.yelp,
          businessInfo.social?.instagram,
          businessInfo.social?.twitter,
        ].filter(Boolean) as string[]
      )
    )
  };
}

interface ServiceSchemaProps {
  name: string;
  description: string;
  price?: string;
  url?: string;
}

export function generateServiceSchema(service: ServiceSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.name,
    "provider": {
      "@type": "NailSalon",
      "name": BRAND_NAME,
      "telephone": businessInfo.phone,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": businessInfo.address.streetAddress,
        "addressLocality": 'San Diego',
        "addressRegion": businessInfo.address.addressRegion,
        "postalCode": businessInfo.address.postalCode,
        "addressCountry": businessInfo.address.addressCountry
      }
    },
    "description": service.description,
    "url": service.url || "https://queensobnail.com/services",
    "areaServed": {
      "@type": "City",
      "name": "San Diego",
      "containedInPlace": {
        "@type": "State",
        "name": "California"
      }
    },
    ...(service.price && {
      "offers": {
        "@type": "Offer",
        "price": service.price,
        "priceCurrency": "USD"
      }
    })
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function generateWebPageSchema(props: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": props.name,
    "description": props.description,
    "url": props.url,
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "name": BRAND_NAME,
      "url": businessInfo.url
    }
  };
}

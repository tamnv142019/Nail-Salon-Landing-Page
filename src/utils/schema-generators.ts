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

export function generateLocalBusinessSchema(props?: BusinessSchemaProps) {
  const defaults = {
    name: "Queen's Nails Hair and Skincare",
    description: "Top-rated nail salon in Ocean Beach, San Diego — top manicures, pedicures, gel nails, and custom nail art.",
    url: "https://queensobnail.com",
    telephone: "(619) 224-5050",
    address: {
      streetAddress: "4869 Santa Monica Ave",
      addressLocality: "Ocean Beach, San Diego",
      addressRegion: "CA",
      postalCode: "92107",
      addressCountry: "US"
    },
    geo: {
      latitude: 32.7157,
      longitude: -117.1611
    },
    image: "https://queensobnail.com/images/logos/logo.png",
    priceRange: "$$"
  };

  const data = { ...defaults, ...props };

  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": data.name,
    "description": data.description,
    "url": data.url,
    "telephone": data.telephone,
    "email": "support@queensobnail.com",
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
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "10:00",
        "closes": "17:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=100075740667723",
      "https://www.instagram.com/queensnailssandiego",
      "https://www.yelp.com/biz/queen-s-nails-hair-and-skincare-san-diego-2"
    ]
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
      "@type": "BeautySalon",
      "name": "Queen's Nails Hair and Skincare",
      "telephone": "(619) 224-5050",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "4869 Santa Monica Ave",
        "addressLocality": "San Diego",
        "addressRegion": "CA",
        "postalCode": "92107",
        "addressCountry": "US"
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
      "name": "Queen's Nails Hair and Skincare",
      "url": "https://queensobnail.com"
    }
  };
}

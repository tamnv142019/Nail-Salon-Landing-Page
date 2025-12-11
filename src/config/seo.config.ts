/**
 * SEO Configuration
 * Central configuration for all SEO settings, metadata, and best practices
 */

export interface BusinessInfo {
  name: string;
  description: string;
  url: string;
  email: string;
  phone: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  social: {
    facebook?: string;
    instagram?: string;
    yelp?: string;
    twitter?: string;
  };
  openingHours: Array<{
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }>;
}

export const businessInfo: BusinessInfo = {
  name: "Queen's Nails Hair & Skincare",
  description:
    'Premium nail salon, hair salon, and skincare services in San Diego',
  url: 'https://queensnails.live',
  email: 'info@queensnails.live',
  phone: '(619) 224-5050',
  address: {
    streetAddress: '4869 Santa Monica Ave',
    addressLocality: 'San Diego',
    addressRegion: 'CA',
    postalCode: '92107',
    addressCountry: 'US',
  },
  geo: {
    latitude: 32.7157,
    longitude: -117.1611,
  },
  social: {
    facebook: 'https://www.facebook.com/queensnails',
    instagram: 'https://www.instagram.com/queensnails',
    yelp: 'https://www.yelp.com/biz/queens-nails',
    twitter: 'https://twitter.com/queensnails',
  },
  openingHours: [
    {
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '19:00',
    },
    {
      dayOfWeek: ['Saturday'],
      opens: '10:00',
      closes: '18:00',
    },
    {
      dayOfWeek: ['Sunday'],
      opens: '12:00',
      closes: '17:00',
    },
  ],
};

/**
 * Page-specific SEO metadata
 */
export interface PageSEOConfig {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogImage?: string;
  ogType?: string;
  articleData?: {
    datePublished: string;
    dateModified?: string;
    author?: string;
  };
}

export const pageConfigs: Record<string, PageSEOConfig> = {
  home: {
    title: "Queen's Nails Hair & Skincare - Premium Nail Salon in San Diego",
    description:
      "Premium nail salon in San Diego offering professional nail care, hair services, and skincare treatments. Book your appointment today!",
    keywords: [
      'nail salon',
      'nail care',
      'manicure',
      'pedicure',
      'hair salon',
      'skincare',
      'San Diego',
      'beauty salon',
      'nail polish',
      'gel manicure',
    ],
    canonical: 'https://queensnails.com/',
    ogType: 'website',
  },
  services: {
    title:
      "Our Services - Queen's Nails Hair & Skincare | Nail Salon San Diego",
    description:
      'Explore our full range of professional services including manicures, pedicures, hair styling, and skincare treatments at our San Diego salon.',
    keywords: [
      'nail services',
      'manicure',
      'pedicure',
      'gel nails',
      'acrylic nails',
      'hair services',
      'skincare treatments',
      'nail art',
      'San Diego salon',
    ],
    canonical: 'https://queensnails.com/services',
    ogType: 'website',
  },
  about: {
    title: "About Queen's Nails Hair & Skincare | San Diego Nail Salon",
    description:
      'Learn about our salon, our mission, and our team of experienced professionals dedicated to providing exceptional beauty services.',
    keywords: [
      'about salon',
      'salon team',
      'professional beauty',
      'San Diego nail salon',
      'salon experience',
    ],
    canonical: 'https://queensnails.com/about',
    ogType: 'business.business',
  },
  contact: {
    title:
      "Contact Queen's Nails Hair & Skincare | San Diego Nail Salon",
    description:
      'Get in touch with us for appointments, inquiries, or special requests. Visit our San Diego location or call us today.',
    keywords: [
      'contact salon',
      'appointment booking',
      'San Diego salon',
      'salon phone',
      'salon location',
    ],
    canonical: 'https://queensnails.com/contact',
    ogType: 'business.business',
  },
};

/**
 * Service data for schema generation
 */
export interface ServiceInfo {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price?: string;
  image?: string;
  duration?: string;
  category: string;
}

export const services: ServiceInfo[] = [
  {
    id: 'manicure',
    name: 'Manicures',
    description: 'Professional manicure services',
    longDescription:
      'Choose from classic manicures, gel manicures, or express manicures. Our skilled technicians will ensure your nails look beautiful and last longer.',
    category: 'Nail Care',
  },
  {
    id: 'pedicure',
    name: 'Pedicures',
    description: 'Professional pedicure services',
    longDescription:
      'Relax and enjoy our foot spa while our technicians care for your feet with precision and expertise.',
    category: 'Nail Care',
  },
  {
    id: 'hair',
    name: 'Hair Services',
    description: 'Professional hair styling and treatment',
    longDescription:
      'From cuts to color, styling to treatments - our hair experts will help you look your best.',
    category: 'Hair',
  },
  {
    id: 'skincare',
    name: 'Skincare',
    description: 'Professional skincare treatments',
    longDescription:
      'Pamper your skin with our range of facials and skincare treatments using premium products.',
    category: 'Skincare',
  },
];

/**
 * SEO Best Practices Configuration
 */
export const seoConfig = {
  // Image optimization
  imageOptimization: {
    enableLazyLoading: true,
    useResponsiveImages: true,
    optimizeImageSizes: true,
    formats: ['webp', 'jpg', 'png'],
  },

  // Performance optimization
  performance: {
    enableGzip: true,
    enableMinification: true,
    enableCodeSplitting: true,
    cacheDuration: 31536000, // 1 year in seconds
  },

  // Structured data
  structuredData: {
    enableLocalBusinessSchema: true,
    enableOrganizationSchema: true,
    enableServiceSchema: true,
    enableBreadcrumbSchema: true,
    enableFAQSchema: true,
  },

  // Meta tags
  metaTags: {
    enableOpenGraph: true,
    enableTwitterCard: true,
    enableThemeColor: true,
    themeColor: '#be123c', // Rose color from your design
  },

  // Accessibility
  accessibility: {
    enableSkipLinks: true,
    enableAriaLabels: true,
    enableHeadingHierarchy: true,
    enableAltText: true,
  },

  // Mobile
  mobile: {
    enableViewportMeta: true,
    enableResponsiveDesign: true,
    enableMobileOptimization: true,
  },
};

/**
 * Common SEO keywords for nail/beauty salon
 */
export const seoKeywords = {
  nailServices: [
    'nail salon',
    'manicure',
    'pedicure',
    'nail art',
    'gel nails',
    'acrylic nails',
    'nail care',
    'nail polish',
    'shellac nails',
  ],
  hairServices: [
    'hair salon',
    'haircut',
    'hair color',
    'hair styling',
    'hair treatment',
    'hair care',
  ],
  skincareServices: [
    'facial',
    'skincare',
    'skin treatment',
    'acne treatment',
    'facial cleanser',
  ],
  location: ['San Diego', 'nail salon near me', 'beauty salon San Diego'],
  intent: [
    'book appointment',
    'schedule',
    'pricing',
    'services',
    'reviews',
    'hours',
  ],
};

/**
 * FAQ data for schema generation
 */
export const faqs = [
  {
    question: 'What are your salon hours?',
    answer:
      'We are open Monday-Friday 10am-7pm, Saturday 10am-6pm, and Sunday 12pm-5pm.',
  },
  {
    question: 'Do you accept walk-ins?',
    answer:
      'We accept both appointments and walk-ins. For shorter wait times, we recommend booking an appointment online or calling us.',
  },
  {
    question: 'What services do you offer?',
    answer:
      'We offer manicures, pedicures, nail art, gel nails, hair services, and skincare treatments. Visit our services page for more details.',
  },
  {
    question: 'How long do gel nails last?',
    answer:
      'Gel manicures typically last 2-3 weeks depending on your daily activities and nail growth.',
  },
  {
    question: 'What is your cancellation policy?',
    answer:
      'We require 24 hours notice for cancellations. Cancellations made within 24 hours may be subject to a fee.',
  },
];

/**
 * Get page SEO config by page name
 */
export function getPageSEOConfig(pageName: string): PageSEOConfig {
  return pageConfigs[pageName] || pageConfigs.home;
}

/**
 * Generate structured business data
 */
export function generateBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: businessInfo.name,
    description: businessInfo.description,
    url: businessInfo.url,
    telephone: businessInfo.phone,
    email: businessInfo.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessInfo.address.streetAddress,
      addressLocality: businessInfo.address.addressLocality,
      addressRegion: businessInfo.address.addressRegion,
      postalCode: businessInfo.address.postalCode,
      addressCountry: businessInfo.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: businessInfo.geo.latitude,
      longitude: businessInfo.geo.longitude,
    },
    image: 'https://queensnails.com/logo.png',
    priceRange: '$$',
    openingHoursSpecification: businessInfo.openingHours.map((hours) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes,
    })),
    sameAs: Object.values(businessInfo.social).filter(Boolean),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '250',
    },
  };
}

/**
 * Generate FAQ schema
 */
export function generateFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

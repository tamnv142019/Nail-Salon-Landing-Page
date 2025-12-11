# 🎯 SEO Implementation Guide for Queen's Nails (Vite + React)

## **IMPORTANT**: This is a Vite/React SPA, NOT Next.js

Your project uses **Vite + React**, which requires different SEO strategies than Next.js.

---

## **📋 Section 1: Current SEO Issues Summary**

### ✅ **What's Already Good:**
1. ✅ Comprehensive meta tags in `index.html`
2. ✅ JSON-LD LocalBusiness schema implemented
3. ✅ SEO Context for dynamic meta updates
4. ✅ Sitemap and robots.txt exist
5. ✅ Semantic HTML in some components

### ❌ **Critical Issues to Fix:**

#### **1. SPA Routing SEO Problems**
- ❌ Client-side routing won't be indexed properly without pre-rendering
- ❌ No server-side rendering (SSR) or static generation
- ❌ Meta tags update dynamically but search bots may not execute JavaScript

#### **2. Meta Tags Issues**
- ❌ Sitemap URLs use placeholder domain
- ❌ robots.txt has placeholder URLs  
- ❌ Missing page-specific meta for Services/Privacy/Terms
- ❌ Phone number inconsistency (config vs footer)

#### **3. Structured Data Issues**
- ❌ Missing Service schema for individual services
- ❌ Missing BreadcrumbList schema
- ❌ Missing AggregateRating schema
- ❌ No Product/Offer schema for services

#### **4. Semantic HTML Issues**
- ❌ HomePage missing `<main>` wrapper
- ❌ Inconsistent heading hierarchy
- ❌ Images missing width/height (CLS issues)

#### **5. Performance Issues**
- ❌ Large unoptimized images from Unsplash
- ❌ No lazy loading strategy
- ❌ Large JavaScript bundles
- ❌ No image dimensions causing CLS

---

## **📋 Section 2: Implementation Steps**

### **Step 1: Install Dependencies**

```bash
npm install react-helmet-async
npm install --save-dev vite-plugin-prerender
```

### **Step 2: Create SEO Component**

**File: `src/components/SEO/SEO.tsx`**

```tsx
import { Helmet } from 'react-helmet-async';

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
  canonical = 'https://queensnails.live/',
  ogImage = 'https://queensnails.live/og-image.jpg',
  ogType = 'website',
  keywords,
  schema,
  noindex = false,
}: SEOProps) {
  const fullTitle = title.includes('Queen\'s Nails') 
    ? title 
    : `${title} | Queen's Nails Hair & Skincare`;

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
      <meta property="og:site_name" content="Queen's Nails Hair & Skincare" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(schema) ? schema : schema)}
        </script>
      )}
    </Helmet>
  );
}
```

### **Step 3: Create Schema Generators**

**File: `src/utils/schema-generators.ts`**

```typescript
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
    name: "Queen's Nails Hair & Skincare",
    description: "Premier nail salon, hair salon, and skincare services in San Diego",
    url: "https://queensnails.live",
    telephone: "(619) 224-5050",
    address: {
      streetAddress: "4869 Santa Monica Ave",
      addressLocality: "San Diego",
      addressRegion: "CA",
      postalCode: "92107",
      addressCountry: "US"
    },
    geo: {
      latitude: 32.7157,
      longitude: -117.1611
    },
    image: "https://queensnails.live/logo.png",
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
    "email": "info@queensnails.live",
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
      "https://www.yelp.com/biz/queens-nails-san-diego"
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
      "name": "Queen's Nails Hair & Skincare",
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
    "url": service.url || "https://queensnails.live/services",
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
      "name": "Queen's Nails Hair & Skincare",
      "url": "https://queensnails.live"
    }
  };
}
```

### **Step 4: Update HomePage.tsx**

Add this to the top of your HomePage component:

```tsx
import { SEO } from '../components/SEO/SEO';
import { generateLocalBusinessSchema, generateWebPageSchema } from '../utils/schema-generators';

export function HomePage({ onNavigateToServices, onNavigateToPrivacy, onNavigateToTerms }: HomePageProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // SEO schemas
  const schemas = [
    generateLocalBusinessSchema(),
    generateWebPageSchema({
      name: "Home - Queen's Nails Hair & Skincare",
      description: "Premier nail salon in San Diego offering luxury manicures, pedicures, nail art, and spa services. Expert technicians, premium products, beautiful results.",
      url: "https://queensnails.live/"
    })
  ];

  return (
    <>
      <SEO
        title="Queen's Nails Hair & Skincare - Premier Nail Salon in San Diego"
        description="Premier nail salon in San Diego offering luxury manicures, pedicures, gel nails, nail art, and spa services. Expert technicians, premium products. Book your appointment today!"
        canonical="https://queensnails.live/"
        keywords="nail salon San Diego, manicure San Diego, pedicure San Diego, gel nails, nail art, spa services, Ocean Beach salon"
        ogImage="https://queensnails.live/og-home.jpg"
        schema={schemas}
      />

      <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
        {/* Rest of your component */}
      </main>
    </>
  );
}
```

### **Step 5: Update ServicesPage.tsx**

```tsx
import { SEO } from '../components/SEO/SEO';
import { generateBreadcrumbSchema, generateServiceSchema } from '../utils/schema-generators';

export function ServicesPage({ onNavigateHome, scrollToService }: ServicesPageProps) {
  // ... existing code ...

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://queensnails.live/" },
    { name: "Services", url: "https://queensnails.live/services" }
  ]);

  const serviceSchemas = [
    generateServiceSchema({
      name: "Manicure Services",
      description: "Professional manicure services including regular, European, deluxe, and signature spa manicures",
      price: "20.00"
    }),
    generateServiceSchema({
      name: "Pedicure Services",
      description: "Luxury pedicure services featuring premium products and relaxing massage",
      price: "25.00"
    }),
    generateServiceSchema({
      name: "Organic Nail Powder",
      description: "Dipping powder collection with beautiful and long-lasting finishes",
      price: "45.00"
    })
  ];

  return (
    <>
      <SEO
        title="Services & Pricing - Nail Salon in San Diego"
        description="Explore our nail services: manicures from $20, pedicures from $25, gel nails, dipping powder, nail art, and waxing. Premium quality, expert technicians. Book online!"
        canonical="https://queensnails.live/services"
        keywords="nail services San Diego, manicure prices, pedicure prices, gel nails cost, dipping powder, nail art pricing"
        ogImage="https://queensnails.live/og-services.jpg"
        schema={[breadcrumbSchema, ...serviceSchemas]}
      />

      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
        {/* Rest of component */}
      </div>
    </>
  );
}
```

---

## **📋 Section 4: JSON-LD Schema Examples**

### **Complete LocalBusiness Schema (Already in index.html - Update Phone)**

Update the phone number in `index.html` line ~68:

```json
"telephone": "(619) 224-5050",
```

### **Service Schema for Individual Services**

Already provided in schema-generators.ts above.

### **Aggregate Rating Schema**

```json
{
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  "itemReviewed": {
    "@type": "BeautySalon",
    "name": "Queen's Nails Hair & Skincare"
  },
  "ratingValue": "4.8",
  "reviewCount": "127",
  "bestRating": "5",
  "worstRating": "1"
}
```

---

## **📋 Section 5: Performance & Core Web Vitals**

### **5.1: Image Optimization**

#### **Create Optimized Image Component**

**File: `src/components/OptimizedImage.tsx`** (Already exists - enhance it)

```tsx
import { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  onLoad
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={width && height ? { aspectRatio: `${width}/${height}` } : undefined}
    >
      {/* Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      )}

      {/* Actual Image */}
      <img
        ref={imgRef}
        src={isInView ? src : undefined}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={handleLoad}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={width && height ? { aspectRatio: `${width}/${height}` } : undefined}
      />
    </div>
  );
}
```

### **5.2: Update HeroSection for LCP Optimization**

```tsx
// Add to HeroSection.tsx
<div className="absolute inset-0">
  {backgroundImages.map((image, index) => (
    <div
      key={index}
      className="absolute inset-0 transition-opacity duration-1000"
      style={{
        opacity: index === currentImageIndex ? 1 : 0,
      }}
    >
      <OptimizedImage
        src={image}
        alt={`Queen's Nails Salon Interior ${index + 1}`}
        width={1920}
        height={1080}
        priority={index === 0}  // Preload first image
        className="w-full h-full object-cover"
      />
    </div>
  ))}
  <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60"></div>
</div>
```

### **5.3: Preload Critical Resources**

Add to `index.html` in `<head>`:

```html
<!-- Preload hero image -->
<link rel="preload" as="image" href="https://images.unsplash.com/photo-1595944024804-733665a112db?w=1920&q=75" />

<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin />
```

### **5.4: Update vite.config.ts for Better Code Splitting**

```typescript
export default defineConfig({
  // ... existing config ...
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            // ... other radix components
          ],
          'vendor-icons': ['lucide-react'],
          'vendor-animation': ['motion'],
          'vendor-other': ['recharts', 'sonner'],
        },
      },
    },
    chunkSizeWarningLimit: 400, // Reduce from 500
  },
});
```

---

## **📋 Section 6: Implementation Checklist**

### **Immediate Actions (Week 1)**

- [ ] Install `react-helmet-async`
- [ ] Create `SEO.tsx` component
- [ ] Create `schema-generators.ts` utility
- [ ] Update `App.tsx` with HelmetProvider
- [ ] Add SEO component to HomePage
- [ ] Add SEO component to ServicesPage
- [ ] Fix phone number inconsistency (use 619-224-5050 everywhere)
- [ ] Update sitemap.xml with correct URLs
- [ ] Update robots.txt with correct domain
- [ ] Add proper `<main>` tags to all pages

### **Short Term (Week 2-3)**

- [ ] Enhance OptimizedImage component with lazy loading
- [ ] Add width/height to all images
- [ ] Implement image preloading for hero
- [ ] Add breadcrumb schema to Services page
- [ ] Create service-specific schemas
- [ ] Add aggregate rating schema
- [ ] Optimize code splitting in vite.config
- [ ] Test Core Web Vitals with Lighthouse

### **Medium Term (Month 1)**

- [ ] Consider adding Vite pre-rendering plugin
- [ ] Set up Google Search Console
- [ ] Submit sitemap to Google
- [ ] Monitor indexing status
- [ ] Add structured data testing
- [ ] Implement error tracking
- [ ] Add analytics (Google Analytics 4)

### **Long Term (Ongoing)**

- [ ] Consider migrating to Next.js for better SEO (if budget allows)
- [ ] Regular content updates
- [ ] Monitor Core Web Vitals
- [ ] Update schemas as services change
- [ ] Build quality backlinks
- [ ] Encourage customer reviews
- [ ] Create blog content for SEO

---

## **📋 Critical SEO Best Practices for React SPA**

### **1. Pre-rendering Solution**

Since this is a SPA, consider using `vite-plugin-prerender`:

```bash
npm install --save-dev vite-plugin-prerender
```

**Update vite.config.ts:**

```typescript
import prerender from 'vite-plugin-prerender';

export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: ['/', '/services', '/privacy', '/terms'],
      renderer: '@prerenderer/renderer-puppeteer',
    }),
  ],
});
```

### **2. Meta Tag Best Practices**

- ✅ Keep titles under 60 characters
- ✅ Keep descriptions 150-160 characters
- ✅ Include target keywords naturally
- ✅ Add location (San Diego) to key pages
- ✅ Use action words (Book, Call, Visit)

### **3. Local SEO Keywords to Target**

Primary:
- nail salon san diego
- manicure san diego
- pedicure san diego  
- gel nails san diego
- nail art san diego

Long-tail:
- best nail salon ocean beach
- luxury manicure san diego
- organic nail powder san diego
- nail salon near me (ensure location in meta)

---

## **📊 Testing & Validation**

### **Tools to Use:**

1. **Google Lighthouse** (in Chrome DevTools)
   - Target: 90+ Performance, 100 SEO
   
2. **Google Rich Results Test**
   - https://search.google.com/test/rich-results
   
3. **Schema.org Validator**
   - https://validator.schema.org/

4. **PageSpeed Insights**
   - https://pagespeed.web.dev/

5. **Screaming Frog** (for crawling)
   - Free version for small sites

---

## **🎯 Expected Results Timeline**

- **Week 1-2**: Technical SEO improvements, meta tags fixed
- **Week 3-4**: Schema markup implemented, images optimized
- **Month 2-3**: Google starts indexing improvements
- **Month 3-6**: Rankings improve for local keywords
- **Month 6+**: Sustained organic traffic growth

---

## **⚠️ Important Notes**

1. This is a **React SPA**, not Next.js - SEO will be more challenging
2. Consider migrating to Next.js in the future for:
   - Better SEO with SSR/SSG
   - Automatic code splitting
   - Better Core Web Vitals
   - Native Image optimization

3. For now, focus on:
   - Pre-rendering critical pages
   - Perfect on-page SEO
   - Schema markup
   - Core Web Vitals
   - Local SEO optimization

---

**Need help implementing any of these? Let me know which section to tackle first!**


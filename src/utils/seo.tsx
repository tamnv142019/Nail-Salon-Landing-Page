/**
 * SEO Utility Component
 * Provides semantic HTML components for better SEO
 */

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

export function Heading({ level, children, className = '' }: HeadingProps) {
  const Component = `h${level}` as const;
  return (
    <Component className={className}>
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
            <a href={item.url} className="text-rose-500 hover:text-rose-600">
              {item.name}
            </a>
            {index < items.length - 1 && <span className="text-gray-400">/</span>}
          </div>
        ))}
      </nav>
    </>
  );
}

/**
 * FAQ Schema for SEO
 */
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  items: FAQItem[];
}

export function FAQSchema({ items }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
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

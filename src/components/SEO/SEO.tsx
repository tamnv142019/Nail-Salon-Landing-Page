// Metadata is rendered by Next.js server layouts. This component only emits page-specific JSON-LD.
interface SEOProps {
  title: string; description: string; canonical?: string; ogImage?: string;
  ogType?: 'website' | 'article' | 'business.business'; keywords?: string;
  schema?: object | object[]; noindex?: boolean;
}
export function SEO({ schema }: SEOProps) {
  if (!schema) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />;
}

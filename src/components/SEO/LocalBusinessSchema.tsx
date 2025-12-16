import { generateBusinessSchema, businessInfo } from '../../config/seo.config';

export function LocalBusinessSchema() {
  const businessSchema = generateBusinessSchema();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: businessInfo.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: businessInfo.name,
        item: `${businessInfo.url}/queens-nails-hair-skincare`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}

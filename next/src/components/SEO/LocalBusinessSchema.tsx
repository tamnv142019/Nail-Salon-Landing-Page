export function LocalBusinessSchema() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BeautySalon",
            "name": "Queens Nails, Hair & Skincare",
            "image": "https://queensnails.live/gallery/og-image.jpg",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Main St",
              "addressLocality": "Your City",
              "addressRegion": "State",
              "postalCode": "ZIP",
              "addressCountry": "US"
            },
            "telephone": "+1234567890",
            "openingHours": "Mo-Sa 09:00-19:00",
            "url": "https://queensnails.live/queens-nails-hair-skincare",
            "priceRange": "$$",
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "40.7128",
              "longitude": "-74.0060"
            },
            "sameAs": [
              "https://www.facebook.com/queensnails",
              "https://www.instagram.com/queensnails"
            ],
            "serviceArea": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Your City",
                "addressRegion": "State"
              }
            }
          }),
        }}
      />

      {/* BreadcrumbList for rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://queensnails.live/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Queens Nails, Hair & Skincare",
                "item": "https://queensnails.live/queens-nails-hair-skincare"
              }
            ]
          })
        }}
      />
    </>
  );
}

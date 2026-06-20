export default function PackageJsonLd({ pkg }: { pkg: any }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "name": pkg.name,
        "description": pkg.description,
        "image": pkg.images?.[0],
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "SAR",
          "lowPrice": pkg.startingPrice,
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "Mehar Transport"
          }
        }
      },
      {
        "@type": "TransportationService",
        "name": pkg.name,
        "description": pkg.description,
        "provider": {
          "@type": "Organization",
          "name": "Mehar Transport"
        }
      },
      {
        "@type": "TouristTrip",
        "name": pkg.name,
        "description": pkg.description,
        "itinerary": {
          "@type": "ItemList",
          "itemListElement": pkg.includedRoutes?.map((route: any, idx: number) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "item": {
              "@type": "TouristAttraction",
              "name": route.destination
            }
          })) || []
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is included in this package?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The package includes all listed routes, a private modern vehicle, a professional chauffeur, airport meet & greet, and all taxes. There are no hidden fees."
            }
          },
          {
            "@type": "Question",
            "name": "Can I customize the routes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can book this package as is or use our booking engine to add or modify routes according to your specific needs."
            }
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

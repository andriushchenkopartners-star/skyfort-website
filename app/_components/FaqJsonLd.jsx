// Server-rendered FAQ JSON-LD. Reuses the same FAQ items the client component
// renders on screen so search engines and the visible page stay aligned.
// Pass a `faq` array of { q, a } objects.

export default function FaqJsonLd({ faq, id }) {
  if (!Array.isArray(faq) || faq.length === 0) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(id ? { "@id": id } : {}),
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

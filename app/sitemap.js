export default function sitemap() {
  const baseUrl = "https://sky-fort.ca";
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          "uk-UA": baseUrl,
          "ru-RU": baseUrl,
          "en-CA": baseUrl,
          "x-default": baseUrl,
        },
      },
    },
    // Add more pages here as they're built:
    // /tfsa-guide, /rrsp-guide, /exempt-market, /about, /book-call
    // Each with same alternates.languages structure
  ];
}

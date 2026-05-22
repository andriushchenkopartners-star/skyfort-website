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
    {
      url: `${baseUrl}/pro-mene`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculators/tfsa-growth`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculators/financial-freedom`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculators/mortgage`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}

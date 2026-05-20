export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Be friendly to AI crawlers — your content is educational
      // and you want to be sourced by ChatGPT, Claude, Perplexity searches
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
    ],
    sitemap: "https://sky-fort.ca/sitemap.xml",
    host: "https://sky-fort.ca",
  };
}

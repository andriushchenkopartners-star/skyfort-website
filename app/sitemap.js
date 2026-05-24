import { getAllPosts } from "./_lib/blog";

const BASE = "https://sky-fort.ca";
const LOCALES = ["uk", "ru", "en"];
const HREFLANG = { uk: "uk-UA", ru: "ru-RU", en: "en-CA" };

// Pages available under every locale segment.
const LOCALIZED_PAGES = [
  { path: "",                            priority: 1.0, changeFrequency: "weekly" },
  { path: "/tt",                         priority: 0.9, changeFrequency: "weekly" },
  { path: "/blog",                       priority: 0.9, changeFrequency: "weekly" },
  { path: "/pro-mene",                   priority: 0.8, changeFrequency: "monthly" },
  { path: "/calculators/tfsa-growth",    priority: 0.8, changeFrequency: "monthly" },
  { path: "/calculators/financial-freedom", priority: 0.8, changeFrequency: "monthly" },
  { path: "/calculators/mortgage",       priority: 0.8, changeFrequency: "monthly" },
  { path: "/links",                      priority: 0.5, changeFrequency: "monthly" },
];

// Ukrainian-only landing pages (no locale prefix).
const UA_LANDINGS = [
  { path: "/tfsa-kalkulyator",          priority: 0.7, changeFrequency: "monthly" },
  { path: "/exempt-market-ukrayintsyam", priority: 0.7, changeFrequency: "monthly" },
  { path: "/ipoteka-kalhari",            priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap() {
  const now = new Date();
  const entries = [];

  // For each multilingual page, emit one entry per locale with hreflang alternates.
  for (const page of LOCALIZED_PAGES) {
    const alternates = {};
    for (const l of LOCALES) {
      alternates[HREFLANG[l]] = `${BASE}/${l}${page.path}`;
    }
    alternates["x-default"] = `${BASE}/uk${page.path}`;

    for (const l of LOCALES) {
      entries.push({
        url: `${BASE}/${l}${page.path}`,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: l === "uk" ? page.priority : page.priority - 0.05,
        alternates: { languages: alternates },
      });
    }
  }

  // UA-only landings — single entry each, no alternates.
  for (const page of UA_LANDINGS) {
    entries.push({
      url: `${BASE}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  }

  // Blog posts — one entry per locale that has the slug.
  for (const locale of LOCALES) {
    const posts = getAllPosts(locale);
    for (const post of posts) {
      const slug = post.slug;
      // hreflang alternates: only locales that actually have this slug
      const alternates = {};
      for (const l of LOCALES) {
        const has = getAllPosts(l).some((p) => p.slug === slug);
        if (has) alternates[HREFLANG[l]] = `${BASE}/${l}/blog/${slug}`;
      }
      entries.push({
        url: `${BASE}/${locale}/blog/${slug}`,
        lastModified: post.date ? new Date(post.date) : now,
        changeFrequency: "monthly",
        priority: 0.7,
        ...(Object.keys(alternates).length > 1 ? { alternates: { languages: alternates } } : {}),
      });
    }
  }

  return entries;
}

import fs from "node:fs";
import path from "node:path";
import { getAllPosts } from "./_lib/blog";
import {
  getServiceKeys,
  getCityKeys,
  getAllServiceCityPairs,
} from "./_lib/services-cities";
import { getCaseSlugs } from "./_data/case-studies";
import { getComparisonSlugs } from "./_data/comparisons";
import { getTermIds } from "./_data/glossary";

const BASE = "https://sky-fort.ca";
const LOCALES = ["uk", "ru", "en"];
const HREFLANG = { uk: "uk", ru: "ru", en: "en-CA" };

// ─── lastModified helpers ───────────────────────────────────────────────────
// Reads file mtime from disk. Better Google signal than `new Date()` on every
// URL: pages that haven't changed since 2024 shouldn't pretend to have changed
// today.
//
// Previously this also tried `execSync('git log -1 --format=%cI')` to get the
// actual commit date, but that triggered Next.js's NFT (Node File Tracing) to
// bundle the entire project into the sitemap serverless function — pushing
// past Vercel's function-size limit and breaking deploys. fs.statSync on
// individual files is bounded and NFT-friendly.

const BUILD_TIME = new Date();
const mtimeCache = new Map();

function lastModifiedFor(relPath) {
  if (mtimeCache.has(relPath)) return mtimeCache.get(relPath);
  // `/*turbopackIgnore: true*/` on `process.cwd()` keeps Next's NFT tracer
  // from following this dynamic fs read and bundling the whole project into
  // the sitemap serverless function (which broke Vercel deploys — function-
  // size limit). We KNOW relPath is bounded to the app/ tree at runtime.
  const absPath = path.join(/*turbopackIgnore: true*/ process.cwd(), relPath);
  let date = BUILD_TIME;
  try {
    const stat = fs.statSync(absPath);
    date = stat.mtime;
  } catch {
    // File moved or missing — fall back to BUILD_TIME so the URL still gets
    // a date (avoids `lastmod` going missing from the sitemap entry entirely).
  }
  mtimeCache.set(relPath, date);
  return date;
}

// Maps a localised path (relative to /[locale]) to the source file that owns
// its content. Used by lastModifiedFor() above.
const SOURCE_FILE = {
  "": "app/[locale]/page.js",
  "/tt": "app/[locale]/tt/page.js",
  "/blog": "app/[locale]/blog/page.js",
  "/services": "app/[locale]/services/page.js",
  "/pro-mene": "app/[locale]/pro-mene/page.js",
  "/perevirka": "app/[locale]/perevirka/page.js",
  "/eligibility": "app/[locale]/eligibility/page.js",
  "/porivnyannia": "app/[locale]/porivnyannia/page.js",
  "/presa": "app/[locale]/presa/page.js",
  "/contact": "app/[locale]/contact/page.js",
  "/calculators/tfsa-growth": "app/[locale]/calculators/tfsa-growth/page.js",
  "/calculators/financial-freedom": "app/[locale]/calculators/financial-freedom/page.js",
  "/calculators/mortgage": "app/[locale]/calculators/mortgage/page.js",
  "/calculators/rsu-tax": "app/[locale]/calculators/rsu-tax/page.js",
  "/calculators/mer-impact": "app/[locale]/calculators/mer-impact/page.js",
  "/calculators/mpc-vs-sole-proprietor": "app/[locale]/calculators/mpc-vs-sole-proprietor/page.js",
  "/links": "app/[locale]/links/page.js",
  "/privacy": "app/[locale]/privacy/page.js",
  "/cookies": "app/[locale]/cookies/page.js",
  "/finfluencer-compliance": "app/[locale]/finfluencer-compliance/page.js",
  "/author/andrii": "app/[locale]/author/andrii/page.js",
  "/cra-limits-2026": "app/[locale]/cra-limits-2026/page.js",
  "/dlya-it-fakhivtsiv": "app/[locale]/dlya-it-fakhivtsiv/page.js",
  "/dlya-mediks": "app/[locale]/dlya-mediks/page.js",
  "/dlya-pidpryyemtsiv": "app/[locale]/dlya-pidpryyemtsiv/page.js",
  "/case-studies": "app/[locale]/case-studies/page.js",
  "/tt-library": "app/[locale]/tt-library/page.js",
  "/slovnyk": "app/[locale]/slovnyk/page.js",
};

// Pages available under every locale segment.
const LOCALIZED_PAGES = [
  { path: "",                            priority: 1.0, changeFrequency: "weekly" },
  { path: "/tt",                         priority: 0.9, changeFrequency: "weekly" },
  { path: "/blog",                       priority: 0.9, changeFrequency: "weekly" },
  { path: "/services",                   priority: 0.9, changeFrequency: "monthly" },
  { path: "/pro-mene",                   priority: 0.8, changeFrequency: "monthly" },
  { path: "/perevirka",                  priority: 0.8, changeFrequency: "monthly" },
  { path: "/eligibility",                priority: 0.85, changeFrequency: "monthly" },
  { path: "/porivnyannia",               priority: 0.85, changeFrequency: "monthly" },
  { path: "/presa",                      priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact",                    priority: 0.9, changeFrequency: "monthly" },
  { path: "/calculators/tfsa-growth",    priority: 0.8, changeFrequency: "monthly" },
  { path: "/calculators/financial-freedom", priority: 0.8, changeFrequency: "monthly" },
  { path: "/calculators/mortgage",       priority: 0.8, changeFrequency: "monthly" },
  { path: "/calculators/rsu-tax",        priority: 0.8, changeFrequency: "monthly" },
  { path: "/calculators/mer-impact",     priority: 0.85, changeFrequency: "monthly" }, // T-REX-style link magnet
  { path: "/calculators/mpc-vs-sole-proprietor", priority: 0.8, changeFrequency: "monthly" },
  { path: "/links",                      priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy",                    priority: 0.3, changeFrequency: "yearly" },
  { path: "/cookies",                    priority: 0.3, changeFrequency: "yearly" },
  // YMYL trust / topical authority pillars (CSA-aligned content).
  // High priority — these are flagship E-E-A-T pages that justify the
  // licensed-DR positioning and drive AI Overview citations.
  { path: "/finfluencer-compliance",     priority: 0.85, changeFrequency: "monthly" },
  // Author entity URL — anchor for Article schema author.url resolution.
  { path: "/author/andrii",              priority: 0.75, changeFrequency: "monthly" },
  // Annual CRA-limits reference hub — high-volume January query magnet.
  { path: "/cra-limits-2026",            priority: 0.9,  changeFrequency: "yearly" },
  // ICP-targeted pillar pages (3 audiences × 3 locales = 9 URLs).
  // Designed to rank for high-intent searches like
  // "RSU vesting Канада українцям" / "MPC vs sole proprietor doctor".
  { path: "/dlya-it-fakhivtsiv",         priority: 0.85, changeFrequency: "monthly" },
  { path: "/dlya-mediks",                priority: 0.85, changeFrequency: "monthly" },
  { path: "/dlya-pidpryyemtsiv",         priority: 0.85, changeFrequency: "monthly" },
  // /case-studies re-included as standalone reference page after batch 9
  // expansion (regulatory rationale + NI 31-103/45-106/PIPEDA citations
  // + permitted/prohibited table).
  { path: "/case-studies",               priority: 0.7,  changeFrequency: "monthly" },
  // VideoObject-rich TikTok transcript library — AI-search indexability
  // play (Lantern 2026: YouTube is the most-cited domain in AI answers).
  { path: "/tt-library",                 priority: 0.75, changeFrequency: "weekly" },
  // Glossary with DefinedTermSet schema — Google + Perplexity + ChatGPT
  // use this structure for canonical-definition extraction.
  { path: "/slovnyk",                    priority: 0.7,  changeFrequency: "monthly" },
];

// Ukrainian-only landing pages (no locale prefix).
const UA_LANDINGS = [
  { path: "/tfsa-kalkulyator",          priority: 0.7, changeFrequency: "monthly" },
  { path: "/exempt-market-ukrayintsyam", priority: 0.7, changeFrequency: "monthly" },
  { path: "/ipoteka-kalhari",            priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap() {
  const entries = [];

  // For each multilingual page, emit one entry per locale with hreflang alternates.
  for (const page of LOCALIZED_PAGES) {
    const alternates = {};
    for (const l of LOCALES) {
      alternates[HREFLANG[l]] = `${BASE}/${l}${page.path}`;
    }
    alternates["x-default"] = `${BASE}/uk${page.path}`;

    // Resolve lastModified from the source file's git history — same value
    // across all 3 locales because they share one template.
    const source = SOURCE_FILE[page.path];
    const mtime = source ? lastModifiedFor(source) : BUILD_TIME;

    for (const l of LOCALES) {
      entries.push({
        url: `${BASE}/${l}${page.path}`,
        lastModified: mtime,
        changeFrequency: page.changeFrequency,
        priority: l === "uk" ? page.priority : page.priority - 0.05,
        alternates: { languages: alternates },
      });
    }
  }

  // UA-only landings — single entry each, no alternates.
  for (const page of UA_LANDINGS) {
    // The legacy landings live outside [locale], so map directly to their file.
    const legacyFile = `app${page.path}/page.js`;
    entries.push({
      url: `${BASE}${page.path}`,
      lastModified: lastModifiedFor(legacyFile),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  }

  // Blog posts — lastModified is the frontmatter `date` (publication date).
  // Could be enhanced to use git mtime on the .mdx file, but for posts the
  // editorial date is the more meaningful signal.
  for (const locale of LOCALES) {
    const posts = getAllPosts(locale);
    for (const post of posts) {
      const slug = post.slug;
      const alternates = {};
      for (const l of LOCALES) {
        const has = getAllPosts(l).some((p) => p.slug === slug);
        if (has) alternates[HREFLANG[l]] = `${BASE}/${l}/blog/${slug}`;
      }
      entries.push({
        url: `${BASE}/${locale}/blog/${slug}`,
        lastModified: post.date ? new Date(post.date) : BUILD_TIME,
        changeFrequency: "monthly",
        priority: 0.7,
        ...(Object.keys(alternates).length > 1 ? { alternates: { languages: alternates } } : {}),
      });
    }
  }

  // Composite case studies — 3 cases × 3 locales = 9 URLs. Share template
  // mtime since all use the [slug] dynamic route reading from the same
  // _data/case-studies.js source.
  const caseTemplateMtime = lastModifiedFor(
    "app/[locale]/case-studies/[slug]/page.js",
  );
  for (const locale of LOCALES) {
    for (const slug of getCaseSlugs()) {
      const alternates = Object.fromEntries(
        LOCALES.map((l) => [HREFLANG[l], `${BASE}/${l}/case-studies/${slug}`]),
      );
      alternates["x-default"] = `${BASE}/uk/case-studies/${slug}`;
      entries.push({
        url: `${BASE}/${locale}/case-studies/${slug}`,
        lastModified: caseTemplateMtime,
        changeFrequency: "monthly",
        priority: 0.75,
        alternates: { languages: alternates },
      });
    }
  }

  // Comparison sub-pages — 3 comparisons × 3 locales = 9 URLs.
  const comparisonTemplateMtime = lastModifiedFor(
    "app/[locale]/porivnyannia/[slug]/page.js",
  );
  for (const locale of LOCALES) {
    for (const slug of getComparisonSlugs()) {
      const alternates = Object.fromEntries(
        LOCALES.map((l) => [HREFLANG[l], `${BASE}/${l}/porivnyannia/${slug}`]),
      );
      alternates["x-default"] = `${BASE}/uk/porivnyannia/${slug}`;
      entries.push({
        url: `${BASE}/${locale}/porivnyannia/${slug}`,
        lastModified: comparisonTemplateMtime,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: { languages: alternates },
      });
    }
  }

  // Glossary entity pages — one DefinedTerm URL per term × 3 locales.
  // All share the [term] template, so share one mtime. Priority slightly
  // below the /slovnyk hub (0.7) since they're leaf reference pages.
  const glossaryTemplateMtime = lastModifiedFor(
    "app/[locale]/slovnyk/[term]/page.js",
  );
  for (const locale of LOCALES) {
    for (const id of getTermIds()) {
      const alternates = Object.fromEntries(
        LOCALES.map((l) => [HREFLANG[l], `${BASE}/${l}/slovnyk/${id}`]),
      );
      alternates["x-default"] = `${BASE}/uk/slovnyk/${id}`;
      entries.push({
        url: `${BASE}/${locale}/slovnyk/${id}`,
        lastModified: glossaryTemplateMtime,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages: alternates },
      });
    }
  }

  // Service × City landing pages — 4 services × 6 cities × 3 locales = 72 URLs.
  // All share one template, so share one mtime via the template file.
  const serviceTemplateMtime = lastModifiedFor(
    "app/[locale]/services/[service]/[city]/page.js",
  );
  for (const locale of LOCALES) {
    for (const { service, city } of getAllServiceCityPairs()) {
      const alternates = Object.fromEntries(
        LOCALES.map((l) => [HREFLANG[l], `${BASE}/${l}/services/${service}/${city}`])
      );
      entries.push({
        url: `${BASE}/${locale}/services/${service}/${city}`,
        lastModified: serviceTemplateMtime,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages: alternates },
      });
    }
  }

  return entries;
}

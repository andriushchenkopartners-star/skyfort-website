import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { getAllPosts } from "./_lib/blog";
import {
  getServiceKeys,
  getCityKeys,
  getAllServiceCityPairs,
} from "./_lib/services-cities";

const BASE = "https://sky-fort.ca";
const LOCALES = ["uk", "ru", "en"];
const HREFLANG = { uk: "uk-UA", ru: "ru-RU", en: "en-CA" };

// ─── lastModified helpers (git mtime → fs mtime → build time) ───────────────
// Better Google signal than `new Date()` on every URL: pages that haven't
// changed since 2024 shouldn't pretend to have changed today. Falls back
// gracefully when git history is unavailable (shallow clones on some hosts).

const BUILD_TIME = new Date();
const mtimeCache = new Map();

function lastModifiedFor(relPath) {
  if (mtimeCache.has(relPath)) return mtimeCache.get(relPath);
  const absPath = path.join(process.cwd(), relPath);
  let date = BUILD_TIME;
  // 1. Best signal: most recent commit that touched the file.
  try {
    const iso = execSync(
      `git log -1 --format=%cI -- "${relPath}"`,
      { encoding: "utf8", stdio: ["pipe", "pipe", "ignore"] },
    ).trim();
    if (iso) date = new Date(iso);
  } catch {
    // git unavailable or shallow — try fs mtime next.
    try {
      const stat = fs.statSync(absPath);
      date = stat.mtime;
    } catch {
      // file moved/missing — keep BUILD_TIME so the URL still gets a date.
    }
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
  "/contact": "app/[locale]/contact/page.js",
  "/calculators/tfsa-growth": "app/[locale]/calculators/tfsa-growth/page.js",
  "/calculators/financial-freedom": "app/[locale]/calculators/financial-freedom/page.js",
  "/calculators/mortgage": "app/[locale]/calculators/mortgage/page.js",
  "/links": "app/[locale]/links/page.js",
  "/privacy": "app/[locale]/privacy/page.js",
  "/cookies": "app/[locale]/cookies/page.js",
};

// Pages available under every locale segment.
const LOCALIZED_PAGES = [
  { path: "",                            priority: 1.0, changeFrequency: "weekly" },
  { path: "/tt",                         priority: 0.9, changeFrequency: "weekly" },
  { path: "/blog",                       priority: 0.9, changeFrequency: "weekly" },
  { path: "/services",                   priority: 0.9, changeFrequency: "monthly" },
  { path: "/pro-mene",                   priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact",                    priority: 0.9, changeFrequency: "monthly" },
  { path: "/calculators/tfsa-growth",    priority: 0.8, changeFrequency: "monthly" },
  { path: "/calculators/financial-freedom", priority: 0.8, changeFrequency: "monthly" },
  { path: "/calculators/mortgage",       priority: 0.8, changeFrequency: "monthly" },
  { path: "/links",                      priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy",                    priority: 0.3, changeFrequency: "yearly" },
  { path: "/cookies",                    priority: 0.3, changeFrequency: "yearly" },
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

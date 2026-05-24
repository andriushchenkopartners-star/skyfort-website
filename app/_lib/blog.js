// Server-only helpers for reading MDX blog posts from /content/blog/<locale>/.
// Frontmatter shape (in each .mdx file):
//   title       — string, post H1
//   description — string, 1-sentence summary (used in meta + post listing)
//   date        — "YYYY-MM-DD" (publication date, controls sort order)
//   author      — string, defaults to "Andrii Andriushchenko"
//   tags        — string[], optional
//   pillar      — string, optional (TFSA / RRSP / FHSA / RealEstate / ExemptMarket / Newcomer)
//   ogImage     — string, optional, defaults to "/og-image.png"
//   draft       — boolean, optional, true → not listed and not in sitemap
//   slug        — derived from filename (without .mdx)

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_ROOT = path.join(process.cwd(), "content", "blog");

function localeDir(locale) {
  return path.join(CONTENT_ROOT, locale);
}

export function getPostSlugs(locale) {
  const dir = localeDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPostBySlug(locale, slug) {
  const file = path.join(localeDir(locale), `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  return {
    slug,
    locale,
    title: data.title || "Untitled",
    description: data.description || "",
    date: data.date || "",
    author: data.author || "Andrii Andriushchenko",
    tags: Array.isArray(data.tags) ? data.tags : [],
    pillar: data.pillar || null,
    ogImage: data.ogImage || "/og-image.png",
    draft: !!data.draft,
    readingMinutes: Math.max(1, Math.round(stats.minutes)),
    wordCount: stats.words,
    content,
  };
}

export function getAllPosts(locale, { includeDrafts = false } = {}) {
  return getPostSlugs(locale)
    .map((slug) => getPostBySlug(locale, slug))
    .filter(Boolean)
    .filter((p) => includeDrafts || !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Cross-locale URL helpers — useful for hreflang on individual post pages.
// Returns map { locale: slug } for posts that share the same canonical "key".
// We use the same slug across locales by convention; if a translation uses a
// different filename, link it via frontmatter `translations: { ru: "...", en: "..." }`.
export function getTranslations(slug) {
  const out = {};
  for (const locale of ["uk", "ru", "en"]) {
    const post = getPostBySlug(locale, slug);
    if (post) out[locale] = slug;
  }
  return out;
}

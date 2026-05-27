// app/_data/testimonials.js
// SkyFort — client testimonials data.
//
// ⚠️  COMPLIANCE NOTE (CSA NI 31-103):
// - Only include testimonials from REAL clients who explicitly consented in writing.
// - Use real first name + last initial OR a pseudonym (with consent).
// - DO NOT include specific return percentages, dollar amounts of gains, or guarantees.
// - DO NOT offer compensation in exchange for testimonials.
// - Keep the text substantively as the client wrote it (light editing for clarity OK).
// - For each testimonial, file the written consent + original text in your records.
//
// When empty, the homepage Testimonials section auto-hides (renders trust-signals
// fallback instead) and the Review JSON-LD is omitted from the page.

/**
 * @typedef {Object} Testimonial
 * @property {string} id             — stable unique key (e.g., "anna-k-2026-05")
 * @property {string} authorName     — e.g., "Anna K." (real name OR consented pseudonym)
 * @property {string=} authorCity    — optional, e.g., "Calgary, AB"
 * @property {string=} authorContext — optional, e.g., "Newcomer 2022 · TFSA setup"
 * @property {string} text           — testimonial text (no return promises)
 * @property {string} locale         — 'uk' | 'ru' | 'en'
 * @property {number} rating         — 1-5
 * @property {string} datePublished  — ISO date "YYYY-MM-DD"
 * @property {string=} consentRef    — internal ref to the consent doc (not rendered)
 */

/** @type {Testimonial[]} */
export const TESTIMONIALS = [
  // Example shape (commented out — add real entries here):
  //
  // {
  //   id: "anna-k-2026-05",
  //   authorName: "Anna K.",
  //   authorCity: "Calgary, AB",
  //   authorContext: "Newcomer 2022 · TFSA + FHSA setup",
  //   text: "Andrii walked me through TFSA contribution room as a newcomer in 30 minutes. My bank advisor had given me three different answers in two meetings.",
  //   locale: "en",
  //   rating: 5,
  //   datePublished: "2026-05-15",
  //   consentRef: "consent-2026-05-15-anna-k.pdf",
  // },
];

/**
 * Filter testimonials by locale, falling back to English if no locale matches.
 * Returns up to `limit` items, most recent first.
 */
export function getTestimonials(locale = 'uk', limit = 6) {
  if (!Array.isArray(TESTIMONIALS) || TESTIMONIALS.length === 0) return [];
  const localized = TESTIMONIALS.filter((t) => t.locale === locale);
  const pool = localized.length > 0 ? localized : TESTIMONIALS;
  return pool
    .slice()
    .sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1))
    .slice(0, limit);
}

/**
 * Aggregate rating helper for AggregateRating JSON-LD.
 * Returns null when there are no testimonials (suppresses the schema).
 */
export function getAggregateRating() {
  if (!Array.isArray(TESTIMONIALS) || TESTIMONIALS.length === 0) return null;
  const sum = TESTIMONIALS.reduce((acc, t) => acc + (t.rating || 0), 0);
  return {
    ratingValue: Math.round((sum / TESTIMONIALS.length) * 10) / 10,
    reviewCount: TESTIMONIALS.length,
  };
}

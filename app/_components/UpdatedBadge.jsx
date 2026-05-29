// app/_components/UpdatedBadge.jsx
// Visible "Updated: YYYY-MM-DD" pill for money pages. Per Audit 7 #12:
// Perplexity / Google AI Overviews favor content with visible recent
// dates (recency bias — Seer Interactive 2026: ~3.2× more citations
// for content with dateModified ≤30 days).
//
// Pair with dateModified in Article JSON-LD for full signal coverage.

const COPY = {
  uk: "Оновлено",
  ru: "Обновлено",
  en: "Updated",
};

export default function UpdatedBadge({ date, locale = "uk", className = "" }) {
  if (!date) return null;
  const label = COPY[locale] || COPY.uk;
  return (
    <p
      className={`inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/55 ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]" aria-hidden="true" />
      {label}: <time dateTime={date} className="font-mono">{date}</time>
    </p>
  );
}

// app/_components/RelatedLinks.tsx
// Reusable internal-linking widget. Renders a section with a heading and 2-4
// cards linking to related pages on the site. Server-only — no client JS.
//
// Why this exists (Phase 2.6):
//   Internal linking is one of the easier SEO levers. Google uses link context
//   to understand topical clusters, and users with deep intent on a calculator
//   page are perfect candidates to follow into a blog pillar (or other calcs).
//   Each calc/blog page gets a tailored block at the bottom so visitors don't
//   have to back-navigate to discover related content.
//
// Inputs:
//   heading: string — H2 above the list
//   items:   Array<{ href: string; label: string; description?: string }>
//   variant: 'cards' (default — 2-col grid) | 'list' (vertical, blog-style)

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RelatedLinkItem {
  href: string;
  label: string;
  description?: string;
}

interface RelatedLinksProps {
  heading?: string;
  items: RelatedLinkItem[];
  variant?: "cards" | "list";
}

export default function RelatedLinks({ heading, items, variant = "cards" }: RelatedLinksProps) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-bg)] py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        {heading && (
          <h2 className="mb-8 font-display text-2xl text-white md:text-3xl">
            {heading}
          </h2>
        )}

        <ul
          className={
            variant === "list"
              ? "space-y-3"
              : "grid gap-4 md:grid-cols-2"
          }
        >
          {items.map((item, i) => (
            <li key={i}>
              <Link
                href={item.href}
                className="card-glow group flex items-start justify-between gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 transition-all hover:border-[var(--color-brand)]/40"
              >
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-white">{item.label}</div>
                  {item.description && (
                    <p className="mt-1 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                      {item.description}
                    </p>
                  )}
                </div>
                <ArrowRight
                  className="mt-1 h-4 w-4 flex-shrink-0 text-[var(--color-fg-subtle)] transition-all group-hover:translate-x-0.5 group-hover:text-[var(--color-brand)]"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ChevronRight } from "lucide-react";

const SITE_URL = "https://sky-fort.ca";

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

/**
 * <Breadcrumbs items=[{ label, href }] />
 * Renders both visual breadcrumbs and BreadcrumbList JSON-LD.
 * The last item should be the current page (no href required).
 */
export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  if (!Array.isArray(items) || items.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.label,
      ...(it.href ? { item: it.href.startsWith("http") ? it.href : `${SITE_URL}${it.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1 text-sm text-[var(--color-fg-muted)]">
        {items.map((it, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1">
              {idx > 0 && (
                <ChevronRight
                  size={14}
                  className="text-[var(--color-fg-subtle)]"
                  aria-hidden="true"
                />
              )}
              {isLast || !it.href ? (
                <span
                  className="text-[var(--color-fg)]"
                  {...(isLast ? { "aria-current": "page" } : {})}
                >
                  {it.label}
                </span>
              ) : (
                <Link
                  href={it.href}
                  className="hover:text-[var(--color-brand)] transition-colors"
                >
                  {it.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

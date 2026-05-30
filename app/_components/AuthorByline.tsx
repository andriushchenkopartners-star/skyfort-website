// app/_components/AuthorByline.tsx
// Author + credentials byline for YMYL pillar pages. Mirrors the byline on
// blog posts so every long-form piece has visible E-E-A-T (author, role,
// firm, NRD link, photo). Per the May-28-2026 audit: every YMYL page should
// show the author / qualifications / verifiable registration above the fold
// or near the title.
//
// Inputs:
//   locale: 'uk' | 'ru' | 'en'  — controls role + firm + verify-link copy
//   className: optional extra classes for outer wrapper
//
// The component is server-only (no hooks). Photo is /andrii-thumb.jpg
// (400×533 optimized variant of the main /andrii.jpg portrait).

import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

type Locale = "uk" | "ru" | "en";

interface BylineCopy {
  name: string;
  role: string;
  firm: string;
  nrdLabel: string;
  proMeneLabel: string;
  proMeneHref: string;
}

const NRD_URL =
  "https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx";

const COPY: Record<Locale, BylineCopy> = {
  uk: {
    name: "Andrii Andriushchenko",
    role: "Licensed Dealing Representative",
    firm: "Axcess Capital Advisors Inc.",
    nrdLabel: "NRD #4575551 — перевірити",
    proMeneLabel: "Про мене →",
    proMeneHref: "/uk/pro-mene",
  },
  ru: {
    name: "Andrii Andriushchenko",
    role: "Licensed Dealing Representative",
    firm: "Axcess Capital Advisors Inc.",
    nrdLabel: "NRD #4575551 — проверить",
    proMeneLabel: "Обо мне →",
    proMeneHref: "/ru/pro-mene",
  },
  en: {
    name: "Andrii Andriushchenko",
    role: "Licensed Dealing Representative",
    firm: "Axcess Capital Advisors Inc.",
    nrdLabel: "NRD #4575551 — verify",
    proMeneLabel: "About me →",
    proMeneHref: "/en/pro-mene",
  },
};

interface AuthorBylineProps {
  locale?: Locale;
  className?: string;
}

export default function AuthorByline({ locale = "uk", className = "" }: AuthorBylineProps) {
  const c = COPY[locale] || COPY.uk;
  return (
    <div
      className={`flex items-start gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 md:p-5 ${className}`}
    >
      <Link
        href={c.proMeneHref}
        className="block flex-shrink-0"
        aria-label={c.name}
      >
        <Image
          src="/andrii-thumb.jpg"
          alt={c.name}
          width={56}
          height={56}
          className="h-14 w-14 rounded-full border border-[var(--color-border)] object-cover"
        />
      </Link>
      <div className="min-w-0 flex-1">
        <Link
          href={c.proMeneHref}
          className="font-semibold text-white hover:text-[var(--color-brand)]"
        >
          {c.name}
        </Link>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[var(--color-fg-muted)]">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck
              className="h-3 w-3 text-[var(--color-brand)]"
              aria-hidden="true"
            />
            {c.role}
          </span>
          <span aria-hidden="true">·</span>
          <span>{c.firm}</span>
          <span aria-hidden="true">·</span>
          <a
            href={NRD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)]"
          >
            {c.nrdLabel}
          </a>
        </div>
      </div>
    </div>
  );
}

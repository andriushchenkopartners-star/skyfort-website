"use client";

import Link from "next/link";
import Logo from "../_components/Logo";
import LangSwitcher from "../_components/LangSwitcher";
import { CONFIG } from "../_i18n/config";

type Locale = "uk" | "ru" | "en";

interface HomeNavContent {
  nav: {
    about: string;
    book: string;
  };
}

export default function HomeNav({ locale, content }: { locale: Locale; content: HomeNavContent }) {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" aria-label="SkyFort home">
          <Logo variant="mark" />
        </a>
        <div className="flex items-center gap-3">
          {/* Inline switcher only on ≥sm — on mobile it collided with the
              fixed search/burger buttons, so language switching moves into
              the burger menu there. */}
          <div className="hidden sm:flex">
            <LangSwitcher locale={locale} />
          </div>
          <Link
            href={`/${locale}/pro-mene`}
            className="hidden text-xs font-bold uppercase tracking-wider text-[var(--color-fg-muted)] transition-colors duration-150 ease-[var(--ease-out)] hover:text-white sm:inline-flex"
          >
            {content.nav.about}
          </Link>
          <a
            href={CONFIG.calendlyUrl}
            target="_blank"
            rel="noopener"
            className="hidden rounded-full bg-[var(--color-brand)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-[transform,background-color] duration-200 ease-[var(--ease-out)] hover:bg-[var(--color-brand-hover)] active:scale-[0.98] sm:inline-flex"
          >
            {content.nav.book}
          </a>
        </div>
      </div>
    </nav>
  );
}

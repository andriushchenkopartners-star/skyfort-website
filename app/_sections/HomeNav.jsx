"use client";

import Link from "next/link";
import Logo from "../_components/Logo";
import LangSwitcher from "../_components/LangSwitcher";
import { CONFIG } from "../_i18n/config";

export default function HomeNav({ locale, content }) {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#2a2a2a] bg-[#191919]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" aria-label="SkyFort home">
          <Logo variant="mark" />
        </a>
        <div className="flex items-center gap-3">
          <LangSwitcher locale={locale} />
          <Link
            href={`/${locale}/pro-mene`}
            className="hidden text-xs font-bold uppercase tracking-wider text-[#a3a3a3] transition-colors hover:text-white sm:inline-flex"
          >
            {content.nav.about}
          </Link>
          <a
            href={CONFIG.calendlyUrl}
            target="_blank"
            rel="noopener"
            className="hidden rounded-full bg-[var(--color-brand)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[var(--color-brand-hover)] sm:inline-flex"
          >
            {content.nav.book}
          </a>
        </div>
      </div>
    </nav>
  );
}

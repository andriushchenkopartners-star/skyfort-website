// app/Nav.jsx
// Fixed burger menu for the whole site. Click → slide-in panel with site links.
// Reads the current locale from the URL so all multilingual links keep the user
// in their language. Pages that stay at the root (UA-only landings) are linked
// without a locale prefix.

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./_components/Logo";
import { SUPPORTED_LOCALES } from "./_i18n/dictionary";

// Links that live under [locale]. The href is built per-render with the current locale.
const LOCALIZED_LINKS = [
  { label: "Головна",       path: "" },
  { label: "Калькулятори",  path: "/calculators/tfsa-growth" },
  { label: "Про мене",      path: "/pro-mene" },
  { label: "Документи",     path: "/resources" },
];

// Pages that stay at the root (Ukrainian-only landings).
const ROOT_LINKS = [
  { label: "TFSA калькулятор",          href: "/tfsa-kalkulyator" },
  { label: "Exempt market українцям",   href: "/exempt-market-ukrayintsyam" },
  { label: "Іпотека Калгарі",           href: "/ipoteka-kalhari" },
];

const CALENDLY = "https://calendly.com/andriushchenko-partners/new-meeting";
const DEFAULT_LOCALE = "uk";

function currentLocaleFrom(pathname) {
  const first = pathname.split("/")[1];
  return SUPPORTED_LOCALES.includes(first) ? first : DEFAULT_LOCALE;
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";
  const locale = currentLocaleFrom(pathname);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        className="fixed right-5 top-5 z-[1002] flex h-12 w-12 flex-col items-center justify-center gap-[5px] rounded-xl border border-white/10 bg-black/85 backdrop-blur-md transition-colors hover:border-[var(--color-brand-hover)]"
        aria-label={open ? "Закрити меню" : "Відкрити меню"}
        aria-expanded={open}
        aria-controls="sf-nav-panel"
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className={`block h-[2px] w-5 rounded-sm bg-white transition-transform duration-200 ${
            open ? "translate-y-[7px] rotate-45" : ""
          }`}
        />
        <span
          className={`block h-[2px] w-5 rounded-sm bg-white transition-opacity duration-200 ${
            open ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block h-[2px] w-5 rounded-sm bg-white transition-transform duration-200 ${
            open ? "-translate-y-[7px] -rotate-45" : ""
          }`}
        />
      </button>

      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[1000] bg-black/55 transition-opacity duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <nav
        id="sf-nav-panel"
        aria-hidden={!open}
        className={`fixed right-0 top-0 z-[1001] flex h-[100dvh] w-[min(82vw,340px)] flex-col border-l border-white/10 bg-[#161616] px-7 pb-10 pt-[88px] transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-7">
          <Logo variant="full" size="sm" />
        </div>
        <ul className="flex-1 list-none p-0 m-0">
          {LOCALIZED_LINKS.map((l) => {
            const href = `/${locale}${l.path}` || `/${locale}`;
            return (
              <li key={href} className="mb-1">
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/5 py-3 text-base font-semibold text-white transition-all hover:pl-1.5 hover:text-[var(--color-brand-hover)]"
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
          {ROOT_LINKS.map((l) => (
            <li key={l.href} className="mb-1">
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-white/5 py-3 text-base font-semibold text-white transition-all hover:pl-1.5 hover:text-[var(--color-brand-hover)]"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="mt-6 block rounded-xl bg-[var(--color-brand)] py-4 text-center text-sm font-bold text-white transition-colors hover:bg-[var(--color-brand-hover)]"
        >
          Безкоштовний дзвінок →
        </a>
      </nav>
    </>
  );
}

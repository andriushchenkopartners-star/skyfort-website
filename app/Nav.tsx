// app/Nav.tsx
// Fixed burger menu for the whole site. Click → slide-in panel with site links.
// Reads the current locale from the URL so all multilingual links keep the user
// in their language. Pages that stay at the root (UA-only landings) are linked
// without a locale prefix.

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./_components/Logo";
import SiteSearch from "./_components/SiteSearch";
import { trackSearchOpen } from "./_lib/analytics";
import { SUPPORTED_LOCALES } from "./_i18n/dictionary";

// Per-locale UI copy for the burger menu. UK is the source; RU/EN are translations.
const COPY = {
  uk: {
    open: "Відкрити меню",
    close: "Закрити меню",
    home: "Головна",
    blog: "Блог",
    services: "Послуги",
    calculators: "Калькулятори",
    about: "Про мене",
    verify: "Перевірка",
    eligibility: "Self-check",
    compare: "EMD vs CIRO",
    finfluencer: "Finfluencer vs DR",
    glossary: "Словник",
    craLimits: "CRA ліміти 2026",
    contact: "Контакти",
    resources: "Документи",
    audienceHeader: "Для кого",
    audienceIt: "IT-фахівцям",
    audienceMedics: "Медикам",
    audienceFounders: "Підприємцям",
    caseStudies: "Кейси клієнтів",
    search: "Пошук (⌘K)",
    cta: "Безкоштовний дзвінок →",
    rootLinks: [
      { label: "TFSA калькулятор", href: "/tfsa-kalkulyator" },
      { label: "Exempt market українцям", href: "/exempt-market-ukrayintsyam" },
      { label: "Іпотека Калгарі", href: "/ipoteka-kalhari" },
    ],
  },
  ru: {
    open: "Открыть меню",
    close: "Закрыть меню",
    home: "Главная",
    blog: "Блог",
    services: "Услуги",
    calculators: "Калькуляторы",
    about: "Обо мне",
    verify: "Проверка",
    eligibility: "Self-check",
    compare: "EMD vs CIRO",
    finfluencer: "Finfluencer vs DR",
    glossary: "Словарь",
    craLimits: "CRA лимиты 2026",
    contact: "Контакты",
    resources: "Документы",
    audienceHeader: "Для кого",
    audienceIt: "IT-специалистам",
    audienceMedics: "Медикам",
    audienceFounders: "Предпринимателям",
    caseStudies: "Кейсы клиентов",
    search: "Поиск (⌘K)",
    cta: "Бесплатный звонок →",
    // UA-only landing pages don't have RU equivalents → hidden on /ru/
    rootLinks: [],
  },
  en: {
    open: "Open menu",
    close: "Close menu",
    home: "Home",
    blog: "Blog",
    services: "Services",
    calculators: "Calculators",
    about: "About",
    verify: "Verify me",
    eligibility: "Self-check",
    compare: "EMD vs CIRO",
    finfluencer: "Finfluencer vs DR",
    glossary: "Glossary",
    craLimits: "CRA Limits 2026",
    contact: "Contact",
    resources: "Resources",
    audienceHeader: "For whom",
    audienceIt: "Tech professionals",
    audienceMedics: "Physicians",
    audienceFounders: "Business owners",
    caseStudies: "Client cases",
    search: "Search (⌘K)",
    cta: "Free discovery call →",
    // UA-only landing pages don't have EN equivalents → hidden on /en/
    rootLinks: [],
  },
};

// Order of localized links in the burger; href is built per-render with the current locale.
// `verify` + `compare` + `finfluencer` sit between "about me" and "contact me" as
// YMYL trust signals. ICP pillars (IT / medics / founders) are grouped under an
// "audienceHeader" separator that renders as a non-link heading.
interface NavLink {
  key: string;
  path?: string;
  separator?: boolean;
}

const LINK_ORDER: NavLink[] = [
  { key: "home", path: "" },
  { key: "blog", path: "/blog" },
  { key: "services", path: "/services" },
  { key: "calculators", path: "/calculators/tfsa-growth" },
  { key: "about", path: "/pro-mene" },
  { key: "verify", path: "/perevirka" },
  { key: "eligibility", path: "/eligibility" },
  { key: "compare", path: "/porivnyannia" },
  { key: "finfluencer", path: "/finfluencer-compliance" },
  { key: "glossary", path: "/slovnyk" },
  { key: "craLimits", path: "/cra-limits-2026" },
  { key: "contact", path: "/contact" },
  { key: "resources", path: "/resources" },
  // Section header — rendered as a non-link separator below.
  { key: "audienceHeader", separator: true },
  { key: "audienceIt", path: "/dlya-it-fakhivtsiv" },
  { key: "audienceMedics", path: "/dlya-mediks" },
  { key: "audienceFounders", path: "/dlya-pidpryyemtsiv" },
  { key: "caseStudies", path: "/case-studies" },
];

const CALENDLY = "https://calendly.com/andriushchenko-partners/new-meeting";
const DEFAULT_LOCALE = "uk";

function currentLocaleFrom(pathname: string): string {
  const first = pathname.split("/")[1];
  return SUPPORTED_LOCALES.includes(first) ? first : DEFAULT_LOCALE;
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";
  const isPortal = pathname.includes("/portal");

  // Side effects MUST run unconditionally — the early return below would
  // otherwise create a different hook order between portal and non-portal
  // renders and crash React's hook ordering invariant. We no-op inside each
  // effect when on a portal route instead.
  useEffect(() => {
    if (isPortal) return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, isPortal]);

  useEffect(() => {
    if (isPortal) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isPortal]);

  // Portal has its own UI shell — don't show the public-site burger here.
  if (isPortal) return null;

  const locale = currentLocaleFrom(pathname);
  const t = COPY[locale] || COPY[DEFAULT_LOCALE];

  return (
    <>
      <SiteSearch />

      {/* Site search trigger — sits to the left of the burger so users
          discover it visually even without knowing the ⌘K shortcut. */}
      <button
        type="button"
        className="fixed right-[76px] top-5 z-[1002] flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/85 backdrop-blur-md transition-colors hover:border-[var(--color-brand-hover)]"
        aria-label={t.search}
        title={t.search}
        onClick={() => {
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("skyfort:open-search"));
            trackSearchOpen("nav-button");
          }
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-white" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>

      <button
        type="button"
        className="fixed right-5 top-5 z-[1002] flex h-12 w-12 flex-col items-center justify-center gap-[5px] rounded-xl border border-white/10 bg-black/85 backdrop-blur-md transition-colors hover:border-[var(--color-brand-hover)]"
        aria-label={open ? t.close : t.open}
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
        <ul className="flex-1 list-none overflow-y-auto p-0 m-0">
          {LINK_ORDER.map((l) => {
            if (l.separator) {
              return (
                <li
                  key={`sep-${l.key}`}
                  className="mt-4 mb-1 px-0 pt-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white/40"
                >
                  {t[l.key]}
                </li>
              );
            }
            const href = `/${locale}${l.path}` || `/${locale}`;
            return (
              <li key={href} className="mb-1">
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/5 py-3 text-base font-semibold text-white transition-all hover:pl-1.5 hover:text-[var(--color-brand-hover)]"
                >
                  {t[l.key]}
                </Link>
              </li>
            );
          })}
          {t.rootLinks.map((l) => (
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
          {t.cta}
        </a>
      </nav>
    </>
  );
}

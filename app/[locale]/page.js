"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Calculator, Download, ArrowRight, Home,
  Globe, Mail, Phone, AtSign, Send, Flame,
} from "lucide-react";
import Image from "next/image";
import Logo from "../_components/Logo";
import FaqJsonLd from "../_components/FaqJsonLd";
import TrustBar from "../_components/TrustBar";
import { dictionary as t, SUPPORTED_LOCALES, resolveLocale } from "../_i18n/dictionary";

const CONFIG = {
  calendlyUrl: "https://calendly.com/andriushchenko-partners/new-meeting",
  email: "andrii.andriushchenko@axcesscapital.com",
  phone: "(403) 397-2553",
  instagram: "https://instagram.com/andrii.wealthcanada",
  telegram: "https://t.me/skyfortwealth",
  pdfBaseUrl: "https://frhitqmsmqybggcmowag.supabase.co/storage/v1/object/public/lead-magnets-uk",
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function LangSwitcher({ locale }) {
  const router = useRouter();
  const pathname = usePathname();

  const langs = [
    { code: "uk", label: "УК" },
    { code: "ru", label: "RU" },
    { code: "en", label: "EN" },
  ];

  const switchTo = (newLocale) => {
    if (newLocale === locale) return;
    // Replace the leading /<locale> segment with the new locale; keep the rest.
    const segments = pathname.split("/");
    if (SUPPORTED_LOCALES.includes(segments[1])) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.push(segments.join("/") || `/${newLocale}`);
  };

  return (
    <div className="flex items-center gap-0 rounded-full border border-[#2a2a2a] bg-[#222] p-1" role="group" aria-label="Language">
      <Globe className="ml-2 h-3.5 w-3.5 text-[#6b6b6b]" aria-hidden="true" />
      {langs.map((l) => (
        <button
          key={l.code}
          onClick={() => switchTo(l.code)}
          aria-pressed={locale === l.code}
          className={`rounded-full px-3 py-1 text-xs font-bold tracking-wider transition-all ${
            locale === l.code ? "bg-[var(--color-brand)] text-white" : "text-[#a3a3a3] hover:text-white"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

function Nav({ locale, content }) {
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

function Hero({ content }) {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <Image
          src="/calgary-hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#191919]/68" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#191919]/80 via-transparent to-transparent" />
      </div>
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute -right-40 -top-32 h-[600px] w-[600px] rounded-full bg-[var(--color-brand)] opacity-[0.08] blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-[var(--color-brand)] opacity-[0.06] blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#191919]/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
        <div>
          <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-brand)]">
            {content.hero.kicker}
          </p>
          <h1 className="font-display-tight text-5xl text-white md:text-7xl lg:text-[80px]">
            {content.hero.title}
            <br />
            <span className="text-[var(--color-brand)]">{content.hero.titleAccent}.</span>
          </h1>
          <p className="mt-6 font-display text-2xl text-[#a3a3a3] md:text-3xl">
            {content.hero.titleEnd}.
          </p>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#a3a3a3]">
            {content.hero.sub}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={CONFIG.calendlyUrl}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand)] px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-[var(--color-brand-hover)]"
            >
              {content.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a
              href="#guides"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#3a3a3a] px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:border-[var(--color-brand)] hover:bg-[#222]"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              {content.hero.ctaSecondary}
            </a>
          </div>
        </div>

        <div className="order-first lg:order-last">
          <div className="relative mx-auto w-full max-w-[360px] lg:max-w-none">
            <div className="absolute -inset-4 rounded-[32px] bg-[var(--color-brand)] opacity-20 blur-3xl" aria-hidden="true" />
            <Image
              src="/andrii.jpg"
              alt="Andrii Andriushchenko — Licensed Dealing Representative, Calgary"
              width={720}
              height={900}
              priority
              sizes="(min-width: 1024px) 50vw, (min-width: 640px) 360px, 100vw"
              className="relative h-auto w-full rounded-[24px] border border-[#2a2a2a] object-cover shadow-2xl"
              style={{ aspectRatio: "4 / 5" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats({ content }) {
  return (
    <section className="border-y border-[#2a2a2a] bg-[#1f1f1f]" aria-label="Key statistics">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-[#2a2a2a] md:grid-cols-4">
        {content.stats.map((s, i) => (
          <div key={i} className="bg-[#1f1f1f] p-8 md:p-10">
            <div className="font-display-tight text-3xl text-[var(--color-brand)] md:text-5xl">{s.value}</div>
            <div className="mt-3 text-xs leading-relaxed text-[#a3a3a3] md:text-sm">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About({ content }) {
  return (
    <section className="py-28 md:py-36" id="about">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="font-display text-4xl leading-[0.95] text-white md:text-6xl">
          {content.aboutTitle}
        </h2>
        <div className="mt-12 space-y-6">
          {content.about.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-[#a3a3a3]">{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

function Guides({ content }) {
  return (
    <section id="guides" className="py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 max-w-2xl">
          <h2 className="font-display text-4xl leading-[0.95] text-white md:text-6xl">
            {content.guidesTitle}
          </h2>
          <p className="mt-6 text-lg text-[#a3a3a3]">{content.guidesSub}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.guides.map((g, i) => {
            const Icon = g.icon;
            return (
              <a
                key={i}
                href={`${CONFIG.pdfBaseUrl}/${g.file}`}
                target="_blank"
                rel="noopener"
                className="card-glow group relative flex flex-col rounded-2xl border border-[#2a2a2a] bg-[#1f1f1f] p-7"
                aria-label={`Download ${g.title} PDF`}
              >
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-brand)]/10 text-[var(--color-brand)]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl text-white">{g.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#a3a3a3]">{g.desc}</p>
                <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-brand)]">
                  PDF
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CalcPromo({ content, locale }) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute -left-32 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[var(--color-brand)] opacity-[0.07] blur-3xl" />
      </div>
      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-3xl border border-[var(--color-brand)]/30 bg-gradient-to-br from-[#1f1f1f] to-[#1a2d4a] p-10 md:p-14">
          <div className="grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-brand)]">
                <Calculator className="h-3.5 w-3.5" />
                {content.calcPromo.kicker}
              </p>
              <h2 className="font-display-tight text-3xl text-white md:text-5xl">
                {content.calcPromo.title}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-[#a3a3a3] md:text-lg">
                {content.calcPromo.desc}
              </p>
              <Link
                href={`/${locale}/calculators/tfsa-growth`}
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-[var(--color-brand-hover)]"
              >
                {content.calcPromo.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="rounded-2xl border border-[#3a3a3a] bg-[#191919] p-6 text-center">
                <p className="text-xs uppercase tracking-wider text-[#6b6b6b]">$500/міс · 20 років · ETF 8%</p>
                <p className="mt-3 font-display-tight text-5xl text-[var(--color-brand)]">$295K</p>
                <p className="mt-2 text-xs text-[#6b6b6b]">vs $120K у банку</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MortgagePromo({ locale }) {
  const copy = {
    uk: {
      kicker: "Калькулятор · Іпотека",
      title: "Канадська іпотека — 6 інструментів",
      desc: "Stress test, CMHC, дострокове погашення, розрив контракту, інвестиція, доступність — все в одному.",
      cta: "Відкрити калькулятор",
      stat1: "$650K · 20% · 4.5% · 25р",
      stat2: "$2,890",
      stat3: "Bi-weekly: −3 роки",
    },
    ru: {
      kicker: "Калькулятор · Ипотека",
      title: "Канадская ипотека — 6 инструментов",
      desc: "Стресс-тест, CMHC, досрочное погашение, разрыв контракта, инвестиция, доступность — всё в одном.",
      cta: "Открыть калькулятор",
      stat1: "$650K · 20% · 4.5% · 25р",
      stat2: "$2,890",
      stat3: "Bi-weekly: −3 года",
    },
    en: {
      kicker: "Calculator · Mortgage",
      title: "Canadian mortgage — 6 tools",
      desc: "Stress test, CMHC, early payoff, break penalty, investment, affordability — all in one.",
      cta: "Open calculator",
      stat1: "$650K · 20% · 4.5% · 25y",
      stat2: "$2,890",
      stat3: "Bi-weekly: −3 years",
    },
  };
  const c = copy[locale] || copy.uk;

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute -left-32 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[var(--color-brand)] opacity-[0.07] blur-3xl" />
      </div>
      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-3xl border border-[var(--color-brand)]/30 bg-gradient-to-br from-[#1f1f1f] to-[#1a2438] p-10 md:p-14">
          <div className="grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-brand)]">
                <Home className="h-3.5 w-3.5" />
                {c.kicker}
              </p>
              <h2 className="font-display-tight text-3xl text-white md:text-5xl">
                {c.title}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-[#a3a3a3] md:text-lg">
                {c.desc}
              </p>
              <Link
                href={`/${locale}/calculators/mortgage`}
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-[var(--color-brand-hover)]"
              >
                {c.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="rounded-2xl border border-[#3a3a3a] bg-[#191919] p-6 text-center">
                <p className="text-xs uppercase tracking-wider text-[#6b6b6b]">{c.stat1}</p>
                <p className="mt-3 font-display-tight text-5xl text-[var(--color-brand)]">{c.stat2}</p>
                <p className="mt-2 text-xs text-green-400">{c.stat3}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FireCalcPromo({ locale }) {
  const copy = {
    uk: {
      kicker: "Калькулятор · Financial Freedom",
      title: "Коли ти станеш фінансово вільним?",
      desc: "Точна дата freedom на основі твоїх цифр. Побач як exempt market прискорює це на роки.",
      cta: "Розрахувати freedom date",
      stat1: "Сім'я · $11.6K/міс · ETF 8%",
      stat2: "19 років",
      stat3: "Exempt market: −1 рік",
    },
    ru: {
      kicker: "Калькулятор · Financial Freedom",
      title: "Когда ты станешь финансово свободным?",
      desc: "Точная дата freedom на основе твоих цифр. Увидь как exempt market ускоряет это на годы.",
      cta: "Рассчитать freedom date",
      stat1: "Семья · $11.6K/мес · ETF 8%",
      stat2: "19 лет",
      stat3: "Exempt market: −1 год",
    },
    en: {
      kicker: "Calculator · Financial Freedom",
      title: "When will you be financially free?",
      desc: "Exact freedom date based on your numbers. See how exempt market accelerates it by years.",
      cta: "Calculate freedom date",
      stat1: "Family · $11.6K/mo · ETF 8%",
      stat2: "19 years",
      stat3: "Exempt market: −1 year",
    },
  };
  const c = copy[locale] || copy.uk;

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute -right-32 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[#FFB627] opacity-[0.07] blur-3xl" />
      </div>
      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-3xl border border-[#FFB627]/30 bg-gradient-to-br from-[#1f1f1f] to-[#2d2418] p-10 md:p-14">
          <div className="grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#FFB627]">
                <Flame className="h-3.5 w-3.5" />
                {c.kicker}
              </p>
              <h2 className="font-display-tight text-3xl text-white md:text-5xl">
                {c.title}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-[#a3a3a3] md:text-lg">
                {c.desc}
              </p>
              <Link
                href={`/${locale}/calculators/financial-freedom`}
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#FFB627] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[#191919] transition-all hover:bg-[#ffd066]"
              >
                {c.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="rounded-2xl border border-[#3a3a3a] bg-[#191919] p-6 text-center">
                <p className="text-xs uppercase tracking-wider text-[#6b6b6b]">{c.stat1}</p>
                <p className="mt-3 font-display-tight text-5xl text-[#FFB627]">{c.stat2}</p>
                <p className="mt-2 text-xs text-[#FFB627]/80">{c.stat3}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Steps({ content }) {
  return (
    <section className="py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-16 font-display text-4xl leading-[0.95] text-white md:text-6xl">
          {content.stepsTitle}
        </h2>
        <ol className="grid gap-12 md:grid-cols-3">
          {content.steps.map((s, i) => (
            <li key={i} className="relative">
              <div className="mb-6 font-display-tight text-6xl text-[var(--color-brand)]">{s.n}</div>
              <h3 className="font-display text-2xl text-white">{s.title}</h3>
              <p className="mt-4 leading-relaxed text-[#a3a3a3]">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FAQ({ content }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-28 md:py-36" id="faq">
      <FaqJsonLd faq={content.faq} id="https://sky-fort.ca/#faq" />
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-16 font-display text-4xl leading-[0.95] text-white md:text-6xl">
          {content.faqTitle}
        </h2>
        <dl className="space-y-4">
          {content.faq.map((item, i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-[#2a2a2a] bg-[#1f1f1f]">
              <dt>
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  aria-expanded={open === i}
                  className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[#222]"
                >
                  <span className="font-bold uppercase tracking-wide text-white">{item.q}</span>
                  <span className={`mt-1 text-2xl leading-none text-[var(--color-brand)] transition-transform ${open === i ? "rotate-45" : ""}`} aria-hidden="true">+</span>
                </button>
              </dt>
              {open === i && (
                <dd className="border-t border-[#2a2a2a] px-6 py-5 leading-relaxed text-[#a3a3a3]">{item.a}</dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function FinalCTA({ content }) {
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <Image
          src="/freedom-cta.webp"
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#191919]/85" />
      </div>
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-brand)] opacity-[0.08] blur-3xl" />
      </div>
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display-tight text-5xl text-white md:text-7xl">
          {content.ctaTitle}
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lg text-[#a3a3a3]">{content.ctaSub}</p>
        <a
          href={CONFIG.calendlyUrl}
          target="_blank"
          rel="noopener"
          className="group mt-12 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-[var(--color-brand-hover)]"
        >
          {content.ctaBtn}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

function Footer({ content }) {
  return (
    <footer className="border-t border-[#2a2a2a] bg-[#191919] pt-24 pb-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Logo variant="mark" />
            <p className="mt-4 text-sm text-[#6b6b6b]">{content.footer.tagline}</p>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#6b6b6b]">{content.footer.contactTitle}</h3>
            <ul className="space-y-3 text-sm text-[#a3a3a3]">
              <li><a href={`mailto:${CONFIG.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-brand)]"><Mail className="h-3.5 w-3.5" aria-hidden="true" />{CONFIG.email}</a></li>
              <li><a href={`tel:${CONFIG.phone.replace(/\D/g, "")}`} className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-brand)]"><Phone className="h-3.5 w-3.5" aria-hidden="true" />{CONFIG.phone}</a></li>
              <li><a href={CONFIG.instagram} target="_blank" rel="noopener" className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-brand)]"><AtSign className="h-3.5 w-3.5" aria-hidden="true" />Instagram</a></li>
              <li><a href={CONFIG.telegram} target="_blank" rel="noopener" className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-brand)]"><Send className="h-3.5 w-3.5" aria-hidden="true" />Telegram</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#6b6b6b]">{content.footer.legalTitle}</h3>
            <p className="text-xs leading-relaxed text-[#6b6b6b]">{content.footer.disclaimer}</p>
          </div>
        </div>
        <div className="mt-16 border-t border-[#2a2a2a] pt-8 text-xs text-[#6b6b6b]">{content.footer.rights}</div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────

export default function SkyFortLanding({ params }) {
  const { locale: rawLocale } = use(params);
  const locale = resolveLocale(rawLocale);
  const content = t[locale];

  return (
    <main id="main" className="min-h-screen bg-[#191919] text-white antialiased">
      <Nav locale={locale} content={content} />
      <Hero content={content} />
      <TrustBar locale={locale} />
      <Stats content={content} />
      <About content={content} />
      <Guides content={content} />
      <CalcPromo content={content} locale={locale} />
      <FireCalcPromo locale={locale} />
      <MortgagePromo locale={locale} />
      <Steps content={content} />
      <FAQ content={content} />
      <FinalCTA content={content} />
      <Footer content={content} />
    </main>
  );
}

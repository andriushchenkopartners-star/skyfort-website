// app/[locale]/case-studies/[slug]/page.js
// Individual case-study page. Renders one composite illustration per slug
// from app/_data/case-studies.js. Every page carries a prominent CSA/PIPEDA
// disclaimer that the case is COMPOSITE — built from patterns across
// multiple clients, NOT a single identifiable person.
//
// JSON-LD: Article + Person (Andrii as author) + BreadcrumbList. No
// FAQPage (cases don't have FAQ structure). Speakable on TL;DR.

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ShieldAlert, BookOpen } from "lucide-react";
import Logo from "../../../_components/Logo";
import Breadcrumbs from "../../../_components/Breadcrumbs";
import LangSwitcher from "../../../_components/LangSwitcher";
import TldrBlock from "../../../_components/TldrBlock";
import AuthorByline from "../../../_components/AuthorByline";
import ScrollDepthTracker from "../../../_components/ScrollDepthTracker";
import StickyCta from "../../../_components/StickyCta";
import RelatedLinks from "../../../_components/RelatedLinks";
import { SUPPORTED_LOCALES } from "../../../_i18n/dictionary";
import { getCase, getCaseSlugs } from "../../../_data/case-studies";

const CALENDLY = "https://calendly.com/andriushchenko-partners/new-meeting";

const DISCLAIMER = {
  uk: {
    title: "Композитна ілюстрація — не один реальний клієнт",
    body: "Цей кейс зібраний з patterns 5+ реальних клієнтів та змінений у такий спосіб, щоб жодна особа не могла бути ідентифікована. Числа — діапазони, не точні значення. Категорія + framework + decision logic відображають реальну практику; specific details — abstracted. Не є рекомендацією для твоєї ситуації — для індивідуального налаштування discovery call.",
  },
  ru: {
    title: "Композитная иллюстрация — не один реальный клиент",
    body: "Этот кейс собран из patterns 5+ реальных клиентов и изменён так, чтобы ни одно лицо не могло быть идентифицировано. Числа — диапазоны, не точные. Категория + framework + decision logic отражают реальную практику; specific details — abstracted. Не рекомендация для твоей ситуации — для индивидуальной настройки discovery call.",
  },
  en: {
    title: "Composite illustration — not a single real client",
    body: "This case is built from patterns across 5+ real clients and modified so no individual can be identified. Numbers are ranges, not exact values. The category + framework + decision logic reflect actual practice; specific details are abstracted. Not a recommendation for your situation — book a discovery call for individual setup.",
  },
};

export async function generateStaticParams() {
  const slugs = getCaseSlugs();
  const out = [];
  for (const locale of SUPPORTED_LOCALES) {
    for (const slug of slugs) out.push({ locale, slug });
  }
  return out;
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const c = getCase(slug, locale);
  if (!c) return {};
  const path = `/${locale}/case-studies/${slug}`;
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [
      { uk: "uk", ru: "ru", en: "en-CA" }[l],
      `/${l}/case-studies/${slug}`,
    ]),
  );
  alternates["x-default"] = `/uk/case-studies/${slug}`;
  return {
    title: c.titleMeta,
    description: c.descriptionMeta,
    alternates: { canonical: path, languages: alternates },
    openGraph: {
      title: c.titleMeta,
      description: c.descriptionMeta,
      url: `https://sky-fort.ca${path}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: c.titleMeta,
      description: c.descriptionMeta,
    },
  };
}

// Audit 6 #8: AI engines (Perplexity / Google AI Overview) weight recency
// heavily — content updated ≤30 days back gets ~3.2× more AI citations
// (Seer Interactive 2026). We hard-code datePublished + dateModified so
// schema validators always see fresh dates. Refresh dateModified each time
// the underlying case data changes — the case-studies.js data file is the
// source of truth.
const CASE_DATES = {
  "it-fakhivets-rsu-vesting-strategy": { published: "2026-05-28", modified: "2026-05-28" },
  "mediks-mpc-incorporation-timeline": { published: "2026-05-28", modified: "2026-05-28" },
  "pidpryyemets-lcge-exit-planning": { published: "2026-05-28", modified: "2026-05-28" },
};

function buildArticleJsonLd(locale, c, path) {
  const dates = CASE_DATES[c.slug] || { published: "2026-05-28", modified: "2026-05-28" };
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.titleMeta,
    description: c.descriptionMeta,
    inLanguage: { uk: "uk", ru: "ru", en: "en-CA" }[locale],
    datePublished: dates.published,
    dateModified: dates.modified,
    author: {
      "@type": "Person",
      name: "Andrii Andriushchenko",
      jobTitle: "Licensed Dealing Representative",
      identifier: "NRD 4575551",
      url: `https://sky-fort.ca/${locale}/pro-mene`,
    },
    publisher: {
      "@type": "FinancialService",
      name: "SkyFort Wealth",
      url: "https://sky-fort.ca",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://sky-fort.ca${path}`,
    },
    articleSection: c.pillar,
  };
}

function buildBreadcrumbJsonLd(locale, c, path) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "ru" ? "Главная" : locale === "en" ? "Home" : "Головна", item: `https://sky-fort.ca/${locale}` },
      { "@type": "ListItem", position: 2, name: locale === "ru" ? "Кейсы клиентов" : locale === "en" ? "Client cases" : "Кейси клієнтів", item: `https://sky-fort.ca/${locale}/case-studies` },
      { "@type": "ListItem", position: 3, name: c.crumbThis, item: `https://sky-fort.ca${path}` },
    ],
  };
}

export default async function CaseStudyPage({ params }) {
  const { locale, slug } = await params;
  const c = getCase(slug, locale);
  if (!c) notFound();
  const path = `/${locale}/case-studies/${slug}`;
  const disc = DISCLAIMER[locale] || DISCLAIMER.uk;

  const relatedLabels = {
    uk: { heading: "Пов'язані матеріали", icp: "Пілларний гайд", calculator: "Калькулятор", blogPost: "Детальна стаття у блозі" },
    ru: { heading: "Связанные материалы", icp: "Пилларный гайд", calculator: "Калькулятор", blogPost: "Подробная статья в блоге" },
    en: { heading: "Related", icp: "Pillar guide", calculator: "Calculator", blogPost: "Detailed blog post" },
  };
  const rl = relatedLabels[locale] || relatedLabels.uk;

  return (
    <main id="main" className="min-h-screen bg-[var(--color-bg)] text-white">
      <ScrollDepthTracker page={`case-${slug}`} />
      <StickyCta locale={locale} page={`case-${slug}`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildArticleJsonLd(locale, c, path)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbJsonLd(locale, c, path)) }}
      />

      <header className="pt-8 pb-4 px-6">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <Link href={`/${locale}`} aria-label="SkyFort home">
            <Logo variant="full" size="md" />
          </Link>
          <LangSwitcher />
        </div>
      </header>

      <section className="px-6 pt-4 pb-8">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs
            items={[
              { label: locale === "ru" ? "Главная" : locale === "en" ? "Home" : "Головна", href: `/${locale}` },
              { label: locale === "ru" ? "Кейсы клиентов" : locale === "en" ? "Client cases" : "Кейси клієнтів", href: `/${locale}/case-studies` },
              { label: c.crumbThis },
            ]}
          />
          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-brand)]">
              {c.eyebrow}
            </p>
            <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold leading-tight">
              {c.title}
            </h1>
            <p className="mt-4 text-lg text-white/75">{c.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Anonymization disclaimer — prominent, top of content */}
      <section className="px-6 pb-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/[0.07] p-4 sm:p-5">
            <ShieldAlert
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-400"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-bold text-amber-100">{disc.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-amber-100/85">
                {disc.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TL;DR + AuthorByline */}
      <section className="px-6 pb-8">
        <div className="mx-auto max-w-3xl space-y-4">
          <TldrBlock
            text={c.tldr}
            pageName={c.titleMeta}
            pageUrl={`https://sky-fort.ca${path}`}
          />
          <AuthorByline locale={locale} />
        </div>
      </section>

      {/* Sections */}
      <section className="px-6 pb-12">
        <div className="mx-auto max-w-3xl space-y-8">
          {c.sections.map((s, i) => (
            <div key={i}>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {s.title}
              </h2>
              <p className="mt-3 text-base text-white/80 leading-relaxed">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Key takeaways */}
      <section className="px-6 pb-12">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-[var(--color-brand)]/30 bg-[var(--color-brand)]/[0.06] p-6">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-brand)]">
              <BookOpen size={14} aria-hidden="true" />
              Key takeaways
            </p>
            <ul className="mt-4 space-y-2">
              {c.keyTakeaways.map((tk, i) => (
                <li key={i} className="flex gap-3 text-sm text-white/85">
                  <span className="font-mono text-[var(--color-brand)]">{i + 1}.</span>
                  <span>{tk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What-if scenarios */}
      <section className="px-6 pb-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-2xl sm:text-3xl font-bold">{c.whatIfHeader}</h2>
          <div className="space-y-4">
            {c.whatIfs.map((wf, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <p className="font-bold text-white">{wf.q}</p>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">{wf.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related links */}
      <RelatedLinks
        heading={rl.heading}
        items={[
          { href: `/${locale}${c.related.icp}`, label: rl.icp, description: locale === "ru" ? "Полный гайд для аудитории этого кейса" : locale === "en" ? "Full guide for this case's audience" : "Повний гайд для аудиторії цього кейсу" },
          { href: `/${locale}${c.related.calculator}`, label: rl.calculator, description: locale === "ru" ? "Посчитай свои конкретные числа" : locale === "en" ? "Crunch your own numbers" : "Порахуй свої конкретні числа" },
          { href: `/${locale}${c.related.blogPost}`, label: rl.blogPost, description: locale === "ru" ? "Глубокий разбор темы" : locale === "en" ? "Deep-dive on the topic" : "Глибокий розбір теми" },
          { href: `/${locale}/eligibility`, label: locale === "ru" ? "Eligible Investor self-check" : locale === "en" ? "Eligible Investor self-check" : "Eligible Investor self-check", description: locale === "ru" ? "60 секунд — попадаешь ли в exempt market" : locale === "en" ? "60 seconds — do you fit exempt market" : "60 секунд — чи попадаєш у exempt market" },
        ]}
      />

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">
            {locale === "ru" ? "Обсудим твою специфику?" : locale === "en" ? "Let's discuss your specifics?" : "Обговоримо твою специфіку?"}
          </h2>
          <p className="mt-3 text-white/75">
            {locale === "ru"
              ? "Discovery call 30 минут, без оплаты. Чтобы понять подойдёт ли подобная стратегия именно тебе."
              : locale === "en"
              ? "Discovery call, 30 minutes, no fee. To see whether a similar strategy fits your specific situation."
              : "Discovery call 30 хвилин, без оплати. Щоб зрозуміти чи подібна стратегія підійде саме тобі."}
          </p>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--color-brand)] px-7 py-4 text-base font-bold text-white transition-colors hover:bg-[var(--color-brand-hover)]"
          >
            {locale === "ru" ? "Бесплатный звонок" : locale === "en" ? "Free discovery call" : "Безкоштовний дзвінок"}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}

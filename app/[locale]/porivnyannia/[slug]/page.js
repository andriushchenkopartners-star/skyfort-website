// app/[locale]/porivnyannia/[slug]/page.js
// Comparison sub-pages (EMD vs Wealthsimple, MIC vs GIC, exempt market vs
// ETF). Sibling to the main /porivnyannia (EMD vs CIRO vs Insurance).
// Comparison-table format is the single most-cited content type in AI
// engines — clean A-vs-B structured data + "when each makes sense".

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import Logo from "../../../_components/Logo";
import Breadcrumbs from "../../../_components/Breadcrumbs";
import LangSwitcher from "../../../_components/LangSwitcher";
import TldrBlock from "../../../_components/TldrBlock";
import AuthorByline from "../../../_components/AuthorByline";
import UpdatedBadge from "../../../_components/UpdatedBadge";
import StaticFaq from "../../../_components/StaticFaq";
import ScrollDepthTracker from "../../../_components/ScrollDepthTracker";
import RelatedLinks from "../../../_components/RelatedLinks";
import { SUPPORTED_LOCALES } from "../../../_i18n/dictionary";
import { getComparison, getComparisonSlugs } from "../../../_data/comparisons";

const CALENDLY = "https://calendly.com/andriushchenko-partners/new-meeting";

export async function generateStaticParams() {
  const slugs = getComparisonSlugs();
  const out = [];
  for (const locale of SUPPORTED_LOCALES) {
    for (const slug of slugs) out.push({ locale, slug });
  }
  return out;
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const c = getComparison(slug, locale);
  if (!c) return {};
  const path = `/${locale}/porivnyannia/${slug}`;
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [{ uk: "uk", ru: "ru", en: "en-CA" }[l], `/${l}/porivnyannia/${slug}`]),
  );
  alternates["x-default"] = `/uk/porivnyannia/${slug}`;
  return {
    title: c.titleMeta,
    description: c.descriptionMeta,
    alternates: { canonical: path, languages: alternates },
    openGraph: { title: c.titleMeta, description: c.descriptionMeta, url: `https://sky-fort.ca${path}`, type: "article" },
    twitter: { card: "summary_large_image", title: c.titleMeta, description: c.descriptionMeta },
  };
}

function buildJsonLd(locale, c, path) {
  const lang = { uk: "uk", ru: "ru", en: "en-CA" }[locale];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: c.titleMeta,
        description: c.descriptionMeta,
        inLanguage: lang,
        datePublished: "2026-05-29",
        dateModified: "2026-05-29",
        author: {
          "@type": "Person",
          name: "Andrii Andriushchenko",
          jobTitle: "Licensed Dealing Representative",
          identifier: "NRD 4575551",
          url: `https://sky-fort.ca/${locale}/author/andrii`,
        },
        publisher: { "@type": "FinancialService", name: "SkyFort Wealth", url: "https://sky-fort.ca" },
        mainEntityOfPage: { "@type": "WebPage", "@id": `https://sky-fort.ca${path}` },
      },
      {
        "@type": "FAQPage",
        mainEntity: c.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: locale === "ru" ? "Главная" : locale === "en" ? "Home" : "Головна", item: `https://sky-fort.ca/${locale}` },
          { "@type": "ListItem", position: 2, name: locale === "ru" ? "Сравнения" : locale === "en" ? "Comparisons" : "Порівняння", item: `https://sky-fort.ca/${locale}/porivnyannia` },
          { "@type": "ListItem", position: 3, name: c.crumbThis, item: `https://sky-fort.ca${path}` },
        ],
      },
    ],
  };
}

export default async function ComparisonPage({ params }) {
  const { locale, slug } = await params;
  const c = getComparison(slug, locale);
  if (!c) notFound();
  const path = `/${locale}/porivnyannia/${slug}`;
  const jsonLd = buildJsonLd(locale, c, path);

  const relatedItems = [];
  if (c.related.pillar) relatedItems.push({ href: `/${locale}${c.related.pillar}`, label: locale === "ru" ? "EMD vs CIRO vs Insurance" : locale === "en" ? "EMD vs CIRO vs Insurance" : "EMD vs CIRO vs Insurance", description: locale === "ru" ? "Основное сравнение лицензий" : locale === "en" ? "Core licence comparison" : "Основне порівняння ліцензій" });
  if (c.related.calculator) relatedItems.push({ href: `/${locale}${c.related.calculator}`, label: locale === "ru" ? "Калькулятор" : locale === "en" ? "Calculator" : "Калькулятор", description: locale === "ru" ? "Посчитай свои числа" : locale === "en" ? "Crunch your numbers" : "Порахуй свої числа" });
  if (c.related.blogPost) relatedItems.push({ href: `/${locale}${c.related.blogPost}`, label: locale === "ru" ? "Статья в блоге" : locale === "en" ? "Blog deep-dive" : "Стаття в блозі", description: locale === "ru" ? "Подробный разбор" : locale === "en" ? "Detailed breakdown" : "Детальний розбір" });
  relatedItems.push({ href: `/${locale}/eligibility`, label: "Eligible Investor self-check", description: locale === "ru" ? "60 секунд" : locale === "en" ? "60 seconds" : "60 секунд" });

  return (
    <main id="main" className="min-h-screen bg-[var(--color-bg)] text-white">
      <ScrollDepthTracker page={`compare-${slug}`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="pt-8 pb-4 px-6">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <Link href={`/${locale}`} aria-label="SkyFort home"><Logo variant="full" size="md" /></Link>
          <LangSwitcher />
        </div>
      </header>

      <section className="px-6 pt-4 pb-8">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs items={[
            { label: locale === "ru" ? "Главная" : locale === "en" ? "Home" : "Головна", href: `/${locale}` },
            { label: locale === "ru" ? "Сравнения" : locale === "en" ? "Comparisons" : "Порівняння", href: `/${locale}/porivnyannia` },
            { label: c.crumbThis },
          ]} />
          <div className="mt-6 space-y-3">
            <UpdatedBadge date="2026-05-29" locale={locale} />
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-brand)]">{c.eyebrow}</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">{c.title}</h1>
            <p className="text-lg text-white/75">{c.subtitle}</p>
          </div>
          <div className="mt-5 space-y-4">
            <TldrBlock text={c.tldr} pageName={c.titleMeta} pageUrl={`https://sky-fort.ca${path}`} />
            <AuthorByline locale={locale} />
          </div>
          <p className="mt-6 text-base text-white/80 leading-relaxed">{c.intro}</p>
        </div>
      </section>

      {/* Comparison table — the AI-citation centerpiece */}
      <section className="px-6 pb-12">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/10">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-white/[0.06] text-xs font-bold uppercase tracking-wider">
            <div className="p-3 text-white/50"></div>
            <div className="p-3 text-[var(--color-brand)] border-l border-white/10">{c.optionA}</div>
            <div className="p-3 text-white/80 border-l border-white/10">{c.optionB}</div>
          </div>
          {c.rows.map((r, i) => (
            <div key={i} className={`grid grid-cols-[1.4fr_1fr_1fr] text-sm ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}>
              <div className="p-3 font-semibold text-white/70">{r.aspect}</div>
              <div className="p-3 text-white/85 border-l border-white/10">{r.a}</div>
              <div className="p-3 text-white/85 border-l border-white/10">{r.b}</div>
            </div>
          ))}
        </div>
      </section>

      {/* When each makes sense — framework, not verdict */}
      <section className="px-6 pb-12">
        <div className="mx-auto max-w-3xl grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-[var(--color-brand)]/30 bg-[var(--color-brand)]/[0.06] p-5">
            <h2 className="text-lg font-bold text-[var(--color-brand)]">{c.whenATitle}</h2>
            <ul className="mt-3 space-y-2">
              {c.whenA.map((it, i) => (
                <li key={i} className="flex gap-2 text-sm text-white/85">
                  <Check size={16} className="mt-0.5 flex-shrink-0 text-[var(--color-brand)]" aria-hidden="true" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-5">
            <h2 className="text-lg font-bold text-white">{c.whenBTitle}</h2>
            <ul className="mt-3 space-y-2">
              {c.whenB.map((it, i) => (
                <li key={i} className="flex gap-2 text-sm text-white/85">
                  <Check size={16} className="mt-0.5 flex-shrink-0 text-white/50" aria-hidden="true" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <RelatedLinks heading={locale === "ru" ? "Связанные материалы" : locale === "en" ? "Related" : "Пов'язані матеріали"} items={relatedItems} />

      <StaticFaq faq={c.faqs} heading={locale === "ru" ? "Частые вопросы" : locale === "en" ? "FAQ" : "Часті питання"} jsonLdId={`https://sky-fort.ca${path}#faq`} />

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">
            {locale === "ru" ? "Не уверен что подходит тебе?" : locale === "en" ? "Not sure which fits you?" : "Не впевнений що підходить тобі?"}
          </h2>
          <p className="mt-3 text-white/75">
            {locale === "ru" ? "Discovery call 30 минут, без оплаты — разберём твою ситуацию." : locale === "en" ? "30-minute discovery call, no fee — we'll work through your situation." : "Discovery call 30 хвилин, без оплати — розберемо твою ситуацію."}
          </p>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--color-brand)] px-7 py-4 text-base font-bold text-white transition-colors hover:bg-[var(--color-brand-hover)]">
            {locale === "ru" ? "Бесплатный звонок" : locale === "en" ? "Free discovery call" : "Безкоштовний дзвінок"}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}

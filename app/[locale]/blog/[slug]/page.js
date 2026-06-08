import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Calendar, Clock, ArrowRight, ArrowLeft, ShieldCheck } from "lucide-react";
import { SUPPORTED_LOCALES } from "../../../_i18n/dictionary";
import { getPostBySlug, getPostSlugs, getAllPosts } from "../../../_lib/blog";
import Breadcrumbs from "../../../_components/Breadcrumbs";
import TopicSuggestForm from "../../../_components/TopicSuggestForm";
import StickyBlogCTA from "../../../_components/StickyBlogCTA";
import CraLimits2026 from "../../../_components/CraLimits2026";

// Which pillars get the 2026 CRA limits reference table embedded below
// the article body. Skip Pillar values that don't relate to tax-sheltered
// accounts (e.g., a generic "Newcomer" post still benefits; "Trust" doesn't).
const PILLARS_NEEDING_LIMITS = new Set(["TFSA", "RRSP", "FHSA", "RESP", "Newcomer"]);

const CALENDLY = "https://calendly.com/andriushchenko-partners/new-meeting";

const COPY = {
  uk: {
    crumbHome: "Головна",
    crumbBlog: "Блог",
    readingMin: "хв читання",
    publishedOn: "Опубліковано",
    bookCta: "Безкоштовний 30-хв дзвінок",
    related: "Інші статті",
    notFound: "Стаття не знайдена",
    back: "Усі статті",
    authorRole: "Licensed Dealing Representative",
    authorFirm: "Axcess Capital Advisors Inc.",
    authorNrd: "NRD #4575551",
    authorVerify: "Перевірити реєстрацію",
    reviewedLine: "Освітній матеріал. Узгоджено з compliance Axcess Capital.",
  },
  ru: {
    crumbHome: "Главная",
    crumbBlog: "Блог",
    readingMin: "мин чтения",
    publishedOn: "Опубликовано",
    bookCta: "Бесплатный 30-мин звонок",
    related: "Другие статьи",
    notFound: "Статья не найдена",
    back: "Все статьи",
    authorRole: "Licensed Dealing Representative",
    authorFirm: "Axcess Capital Advisors Inc.",
    authorNrd: "NRD #4575551",
    authorVerify: "Проверить регистрацию",
    reviewedLine: "Образовательный материал. Согласовано с compliance Axcess Capital.",
  },
  en: {
    crumbHome: "Home",
    crumbBlog: "Blog",
    readingMin: "min read",
    publishedOn: "Published",
    bookCta: "Free 30-min discovery call",
    related: "Other articles",
    notFound: "Post not found",
    back: "All posts",
    authorRole: "Licensed Dealing Representative",
    authorFirm: "Axcess Capital Advisors Inc.",
    authorNrd: "NRD #4575551",
    authorVerify: "Verify registration",
    reviewedLine: "Educational content. Reviewed under Axcess Capital's compliance framework.",
  },
};

const NRD_URL = "https://info.securities-administrators.ca/nrsmobile/nrssearch.aspx";

export async function generateStaticParams() {
  const params = [];
  for (const locale of SUPPORTED_LOCALES) {
    for (const slug of getPostSlugs(locale)) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const post = getPostBySlug(locale, slug);
  if (!post) return { title: "Not found" };

  const path = `/${locale}/blog/${slug}`;
  // hreflang only includes locales where the slug actually exists.
  const alternates = {};
  for (const l of SUPPORTED_LOCALES) {
    if (getPostBySlug(l, slug)) {
      alternates[{ uk: "uk", ru: "ru", en: "en-CA" }[l]] = `/${l}/blog/${slug}`;
    }
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: path, languages: alternates },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://sky-fort.ca${path}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      // images: omitted on purpose — opengraph-image.js in this folder is
      // auto-discovered by Next and generates a per-post branded card via
      // Satori (next/og). Setting `images` here would override it with the
      // generic /og-image.png fallback.
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      // Same as above — Twitter falls back to the OG image when no
      // twitter-image.js is present, so the dynamic card is reused.
    },
  };
}

// MDX components — keep minimal; can be extended later (Callout, Stat, etc.)
const mdxComponents = {
  h1: (props) => (
    <h1 className="mt-12 font-display text-4xl leading-[1.15]! text-white md:text-5xl" {...props} />
  ),
  h2: (props) => (
    <h2 className="mt-12 font-display text-3xl leading-[1.15]! text-white md:text-4xl" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-8 font-display text-2xl leading-[1.2]! text-white md:text-3xl" {...props} />
  ),
  p: (props) => (
    <p className="mt-5 text-lg leading-relaxed text-[var(--color-fg-body)]" {...props} />
  ),
  ul: (props) => (
    <ul className="mt-5 list-disc space-y-2 pl-6 text-lg text-[var(--color-fg-body)]" {...props} />
  ),
  ol: (props) => (
    <ol className="mt-5 list-decimal space-y-2 pl-6 text-lg text-[var(--color-fg-body)]" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-8 rounded-r-lg border-l-4 border-[var(--color-brand)] bg-[var(--color-brand-soft)] px-6 py-5 text-lg italic text-[var(--color-fg)]"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="font-semibold text-[var(--color-brand)] underline underline-offset-2 transition-colors duration-150 ease-[var(--ease-out)] hover:text-[var(--color-brand-hover)]"
      {...props}
    />
  ),
  table: (props) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-[var(--color-border)]">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4 py-3 text-left font-semibold text-white" {...props} />
  ),
  td: (props) => (
    <td className="border-b border-[var(--color-border)] px-4 py-3 align-top text-[var(--color-fg-body)]" {...props} />
  ),
  code: (props) => (
    <code className="rounded bg-[var(--color-bg-elevated)] px-1.5 py-0.5 font-mono text-sm text-[var(--color-brand)]" {...props} />
  ),
  hr: (props) => (
    <hr className="my-12 border-[var(--color-border-strong)]" {...props} />
  ),
  strong: (props) => (
    <strong className="font-semibold text-white" {...props} />
  ),
};

export default async function BlogPostPage({ params }) {
  const { locale, slug } = await params;
  const post = getPostBySlug(locale, slug);
  if (!post || post.draft) notFound();

  const m = COPY[locale] || COPY.uk;

  // Article JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: `https://sky-fort.ca${post.ogImage}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://sky-fort.ca/uk/pro-mene",
    },
    publisher: {
      "@type": "Organization",
      name: "SkyFort Wealth",
      logo: {
        "@type": "ImageObject",
        url: "https://sky-fort.ca/icon.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://sky-fort.ca/${locale}/blog/${slug}`,
    },
    keywords: post.tags.join(", "),
    inLanguage: { uk: "uk", ru: "ru", en: "en-CA" }[locale],
  };

  // Speakable JSON-LD — voice-search optimization (Google Assistant,
  // AI-Overview audio readers). Targets the first blockquote in every
  // post — by convention our pillar posts open with a "> **Коротко:**"
  // / "> **TL;DR:**" callout that summarizes the post in 2-3 sentences.
  // The `article blockquote:first-of-type` selector picks that block
  // without us needing to add an id to every MDX file.
  //
  // Pair with the Article schema above (different @types; both valid
  // simultaneously per Google's structured-data guidelines).
  const speakableJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://sky-fort.ca/${locale}/blog/${slug}#webpage`,
    url: `https://sky-fort.ca/${locale}/blog/${slug}`,
    name: post.title,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["article header h1", "article header p", "article blockquote:first-of-type"],
    },
  };

  const related = getAllPosts(locale)
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <main id="main" className="min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-6 pt-28 pb-24 md:pt-32">
        <Breadcrumbs
          items={[
            { label: m.crumbHome, href: `/${locale}` },
            { label: m.crumbBlog, href: `/${locale}/blog` },
            { label: post.title },
          ]}
        />

        <header className="mt-10">
          <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-fg-subtle)]">
            {post.pillar && (
              <span className="inline-flex items-center rounded-full bg-[var(--color-brand-soft)] px-3 py-1 font-semibold uppercase tracking-wider text-[var(--color-brand)]">
                {post.pillar}
              </span>
            )}
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" aria-hidden="true" />
              <time dateTime={post.date}>{post.date}</time>
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {post.readingMinutes} {m.readingMin}
            </span>
          </div>

          <h1 className="mt-5 font-display text-4xl text-white md:text-6xl">{post.title}</h1>
          <p className="mt-6 text-xl text-[var(--color-fg-body)]">{post.description}</p>

          {/* Author byline + compliance review line — YMYL E-E-A-T signal.
              Per the May-28-2026 audit: every blog post should show who
              wrote it, qualifications, and that a compliance review happened. */}
          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 md:p-5">
            <Link
              href={`/${locale}/pro-mene`}
              className="block flex-shrink-0"
              aria-label={post.author}
            >
              <Image
                src="/andrii-thumb.jpg"
                alt={post.author}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full border border-[var(--color-border)] object-cover"
              />
            </Link>
            <div className="min-w-0 flex-1">
              <Link
                href={`/${locale}/pro-mene`}
                className="font-semibold text-white transition-colors duration-150 ease-[var(--ease-out)] hover:text-[var(--color-brand)]"
              >
                {post.author}
              </Link>
              <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[var(--color-fg-muted)]">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-[var(--color-brand)]" aria-hidden="true" />
                  {m.authorRole}
                </span>
                <span aria-hidden="true">·</span>
                <span>{m.authorFirm}</span>
                <span aria-hidden="true">·</span>
                <a
                  href={NRD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--color-brand)] transition-colors duration-150 ease-[var(--ease-out)] hover:text-[var(--color-brand-hover)]"
                >
                  {m.authorNrd}
                </a>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-[var(--color-fg-subtle)]">
                {m.reviewedLine}
              </p>
            </div>
          </div>
        </header>

        <div className="prose prose-invert mt-8 max-w-none">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        {/* 2026 CRA limits reference table — single source of truth across all
            tax-shelter content. Renders for TFSA / RRSP / FHSA / RESP /
            Newcomer pillars (where readers need annual + cumulative limits
            in one place). Source-attributed inline for AI Overview citation
            density per the 4th re-audit (2.13). */}
        {PILLARS_NEEDING_LIMITS.has(post.pillar) && (
          <CraLimits2026 locale={locale} />
        )}

        {/* In-post CTA */}
        <aside className="mt-16 rounded-2xl border border-[var(--color-brand)]/30 bg-gradient-to-br from-[var(--color-bg-card)] to-[#1a2d4a] p-8 text-center md:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-brand)]">
            Discovery call
          </p>
          <p className="mt-4 font-display text-2xl text-white md:text-3xl">
            Хочеш персональний розбір своєї ситуації?
          </p>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[var(--color-brand-hover)]"
          >
            {m.bookCta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </aside>

        {/* Flagship tools — contextual deep-links so every blog post passes
            link equity to the 4 YMYL trust pages. 4th re-audit (1.12) flagged
            blog body having 0 contextual links to these new pages. */}
        <section className="mt-12 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-7">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-brand)]">
            {locale === "en"
              ? "Tools mentioned on this page"
              : locale === "ru"
              ? "Инструменты по теме"
              : "Інструменти по темі"}
          </h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            <li>
              <Link
                href={`/${locale}/eligibility`}
                className="flex items-start gap-3 rounded-lg border border-[var(--color-border)] p-4 transition-colors hover:border-[var(--color-brand)]/40"
              >
                <span className="mt-0.5 text-lg" aria-hidden="true">→</span>
                <div>
                  <div className="font-semibold text-white">
                    {locale === "en" ? "Eligible Investor self-check" : locale === "ru" ? "Self-check Eligible Investor" : "Self-check Eligible Investor"}
                  </div>
                  <div className="mt-0.5 text-xs text-[var(--color-fg-muted)]">
                    {locale === "en" ? "4 questions · 60 seconds · NI 45-106" : locale === "ru" ? "4 вопроса · 60 секунд · NI 45-106" : "4 питання · 60 секунд · NI 45-106"}
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/perevirka`}
                className="flex items-start gap-3 rounded-lg border border-[var(--color-border)] p-4 transition-colors hover:border-[var(--color-brand)]/40"
              >
                <span className="mt-0.5 text-lg" aria-hidden="true">→</span>
                <div>
                  <div className="font-semibold text-white">
                    {locale === "en" ? "Verify me in 3 minutes" : locale === "ru" ? "Проверь меня за 3 минуты" : "Перевір мене за 3 хвилини"}
                  </div>
                  <div className="mt-0.5 text-xs text-[var(--color-fg-muted)]">
                    {locale === "en" ? "NRD #4575551 · CSA / ASC / IFSE / OBSI" : locale === "ru" ? "NRD #4575551 · CSA / ASC / IFSE / OBSI" : "NRD #4575551 · CSA / ASC / IFSE / OBSI"}
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/porivnyannia`}
                className="flex items-start gap-3 rounded-lg border border-[var(--color-border)] p-4 transition-colors hover:border-[var(--color-brand)]/40"
              >
                <span className="mt-0.5 text-lg" aria-hidden="true">→</span>
                <div>
                  <div className="font-semibold text-white">
                    {locale === "en" ? "EMD vs CIRO vs Insurance" : locale === "ru" ? "EMD vs CIRO vs Insurance" : "EMD vs CIRO vs Insurance"}
                  </div>
                  <div className="mt-0.5 text-xs text-[var(--color-fg-muted)]">
                    {locale === "en" ? "Which advisor license do you need?" : locale === "ru" ? "Какая лицензия тебе нужна?" : "Яка ліцензія тобі потрібна?"}
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/calculators/tfsa-growth`}
                className="flex items-start gap-3 rounded-lg border border-[var(--color-border)] p-4 transition-colors hover:border-[var(--color-brand)]/40"
              >
                <span className="mt-0.5 text-lg" aria-hidden="true">→</span>
                <div>
                  <div className="font-semibold text-white">
                    {locale === "en" ? "TFSA growth calculator" : locale === "ru" ? "TFSA калькулятор" : "TFSA калькулятор"}
                  </div>
                  <div className="mt-0.5 text-xs text-[var(--color-fg-muted)]">
                    {locale === "en" ? "20-year compound · bank vs ETF" : locale === "ru" ? "20 лет compound · банк vs ETF" : "20 років compound · банк vs ETF"}
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </section>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl text-white md:text-3xl">{m.related}</h2>
            <ul className="mt-6 grid gap-4">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/${locale}/blog/${p.slug}`}
                    className="card-glow block rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5"
                  >
                    <h3 className="font-semibold text-white">{p.title}</h3>
                    <p className="mt-2 text-sm text-[var(--color-fg-muted)]">{p.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Topic suggestion form */}
        <div className="mt-16">
          <TopicSuggestForm
            locale={locale}
            source={`blog_post:${slug}`}
          />
        </div>

        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-brand)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            {m.back}
          </Link>
        </div>
      </article>

      <StickyBlogCTA
        locale={locale}
        calendlyUrl={CALENDLY}
        slug={slug}
      />
    </main>
  );
}

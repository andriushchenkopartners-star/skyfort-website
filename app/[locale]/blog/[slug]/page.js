import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Calendar, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { SUPPORTED_LOCALES } from "../../../_i18n/dictionary";
import { getPostBySlug, getPostSlugs, getAllPosts } from "../../../_lib/blog";
import Breadcrumbs from "../../../_components/Breadcrumbs";
import TopicSuggestForm from "../../../_components/TopicSuggestForm";
import StickyBlogCTA from "../../../_components/StickyBlogCTA";

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
  },
};

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
      alternates[{ uk: "uk-UA", ru: "ru-RU", en: "en-CA" }[l]] = `/${l}/blog/${slug}`;
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
      images: [{ url: post.ogImage }],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.ogImage],
    },
  };
}

// MDX components — keep minimal; can be extended later (Callout, Stat, etc.)
const mdxComponents = {
  h1: (props) => (
    <h1 className="mt-12 font-display text-4xl text-white md:text-5xl" {...props} />
  ),
  h2: (props) => (
    <h2 className="mt-12 font-display text-3xl text-white md:text-4xl" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-8 font-display text-2xl text-white md:text-3xl" {...props} />
  ),
  p: (props) => (
    <p className="mt-5 text-lg leading-relaxed text-[var(--color-fg-muted)]" {...props} />
  ),
  ul: (props) => (
    <ul className="mt-5 list-disc space-y-2 pl-6 text-lg text-[var(--color-fg-muted)]" {...props} />
  ),
  ol: (props) => (
    <ol className="mt-5 list-decimal space-y-2 pl-6 text-lg text-[var(--color-fg-muted)]" {...props} />
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
      className="font-semibold text-[var(--color-brand)] underline underline-offset-2 hover:text-[var(--color-brand-hover)]"
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
    <td className="border-b border-[var(--color-border)] px-4 py-3 align-top text-[var(--color-fg-muted)]" {...props} />
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
    inLanguage: { uk: "uk-UA", ru: "ru-RU", en: "en-CA" }[locale],
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
          <p className="mt-6 text-xl text-[var(--color-fg-muted)]">{post.description}</p>
        </header>

        <div className="prose prose-invert mt-8 max-w-none">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

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

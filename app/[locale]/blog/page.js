import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { SUPPORTED_LOCALES } from "../../_i18n/dictionary";
import { getAllPosts } from "../../_lib/blog";
import Breadcrumbs from "../../_components/Breadcrumbs";
import TopicSuggestForm from "../../_components/TopicSuggestForm";

const META = {
  uk: {
    title: "Блог — освітні матеріали про фінанси в Канаді для українців",
    description:
      "Гайди про TFSA, RRSP, FHSA, exempt market, real estate в Канаді. Без банківських казок. Від Licensed Dealing Representative у Калгарі.",
    h1: "Блог",
    sub: "Освітні гайди про канадські фінанси для українців та новоприбулих. Все CCO-approved, без обіцянок дохідності.",
    crumbHome: "Головна",
    crumbThis: "Блог",
    readingMin: "хв читання",
    empty: "Скоро тут будуть статті. Слідкуй за оновленнями.",
  },
  ru: {
    title: "Блог — образовательные материалы о финансах в Канаде",
    description:
      "Гайды про TFSA, RRSP, FHSA, exempt market, real estate в Канаде. Без банковских сказок. От Licensed Dealing Representative в Калгари.",
    h1: "Блог",
    sub: "Образовательные гайды про канадские финансы для русскоязычных и новоприбывших.",
    crumbHome: "Главная",
    crumbThis: "Блог",
    readingMin: "мин чтения",
    empty: "Скоро здесь будут статьи. Следи за обновлениями.",
  },
  en: {
    title: "Blog — Canadian finance for newcomers",
    description:
      "Educational guides on TFSA, RRSP, FHSA, exempt market, real estate in Canada. No bank fairy tales. From a Licensed Dealing Representative in Calgary.",
    h1: "Blog",
    sub: "Educational guides on Canadian finance for newcomers. All CCO-approved, no return promises.",
    crumbHome: "Home",
    crumbThis: "Blog",
    readingMin: "min read",
    empty: "Posts coming soon — check back.",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const m = META[locale] || META.uk;
  const path = `/${locale}/blog`;
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [
      { uk: "uk", ru: "ru", en: "en-CA" }[l],
      `/${l}/blog`,
    ])
  );
  alternates["x-default"] = "/uk/blog";
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: path, languages: alternates },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `https://sky-fort.ca${path}`,
      type: "website",
    },
  };
}

export default async function BlogHubPage({ params }) {
  const { locale } = await params;
  const m = META[locale] || META.uk;
  const posts = getAllPosts(locale);

  return (
    <main id="main" className="min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)]">
      <div className="mx-auto max-w-5xl px-6 pt-28 md:pt-32">
        <Breadcrumbs
          items={[
            { label: m.crumbHome, href: `/${locale}` },
            { label: m.crumbThis },
          ]}
        />

        <header className="mt-8 mb-16 max-w-3xl">
          <h1 className="font-display text-5xl text-white md:text-6xl">{m.h1}</h1>
          <p className="mt-6 text-lg text-[var(--color-fg-muted)] md:text-xl">{m.sub}</p>
        </header>

        {posts.length === 0 ? (
          <p className="text-[var(--color-fg-muted)]">{m.empty}</p>
        ) : (
          <ul className="grid gap-6 pb-24 md:gap-8">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="card-glow group block rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-7 transition-all md:p-9"
                >
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-fg-subtle)]">
                    {post.pillar && (
                      <span className="inline-flex items-center rounded-full bg-[var(--color-brand-soft)] px-3 py-1 text-[var(--color-brand)] font-semibold uppercase tracking-wider">
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

                  <h2 className="mt-4 font-display text-2xl text-white md:text-3xl">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-[var(--color-fg-muted)] leading-relaxed">
                    {post.description}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand)]">
                    Читати далі
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* Topic suggestion form */}
        <div className="mt-16 mb-24">
          <TopicSuggestForm locale={locale} source="blog_hub" />
        </div>
      </div>
    </main>
  );
}

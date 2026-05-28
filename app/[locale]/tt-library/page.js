// app/[locale]/tt-library/page.js
// TikTok transcript library — searchable index of every published TikTok
// video with full text transcript + VideoObject schema. AI-search play:
// Lantern 2026 reports YouTube is the most-cited domain in AI answers
// (2× more than #2). Most TikTok video discoverability happens through
// indexed transcripts on creator sites, not the TikTok app itself.
//
// Status: framework launched with 3 representative seed entries (TFSA
// fundamentals, exempt market, RSU). Andrii feeds Whisper transcripts +
// new TikTok URLs into the seed array as videos are published.
//
// Structure:
//   - Per-locale COPY with intro + video list
//   - Each video entry includes: title, description, slug, thumbnail,
//     uploadDate, tiktokUrl, duration, transcript (3-5 short paragraphs)
//   - ItemList JSON-LD wrapping all VideoObject children
//   - Individual VideoObject JSON-LD per item (inline expansion via
//     <details> for transcript reading)

import Link from "next/link";
import { Play, Clock } from "lucide-react";
import Logo from "../../_components/Logo";
import Breadcrumbs from "../../_components/Breadcrumbs";
import LangSwitcher from "../../_components/LangSwitcher";
import VideoObjectJsonLd from "../../_components/VideoObjectJsonLd";
import { SUPPORTED_LOCALES } from "../../_i18n/dictionary";

const TIKTOK_PROFILE = "https://www.tiktok.com/@andrii.andriushchenko";

// Seed library — UK only for now (TikTok content is UA-primary).
// To add a new video: append entry with title, slug, description,
// thumbnailUrl (TikTok thumbnail or hosted JPG), uploadDate (ISO),
// tiktokUrl (full), duration (PT format), transcript (full text).
const VIDEO_SEEDS = [
  {
    slug: "tfsa-osnovy-2026",
    title: "TFSA для українців у Канаді — як заробляти без податків",
    description:
      "Як працює Tax-Free Savings Account у Канаді, який ліміт у 2026 році, які найпоширеніші помилки newcomers роблять з TFSA.",
    thumbnailUrl: "https://sky-fort.ca/og-image.png",
    uploadDate: "2026-02-15",
    tiktokUrl: `${TIKTOK_PROFILE}`,
    duration: "PT1M12S",
    transcript:
      "Привіт. TFSA — Tax-Free Savings Account — це канадський інструмент через який ти можеш інвестувати і не платити податки на capital gains, не платити на dividends, не платити на withdrawal. У 2026 ліміт $7,000 на рік. Cumulative room для tax-resident з 2009 — $109,000. Але для newcomers головне — твоя contribution room починає рахуватись з року коли ти стаєш tax resident. Не з року народження. Тобто якщо ти приїхав у 2024 — у тебе вже $14,000+ доступно у 2026. Найпоширеніша помилка — overcontribution. Перевищиш ліміт на $1,000 — штраф 1% на місяць, поки не виправиш. Друга — тримати у TFSA US-listed stocks без знання що CRA може стягувати 15% withholding на US dividends в TFSA. Третя — \"відкласти\" TFSA до того моменту коли буде \"багато грошей\". Compounding tax-free працює тим краще, чим раніше почнеш. Навіть $50 на місяць у broad-market ETF за 30 років = серйозні гроші.",
  },
  {
    slug: "exempt-market-shcho-tse",
    title: "Exempt market — що це і кому підходить",
    description:
      "Що таке exempt market у Канаді, в чому різниця з public market, які securities доступні через EMD, хто може інвестувати.",
    thumbnailUrl: "https://sky-fort.ca/og-image.png",
    uploadDate: "2026-03-10",
    tiktokUrl: `${TIKTOK_PROFILE}`,
    duration: "PT1M45S",
    transcript:
      "Public market — це Toronto Stock Exchange, securities які торгуються кожен день, prospectus поданий до regulator, можна купити через любого broker. Exempt market — це securities які НЕ потребують prospectus тому що продаються тільки certain категорії investors. Вони регулюються NI 45-106 (National Instrument). Доступні через EMD — Exempt Market Dealer — фірму з ліцензією від CSA. Я працюю через Axcess Capital Advisors Inc., NRD #4575551. Що там можна знайти? MICs (Mortgage Investment Corporations), private REITs, development LPs, private equity. Чому це цікаво? Не корелюються з stock market, target returns 8-12% historical для diversified portfolio. Хто може інвестувати? Eligible Investor ($75K solo income або $125K household + $400K assets) або Accredited Investor ($200K solo або $300K household income, або $1M+ assets). Self-check за 60 секунд — /uk/eligibility на моєму сайті.",
  },
  {
    slug: "rsu-vesting-canada",
    title: "RSU vesting у Канаді — як не переплатити податки",
    description:
      "Що робити коли твій RSU cliff vesting додає $50-100K до твого Т4, як використати RRSP для tax shelter, чи продавати vested shares одразу.",
    thumbnailUrl: "https://sky-fort.ca/og-image.png",
    uploadDate: "2026-03-25",
    tiktokUrl: `${TIKTOK_PROFILE}`,
    duration: "PT1M30S",
    transcript:
      "Restricted Stock Units — це форма compensation популярна в IT. Коли vest наступає — vested shares додаються до твого T4 income за fair market value у день vesting. Тобто якщо vest на $80K — у тебе $80K extra income цього року. У Ontario це штовхає тебе у 53% marginal bracket. У Alberta 47%. Стратегія №1: RRSP. Максимум RRSP contribution у рік vesting = $33,810 (2026 ліміт). При 47% marginal — це $15K immediate tax refund. Стратегія №2: не тримай vested shares у employer stock. Концентраційний ризик подвійний — твоя зарплата залежить від цієї компанії, і вже твоя investment portfolio залежить від цієї компанії. Класичне правило: 80% продай одразу, 20% залиш якщо віриш. Стратегія №3: refund з RRSP реінвестуй у TFSA. Подвоюєш ефект.",
  },
];

const COPY = {
  uk: {
    titleMeta: "TikTok library — транскрипти всіх відео · SkyFort",
    descriptionMeta:
      "Повна бібліотека TikTok-відео від Andrii Andriushchenko з транскриптами. TFSA, exempt market, RSU, real estate. Licensed DR, NRD #4575551.",
    crumbHome: "Головна",
    crumbThis: "TikTok library",
    eyebrow: "TikTok transcript library",
    title: "Бібліотека TikTok відео з транскриптами",
    subtitle:
      "Повний текст кожного відео — для тих хто читає швидше за переглядання, для AI асистентів, і для пошуку конкретних тем.",
    introBlock:
      "TikTok — мій головний organic канал; кожне відео — це коротке educational пояснення одного аспекту canadian personal finance. Тут зберігаються транскрипти, щоб ти міг швидко знайти відповідь без перегляду, та щоб AI-помічники (ChatGPT, Perplexity, Claude) могли цитувати цей контент.",
    profileCta: "Слідкуй у TikTok →",
    videoIntro:
      "Кожний запис нижче — це окреме TikTok-відео. Розгорни \"Транскрипт\" щоб прочитати повний текст. Кнопка \"Дивитись\" відкриває оригінал у TikTok.",
    transcriptToggle: "Транскрипт",
    watchCta: "Дивитись у TikTok →",
    addingMoreTitle: "Бібліотека росте",
    addingMoreBody:
      "Зараз тут 3 seed-відео. Я додаю транскрипти всіх нових публікацій. Підпишись у TikTok щоб не пропустити нові випуски, або повертайся сюди щоб переглянути архів.",
  },
  ru: {
    titleMeta: "TikTok library — транскрипты всех видео · SkyFort",
    descriptionMeta:
      "Полная библиотека TikTok-видео от Andrii Andriushchenko с транскриптами. TFSA, exempt market, RSU, real estate. Licensed DR, NRD #4575551.",
    crumbHome: "Главная",
    crumbThis: "TikTok library",
    eyebrow: "TikTok transcript library",
    title: "Библиотека TikTok видео с транскриптами",
    subtitle:
      "Полный текст каждого видео — для тех кто читает быстрее просмотра, для AI-ассистентов, и для поиска конкретных тем.",
    introBlock:
      "TikTok — мой главный organic канал; каждое видео — короткое educational объяснение одного аспекта canadian personal finance. Здесь хранятся транскрипты для быстрого поиска и для индексации AI-помощниками.",
    profileCta: "Подписаться в TikTok →",
    videoIntro:
      "Каждая запись ниже — отдельное TikTok-видео. Разверни \"Транскрипт\" для полного текста. Кнопка \"Смотреть\" откроет оригинал в TikTok.",
    transcriptToggle: "Транскрипт",
    watchCta: "Смотреть в TikTok →",
    addingMoreTitle: "Библиотека растёт",
    addingMoreBody:
      "Сейчас здесь 3 seed-видео. Я добавляю транскрипты всех новых публикаций. Подпишись в TikTok чтобы не пропустить новые выпуски.",
  },
  en: {
    titleMeta: "TikTok library — full video transcripts · SkyFort",
    descriptionMeta:
      "Complete library of Andrii Andriushchenko's TikTok videos with transcripts. TFSA, exempt market, RSUs, real estate. Licensed DR, NRD #4575551.",
    crumbHome: "Home",
    crumbThis: "TikTok library",
    eyebrow: "TikTok transcript library",
    title: "TikTok video library with full transcripts",
    subtitle:
      "Full text of every video — for readers who prefer text, for AI assistants, and for searching specific topics.",
    introBlock:
      "TikTok is my main organic channel; every video is a short educational explanation of one aspect of Canadian personal finance. Transcripts live here for quick search and AI indexability.",
    profileCta: "Follow on TikTok →",
    videoIntro:
      "Each entry below is a separate TikTok video. Expand \"Transcript\" for the full text. The \"Watch\" button opens the original on TikTok.",
    transcriptToggle: "Transcript",
    watchCta: "Watch on TikTok →",
    addingMoreTitle: "Library is growing",
    addingMoreBody:
      "3 seed videos to start. New transcripts added with every TikTok upload. Follow on TikTok to catch new posts in real time.",
  },
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  const path = `/${locale}/tt-library`;
  const alternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [
      { uk: "uk", ru: "ru", en: "en-CA" }[l],
      `/${l}/tt-library`,
    ])
  );
  alternates["x-default"] = "/uk/tt-library";
  return {
    title: c.titleMeta,
    description: c.descriptionMeta,
    alternates: { canonical: path, languages: alternates },
    openGraph: {
      title: c.titleMeta,
      description: c.descriptionMeta,
      url: `https://sky-fort.ca${path}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: c.titleMeta,
      description: c.descriptionMeta,
    },
  };
}

function buildItemListJsonLd(locale, c, path) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: c.title,
    description: c.subtitle,
    inLanguage: { uk: "uk", ru: "ru", en: "en-CA" }[locale],
    url: `https://sky-fort.ca${path}`,
    numberOfItems: VIDEO_SEEDS.length,
    itemListElement: VIDEO_SEEDS.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "VideoObject",
        name: v.title,
        description: v.description,
        thumbnailUrl: v.thumbnailUrl,
        uploadDate: v.uploadDate,
        contentUrl: v.tiktokUrl,
        duration: v.duration,
      },
    })),
  };
}

export default async function TtLibraryPage({ params }) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.uk;
  const path = `/${locale}/tt-library`;
  const itemListJsonLd = buildItemListJsonLd(locale, c, path);
  const langTag = { uk: "uk", ru: "ru", en: "en-CA" }[locale];

  return (
    <main id="main" className="min-h-screen bg-[var(--color-bg)] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      {VIDEO_SEEDS.map((v) => (
        <VideoObjectJsonLd
          key={v.slug}
          name={v.title}
          description={v.description}
          thumbnailUrl={v.thumbnailUrl}
          uploadDate={v.uploadDate}
          contentUrl={v.tiktokUrl}
          duration={v.duration}
          transcript={v.transcript}
          inLanguage={langTag}
        />
      ))}

      <header className="pt-8 pb-4 px-6">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <Link href={`/${locale}`} aria-label="SkyFort home">
            <Logo variant="full" size="md" />
          </Link>
          <LangSwitcher />
        </div>
      </header>

      <section className="px-6 pt-4 pb-12">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs
            items={[
              { label: c.crumbHome, href: `/${locale}` },
              { label: c.crumbThis },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-brand)]">
              {c.eyebrow}
            </p>
            <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold leading-tight">
              {c.title}
            </h1>
            <p className="mt-4 text-lg text-white/75">{c.subtitle}</p>
            <p className="mt-4 text-base text-white/70">{c.introBlock}</p>
            <a
              href={TIKTOK_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block rounded-xl bg-[var(--color-brand)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--color-brand-hover)]"
            >
              {c.profileCta}
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-sm text-white/60">{c.videoIntro}</p>
          <div className="space-y-4">
            {VIDEO_SEEDS.map((v) => (
              <article
                key={v.slug}
                id={v.slug}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <h2 className="text-lg sm:text-xl font-bold leading-snug">
                  {v.title}
                </h2>
                <p className="mt-2 text-sm text-white/70">{v.description}</p>
                <div className="mt-3 flex items-center gap-4 text-xs text-white/50">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={13} aria-hidden="true" />
                    {v.duration.replace("PT", "").toLowerCase()}
                  </span>
                  <time dateTime={v.uploadDate}>{v.uploadDate}</time>
                </div>
                <details className="group mt-4 rounded-xl border border-white/10 bg-black/30 open:border-[var(--color-brand)]/40">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-white/85">
                    <span>{c.transcriptToggle}</span>
                    <span
                      aria-hidden="true"
                      className="text-xl leading-none text-[var(--color-brand)] transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="border-t border-white/10 px-4 py-4 text-sm leading-relaxed text-white/75">
                    {v.transcript}
                  </div>
                </details>
                <a
                  href={v.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)]"
                >
                  <Play size={14} aria-hidden="true" />
                  {c.watchCta}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/[0.07] p-6">
            <h2 className="text-xl font-bold">{c.addingMoreTitle}</h2>
            <p className="mt-2 text-sm text-white/80 leading-relaxed">
              {c.addingMoreBody}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

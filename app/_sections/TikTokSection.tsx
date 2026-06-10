// app/_sections/TikTokSection.tsx
// Homepage TikTok block. TikTok is the #1 organic channel, so it sits just above
// the final CTA as the bottom of the funnel. Renders a lazy facade (poster →
// embed.js only on click) for the creator feed, plus a UTM-tagged link out.

import { ArrowUpRight } from "lucide-react";
import TikTokEmbed from "../_components/TikTokEmbed";
import TikTokIcon from "../_components/TikTokIcon";
import { CONFIG } from "../_i18n/config";

type Locale = "uk" | "ru" | "en";

interface TikTokCopy {
  eyebrow: string;
  headline: string;
  lead: string;
  poster: string;
  posterSub: string;
  watch: string;
}

const COPY: Record<Locale, TikTokCopy> = {
  uk: {
    eyebrow: "TikTok",
    headline: "Фінанси простою мовою — щотижня",
    lead: "Коротко про TFSA, RRSP, іпотеку та інвестиції в Канаді. Без жаргону й без порад «купи це» — лише про те, як працює система.",
    poster: CONFIG.tiktokHandle,
    posterSub: "Натисни, щоб подивитися останні відео",
    watch: "Дивитися в TikTok",
  },
  ru: {
    eyebrow: "TikTok",
    headline: "Финансы простым языком — каждую неделю",
    lead: "Коротко о TFSA, RRSP, ипотеке и инвестициях в Канаде. Без жаргона и без советов «купи это» — только о том, как работает система.",
    poster: CONFIG.tiktokHandle,
    posterSub: "Нажми, чтобы посмотреть последние видео",
    watch: "Смотреть в TikTok",
  },
  en: {
    eyebrow: "TikTok",
    headline: "Money, in plain language — every week",
    lead: "Short takes on TFSA, RRSP, mortgages and investing in Canada. No jargon, no “buy this” tips — just how the system actually works.",
    poster: CONFIG.tiktokHandle,
    posterSub: "Tap to watch the latest videos",
    watch: "Watch on TikTok",
  },
};

const UTM = "?utm_source=site&utm_medium=tiktok_section&utm_campaign=homepage";
const TIKTOK_USERNAME = CONFIG.tiktokHandle.replace(/^@/, "");

export default function TikTokSection({ locale = "uk" }: { locale?: Locale }) {
  const c = COPY[locale] || COPY.uk;

  return (
    <section className="py-20 md:py-28" aria-label={c.eyebrow}>
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-brand)]">
            <TikTokIcon className="h-4 w-4" />
            {c.eyebrow}
          </div>
          <h2 className="font-display text-3xl text-[var(--color-fg)] md:text-5xl">
            {c.headline}
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--color-fg-muted)]">
            {c.lead}
          </p>
          <a
            href={`${CONFIG.tiktok}${UTM}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine group mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition-[transform,background-color] duration-200 ease-[var(--ease-out)] hover:bg-[var(--color-brand-hover)] active:scale-[0.98]"
          >
            {c.watch}
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>

        <div className="mx-auto w-full max-w-[420px]">
          <TikTokEmbed username={TIKTOK_USERNAME} title={c.poster} subtitle={c.posterSub} />
        </div>
      </div>
    </section>
  );
}

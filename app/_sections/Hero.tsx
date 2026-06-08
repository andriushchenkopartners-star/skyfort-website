import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import { CONFIG } from "../_i18n/config";

interface HeroContent {
  hero: {
    kicker: string;
    title: string;
    titleAccent: string;
    titleEnd: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
}

export default function Hero({ content }: { content: HeroContent }) {
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
        <div className="absolute inset-0 bg-[var(--color-bg)]/68" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/80 via-transparent to-transparent" />
      </div>
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute -right-40 -top-32 h-[600px] w-[600px] rounded-full bg-[var(--color-brand)] opacity-[0.08] blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-[var(--color-brand)] opacity-[0.06] blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)]/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
        <div>
          <p className="hero-in hero-in-1 mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-brand)]">
            {content.hero.kicker}
          </p>
          <h1 className="hero-in hero-in-2 font-display-tight text-5xl text-white md:text-7xl lg:text-[80px]">
            {content.hero.title}
            <br />
            <span className="text-[var(--color-brand)]">{content.hero.titleAccent}.</span>
          </h1>
          <p className="hero-in hero-in-3 mt-6 font-display text-2xl text-[var(--color-fg-muted)] md:text-3xl">
            {content.hero.titleEnd}.
          </p>
          <p className="hero-in hero-in-4 mt-8 max-w-xl text-lg leading-relaxed text-[var(--color-fg-muted)]">
            {content.hero.sub}
          </p>
          <div className="hero-in hero-in-5 mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={CONFIG.calendlyUrl}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand)] px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition-[transform,background-color] duration-200 ease-[var(--ease-out)] hover:bg-[var(--color-brand-hover)] active:scale-[0.98]"
            >
              {content.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a
              href="#guides"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border-strong)] px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition-[transform,background-color,border-color] duration-200 ease-[var(--ease-out)] hover:border-[var(--color-brand)] hover:bg-[var(--color-bg-elevated)] active:scale-[0.98]"
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
              className="relative h-auto w-full rounded-[24px] border border-[var(--color-border)] object-cover shadow-2xl"
              style={{ aspectRatio: "4 / 5" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CONFIG } from "../_i18n/config";

export default function FinalCta({ content }) {
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
        <p className="mx-auto mt-8 max-w-xl text-lg text-[#a3a3a3]">
          {content.ctaSub}
        </p>
        <a
          href={CONFIG.calendlyUrl}
          target="_blank"
          rel="noopener"
          className="group mt-12 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-[var(--color-brand-hover)]"
        >
          {content.ctaBtn}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  );
}

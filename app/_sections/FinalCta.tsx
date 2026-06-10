import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { CONFIG } from "../_i18n/config";
import Reveal from "../_components/Reveal";

interface FinalCtaContent {
  ctaTitle: string;
  ctaSub: string;
  ctaBtn: string;
  ctaDisclosure: string;
  ctaVerify: string;
}

export default function FinalCta({
  content,
  locale = "uk",
}: {
  content: FinalCtaContent;
  locale?: string;
}) {
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
        <div className="absolute inset-0 bg-[var(--color-bg)]/85" />
      </div>
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-brand)] opacity-[0.08] blur-3xl" />
      </div>
      <Reveal as="div" stagger className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display-tight text-5xl text-white md:text-7xl">
          {content.ctaTitle}
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lg text-[var(--color-fg-muted)]">
          {content.ctaSub}
        </p>
        <a
          href={CONFIG.calendlyUrl}
          target="_blank"
          rel="noopener"
          className="btn-shine group mt-12 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-[transform,background-color] duration-200 ease-[var(--ease-out)] hover:bg-[var(--color-brand-hover)] active:scale-[0.98]"
        >
          {content.ctaBtn}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>

        {/* Clear-and-conspicuous registration disclosure at the booking
            decision point. Joint CSA/CIRO Staff Notice 31-369 treats footer-
            only disclosure as inadequate when the reader has to scroll or
            click for it — so the DR / EMD / NRD identity and the
            "educational, not advice" framing sit right beside the CTA, at a
            legible size, with an on-site path to verify the registration. */}
        <div className="mx-auto mt-10 max-w-xl border-t border-[var(--color-border)] pt-6">
          <p className="flex items-start justify-center gap-2 text-sm leading-relaxed text-[var(--color-fg-muted)]">
            <ShieldCheck
              className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand)]"
              aria-hidden="true"
            />
            <span>{content.ctaDisclosure}</span>
          </p>
          <Link
            href={`/${locale}/perevirka`}
            className="link-underline mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand)] transition-colors duration-150 ease-[var(--ease-out)] hover:text-[var(--color-brand-hover)]"
          >
            {content.ctaVerify}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

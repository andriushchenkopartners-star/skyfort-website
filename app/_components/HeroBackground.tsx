"use client";

// Hero atmosphere: the Calgary backdrop + two brand "aurora" blobs. The blobs
// drift/pulse via CSS (hero-blob-* in globals.css); this client wrapper adds a
// cheap, GPU-only scroll parallax (transform: translate3d on the layer, never
// re-laying-out the LCP <Image>). No-op under prefers-reduced-motion.

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function HeroBackground() {
  const farRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (farRef.current) farRef.current.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
        if (blobRef.current) blobRef.current.style.transform = `translate3d(0, ${y * 0.05}px, 0)`;
        raf = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={farRef}
        className="pointer-events-none absolute inset-0 z-0 will-change-transform"
        aria-hidden="true"
      >
        <Image src="/calgary-hero.webp" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[var(--color-bg)]/68" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/80 via-transparent to-transparent" />
      </div>
      <div
        ref={blobRef}
        className="pointer-events-none absolute inset-0 z-0 will-change-transform"
        aria-hidden="true"
      >
        <div className="hero-blob hero-blob-1 absolute -right-40 -top-32 h-[600px] w-[600px] rounded-full bg-[var(--color-brand)] blur-3xl" />
        <div className="hero-blob hero-blob-2 absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-[var(--color-brand)] blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)]/60 to-transparent" />
      </div>
    </>
  );
}

// app/_components/TldrBlock.jsx
// Visible "TL;DR" summary block at the top of long-form pillar pages.
// Emits matching schema.org/SpeakableSpecification JSON-LD so voice-search
// (Google Assistant) and AI-Overview audio readers know which selector
// contains the canonical short answer.
//
// AI/voice search rationale: AI Overviews + Perplexity pull a 1-3 sentence
// "direct answer" at the top of generative SERPs. Pages that EXPLICITLY
// surface that 1-3 sentences (rather than burying it in flowing prose)
// get extracted verbatim significantly more often. Pair the visible block
// with Speakable schema and you cover both text-AI and voice-AI surfaces.
//
// Usage:
//   <TldrBlock
//     label="TL;DR"           // optional; defaults to "TL;DR"
//     text="..."              // required; 1-3 sentences
//     pageName="Page title"   // for the WebPage @id
//     pageUrl="https://..."   // canonical URL
//   />

export default function TldrBlock({ label = "TL;DR", text, pageName, pageUrl }) {
  if (!text) return null;

  const speakableJsonLd = pageName && pageUrl
    ? {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        name: pageName,
        url: pageUrl,
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["#tldr"],
        },
      }
    : null;

  return (
    <>
      {speakableJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }}
        />
      )}
      <aside
        id="tldr"
        aria-label={label}
        className="rounded-2xl border border-[var(--color-brand)]/40 bg-[var(--color-brand)]/[0.08] p-5 sm:p-6"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-brand)]">
          {label}
        </p>
        <p className="mt-2 text-base leading-relaxed text-white/90">
          {text}
        </p>
      </aside>
    </>
  );
}

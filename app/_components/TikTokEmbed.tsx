"use client";

// Facade TikTok embed. Renders a lightweight branded poster; only on click does
// it inject TikTok's blockquote + load embed.js — so the heavy TikTok script
// never touches first load (protects LCP / TTFB). Supports a creator feed
// (latest videos for a @handle) or a single pinned video by id.

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import TikTokIcon from "./TikTokIcon";

interface TikTokEmbedProps {
  username?: string; // creator feed, e.g. "andrii.wealthcanada"
  videoId?: string; // single video id (overrides the creator feed)
  title?: string;
  subtitle?: string;
  className?: string;
}

const EMBED_SRC = "https://www.tiktok.com/embed.js";

export default function TikTokEmbed({
  username,
  videoId,
  title,
  subtitle,
  className = "",
}: TikTokEmbedProps) {
  const [active, setActive] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    // Re-inject so TikTok re-scans the DOM for our freshly-rendered blockquote.
    document.querySelector(`script[src="${EMBED_SRC}"]`)?.remove();
    const s = document.createElement("script");
    s.src = EMBED_SRC;
    s.async = true;
    document.body.appendChild(s);
  }, [active]);

  const profileUrl = username ? `https://www.tiktok.com/@${username}` : undefined;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] ${className}`}
    >
      {!active ? (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="group relative flex min-h-[420px] w-full flex-col items-center justify-center gap-5 p-8 text-center"
          aria-label={title || (username ? `@${username}` : "Play TikTok")}
        >
          <span
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--color-brand)]/25 via-[var(--color-bg-card)] to-[var(--color-bg-elevated)]"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[var(--color-brand)] opacity-20 blur-3xl"
            aria-hidden="true"
          />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-brand)] text-white shadow-[var(--shadow-brand-glow)] transition-transform duration-200 ease-[var(--ease-out)] group-hover:scale-110">
            <Play className="h-7 w-7 translate-x-0.5 fill-current" aria-hidden="true" />
          </span>
          <span className="relative flex items-center gap-2 text-sm font-semibold text-[var(--color-fg)]">
            <TikTokIcon className="h-4 w-4" />
            {title || (username ? `@${username}` : "TikTok")}
          </span>
          {subtitle && (
            <span className="relative max-w-xs text-sm text-[var(--color-fg-muted)]">{subtitle}</span>
          )}
        </button>
      ) : (
        <div ref={hostRef} className="p-2">
          {videoId ? (
            <blockquote
              className="tiktok-embed"
              cite={`https://www.tiktok.com/@${username || "tiktok"}/video/${videoId}`}
              data-video-id={videoId}
              style={{ maxWidth: "605px", minWidth: "288px", margin: "0 auto" }}
            >
              <section />
            </blockquote>
          ) : (
            <blockquote
              className="tiktok-embed"
              cite={profileUrl}
              data-unique-id={username}
              data-embed-type="creator"
              style={{ maxWidth: "780px", minWidth: "288px", margin: "0 auto" }}
            >
              <section>
                <a target="_blank" rel="noopener noreferrer" href={profileUrl}>
                  @{username}
                </a>
              </section>
            </blockquote>
          )}
        </div>
      )}
    </div>
  );
}

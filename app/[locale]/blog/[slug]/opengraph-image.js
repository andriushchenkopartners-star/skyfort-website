// app/[locale]/blog/[slug]/opengraph-image.js
// Dynamic OG image for blog posts. Next renders this at build/request time via
// Satori (the engine behind next/og) and caches the result. Each post gets a
// branded social card instead of the generic /og-image.png fallback.
//
// Layout:
//   - dark brand gradient background with subtle radial accent
//   - 3px brand-blue bar at top (matches site visual identity)
//   - SkyFort wordmark + "BLOG" label top-left
//   - Pillar tag (TFSA / RRSP / etc.) small uppercase chip in brand blue
//   - Post title (huge, dominant element — wraps to 3 lines max)
//   - Reading time + date footer line
//   - sky-fort.ca pinned bottom-right
//
// Satori CSS subset: flexbox, basic typography, gradients, border-radius,
// inline SVG. No grid, no transforms, no @media. Keep it simple.

import { ImageResponse } from 'next/og';
import { getPostBySlug } from '../../../_lib/blog';

export const runtime = 'nodejs'; // needs fs access for blog content
export const alt = 'SkyFort blog post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// ─── Brand tokens (mirror app/globals.css) ────────────────────────────────
const BRAND_500 = '#2D73E3';
const BRAND_900 = '#0d2860';
const BG = '#191919';
const FG = '#fafafa';
const FG_MUTED = '#a3a3a3';
const FG_SUBTLE = '#7a7a7a';

// Localized "X min read" + "Blog" label for the OG card.
const COPY = {
  uk: { blog: 'БЛОГ', readingMin: 'хв читання' },
  ru: { blog: 'БЛОГ', readingMin: 'мин чтения' },
  en: { blog: 'BLOG', readingMin: 'min read' },
};

export default async function OpenGraphImage({ params }) {
  const { locale, slug } = await params;
  const post = getPostBySlug(locale, slug);
  const c = COPY[locale] || COPY.uk;

  // Fallback content if post missing — shouldn't happen since generateStaticParams
  // only emits real slugs, but Satori needs something to render.
  const title = post?.title || 'SkyFort';
  const description = post?.description || 'Canadian finance for newcomers.';
  const pillar = post?.pillar || null;
  const date = post?.date || '';
  const readingMinutes = post?.readingMinutes || null;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: `linear-gradient(135deg, ${BG} 0%, #1a2438 60%, ${BRAND_900} 100%)`,
          color: FG,
          fontFamily: 'sans-serif',
          padding: 0,
          position: 'relative',
        }}
      >
        {/* Brand-blue top accent bar */}
        <div
          style={{
            height: 6,
            width: '100%',
            background: BRAND_500,
            display: 'flex',
          }}
        />

        {/* Subtle decorative glow (top-right) */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 400,
            height: 400,
            borderRadius: 9999,
            background: BRAND_500,
            opacity: 0.18,
            display: 'flex',
          }}
        />

        {/* Header row: SF logo + BLOG label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '44px 64px 0',
            gap: 16,
          }}
        >
          {/* Mini SF mark (inline SVG, brand blue marks on dark square) */}
          <div
            style={{
              width: 56,
              height: 52,
              borderRadius: 10,
              background: '#0f0f0f',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${BRAND_500}40`,
            }}
          >
            <span
              style={{
                color: BRAND_500,
                fontSize: 26,
                fontWeight: 900,
                letterSpacing: '-0.05em',
                display: 'flex',
              }}
            >
              SF
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span
              style={{
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: '0.02em',
                color: FG,
                display: 'flex',
              }}
            >
              SkyFort
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.22em',
                color: BRAND_500,
                display: 'flex',
              }}
            >
              {c.blog}
            </span>
          </div>
        </div>

        {/* Main content — title + description block */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 64px',
            gap: 24,
          }}
        >
          {/* Pillar chip */}
          {pillar && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'flex-start',
                padding: '8px 16px',
                borderRadius: 999,
                background: `${BRAND_500}22`,
                border: `1px solid ${BRAND_500}55`,
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  color: BRAND_500,
                  textTransform: 'uppercase',
                  display: 'flex',
                }}
              >
                {pillar}
              </span>
            </div>
          )}

          {/* Post title */}
          <div
            style={{
              fontSize: title.length > 80 ? 48 : title.length > 50 ? 56 : 64,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              color: FG,
              display: 'flex',
              // Satori truncation — line-clamp via webkit. Keeps card readable
              // even when authors write 100-character titles.
              overflow: 'hidden',
              maxHeight: 260,
            }}
          >
            {title}
          </div>

          {/* Description */}
          {description && (
            <div
              style={{
                fontSize: 22,
                lineHeight: 1.45,
                color: FG_MUTED,
                display: 'flex',
                maxHeight: 96,
                overflow: 'hidden',
              }}
            >
              {description.length > 140
                ? description.slice(0, 137) + '...'
                : description}
            </div>
          )}
        </div>

        {/* Footer: date · reading time   ·   sky-fort.ca */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 64px 44px',
            color: FG_SUBTLE,
            fontSize: 18,
          }}
        >
          <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
            {date && <span style={{ display: 'flex' }}>{date}</span>}
            {date && readingMinutes && (
              <span style={{ color: FG_SUBTLE, display: 'flex' }}>·</span>
            )}
            {readingMinutes && (
              <span style={{ display: 'flex' }}>
                {readingMinutes} {c.readingMin}
              </span>
            )}
          </div>
          <span
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: BRAND_500,
              letterSpacing: '0.02em',
              display: 'flex',
            }}
          >
            sky-fort.ca
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}

// app/_lib/og-card.jsx
// Shared OG-card renderer for Next.js file-based opengraph-image.js routes.
// One branded template, parametrised per page. Goal: every shareable URL gets
// a consistent SkyFort card instead of the generic /og-image.png.
//
// Satori CSS subset only: flexbox, basic typography, gradients, border-radius,
// inline SVG. No grid, no transforms, no @media. Sticks to a 1200×630 canvas
// (LinkedIn / Facebook / Twitter recommended size).
//
// Usage in any opengraph-image.js:
//
//   import { ImageResponse } from 'next/og';
//   import { brandCard, OG_SIZE, OG_CONTENT_TYPE } from '../../../_lib/og-card';
//
//   export const runtime = 'nodejs';
//   export const size = OG_SIZE;
//   export const contentType = OG_CONTENT_TYPE;
//   export const alt = 'SkyFort';
//
//   export default async function Image({ params }) {
//     const { locale } = await params;
//     return new ImageResponse(
//       brandCard({
//         eyebrow: 'CALCULATOR',
//         title: 'TFSA growth',
//         description: 'See compound interest on your real numbers.',
//         locale,
//       }),
//       { ...OG_SIZE },
//     );
//   }

const BRAND_500 = '#2D73E3';
const BRAND_900 = '#0d2860';
const BG = '#191919';
const FG = '#fafafa';
const FG_MUTED = '#a3a3a3';
const FG_SUBTLE = '#7a7a7a';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

// Footer micro-text per locale — credentials always visible on shared cards.
const CREDENTIAL_LINE = {
  uk: 'Licensed Dealing Representative · NRD #4575551 · AB · BC · ON',
  ru: 'Licensed Dealing Representative · NRD #4575551 · AB · BC · ON',
  en: 'Licensed Dealing Representative · NRD #4575551 · AB · BC · ON',
};

/**
 * Returns Satori JSX for a branded OG card.
 *
 * @param {object} opts
 * @param {string} [opts.eyebrow] — small uppercase label above the title (e.g. "CALCULATOR")
 * @param {string}  opts.title    — main heading (auto-shrinks at length thresholds)
 * @param {string} [opts.description] — sub-line (truncated at 160 chars)
 * @param {string} [opts.locale]  — uk | ru | en; controls footer credential string
 * @param {string} [opts.badge]   — optional pill text rendered next to the eyebrow
 */
export function brandCard({ eyebrow, title, description, locale = 'uk', badge }) {
  const safeTitle = title || 'SkyFort';
  const titleFontSize =
    safeTitle.length > 80 ? 56 : safeTitle.length > 50 ? 68 : 78;
  const safeDescription =
    description && description.length > 160
      ? description.slice(0, 157) + '...'
      : description;
  const cred = CREDENTIAL_LINE[locale] || CREDENTIAL_LINE.uk;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: `linear-gradient(135deg, ${BG} 0%, #1a2438 60%, ${BRAND_900} 100%)`,
        color: FG,
        fontFamily: 'sans-serif',
        position: 'relative',
      }}
    >
      {/* Top brand accent bar */}
      <div
        style={{
          height: 6,
          width: '100%',
          background: BRAND_500,
          display: 'flex',
        }}
      />

      {/* Decorative blue glow (top-right) */}
      <div
        style={{
          position: 'absolute',
          top: -120,
          right: -120,
          width: 420,
          height: 420,
          borderRadius: 9999,
          background: BRAND_500,
          opacity: 0.18,
          display: 'flex',
        }}
      />

      {/* Header: logo mark + wordmark */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '44px 64px 0',
          gap: 16,
        }}
      >
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
              fontSize: 20,
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
            WEALTH
          </span>
        </div>
      </div>

      {/* Main content: eyebrow + title + description */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 64px',
          gap: 22,
        }}
      >
        {(eyebrow || badge) && (
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {eyebrow && (
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  color: BRAND_500,
                  textTransform: 'uppercase',
                  display: 'flex',
                }}
              >
                {eyebrow}
              </span>
            )}
            {badge && (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '6px 14px',
                  borderRadius: 999,
                  background: `${BRAND_500}22`,
                  border: `1px solid ${BRAND_500}55`,
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: BRAND_500,
                  textTransform: 'uppercase',
                }}
              >
                {badge}
              </span>
            )}
          </div>
        )}

        <div
          style={{
            fontSize: titleFontSize,
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
            color: FG,
            display: 'flex',
            overflow: 'hidden',
            maxHeight: 280,
          }}
        >
          {safeTitle}
        </div>

        {safeDescription && (
          <div
            style={{
              fontSize: 24,
              lineHeight: 1.45,
              color: FG_MUTED,
              display: 'flex',
              maxHeight: 110,
              overflow: 'hidden',
            }}
          >
            {safeDescription}
          </div>
        )}
      </div>

      {/* Footer: credentials · sky-fort.ca */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 64px 44px',
          color: FG_SUBTLE,
          fontSize: 16,
        }}
      >
        <span style={{ display: 'flex' }}>{cred}</span>
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
  );
}

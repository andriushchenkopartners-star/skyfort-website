// app/_components/portal/BrandPanel.tsx
// Decorative geometric background panel composed from the SkyFort brand mark.
// Used as: hero card backgrounds, modal accents, sidebar promo card, etc.
//
// Inputs:
//   tone: 'ink' | 'blue' | 'paper' — sets the panel background color
//   muted: when true, shapes drop to ~18% opacity so the panel reads as quiet texture
//   className: standard className prop (positioning is done by parent)

type Tone = 'ink' | 'blue' | 'paper';

export default function BrandPanel({
  tone = 'ink',
  muted = false,
  className,
}: {
  tone?: Tone;
  muted?: boolean;
  className?: string;
}) {
  const bg =
    tone === 'ink'
      ? 'var(--portal-ink)'
      : tone === 'blue'
      ? 'var(--color-brand)'
      : 'var(--portal-paper-2)';
  const fg = tone === 'paper' ? 'var(--color-brand)' : '#fff';
  const mul = muted ? 0.18 : 1;

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        background: bg,
        overflow: 'hidden',
        borderRadius: 18,
      }}
    >
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
        style={{ display: 'block' }}
        aria-hidden="true"
      >
        <path
          d="M 80 0 A 80 80 0 0 1 80 160 L 80 0 Z"
          fill={fg}
          opacity={0.95 * mul}
        />
        <path
          d="M 320 300 A 80 80 0 0 0 320 140 L 320 300 Z"
          fill={fg}
          opacity={0.85 * mul}
        />
        <path d="M 280 0 L 400 0 L 400 120 Z" fill={fg} opacity={0.7 * mul} />
        <circle cx="120" cy="220" r="32" fill={fg} opacity={0.9 * mul} />
        <circle cx="240" cy="80" r="22" fill={fg} opacity={0.5 * mul} />
      </svg>
    </div>
  );
}

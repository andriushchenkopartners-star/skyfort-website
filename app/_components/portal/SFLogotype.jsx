// app/_components/portal/SFLogotype.jsx
// SkyFort wordmark = mark + "SKYFORT" type.

import SFMark from './SFMark';

export default function SFLogotype({ height = 18, color = 'currentColor' }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: height * 0.6,
      }}
    >
      <SFMark size={height * 1.04} color="var(--color-brand)" />
      <span
        style={{
          fontFamily: 'var(--font-portal-display, Inter Tight, system-ui)',
          fontWeight: 900,
          fontSize: height,
          letterSpacing: '-0.01em',
          color,
          lineHeight: 1,
          textTransform: 'uppercase',
        }}
      >
        Skyfort
      </span>
    </div>
  );
}

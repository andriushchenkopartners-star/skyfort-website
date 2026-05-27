'use client';

// app/_components/portal/Sparkline.jsx
// Tiny SVG line chart for compact stats (e.g., account row preview).
// Inputs: pts (array of numbers). No axis, no labels — just the shape.
//
// Note: uses React.useId() for the gradient id so SSR and client agree —
// Math.random() during render caused hydration mismatch and React 19
// "Cannot call impure function during render" violations.

import { useId } from 'react';

export default function Sparkline({
  pts,
  width = 240,
  height = 56,
  color = 'var(--color-brand)',
  area = true,
  className,
}) {
  const rawId = useId();
  if (!Array.isArray(pts) || pts.length < 2) return null;

  const min = Math.min(...pts);
  const max = Math.max(...pts);
  const r = max - min || 1;
  const sx = (i) => (i / (pts.length - 1)) * width;
  const sy = (v) => height - ((v - min) / r) * (height - 6) - 3;
  const d = pts
    .map((v, i) => `${i ? 'L' : 'M'}${sx(i).toFixed(1)} ${sy(v).toFixed(1)}`)
    .join(' ');
  const a = `${d} L${width} ${height} L0 ${height} Z`;
  // useId returns ":r0:" style strings — strip colons for SVG id safety.
  const id = `sparkfill-${rawId.replace(/[:]/g, '')}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={{ display: 'block' }}
    >
      {area && (
        <defs>
          <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity=".25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
      )}
      {area && <path d={a} fill={`url(#${id})`} />}
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

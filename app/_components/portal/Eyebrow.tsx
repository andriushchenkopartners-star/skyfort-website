// app/_components/portal/Eyebrow.tsx
// SkyFort Client Portal — small uppercase label (used above headings).

import type { CSSProperties, ReactNode } from 'react';

export default function Eyebrow({
  children,
  color,
  className = '',
  style,
}: {
  children?: ReactNode;
  color?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        fontSize: 10.5,
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: color || 'var(--portal-mute)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

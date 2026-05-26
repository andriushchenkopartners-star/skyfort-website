// app/_components/portal/Eyebrow.jsx
// SkyFort Client Portal — small uppercase label (used above headings).

export default function Eyebrow({ children, color, className = '', style }) {
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

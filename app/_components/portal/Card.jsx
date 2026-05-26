// app/_components/portal/Card.jsx
// SkyFort Client Portal — card primitive (paper or ink surface, 18px radius).

export default function Card({
  children,
  pad = 22,
  dark = false,
  accent,
  onClick,
  className = '',
  style,
  ...rest
}) {
  const merged = {
    background: dark ? 'var(--portal-ink)' : '#fff',
    color: dark ? 'var(--portal-paper)' : 'var(--portal-ink)',
    border: dark ? '1px solid var(--portal-ink-3)' : '1px solid var(--portal-line)',
    borderRadius: 18,
    padding: pad,
    position: 'relative',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'transform .12s ease, box-shadow .12s',
    ...style,
  };

  return (
    <div
      onClick={onClick}
      className={className}
      style={merged}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 6px 22px rgba(11,13,16,.06)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
      {...rest}
    >
      {accent && (
        <div
          style={{
            position: 'absolute',
            top: 18,
            right: 18,
            width: 8,
            height: 8,
            borderRadius: 8,
            background: accent,
          }}
        />
      )}
      {children}
    </div>
  );
}

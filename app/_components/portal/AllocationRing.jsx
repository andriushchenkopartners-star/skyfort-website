// app/_components/portal/AllocationRing.jsx
// Donut chart for asset allocation (TFSA / RRSP / FHSA / Exempt / Real estate breakdown).
//
// Inputs:
//   data: [{ label: 'Canadian equity', pct: 28, color: '#2D73E3' }, ...]
//          pct values should sum to 100 (or roughly — last slice fills remainder)
//   size: SVG side length in px
//   stroke: ring thickness
//   center: optional React node rendered in the middle (e.g., total $)

export default function AllocationRing({
  data,
  size = 180,
  stroke = 18,
  center,
  className,
}) {
  if (!Array.isArray(data) || data.length === 0) return null;

  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  let acc = 0;

  return (
    <div
      className={className}
      style={{ position: 'relative', width: size, height: size }}
    >
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--portal-paper-2)"
          strokeWidth={stroke}
        />

        {/* Slices */}
        {data.map((d, i) => {
          const len = (d.pct / 100) * c;
          const dash = `${len} ${c - len}`;
          const offset = -acc;
          acc += len;
          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={d.color}
              strokeWidth={stroke}
              strokeDasharray={dash}
              strokeDashoffset={offset}
              strokeLinecap="butt"
            />
          );
        })}
      </svg>

      {center && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          {center}
        </div>
      )}
    </div>
  );
}

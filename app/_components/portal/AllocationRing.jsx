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

  // Pre-compute slice geometry up-front using a pure (no mutation) reduce.
  // React 19's `react-hooks/purity` rule forbids reassigning variables declared
  // in render scope — so the old `let acc = 0; acc += len` accumulator pattern
  // is now an error. Building a fresh accumulator object per iteration sidesteps
  // it cleanly; for a typical allocation chart (<10 slices) the cost is trivial.
  const slices = data.reduce(
    (acc, d) => {
      const len = (d.pct / 100) * c;
      return {
        list: [...acc.list, { ...d, len, offset: -acc.cumulative }],
        cumulative: acc.cumulative + len,
      };
    },
    { list: [], cumulative: 0 },
  ).list;

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
        {slices.map((d, i) => (
          <circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={d.color}
            strokeWidth={stroke}
            strokeDasharray={`${d.len} ${c - d.len}`}
            strokeDashoffset={d.offset}
            strokeLinecap="butt"
          />
        ))}
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

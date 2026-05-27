// app/_components/portal/GrowthChart.jsx
// 12-month area chart: client portfolio vs benchmark (e.g., S&P/TSX 60).
//
// Inputs:
//   data: [{ m: <monthIndex>, p: <portfolioValue>, b: <benchmarkValue> }, ...]
//          (13 points for a 12-month range — start + each month end)
//   monthLabels: ['Jun','Jul',...] in display order (length must match data.length)
//   height, width: viewBox dimensions
//
// The component is intrinsically responsive — viewBox + width="100%".

export default function GrowthChart({
  data,
  monthLabels,
  height = 220,
  width = 720,
}) {
  if (!Array.isArray(data) || data.length < 2) return null;

  const pad = { l: 6, r: 6, t: 14, b: 24 };
  const w = width - pad.l - pad.r;
  const h = height - pad.t - pad.b;
  const ps = data.map((d) => d.p);
  const bs = data.map((d) => d.b);
  const min = Math.min(...ps, ...bs) * 0.98;
  const max = Math.max(...ps, ...bs) * 1.02;
  const sx = (i) => pad.l + (i / (data.length - 1)) * w;
  const sy = (v) => pad.t + (1 - (v - min) / (max - min)) * h;
  const pPath = ps
    .map((v, i) => `${i ? 'L' : 'M'} ${sx(i).toFixed(1)} ${sy(v).toFixed(1)}`)
    .join(' ');
  const bPath = bs
    .map((v, i) => `${i ? 'L' : 'M'} ${sx(i).toFixed(1)} ${sy(v).toFixed(1)}`)
    .join(' ');
  const pArea = `${pPath} L ${sx(data.length - 1)} ${pad.t + h} L ${sx(0)} ${pad.t + h} Z`;
  const months =
    Array.isArray(monthLabels) && monthLabels.length === data.length
      ? monthLabels
      : data.map((_, i) => String(i + 1));

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      style={{ display: 'block' }}
      role="img"
      aria-label="12-month growth chart"
    >
      <defs>
        <linearGradient id="portal-growth-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--color-brand)" stopOpacity=".22" />
          <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid lines (dashed, very subtle) */}
      {[0, 1, 2, 3].map((i) => {
        const y = pad.t + (i / 3) * h;
        return (
          <line
            key={i}
            x1={pad.l}
            x2={pad.l + w}
            y1={y}
            y2={y}
            stroke="rgba(11,13,16,.06)"
            strokeDasharray="2 4"
          />
        );
      })}

      {/* Portfolio area + benchmark dashed line + portfolio line + end dot */}
      <path d={pArea} fill="url(#portal-growth-area)" />
      <path
        d={bPath}
        fill="none"
        stroke="#0b0d10"
        strokeOpacity=".35"
        strokeWidth="1.4"
        strokeDasharray="4 4"
      />
      <path
        d={pPath}
        fill="none"
        stroke="var(--color-brand)"
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle
        cx={sx(data.length - 1)}
        cy={sy(ps[ps.length - 1])}
        r="5"
        fill="#fff"
        stroke="var(--color-brand)"
        strokeWidth="2.4"
      />

      {/* Month ticks along the bottom */}
      {months.map((m, i) => (
        <text
          key={i}
          x={sx(i)}
          y={height - 4}
          fontSize="10"
          fontWeight="500"
          textAnchor="middle"
          fill="#6b6b66"
          fontFamily="var(--font-portal-mono), 'JetBrains Mono', ui-monospace, Menlo, monospace"
        >
          {m.toUpperCase()}
        </text>
      ))}
    </svg>
  );
}

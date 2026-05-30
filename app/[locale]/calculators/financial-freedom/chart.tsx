"use client";

// Lazy-loaded chart for the FIRE calculator. Loaded via next/dynamic from the
// parent so recharts (~80KB gzip) only downloads when this section mounts.

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from "recharts";

interface FireStrategy {
  key: string;
  color: string;
  strokeWidth: number;
  dashed?: boolean;
}

interface FireChartProps {
  data: Array<Record<string, number>>;
  labels: { year: string; fiThreshold: string };
  strategyLabels: Record<string, string>;
  strategies: FireStrategy[];
  fiStandard: number;
}

function formatMoney(n: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function FireChart({ data, labels, strategyLabels, strategies, fiStandard }: FireChartProps) {
  return (
    <div className="h-[460px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
          <XAxis
            dataKey="year"
            stroke="#6b6b6b"
            style={{ fontSize: 12 }}
            label={{
              value: labels.year,
              position: "insideBottom",
              offset: -5,
              fill: "#6b6b6b",
              fontSize: 12,
            }}
          />
          <YAxis
            stroke="#6b6b6b"
            style={{ fontSize: 12 }}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f1f1f",
              border: "1px solid #2D73E3",
              borderRadius: 8,
              color: "#fff",
            }}
            formatter={(value) => formatMoney(Number(value))}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 16 }} />
          <ReferenceLine
            y={fiStandard}
            stroke="#fff"
            strokeDasharray="5 5"
            strokeOpacity={0.5}
            label={{
              value: labels.fiThreshold + ` ${formatMoney(fiStandard)}`,
              fill: "#fff",
              fontSize: 11,
              position: "insideTopRight",
            }}
          />
          {strategies.map((s) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={strategyLabels[s.key]}
              stroke={s.color}
              strokeWidth={s.strokeWidth}
              strokeDasharray={s.dashed ? "5 5" : undefined}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

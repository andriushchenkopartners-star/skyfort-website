"use client";

// Lazy-loaded chart bundle for the mortgage calculator.
// Both chart variants live here so recharts (~80KB gzip) downloads once
// when the user reaches any chart-using mode.

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

interface MortgageScenario {
  label: string;
  color: string;
}

interface MortgageBalanceChartProps {
  data: Array<Record<string, number>>;
  balanceLabel: string;
}

interface MortgageComparisonChartProps {
  data: Array<Record<string, number | null>>;
  scenarios: MortgageScenario[];
}

function formatCAD(n: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(n);
}

// Single-line balance-over-time chart used by ModeOwn.
export function MortgageBalanceChart({ data, balanceLabel }: MortgageBalanceChartProps) {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
          <XAxis dataKey="year" stroke="#6b6b6b" minTickGap={28} style={{ fontSize: 11 }} />
          <YAxis
            stroke="#6b6b6b"
            style={{ fontSize: 11 }}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f1f1f",
              border: "1px solid #2D73E3",
              borderRadius: 8,
              color: "#fff",
            }}
            formatter={(v) => formatCAD(Number(v))}
          />
          <Line
            type="monotone"
            dataKey="balance"
            name={balanceLabel}
            stroke="#2D73E3"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Multi-scenario comparison used by ModeEarlyPayoff.
export function MortgageComparisonChart({ data, scenarios }: MortgageComparisonChartProps) {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
          <XAxis dataKey="year" stroke="#6b6b6b" minTickGap={28} style={{ fontSize: 11 }} />
          <YAxis
            stroke="#6b6b6b"
            style={{ fontSize: 11 }}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f1f1f",
              border: "1px solid #2D73E3",
              borderRadius: 8,
              color: "#fff",
            }}
            formatter={(v) => formatCAD(Number(v))}
          />
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
          {scenarios.map((s, i) => (
            <Line
              key={i}
              type="monotone"
              dataKey={`s${i}`}
              name={s.label}
              stroke={s.color}
              strokeWidth={i === 0 ? 2 : 3}
              dot={false}
              connectNulls={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

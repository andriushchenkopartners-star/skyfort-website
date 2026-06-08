"use client";

// Recharts is heavy (~80KB gzip). This file is lazy-loaded via next/dynamic
// from the parent calculator, so the chart code (and recharts itself) only
// downloads when the user actually reaches the calculator.

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";

interface TfsaChartLabels {
  year: string;
  bank: string;
  gic: string;
  conservative: string;
  balanced: string;
  aggressive: string;
}

interface TfsaChartProps {
  data: Array<Record<string, number>>;
  labels: TfsaChartLabels;
}

function formatMoney(n: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function TfsaChart({ data, labels }: TfsaChartProps) {
  return (
    <div className="h-[420px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
          <XAxis
            dataKey="year"
            stroke="#6b6b6b"
            minTickGap={28}
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
          <Line type="monotone" dataKey="bank" name={labels.bank} stroke="#6b6b6b" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="gic" name={labels.gic} stroke="#a3a3a3" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="conservative" name={labels.conservative} stroke="#7099d6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="balanced" name={labels.balanced} stroke="#2D73E3" strokeWidth={3} dot={false} />
          <Line type="monotone" dataKey="aggressive" name={labels.aggressive} stroke="#4287ec" strokeWidth={2} strokeDasharray="5 5" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

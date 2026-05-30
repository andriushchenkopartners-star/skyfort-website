interface StatItem {
  value: string;
  label: string;
}

interface StatsContent {
  stats: StatItem[];
}

export default function Stats({ content }: { content: StatsContent }) {
  return (
    <section
      className="border-y border-[#2a2a2a] bg-[#1f1f1f]"
      aria-label="Key statistics"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-[#2a2a2a] md:grid-cols-4">
        {content.stats.map((s, i) => (
          <div key={i} className="bg-[#1f1f1f] p-8 md:p-10">
            <div className="font-display-tight text-3xl text-[var(--color-brand)] md:text-5xl">
              {s.value}
            </div>
            <div className="mt-3 text-xs leading-relaxed text-[#a3a3a3] md:text-sm">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

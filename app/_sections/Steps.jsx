export default function Steps({ content }) {
  return (
    <section className="py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-16 font-display text-4xl leading-[0.95] text-white md:text-6xl">
          {content.stepsTitle}
        </h2>
        <ol className="grid gap-12 md:grid-cols-3">
          {content.steps.map((s, i) => (
            <li key={i} className="relative">
              <div className="mb-6 font-display-tight text-6xl text-[var(--color-brand)]">
                {s.n}
              </div>
              <h3 className="font-display text-2xl text-white">{s.title}</h3>
              <p className="mt-4 leading-relaxed text-[#a3a3a3]">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

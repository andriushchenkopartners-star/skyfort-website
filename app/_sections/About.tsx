interface AboutContent {
  aboutTitle: string;
  about: string[];
}

export default function About({ content }: { content: AboutContent }) {
  return (
    <section className="py-28 md:py-36" id="about">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="font-display text-4xl leading-[0.95] text-white md:text-6xl">
          {content.aboutTitle}
        </h2>
        <div className="mt-12 space-y-6">
          {content.about.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-[#a3a3a3]">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

// app/tfsa-kalkulyator/page.js
// Landing page під keyword "TFSA калькулятор"
// Drop-in: створи папку app/tfsa-kalkulyator/ і поклади цей файл як page.js
// Server component (без "use client") — metadata + JSON-LD працюють напряму.

const SITE = "https://sky-fort.ca";
const PATH = "/tfsa-kalkulyator";
const CALENDLY = "https://calendly.com/andriushchenko-partners/new-meeting";
const CALCULATOR_PATH = "/calculators/tfsa-growth"; // ← заміни на реальний роут свого TFSA-калькулятора

export const metadata = {
  title: "TFSA калькулятор 2026 — розрахуй ріст TFSA онлайн | SkyFort Wealth",
  description:
    "Безкоштовний TFSA калькулятор: введи місячний внесок, термін і дохідність — побачиш ріст рахунку та неоподаткований прибуток. Українською, для Канади.",
  keywords: [
    "TFSA калькулятор",
    "TFSA calculator Canada",
    "TFSA розрахунок",
    "TFSA ліміт 2026",
    "інвестиції Канада українцям",
  ],
  alternates: {
    canonical: SITE + PATH,
    // languages: { "uk-CA": SITE + PATH, ... } ← додай, коли зробиш ru/en версії цієї сторінки
  },
  openGraph: {
    title: "TFSA калькулятор — розрахуй ріст свого TFSA",
    description:
      "Скільки виросте твій TFSA? Введи внесок, термін і дохідність — отримай результат за секунди.",
    url: SITE + PATH,
    siteName: "SkyFort Wealth",
    locale: "uk_CA",
    type: "website",
    // images: ["/og-tfsa.png"] ← згенеруй per-page OG 1200x630 пізніше
  },
};

const FAQ = [
  {
    q: "Який ліміт внеску в TFSA на 2026 рік?",
    a: "Річний ліміт встановлює CRA щороку. Невикористаний ліміт переноситься на наступні роки, а сумарний доступний простір залежить від року, коли тобі виповнилося 18 і ти став резидентом Канади. Точну цифру свого ліміту дивись у CRA My Account.",
  },
  {
    q: "Чи оподатковується прибуток у TFSA?",
    a: "Ні. Ріст, дивіденди та прибуток від продажу всередині TFSA не оподатковуються, і зняття коштів теж не додається до доходу. Це ключова перевага рахунку.",
  },
  {
    q: "Що показує цей TFSA калькулятор?",
    a: "Він моделює, як виросте баланс залежно від місячного внеску, терміну та середньорічної дохідності. Це освітня оцінка, а не прогноз чи гарантія — реальні результати залежать від ринку та інструментів.",
  },
  {
    q: "Чи можна тримати exempt market інвестиції в TFSA?",
    a: "Деякі exempt market securities можуть бути TFSA-eligible, але це залежить від продукту та твого статусу інвестора. Перед будь-яким рішенням обовʼязковий Suitability Assessment згідно з NI 31-103. Це обговорюємо на дзвінку.",
  },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": SITE + PATH,
        url: SITE + PATH,
        name: "TFSA калькулятор — SkyFort Wealth",
        inLanguage: "uk-CA",
        isPartOf: { "@id": SITE + "/#website" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Головна", item: SITE },
          { "@type": "ListItem", position: 2, name: "TFSA калькулятор", item: SITE + PATH },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <main className="sf-lp sf-tfsa">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Style />

      {/* HERO */}
      <section className="sf-hero">
        <span className="sf-kicker">SkyFort Wealth · Калгарі</span>
        <h1>
          TFSA <span className="sf-blue">калькулятор</span>
        </h1>
        <p className="sf-lead">
          Введи місячний внесок, термін і дохідність — і подивись, як виросте твій
          TFSA та скільки прибутку залишиться <b>неоподаткованим</b>.
        </p>
        <div className="sf-cta-row">
          <a className="sf-btn sf-btn-primary" href={CALCULATOR_PATH}>
            Відкрити калькулятор →
          </a>
          <a className="sf-btn sf-btn-ghost" href={CALENDLY} target="_blank" rel="noopener">
            Безкоштовний 30-хв дзвінок
          </a>
        </div>
      </section>

      {/* VALUE */}
      <section className="sf-grid">
        <Card title="Неоподаткований ріст" body="У TFSA прибуток, дивіденди й приріст не оподатковуються. Калькулятор показує різницю проти звичайного рахунку." />
        <Card title="Сила складного відсотка" body="Побач, як невеликий регулярний внесок перетворюється на значну суму за 10–25 років." />
        <Card title="Повна стратегія, не один рахунок" body="TFSA — це частина пазла. На дзвінку додаємо RRSP, FHSA, RESP та exempt market у єдину картину." />
      </section>

      {/* EDU */}
      <section className="sf-prose">
        <h2>Як користуватися TFSA калькулятором</h2>
        <p>
          TFSA (Tax-Free Savings Account) — один із пʼяти ключових канадських рахунків.
          Усе, що зростає всередині, не оподатковується, а зняття не додається до доходу.
          Цей калькулятор допомагає оцінити, наскільки твій внесок може вирости з часом
          за різних сценаріїв дохідності.
        </p>
        <p>
          Введи три параметри — <b>місячний внесок</b>, <b>горизонт у роках</b> та{" "}
          <b>очікувану середню дохідність</b> — і отримай орієнтовний підсумковий баланс.
          Це освітня модель: реальні результати залежать від ринку та обраних інструментів,
          і минула дохідність не гарантує майбутню.
        </p>
        <h2>Поширені питання</h2>
        <div className="sf-faq">
          {FAQ.map((f, i) => (
            <details key={i}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="sf-final">
        <h2>Хочеш зібрати повну стратегію?</h2>
        <p className="sf-lead">
          На безкоштовному 30-хвилинному дзвінку зробимо Suitability Assessment і подивимось,
          як TFSA вписується у твою повну фінансову картину. Без продажу. Без тиску.
        </p>
        <a className="sf-btn sf-btn-primary sf-btn-lg" href={CALENDLY} target="_blank" rel="noopener">
          Записатися на дзвінок
        </a>
      </section>

      <Disclaimer />
    </main>
  );
}

function Card({ title, body }) {
  return (
    <div className="sf-card">
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}

function Disclaimer() {
  return (
    <footer className="sf-disclaimer">
      <p>
        Освітній матеріал. Автор — Andrii Andriushchenko, Dealing Representative,
        зареєстрований через Axcess Capital Advisors Inc. (Exempt Market Dealer).
        Реєстрація: Alberta, British Columbia, Ontario. Сфера ліцензії — exempt market
        securities; я <b>не</b> зареєстрований для порад щодо публічних securities (акції,
        ETF, mutual funds) — це інша категорія ліцензії (CIRO/MFDA).
      </p>
      <p>
        Ця сторінка не є персональною інвестиційною, юридичною чи податковою консультацією
        або пропозицією продажу будь-яких securities. Інвестиції в exempt market підлягають
        обовʼязковому Suitability Assessment згідно з National Instrument 31-103. Усі інвестиції
        несуть ризик втрати капіталу. Перевір мою реєстрацію: nrd-info.ca (NRD #4575551).
      </p>
    </footer>
  );
}

function Style() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
.sf-lp{--bg:#131313;--soft:#1b1b1b;--line:rgba(255,255,255,.08);--blue:var(--color-brand);--blue2:var(--color-brand-hover);--ink:#f4f5f7;--mut:#a0a3ab;
  background:var(--bg);color:var(--ink);font-family:inherit;line-height:1.55;}
.sf-lp .sf-blue{color:var(--blue2);}
.sf-lp section{max-width:980px;margin:0 auto;padding:0 22px;}
.sf-lp h1,.sf-lp h2,.sf-lp h3{text-transform:uppercase;font-weight:800;letter-spacing:-.02em;line-height:1.02;margin:0;}
.sf-hero{padding:88px 22px 56px;}
.sf-kicker{display:inline-block;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--mut);
  border:1px solid var(--line);border-radius:100px;padding:6px 14px;margin-bottom:26px;}
.sf-hero h1{font-size:clamp(44px,9vw,92px);}
.sf-lead{color:var(--mut);font-size:clamp(16px,2.2vw,20px);max-width:62ch;margin:22px 0 0;line-height:1.5;}
.sf-lead b{color:var(--ink);font-weight:600;}
.sf-cta-row{display:flex;flex-wrap:wrap;gap:12px;margin-top:34px;}
.sf-btn{display:inline-flex;align-items:center;font-weight:700;font-size:15px;text-decoration:none;
  padding:14px 24px;border-radius:12px;transition:transform .15s ease,background .15s ease,border-color .15s ease;}
.sf-btn:hover{transform:translateY(-2px);}
.sf-btn-primary{background:var(--blue);color:#fff;}
.sf-btn-primary:hover{background:var(--blue2);}
.sf-btn-ghost{background:transparent;color:var(--ink);border:1px solid var(--line);}
.sf-btn-ghost:hover{border-color:var(--blue2);}
.sf-btn-lg{padding:18px 34px;font-size:17px;}
.sf-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding-top:18px;padding-bottom:18px;}
.sf-card{background:var(--soft);border:1px solid var(--line);border-radius:16px;padding:26px;}
.sf-card h3{font-size:17px;margin-bottom:10px;}
.sf-card p{color:var(--mut);font-size:14px;margin:0;}
.sf-prose{padding:56px 22px;}
.sf-prose h2{font-size:clamp(24px,4vw,34px);margin:42px 0 16px;}
.sf-prose h2:first-child{margin-top:0;}
.sf-prose p{color:var(--mut);max-width:70ch;margin:0 0 16px;}
.sf-prose p b{color:var(--ink);font-weight:600;}
.sf-faq details{border-bottom:1px solid var(--line);padding:18px 0;}
.sf-faq summary{cursor:pointer;font-weight:600;color:var(--ink);list-style:none;font-size:16px;}
.sf-faq summary::marker{display:none;}
.sf-faq summary::after{content:"+";float:right;color:var(--blue2);font-weight:800;}
.sf-faq details[open] summary::after{content:"–";}
.sf-faq details p{margin:12px 0 0;}
.sf-final{text-align:center;padding:72px 22px;border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin-top:40px;}
.sf-final h2{font-size:clamp(26px,5vw,42px);}
.sf-final .sf-lead{margin-left:auto;margin-right:auto;}
.sf-final .sf-btn{margin-top:30px;}
.sf-disclaimer{max-width:980px;margin:0 auto;padding:40px 22px 80px;}
.sf-disclaimer p{color:#6f727a;font-size:12px;line-height:1.6;max-width:80ch;margin:0 0 12px;}
.sf-disclaimer b{color:#9a9da4;}
@media(max-width:760px){.sf-grid{grid-template-columns:1fr;}}
`,
      }}
    />
  );
}

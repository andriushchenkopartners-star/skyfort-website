// app/exempt-market-ukrayintsyam/page.js
// Landing page під keyword "exempt market українцям"
// УВАГА: compliance-sensitive. Тільки освітній контент, gate через Suitability Assessment.
// Жодних назв конкретних продуктів і жодних цифр дохідності на цій сторінці.

const SITE = "https://sky-fort.ca";
const PATH = "/exempt-market-ukrayintsyam";
const CALENDLY = "https://calendly.com/andriushchenko-partners/new-meeting";

export const metadata = {
  title: "Exempt market українцям у Канаді — що це і кому підходить | SkyFort Wealth",
  description:
    "Exempt market простими словами для українців у Канаді: що таке приватні securities, хто такий Eligible / Accredited Investor і чому обовʼязковий Suitability Assessment. Освітній гайд від ліцензованого DR.",
  keywords: [
    "exempt market українцям",
    "exempt market Канада",
    "приватні інвестиції Канада",
    "Eligible Investor",
    "Accredited Investor Канада",
    "Dealing Representative українською",
  ],
  alternates: {
    canonical: SITE + PATH,
  },
  openGraph: {
    title: "Exempt market для українців у Канаді — освітній гайд",
    description:
      "Що таке exempt market, хто може інвестувати і чому suitability обовʼязковий. Без продажу. Без обіцянок дохідності.",
    url: SITE + PATH,
    siteName: "SkyFort Wealth",
    locale: "uk_CA",
    type: "website",
  },
};

const FAQ = [
  {
    q: "Що таке exempt market простими словами?",
    a: "Це ринок securities, які пропонуються без prospectus — через prospectus-exemptions у законодавстві (NI 45-106). Такі інструменти не торгуються на публічній біржі й доступні лише певним категоріям інвесторів за визначених умов.",
  },
  {
    q: "Хто може інвестувати в exempt market?",
    a: "Доступ залежить від твоєї категорії: Eligible Investor, Accredited Investor або інші exemptions, що визначаються доходом, активами та іншими критеріями за NI 45-106. Категорію підтверджують документально перед будь-яким рішенням.",
  },
  {
    q: "Чому потрібен Suitability Assessment?",
    a: "Бо це вимога закону. Згідно з National Instrument 31-103, registered Dealing Representative зобовʼязаний оцінити твою ситуацію, цілі й толерантність до ризику ще до того, як щось рекомендувати. Це захищає тебе, не мене.",
  },
  {
    q: "Які ризики exempt market?",
    a: "Вищі, ніж у публічних інструментів: можлива неліквідність (важко швидко продати), довший горизонт і ризик втрати всього вкладеного капіталу. Жодна дохідність не гарантована, і минулі результати не передбачають майбутніх.",
  },
  {
    q: "Чи це підходить саме мені?",
    a: "Чесна відповідь — залежить. Іноді exempt market не підходить, і тоді я прямо це кажу й направляю до кращої альтернативи. Зрозуміти це і є мета безкоштовного discovery-дзвінка.",
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
        name: "Exempt market українцям — SkyFort Wealth",
        inLanguage: "uk-CA",
        isPartOf: { "@id": SITE + "/#website" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Головна", item: SITE },
          { "@type": "ListItem", position: 2, name: "Exempt market українцям", item: SITE + PATH },
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
    <main className="sf-lp sf-em">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Style />

      <section className="sf-hero">
        <span className="sf-kicker">Освітній гайд · ліцензований DR</span>
        <h1>
          Exempt market <span className="sf-blue">українцям</span>
        </h1>
        <p className="sf-lead">
          Приватні інвестиції в Канаді простими словами: що таке exempt market,
          хто може інвестувати і чому закон вимагає <b>Suitability Assessment</b> ще до
          будь-якої рекомендації.
        </p>
        <div className="sf-cta-row">
          <a className="sf-btn sf-btn-primary" href={CALENDLY} target="_blank" rel="noopener">
            Безкоштовний 30-хв дзвінок
          </a>
          <a className="sf-btn sf-btn-ghost" href="#osnovy">
            Спершу розібратися →
          </a>
        </div>
        <p className="sf-note">Без продажу. Без тиску. Без обіцянок дохідності.</p>
      </section>

      <section className="sf-grid" id="osnovy">
        <Card title="Що це" body="Securities, що пропонуються без prospectus за exemptions (NI 45-106). Не торгуються на публічній біржі." />
        <Card title="Хто може" body="Eligible Investor, Accredited Investor чи інші категорії — за критеріями доходу й активів. Підтверджується документально." />
        <Card title="Чому suitability" body="NI 31-103 зобовʼязує DR оцінити твою ситуацію до рекомендації. Це обовʼязковий регуляторний крок." />
      </section>

      <section className="sf-prose">
        <h2>Чим exempt market відрізняється від звичних інвестицій</h2>
        <p>
          Більшість людей знає публічний ринок — акції, ETF, mutual funds, які торгуються на
          біржі. Exempt market — це інша частина системи: приватні securities, які
          пропонуються без prospectus за спеціальними винятками в законодавстві. Через це
          доступ до них обмежений і регулюється окремо.
        </p>
        <p>
          Важлива межа моєї ліцензії: я зареєстрований саме для <b>exempt market securities</b>{" "}
          і <b>не</b> надаю порад щодо публічних securities (акції, ETF, mutual funds) — для
          цього потрібна інша категорія ліцензії (CIRO/MFDA). Якщо тобі підходить саме
          публічний інструмент, я це скажу й направлю до відповідного advisor.
        </p>

        <h2>Реалістично про ризик</h2>
        <p>
          Exempt market несе вищі ризики: інвестиції можуть бути неліквідними, мати довший
          горизонт і ризик <b>втрати всього вкладеного капіталу</b>. Жодна дохідність не
          гарантована. Тому рішення завжди починається з оцінки твоєї ситуації, а не з
          продукту.
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

      <section className="sf-final">
        <h2>Зрозуміймо, чи це для тебе</h2>
        <p className="sf-lead">
          На безкоштовному 30-хвилинному дзвінку проводимо Persona Suitability Assessment:
          дивимось твою ситуацію, цілі й чи підходить тобі exempt market узагалі. Якщо ні —
          чесно скажу й порекомендую краще.
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
        ETF, mutual funds), що належать до іншої категорії ліцензії (CIRO/MFDA).
      </p>
      <p>
        Ця сторінка не є персональною інвестиційною, юридичною чи податковою консультацією і
        не є пропозицією продажу будь-яких securities. Інвестиції в exempt market підлягають
        обовʼязковому Suitability Assessment згідно з National Instrument 31-103, а конкретні
        рекомендації надаються лише після формальних client-advisor відносин з Axcess Capital
        Advisors Inc. Усі інвестиції несуть ризик втрати капіталу, включно з ризиком втрати
        всього вкладеного. Минула дохідність не гарантує майбутньої. Перевір реєстрацію:
        nrd-info.ca (NRD #4575551). Скарги: OBSI — obsi.ca.
      </p>
    </footer>
  );
}

function Style() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
.sf-lp{--bg:#131313;--soft:#1b1b1b;--line:rgba(255,255,255,.08);--blue:#2f6bff;--blue2:#4f86ff;--ink:#f4f5f7;--mut:#a0a3ab;
  background:var(--bg);color:var(--ink);font-family:inherit;line-height:1.55;}
.sf-lp .sf-blue{color:var(--blue2);}
.sf-lp section{max-width:980px;margin:0 auto;padding:0 22px;}
.sf-lp h1,.sf-lp h2,.sf-lp h3{text-transform:uppercase;font-weight:800;letter-spacing:-.02em;line-height:1.02;margin:0;}
.sf-hero{padding:88px 22px 56px;}
.sf-kicker{display:inline-block;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--mut);
  border:1px solid var(--line);border-radius:100px;padding:6px 14px;margin-bottom:26px;}
.sf-hero h1{font-size:clamp(40px,8vw,84px);}
.sf-lead{color:var(--mut);font-size:clamp(16px,2.2vw,20px);max-width:64ch;margin:22px 0 0;line-height:1.5;}
.sf-lead b{color:var(--ink);font-weight:600;}
.sf-note{color:#6f727a;font-size:13px;margin:16px 0 0;}
.sf-cta-row{display:flex;flex-wrap:wrap;gap:12px;margin-top:34px;}
.sf-btn{display:inline-flex;align-items:center;font-weight:700;font-size:15px;text-decoration:none;
  padding:14px 24px;border-radius:12px;transition:transform .15s ease,background .15s ease,border-color .15s ease;}
.sf-btn:hover{transform:translateY(-2px);}
.sf-btn-primary{background:var(--blue);color:#fff;}
.sf-btn-primary:hover{background:var(--blue2);}
.sf-btn-ghost{background:transparent;color:var(--ink);border:1px solid var(--line);}
.sf-btn-ghost:hover{border-color:var(--blue2);}
.sf-btn-lg{padding:18px 34px;font-size:17px;}
.sf-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding-top:18px;padding-bottom:18px;scroll-margin-top:90px;}
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

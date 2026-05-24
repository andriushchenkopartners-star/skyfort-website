// app/ipoteka-kalhari/page.js
// Landing page під keyword "іпотека Калгарі"
// ВАЖЛИВО: Andrii — DR/EMD, НЕ іпотечний брокер. Сторінка освітня + калькулятор +
// зʼєднання з ліцензованим брокером-партнером. Жодних іпотечних порад напряму.

const SITE = "https://sky-fort.ca";
const PATH = "/ipoteka-kalhari";
const CALENDLY = "https://calendly.com/andriushchenko-partners/new-meeting";
const CALCULATOR_PATH = "/calculators/mortgage"; // ← заміни на реальний роут калькулятора доступності

export const metadata = {
  title: "Іпотека Калгарі — калькулятор доступності + стратегія першого внеску | SkyFort",
  description:
    "Іпотека в Калгарі для українців: безкоштовний калькулятор доступності житла, як зібрати downpayment через FHSA і зʼєднання з ліцензованим mortgage-брокером. Українською.",
  keywords: [
    "іпотека Калгарі",
    "mortgage Calgary",
    "перший дім Калгарі",
    "downpayment Канада",
    "FHSA перший дім",
    "іпотека Канада українцям",
  ],
  alternates: {
    canonical: SITE + PATH,
  },
  openGraph: {
    title: "Іпотека Калгарі — калькулятор доступності + downpayment стратегія",
    description:
      "Скільки житло ти можеш собі дозволити в Калгарі і як зібрати перший внесок. Освітній гайд + калькулятор.",
    url: SITE + PATH,
    siteName: "SkyFort Wealth",
    locale: "uk_CA",
    type: "website",
  },
};

const FAQ = [
  {
    q: "Скільки потрібно на downpayment у Калгарі?",
    a: "У Канаді мінімум залежить від ціни житла: 5% на першу частину вартості і більше на дорожчі сегменти. Точний відсоток і ліміти варто підтвердити з ліцензованим брокером під твою конкретну ситуацію.",
  },
  {
    q: "Чи можна використати FHSA на перший внесок?",
    a: "Так. FHSA (First Home Savings Account) створений саме для накопичення на перший дім: внески зменшують оподатковуваний дохід, а зняття на купівлю житла не оподатковується. Це частина downpayment-стратегії, яку ми можемо розібрати.",
  },
  {
    q: "Ти видаєш іпотеку?",
    a: "Ні. Я Dealing Representative (exempt market), а не mortgage-брокер. Я допомагаю з фінансовою стратегією і downpayment, а на саму іпотеку зʼєдную тебе з ліцензованим mortgage-брокером-партнером.",
  },
  {
    q: "Що показує калькулятор доступності?",
    a: "Орієнтовну максимальну ціну житла за твоїм доходом, першим внеском і ставкою. Це освітня оцінка для планування, а не pre-approval — офіційне схвалення дає кредитор.",
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
        name: "Іпотека Калгарі — SkyFort Wealth",
        inLanguage: "uk-CA",
        isPartOf: { "@id": SITE + "/#website" },
        about: { "@type": "Place", name: "Calgary, Alberta, Canada" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Головна", item: SITE },
          { "@type": "ListItem", position: 2, name: "Іпотека Калгарі", item: SITE + PATH },
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
    <main className="sf-lp sf-mtg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Style />

      <section className="sf-hero">
        <span className="sf-kicker">Калгарі · для українців</span>
        <h1>
          Іпотека <span className="sf-blue">Калгарі</span>
        </h1>
        <p className="sf-lead">
          Порахуй, яке житло ти можеш собі дозволити, і розберись, як зібрати перший внесок —
          зокрема через <b>FHSA</b>. На саму іпотеку зʼєдную тебе з ліцензованим
          mortgage-брокером.
        </p>
        <div className="sf-cta-row">
          <a className="sf-btn sf-btn-primary" href={CALCULATOR_PATH}>
            Калькулятор доступності →
          </a>
          <a className="sf-btn sf-btn-ghost" href={CALENDLY} target="_blank" rel="noopener">
            Безкоштовний 30-хв дзвінок
          </a>
        </div>
      </section>

      <section className="sf-grid">
        <Card title="Калькулятор доступності" body="Введи дохід, перший внесок і ставку — побач орієнтовну максимальну ціну житла." />
        <Card title="Downpayment через FHSA" body="Як накопичити перший внесок із податковою перевагою. FHSA — мій профіль як DR." />
        <Card title="Зʼєднання з брокером" body="На саму іпотеку направляю до ліцензованого mortgage-брокера-партнера. Я не видаю іпотеку." />
      </section>

      <section className="sf-prose">
        <h2>Чесно про мою роль</h2>
        <p>
          Я <b>Dealing Representative</b> в exempt market, а не mortgage-брокер. Це означає, що
          я не видаю іпотек і не даю іпотечних порад. Моя зона — фінансова стратегія: як
          вибудувати <b>downpayment</b>, який рахунок під це використати (наприклад FHSA) і як
          купівля житла вписується у твою ширшу картину. Коли доходить до самої іпотеки, я
          зʼєдную тебе з ліцензованим mortgage-брокером, якому довіряю.
        </p>
        <h2>FHSA — найшвидший шлях до першого внеску</h2>
        <p>
          FHSA дозволяє накопичувати на перший дім із подвійною перевагою: внески зменшують
          оподатковуваний дохід, а зняття на купівлю житла не оподатковується. Для багатьох
          новоприбулих це найефективніший інструмент під downpayment. На дзвінку рахуємо твій
          конкретний сценарій.
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
        <h2>Сплануймо твій перший дім</h2>
        <p className="sf-lead">
          На безкоштовному 30-хвилинному дзвінку розберемо downpayment-стратегію, FHSA і повну
          фінансову картину — а на іпотеку зʼєдную з ліцензованим брокером.
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
        зареєстрований через Axcess Capital Advisors Inc. (Exempt Market Dealer), реєстрація
        Alberta / British Columbia / Ontario. Я <b>не</b> mortgage-брокер і не надаю іпотечних
        порад; послуги іпотеки надає окремий ліцензований mortgage-брокер. Сфера моєї
        ліцензії — exempt market securities.
      </p>
      <p>
        Калькулятор доступності — освітня оцінка для планування, а не pre-approval чи
        пропозиція кредиту. Ця сторінка не є персональною фінансовою, юридичною чи податковою
        консультацією. Перевір мою реєстрацію: nrd-info.ca (NRD #4575551).
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
.sf-lead{color:var(--mut);font-size:clamp(16px,2.2vw,20px);max-width:64ch;margin:22px 0 0;line-height:1.5;}
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

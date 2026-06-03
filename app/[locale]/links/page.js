// app/links/page.js
// Link-in-bio сторінка для Instagram / TikTok → sky-fort.ca/links
// Mobile-first. Server component. Лінки = конфіг угорі (постав реальні роути).
// Трекінг: PostHog autocapture підхопить кліки; data-ph-capture-attribute-* = чисті фільтри.

const SITE = "https://sky-fort.ca";
const PATH = "/links";
const CALENDLY = "https://calendly.com/andriushchenko-partners/new-meeting";

// ↓↓↓ ПОСТАВ РЕАЛЬНІ РОУТИ ↓↓↓
const LINKS = {
  tfsaCalc: "/calculators/tfsa-growth",        // роут TFSA-калькулятора
  freedomCalc: "/calculators/financial-freedom", // роут калькулятора фін. свободи
  mortgageCalc: "/calculators/mortgage",       // роут mortgage-калькулятора
  guides: "/guides",               // сторінка з безкоштовними гайдами (або заміни)
  about: "/pro-mene",              // About page
};
const CONTACT = {
  email: "andrii@sky-fort.ca",     // або andriushchenko.partners@gmail.com
  phone: "+1 403-397-2553",
  // ig temporarily removed — Instagram profile not active yet
  tiktok: "https://tiktok.com/@andrii.wealthcanada",
};
// ↑↑↑ ─────────────────── ↑↑↑

export const metadata = {
  title: "SkyFort Wealth — лінки | Andrii Andriushchenko",
  description:
    "Безкоштовні фінансові калькулятори, гайди та запис на дзвінок. Фінанси для українців у Канаді.",
  alternates: { canonical: SITE + PATH },
  robots: { index: true, follow: true },
  openGraph: {
    title: "SkyFort Wealth — усі лінки",
    description: "Калькулятори · гайди · безкоштовний дзвінок. Фінанси для українців у Канаді.",
    url: SITE + PATH,
    siteName: "SkyFort Wealth",
    locale: "uk_CA",
    type: "website",
  },
};

export default function Page() {
  return (
    <main className="sf-links">
      <Style />

      <header className="sf-top">
        <div className="sf-logo">SKYFORT<span className="sf-blue"> WEALTH</span></div>
        <h1>Andrii Andriushchenko</h1>
        <p className="sf-handle">@andrii.wealthcanada · Калгарі 🇨🇦</p>
        <p className="sf-bio">
          Фінанси для українців у Канаді. Ліцензований Dealing Representative
          (exempt market). TFSA · FHSA · перший дім · інвестиції.
        </p>
      </header>

      {/* PRIMARY CTA */}
      <a
        className="sf-link sf-primary"
        href={CALENDLY}
        target="_blank"
        rel="noopener"
        data-ph-capture-attribute-bio-link="discovery-call"
      >
        <span>🎯 Безкоштовний 30-хв дзвінок</span>
        <small>Suitability Assessment · без тиску</small>
      </a>

      <div className="sf-section">Безкоштовні калькулятори</div>
      <a className="sf-link" href={LINKS.tfsaCalc} data-ph-capture-attribute-bio-link="tfsa-calc">
        📈 TFSA калькулятор
      </a>
      <a className="sf-link" href={LINKS.freedomCalc} data-ph-capture-attribute-bio-link="freedom-calc">
        🕊️ Калькулятор фінансової свободи
      </a>
      <a className="sf-link" href={LINKS.mortgageCalc} data-ph-capture-attribute-bio-link="mortgage-calc">
        🏠 Калькулятор іпотеки (Калгарі)
      </a>

      <div className="sf-section">Дізнатися більше</div>
      <a className="sf-link" href={LINKS.about} data-ph-capture-attribute-bio-link="about">
        👤 Про мене · моя реєстрація
      </a>

      <div className="sf-section">Контакт</div>
      <div className="sf-contacts">
        <a href={`mailto:${CONTACT.email}`} data-ph-capture-attribute-bio-link="email">{CONTACT.email}</a>
        <a href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`} data-ph-capture-attribute-bio-link="phone">{CONTACT.phone}</a>
      </div>

      <footer className="sf-foot">
        Andrii Andriushchenko · Dealing Representative через Axcess Capital Advisors Inc.
        (EMD), реєстрація AB / BC / ON. Освітній контент, не інвестиційна рекомендація.
        Перевірка: nrd-info.ca · NRD #4575551.
      </footer>
    </main>
  );
}

function Style() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
.sf-links{--bg:#101010;--soft:#1b1b1b;--soft2:#222;--line:rgba(255,255,255,.10);--blue:var(--color-brand);--blue2:var(--color-brand-hover);--ink:#f4f5f7;--mut:#9a9da4;
  background:radial-gradient(120% 60% at 50% 0%,#1a1f33 0%,var(--bg) 55%);min-height:100dvh;color:var(--ink);
  font-family:inherit;max-width:520px;margin:0 auto;padding:48px 20px 60px;}
.sf-links .sf-blue{color:var(--blue2);}
.sf-top{text-align:center;margin-bottom:30px;}
.sf-logo{font-weight:800;letter-spacing:.02em;font-size:15px;text-transform:uppercase;color:var(--mut);}
.sf-top h1{font-size:26px;font-weight:800;letter-spacing:-.02em;margin:14px 0 4px;}
.sf-handle{color:var(--mut);font-size:14px;margin:0 0 14px;}
.sf-bio{color:#cfd2d8;font-size:14px;line-height:1.5;margin:0 auto;max-width:42ch;}
.sf-section{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--mut);
  margin:26px 4px 12px;}
.sf-link{display:flex;flex-direction:column;gap:3px;align-items:center;text-decoration:none;color:var(--ink);
  background:var(--soft);border:1px solid var(--line);border-radius:16px;padding:17px 18px;margin-bottom:11px;
  font-size:16px;font-weight:600;text-align:center;min-height:56px;justify-content:center;
  transition:transform .14s ease,border-color .14s ease,background .14s ease;}
.sf-link:hover,.sf-link:active{transform:translateY(-2px);border-color:var(--blue2);background:var(--soft2);}
.sf-link small{font-weight:400;color:var(--mut);font-size:12px;}
.sf-primary{background:var(--blue);border-color:var(--blue);color:#fff;font-size:17px;}
.sf-primary small{color:rgba(255,255,255,.8);}
.sf-primary:hover,.sf-primary:active{background:var(--blue2);border-color:var(--blue2);}
.sf-contacts{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;}
.sf-contacts a{flex:1;min-width:46%;text-align:center;text-decoration:none;color:var(--mut);
  border:1px solid var(--line);border-radius:14px;padding:13px;font-size:14px;}
.sf-contacts a:hover{color:var(--ink);border-color:var(--blue2);}
.sf-foot{color:#65686f;font-size:11px;line-height:1.55;text-align:center;margin-top:34px;}
`,
      }}
    />
  );
}

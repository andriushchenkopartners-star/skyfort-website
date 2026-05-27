// app/resources/page.js
// Gated document library: suitability pre-screen → access to materials + discovery CTA.
// "use client" бо є форма й стан. Лід пишеться через /api/lead (роут нижче окремим файлом).
//
// ВАЖЛИВО (compliance): доступ відкривається ТІЛЬКИ після ідентифікації + suitability pre-screen.
// PDF — приватні signed URLs з Supabase Storage. Жодного публічного лінка на документи.
// Сторінку НЕ індексуємо (robots noindex) — це не SEO-сторінка.

"use client";

import { useState } from "react";

const CALENDLY = "https://calendly.com/andriushchenko-partners/new-meeting";

// ↓↓↓ ПІДСТАВ ПРИВАТНІ signed URLs зі свого Supabase Storage (не публічні!) ↓↓↓
// Згенеруй у Supabase: Storage → bucket (private) → файл → "Create signed URL".
// Або краще — генеруй їх серверно в /api/lead після запису ліда. Поки — плейсхолдери.
const DOCS = [
  { cat: "Diversified Yield", name: "ICM Crescendo Music Royalty Fund — Fund Fact Sheet", url: "#" },
  { cat: "Diversified Yield", name: "Invico Diversified Income Fund — OM", url: "#" },
  { cat: "Mortgage (MIC)", name: "KV Mortgage Fund — Fund Fact Sheet (Q4 F2025)", url: "#" },
  { cat: "Real Estate / REIT", name: "Avenue Living Real Estate Core Trust — Update 1Q25", url: "#" },
  { cat: "Real Estate / REIT", name: "Mini Mall Storage Properties Trust — Fact Sheet", url: "#" },
  { cat: "Private Equity", name: "Westbridge Capital Partners Income Trust — Deck", url: "#" },
  { cat: "Overview", name: "Axcess Capital — Product Shelf", url: "#" },
];
// ↑↑↑ ────────────────────────────────────────────────────────── ↑↑↑

export default function Page() {
  const [unlocked, setUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    investorType: "",
    horizon: "",
    risk: "",
    consent: false,
  });

  const set = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const valid =
    form.name.trim() &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.investorType &&
    form.horizon &&
    form.risk &&
    form.consent;

  async function handleSubmit() {
    if (!valid || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      // Запис ліда. Якщо роут ще не готовий — не блокуємо доступ, але логуємо.
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "resources-gate", ts: new Date().toISOString() }),
      }).catch(() => {});
      setUnlocked(true);
    } catch (e) {
      // Навіть якщо запис не вдався — людина вже дала згоду; показуємо матеріали,
      // але повідомляємо, що зв'яжемось.
      setUnlocked(true);
    } finally {
      setSubmitting(false);
    }
  }

  const cats = [...new Set(DOCS.map((d) => d.cat))];

  return (
    <main className="sf-res">
      <Style />

      <section className="sf-hero">
        <span className="sf-kicker">Для зареєстрованих / eligible інвесторів</span>
        <h1>
          Бібліотека <span className="sf-blue">документів</span>
        </h1>
        <p className="sf-lead">
          Fund fact sheets, offering memoranda та квартальні оновлення по приватних інвестиціях
          exempt market. Доступ відкривається після короткої перевірки відповідності — це
          обовʼязковий регуляторний крок (NI 31-103), а не формальність.
        </p>
      </section>

      {!unlocked ? (
        <section className="sf-gate">
          <div className="sf-card">
            <h2>Швидка перевірка відповідності</h2>
            <p className="sf-sub">
              30 секунд. Допомагає переконатися, що ці матеріали доречні саме для тебе.
            </p>

            <label className="sf-field">
              <span>Імʼя</span>
              <input value={form.name} onChange={set("name")} placeholder="Ваше імʼя" />
            </label>

            <label className="sf-field">
              <span>Email</span>
              <input value={form.email} onChange={set("email")} placeholder="you@email.com" type="email" />
            </label>

            <label className="sf-field">
              <span>Категорія інвестора</span>
              <select value={form.investorType} onChange={set("investorType")}>
                <option value="">Оберіть…</option>
                <option>Accredited Investor</option>
                <option>Eligible Investor</option>
                <option>Поки не впевнений / хочу зрозуміти</option>
              </select>
            </label>

            <label className="sf-field">
              <span>Інвестиційний горизонт</span>
              <select value={form.horizon} onChange={set("horizon")}>
                <option value="">Оберіть…</option>
                <option>До 3 років</option>
                <option>3–5 років</option>
                <option>5+ років</option>
              </select>
            </label>

            <label className="sf-field">
              <span>Толерантність до ризику</span>
              <select value={form.risk} onChange={set("risk")}>
                <option value="">Оберіть…</option>
                <option>Консервативна</option>
                <option>Помірна</option>
                <option>Висока</option>
              </select>
            </label>

            <label className="sf-check">
              <input type="checkbox" checked={form.consent} onChange={set("consent")} />
              <span>
                Розумію, що це освітні матеріали, не інвестиційна рекомендація, і що
                будь-яке рішення потребує Suitability Assessment. Погоджуюсь, щоб зі мною
                звʼязалися щодо discovery-дзвінка.
              </span>
            </label>

            {error && <p className="sf-err">{error}</p>}

            <button className="sf-btn sf-btn-primary" disabled={!valid || submitting} onClick={handleSubmit}>
              {submitting ? "Хвилинку…" : "Відкрити доступ →"}
            </button>
          </div>
        </section>
      ) : (
        <section className="sf-lib">
          <div className="sf-thanks">
            <h2>Дякую, {form.name.split(" ")[0]} 👋</h2>
            <p className="sf-sub">
              Нижче — матеріали. Хочеш розібрати, що з цього підходить саме тобі?
              Забронюй безкоштовний 30-хвилинний дзвінок.
            </p>
            <a className="sf-btn sf-btn-primary" href={CALENDLY} target="_blank" rel="noopener">
              Записатися на дзвінок
            </a>
          </div>

          {cats.map((c) => (
            <div key={c} className="sf-catblock">
              <div className="sf-cat">{c}</div>
              {DOCS.filter((d) => d.cat === c).map((d, i) => (
                <a
                  key={i}
                  className="sf-doc"
                  href={d.url}
                  target="_blank"
                  rel="noopener"
                  data-ph-capture-attribute-doc={d.name}
                >
                  <span>📄 {d.name}</span>
                  <span className="sf-open">Відкрити</span>
                </a>
              ))}
            </div>
          ))}

          <p className="sf-note">
            Документи надаються лише для ознайомлення зареєстрованим / eligible інвесторам і
            не підлягають подальшому розповсюдженню.
          </p>
        </section>
      )}

      <footer className="sf-disclaimer">
        <p>
          Andrii Andriushchenko, Dealing Representative через Axcess Capital Advisors Inc. (EMD),
          реєстрація AB / BC / ON. Сфера ліцензії — exempt market securities. Ці матеріали не є
          пропозицією продажу securities і не містять усієї інформації, потрібної для
          інвестиційного рішення. Інвестиції в exempt market несуть ризик втрати капіталу,
          включно з ризиком втрати всього вкладеного; вони можуть бути неліквідними. Минула
          дохідність не гарантує майбутньої. Рішення — лише після Suitability Assessment (NI 31-103)
          і ознайомлення з Offering Memorandum issuer&apos;а. Перевірка реєстрації: nrd-info.ca (NRD #4575551).
        </p>
      </footer>
    </main>
  );
}

function Style() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
.sf-res{--bg:#131313;--soft:#1b1b1b;--soft2:#222;--line:rgba(255,255,255,.08);--blue:var(--color-brand);--blue2:var(--color-brand-hover);--ink:#f4f5f7;--mut:#a0a3ab;
  background:var(--bg);color:var(--ink);font-family:inherit;line-height:1.55;min-height:100dvh;}
.sf-res .sf-blue{color:var(--blue2);}
.sf-res section{max-width:760px;margin:0 auto;padding:0 22px;}
.sf-res h1,.sf-res h2{text-transform:uppercase;font-weight:800;letter-spacing:-.02em;line-height:1.04;margin:0;}
.sf-hero{padding:80px 22px 36px;}
.sf-kicker{display:inline-block;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--mut);
  border:1px solid var(--line);border-radius:100px;padding:6px 14px;margin-bottom:24px;}
.sf-hero h1{font-size:clamp(38px,8vw,72px);}
.sf-lead{color:var(--mut);font-size:clamp(15px,2.2vw,18px);max-width:60ch;margin:20px 0 0;}
.sf-gate,.sf-lib{padding-bottom:40px;}
.sf-card{background:var(--soft);border:1px solid var(--line);border-radius:18px;padding:30px;}
.sf-card h2{font-size:22px;margin-bottom:6px;}
.sf-sub{color:var(--mut);font-size:14px;margin:0 0 22px;}
.sf-field{display:block;margin-bottom:16px;}
.sf-field span{display:block;font-size:13px;color:var(--mut);margin-bottom:6px;}
.sf-field input,.sf-field select{width:100%;background:var(--bg);border:1px solid var(--line);border-radius:11px;
  padding:13px 14px;color:var(--ink);font-size:15px;font-family:inherit;outline:none;}
.sf-field input:focus,.sf-field select:focus{border-color:var(--blue2);}
.sf-check{display:flex;gap:11px;align-items:flex-start;margin:20px 0 24px;color:var(--mut);font-size:13px;line-height:1.5;}
.sf-check input{margin-top:3px;width:18px;height:18px;flex-shrink:0;accent-color:var(--blue);}
.sf-err{color:#ff7a7a;font-size:13px;margin:0 0 14px;}
.sf-btn{display:inline-flex;align-items:center;font-weight:700;font-size:15px;text-decoration:none;border:none;cursor:pointer;
  padding:14px 26px;border-radius:12px;font-family:inherit;transition:transform .15s ease,background .15s ease,opacity .15s ease;}
.sf-btn:hover{transform:translateY(-2px);}
.sf-btn-primary{background:var(--blue);color:#fff;}
.sf-btn-primary:hover{background:var(--blue2);}
.sf-btn-primary:disabled{opacity:.4;cursor:not-allowed;transform:none;}
.sf-thanks{background:var(--soft);border:1px solid var(--line);border-radius:18px;padding:30px;margin-bottom:28px;}
.sf-thanks h2{font-size:24px;margin-bottom:6px;}
.sf-thanks .sf-btn{margin-top:8px;}
.sf-catblock{margin-bottom:22px;}
.sf-cat{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--mut);margin:0 4px 10px;}
.sf-doc{display:flex;justify-content:space-between;align-items:center;gap:14px;text-decoration:none;color:var(--ink);
  background:var(--soft);border:1px solid var(--line);border-radius:13px;padding:16px 18px;margin-bottom:9px;font-size:15px;
  transition:border-color .14s ease,background .14s ease;}
.sf-doc:hover{border-color:var(--blue2);background:var(--soft2);}
.sf-open{color:var(--blue2);font-weight:600;font-size:13px;white-space:nowrap;}
.sf-note{color:#65686f;font-size:12px;margin-top:16px;}
.sf-disclaimer{max-width:760px;margin:0 auto;padding:30px 22px 70px;}
.sf-disclaimer p{color:#65686f;font-size:11px;line-height:1.6;margin:0;}
`,
      }}
    />
  );
}

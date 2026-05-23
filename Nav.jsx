// app/Nav.jsx
// Самодостатнє бургер-меню (три рисочки) для всього сайту.
// Фіксоване у правому верхньому куті. Клік → висувна панель зі сторінками.
// Кольори/шрифт = бренд SkyFort (charcoal + electric-blue, Manrope через inherit).

"use client";

import { useState, useEffect } from "react";

const LINKS = [
  { label: "Головна", href: "/" },
  { label: "TFSA калькулятор", href: "/tfsa-kalkulyator" },
  { label: "Exempt market українцям", href: "/exempt-market-ukrayintsyam" },
  { label: "Іпотека Калгарі", href: "/ipoteka-kalhari" },
  { label: "Калькулятори", href: "/calculators/tfsa-growth" },
  { label: "Про мене", href: "/pro-mene" },
  { label: "Документи", href: "/resources" },
];

const CALENDLY = "https://calendly.com/andriushchenko-partners/new-meeting";

export default function Nav() {
  const [open, setOpen] = useState(false);

  // Блокуємо скрол сторінки, коли меню відкрите
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Esc закриває
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <Style />

      {/* Бургер-кнопка */}
      <button
        className={`sf-burger ${open ? "is-open" : ""}`}
        aria-label={open ? "Закрити меню" : "Відкрити меню"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Затемнення фону */}
      <div
        className={`sf-overlay ${open ? "is-open" : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* Висувна панель */}
      <nav className={`sf-panel ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="sf-panel-logo">SKYFORT<span className="sf-blue"> WEALTH</span></div>
        <ul>
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
            </li>
          ))}
        </ul>
        <a
          className="sf-panel-cta"
          href={CALENDLY}
          target="_blank"
          rel="noopener"
          onClick={() => setOpen(false)}
        >
          Безкоштовний дзвінок →
        </a>
      </nav>
    </>
  );
}

function Style() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
:root{--nav-blue:#2f6bff;--nav-blue2:#4f86ff;}
.sf-blue{color:var(--nav-blue2);}

/* Бургер */
.sf-burger{position:fixed;top:20px;right:20px;z-index:1002;width:48px;height:48px;
  display:flex;flex-direction:column;justify-content:center;align-items:center;gap:5px;
  background:rgba(20,20,20,.85);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.12);
  border-radius:12px;cursor:pointer;padding:0;transition:border-color .15s ease;}
.sf-burger:hover{border-color:var(--nav-blue2);}
.sf-burger span{display:block;width:20px;height:2px;background:#f4f5f7;border-radius:2px;
  transition:transform .25s ease,opacity .2s ease;}
.sf-burger.is-open span:nth-child(1){transform:translateY(7px) rotate(45deg);}
.sf-burger.is-open span:nth-child(2){opacity:0;}
.sf-burger.is-open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}

/* Затемнення */
.sf-overlay{position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,.55);
  opacity:0;pointer-events:none;transition:opacity .25s ease;}
.sf-overlay.is-open{opacity:1;pointer-events:auto;}

/* Панель */
.sf-panel{position:fixed;top:0;right:0;z-index:1001;height:100dvh;width:min(82vw,340px);
  background:#161616;border-left:1px solid rgba(255,255,255,.08);
  padding:88px 30px 40px;transform:translateX(100%);transition:transform .3s cubic-bezier(.4,0,.2,1);
  display:flex;flex-direction:column;font-family:inherit;}
.sf-panel.is-open{transform:translateX(0);}
.sf-panel-logo{font-weight:800;text-transform:uppercase;letter-spacing:.02em;font-size:15px;
  color:#a0a3ab;margin-bottom:30px;}
.sf-panel ul{list-style:none;margin:0;padding:0;flex:1;}
.sf-panel li{margin-bottom:4px;}
.sf-panel li a{display:block;text-decoration:none;color:#f4f5f7;font-size:18px;font-weight:600;
  padding:12px 0;border-bottom:1px solid rgba(255,255,255,.06);transition:color .15s ease,padding-left .15s ease;}
.sf-panel li a:hover{color:var(--nav-blue2);padding-left:6px;}
.sf-panel-cta{display:block;text-align:center;text-decoration:none;background:var(--nav-blue);color:#fff;
  font-weight:700;font-size:15px;padding:15px;border-radius:12px;margin-top:24px;transition:background .15s ease;}
.sf-panel-cta:hover{background:var(--nav-blue2);}
`,
      }}
    />
  );
}

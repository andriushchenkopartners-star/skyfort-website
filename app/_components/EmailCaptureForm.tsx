"use client";

// EmailCaptureForm — універсальна email-capture форма.
// Variants: "hero" (compact, inline) | "card" (full card з description)
// Mount: на /uk (hero CTA), /uk/tt (TikTok landing), будь-який pillar блог-пост.

import { useState } from "react";
import type { FormEvent } from "react";
import { Mail, Download, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { track, getStoredUtms } from "../_lib/analytics";

type Locale = "uk" | "ru" | "en";
type Variant = "hero" | "card";
type FormState = "idle" | "sending" | "success" | "error";

interface EmailCaptureCopy {
  heroTitle: string;
  heroSub: string;
  cardTitle: string;
  cardSub: string;
  emailPh: string;
  namePh: string;
  submit: string;
  sending: string;
  success: string;
  errInvalid: string;
  errRate: string;
  errGeneric: string;
  privacy: string;
}

const COPY: Record<Locale, EmailCaptureCopy> = {
  uk: {
    heroTitle: "Безкоштовний гайд TFSA → твоя пошта",
    heroSub: "8 типових помилок українців з TFSA + 20-річний план. PDF за 1 клік.",
    cardTitle: "Безкоштовний гайд: TFSA для українців у Канаді",
    cardSub: "Свій досвід + математика на 20 років. PDF одразу на пошту. Можеш відписатись у будь-який момент.",
    emailPh: "you@email.com",
    namePh: "Як до тебе звертатись (опціонально)",
    submit: "Отримати гайд",
    sending: "Надсилаю…",
    success: "✅ Готово! Перевір пошту — гайд уже летить. Перевір також папку 'Spam' про всяк.",
    errInvalid: "Введи правильний email",
    errRate: "Зачекай хвилину перш ніж повторно",
    errGeneric: "Щось пішло не так. Спробуй ще раз.",
    privacy: "Без spam. Можеш відписатись одним кліком.",
  },
  ru: {
    heroTitle: "Бесплатный гайд TFSA → твоя почта",
    heroSub: "8 типичных ошибок русскоязычных с TFSA + 20-летний план. PDF в 1 клик.",
    cardTitle: "Бесплатный гайд: TFSA для русскоязычных в Канаде",
    cardSub: "Опыт + математика на 20 лет. PDF сразу на почту. Можешь отписаться в любой момент.",
    emailPh: "you@email.com",
    namePh: "Как к тебе обращаться (опционально)",
    submit: "Получить гайд",
    sending: "Отправляю…",
    success: "✅ Готово! Проверь почту — гайд уже летит. Проверь также папку 'Спам'.",
    errInvalid: "Введи правильный email",
    errRate: "Подожди минуту прежде чем повторно",
    errGeneric: "Что-то пошло не так. Попробуй ещё раз.",
    privacy: "Без spam. Можешь отписаться одним кликом.",
  },
  en: {
    heroTitle: "Free TFSA guide → your inbox",
    heroSub: "8 common newcomer mistakes + 20-year plan. PDF in 1 click.",
    cardTitle: "Free guide: TFSA for newcomers to Canada",
    cardSub: "Field-tested + 20-year math. PDF sent right away. Unsubscribe anytime.",
    emailPh: "you@email.com",
    namePh: "Your name (optional)",
    submit: "Get the guide",
    sending: "Sending…",
    success: "✅ Done! Check your inbox — the guide is on its way. Also check your Spam folder.",
    errInvalid: "Please enter a valid email",
    errRate: "Wait a minute before trying again",
    errGeneric: "Something went wrong. Try again.",
    privacy: "No spam. Unsubscribe in one click.",
  },
};

function isValidEmail(e: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

export default function EmailCaptureForm({
  locale = "uk",
  variant = "card",
  source = "unknown",
  leadMagnet = "TFSA_GUIDE",
  className = "",
}: {
  locale?: Locale;
  variant?: Variant;
  source?: string;
  leadMagnet?: string;
  className?: string;
}) {
  const c = COPY[locale] || COPY.uk;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [state, setState] = useState<FormState>("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setState("error");
      setErrorMsg(c.errInvalid);
      return;
    }
    setState("sending");
    setErrorMsg("");

    const utms = getStoredUtms();

    try {
      const res = await fetch("/api/email-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          name: name.trim() || null,
          website, // honeypot
          locale,
          source,
          lead_magnet: leadMagnet,
          consent: true,
          utm_source: utms.utm_source || null,
          utm_medium: utms.utm_medium || null,
          utm_campaign: utms.utm_campaign || null,
        }),
      });
      const j = await res.json().catch(() => ({}));
      if (res.ok && j.ok) {
        setState("success");
        track("email_subscribe", {
          source,
          lead_magnet: leadMagnet,
          brevo_synced: !!j.brevo_synced,
        });
      } else if (res.status === 429) {
        setState("error");
        setErrorMsg(c.errRate);
      } else {
        setState("error");
        setErrorMsg(c.errGeneric);
      }
    } catch {
      setState("error");
      setErrorMsg(c.errGeneric);
    }
  }

  if (state === "success") {
    return (
      <div
        className={`rounded-2xl border border-[var(--color-success)]/30 bg-[var(--color-success)]/10 p-6 text-center md:p-8 ${className}`}
      >
        <CheckCircle2
          className="mx-auto mb-3 h-10 w-10 text-[var(--color-success)]"
          aria-hidden="true"
        />
        <p className="text-base text-[var(--color-fg)] md:text-lg">{c.success}</p>
      </div>
    );
  }

  // === HERO variant (compact, inline) ===
  if (variant === "hero") {
    return (
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col gap-3 ${className}`}
        aria-label={c.heroTitle}
      >
        {/* Honeypot */}
        <div
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
        >
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={c.emailPh}
            required
            disabled={state === "sending"}
            className="flex-1 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg)] px-5 py-3 text-base text-[var(--color-fg)] placeholder:text-[var(--color-fg-subtle)] focus:border-[var(--color-brand)] focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={state === "sending" || !email}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[var(--color-brand-hover)] disabled:opacity-50"
          >
            {state === "sending" ? c.sending : c.submit}
            {state !== "sending" && (
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
        {errorMsg && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-lg border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/10 px-3 py-2 text-sm text-[var(--color-danger)]"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <span>{errorMsg}</span>
          </div>
        )}
        <p className="text-xs text-[var(--color-fg-subtle)]">{c.privacy}</p>
      </form>
    );
  }

  // === CARD variant (full card з description) ===
  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-2xl border border-[var(--color-brand)]/30 bg-gradient-to-br from-[var(--color-bg-card)] to-[#1a2438] p-7 md:p-9 ${className}`}
      aria-labelledby="email-capture-title"
    >
      {/* Honeypot */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
      >
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="mb-2 flex items-center gap-2">
        <Download
          className="h-5 w-5 text-[var(--color-brand)]"
          aria-hidden="true"
        />
        <h2
          id="email-capture-title"
          className="font-display text-xl text-[var(--color-fg)] md:text-2xl"
        >
          {c.cardTitle}
        </h2>
      </div>
      <p className="mb-5 text-sm text-[var(--color-fg-muted)] md:text-base">
        {c.cardSub}
      </p>

      <div className="space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={c.namePh}
          maxLength={100}
          disabled={state === "sending"}
          className="w-full rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-bg)] px-4 py-2.5 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-subtle)] focus:border-[var(--color-brand)] focus:outline-none disabled:opacity-50"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={c.emailPh}
          required
          disabled={state === "sending"}
          className="w-full rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-bg)] px-4 py-3 text-base text-[var(--color-fg)] placeholder:text-[var(--color-fg-subtle)] focus:border-[var(--color-brand)] focus:outline-none disabled:opacity-50"
        />

        {errorMsg && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-lg border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/10 px-3 py-2 text-sm text-[var(--color-danger)]"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <p className="text-xs text-[var(--color-fg-subtle)]">{c.privacy}</p>
          <button
            type="submit"
            disabled={state === "sending" || !email}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[var(--color-brand-hover)] disabled:opacity-50"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {state === "sending" ? c.sending : c.submit}
          </button>
        </div>
      </div>
    </form>
  );
}

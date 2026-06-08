"use client";

// Topic suggestion form — користувачі можуть запропонувати тему для майбутньої статті.
// Mount на /uk/blog (hub) і на кожному пості (внизу).
// Локалізована UA/RU/EN. Honeypot для anti-spam.

import { useState } from "react";
import type { FormEvent } from "react";
import { Lightbulb, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { track, getStoredUtms } from "../_lib/analytics";
import { useLocalStorage } from "../_lib/hooks";

type Locale = "uk" | "ru" | "en";
type FormState = "idle" | "sending" | "success" | "error";

const DRAFT_KEY = "skyfort_topic_draft";

interface TopicSuggestCopy {
  title: string;
  sub: string;
  placeholder: string;
  emailLabel: string;
  emailPh: string;
  submit: string;
  sending: string;
  success: string;
  errorMin: string;
  errorRate: string;
  errorGeneric: string;
  privacy: string;
}

const COPY: Record<Locale, TopicSuggestCopy> = {
  uk: {
    title: "Запропонуй тему наступної статті",
    sub: "Що тобі цікаво розібрати? Я читаю кожне повідомлення і часто пишу статті за запитами.",
    placeholder: "Наприклад: «Як працює GIC ladder у Канаді» або «Чи варто українцю купити дім чи орендувати»",
    emailLabel: "Email (опційно — повідомлю коли стаття вийде)",
    emailPh: "you@email.com",
    submit: "Надіслати ідею",
    sending: "Надсилаю…",
    success: "Дякую! Я отримав твою пропозицію. Якщо залишив email — повідомлю коли стаття буде готова.",
    errorMin: "Опиши тему хоча б у 5 символах",
    errorRate: "Зачекай хвилину перш ніж надсилати знову",
    errorGeneric: "Щось пішло не так. Спробуй ще раз через хвилину.",
    privacy: "Email і IP зберігаються тільки для зв'язку. Без spam.",
  },
  ru: {
    title: "Предложи тему следующей статьи",
    sub: "Что тебе интересно разобрать? Я читаю каждое сообщение и часто пишу статьи по запросам.",
    placeholder: "Например: «Как работает GIC ladder в Канаде» или «Стоит ли русскоязычному купить дом или арендовать»",
    emailLabel: "Email (опционально — сообщу когда статья выйдет)",
    emailPh: "you@email.com",
    submit: "Отправить идею",
    sending: "Отправляю…",
    success: "Спасибо! Я получил твоё предложение. Если оставил email — сообщу когда статья будет готова.",
    errorMin: "Опиши тему хотя бы в 5 символах",
    errorRate: "Подожди минуту прежде чем отправлять снова",
    errorGeneric: "Что-то пошло не так. Попробуй ещё раз через минуту.",
    privacy: "Email и IP хранятся только для связи. Без spam.",
  },
  en: {
    title: "Suggest a topic for the next article",
    sub: "What would you like me to break down? I read every message and often write posts based on requests.",
    placeholder: "Example: 'How GIC ladders work in Canada' or 'Should a newcomer buy a home or rent'",
    emailLabel: "Email (optional — I'll let you know when the article is out)",
    emailPh: "you@email.com",
    submit: "Send idea",
    sending: "Sending…",
    success: "Thanks! I got your suggestion. If you left an email, I'll let you know when the article is ready.",
    errorMin: "Please describe the topic in at least 5 characters",
    errorRate: "Wait a minute before sending again",
    errorGeneric: "Something went wrong. Try again in a minute.",
    privacy: "Email and IP are stored only for contact. No spam.",
  },
};

export default function TopicSuggestForm({
  locale = "uk",
  source = "blog_hub",
}: {
  locale?: Locale;
  source?: string;
}) {
  const c = COPY[locale] || COPY.uk;

  // Draft persistence: `savedDraft` reads localStorage reactively (null on SSR
  // and when key missing). `override` is the user's current edit; when null,
  // the textarea shows the saved draft. On every change we write to localStorage
  // in the handler — no setState-in-effect needed.
  const savedDraft = useLocalStorage(DRAFT_KEY);
  const [override, setOverride] = useState<string | null>(null);
  const topic = override ?? savedDraft ?? "";

  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [state, setState] = useState<FormState>("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  function setTopic(value: string) {
    setOverride(value);
    try {
      localStorage.setItem(DRAFT_KEY, value);
      // Manually dispatch storage event so useSyncExternalStore subscribers
      // (this hook, on other re-renders) see the new value.
      window.dispatchEvent(new StorageEvent("storage", { key: DRAFT_KEY }));
    } catch {}
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (topic.trim().length < 5) {
      setState("error");
      setErrorMsg(c.errorMin);
      return;
    }
    setState("sending");
    setErrorMsg("");

    const utms = getStoredUtms();

    try {
      const res = await fetch("/api/topic-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.trim(),
          email: email.trim() || null,
          website, // honeypot
          locale,
          source,
          utm_source: utms.utm_source || null,
          utm_medium: utms.utm_medium || null,
          utm_campaign: utms.utm_campaign || null,
        }),
      });
      const j = await res.json().catch(() => ({}));
      if (res.ok && j.ok) {
        setState("success");
        track("topic_request_submit", { source, has_email: !!email });
        // Clear draft (both override and persisted storage)
        setOverride("");
        try {
          localStorage.removeItem(DRAFT_KEY);
          window.dispatchEvent(new StorageEvent("storage", { key: DRAFT_KEY }));
        } catch {}
      } else if (res.status === 429) {
        setState("error");
        setErrorMsg(c.errorRate);
      } else {
        setState("error");
        setErrorMsg(c.errorGeneric);
      }
    } catch {
      setState("error");
      setErrorMsg(c.errorGeneric);
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-2xl border border-[var(--color-success)]/30 bg-[var(--color-success)]/5 p-7 text-center md:p-9">
        <CheckCircle2
          className="mx-auto mb-3 h-10 w-10 text-[var(--color-success)]"
          aria-hidden="true"
        />
        <p className="text-lg font-semibold text-[var(--color-fg)]">
          {c.success}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[var(--color-brand)]/30 bg-gradient-to-br from-[var(--color-bg-card)] to-[#1a2438] p-7 md:p-9"
      aria-labelledby="topic-suggest-title"
    >
      <div className="mb-2 flex items-center gap-2">
        <Lightbulb
          className="h-5 w-5 text-[var(--color-brand)]"
          aria-hidden="true"
        />
        <h2
          id="topic-suggest-title"
          className="font-display text-xl text-[var(--color-fg)] md:text-2xl"
        >
          {c.title}
        </h2>
      </div>
      <p className="mb-5 text-sm text-[var(--color-fg-muted)] md:text-base">
        {c.sub}
      </p>

      {/* Honeypot — hidden from real users, visible to bots */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>

      <div className="space-y-4">
        <div>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={c.placeholder}
            rows={3}
            maxLength={500}
            disabled={state === "sending"}
            required
            className="w-full rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-bg)] px-4 py-3 text-base text-[var(--color-fg)] placeholder:text-[var(--color-fg-subtle)] transition-[border-color] duration-150 ease-[var(--ease-out)] focus:border-[var(--color-brand)] focus:outline-none disabled:opacity-50"
          />
          <div className="mt-1 text-right text-xs text-[var(--color-fg-subtle)]">
            {topic.length}/500
          </div>
        </div>

        <div>
          <label
            htmlFor="topic-email"
            className="mb-1.5 block text-xs font-semibold text-[var(--color-fg-muted)]"
          >
            {c.emailLabel}
          </label>
          <input
            id="topic-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={c.emailPh}
            disabled={state === "sending"}
            className="w-full rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-bg)] px-4 py-2.5 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-subtle)] transition-[border-color] duration-150 ease-[var(--ease-out)] focus:border-[var(--color-brand)] focus:outline-none disabled:opacity-50"
          />
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

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-[var(--color-fg-subtle)]">{c.privacy}</p>
          <button
            type="submit"
            disabled={state === "sending" || topic.trim().length < 5}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition-[transform,background-color] duration-200 ease-[var(--ease-out)] hover:bg-[var(--color-brand-hover)] active:scale-[0.98] disabled:opacity-50"
          >
            {state === "sending" ? c.sending : c.submit}
            <Send className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </form>
  );
}

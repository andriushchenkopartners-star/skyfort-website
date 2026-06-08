"use client";

// Shared LangSwitcher — used by homepage, pro-mene, all calculators.
// Drives navigation by replacing the locale segment in the current URL.

import { Globe } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { SUPPORTED_LOCALES } from "../_i18n/dictionary";

type Locale = "uk" | "ru" | "en";

const LANGS: { code: Locale; label: string }[] = [
  { code: "uk", label: "УК" },
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
];

interface LangSwitcherProps {
  locale?: Locale;
  compact?: boolean;
  className?: string;
  /** Called whenever a language button is tapped — e.g. to close the burger menu. */
  onSwitch?: () => void;
}

export default function LangSwitcher({ locale, compact = false, className = "", onSwitch }: LangSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (newLocale: Locale) => {
    onSwitch?.();
    if (newLocale === locale) return;
    const segments = (pathname || "/").split("/");
    if (SUPPORTED_LOCALES.includes(segments[1])) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.push(segments.join("/") || `/${newLocale}`);
  };

  return (
    <div
      role="group"
      aria-label="Language"
      className={`flex items-center gap-0 rounded-full border border-[#2a2a2a] bg-[#222] p-1 ${className}`}
    >
      {!compact && (
        <Globe className="ml-2 h-3.5 w-3.5 text-[var(--color-fg-subtle)]" aria-hidden="true" />
      )}
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => switchTo(l.code)}
          aria-pressed={locale === l.code}
          className={`rounded-full px-3 py-1 text-xs font-bold tracking-wider transition-[transform,background-color,color] duration-150 ease-[var(--ease-out)] active:scale-95 ${
            locale === l.code
              ? "bg-[var(--color-brand)] text-white"
              : "text-[#a3a3a3] hover:text-white"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

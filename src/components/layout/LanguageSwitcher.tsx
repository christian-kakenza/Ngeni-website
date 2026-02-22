"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSwitch = (nextLocale: "fr" | "en") => {
    if (nextLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div
      className={cn(
        "flex items-center gap-0.5 rounded-lg border border-brand-border bg-brand-surface p-0.5 text-xs font-semibold transition-opacity",
        isPending && "opacity-50"
      )}
      role="group"
      aria-label="Changer la langue / Change language"
    >
      {(["fr", "en"] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => handleSwitch(lang)}
          disabled={isPending}
          aria-pressed={locale === lang}
          className={cn(
            "rounded-md px-2.5 py-1 uppercase transition-all duration-200",
            locale === lang
              ? "bg-brand-accent text-white shadow-sm"
              : "text-brand-gray hover:text-white"
          )}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}

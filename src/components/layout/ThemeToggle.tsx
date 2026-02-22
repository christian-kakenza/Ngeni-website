"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// ============================================================
// ThemeToggle — Bouton Clair / Sombre / Système
// Placé à côté du LanguageSwitcher dans la Navbar
// ============================================================

const SunIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 110 10A5 5 0 0112 7z" />
  </svg>
);

const MoonIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const SystemIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Éviter l'hydration mismatch — ne rendre qu'après le montage côté client
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-border bg-brand-surface/40" />
    );
  }

  const cycle = () => {
    if (theme === "dark")   setTheme("light");
    else if (theme === "light") setTheme("system");
    else                    setTheme("dark");
  };

  const Icon   = theme === "light" ? SunIcon : theme === "dark" ? MoonIcon : SystemIcon;
  const label  = theme === "light" ? "Mode clair" : theme === "dark" ? "Mode sombre" : "Préférence système";

  return (
    <button
      onClick={cycle}
      title={label}
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-border bg-brand-surface/40 text-brand-gray transition-all hover:border-brand-accent/30 hover:bg-brand-surface hover:text-brand-white"
    >
      <Icon />
    </button>
  );
}

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

// ============================================================
// TopBar — Client Component
// Barre supérieure : toggle mobile + recherche
// ============================================================

type TopBarProps = {
  onToggleSidebar: () => void;
};

export function TopBar({ onToggleSidebar }: TopBarProps) {
  const t = useTranslations("common");
  const [search, setSearch] = useState("");

  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b border-brand-border bg-brand-surface/30 px-4 backdrop-blur-sm lg:px-6">
      {/* Mobile hamburger */}
      <button
        onClick={onToggleSidebar}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-border bg-brand-surface text-brand-gray transition-colors hover:text-brand-white lg:hidden"
        aria-label="Toggle menu"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      {/* Search bar */}
      <div className="relative flex-1 max-w-sm">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-brand-gray/40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`${t("search")}…`}
          className="w-full rounded-lg border border-brand-border bg-brand-surface/40 py-2 pl-9 pr-4 text-sm text-brand-white outline-none placeholder:text-brand-gray/40 focus:border-brand-accent/40 focus:ring-1 focus:ring-brand-accent/20 transition-all duration-200"
        />
      </div>

      {/* Right spacer — notifications / avatar could go here */}
      <div className="ml-auto flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_theme(colors.emerald.400)]" title="Online" />
      </div>
    </header>
  );
}

"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

// ============================================================
// ThemeProvider — Wraps next-themes for light/dark/system support
// ============================================================

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="dark"
      forcedTheme="dark"
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}

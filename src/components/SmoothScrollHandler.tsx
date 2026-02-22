"use client";

import { useEffect } from "react";

// ============================================================
// SmoothScrollHandler — Client Component (rendu nul)
// Intercepte tous les clics sur les ancres internes (#hash)
// et utilise scrollIntoView pour un défilement fluide garanti,
// contournant le comportement de saut instantané de Next.js.
// ============================================================

export function SmoothScrollHandler() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;

      if (!anchor) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      // Met à jour l'URL sans déclencher une navigation Next.js
      window.history.pushState(null, "", hash);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}

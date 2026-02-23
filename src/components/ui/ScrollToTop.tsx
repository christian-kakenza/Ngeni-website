"use client";

import { useEffect, useState } from "react";

// Bouton flottant bas-droite — remonte en haut, visible uniquement sur mobile après 300px de scroll
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Retour en haut"
      className="fixed bottom-6 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-brand-accent/30 bg-brand-surface/90 text-brand-accent shadow-glow backdrop-blur-sm transition-all hover:bg-brand-accent hover:text-white md:hidden"
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}

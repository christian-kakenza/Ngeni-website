import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Palette dynamique via CSS variables (dark + light via next-themes)
        brand: {
          black:        "rgb(var(--c-bg) / <alpha-value>)",
          dark:         "rgb(var(--c-bg-dark) / <alpha-value>)",
          darker:       "rgb(var(--c-bg-darker) / <alpha-value>)",
          surface:      "rgb(var(--c-surface) / <alpha-value>)",
          border:       "rgb(var(--c-border) / <alpha-value>)",
          muted:        "rgb(var(--c-muted) / <alpha-value>)",
          white:        "rgb(var(--c-text) / <alpha-value>)",
          gray:         "rgb(var(--c-text-muted) / <alpha-value>)",
          accent:       "rgb(var(--c-accent) / <alpha-value>)",
          "accent-glow":"rgb(var(--c-accent-glow) / <alpha-value>)",
        },
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, #050505 0%, #0f1115 50%, #080a0d 100%)",
        "gradient-glow":
          "radial-gradient(circle at 50% 50%, #1f6feb22 0%, transparent 70%)",
        "glass":
          "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glow: "0 0 40px rgba(88, 166, 255, 0.15)",
        "glow-lg": "0 0 80px rgba(88, 166, 255, 0.2)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255,255,255,0.05)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        // Scale calibrée Plus Jakarta Sans — légèrement réduite pour densité optimale
        xs:   ["0.7rem",   { lineHeight: "1.5",  letterSpacing: "0.01em" }],
        sm:   ["0.8125rem",{ lineHeight: "1.6",  letterSpacing: "0em" }],
        base: ["0.9375rem",{ lineHeight: "1.7",  letterSpacing: "-0.01em" }],
        lg:   ["1.0625rem",{ lineHeight: "1.65", letterSpacing: "-0.015em" }],
        xl:   ["1.1875rem",{ lineHeight: "1.6",  letterSpacing: "-0.02em" }],
        "2xl":["1.375rem", { lineHeight: "1.45", letterSpacing: "-0.025em" }],
        "3xl":["1.75rem",  { lineHeight: "1.35", letterSpacing: "-0.03em" }],
        "4xl":["2.125rem", { lineHeight: "1.25", letterSpacing: "-0.035em" }],
        "5xl":["2.75rem",  { lineHeight: "1.2",  letterSpacing: "-0.04em" }],
        "6xl":["3.5rem",   { lineHeight: "1.15", letterSpacing: "-0.045em" }],
        "7xl":["4.25rem",  { lineHeight: "1.12", letterSpacing: "-0.05em" }],
      },
      animation: {
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.5s ease-out",
        "slide-in": "slide-in 0.4s ease-out",
        // Hero background animations
        "hero-glow-1": "hero-glow-1 10s ease-in-out infinite",
        "hero-glow-2": "hero-glow-2 14s ease-in-out infinite",
        "hero-glow-3": "hero-glow-3 18s ease-in-out infinite 3s",
        "hero-grid":   "hero-grid 8s ease-in-out infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        // Hero — blobs flottants (transform seulement — pas d'opacity pour éviter multiplication)
        "hero-glow-1": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%":       { transform: "translate(80px, -100px) scale(1.15)" },
          "66%":       { transform: "translate(-60px, 60px) scale(0.9)" },
        },
        "hero-glow-2": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%":       { transform: "translate(-130px, -80px) scale(1.18)" },
        },
        "hero-glow-3": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%":       { transform: "translate(100px, 70px) scale(1.12)" },
        },
        "hero-grid": {
          "0%, 100%": { opacity: "0.015" },
          "50%":       { opacity: "0.05" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

import { getTranslations } from "next-intl/server";

// ============================================================
// Hero — Server Component
// Section pleine hauteur avec ambient glow animé bicolore
// ============================================================

type HeroProps = { locale: string };

// ---- Icônes plateformes ----

const AppleIcon = () => (
  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const PlayStoreIcon = () => (
  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.18 23.76c.3.17.64.22.97.14l12.1-6.97-2.82-2.82-10.25 9.65zM.5 1.4C.19 1.72 0 2.22 0 2.88v18.24c0 .66.19 1.16.51 1.48l.08.07L10.44 12.7v-.23L.58 1.33.5 1.4zM20.1 10.53l-2.75-1.58-3.09 2.82 3.09 2.82 2.77-1.6c.79-.46.79-1.2-.02-1.46zM3.18.24L13.43 9.9l-2.82 2.82L.5.78C.8.06 2.25-.43 3.18.24z" />
  </svg>
);

const AppGalleryIcon = () => (
  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-5l6-3-6-3v6z" />
  </svg>
);

export async function Hero({ locale }: HeroProps) {
  const t = await getTranslations({ locale, namespace: "hero" });

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-20 text-center sm:pb-0"
    >
      {/* ---- Ambient blobs animés ---- */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Blob 1 — centre-gauche, large dérive diagonale */}
        <div
          className="animate-hero-glow-1 absolute rounded-full bg-brand-accent/[0.18] blur-[110px]"
          style={{ width: 600, height: 600, left: "30%", top: "20%" }}
        />
        {/* Blob 2 — droite haute, dérive vers le bas-gauche */}
        <div
          className="animate-hero-glow-2 absolute rounded-full bg-[#1f6feb]/[0.16] blur-[100px]"
          style={{ width: 500, height: 500, right: "10%", top: "10%" }}
        />
        {/* Blob 3 — bas-gauche, dérive vers le haut */}
        <div
          className="animate-hero-glow-3 absolute rounded-full bg-brand-accent/[0.10] blur-[130px]"
          style={{ width: 450, height: 450, left: "5%", bottom: "15%" }}
        />
      </div>

      {/* ---- Grid overlay — respire doucement ---- */}
      <div
        className="animate-hero-grid pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(88,166,255,0.7) 1px, transparent 1px),
            linear-gradient(90deg, rgba(88,166,255,0.7) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* ---- Corner accents ---- */}
      <div className="pointer-events-none absolute left-0 top-0 h-px w-1/3 bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-px w-1/3 bg-gradient-to-l from-transparent via-brand-accent/20 to-transparent" />

      {/* ---- Main content ---- */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Badge */}
        <div className="mb-8 inline-flex animate-fade-up items-center gap-2.5 rounded-full border border-brand-accent/20 bg-brand-accent/[0.06] px-5 py-2 text-sm font-medium text-brand-accent backdrop-blur-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-accent" />
          </span>
          {t("badge")}
        </div>

        {/* Headline */}
        <h1 className="mx-auto max-w-5xl animate-fade-up text-5xl font-bold leading-[1.1] tracking-[-0.04em] text-brand-white md:text-7xl md:tracking-[-0.05em] lg:text-[88px] lg:tracking-[-0.055em]">
          {t("title")}
          <br />
          <span className="gradient-text">{t("title_highlight")}</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-8 max-w-2xl animate-fade-up text-base leading-relaxed text-brand-gray md:text-lg">
          {t("subtitle")}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex animate-fade-up flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand-accent px-8 py-3.5 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:bg-brand-accent/90 hover:shadow-glow-lg"
          >
            {t("cta_primary")}
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#services"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-border bg-brand-surface/50 px-8 py-3.5 text-sm font-semibold text-brand-white backdrop-blur-sm transition-all duration-300 hover:border-brand-accent/30 hover:bg-brand-surface"
          >
            {t("cta_secondary")}
            <svg
              className="h-4 w-4 opacity-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>

        {/* ---- Boutons téléchargement application ---- */}
        <div className="mt-14 animate-fade-up">
          <p className="mb-4 text-[10px] uppercase tracking-[0.18em] text-brand-gray/40">
            {t("app_download.label")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* iOS */}
            <a
              href="#"
              className="inline-flex items-center gap-2.5 rounded-xl border border-brand-border/50 bg-brand-surface/20 px-5 py-2.5 text-sm font-medium text-brand-white backdrop-blur-sm transition-all duration-200 hover:border-brand-accent/30 hover:bg-brand-surface/40"
            >
              <AppleIcon />
              {t("app_download.ios")}
            </a>
            {/* Android */}
            <a
              href="#"
              className="inline-flex items-center gap-2.5 rounded-xl border border-brand-border/50 bg-brand-surface/20 px-5 py-2.5 text-sm font-medium text-brand-white backdrop-blur-sm transition-all duration-200 hover:border-brand-accent/30 hover:bg-brand-surface/40"
            >
              <PlayStoreIcon />
              {t("app_download.android")}
            </a>
            {/* Huawei AppGallery */}
            <a
              href="#"
              className="inline-flex items-center gap-2.5 rounded-xl border border-brand-border/50 bg-brand-surface/20 px-5 py-2.5 text-sm font-medium text-brand-white backdrop-blur-sm transition-all duration-200 hover:border-brand-accent/30 hover:bg-brand-surface/40"
            >
              <AppGalleryIcon />
              {t("app_download.huawei")}
            </a>
          </div>
        </div>
      </div>

      {/* ---- Scroll hint ---- */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <div className="flex animate-bounce flex-col items-center gap-1.5 text-brand-gray/30">
          <span className="text-[9px] uppercase tracking-[0.2em]">{t("scroll_hint")}</span>
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}

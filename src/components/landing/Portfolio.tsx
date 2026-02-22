import { getTranslations } from "next-intl/server";

// ============================================================
// Portfolio — Server Component
// Section "Nos Réalisations" — placeholders en attente des vrais projets
// ============================================================

type PortfolioProps = { locale: string };

const PROJECT_KEYS = ["web", "saas", "automation"] as const;
type ProjectKey = (typeof PROJECT_KEYS)[number];

const CARD_GRADIENTS: Record<ProjectKey, string> = {
  web: "from-brand-accent/[0.12] via-[#1f6feb]/[0.06] to-transparent",
  saas: "from-[#7c3aed]/[0.12] via-[#a855f7]/[0.06] to-transparent",
  automation: "from-emerald-500/[0.12] via-emerald-400/[0.06] to-transparent",
};

const ICON_COLORS: Record<ProjectKey, string> = {
  web: "text-brand-accent",
  saas: "text-[#a855f7]",
  automation: "text-emerald-400",
};

const BADGE_COLORS: Record<ProjectKey, string> = {
  web: "border-brand-accent/30 bg-brand-accent/10 text-brand-accent",
  saas: "border-[#a855f7]/30 bg-[#a855f7]/10 text-[#a855f7]",
  automation: "border-emerald-400/30 bg-emerald-400/10 text-emerald-400",
};

const ORB_COLORS: Record<ProjectKey, string> = {
  web: "bg-brand-accent/10",
  saas: "bg-[#a855f7]/10",
  automation: "bg-emerald-400/10",
};

function ProjectIcon({ project }: { project: ProjectKey }) {
  if (project === "web") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-10 w-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    );
  }
  if (project === "saas") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-10 w-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    );
  }
  // automation
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-10 w-10">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
    </svg>
  );
}

export async function Portfolio({ locale }: PortfolioProps) {
  const t = await getTranslations({ locale, namespace: "portfolio" });

  return (
    <section id="portfolio" className="section-padding relative overflow-hidden bg-brand-darker">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/4 translate-x-1/4 rounded-full bg-brand-accent/[0.03] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/4 translate-y-1/4 rounded-full bg-[#7c3aed]/[0.03] blur-[100px]" />

      <div className="container-max relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-brand-white md:text-5xl">
            {t("title")}{" "}
            <span className="bg-gradient-to-r from-brand-accent to-[#a5d6ff] bg-clip-text text-transparent">
              {t("title_highlight")}
            </span>
          </h2>
          <p className="mt-4 text-brand-gray">{t("subtitle")}</p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PROJECT_KEYS.map((key) => (
            <article
              key={key}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-brand-border bg-brand-surface transition-all duration-300 hover:border-brand-border/60 hover:shadow-glass"
            >
              {/* Image placeholder */}
              <div className={`relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br ${CARD_GRADIENTS[key]}`}>
                {/* Subtle grid */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                {/* Glow orb */}
                <div className={`absolute h-28 w-28 rounded-full blur-2xl ${ORB_COLORS[key]}`} />
                {/* Icon */}
                <span className={`relative ${ICON_COLORS[key]} opacity-60 transition-opacity duration-300 group-hover:opacity-90`}>
                  <ProjectIcon project={key} />
                </span>
                {/* "Image à venir" chip */}
                <div className="absolute bottom-3 right-3">
                  <span className="rounded-lg border border-brand-border/50 bg-brand-black/60 px-2.5 py-1 text-[10px] font-medium text-brand-gray/50 backdrop-blur-sm">
                    {t("coming_soon")}
                  </span>
                </div>
              </div>

              {/* Top accent line on hover */}
              <div className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent transition-transform duration-300 group-hover:scale-x-100" />

              {/* Card body */}
              <div className="flex flex-1 flex-col p-6">
                {/* Category badge */}
                <span className={`mb-3 inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${BADGE_COLORS[key]}`}>
                  {t(`projects.${key}.category`)}
                </span>

                {/* Title */}
                <h3 className="mb-2 text-base font-bold text-brand-white">
                  {t(`projects.${key}.title`)}
                </h3>

                {/* Description */}
                <p className="flex-1 text-sm leading-relaxed text-brand-gray">
                  {t(`projects.${key}.description`)}
                </p>

                {/* CTA — disabled until real link provided */}
                <div className="mt-5 border-t border-brand-border pt-4">
                  <button
                    disabled
                    className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-brand-border bg-brand-surface/50 px-4 py-2.5 text-sm font-medium text-brand-gray/40"
                    aria-label={t("cta")}
                  >
                    {t("cta")}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom note */}
        <p className="mt-8 text-center text-xs text-brand-gray/40">
          {locale === "fr"
            ? "Les liens et visuels réels seront ajoutés prochainement."
            : "Real links and visuals will be added soon."}
        </p>
      </div>
    </section>
  );
}

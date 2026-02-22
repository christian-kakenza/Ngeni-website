import { getTranslations } from "next-intl/server";

// ============================================================
// About — Server Component
// Mission + 4 valeurs NGENI
// ============================================================

type AboutProps = { locale: string };

const VALUE_ICONS = {
  innovation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  ),
  security: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  excellence: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  ),
  impact: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
  ),
} as const;

const VALUE_KEYS = ["innovation", "security", "excellence", "impact"] as const;

export async function About({ locale }: AboutProps) {
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <section id="about" className="section-padding relative overflow-hidden bg-brand-dark">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-brand-accent/[0.04] blur-[120px]" />

      <div className="container-max relative z-10">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">

          {/* Left — Text */}
          <div>
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-accent">
              {t("badge")}
            </div>

            <h2 className="text-4xl font-bold leading-tight text-brand-white md:text-5xl">
              {t("title")}
              <br />
              <span className="gradient-text">{t("title_highlight")}</span>
            </h2>

            <p className="mt-6 text-base leading-relaxed text-brand-gray md:text-lg">
              {t("subtitle")}
            </p>

            {/* Decorative line */}
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-brand-accent/40 to-transparent" />
              <span className="font-mono text-xs text-brand-accent/60">NGENI</span>
            </div>
          </div>

          {/* Right — Values grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {VALUE_KEYS.map((key) => (
              <div
                key={key}
                className="group rounded-2xl border border-brand-border bg-brand-surface/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-brand-accent/30 hover:bg-brand-surface/60 hover:shadow-glass"
              >
                {/* Icon */}
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-brand-accent/20 bg-brand-accent/10 text-brand-accent transition-colors duration-300 group-hover:bg-brand-accent/15">
                  {VALUE_ICONS[key]}
                </div>

                <h3 className="mb-1.5 font-semibold text-brand-white">
                  {t(`values.${key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-brand-gray">
                  {t(`values.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

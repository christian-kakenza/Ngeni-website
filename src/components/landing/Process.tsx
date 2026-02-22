import { getTranslations } from "next-intl/server";

// ============================================================
// Process — Server Component
// 4 étapes de la méthodologie NGENI
// ============================================================

type ProcessProps = { locale: string };

const STEP_KEYS = ["discovery", "design", "development", "launch"] as const;

const STEP_ICONS = {
  discovery: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  ),
  development: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  launch: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  ),
} as const;

export async function Process({ locale }: ProcessProps) {
  const t = await getTranslations({ locale, namespace: "process" });

  return (
    <section id="process" className="section-padding relative overflow-hidden bg-brand-black">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent/[0.03] blur-[140px]" />

      <div className="container-max relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-brand-white md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-brand-gray">{t("subtitle")}</p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Connector line — desktop only */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-brand-border to-transparent md:block" />

          {STEP_KEYS.map((key, index) => (
            <div key={key} className="group relative flex flex-col items-center text-center">
              {/* Step circle */}
              <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-accent/30 bg-brand-surface shadow-glass transition-all duration-300 group-hover:border-brand-accent/60 group-hover:shadow-glow">
                {/* Glow */}
                <div className="absolute inset-0 rounded-2xl bg-brand-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative text-brand-accent">
                  {STEP_ICONS[key]}
                </span>
              </div>

              {/* Title */}
              <h3 className="mb-3 text-base font-bold text-brand-white">
                {t(`steps.${key}.title`)}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-brand-gray">
                {t(`steps.${key}.description`)}
              </p>

              {/* Mobile connector */}
              {index < STEP_KEYS.length - 1 && (
                <div className="mt-6 h-8 w-px bg-gradient-to-b from-brand-border to-transparent md:hidden" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

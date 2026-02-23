import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

// ============================================================
// Footer — Server Component
// ============================================================

type FooterProps = {
  locale: string;
};

// Services NGENI (5 premiers dans le footer)
const SERVICE_LINKS = [
  { key: "rpa" as const, href: "#services" },
  { key: "agents" as const, href: "#services" },
  { key: "saas" as const, href: "#services" },
  { key: "web" as const, href: "#services" },
  { key: "medical" as const, href: "#services" },
];

export async function Footer({ locale }: FooterProps) {
  const [t, tServices] = await Promise.all([
    getTranslations({ locale, namespace: "footer" }),
    getTranslations({ locale, namespace: "services" }),
  ]);

  const currentYear = new Date().getFullYear();
  const fr = locale === "fr";

  return (
    <footer className="border-t border-brand-border bg-brand-darker">
      {/* ---- Corps principal -------------------------------- */}
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Col 1 — Branding */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="NGENI"
                width={160}
                height={41}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-gray">
              {t("tagline")}
            </p>

            {/* Indicateur de statut */}
            <div className="mt-6 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs text-brand-gray">
                {fr ? "Tous les systèmes opérationnels" : "All systems operational"}
              </span>
            </div>
          </div>

          {/* Col 2 — Services (5 premiers) */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-brand-white">
              {t("sections.services")}
            </h3>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    className="text-sm text-brand-gray transition-colors hover:text-brand-white"
                  >
                    {tServices(`items.${key}.title`)}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#services"
                  className="text-sm font-medium text-brand-accent hover:text-brand-accent/80"
                >
                  {fr ? "Voir tous les services →" : "See all services →"}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 — Entreprise + Légal */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-brand-white">
              {t("sections.company")}
            </h3>
            <ul className="mb-8 space-y-2.5">
              <li>
                <a href="#about" className="text-sm text-brand-gray transition-colors hover:text-brand-white">
                  {t("links.about")}
                </a>
              </li>
              <li>
                <a href="#team" className="text-sm text-brand-gray transition-colors hover:text-brand-white">
                  {t("links.team")}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm text-brand-gray transition-colors hover:text-brand-white">
                  {t("links.contact")}
                </a>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-brand-gray transition-colors hover:text-brand-white">
                  {t("links.dashboard")}
                </Link>
              </li>
            </ul>

            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-brand-white">
              {t("sections.legal")}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/privacy" className="text-sm text-brand-gray transition-colors hover:text-brand-white">
                  {t("links.privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-brand-gray transition-colors hover:text-brand-white">
                  {t("links.terms")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-brand-white">
              {t("sections.contact")}
            </h3>
            <ul className="space-y-4">
              {/* Email */}
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-brand-border bg-brand-surface text-brand-accent">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <a
                  href="mailto:contact@ngeni.ai"
                  className="text-sm text-brand-gray transition-colors hover:text-brand-white"
                >
                  contact@ngeni.ai
                </a>
              </li>

              {/* Bureau DRC — Kinshasa */}
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-brand-border bg-brand-surface text-brand-accent">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-gray/50">
                    {fr ? "Bureau DRC" : "DRC Office"}
                  </p>
                  <span className="text-sm text-brand-gray">Kinshasa, RDC</span>
                </div>
              </li>

              {/* Bureau DRC — Lubumbashi */}
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-brand-border bg-brand-surface text-brand-accent">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-gray/50">
                    {fr ? "Bureau DRC" : "DRC Office"}
                  </p>
                  <span className="text-sm text-brand-gray">Lubumbashi, RDC</span>
                </div>
              </li>

              {/* Bureau SA */}
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-brand-border bg-brand-surface text-brand-accent">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-gray/50">
                    {fr ? "Bureau SA" : "SA Office"}
                  </p>
                  <span className="text-sm text-brand-gray">Pretoria, SA</span>
                </div>
              </li>

              {/* Horaires */}
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-brand-border bg-brand-surface text-brand-accent">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span className="text-sm text-brand-gray">
                  {fr ? "Lun — Ven, 08:00 — 18:00" : "Mon — Fri, 08:00 — 18:00"}
                </span>
              </li>
            </ul>

            {/* CTA Footer */}
            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-accent px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition-all hover:bg-brand-accent/90 hover:shadow-glow-lg"
            >
              {fr ? "Démarrer un projet" : "Start a project"}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ---- Barre de copyright ----------------------------- */}
      <div className="border-t border-brand-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-brand-gray md:flex-row md:px-8">
          <span>
            {t("copyright", { year: String(currentYear) })}
          </span>
          <span className="flex items-center gap-1">
            {t("made_in")}
          </span>
        </div>
      </div>
    </footer>
  );
}

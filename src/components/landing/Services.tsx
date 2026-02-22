import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import type { ReactNode } from "react";

// ============================================================
// Services — Server Component
// Bento Grid haut de gamme — 10 services NGENI
// ============================================================

type ServicesProps = { locale: string };

// ---- Icônes SVG dédiées par service -------------------------

const IconRPA = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconAgents = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
  </svg>
);

const IconSaaS = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
  </svg>
);

const IconWeb = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);

const IconMedical = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

const IconAgriculture = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);

const IconEducation = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>
);

const IconEnergy = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

const IconConstruction = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
  </svg>
);

const IconConsulting = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
  </svg>
);

// ---- Bento Card Component -----------------------------------

type BentoCardData = {
  icon: ReactNode;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string;
  tag: string;
  colSpan: string;
  featured?: boolean;
  features?: string[];
};

function BentoCard({
  icon,
  slug,
  title,
  subtitle,
  description,
  tech,
  tag,
  featured,
  features,
}: Omit<BentoCardData, "colSpan">) {
  return (
    <Link
      href={`/services/${slug}` as "/"}
      className={[
        "group relative block h-full overflow-hidden rounded-2xl border border-brand-border",
        "bg-brand-surface/30 backdrop-blur-sm transition-all duration-300",
        "hover:border-brand-accent/30 hover:shadow-glass",
        featured
          ? "bg-gradient-to-br from-brand-surface/50 to-brand-surface/20"
          : "hover:bg-brand-surface/50",
      ].join(" ")}
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-accent/[0.03] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Featured accent bar */}
      {featured && (
        <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gradient-to-b from-brand-accent to-[#1f6feb]" />
      )}

      <div className={featured ? "p-7 md:p-8" : "p-5 md:p-6"}>
        {/* Top row — icon */}
        <div className="flex items-start justify-between">
          <div
            className={[
              "flex items-center justify-center rounded-xl border border-brand-accent/20",
              "bg-brand-accent/10 text-brand-accent transition-all duration-300",
              "group-hover:border-brand-accent/40 group-hover:bg-brand-accent/15",
              featured ? "h-14 w-14" : "h-10 w-10",
            ].join(" ")}
          >
            {icon}
          </div>
          {/* Arrow indicator */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="h-4 w-4 text-brand-gray/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-accent/40"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </div>

        {/* Content */}
        <div className="mt-4">
          <h3
            className={[
              "font-bold leading-tight text-brand-white",
              featured ? "text-xl md:text-2xl" : "text-base",
            ].join(" ")}
          >
            {title}
          </h3>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-brand-accent/60">
            {subtitle}
          </p>
          <p
            className={[
              "mt-2.5 leading-relaxed text-brand-gray",
              featured ? "text-base" : "text-sm",
            ].join(" ")}
          >
            {description}
          </p>

          {/* Features list — featured card only */}
          {featured && features && features.length > 0 && (
            <ul className="mt-5 space-y-2.5">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-brand-gray">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent/60" />
                  {f}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer — tech + tag */}
        <div className="mt-5 flex items-center justify-between border-t border-brand-border/40 pt-4">
          <span className="font-mono text-[10px] text-brand-gray/35">{tech}</span>
          <span className="rounded-full border border-brand-accent/20 bg-brand-accent/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-accent">
            {tag}
          </span>
        </div>
      </div>
    </Link>
  );
}

// ---- Main Services Component --------------------------------

export async function Services({ locale }: ServicesProps) {
  const t = await getTranslations({ locale, namespace: "services" });

  // Build services data
  const services: BentoCardData[] = [
    {
      slug: "rpa",
      icon: <IconRPA />,
      title: t("items.rpa.title"),
      subtitle: t("items.rpa.subtitle"),
      description: t("items.rpa.description"),
      tech: t("items.rpa.tech"),
      tag: t("items.rpa.tag"),
      colSpan: "md:col-span-4",
      featured: true,
      features: [
        t("items.rpa.features.0"),
        t("items.rpa.features.1"),
        t("items.rpa.features.2"),
        t("items.rpa.features.3"),
      ],
    },
    {
      slug: "agents",
      icon: <IconAgents />,
      title: t("items.agents.title"),
      subtitle: t("items.agents.subtitle"),
      description: t("items.agents.description"),
      tech: t("items.agents.tech"),
      tag: t("items.agents.tag"),
      colSpan: "md:col-span-2",
    },
    {
      slug: "saas",
      icon: <IconSaaS />,
      title: t("items.saas.title"),
      subtitle: t("items.saas.subtitle"),
      description: t("items.saas.description"),
      tech: t("items.saas.tech"),
      tag: t("items.saas.tag"),
      colSpan: "md:col-span-2",
    },
    {
      slug: "web",
      icon: <IconWeb />,
      title: t("items.web.title"),
      subtitle: t("items.web.subtitle"),
      description: t("items.web.description"),
      tech: t("items.web.tech"),
      tag: t("items.web.tag"),
      colSpan: "md:col-span-2",
    },
    {
      slug: "medical",
      icon: <IconMedical />,
      title: t("items.medical.title"),
      subtitle: t("items.medical.subtitle"),
      description: t("items.medical.description"),
      tech: t("items.medical.tech"),
      tag: t("items.medical.tag"),
      colSpan: "md:col-span-2",
    },
    {
      slug: "agriculture",
      icon: <IconAgriculture />,
      title: t("items.agriculture.title"),
      subtitle: t("items.agriculture.subtitle"),
      description: t("items.agriculture.description"),
      tech: t("items.agriculture.tech"),
      tag: t("items.agriculture.tag"),
      colSpan: "md:col-span-3",
    },
    {
      slug: "education",
      icon: <IconEducation />,
      title: t("items.education.title"),
      subtitle: t("items.education.subtitle"),
      description: t("items.education.description"),
      tech: t("items.education.tech"),
      tag: t("items.education.tag"),
      colSpan: "md:col-span-3",
    },
    {
      slug: "energy",
      icon: <IconEnergy />,
      title: t("items.energy.title"),
      subtitle: t("items.energy.subtitle"),
      description: t("items.energy.description"),
      tech: t("items.energy.tech"),
      tag: t("items.energy.tag"),
      colSpan: "md:col-span-2",
    },
    {
      slug: "construction",
      icon: <IconConstruction />,
      title: t("items.construction.title"),
      subtitle: t("items.construction.subtitle"),
      description: t("items.construction.description"),
      tech: t("items.construction.tech"),
      tag: t("items.construction.tag"),
      colSpan: "md:col-span-2",
    },
    {
      slug: "consulting",
      icon: <IconConsulting />,
      title: t("items.consulting.title"),
      subtitle: t("items.consulting.subtitle"),
      description: t("items.consulting.description"),
      tech: t("items.consulting.tech"),
      tag: t("items.consulting.tag"),
      colSpan: "md:col-span-2",
    },
  ];

  return (
    <section id="services" className="section-padding relative overflow-hidden bg-brand-black">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent/[0.04] blur-[160px]" />

      <div className="container-max relative z-10">
        {/* Header */}
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-brand-white md:text-5xl">
            {t("title")}{" "}
            <span className="gradient-text">{t("title_highlight")}</span>
          </h2>
          <p className="mt-4 text-brand-gray">{t("subtitle")}</p>
        </div>

        {/* ---- Bento Grid ---- */}
        {/*
          Layout desktop (md:grid-cols-6) :
          Row 1 : RPA (col-span-4) + Agents (col-span-2)
          Row 2 : SaaS (col-span-2) + Web (col-span-2) + Medical (col-span-2)
          Row 3 : Agriculture (col-span-3) + Education (col-span-3)
          Row 4 : Energy (col-span-2) + Construction (col-span-2) + Consulting (col-span-2)
        */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
          {services.map(({ colSpan, ...rest }) => (
            <div key={rest.slug} className={colSpan}>
              <BentoCard {...rest} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

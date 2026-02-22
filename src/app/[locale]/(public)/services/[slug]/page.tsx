import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { SERVICES, SERVICE_SLUGS, getServiceBySlug } from "@/lib/services-data";

// ============================================================
// Service Detail Page — Server Component
// Route: /[locale]/services/[slug]
// ============================================================

type ServicePageProps = {
  params: { locale: string; slug: string };
};

// ---- Static generation: all locale × slug combinations ----

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const slug of SERVICE_SLUGS) {
      params.push({ locale, slug });
    }
  }
  return params;
}

// ---- SEO Metadata ------------------------------------------

export async function generateMetadata({
  params: { locale, slug },
}: ServicePageProps): Promise<Metadata> {
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const content = locale === "fr" ? service.fr : service.en;

  return {
    title: content.title,
    description: content.hero_description,
  };
}

// ---- UI strings (bilingual, no i18n overhead) -------------

const ui = {
  fr: {
    back: "Retour aux services",
    overview: "Vue d'ensemble",
    africa: "Impact en Afrique",
    features: "Fonctionnalités clés",
    techStack: "Stack technologique",
    contactUs: "Nous contacter",
    exploreServices: "Tous les services",
  },
  en: {
    back: "Back to services",
    overview: "Overview",
    africa: "Impact in Africa",
    features: "Key features",
    techStack: "Technology stack",
    contactUs: "Contact us",
    exploreServices: "All services",
  },
};

// ---- Page Component ----------------------------------------

export default function ServicePage({ params: { locale, slug } }: ServicePageProps) {
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const content = locale === "fr" ? service.fr : service.en;
  const t = locale === "fr" ? ui.fr : ui.en;

  return (
    <div className="min-h-screen bg-brand-black">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-darker pb-20 pt-12">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute left-1/4 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-brand-accent/[0.07] blur-[140px]" />

        <div className="container-max relative z-10 px-4 md:px-8 lg:px-16 xl:px-24">
          {/* Back link */}
          <Link
            href="/#services"
            className="mb-10 inline-flex items-center gap-2 text-sm text-brand-gray transition-colors hover:text-brand-accent"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t.back}
          </Link>

          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-accent/30 bg-brand-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
            {content.badge}
          </span>

          {/* Title */}
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-brand-white md:text-5xl lg:text-6xl">
            {content.title}
          </h1>

          {/* Subtitle */}
          <p className="mt-2 text-sm font-bold uppercase tracking-widest text-brand-accent/70">
            {content.subtitle}
          </p>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-gray">
            {content.hero_description}
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-accent/90"
            >
              {t.contactUs}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 rounded-xl border border-brand-border bg-brand-surface/50 px-6 py-3 text-sm font-semibold text-brand-gray transition-all hover:border-brand-accent/30 hover:text-brand-white"
            >
              {t.exploreServices}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────── */}
      <section className="border-y border-brand-border bg-brand-surface/20">
        <div className="container-max grid grid-cols-2 divide-x divide-brand-border px-4 md:grid-cols-4 md:px-8 lg:px-16 xl:px-24">
          {content.stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center py-8 text-center">
              <span className="text-3xl font-black text-brand-accent md:text-4xl">{stat.value}</span>
              <span className="mt-1.5 text-xs text-brand-gray">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Overview + Africa ────────────────────────────────── */}
      <section className="section-padding bg-brand-black">
        <div className="container-max">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Overview */}
            <div>
              <h2 className="text-2xl font-bold text-brand-white md:text-3xl">
                {content.overview_title}
              </h2>
              <div className="mt-4 space-y-4">
                {content.overview.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="leading-relaxed text-brand-gray">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Africa context */}
            <div className="rounded-2xl border border-brand-border bg-brand-surface/30 p-6 backdrop-blur-sm md:p-8">
              <div className="mb-4 flex items-center gap-3">
                {/* Africa icon */}
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-accent/20 bg-brand-accent/10 text-brand-accent">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </div>
                <h3 className="font-bold text-brand-white">{content.africa_title}</h3>
              </div>
              <div className="space-y-4">
                {content.africa.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-sm leading-relaxed text-brand-gray">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features grid ────────────────────────────────────── */}
      <section className="section-padding bg-brand-darker">
        <div className="container-max">
          <h2 className="mb-10 text-2xl font-bold text-brand-white md:text-3xl">
            {t.features}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.features.map((feature, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-brand-border bg-brand-surface/30 p-5 backdrop-blur-sm transition-all duration-300 hover:border-brand-accent/30 hover:bg-brand-surface/50"
              >
                {/* Feature number */}
                <span className="mb-3 inline-block font-mono text-xs font-bold text-brand-accent/40">
                  0{i + 1}
                </span>
                <h3 className="font-semibold text-brand-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-gray">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech stack ───────────────────────────────────────── */}
      <section className="section-padding bg-brand-black">
        <div className="container-max">
          <h2 className="mb-8 text-2xl font-bold text-brand-white md:text-3xl">
            {t.techStack}
          </h2>
          <div className="flex flex-wrap gap-3">
            {content.tech_stack.map((tech) => (
              <span
                key={tech}
                className="rounded-xl border border-brand-border bg-brand-surface/50 px-4 py-2 font-mono text-sm text-brand-gray transition-all hover:border-brand-accent/30 hover:text-brand-accent"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="section-padding bg-brand-darker">
        <div className="container-max">
          <div className="relative overflow-hidden rounded-2xl border border-brand-accent/20 bg-gradient-to-br from-brand-surface/60 to-brand-surface/20 p-8 text-center backdrop-blur-sm md:p-14">
            {/* Glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent/[0.08] blur-[80px]" />
            {/* Accent bar */}
            <div className="absolute left-0 top-0 h-1 w-full rounded-t-2xl bg-gradient-to-r from-brand-accent to-[#1f6feb]" />

            <h2 className="relative text-2xl font-bold text-brand-white md:text-3xl">
              {content.cta_title}
            </h2>
            <p className="relative mt-3 text-brand-gray md:text-lg">
              {content.cta_description}
            </p>
            <Link
              href="/#contact"
              className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-accent px-8 py-3.5 text-sm font-semibold text-white shadow-glow transition-all hover:bg-brand-accent/90"
            >
              {t.contactUs}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

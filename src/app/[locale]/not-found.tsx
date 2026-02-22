import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { LayoutDashboard, Home } from "lucide-react";

// ============================================================
// 404 — Luxury Tech Dark Design
// Bicolor glow on "404", grid background, two CTAs
// ============================================================

export default async function NotFound() {
  const locale = await getLocale();
  const t      = await getTranslations({ locale, namespace: "errors.404" });

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-brand-black px-4 text-center">

      {/* ── Background grid ──────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(88,166,255,1) 1px, transparent 1px), linear-gradient(to right, rgba(88,166,255,1) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* ── Radial ambient glow ──────────────────────────────────────────── */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-accent/10 via-violet-600/5 to-transparent blur-3xl" />

      {/* ── 404 number ───────────────────────────────────────────────────── */}
      <div className="relative select-none">
        {/* Blurred ghost layer for depth glow */}
        <p
          className="absolute inset-0 bg-gradient-to-r from-brand-accent to-violet-500 bg-clip-text text-[10rem] font-black leading-none tracking-tighter text-transparent opacity-30 blur-3xl sm:text-[13rem]"
          aria-hidden="true"
        >
          404
        </p>
        {/* Crisp gradient text */}
        <p className="bg-gradient-to-r from-brand-accent via-violet-400 to-brand-accent bg-clip-text text-[10rem] font-black leading-none tracking-tighter text-transparent sm:text-[13rem]">
          404
        </p>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 -mt-4 flex max-w-md flex-col items-center gap-3">
        <div className="h-px w-20 bg-gradient-to-r from-transparent via-brand-accent/60 to-transparent" />
        <h1 className="text-2xl font-black text-brand-white sm:text-3xl">
          {t("title")}
        </h1>
        <p className="text-sm leading-relaxed text-brand-gray/60">
          {t("description")}
        </p>
      </div>

      {/* ── CTAs ─────────────────────────────────────────────────────────── */}
      <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-3">
        {/* Primary — Dashboard */}
        <Link
          href="/dashboard"
          className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-accent to-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-accent/20 transition-all hover:scale-[1.03] hover:shadow-brand-accent/30"
        >
          <LayoutDashboard className="h-4 w-4 transition-transform group-hover:-translate-y-px" />
          Dashboard
        </Link>

        {/* Secondary — Home */}
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl border border-brand-border/60 bg-brand-surface/40 px-5 py-2.5 text-sm font-semibold text-brand-gray/80 backdrop-blur transition-all hover:border-brand-accent/40 hover:text-brand-white"
        >
          <Home className="h-4 w-4" />
          {t("cta")}
        </Link>
      </div>

      {/* ── Footer label ─────────────────────────────────────────────────── */}
      <p className="absolute bottom-8 font-mono text-[10px] uppercase tracking-widest text-brand-gray/20">
        NGENI · ERROR 404
      </p>
    </main>
  );
}

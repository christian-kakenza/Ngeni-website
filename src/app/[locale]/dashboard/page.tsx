"use client";

import { useTranslations, useLocale } from "next-intl";
import { api } from "@/trpc/react";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { useRouter } from "@/i18n/routing";

// ============================================================
// Dashboard Overview — Client Component
// 4 stat cards live (tRPC) + projets récents + empty state
// ============================================================

// ── Skeleton loader ──────────────────────────────────────────
function SkeletonStat() {
  return (
    <div className="animate-pulse rounded-2xl border border-brand-border bg-brand-surface/20 p-5">
      <div className="flex items-center justify-between">
        <div className="h-2.5 w-24 rounded-full bg-brand-border" />
        <div className="h-9 w-9 rounded-xl bg-brand-border" />
      </div>
      <div className="mt-3 h-8 w-14 rounded-lg bg-brand-border" />
      <div className="mt-2 h-2 w-32 rounded-full bg-brand-border/60" />
    </div>
  );
}

// ── Stat card ────────────────────────────────────────────────
type StatCardProps = {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  gradient: string;
  trend?: string;
  trendUp?: boolean;
};

function StatCard({ label, value, icon, gradient, trend, trendUp }: StatCardProps) {
  return (
    <div className="group rounded-2xl border border-brand-border bg-brand-surface/30 p-5 backdrop-blur-sm transition-all duration-300 hover:border-brand-accent/20 hover:bg-brand-surface/50">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-gray/50">
          {label}
        </p>
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-glow`}>
          {icon}
        </div>
      </div>
      <p className="mt-3 text-3xl font-black tracking-tight text-brand-white">
        {value}
      </p>
      {trend && (
        <p className={`mt-1.5 flex items-center gap-1 text-xs font-medium ${trendUp ? "text-emerald-400" : "text-brand-gray/40"}`}>
          {trendUp ? (
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
            </svg>
          ) : (
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16.172l4.586-4.586a2 2 0 012.828 0M3 7h1m4 0h1m4 0h1m4 0h1M4 12h16M4 17h16" />
            </svg>
          )}
          {trend}
        </p>
      )}
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────
export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const router = useRouter();

  const { data: projects, isLoading } = api.projects.getAll.useQuery();

  // ── Derived stats ────────────────────────────────────────
  const inProgress  = projects?.filter((p) => p.status === "IN_PROGRESS").length  ?? 0;
  const completed   = projects?.filter((p) => p.status === "COMPLETED").length    ?? 0;
  const inReview    = projects?.filter((p) => p.status === "REVIEW").length        ?? 0;

  const urgentTasks = projects?.reduce(
    (acc, p) => acc + p.tasks.filter((t) => t.priority === "URGENT" && t.status !== "DONE").length,
    0
  ) ?? 0;

  const activeBudget = projects
    ?.filter((p) => p.status === "IN_PROGRESS")
    .reduce((acc, p) => acc + (p.budget ?? 0), 0) ?? 0;

  const nearestDl = projects
    ?.filter((p) => p.endDate && p.status === "IN_PROGRESS")
    .map((p) => Math.ceil((new Date(p.endDate!).getTime() - Date.now()) / 86_400_000))
    .filter((d) => d > 0)
    .sort((a, b) => a - b)[0] ?? null;

  const recentProjects = projects?.slice(0, 3) ?? [];

  // ── Stat cards config ────────────────────────────────────
  const stats: StatCardProps[] = [
    {
      label: t("stats.active_projects"),
      value: inProgress,
      gradient: "from-brand-accent to-[#1f6feb]",
      trend: completed > 0
        ? `${completed} ${locale === "fr" ? "terminé(s)" : "completed"}`
        : locale === "fr" ? "Aucun terminé" : "None completed",
      trendUp: completed > 0,
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
        </svg>
      ),
    },
    {
      label: locale === "fr" ? "Tâches urgentes" : "Urgent tasks",
      value: urgentTasks,
      gradient: urgentTasks > 0 ? "from-red-500 to-orange-500" : "from-emerald-500 to-brand-accent",
      trend: urgentTasks > 0
        ? locale === "fr" ? "Attention requise !" : "Attention required!"
        : locale === "fr" ? "Tout est sous contrôle" : "All clear",
      trendUp: urgentTasks === 0,
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      ),
    },
    {
      label: locale === "fr" ? "Factures en attente" : "Pending invoices",
      value: 0,
      gradient: "from-violet-500 to-brand-accent",
      trend: locale === "fr" ? "Module facturation — bientôt" : "Invoicing module — coming soon",
      trendUp: false,
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
    },
    {
      label: locale === "fr" ? "Prochaine deadline" : "Next deadline",
      value: nearestDl !== null ? `${nearestDl}j` : "—",
      gradient:
        nearestDl !== null && nearestDl <= 7
          ? "from-amber-500 to-orange-500"
          : "from-teal-500 to-brand-accent",
      trend:
        inReview > 0
          ? `${inReview} ${locale === "fr" ? "projet(s) en révision" : "project(s) in review"}`
          : locale === "fr" ? "Aucune révision en cours" : "No review in progress",
      trendUp: inReview === 0,
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-brand-white md:text-3xl">
          {t("overview")}
        </h1>
        <p className="mt-1 text-sm text-brand-gray/60">
          {locale === "fr"
            ? "Vue en temps réel de votre espace client"
            : "Real-time view of your client portal"}
        </p>
      </div>

      {/* Stat cards grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonStat key={i} />)
          : stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Active budget banner */}
      {!isLoading && activeBudget > 0 && (
        <div className="flex items-center justify-between rounded-2xl border border-brand-accent/20 bg-gradient-to-r from-brand-accent/5 to-transparent px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-accent to-[#1f6feb] text-white shadow-glow">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-brand-white">
                {locale === "fr" ? "Budget actif engagé" : "Active budget committed"}
              </p>
              <p className="text-xs text-brand-gray/50">
                {locale === "fr"
                  ? `Réparti sur ${inProgress} projet(s) en cours`
                  : `Spread across ${inProgress} active project(s)`}
              </p>
            </div>
          </div>
          <p className="text-2xl font-black tracking-tight text-brand-accent">
            ${activeBudget.toLocaleString()}
          </p>
        </div>
      )}

      {/* Recent projects section */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-brand-white">
            {locale === "fr" ? "Projets récents" : "Recent projects"}
          </h2>
          {(projects?.length ?? 0) > 3 && (
            <button
              onClick={() => router.push("/dashboard/projects")}
              className="flex items-center gap-1.5 text-xs font-semibold text-brand-accent transition-colors hover:text-brand-accent/80"
            >
              {locale === "fr" ? "Voir tout" : "View all"}
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse h-44 rounded-2xl border border-brand-border bg-brand-surface/20" />
            ))}
          </div>
        ) : recentProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentProjects.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onClick={(id) => router.push(`/dashboard/projects/${id}` as never)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-brand-border bg-brand-surface/20 p-10 text-center backdrop-blur-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-border bg-brand-surface/50">
              <svg className="h-7 w-7 text-brand-gray/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-brand-white">{t("projects.empty")}</h3>
            <p className="mt-1.5 text-sm text-brand-gray/60">{t("projects.empty_sub")}</p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/10 px-4 py-1.5 text-xs font-semibold text-brand-accent">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-accent" />
              {locale === "fr" ? "Votre équipe prépare votre projet" : "Your team is preparing your project"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

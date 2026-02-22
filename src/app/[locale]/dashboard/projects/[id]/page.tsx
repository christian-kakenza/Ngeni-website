"use client";

import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { api } from "@/trpc/react";
import { TaskBoard } from "@/components/dashboard/TaskBoard";
import { InvoiceList } from "@/components/dashboard/InvoiceList";
import { cn } from "@/lib/utils";
import {
  ArrowLeft, CalendarDays, DollarSign,
  User, Clock, Loader2, AlertTriangle,
} from "lucide-react";

// ============================================================
// Project Detail Page — Client Component
// Infos projet + TaskBoard (Kanban) + InvoiceList
// ============================================================

type PageProps = {
  params: { locale: string; id: string };
};

// ── Status config ─────────────────────────────────────────────
const STATUS_CFG = {
  IN_PROGRESS: { fr: "En cours",      en: "In Progress", badge: "border-brand-accent/30 bg-brand-accent/10 text-brand-accent",  dot: "bg-brand-accent" },
  REVIEW:      { fr: "En révision",   en: "In Review",   badge: "border-amber-400/30 bg-amber-400/10 text-amber-400",            dot: "bg-amber-400" },
  COMPLETED:   { fr: "Terminé",       en: "Completed",   badge: "border-emerald-400/30 bg-emerald-400/10 text-emerald-400",      dot: "bg-emerald-400" },
  PAUSED:      { fr: "En pause",      en: "Paused",      badge: "border-brand-border bg-brand-surface text-brand-gray/60",       dot: "bg-brand-gray/40" },
} as const;

function formatDate(d: Date | string | null, locale: string) {
  if (!d) return "—";
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-CD" : "en-ZA", {
    day: "2-digit", month: "long", year: "numeric",
  }).format(new Date(d));
}

// ── Skeleton ──────────────────────────────────────────────────
function ProjectSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-8 w-64 rounded-xl bg-brand-border" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 rounded-2xl bg-brand-surface/30 border border-brand-border" />
        ))}
      </div>
      <div className="h-64 rounded-2xl bg-brand-surface/20 border border-brand-border" />
    </div>
  );
}

// ── Info tile ─────────────────────────────────────────────────
function InfoTile({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-brand-border bg-brand-surface/30 px-4 py-3 backdrop-blur-sm">
      <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-brand-gray/50">
        {icon}
        {label}
      </div>
      <p className="text-sm font-bold text-brand-white">{value}</p>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────
export default function ProjectDetailPage({ params }: PageProps) {
  const locale = useLocale();
  const fr     = locale === "fr";
  const router = useRouter();

  const { data: project, isLoading, error } = api.projects.getById.useQuery({
    id: params.id,
  });

  // ── Loading ─────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-brand-gray/50 hover:text-brand-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {fr ? "Retour aux projets" : "Back to projects"}
        </button>
        <ProjectSkeleton />
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────────
  if (error || !project) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-red-500/20 bg-red-500/5 py-16 text-center backdrop-blur-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
          <AlertTriangle className="h-8 w-8 text-red-400" />
        </div>
        <div>
          <h2 className="text-base font-bold text-brand-white">
            {fr ? "Projet introuvable" : "Project not found"}
          </h2>
          <p className="mt-1 text-sm text-brand-gray/50">
            {fr
              ? "Ce projet n'existe pas ou vous n'y avez pas accès."
              : "This project doesn't exist or you don't have access."}
          </p>
        </div>
        <button
          onClick={() => router.push("/dashboard/projects")}
          className="flex items-center gap-2 rounded-xl border border-brand-border bg-brand-surface px-4 py-2 text-sm font-semibold text-brand-white hover:border-brand-accent/30 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          {fr ? "Retour aux projets" : "Back to projects"}
        </button>
      </div>
    );
  }

  const statusCfg = STATUS_CFG[project.status as keyof typeof STATUS_CFG];
  const doneTasks = project.tasks.filter((t) => t.status === "DONE").length;
  const totalTasks = project.tasks.length;
  const pct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-7">
      {/* Back button */}
      <button
        onClick={() => router.push("/dashboard/projects")}
        className="flex items-center gap-2 text-sm text-brand-gray/50 transition-colors hover:text-brand-white"
      >
        <ArrowLeft className="h-4 w-4" />
        {fr ? "Retour aux projets" : "Back to projects"}
      </button>

      {/* Project header */}
      <div className="relative overflow-hidden rounded-2xl border border-brand-border bg-brand-surface/30 p-6 backdrop-blur-sm">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-accent/[0.06] blur-[60px]" />

        {/* Top accent */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {/* Left */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-brand-white md:text-2xl">
                {project.title}
              </h1>
              <span
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold",
                  statusCfg.badge
                )}
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", statusCfg.dot)} />
                {fr ? statusCfg.fr : statusCfg.en}
              </span>
            </div>

            {project.description && (
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-gray/70">
                {project.description}
              </p>
            )}

            {/* Client (admin only) */}
            {project.client && (
              <div className="mt-3 flex items-center gap-2 text-sm text-brand-gray/50">
                <User className="h-4 w-4" />
                <span>{project.client.name ?? project.client.email}</span>
              </div>
            )}
          </div>

          {/* Progress ring (right) */}
          <div className="flex shrink-0 flex-col items-center gap-1">
            <div className="relative flex h-16 w-16 items-center justify-center">
              <svg className="-rotate-90" viewBox="0 0 36 36" width="64" height="64">
                <circle
                  cx="18" cy="18" r="15.9"
                  fill="none" stroke="currentColor"
                  strokeWidth="3"
                  className="text-brand-border"
                />
                <circle
                  cx="18" cy="18" r="15.9"
                  fill="none" stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${pct} ${100 - pct}`}
                  strokeLinecap="round"
                  className={pct === 100 ? "text-emerald-400" : "text-brand-accent"}
                  style={{ transition: "stroke-dasharray 0.7s ease" }}
                />
              </svg>
              <span className="absolute text-xs font-black text-brand-white">
                {pct}%
              </span>
            </div>
            <p className="text-[10px] text-brand-gray/50">
              {doneTasks}/{totalTasks} {fr ? "tâches" : "tasks"}
            </p>
          </div>
        </div>

        {/* Info tiles */}
        <div className="relative mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <InfoTile
            label={fr ? "Début" : "Start"}
            value={formatDate(project.startDate, locale)}
            icon={<CalendarDays className="h-3.5 w-3.5" />}
          />
          <InfoTile
            label={fr ? "Échéance" : "Due date"}
            value={formatDate(project.endDate, locale)}
            icon={<Clock className="h-3.5 w-3.5" />}
          />
          <InfoTile
            label="Budget"
            value={project.budget != null ? `$${project.budget.toLocaleString()}` : "—"}
            icon={<DollarSign className="h-3.5 w-3.5" />}
          />
          <InfoTile
            label={fr ? "Créé le" : "Created"}
            value={formatDate(project.createdAt, locale)}
            icon={<CalendarDays className="h-3.5 w-3.5" />}
          />
        </div>
      </div>

      {/* Task board section */}
      <div>
        <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-brand-white">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
          {fr ? "Tableau des tâches" : "Task board"}
        </h2>
        <TaskBoard projectId={project.id} tasks={project.tasks} />
      </div>

      {/* Invoices section */}
      <div>
        <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-brand-white">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
          {fr ? "Facturation" : "Billing"}
        </h2>
        <InvoiceList project={project} />
      </div>
    </div>
  );
}

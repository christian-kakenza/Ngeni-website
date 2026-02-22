"use client";

import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";

// ============================================================
// ProjectCard — Client Component
// Carte projet : statut, priorité, progression, budget, dates
// ============================================================

type TaskMini = {
  id: string;
  status: string;
  priority: string;
};

export type ProjectCardData = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  startDate: Date | string | null;
  endDate: Date | string | null;
  budget: number | null;
  createdAt: Date | string;
  tasks: TaskMini[];
  client?: { id: string; name: string | null; email: string } | null;
};

// ── Status config ────────────────────────────────────────────
const STATUS_CONFIG = {
  IN_PROGRESS: {
    dot: "bg-brand-accent",
    badge: "border-brand-accent/30 bg-brand-accent/10 text-brand-accent",
    bar: "bg-brand-accent",
  },
  REVIEW: {
    dot: "bg-amber-400",
    badge: "border-amber-400/30 bg-amber-400/10 text-amber-400",
    bar: "bg-amber-400",
  },
  COMPLETED: {
    dot: "bg-emerald-400",
    badge: "border-emerald-400/30 bg-emerald-400/10 text-emerald-400",
    bar: "bg-emerald-400",
  },
  PAUSED: {
    dot: "bg-brand-gray/50",
    badge: "border-brand-border bg-brand-surface text-brand-gray/60",
    bar: "bg-brand-gray/40",
  },
} as const;

// ── Priority config ──────────────────────────────────────────
const PRIORITY_CONFIG = {
  URGENT: { label: "Urgent",  color: "text-red-400",    bg: "bg-red-400/10 border-red-400/20" },
  HIGH:   { label: "Élevée",  color: "text-orange-400", bg: "bg-orange-400/10 border-orange-400/20" },
  MEDIUM: { label: "Moyen",   color: "text-blue-400",   bg: "bg-blue-400/10 border-blue-400/20" },
  LOW:    { label: "Faible",  color: "text-brand-gray/60", bg: "bg-brand-surface border-brand-border" },
} as const;

// ── Helpers ─────────────────────────────────────────────────
function formatDate(d: Date | string | null, locale: string): string {
  if (!d) return "—";
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-CD" : "en-ZA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(d));
}

function daysLeft(endDate: Date | string | null): number | null {
  if (!endDate) return null;
  const diff = new Date(endDate).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function topPriority(tasks: TaskMini[]): keyof typeof PRIORITY_CONFIG | null {
  const order: (keyof typeof PRIORITY_CONFIG)[] = ["URGENT", "HIGH", "MEDIUM", "LOW"];
  for (const p of order) {
    if (tasks.some((t) => t.priority === p && t.status !== "DONE")) return p;
  }
  return null;
}

// ── Component ────────────────────────────────────────────────
type ProjectCardProps = {
  project: ProjectCardData;
  onClick?: (id: string) => void;
};

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const t = useTranslations("dashboard");
  const locale = useLocale();

  const statusCfg = STATUS_CONFIG[project.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.IN_PROGRESS;
  const totalTasks = project.tasks.length;
  const doneTasks = project.tasks.filter((t) => t.status === "DONE").length;
  const progressPct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
  const priority = topPriority(project.tasks);
  const remaining = daysLeft(project.endDate);

  return (
    <div
      onClick={() => onClick?.(project.id)}
      className={cn(
        "group relative flex flex-col gap-4 rounded-2xl border border-brand-border bg-brand-surface/30 p-5 backdrop-blur-sm transition-all duration-300",
        "hover:border-brand-accent/25 hover:bg-brand-surface/50 hover:shadow-glass",
        onClick && "cursor-pointer"
      )}
    >
      {/* Top accent on hover */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-brand-accent/0 to-transparent transition-all duration-300 group-hover:via-brand-accent/30" />

      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-brand-white">
            {project.title}
          </h3>
          {project.client && (
            <p className="mt-0.5 truncate text-xs text-brand-gray/50">
              {project.client.name ?? project.client.email}
            </p>
          )}
        </div>

        {/* Status badge */}
        <span
          className={cn(
            "flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold",
            statusCfg.badge
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", statusCfg.dot)} />
          {t(`projects.status.${project.status}`)}
        </span>
      </div>

      {/* Description */}
      {project.description && (
        <p className="line-clamp-2 text-xs leading-relaxed text-brand-gray/70">
          {project.description}
        </p>
      )}

      {/* Task progress */}
      {totalTasks > 0 && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-brand-gray/50">
              {doneTasks}/{totalTasks} {t("tasks.done").toLowerCase()}
            </span>
            <span className="text-[11px] font-semibold text-brand-gray/70">
              {progressPct}%
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-brand-border">
            <div
              className={cn("h-full rounded-full transition-all duration-500", statusCfg.bar)}
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      )}

      {/* Metadata row */}
      <div className="flex flex-wrap items-center gap-2 border-t border-brand-border/60 pt-3">
        {/* Priority */}
        {priority && (
          <span
            className={cn(
              "flex items-center gap-1 rounded-lg border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
              PRIORITY_CONFIG[priority].bg,
              PRIORITY_CONFIG[priority].color
            )}
          >
            {PRIORITY_CONFIG[priority].label}
          </span>
        )}

        {/* Budget */}
        {project.budget != null && (
          <span className="flex items-center gap-1 text-[11px] text-brand-gray/50">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ${project.budget.toLocaleString()}
          </span>
        )}

        {/* Days remaining */}
        {remaining !== null && project.status !== "COMPLETED" && (
          <span
            className={cn(
              "ml-auto flex items-center gap-1 text-[11px] font-medium",
              remaining < 0
                ? "text-red-400"
                : remaining <= 7
                ? "text-amber-400"
                : "text-brand-gray/50"
            )}
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {remaining < 0
              ? locale === "fr" ? `${Math.abs(remaining)}j dépassé` : `${Math.abs(remaining)}d overdue`
              : locale === "fr" ? `${remaining}j restants` : `${remaining}d left`}
          </span>
        )}

        {/* End date (if no remaining calc) */}
        {remaining === null && project.endDate && (
          <span className="ml-auto text-[11px] text-brand-gray/40">
            {formatDate(project.endDate, locale)}
          </span>
        )}
      </div>
    </div>
  );
}

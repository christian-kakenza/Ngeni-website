"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { api } from "@/trpc/react";
import { ProjectCard, type ProjectCardData } from "@/components/dashboard/ProjectCard";
import { cn } from "@/lib/utils";

// ============================================================
// Projects List Page — Client Component
// Vue en grille + tableau + filtres par statut & priorité
// ============================================================

type StatusFilter = "ALL" | "IN_PROGRESS" | "REVIEW" | "COMPLETED" | "PAUSED";
type ViewMode = "grid" | "table";

// ── Status badge colours (for table rows) ────────────────────
const STATUS_BADGE: Record<string, string> = {
  IN_PROGRESS: "border-brand-accent/30 bg-brand-accent/10 text-brand-accent",
  REVIEW:      "border-amber-400/30 bg-amber-400/10 text-amber-400",
  COMPLETED:   "border-emerald-400/30 bg-emerald-400/10 text-emerald-400",
  PAUSED:      "border-brand-border bg-brand-surface text-brand-gray/60",
};

const PRIORITY_BADGE: Record<string, string> = {
  URGENT: "border-red-400/30 bg-red-400/10 text-red-400",
  HIGH:   "border-orange-400/30 bg-orange-400/10 text-orange-400",
  MEDIUM: "border-blue-400/30 bg-blue-400/10 text-blue-400",
  LOW:    "border-brand-border bg-brand-surface text-brand-gray/50",
};

// Top priority from tasks
function topPriority(tasks: ProjectCardData["tasks"]) {
  const order = ["URGENT", "HIGH", "MEDIUM", "LOW"] as const;
  for (const p of order) {
    if (tasks.some((t) => t.priority === p && t.status !== "DONE")) return p;
  }
  return tasks.length > 0 ? "LOW" : null;
}

function formatDate(d: Date | string | null, locale: string) {
  if (!d) return "—";
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-CD" : "en-ZA", {
    day: "2-digit", month: "short", year: "numeric",
  }).format(new Date(d));
}

// ── Table row ────────────────────────────────────────────────
function TableRow({
  project,
  locale,
  t,
}: {
  project: ProjectCardData;
  locale: string;
  t: ReturnType<typeof useTranslations<"dashboard">>;
}) {
  const total = project.tasks.length;
  const done  = project.tasks.filter((t) => t.status === "DONE").length;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;
  const prio  = topPriority(project.tasks);

  return (
    <tr className="group border-b border-brand-border/50 transition-colors hover:bg-brand-surface/30">
      {/* Title */}
      <td className="py-3.5 pl-5 pr-3">
        <div>
          <p className="text-sm font-semibold text-brand-white">{project.title}</p>
          {project.description && (
            <p className="mt-0.5 line-clamp-1 text-xs text-brand-gray/50">
              {project.description}
            </p>
          )}
        </div>
      </td>

      {/* Status */}
      <td className="px-3 py-3.5">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold",
            STATUS_BADGE[project.status]
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
          {t(`projects.status.${project.status}`)}
        </span>
      </td>

      {/* Priority */}
      <td className="px-3 py-3.5">
        {prio ? (
          <span
            className={cn(
              "inline-flex rounded-lg border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
              PRIORITY_BADGE[prio]
            )}
          >
            {t(`projects.priority.${prio}`)}
          </span>
        ) : (
          <span className="text-xs text-brand-gray/30">—</span>
        )}
      </td>

      {/* Progress */}
      <td className="px-3 py-3.5">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-brand-border">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                project.status === "COMPLETED"
                  ? "bg-emerald-400"
                  : project.status === "REVIEW"
                  ? "bg-amber-400"
                  : "bg-brand-accent"
              )}
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs text-brand-gray/50">{pct}%</span>
        </div>
      </td>

      {/* Budget */}
      <td className="px-3 py-3.5">
        <span className="text-sm text-brand-gray/70">
          {project.budget != null ? `$${project.budget.toLocaleString()}` : "—"}
        </span>
      </td>

      {/* End date */}
      <td className="px-3 py-3.5 pr-5">
        <span className="text-xs text-brand-gray/50">
          {formatDate(project.endDate, locale)}
        </span>
      </td>
    </tr>
  );
}

// ── Main page ────────────────────────────────────────────────
export default function ProjectsPage() {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const router = useRouter();

  const [filter, setFilter] = useState<StatusFilter>("ALL");
  const [view, setView]     = useState<ViewMode>("grid");
  const [search, setSearch] = useState("");

  const { data: projects, isLoading } = api.projects.getAll.useQuery();

  // Filtered + searched list
  const filtered = useMemo(() => {
    if (!projects) return [];
    return projects.filter((p) => {
      const matchStatus = filter === "ALL" || p.status === filter;
      const matchSearch =
        search.trim() === "" ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        (p.description ?? "").toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [projects, filter, search]);

  const filters: { key: StatusFilter; label: string; count: number }[] = [
    { key: "ALL",         label: locale === "fr" ? "Tous" : "All",          count: projects?.length ?? 0 },
    { key: "IN_PROGRESS", label: t("projects.status.IN_PROGRESS"),           count: projects?.filter((p) => p.status === "IN_PROGRESS").length ?? 0 },
    { key: "REVIEW",      label: t("projects.status.REVIEW"),                count: projects?.filter((p) => p.status === "REVIEW").length ?? 0 },
    { key: "COMPLETED",   label: t("projects.status.COMPLETED"),             count: projects?.filter((p) => p.status === "COMPLETED").length ?? 0 },
    { key: "PAUSED",      label: t("projects.status.PAUSED"),                count: projects?.filter((p) => p.status === "PAUSED").length ?? 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-brand-white">
            {t("projects.title")}
          </h1>
          <p className="mt-0.5 text-sm text-brand-gray/60">
            {isLoading
              ? "…"
              : locale === "fr"
              ? `${filtered.length} projet(s) trouvé(s)`
              : `${filtered.length} project(s) found`}
          </p>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-2 rounded-xl border border-brand-border bg-brand-surface/40 p-1">
          <button
            onClick={() => setView("grid")}
            className={cn(
              "rounded-lg p-2 transition-all",
              view === "grid"
                ? "bg-brand-accent/20 text-brand-accent"
                : "text-brand-gray/50 hover:text-brand-gray"
            )}
            aria-label="Grid view"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
          </button>
          <button
            onClick={() => setView("table")}
            className={cn(
              "rounded-lg p-2 transition-all",
              view === "table"
                ? "bg-brand-accent/20 text-brand-accent"
                : "text-brand-gray/50 hover:text-brand-gray"
            )}
            aria-label="Table view"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Search + filters bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <svg className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-brand-gray/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={locale === "fr" ? "Rechercher un projet…" : "Search a project…"}
            className="w-full rounded-xl border border-brand-border bg-brand-surface/40 py-2.5 pl-9 pr-4 text-sm text-brand-white outline-none placeholder:text-brand-gray/40 focus:border-brand-accent/40 focus:ring-1 focus:ring-brand-accent/20 transition-all"
          />
        </div>

        {/* Status filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all duration-200",
                filter === f.key
                  ? "border-brand-accent/40 bg-brand-accent/15 text-brand-accent"
                  : "border-brand-border bg-brand-surface/30 text-brand-gray/60 hover:border-brand-accent/20 hover:text-brand-gray"
              )}
            >
              {f.label}
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] font-black",
                  filter === f.key ? "bg-brand-accent/20 text-brand-accent" : "bg-brand-border text-brand-gray/50"
                )}
              >
                {f.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse h-48 rounded-2xl border border-brand-border bg-brand-surface/20" />
          ))}
        </div>
      )}

      {/* Grid view */}
      {!isLoading && view === "grid" && (
        filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onClick={(id) => router.push(`/dashboard/projects/${id}` as never)}
              />
            ))}
          </div>
        ) : (
          <EmptyState locale={locale} t={t} hasSearch={search.trim() !== ""} />
        )
      )}

      {/* Table view */}
      {!isLoading && view === "table" && (
        filtered.length > 0 ? (
          <div className="overflow-hidden rounded-2xl border border-brand-border bg-brand-surface/20 backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-brand-border bg-brand-surface/40">
                    {[
                      locale === "fr" ? "Projet" : "Project",
                      "Statut",
                      locale === "fr" ? "Priorité" : "Priority",
                      locale === "fr" ? "Avancement" : "Progress",
                      "Budget",
                      locale === "fr" ? "Échéance" : "Due date",
                    ].map((h) => (
                      <th
                        key={h}
                        className="py-3 pl-5 pr-3 text-[11px] font-bold uppercase tracking-wider text-brand-gray/50 first:pl-5 last:pr-5"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <TableRow key={p.id} project={p} locale={locale} t={t} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <EmptyState locale={locale} t={t} hasSearch={search.trim() !== ""} />
        )
      )}
    </div>
  );
}

// ── Empty state ──────────────────────────────────────────────
function EmptyState({
  locale,
  t,
  hasSearch,
}: {
  locale: string;
  t: ReturnType<typeof useTranslations<"dashboard">>;
  hasSearch: boolean;
}) {
  return (
    <div className="rounded-2xl border border-brand-border bg-brand-surface/20 p-12 text-center backdrop-blur-sm">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-border bg-brand-surface/50">
        <svg className="h-7 w-7 text-brand-gray/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          {hasSearch ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
          )}
        </svg>
      </div>

      <h3 className="text-base font-bold text-brand-white">
        {hasSearch
          ? locale === "fr" ? "Aucun résultat trouvé" : "No results found"
          : t("projects.empty")}
      </h3>
      <p className="mt-1.5 text-sm text-brand-gray/50">
        {hasSearch
          ? locale === "fr" ? "Essayez d'autres mots-clés ou filtres." : "Try different keywords or filters."
          : t("projects.empty_sub")}
      </p>

      {!hasSearch && (
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/10 px-4 py-1.5 text-xs font-semibold text-brand-accent">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-accent" />
          {locale === "fr" ? "Votre équipe NGENI prépare votre premier projet" : "Your NGENI team is preparing your first project"}
        </div>
      )}
    </div>
  );
}

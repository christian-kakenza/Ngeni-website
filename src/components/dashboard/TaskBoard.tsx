"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import {
  Plus, ChevronLeft, ChevronRight, CheckCheck,
  Trash2, Clock, Loader2, X, AlertTriangle,
  CircleDot, Circle, CheckCircle2,
} from "lucide-react";
import { api } from "@/trpc/react";
import type { RouterOutputs } from "@/trpc/react";
import { cn } from "@/lib/utils";

// ============================================================
// TaskBoard — Client Component
// Kanban 3 colonnes : À faire | En cours | Terminé
// Mutations : tasks.update (status) + tasks.create (admin) + tasks.delete (admin)
// ============================================================

type Task = RouterOutputs["projects"]["getById"]["tasks"][number];
type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

// ── Config colonnes ──────────────────────────────────────────
const COLUMNS: {
  key: TaskStatus;
  fr: string;
  en: string;
  gradient: string;
  icon: React.ReactNode;
}[] = [
  {
    key: "TODO",
    fr: "À faire",
    en: "To Do",
    gradient: "from-brand-gray/50 to-brand-gray/30",
    icon: <Circle className="h-3.5 w-3.5" />,
  },
  {
    key: "IN_PROGRESS",
    fr: "En cours",
    en: "In Progress",
    gradient: "from-brand-accent to-[#1f6feb]",
    icon: <CircleDot className="h-3.5 w-3.5" />,
  },
  {
    key: "DONE",
    fr: "Terminé",
    en: "Done",
    gradient: "from-emerald-500 to-teal-500",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
  },
];

// ── Config priorités ─────────────────────────────────────────
const PRIO: Record<
  Priority,
  { fr: string; en: string; badge: string; dot: string }
> = {
  URGENT: {
    fr: "Urgent",  en: "Urgent",
    badge: "border-red-400/30 bg-red-400/10 text-red-400",
    dot: "bg-red-400",
  },
  HIGH: {
    fr: "Élevée",  en: "High",
    badge: "border-orange-400/30 bg-orange-400/10 text-orange-400",
    dot: "bg-orange-400",
  },
  MEDIUM: {
    fr: "Moyen",   en: "Medium",
    badge: "border-blue-400/30 bg-blue-400/10 text-blue-400",
    dot: "bg-blue-400",
  },
  LOW: {
    fr: "Faible",  en: "Low",
    badge: "border-brand-border bg-brand-surface/50 text-brand-gray/50",
    dot: "bg-brand-gray/40",
  },
};

// ── Task card ────────────────────────────────────────────────
function TaskItem({
  task,
  isAdmin,
  updatingId,
  onMove,
  onDelete,
}: {
  task: Task;
  isAdmin: boolean;
  updatingId: string | null;
  onMove: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}) {
  const locale = useLocale();
  const fr = locale === "fr";
  const prio = PRIO[task.priority as Priority];
  const isLoading = updatingId === task.id;

  const prevStatus: TaskStatus | null =
    task.status === "IN_PROGRESS" ? "TODO" :
    task.status === "DONE" ? "IN_PROGRESS" : null;

  const nextStatus: TaskStatus | null =
    task.status === "TODO" ? "IN_PROGRESS" :
    task.status === "IN_PROGRESS" ? "DONE" : null;

  return (
    <div
      className={cn(
        "group relative rounded-xl border border-brand-border bg-brand-surface/40 p-4 backdrop-blur-sm transition-all duration-200",
        "hover:border-brand-accent/25 hover:shadow-glass",
        isLoading && "pointer-events-none opacity-50"
      )}
    >
      {/* Priority + due date */}
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <span
          className={cn(
            "flex items-center gap-1.5 rounded-lg border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
            prio.badge
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", prio.dot)} />
          {fr ? prio.fr : prio.en}
        </span>

        {task.dueDate && (
          <span className="flex items-center gap-1 text-[10px] text-brand-gray/40">
            <Clock className="h-3 w-3" />
            {new Date(task.dueDate).toLocaleDateString(
              fr ? "fr-CD" : "en-ZA",
              { day: "2-digit", month: "short" }
            )}
          </span>
        )}
      </div>

      {/* Title */}
      <p className="text-sm font-semibold leading-snug text-brand-white">
        {task.title}
      </p>

      {/* Description */}
      {task.description && (
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-brand-gray/60">
          {task.description}
        </p>
      )}

      {/* Actions row */}
      <div className="mt-3 flex items-center gap-1.5">
        {/* Move backward */}
        {prevStatus && (
          <button
            onClick={() => onMove(task.id, prevStatus)}
            className="flex h-7 items-center gap-1 rounded-lg border border-brand-border px-2 text-[11px] text-brand-gray/50 transition-all hover:border-brand-accent/30 hover:text-brand-accent"
            title={fr ? "Reculer" : "Move back"}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
        )}

        {/* Move forward */}
        {nextStatus && (
          <button
            onClick={() => onMove(task.id, nextStatus)}
            className={cn(
              "flex h-7 items-center gap-1 rounded-lg border px-2 text-[11px] transition-all",
              nextStatus === "DONE"
                ? "border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/10"
                : "border-brand-border text-brand-gray/50 hover:border-brand-accent/30 hover:text-brand-accent"
            )}
            title={fr ? "Avancer" : "Move forward"}
          >
            {nextStatus === "DONE" ? (
              <CheckCheck className="h-3.5 w-3.5" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" />
            )}
          </button>
        )}

        {/* Loader */}
        {isLoading && (
          <Loader2 className="ml-1 h-3.5 w-3.5 animate-spin text-brand-accent" />
        )}

        {/* Delete — admin only, visible on hover */}
        {isAdmin && (
          <button
            onClick={() => onDelete(task.id)}
            className="ml-auto flex h-7 w-7 items-center justify-center rounded-lg border border-brand-border text-brand-gray/25 opacity-0 transition-all group-hover:opacity-100 hover:border-red-400/30 hover:text-red-400"
            title={fr ? "Supprimer" : "Delete"}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

// ── Add task inline form ─────────────────────────────────────
function AddTaskForm({
  projectId,
  defaultStatus,
  onDone,
  onCancel,
}: {
  projectId: string;
  defaultStatus: TaskStatus;
  onDone: () => void;
  onCancel: () => void;
}) {
  const locale = useLocale();
  const fr = locale === "fr";
  const utils = api.useUtils();

  const [title, setTitle]       = useState("");
  const [priority, setPriority] = useState<Priority>("MEDIUM");
  const [dueDate, setDueDate]   = useState("");
  const [desc, setDesc]         = useState("");

  const create = api.tasks.create.useMutation({
    onSuccess: () => {
      void utils.projects.getById.invalidate({ id: projectId });
      onDone();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    create.mutate({
      title: title.trim(),
      description: desc.trim() || undefined,
      projectId,
      status: defaultStatus,
      priority,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    });
  };

  const PRIOS: Priority[] = ["LOW", "MEDIUM", "HIGH", "URGENT"];

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-2 rounded-xl border border-brand-accent/20 bg-brand-surface/60 p-4 backdrop-blur-sm"
    >
      {/* Title */}
      <input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={fr ? "Titre de la tâche…" : "Task title…"}
        className="w-full rounded-lg border border-brand-border bg-brand-surface/40 px-3 py-2 text-sm text-brand-white outline-none placeholder:text-brand-gray/40 focus:border-brand-accent/40 focus:ring-1 focus:ring-brand-accent/20 transition-all"
        required
      />

      {/* Description */}
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder={fr ? "Description (optionnel)…" : "Description (optional)…"}
        rows={2}
        className="mt-2 w-full resize-none rounded-lg border border-brand-border bg-brand-surface/40 px-3 py-2 text-sm text-brand-white outline-none placeholder:text-brand-gray/40 focus:border-brand-accent/40 focus:ring-1 focus:ring-brand-accent/20 transition-all"
      />

      {/* Priority + Due date */}
      <div className="mt-2 flex gap-2">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="flex-1 rounded-lg border border-brand-border bg-brand-surface/40 px-3 py-2 text-xs text-brand-gray outline-none focus:border-brand-accent/40 transition-all"
        >
          {PRIOS.map((p) => (
            <option key={p} value={p}>
              {fr ? PRIO[p].fr : PRIO[p].en}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="flex-1 rounded-lg border border-brand-border bg-brand-surface/40 px-3 py-2 text-xs text-brand-gray outline-none focus:border-brand-accent/40 transition-all"
        />
      </div>

      {/* Actions */}
      <div className="mt-3 flex gap-2">
        <button
          type="submit"
          disabled={create.isPending || !title.trim()}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-accent py-2 text-xs font-semibold text-white shadow-glow transition-all hover:bg-brand-accent/90",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
        >
          {create.isPending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Plus className="h-3.5 w-3.5" />
          )}
          {fr ? "Ajouter" : "Add"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-border text-brand-gray/50 hover:text-brand-white transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {create.error && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-red-400">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
          {create.error.message}
        </p>
      )}
    </form>
  );
}

// ── Main component ───────────────────────────────────────────
type TaskBoardProps = {
  projectId: string;
  tasks: Task[];
};

export function TaskBoard({ projectId, tasks }: TaskBoardProps) {
  const locale = useLocale();
  const fr = locale === "fr";
  const { data: session } = useSession();
  const isAdmin = (session?.user as { role?: string } | undefined)?.role === "ADMIN";

  const utils = api.useUtils();
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [addingTo, setAddingTo]     = useState<TaskStatus | null>(null);

  // ── Mutations ──────────────────────────────────────────────
  const updateTask = api.tasks.update.useMutation({
    onMutate: ({ id }) => setUpdatingId(id),
    onSettled: () => setUpdatingId(null),
    onSuccess: () => void utils.projects.getById.invalidate({ id: projectId }),
  });

  const deleteTask = api.tasks.delete.useMutation({
    onMutate: ({ id }) => setUpdatingId(id),
    onSettled: () => setUpdatingId(null),
    onSuccess: () => void utils.projects.getById.invalidate({ id: projectId }),
  });

  const handleMove = (id: string, status: TaskStatus) => {
    updateTask.mutate({ id, status });
  };

  const handleDelete = (id: string) => {
    if (window.confirm(fr ? "Supprimer cette tâche ?" : "Delete this task?")) {
      deleteTask.mutate({ id });
    }
  };

  // Group tasks by status
  const byStatus = (status: TaskStatus) =>
    tasks.filter((t) => t.status === status);

  const totalTasks = tasks.length;
  const doneTasks  = tasks.filter((t) => t.status === "DONE").length;
  const pct        = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Progress header */}
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-brand-border bg-brand-surface/20 px-5 py-3.5 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <p className="text-sm font-bold text-brand-white">
            {fr ? "Progression globale" : "Overall progress"}
          </p>
          <span className="rounded-full bg-brand-accent/10 px-2.5 py-0.5 text-xs font-bold text-brand-accent">
            {doneTasks}/{totalTasks}
          </span>
        </div>
        <div className="flex flex-1 max-w-xs items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-brand-border">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-accent to-emerald-400 transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs font-bold text-brand-gray/60">{pct}%</span>
        </div>
      </div>

      {/* Kanban grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {COLUMNS.map((col) => {
          const colTasks = byStatus(col.key);

          return (
            <div key={col.key} className="flex flex-col gap-3">
              {/* Column header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br text-white",
                      col.gradient
                    )}
                  >
                    {col.icon}
                  </div>
                  <h3 className="text-sm font-bold text-brand-white">
                    {fr ? col.fr : col.en}
                  </h3>
                </div>
                <span className="rounded-full bg-brand-surface border border-brand-border px-2 py-0.5 text-xs font-bold text-brand-gray/50">
                  {colTasks.length}
                </span>
              </div>

              {/* Column body */}
              <div
                className={cn(
                  "flex flex-1 flex-col gap-2 rounded-2xl border border-brand-border/60 bg-brand-surface/10 p-3 backdrop-blur-sm",
                  "min-h-[120px]"
                )}
              >
                {colTasks.length === 0 ? (
                  <div className="flex flex-1 items-center justify-center py-6 text-xs text-brand-gray/30">
                    {fr ? "Aucune tâche" : "No tasks"}
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      isAdmin={isAdmin}
                      updatingId={updatingId}
                      onMove={handleMove}
                      onDelete={handleDelete}
                    />
                  ))
                )}

                {/* Add task form (admin) */}
                {isAdmin && addingTo === col.key ? (
                  <AddTaskForm
                    projectId={projectId}
                    defaultStatus={col.key}
                    onDone={() => setAddingTo(null)}
                    onCancel={() => setAddingTo(null)}
                  />
                ) : isAdmin ? (
                  <button
                    onClick={() => setAddingTo(col.key)}
                    className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-brand-border py-2.5 text-xs text-brand-gray/40 transition-all hover:border-brand-accent/30 hover:text-brand-accent"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    {fr ? "Ajouter une tâche" : "Add a task"}
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

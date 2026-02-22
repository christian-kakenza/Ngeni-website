import { z } from "zod";

// ============================================================
// Projects & Tasks — Schémas de validation Zod
// ============================================================

export const projectStatusEnum = z.enum([
  "IN_PROGRESS",
  "REVIEW",
  "COMPLETED",
  "PAUSED",
]);

export const taskStatusEnum = z.enum(["TODO", "IN_PROGRESS", "DONE"]);

export const priorityEnum = z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]);

// ---- Projet ------------------------------------------------
export const projectCreateSchema = z.object({
  title: z
    .string({ required_error: "Titre requis" })
    .min(3, "Titre trop court")
    .max(200, "Titre trop long")
    .trim(),
  description: z.string().max(2000).trim().optional(),
  clientId: z.string().cuid("ID client invalide"),
  status: projectStatusEnum.default("IN_PROGRESS"),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  budget: z.number().positive("Le budget doit être positif").optional(),
});

export const projectUpdateSchema = projectCreateSchema
  .partial()
  .extend({ id: z.string().cuid() });

// ---- Tâche -------------------------------------------------
export const taskCreateSchema = z.object({
  title: z
    .string({ required_error: "Titre requis" })
    .min(3, "Titre trop court")
    .max(300, "Titre trop long")
    .trim(),
  description: z.string().max(2000).trim().optional(),
  projectId: z.string().cuid("ID projet invalide"),
  status: taskStatusEnum.default("TODO"),
  priority: priorityEnum.default("MEDIUM"),
  dueDate: z.coerce.date().optional(),
});

export const taskUpdateSchema = taskCreateSchema
  .partial()
  .extend({ id: z.string().cuid() });

export type ProjectCreateInput = z.infer<typeof projectCreateSchema>;
export type ProjectUpdateInput = z.infer<typeof projectUpdateSchema>;
export type TaskCreateInput = z.infer<typeof taskCreateSchema>;
export type TaskUpdateInput = z.infer<typeof taskUpdateSchema>;

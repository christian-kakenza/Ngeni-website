import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  adminProcedure,
} from "@/server/api/trpc";
import {
  taskCreateSchema,
  taskUpdateSchema,
  taskStatusEnum,
} from "@/lib/validations/project.schema";

export const tasksRouter = createTRPCRouter({
  /**
   * Récupère toutes les tâches d'un projet.
   * Vérifie la propriété pour les clients.
   */
  getByProject: protectedProcedure
    .input(
      z.object({
        projectId: z.string().cuid(),
        status: taskStatusEnum.optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { session, db } = ctx;

      // Vérifier l'accès au projet
      const project = await db.project.findUnique({
        where: { id: input.projectId },
        select: { clientId: true },
      });

      if (!project) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Projet introuvable." });
      }

      if (session.user.role !== "ADMIN" && project.clientId !== session.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      return db.task.findMany({
        where: {
          projectId: input.projectId,
          ...(input.status ? { status: input.status } : {}),
        },
        orderBy: [{ priority: "desc" }, { createdAt: "asc" }],
      });
    }),

  /**
   * Crée une tâche. Admin uniquement.
   */
  create: adminProcedure
    .input(taskCreateSchema)
    .mutation(async ({ ctx, input }) => {
      // Vérifier que le projet existe
      const project = await ctx.db.project.findUnique({
        where: { id: input.projectId },
        select: { id: true },
      });

      if (!project) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Projet introuvable." });
      }

      return ctx.db.task.create({ data: input });
    }),

  /**
   * Met à jour une tâche.
   * Admin : toutes les propriétés.
   * Client : uniquement le statut de ses propres tâches.
   */
  update: protectedProcedure
    .input(taskUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const { session, db } = ctx;
      const { id, ...data } = input;

      const task = await db.task.findUnique({
        where: { id },
        include: { project: { select: { clientId: true } } },
      });

      if (!task) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Tâche introuvable." });
      }

      // Clients ne peuvent changer que le statut de leurs tâches
      if (session.user.role !== "ADMIN") {
        if (task.project.clientId !== session.user.id) {
          throw new TRPCError({ code: "FORBIDDEN" });
        }

        // Clients limités à la mise à jour du statut uniquement
        const { status } = data;
        if (!status) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Champ de mise à jour non autorisé.",
          });
        }

        return db.task.update({ where: { id }, data: { status } });
      }

      return db.task.update({ where: { id }, data });
    }),

  /**
   * Supprime une tâche. Admin uniquement.
   */
  delete: adminProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const exists = await ctx.db.task.findUnique({
        where: { id: input.id },
        select: { id: true },
      });

      if (!exists) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Tâche introuvable." });
      }

      await ctx.db.task.delete({ where: { id: input.id } });
      return { success: true };
    }),
});

import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  adminProcedure,
} from "@/server/api/trpc";
import {
  projectCreateSchema,
  projectUpdateSchema,
} from "@/lib/validations/project.schema";

export const projectsRouter = createTRPCRouter({
  /**
   * Récupère tous les projets.
   * ADMIN : tous les projets avec infos client.
   * CLIENT : uniquement ses propres projets.
   */
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const { session, db } = ctx;

    if (session.user.role === "ADMIN") {
      return db.project.findMany({
        include: {
          client: { select: { id: true, name: true, email: true } },
          tasks: { select: { id: true, status: true, priority: true } },
        },
        orderBy: { updatedAt: "desc" },
      });
    }

    // CLIENT : ses projets uniquement
    return db.project.findMany({
      where: { clientId: session.user.id },
      include: {
        tasks: { select: { id: true, status: true, priority: true } },
      },
      orderBy: { updatedAt: "desc" },
    });
  }),

  /**
   * Récupère un projet par ID.
   * Vérifie la propriété pour les clients.
   */
  getById: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const { session, db } = ctx;

      const project = await db.project.findUnique({
        where: { id: input.id },
        include: {
          client: { select: { id: true, name: true, email: true } },
          tasks: { orderBy: [{ priority: "desc" }, { createdAt: "asc" }] },
        },
      });

      if (!project) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Projet introuvable." });
      }

      // Vérification propriété pour les clients
      if (session.user.role !== "ADMIN" && project.clientId !== session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Accès non autorisé à ce projet.",
        });
      }

      return project;
    }),

  /**
   * Crée un nouveau projet. Admin uniquement.
   */
  create: adminProcedure
    .input(projectCreateSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.project.create({
        data: input,
        include: { client: { select: { id: true, name: true, email: true } } },
      });
    }),

  /**
   * Met à jour un projet. Admin uniquement.
   */
  update: adminProcedure
    .input(projectUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;

      const exists = await ctx.db.project.findUnique({
        where: { id },
        select: { id: true },
      });

      if (!exists) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Projet introuvable." });
      }

      return ctx.db.project.update({
        where: { id },
        data,
        include: { client: { select: { id: true, name: true, email: true } } },
      });
    }),

  /**
   * Supprime un projet. Admin uniquement.
   */
  delete: adminProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const exists = await ctx.db.project.findUnique({
        where: { id: input.id },
        select: { id: true },
      });

      if (!exists) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Projet introuvable." });
      }

      await ctx.db.project.delete({ where: { id: input.id } });
      return { success: true };
    }),

  /**
   * Stats d'un projet (nombre de tâches par statut).
   */
  getStats: protectedProcedure
    .input(z.object({ projectId: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const { session, db } = ctx;

      const project = await db.project.findUnique({
        where: { id: input.projectId },
        select: { clientId: true },
      });

      if (!project) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (session.user.role !== "ADMIN" && project.clientId !== session.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const [total, todo, inProgress, done] = await Promise.all([
        db.task.count({ where: { projectId: input.projectId } }),
        db.task.count({ where: { projectId: input.projectId, status: "TODO" } }),
        db.task.count({ where: { projectId: input.projectId, status: "IN_PROGRESS" } }),
        db.task.count({ where: { projectId: input.projectId, status: "DONE" } }),
      ]);

      return { total, todo, inProgress, done };
    }),
});

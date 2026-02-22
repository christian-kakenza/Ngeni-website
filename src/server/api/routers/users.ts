import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, adminProcedure } from "@/server/api/trpc";
import { hashPassword } from "@/lib/auth";

export const usersRouter = createTRPCRouter({
  /**
   * Liste tous les utilisateurs. Admin uniquement.
   */
  getAll: adminProcedure
    .input(
      z.object({
        role: z.enum(["ADMIN", "CLIENT", "GUEST"]).optional(),
        search: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findMany({
        where: {
          ...(input.role ? { role: input.role } : {}),
          ...(input.search
            ? {
                OR: [
                  { name: { contains: input.search } },
                  { email: { contains: input.search } },
                ],
              }
            : {}),
        },
        select: {
          id: true,
          email: true,
          name: true,
          image: true,
          role: true,
          createdAt: true,
          _count: { select: { projects: true } },
        },
        orderBy: { createdAt: "desc" },
      });
    }),

  /**
   * Récupère un utilisateur par ID. Admin uniquement.
   */
  getById: adminProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          email: true,
          name: true,
          image: true,
          role: true,
          createdAt: true,
          projects: {
            include: { tasks: { select: { status: true } } },
            orderBy: { updatedAt: "desc" },
          },
        },
      });

      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Utilisateur introuvable." });
      }

      return user;
    }),

  /**
   * Crée un client depuis le dashboard admin.
   */
  create: adminProcedure
    .input(
      z.object({
        name: z.string().min(2).max(100).trim(),
        email: z.string().email().toLowerCase().trim(),
        password: z.string().min(8),
        role: z.enum(["ADMIN", "CLIENT", "GUEST"]).default("CLIENT"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.user.findUnique({
        where: { email: input.email },
        select: { id: true },
      });

      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Cet email est déjà utilisé.",
        });
      }

      const passwordHash = await hashPassword(input.password);

      return ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          passwordHash,
          role: input.role,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
      });
    }),

  /**
   * Change le rôle d'un utilisateur. Admin uniquement.
   */
  updateRole: adminProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        role: z.enum(["ADMIN", "CLIENT", "GUEST"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Sécurité : un admin ne peut pas rétrograder son propre compte
      if (ctx.session.user.id === input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Vous ne pouvez pas modifier votre propre rôle.",
        });
      }

      return ctx.db.user.update({
        where: { id: input.id },
        data: { role: input.role },
        select: { id: true, email: true, name: true, role: true },
      });
    }),

  /**
   * Supprime un utilisateur. Admin uniquement.
   */
  delete: adminProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      // Sécurité : un admin ne peut pas supprimer son propre compte
      if (ctx.session.user.id === input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Vous ne pouvez pas supprimer votre propre compte.",
        });
      }

      await ctx.db.user.delete({ where: { id: input.id } });
      return { success: true };
    }),
});

import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "@/server/api/trpc";
import { registerSchema } from "@/lib/validations/auth.schema";
import { hashPassword } from "@/lib/auth";

export const authRouter = createTRPCRouter({
  /**
   * Inscription d'un nouvel utilisateur CLIENT.
   * Accessible publiquement (sur invitation — le rôle est fixé à CLIENT).
   */
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, email, password } = input;

      // Vérifier si l'email est déjà utilisé
      const existingUser = await ctx.db.user.findUnique({
        where: { email },
        select: { id: true },
      });

      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Cette adresse email est déjà utilisée.",
        });
      }

      const passwordHash = await hashPassword(password);

      const user = await ctx.db.user.create({
        data: {
          name,
          email,
          passwordHash,
          role: "CLIENT",
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
      });

      return { success: true, user };
    }),

  /**
   * Récupère le profil de l'utilisateur connecté.
   */
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        role: true,
        createdAt: true,
        _count: { select: { projects: true } },
      },
    });

    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Utilisateur introuvable." });
    }

    return user;
  }),

  /**
   * Met à jour le profil de l'utilisateur connecté.
   */
  updateProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().min(2).max(100).trim().optional(),
        image: z.string().url().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: input,
        select: { id: true, email: true, name: true, image: true, role: true },
      });
    }),
});

import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  adminProcedure,
} from "@/server/api/trpc";
import { leadCreateSchema } from "@/lib/validations/lead.schema";

export const leadsRouter = createTRPCRouter({
  /**
   * Crée un lead depuis le formulaire Contact ou l'AI Concierge.
   * Route publique — accessible sans authentification.
   */
  create: publicProcedure
    .input(leadCreateSchema)
    .mutation(async ({ ctx, input }) => {
      // Anti-spam : vérifier si un lead avec le même email a été créé
      // dans les dernières 24h pour éviter le spam
      const recentLead = await ctx.db.lead.findFirst({
        where: {
          email: input.email,
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        },
        select: { id: true },
      });

      if (recentLead) {
        // Silencieux pour l'utilisateur — on ne révèle pas le blocage
        return { success: true };
      }

      const lead = await ctx.db.lead.create({
        data: {
          name: input.name,
          email: input.email,
          phone: input.phone ?? null,
          company: input.company ?? null,
          message: input.message,
          service: input.service ?? null,
          source: input.source,
        },
        select: {
          id: true,
          name: true,
          email: true,
          service: true,
          createdAt: true,
        },
      });

      return { success: true, lead };
    }),

  /**
   * Liste tous les leads. Admin uniquement.
   */
  getAll: adminProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(50),
        cursor: z.string().cuid().optional(),
        service: z.string().optional(),
        source: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor, service, source } = input;

      const leads = await ctx.db.lead.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          ...(service ? { service } : {}),
          ...(source ? { source } : {}),
        },
        orderBy: { createdAt: "desc" },
      });

      let nextCursor: string | undefined;
      if (leads.length > limit) {
        const nextItem = leads.pop();
        nextCursor = nextItem?.id;
      }

      return { leads, nextCursor };
    }),

  /**
   * Récupère un lead par ID. Admin uniquement.
   */
  getById: adminProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const lead = await ctx.db.lead.findUnique({ where: { id: input.id } });

      if (!lead) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Lead introuvable." });
      }

      return lead;
    }),

  /**
   * Supprime un lead. Admin uniquement.
   */
  delete: adminProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.lead.delete({ where: { id: input.id } });
      return { success: true };
    }),

  /**
   * Stats des leads pour le dashboard admin.
   */
  getStats: adminProcedure.query(async ({ ctx }) => {
    const [total, byService, bySource, recent] = await Promise.all([
      ctx.db.lead.count(),
      ctx.db.lead.groupBy({ by: ["service"], _count: { service: true } }),
      ctx.db.lead.groupBy({ by: ["source"], _count: { source: true } }),
      ctx.db.lead.count({
        where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
      }),
    ]);

    return { total, byService, bySource, recentWeek: recent };
  }),
});

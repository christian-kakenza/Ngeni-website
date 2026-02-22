import { initTRPC, TRPCError } from "@trpc/server";
import { type NextRequest } from "next/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/server/db";

// ============================================================
// Contexte tRPC — partagé par toutes les procédures
// ============================================================

export const createTRPCContext = async (opts: { req: NextRequest }) => {
  const session = await auth();

  return {
    db,
    session,
    ...opts,
  };
};

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

// ============================================================
// Initialisation tRPC
// ============================================================

const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        // Expose les erreurs de validation Zod au client
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

// ============================================================
// Exports — Builders de router et de procédures
// ============================================================

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;

// -- Procédure publique (sans authentification) ---------------
export const publicProcedure = t.procedure;

// -- Middleware : vérifie que l'utilisateur est connecté ------
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user?.id) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Vous devez être connecté pour accéder à cette ressource.",
    });
  }

  return next({
    ctx: {
      // Narrow le type — session et user sont garantis non-null
      session: {
        ...ctx.session,
        user: ctx.session.user,
      },
    },
  });
});

// -- Procédure protégée (utilisateur connecté) ----------------
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);

// -- Middleware : vérifie que l'utilisateur est ADMIN ---------
const enforceUserIsAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user?.id || ctx.session.user.role !== "ADMIN") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Accès réservé aux administrateurs NGENI.",
    });
  }

  return next({
    ctx: {
      session: {
        ...ctx.session,
        user: ctx.session.user,
      },
    },
  });
});

// -- Procédure admin uniquement -------------------------------
export const adminProcedure = t.procedure.use(enforceUserIsAdmin);

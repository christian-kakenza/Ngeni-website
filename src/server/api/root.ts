import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { authRouter } from "@/server/api/routers/auth";
import { projectsRouter } from "@/server/api/routers/projects";
import { tasksRouter } from "@/server/api/routers/tasks";
import { leadsRouter } from "@/server/api/routers/leads";
import { usersRouter } from "@/server/api/routers/users";

// ============================================================
// AppRouter — Agrège tous les routers NGENI
// ============================================================

export const appRouter = createTRPCRouter({
  auth: authRouter,
  projects: projectsRouter,
  tasks: tasksRouter,
  leads: leadsRouter,
  users: usersRouter,
});

// Type exporté pour le client tRPC (inférence TypeScript complète)
export type AppRouter = typeof appRouter;

// Factory pour les server-side callers (Server Components)
export const createCaller = createCallerFactory(appRouter);

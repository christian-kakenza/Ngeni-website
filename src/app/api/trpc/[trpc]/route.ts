import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";
import { env } from "@/env.js";
import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";

// ============================================================
// tRPC HTTP Handler — Route App Router Next.js
// Endpoint : /api/trpc
// ============================================================

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ req }),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `[tRPC] Erreur sur ${path ?? "<no-path>"}: ${error.message}`
            );
          }
        : undefined,
  });

export { handler as GET, handler as POST };

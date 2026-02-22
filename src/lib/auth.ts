import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/server/db";
import { loginSchema } from "@/lib/validations/auth.schema";
import type { Role } from "@/types";

// ============================================================
// Augmentation des types NextAuth
// ============================================================

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }

  interface User {
    role?: Role;
  }
}


// ============================================================
// Configuration Auth.js v5
// ============================================================

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),

  // JWT strategy (compatible avec Credentials provider)
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },

  // Pages d'authentification personnalisées
  pages: {
    signIn: "/fr/connexion",
    error: "/fr/connexion",
  },

  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        // Validation Zod des credentials
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        // Recherche de l'utilisateur
        const user = await db.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            name: true,
            image: true,
            role: true,
            passwordHash: true,
          },
        });

        if (!user?.passwordHash) return null;

        // Vérification bcrypt du mot de passe
        const passwordMatch = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatch) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role as Role,
        };
      },
    }),
  ],

  callbacks: {
    // Enrichir le JWT avec id et role
    jwt({ token, user }) {
      if (user) {
        token.id = user.id!;
        token.role = (user.role ?? "CLIENT") as Role;
      }
      return token;
    },

    // Enrichir la session avec id et role depuis le JWT
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
});

// ============================================================
// Helper : hachage de mot de passe (pour l'inscription)
// ============================================================
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

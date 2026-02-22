import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

// ============================================================
// Dashboard Layout — Server Component
// • Vérifie la session Auth.js (double-check middleware)
// • Passe les données user sérialisables au DashboardShell
// ============================================================

type DashboardLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function DashboardLayout({
  children,
  params: { locale },
}: DashboardLayoutProps) {
  const session = await auth();

  if (!session?.user) {
    const loginPath =
      locale === "fr" ? `/${locale}/connexion` : `/${locale}/login`;
    redirect(loginPath);
  }

  return (
    <DashboardShell
      user={{
        name: session.user.name ?? null,
        email: session.user.email ?? null,
      }}
    >
      {children}
    </DashboardShell>
  );
}

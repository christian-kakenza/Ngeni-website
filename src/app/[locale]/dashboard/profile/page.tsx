import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profil | Profile",
};

// ============================================================
// Dashboard Profile — Server Component
// Affiche les informations du compte utilisateur connecté
// ============================================================

type ProfilePageProps = {
  params: { locale: string };
};

export default async function ProfilePage({ params: { locale } }: ProfilePageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect(locale === "fr" ? `/${locale}/connexion` : `/${locale}/login`);
  }

  const fr = locale === "fr";
  const user = session.user;

  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : (user.email?.[0]?.toUpperCase() ?? "U");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-brand-white">
          {fr ? "Mon Profil" : "My Profile"}
        </h1>
        <p className="mt-1 text-sm text-brand-gray">
          {fr ? "Gérez vos informations de compte." : "Manage your account information."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Col gauche — Avatar + infos principales */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-brand-border bg-brand-surface/30 p-6 backdrop-blur-sm">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-accent to-[#1f6feb] text-2xl font-black text-white shadow-glow">
                {initials}
              </div>
              <div className="text-center">
                <p className="font-bold text-brand-white">
                  {user.name ?? (fr ? "Utilisateur" : "User")}
                </p>
                <p className="mt-0.5 text-sm text-brand-gray">{user.email}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="my-5 h-px bg-brand-border" />

            {/* Statut */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-brand-gray/60">
                  {fr ? "Statut" : "Status"}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {fr ? "Actif" : "Active"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-brand-gray/60">
                  {fr ? "Rôle" : "Role"}
                </span>
                <span className="rounded-full bg-brand-accent/10 px-2 py-0.5 text-xs font-semibold text-brand-accent">
                  Client
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Col droite — Formulaire infos */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informations générales */}
          <div className="rounded-2xl border border-brand-border bg-brand-surface/30 p-6 backdrop-blur-sm">
            <h2 className="mb-5 text-sm font-bold uppercase tracking-widest text-brand-white">
              {fr ? "Informations générales" : "General Information"}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-brand-gray/60">
                  {fr ? "Nom complet" : "Full name"}
                </label>
                <div className="rounded-xl border border-brand-border bg-brand-surface/50 px-4 py-3 text-sm text-brand-white">
                  {user.name ?? "—"}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-brand-gray/60">
                  Email
                </label>
                <div className="rounded-xl border border-brand-border bg-brand-surface/50 px-4 py-3 text-sm text-brand-white">
                  {user.email ?? "—"}
                </div>
              </div>
            </div>
          </div>

          {/* Sécurité */}
          <div className="rounded-2xl border border-brand-border bg-brand-surface/30 p-6 backdrop-blur-sm">
            <h2 className="mb-5 text-sm font-bold uppercase tracking-widest text-brand-white">
              {fr ? "Sécurité" : "Security"}
            </h2>
            <div className="flex items-center justify-between rounded-xl border border-brand-border bg-brand-surface/50 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-brand-white">
                  {fr ? "Mot de passe" : "Password"}
                </p>
                <p className="text-xs text-brand-gray/60">
                  {fr ? "Dernière modification : récente" : "Last changed: recently"}
                </p>
              </div>
              <button
                disabled
                className="cursor-not-allowed rounded-lg border border-brand-border bg-brand-surface px-3 py-1.5 text-xs font-medium text-brand-gray/40"
              >
                {fr ? "Modifier" : "Change"}
              </button>
            </div>
            <p className="mt-3 text-xs text-brand-gray/40">
              {fr
                ? "La modification du mot de passe sera disponible prochainement."
                : "Password change will be available soon."}
            </p>
          </div>

          {/* Danger zone */}
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-red-400">
              {fr ? "Zone dangereuse" : "Danger Zone"}
            </h2>
            <p className="mb-4 text-sm text-brand-gray/60">
              {fr
                ? "La suppression de votre compte est permanente et irréversible."
                : "Account deletion is permanent and irreversible."}
            </p>
            <button
              disabled
              className="cursor-not-allowed rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2 text-sm font-medium text-red-400/40"
            >
              {fr ? "Supprimer mon compte" : "Delete my account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

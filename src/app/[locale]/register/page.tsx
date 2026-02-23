import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { LoginBackdrop } from "@/components/auth/LoginBackdrop";

// ============================================================
// Register Page — Server Component
// Design : fond sombre, carte glass centrée, Input-focused
// ============================================================

type RegisterPageProps = {
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: RegisterPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "auth.register" });
  return { title: t("title") };
}

export default async function RegisterPage({
  params: { locale },
}: RegisterPageProps) {
  const t = await getTranslations({ locale, namespace: "auth.register" });

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-black px-4 py-12">
      {/* Backdrop — clic en dehors de la carte = retour arrière */}
      <LoginBackdrop />

      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent/[0.06] blur-[160px]" />
        <div className="absolute left-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-[#1f6feb]/[0.05] blur-[100px]" />
      </div>

      {/* Card container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block transition-opacity hover:opacity-80">
            <Image src="/logo.svg" alt="Ngeni" width={140} height={36} className="h-9 w-auto" />
          </Link>
        </div>

        {/* Glass card */}
        <div className="relative rounded-2xl border border-brand-border bg-brand-surface/40 p-8 shadow-glass backdrop-blur-sm">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-xl font-bold text-brand-white">{t("title")}</h1>
            <p className="mt-1 text-sm text-brand-gray">{t("subtitle")}</p>
          </div>

          {/* Top accent line */}
          <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent" />

          {/* Form */}
          <RegisterForm />
        </div>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-brand-gray/40">
          © {new Date().getFullYear()} Ngeni —{" "}
          {locale === "fr"
            ? "Inscription sécurisée · Rôle CLIENT par défaut"
            : "Secure registration · CLIENT role by default"}
        </p>

        {/* Back to home */}
        <div className="mt-3 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-brand-gray/50 transition-colors hover:text-brand-accent"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {locale === "fr" ? "Retour à l'accueil" : "Back to home"}
          </Link>
        </div>
      </div>
    </div>
  );
}

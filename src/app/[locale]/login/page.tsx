import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { LoginForm } from "@/components/auth/LoginForm";

// ============================================================
// Login Page — Server Component
// Design : fond sombre, carte glass centrée, Input-focused
// ============================================================

type LoginPageProps = {
  params: { locale: string };
  searchParams: { callbackUrl?: string };
};

export async function generateMetadata({
  params: { locale },
}: LoginPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "auth.login" });
  return { title: t("title") };
}

export default async function LoginPage({
  params: { locale },
  searchParams,
}: LoginPageProps) {
  const t = await getTranslations({ locale, namespace: "auth.login" });
  const callbackUrl = searchParams?.callbackUrl;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-black px-4 py-12">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent/[0.06] blur-[160px]" />
        <div className="absolute right-1/4 top-1/4 h-[300px] w-[300px] rounded-full bg-[#1f6feb]/[0.06] blur-[100px]" />
      </div>

      {/* Card container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-block text-2xl font-black tracking-tight text-brand-white transition-opacity hover:opacity-80"
          >
            NGE<span className="text-brand-accent">NI</span>
          </Link>
        </div>

        {/* Glass card */}
        <div className="rounded-2xl border border-brand-border bg-brand-surface/40 p-8 shadow-glass backdrop-blur-sm">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-xl font-bold text-brand-white">{t("title")}</h1>
            <p className="mt-1 text-sm text-brand-gray">{t("subtitle")}</p>
          </div>

          {/* Top accent line */}
          <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent" />

          {/* Form */}
          <LoginForm callbackUrl={callbackUrl} />
        </div>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-brand-gray/40">
          © {new Date().getFullYear()} NGENI —{" "}
          {locale === "fr" ? "Connexion sécurisée" : "Secure login"}
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

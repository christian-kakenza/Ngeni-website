import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { auth } from "@/lib/auth";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenuClient } from "./MobileMenuClient";

// ============================================================
// Navbar — Server Component
// Récupère session + traductions côté serveur.
// Délègue uniquement le menu mobile au Client Component.
// ============================================================

type NavbarProps = {
  locale: string;
};

export async function Navbar({ locale }: NavbarProps) {
  const [session, t] = await Promise.all([
    auth(),
    getTranslations({ locale, namespace: "nav" }),
  ]);

  const isLoggedIn = !!session?.user;

  // Liens de navigation — sections de la Landing Page (hash links)
  const navLinks = [
    { href: "#services", label: t("services"), isHash: true },
    { href: "#about", label: t("about"), isHash: true },
    { href: "#team", label: t("team"), isHash: true },
    { href: "#portfolio", label: t("portfolio"), isHash: true },
    { href: "#contact", label: t("contact"), isHash: true },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-16 border-b border-brand-border/60 bg-brand-darker/90 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-8">

        {/* ---- Logo ---------------------------------------- */}
        <Link
          href="/"
          className="group flex items-center gap-2 transition-opacity hover:opacity-90"
          aria-label="NGENI — Accueil"
        >
          {/* Icône carrée stylisée */}
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-accent/30 bg-brand-accent/10">
            <span className="text-sm font-black text-brand-accent">N</span>
          </div>
          <span className="text-lg font-bold tracking-tight">
            <span className="text-brand-white">NGE</span>
            <span className="text-brand-accent">NI</span>
          </span>
        </Link>

        {/* ---- Navigation desktop (masquée sur mobile) ------- */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Navigation principale"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-brand-gray transition-all duration-200 hover:bg-brand-surface hover:text-brand-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* ---- Actions droite ------------------------------- */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Sélecteur de langue — desktop uniquement */}
          <div className="hidden md:flex">
            <LanguageSwitcher />
          </div>

          {/* Bouton Auth — visible uniquement sur desktop */}
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="hidden items-center gap-2 rounded-lg border border-brand-accent/30 bg-brand-accent/10 px-4 py-2 text-sm font-semibold text-brand-accent transition-all hover:border-brand-accent/60 hover:bg-brand-accent/20 md:inline-flex"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
              {t("dashboard")}
            </Link>
          ) : (
            <Link
              href="/login"
              className="hidden items-center rounded-lg bg-brand-accent px-4 py-2 text-sm font-semibold text-white shadow-glow transition-all hover:bg-brand-accent/90 hover:shadow-glow-lg md:inline-flex"
            >
              {t("login")}
            </Link>
          )}

          {/* Menu hamburger + drawer (Client Component) */}
          <MobileMenuClient
            navLinks={navLinks}
            isLoggedIn={isLoggedIn}
            loginLabel={t("login")}
            dashboardLabel={t("dashboard")}
            logoutLabel={t("logout")}
          />
        </div>
      </div>
    </header>
  );
}

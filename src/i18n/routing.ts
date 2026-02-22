import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // Locales supportées par NGENI
  locales: ["fr", "en"],

  // Français par défaut (marché RDC / Afrique francophone)
  defaultLocale: "fr",

  // Stratégie de préfixe : toujours montrer /fr ou /en dans l'URL
  localePrefix: "always",

  // Mapping des routes par locale
  pathnames: {
    "/": "/",
    "/services": {
      fr: "/services",
      en: "/services",
    },
    "/about": {
      fr: "/a-propos",
      en: "/about",
    },
    "/contact": {
      fr: "/contact",
      en: "/contact",
    },
    "/login": {
      fr: "/connexion",
      en: "/login",
    },
    "/register": {
      fr: "/inscription",
      en: "/register",
    },
    "/dashboard": {
      fr: "/tableau-de-bord",
      en: "/dashboard",
    },
    "/dashboard/projects": {
      fr: "/tableau-de-bord/projets",
      en: "/dashboard/projects",
    },
    "/dashboard/profile": {
      fr: "/tableau-de-bord/profil",
      en: "/dashboard/profile",
    },
    "/privacy": {
      fr: "/confidentialite",
      en: "/privacy",
    },
    "/terms": {
      fr: "/conditions-utilisation",
      en: "/terms",
    },
  },
});

export type Locale = (typeof routing.locales)[number];

// Helpers de navigation type-safe (remplacement de next/navigation)
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);

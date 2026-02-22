import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { type NextRequest, NextResponse } from "next/server";

// Routes qui nécessitent une authentification
const PROTECTED_ROUTES = [
  "/dashboard",
  "/tableau-de-bord",
  "/dashboard/projects",
  "/tableau-de-bord/projets",
  "/dashboard/profile",
  "/tableau-de-bord/profil",
];

// Routes accessibles uniquement aux non-connectés
const AUTH_ROUTES = ["/login", "/connexion", "/register", "/inscription"];

// Middleware next-intl pour la détection et le routage des locales
const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Exclure les routes API, fichiers statiques et _next
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Appliquer le middleware i18n (détection locale + redirect)
  const intlResponse = intlMiddleware(request);

  // Récupérer le token de session (Auth.js / NextAuth)
  const sessionToken =
    request.cookies.get("authjs.session-token")?.value ??
    request.cookies.get("__Secure-authjs.session-token")?.value;

  const isAuthenticated = !!sessionToken;

  // Extraire le chemin sans le préfixe de locale
  const pathWithoutLocale = pathname.replace(/^\/(fr|en)/, "") || "/";

  // Protéger les routes Dashboard — rediriger vers /login si non connecté
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathWithoutLocale.startsWith(route)
  );

  if (isProtectedRoute && !isAuthenticated) {
    const locale = pathname.startsWith("/en") ? "en" : "fr";
    const loginPath = locale === "fr" ? "/fr/connexion" : "/en/login";
    const loginUrl = new URL(loginPath, request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Rediriger les utilisateurs connectés qui accèdent aux routes auth
  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathWithoutLocale.startsWith(route)
  );

  if (isAuthRoute && isAuthenticated) {
    const locale = pathname.startsWith("/en") ? "en" : "fr";
    const dashboardPath =
      locale === "fr" ? "/fr/tableau-de-bord" : "/en/dashboard";
    return NextResponse.redirect(new URL(dashboardPath, request.url));
  }

  return intlResponse;
}

export const config = {
  // Appliquer le middleware sur toutes les routes sauf API et fichiers statiques
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};

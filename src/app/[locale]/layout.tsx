import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { TRPCReactProvider } from "@/trpc/react";
import { ChatBot } from "@/components/landing/ChatBot";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScrollHandler } from "@/components/SmoothScrollHandler";
import "@/styles/globals.css";

// ── Police "Sora" — géométrique, moderne, premium ──
const fontSans = Sora({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: LocaleLayoutProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: {
      default: t("title"),
      template: `%s | NGENI`,
    },
    description: t("description"),
    keywords: t("keywords"),
    metadataBase: new URL(
      process.env.NEXTAUTH_URL ?? "http://localhost:3000"
    ),
    openGraph: {
      title: t("title"),
      description: t("description"),
      siteName: "NGENI",
      locale: locale === "fr" ? "fr_CD" : "en_ZA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  // Valider la locale — affiche 404 si invalide
  if (!routing.locales.includes(locale as "fr" | "en")) {
    notFound();
  }

  // Charger les messages de traduction côté serveur
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={`${fontSans.variable} ${fontMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#050505" />
      </head>
      <body className="min-h-screen bg-brand-black antialiased">
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <TRPCReactProvider>
              <SmoothScrollHandler />
              {children}
              <ChatBot />
            </TRPCReactProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

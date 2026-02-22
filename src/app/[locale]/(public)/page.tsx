import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Hero }         from "@/components/landing/Hero";
import { Stats }        from "@/components/landing/Stats";
import { Services }     from "@/components/landing/Services";
import { About }        from "@/components/landing/About";
import { Process }      from "@/components/landing/Process";
import { Team }         from "@/components/landing/Team";
import { Testimonials } from "@/components/landing/Testimonials";
// import { Pricing }      from "@/components/landing/Pricing"; // ÉTAPE 10 — masqué temporairement
import { Portfolio }    from "@/components/landing/Portfolio";
import { Contact }      from "@/components/landing/Contact";

// ============================================================
// Landing Page — Server Component
// Orchestre les 9 sections de la page d'accueil NGENI
// ============================================================

type HomePageProps = {
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: HomePageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function HomePage({ params: { locale } }: HomePageProps) {
  return (
    <>
      {/* 1. Hero — Plein écran, glow bicolore, badge animé, dual CTA */}
      <Hero locale={locale} />

      {/* 2. Stats — 4 compteurs animés (clients, projets, pays, uptime) */}
      <Stats />

      {/* 3. Services — Bento Grid 10 services avec icônes SVG */}
      <Services locale={locale} />

      {/* 4. About — Mission + 4 valeurs */}
      <About locale={locale} />

      {/* 5. Process — 4 étapes méthodologie NGENI */}
      <Process locale={locale} />

      {/* 6. Team — 6 membres de l'équipe en glass cards */}
      <Team locale={locale} />

      {/* 7. Testimonials — Carousel 3 clients (Framer Motion) */}
      <Testimonials />

      {/* 8. Pricing — Toggle mensuel/annuel, 3 plans Stripe-ready */}
      {/* <Pricing /> */}{/* ÉTAPE 10 — masqué temporairement */}

      {/* 8b. Portfolio — Nos Réalisations (3 projets placeholders) */}
      <Portfolio locale={locale} />

      {/* 9. Contact — Formulaire sécurisé react-hook-form + tRPC leads.create */}
      <Contact />
    </>
  );
}

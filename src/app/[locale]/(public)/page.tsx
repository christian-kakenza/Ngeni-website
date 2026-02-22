import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Hero }         from "@/components/landing/Hero";
import { Stats }        from "@/components/landing/Stats";
import { Services }     from "@/components/landing/Services";
import { About }        from "@/components/landing/About";
import { Process }      from "@/components/landing/Process";
import { Team }         from "@/components/landing/Team";
import { Testimonials } from "@/components/landing/Testimonials";
import { Portfolio }    from "@/components/landing/Portfolio";
import { Contact }      from "@/components/landing/Contact";

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
      <Hero locale={locale} />
      <Stats />
      <Services locale={locale} />
      <About locale={locale} />
      <Process locale={locale} />
      <Team locale={locale} />
      <Testimonials />
      <Portfolio locale={locale} />
      <Contact />
    </>
  );
}

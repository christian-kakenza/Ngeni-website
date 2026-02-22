import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions d'Utilisation | Terms of Service",
  description: "Conditions générales d'utilisation des services NGENI.",
  robots: { index: false, follow: false },
};

// ============================================================
// Terms of Service — Static page (FR + EN)
// Conditions Générales d'Utilisation NGENI
// ============================================================

export default function TermsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const fr = locale === "fr";

  return (
    <div className="min-h-screen bg-brand-black py-24 px-4">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-accent">
            {fr ? "Légal" : "Legal"}
          </p>
          <h1 className="text-4xl font-bold text-brand-white">
            {fr ? "Conditions Générales d'Utilisation" : "Terms of Service"}
          </h1>
          <p className="mt-3 text-sm text-brand-gray">
            {fr ? "Dernière mise à jour : février 2026" : "Last updated: February 2026"}
          </p>
        </div>

        {/* Contenu */}
        <div className="prose prose-invert max-w-none space-y-10 text-brand-gray">

          {fr ? (
            <>
              <section>
                <h2 className="text-xl font-semibold text-brand-white">1. Présentation</h2>
                <p className="mt-3 leading-relaxed">
                  Les présentes Conditions Générales d&apos;Utilisation (CGU) régissent l&apos;utilisation du site web <strong className="text-brand-white">ngeni.ai</strong> et des services proposés par NGENI, entreprise technologique domiciliée à Lubumbashi, RDC, avec un bureau à Pretoria, SA.
                </p>
                <p className="mt-3 leading-relaxed">
                  En accédant à notre site ou en utilisant nos services, vous acceptez sans réserve les présentes CGU. Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser notre site.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">2. Services proposés</h2>
                <p className="mt-3 leading-relaxed">NGENI propose des services de :</p>
                <ul className="mt-3 list-inside list-disc space-y-1.5 pl-2">
                  <li>Automatisation des processus (RPA)</li>
                  <li>Développement d&apos;agents IA et chatbots</li>
                  <li>Création de plateformes SaaS sur mesure</li>
                  <li>Développement web et applications</li>
                  <li>Solutions IA sectorielles (médical, agriculture, éducation, énergie, construction)</li>
                  <li>Conseil et formation en intelligence artificielle</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">3. Accès au site et compte utilisateur</h2>
                <p className="mt-3 leading-relaxed">
                  L&apos;accès au site est libre et gratuit. Certaines fonctionnalités (tableau de bord, gestion de projets) nécessitent la création d&apos;un compte. Vous êtes responsable de la confidentialité de vos identifiants de connexion.
                </p>
                <p className="mt-3 leading-relaxed">
                  NGENI se réserve le droit de suspendre ou de supprimer tout compte en cas de violation des présentes CGU ou d&apos;utilisation frauduleuse.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">4. Propriété intellectuelle</h2>
                <p className="mt-3 leading-relaxed">
                  L&apos;ensemble du contenu de ce site (textes, images, logos, code, design) est la propriété exclusive de NGENI ou de ses partenaires et est protégé par les lois sur la propriété intellectuelle. Toute reproduction, même partielle, est interdite sans autorisation écrite préalable.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">5. Responsabilité</h2>
                <p className="mt-3 leading-relaxed">
                  NGENI s&apos;efforce de maintenir le site disponible en permanence mais ne peut garantir l&apos;absence d&apos;interruptions. NGENI ne saurait être tenu responsable des dommages indirects résultant de l&apos;utilisation du site ou de l&apos;indisponibilité de celui-ci.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">6. Données personnelles</h2>
                <p className="mt-3 leading-relaxed">
                  Le traitement de vos données personnelles est régi par notre{" "}
                  <a href="/fr/confidentialite" className="text-brand-accent hover:underline">
                    Politique de Confidentialité
                  </a>
                  , qui fait partie intégrante des présentes CGU.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">7. Comportement des utilisateurs</h2>
                <p className="mt-3 leading-relaxed">Il est interdit d&apos;utiliser le site pour :</p>
                <ul className="mt-3 list-inside list-disc space-y-1.5 pl-2">
                  <li>Toute activité illégale ou frauduleuse</li>
                  <li>Diffuser des contenus malveillants, offensants ou trompeurs</li>
                  <li>Tenter d&apos;accéder sans autorisation aux systèmes de NGENI</li>
                  <li>Perturber le fonctionnement du site ou des services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">8. Modifications des CGU</h2>
                <p className="mt-3 leading-relaxed">
                  NGENI se réserve le droit de modifier les présentes CGU à tout moment. Les modifications seront publiées sur cette page avec la date de mise à jour. L&apos;utilisation continue du site après modification vaut acceptation des nouvelles conditions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">9. Droit applicable et juridiction</h2>
                <p className="mt-3 leading-relaxed">
                  Les présentes CGU sont soumises au droit de la République Démocratique du Congo. Tout litige sera soumis aux tribunaux compétents de Lubumbashi, RDC.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">10. Contact</h2>
                <p className="mt-3 leading-relaxed">
                  Pour toute question : <a href="mailto:contact@ngeni.ai" className="text-brand-accent hover:underline">contact@ngeni.ai</a>
                  <br />NGENI — Lubumbashi, RDC | Pretoria, SA
                </p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-xl font-semibold text-brand-white">1. Overview</h2>
                <p className="mt-3 leading-relaxed">
                  These Terms of Service govern the use of <strong className="text-brand-white">ngeni.ai</strong> and the services offered by NGENI, a technology company headquartered in Lubumbashi, DRC, with an office in Pretoria, SA.
                </p>
                <p className="mt-3 leading-relaxed">
                  By accessing our site or using our services, you unconditionally accept these Terms. If you do not accept, please do not use our site.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">2. Services</h2>
                <ul className="mt-3 list-inside list-disc space-y-1.5 pl-2">
                  <li>Process Automation (RPA)</li>
                  <li>AI Agents & Chatbot Development</li>
                  <li>Custom SaaS Platform Development</li>
                  <li>Web Development & Applications</li>
                  <li>Sector-specific AI Solutions (medical, agriculture, education, energy, construction)</li>
                  <li>AI Consulting & Training</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">3. Access & User Account</h2>
                <p className="mt-3 leading-relaxed">
                  The site is freely accessible. Some features (dashboard, project management) require account creation. You are responsible for keeping your credentials confidential. NGENI reserves the right to suspend accounts that violate these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">4. Intellectual Property</h2>
                <p className="mt-3 leading-relaxed">
                  All content on this site (text, images, logos, code, design) is the exclusive property of NGENI or its partners and is protected by intellectual property laws. Any reproduction without prior written authorization is prohibited.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">5. Liability</h2>
                <p className="mt-3 leading-relaxed">
                  NGENI strives to maintain site availability but cannot guarantee the absence of interruptions. NGENI shall not be liable for indirect damages resulting from the use or unavailability of the site.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">6. Personal Data</h2>
                <p className="mt-3 leading-relaxed">
                  Processing of your personal data is governed by our{" "}
                  <a href="/en/privacy" className="text-brand-accent hover:underline">
                    Privacy Policy
                  </a>
                  , which forms an integral part of these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">7. User Conduct</h2>
                <p className="mt-3 leading-relaxed">You may not use this site for:</p>
                <ul className="mt-3 list-inside list-disc space-y-1.5 pl-2">
                  <li>Any illegal or fraudulent activity</li>
                  <li>Distributing malicious, offensive, or deceptive content</li>
                  <li>Attempting unauthorized access to NGENI systems</li>
                  <li>Disrupting the operation of the site or services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">8. Modifications</h2>
                <p className="mt-3 leading-relaxed">
                  NGENI reserves the right to modify these Terms at any time. Changes will be posted on this page with the updated date. Continued use of the site after modification constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">9. Governing Law</h2>
                <p className="mt-3 leading-relaxed">
                  These Terms are governed by the law of the Democratic Republic of Congo. Any dispute shall be submitted to the competent courts of Lubumbashi, DRC.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">10. Contact</h2>
                <p className="mt-3 leading-relaxed">
                  For any questions: <a href="mailto:contact@ngeni.ai" className="text-brand-accent hover:underline">contact@ngeni.ai</a>
                  <br />NGENI — Lubumbashi, DRC | Pretoria, SA
                </p>
              </section>
            </>
          )}
        </div>

        {/* Back link */}
        <div className="mt-16 border-t border-brand-border pt-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-brand-accent hover:text-brand-accent/80"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {fr ? "Retour à l'accueil" : "Back to home"}
          </a>
        </div>

      </div>
    </div>
  );
}

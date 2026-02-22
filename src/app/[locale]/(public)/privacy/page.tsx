import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Privacy Policy",
  description: "Politique de confidentialité de NGENI — Comment nous collectons, utilisons et protégeons vos données.",
  robots: { index: false, follow: false },
};

// ============================================================
// Privacy Policy — Static page (FR + EN)
// Politique de confidentialité NGENI
// ============================================================

export default function PrivacyPage({
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
            {fr ? "Politique de Confidentialité" : "Privacy Policy"}
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
                <h2 className="text-xl font-semibold text-brand-white">1. Introduction</h2>
                <p className="mt-3 leading-relaxed">
                  NGENI («&nbsp;nous&nbsp;», «&nbsp;notre&nbsp;» ou «&nbsp;la Société&nbsp;») est une entreprise technologique africaine spécialisée dans l&apos;intelligence artificielle et l&apos;automatisation des processus, basée à Lubumbashi, République Démocratique du Congo, avec un bureau à Pretoria, Afrique du Sud.
                </p>
                <p className="mt-3 leading-relaxed">
                  La présente Politique de Confidentialité décrit la manière dont nous collectons, utilisons, stockons et protégeons vos données personnelles lorsque vous utilisez notre site web <strong className="text-brand-white">ngeni.ai</strong> et nos services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">2. Données collectées</h2>
                <p className="mt-3 leading-relaxed">Nous pouvons collecter les types de données suivants :</p>
                <ul className="mt-3 list-inside list-disc space-y-1.5 pl-2">
                  <li><strong className="text-brand-white">Données d&apos;identification</strong> : nom, prénom, adresse email</li>
                  <li><strong className="text-brand-white">Données de contact</strong> : numéro de téléphone, nom de votre entreprise</li>
                  <li><strong className="text-brand-white">Données de projet</strong> : description de votre projet, service souhaité</li>
                  <li><strong className="text-brand-white">Données techniques</strong> : adresse IP, type de navigateur, pages visitées (via des outils d&apos;analyse)</li>
                  <li><strong className="text-brand-white">Données de compte</strong> : identifiants de connexion (mot de passe haché) si vous créez un compte</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">3. Finalités du traitement</h2>
                <p className="mt-3 leading-relaxed">Nous utilisons vos données pour :</p>
                <ul className="mt-3 list-inside list-disc space-y-1.5 pl-2">
                  <li>Répondre à vos demandes de contact et de devis</li>
                  <li>Gérer votre compte client et vos projets sur notre plateforme</li>
                  <li>Améliorer nos services et l&apos;expérience utilisateur</li>
                  <li>Vous informer de nos actualités (uniquement avec votre consentement)</li>
                  <li>Respecter nos obligations légales et contractuelles</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">4. Base légale du traitement</h2>
                <p className="mt-3 leading-relaxed">
                  Le traitement de vos données est fondé sur : votre consentement explicite, l&apos;exécution d&apos;un contrat, notre intérêt légitime à améliorer nos services, et le respect de nos obligations légales.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">5. Partage des données</h2>
                <p className="mt-3 leading-relaxed">
                  Nous ne vendons pas vos données personnelles à des tiers. Nous pouvons partager vos données avec :
                </p>
                <ul className="mt-3 list-inside list-disc space-y-1.5 pl-2">
                  <li>Nos prestataires techniques (hébergement, base de données, email) soumis à des accords de confidentialité</li>
                  <li>Les autorités compétentes si la loi l&apos;exige</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">6. Conservation des données</h2>
                <p className="mt-3 leading-relaxed">
                  Vos données sont conservées aussi longtemps que nécessaire pour les finalités décrites, et supprimées sur simple demande, sauf obligation légale contraire.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">7. Vos droits</h2>
                <p className="mt-3 leading-relaxed">Vous disposez des droits suivants sur vos données personnelles :</p>
                <ul className="mt-3 list-inside list-disc space-y-1.5 pl-2">
                  <li>Droit d&apos;accès et de rectification</li>
                  <li>Droit à l&apos;effacement («&nbsp;droit à l&apos;oubli&nbsp;»)</li>
                  <li>Droit d&apos;opposition et de limitation du traitement</li>
                  <li>Droit à la portabilité de vos données</li>
                </ul>
                <p className="mt-3 leading-relaxed">
                  Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@ngeni.ai" className="text-brand-accent hover:underline">contact@ngeni.ai</a>
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">8. Sécurité</h2>
                <p className="mt-3 leading-relaxed">
                  Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou destruction (chiffrement, accès restreint, authentification sécurisée).
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">9. Contact</h2>
                <p className="mt-3 leading-relaxed">
                  Pour toute question relative à cette politique : <a href="mailto:contact@ngeni.ai" className="text-brand-accent hover:underline">contact@ngeni.ai</a>
                  <br />NGENI — Lubumbashi, RDC | Pretoria, SA
                </p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-xl font-semibold text-brand-white">1. Introduction</h2>
                <p className="mt-3 leading-relaxed">
                  NGENI ("we", "our", or "the Company") is an African technology company specializing in artificial intelligence and process automation, headquartered in Lubumbashi, Democratic Republic of Congo, with an office in Pretoria, South Africa.
                </p>
                <p className="mt-3 leading-relaxed">
                  This Privacy Policy describes how we collect, use, store, and protect your personal data when you use our website <strong className="text-brand-white">ngeni.ai</strong> and our services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">2. Data We Collect</h2>
                <p className="mt-3 leading-relaxed">We may collect the following types of data:</p>
                <ul className="mt-3 list-inside list-disc space-y-1.5 pl-2">
                  <li><strong className="text-brand-white">Identification data</strong>: name, email address</li>
                  <li><strong className="text-brand-white">Contact data</strong>: phone number, company name</li>
                  <li><strong className="text-brand-white">Project data</strong>: project description, desired service</li>
                  <li><strong className="text-brand-white">Technical data</strong>: IP address, browser type, pages visited</li>
                  <li><strong className="text-brand-white">Account data</strong>: login credentials (hashed password) if you create an account</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">3. Purpose of Processing</h2>
                <ul className="mt-3 list-inside list-disc space-y-1.5 pl-2">
                  <li>Respond to contact and quote requests</li>
                  <li>Manage your client account and projects on our platform</li>
                  <li>Improve our services and user experience</li>
                  <li>Send you updates (only with your consent)</li>
                  <li>Comply with legal and contractual obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">4. Legal Basis</h2>
                <p className="mt-3 leading-relaxed">
                  Processing is based on: your explicit consent, contract performance, our legitimate interest in improving services, and legal obligations.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">5. Data Sharing</h2>
                <p className="mt-3 leading-relaxed">
                  We do not sell your personal data. We may share data with trusted technical providers (hosting, database, email) bound by confidentiality agreements, or with authorities when required by law.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">6. Retention</h2>
                <p className="mt-3 leading-relaxed">
                  Your data is retained as long as necessary for the stated purposes and deleted upon request, unless legally required otherwise.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">7. Your Rights</h2>
                <ul className="mt-3 list-inside list-disc space-y-1.5 pl-2">
                  <li>Right of access and rectification</li>
                  <li>Right to erasure ("right to be forgotten")</li>
                  <li>Right to object and restrict processing</li>
                  <li>Right to data portability</li>
                </ul>
                <p className="mt-3 leading-relaxed">
                  To exercise these rights: <a href="mailto:contact@ngeni.ai" className="text-brand-accent hover:underline">contact@ngeni.ai</a>
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">8. Security</h2>
                <p className="mt-3 leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your data against unauthorized access, loss, or destruction (encryption, restricted access, secure authentication).
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-brand-white">9. Contact</h2>
                <p className="mt-3 leading-relaxed">
                  For any privacy-related questions: <a href="mailto:contact@ngeni.ai" className="text-brand-accent hover:underline">contact@ngeni.ai</a>
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

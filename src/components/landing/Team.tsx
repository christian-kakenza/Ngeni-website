import { getTranslations } from "next-intl/server";

// ============================================================
// Team — Server Component
// Équipe NGENI — membres réels + placeholders
// ============================================================

type TeamProps = { locale: string };

const TEAM_MEMBERS = [
  {
    name: "Christian Kakenza",
    role: "ceo" as const,
    bio: "Expert Full-Stack. Deep expertise en Next.js, tRPC, Prisma et architecture cloud. Fondateur et visionnaire de NGENI.",
    initials: "CK",
    accentFrom: "from-brand-accent",
    accentTo: "to-[#1f6feb]",
    socials: { linkedin: null as string | null, github: null as string | null, twitter: null as string | null },
  },
  {
    name: "Jade Mabaso",
    role: "ai_engineer" as const,
    bio: "Ingénieur IA spécialisé en NLP, vision par ordinateur et agents autonomes LLM. Co-fondateur de NGENI.",
    initials: "JM",
    accentFrom: "from-violet-500",
    accentTo: "to-brand-accent",
    socials: { linkedin: null as string | null, github: null as string | null, twitter: null as string | null },
  },
  {
    name: "David Nsapu",
    role: "cto" as const,
    bio: "Architecte IA certifié Google & AWS. Expert en systèmes distribués et intelligence artificielle appliquée.",
    initials: "DN",
    accentFrom: "from-emerald-500",
    accentTo: "to-brand-accent",
    socials: { linkedin: null as string | null, github: null as string | null, twitter: null as string | null },
  },
];

// ---- Social icons ------------------------------------------

const IconLinkedIn = () => (
  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const IconGitHub = () => (
  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const IconTwitterX = () => (
  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// ---- Main Component ----------------------------------------

export async function Team({ locale }: TeamProps) {
  const t = await getTranslations({ locale, namespace: "team" });

  return (
    <section id="team" className="section-padding relative overflow-hidden bg-brand-dark">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-brand-accent/[0.04] blur-[120px]" />

      <div className="container-max relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-brand-white md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-brand-gray">{t("subtitle")}</p>
        </div>

        {/* Grid — 3 membres centrés */}
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM_MEMBERS.map(({ name, role, bio, initials, accentFrom, accentTo, socials }) => (
            <div
              key={name}
              className="group rounded-2xl border border-brand-border bg-brand-surface/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-brand-accent/25 hover:bg-brand-surface/50 hover:shadow-glass"
            >
              {/* Avatar */}
              <div
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${accentFrom} ${accentTo} text-lg font-black text-white shadow-glow`}
              >
                {initials}
              </div>

              {/* Info */}
              <h3 className="font-bold text-brand-white">{name}</h3>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-brand-accent">
                {t(`roles.${role}`)}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-brand-gray">{bio}</p>

              {/* Divider */}
              <div className="mt-4 h-px bg-gradient-to-r from-brand-accent/20 to-transparent" />

              {/* Social links */}
              <div className="mt-3 flex gap-2">
                {socials.linkedin && (
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name} — LinkedIn`}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-brand-border bg-brand-surface text-brand-gray/40 transition-all hover:border-[#0077b5]/40 hover:bg-[#0077b5]/10 hover:text-[#0077b5]"
                  >
                    <IconLinkedIn />
                  </a>
                )}
                {socials.github && (
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name} — GitHub`}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-brand-border bg-brand-surface text-brand-gray/40 transition-all hover:border-white/20 hover:bg-white/5 hover:text-brand-white"
                  >
                    <IconGitHub />
                  </a>
                )}
                {socials.twitter && (
                  <a
                    href={socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name} — Twitter / X`}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-brand-border bg-brand-surface text-brand-gray/40 transition-all hover:border-white/20 hover:bg-white/5 hover:text-brand-white"
                  >
                    <IconTwitterX />
                  </a>
                )}
                {!socials.linkedin && !socials.github && !socials.twitter && (
                  <span className="text-xs italic text-brand-gray/30">
                    {locale === "fr" ? "Bientôt disponible" : "Coming soon"}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

// ============================================================
// Testimonials — Client Component
// Infinite auto-scroll ticker — pause on hover, drag on touch
// ============================================================

const TESTIMONIALS = [
  {
    id: 0,
    content:
      "NGENI a révolutionné notre gestion des dossiers patients. L'automatisation a réduit nos erreurs administratives de 85% en seulement trois mois. Un partenaire technologique de confiance absolue.",
    author: "Dr. Emmanuel Ngoy",
    role: "Directeur Médical",
    company: "Clinique Centrale de Kinshasa",
    initials: "EN",
    accentColor: "from-brand-accent to-[#1f6feb]",
    rating: 5,
  },
  {
    id: 1,
    content:
      "Grâce à leur solution IA pour la détection des maladies des cultures, nos rendements agricoles ont augmenté de 40% cette saison. NGENI comprend vraiment les réalités africaines.",
    author: "Sarah Mwamba",
    role: "CEO & Fondatrice",
    company: "AgriConnect DRC",
    initials: "SM",
    accentColor: "from-emerald-500 to-brand-accent",
    rating: 5,
  },
  {
    id: 2,
    content:
      "La plateforme e-learning développée par NGENI a transformé notre façon d'enseigner. Plus de 5 000 étudiants utilisent notre plateforme chaque jour avec un taux de satisfaction de 97%.",
    author: "Prof. Jean-Pierre Kabila",
    role: "Directeur IT",
    company: "Université de Kinshasa",
    initials: "JK",
    accentColor: "from-violet-500 to-brand-accent",
    rating: 5,
  },
] as const;

// ---- Bold "NGENI" helper ------------------------------------

function BoldNGENI({ text }: { text: string }) {
  const parts = text.split("NGENI");
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <strong className="font-bold text-brand-white">NGENI</strong>
          )}
        </span>
      ))}
    </>
  );
}

// ---- Sub-components ----------------------------------------

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-amber-400">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

type Testimonial = (typeof TESTIMONIALS)[number];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="relative w-[340px] shrink-0 rounded-2xl border border-brand-border bg-brand-surface/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-brand-accent/25 hover:bg-brand-surface/50 md:w-[420px]">
      {/* Quote icon */}
      <div className="absolute right-6 top-5 text-brand-accent/8">
        <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Stars */}
      <StarRating count={testimonial.rating} />

      {/* Content */}
      <blockquote className="mt-4 text-sm leading-relaxed text-brand-white/90 md:text-base">
        &ldquo;<BoldNGENI text={testimonial.content} />&rdquo;
      </blockquote>

      {/* Author */}
      <div className="mt-6 flex items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${testimonial.accentColor} text-xs font-black text-white shadow-glow`}
        >
          {testimonial.initials}
        </div>
        <div>
          <p className="text-sm font-bold text-brand-white">{testimonial.author}</p>
          <p className="text-xs text-brand-gray">
            {testimonial.role} — {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}

// ---- Main Component ----------------------------------------

// Duplicate array for seamless infinite loop
const TRACK_ITEMS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

export function Testimonials() {
  const t = useTranslations("testimonials");
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const isPaused = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Start at the beginning of the second copy for seamless looping in both directions
    const oneThird = track.scrollWidth / 3;
    track.scrollLeft = oneThird;

    const SPEED = 0.45; // px per frame ≈ 27px/s at 60fps

    const tick = () => {
      if (!isPaused.current && track) {
        track.scrollLeft += SPEED;
        // When we pass the second copy, loop back to the first copy seamlessly
        if (track.scrollLeft >= (track.scrollWidth / 3) * 2) {
          track.scrollLeft -= track.scrollWidth / 3;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(resumeTimer.current);
    };
  }, []);

  const pause = () => {
    isPaused.current = true;
    clearTimeout(resumeTimer.current);
  };

  const scrollPrev = () => {
    if (!trackRef.current) return;
    pause();
    trackRef.current.scrollBy({ left: -365, behavior: "smooth" });
    resume(1500);
  };

  const scrollNext = () => {
    if (!trackRef.current) return;
    pause();
    trackRef.current.scrollBy({ left: 365, behavior: "smooth" });
    resume(1500);
  };

  const resume = (delay = 0) => {
    clearTimeout(resumeTimer.current);
    if (delay > 0) {
      resumeTimer.current = setTimeout(() => {
        isPaused.current = false;
      }, delay);
    } else {
      isPaused.current = false;
    }
  };

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden bg-brand-black">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent/[0.04] blur-[120px]" />

      <div className="relative z-10">
        {/* Header */}
        <div className="container-max mb-14 text-center">
          <h2 className="text-4xl font-bold text-brand-white md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-brand-gray">{t("subtitle")}</p>
        </div>

        {/* Ticker wrapper — full bleed, faded edges */}
        <div className="relative">
          {/* Left fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-brand-black to-transparent md:w-28" />
          {/* Right fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-brand-black to-transparent md:w-28" />

          {/* Scrollable track */}
          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto pb-3 pt-1 [&::-webkit-scrollbar]:hidden"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              paddingLeft: "clamp(1rem, 8vw, 10rem)",
              paddingRight: "clamp(1rem, 8vw, 10rem)",
              cursor: "grab",
            }}
            onMouseEnter={pause}
            onMouseLeave={() => resume()}
            onTouchStart={pause}
            onTouchEnd={() => resume(1500)}
            // On native scroll (e.g. touchpad), pause briefly then resume
            onScroll={() => {
              pause();
              resume(1200);
            }}
          >
            {TRACK_ITEMS.map((testimonial, i) => (
              <TestimonialCard key={i} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* Mobile navigation arrows — hidden on md+ */}
        <div className="container-max mt-6 flex justify-center gap-4 md:hidden">
          <button
            onClick={scrollPrev}
            aria-label="Témoignage précédent"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-border bg-brand-surface text-brand-gray transition-all hover:border-brand-accent/30 hover:text-brand-white"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            aria-label="Témoignage suivant"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-border bg-brand-surface text-brand-gray transition-all hover:border-brand-accent/30 hover:text-brand-white"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

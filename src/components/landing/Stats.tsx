"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

// ============================================================
// Stats — Client Component
// 4 compteurs animés déclenchés à l'entrée dans le viewport
// ============================================================

function AnimatedCounter({
  target,
  suffix = "",
  decimals = 0,
}: {
  target: number;
  suffix?: string;
  decimals?: number;
}) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (started) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setStarted(true);
        io.disconnect();

        const duration = 2200;
        const startTime = performance.now();

        const tick = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(eased * target);
          if (progress < 1) requestAnimationFrame(tick);
          else setValue(target);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [target, started]);

  const display =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.floor(value).toLocaleString();

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function Stats() {
  const t = useTranslations("hero");

  const stats: Array<{ target: number; suffix: string; label: string; decimals?: number; icon: ReactNode }> = [
    {
      target: 50,
      suffix: "+",
      label: t("stats.clients"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
    },
    {
      target: 120,
      suffix: "+",
      label: t("stats.projects"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      ),
    },
    {
      target: 5,
      suffix: "",
      label: t("stats.countries"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
    },
    {
      target: 99.9,
      suffix: "%",
      decimals: 1,
      label: t("stats.uptime"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
    },
  ] as const;

  return (
    <section className="relative border-y border-brand-border/60 bg-brand-darker">
      {/* Subtle top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="grid grid-cols-2 gap-0 divide-y divide-brand-border/40 md:grid-cols-4 md:divide-x md:divide-y-0">
          {stats.map(({ target, suffix, decimals, label, icon }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 px-6 py-8 text-center"
            >
              {/* Icon */}
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-border bg-brand-surface text-brand-accent/70">
                {icon}
              </div>

              {/* Counter */}
              <p className="text-4xl font-black tracking-tight text-brand-white md:text-5xl">
                <AnimatedCounter
                  target={target}
                  suffix={suffix}
                  decimals={decimals ?? 0}
                />
              </p>

              {/* Label */}
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-gray">
                {label}
              </p>

              {/* Accent line */}
              <div className="h-0.5 w-8 rounded-full bg-gradient-to-r from-brand-accent/50 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

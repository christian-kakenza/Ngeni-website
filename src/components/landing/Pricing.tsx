"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

// ============================================================
// Pricing — Client Component
// 3 plans avec toggle mensuel/annuel (Stripe-ready)
// ============================================================

type PlanFeature = { ok: boolean; text: string };

type Plan = {
  id: "starter" | "pro" | "enterprise";
  monthlyPrice: number | null;
  annualPrice: number | null;
  popular?: boolean;
  features: PlanFeature[];
};

function CheckIcon({ ok }: { ok: boolean }) {
  if (ok) {
    return (
      <svg className="h-4 w-4 shrink-0 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    );
  }
  return (
    <svg className="h-4 w-4 shrink-0 text-brand-gray/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function Pricing() {
  const t = useTranslations("pricing");
  const locale = useLocale();
  const fr = locale === "fr";

  const [annual, setAnnual] = useState(false);

  const getFeatures = (plan: "starter" | "pro" | "enterprise"): PlanFeature[] => {
    const starterFeatures: PlanFeature[] = [
      { ok: true,  text: fr ? "1 service déployé"               : "1 deployed service" },
      { ok: true,  text: fr ? "Jusqu'à 3 utilisateurs"           : "Up to 3 users" },
      { ok: true,  text: fr ? "Support par email"                : "Email support" },
      { ok: true,  text: fr ? "Analytics basique"                : "Basic analytics" },
      { ok: true,  text: fr ? "Accès API standard"               : "Standard API access" },
      { ok: false, text: fr ? "Intégrations personnalisées"      : "Custom integrations" },
      { ok: false, text: fr ? "SLA garanti"                      : "Guaranteed SLA" },
      { ok: false, text: fr ? "Support dédié"                    : "Dedicated support" },
    ];

    const proFeatures: PlanFeature[] = [
      { ok: true,  text: fr ? "Jusqu'à 5 services déployés"      : "Up to 5 deployed services" },
      { ok: true,  text: fr ? "Jusqu'à 20 utilisateurs"          : "Up to 20 users" },
      { ok: true,  text: fr ? "Support prioritaire 24h"          : "Priority support 24h" },
      { ok: true,  text: fr ? "Analytics avancé + rapports"      : "Advanced analytics + reports" },
      { ok: true,  text: fr ? "Accès API complet"                : "Full API access" },
      { ok: true,  text: fr ? "Intégrations personnalisées"      : "Custom integrations" },
      { ok: false, text: fr ? "SLA garanti"                      : "Guaranteed SLA" },
      { ok: false, text: fr ? "Gestionnaire de compte dédié"     : "Dedicated account manager" },
    ];

    const enterpriseFeatures: PlanFeature[] = [
      { ok: true,  text: fr ? "Services illimités"               : "Unlimited services" },
      { ok: true,  text: fr ? "Utilisateurs illimités"           : "Unlimited users" },
      { ok: true,  text: fr ? "Support dédié 24h/7j"            : "Dedicated 24/7 support" },
      { ok: true,  text: fr ? "Analytique temps réel"            : "Real-time analytics" },
      { ok: true,  text: fr ? "API et accès complet"             : "Full API access" },
      { ok: true,  text: fr ? "Intégrations sur mesure"          : "Custom integrations" },
      { ok: true,  text: fr ? "SLA 99.9% garanti"               : "99.9% SLA guaranteed" },
      { ok: true,  text: fr ? "Gestionnaire de compte dédié"     : "Dedicated account manager" },
    ];

    if (plan === "starter") return starterFeatures;
    if (plan === "pro") return proFeatures;
    return enterpriseFeatures;
  };

  const plans: Plan[] = [
    {
      id: "starter",
      monthlyPrice: 199,
      annualPrice: 159,
      features: getFeatures("starter"),
    },
    {
      id: "pro",
      monthlyPrice: 499,
      annualPrice: 399,
      popular: true,
      features: getFeatures("pro"),
    },
    {
      id: "enterprise",
      monthlyPrice: null,
      annualPrice: null,
      features: getFeatures("enterprise"),
    },
  ];

  return (
    <section id="pricing" className="section-padding relative overflow-hidden bg-brand-dark">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-brand-accent/[0.05] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-[#1f6feb]/[0.06] blur-[100px]" />

      <div className="container-max relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-brand-white md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-brand-gray">{t("subtitle")}</p>

          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-brand-border bg-brand-surface/50 p-1 backdrop-blur-sm">
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200",
                !annual
                  ? "bg-brand-accent text-white shadow-sm"
                  : "text-brand-gray hover:text-brand-white"
              )}
            >
              {t("billing.monthly")}
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200",
                annual
                  ? "bg-brand-accent text-white shadow-sm"
                  : "text-brand-gray hover:text-brand-white"
              )}
            >
              {t("billing.annual")}
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                {t("billing.save")}
              </span>
            </button>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-2xl border backdrop-blur-sm transition-all duration-300",
                plan.popular
                  ? "border-brand-accent/50 bg-brand-surface/60 shadow-glow"
                  : "border-brand-border bg-brand-surface/30 hover:border-brand-accent/20 hover:shadow-glass"
              )}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-brand-accent px-4 py-1 text-xs font-bold text-white shadow-glow">
                    {t("plans.pro.badge")}
                  </span>
                </div>
              )}

              {/* Top accent */}
              {plan.popular && (
                <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-brand-accent to-transparent" />
              )}

              <div className="flex flex-1 flex-col p-7">
                {/* Plan name */}
                <div>
                  <h3 className="text-lg font-bold text-brand-white">
                    {t(`plans.${plan.id}.name`)}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-brand-gray">
                    {t(`plans.${plan.id}.description`)}
                  </p>
                </div>

                {/* Price */}
                <div className="my-7 border-y border-brand-border/50 py-7">
                  {plan.monthlyPrice !== null ? (
                    <div className="flex items-end gap-1.5">
                      <span className="text-5xl font-black tracking-tight text-brand-white">
                        ${annual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className="mb-1.5 text-sm text-brand-gray">
                        / {t("billing.monthly").toLowerCase()}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-end gap-1.5">
                      <span className="text-4xl font-black tracking-tight text-brand-white">
                        {fr ? "Sur mesure" : "Custom"}
                      </span>
                    </div>
                  )}
                  {plan.monthlyPrice !== null && annual && (
                    <p className="mt-1.5 text-xs text-brand-gray/60">
                      {fr ? `Facturé $${(plan.annualPrice ?? 0) * 12}/an` : `Billed $${(plan.annualPrice ?? 0) * 12}/year`}
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="flex flex-1 flex-col gap-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckIcon ok={feature.ok} />
                      <span
                        className={cn(
                          "text-sm",
                          feature.ok ? "text-brand-gray" : "text-brand-gray/35"
                        )}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-8">
                  {plan.id === "enterprise" ? (
                    <a
                      href="#contact"
                      className={cn(
                        "block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all duration-300",
                        "border border-brand-accent/30 bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/20"
                      )}
                    >
                      {t("plans.enterprise.cta")}
                    </a>
                  ) : (
                    <Link
                      href="/login"
                      className={cn(
                        "block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all duration-300",
                        plan.popular
                          ? "bg-brand-accent text-white shadow-glow hover:bg-brand-accent/90 hover:shadow-glow-lg"
                          : "border border-brand-border bg-brand-surface text-brand-white hover:border-brand-accent/30 hover:bg-brand-surface/80"
                      )}
                    >
                      {t(`plans.${plan.id}.cta`)}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="mt-10 text-center text-sm text-brand-gray/50">
          {fr
            ? "Tous les prix sont en USD. Annulation possible à tout moment. Paiement sécurisé via Stripe."
            : "All prices in USD. Cancel anytime. Secure payment via Stripe."}
        </p>
      </div>
    </section>
  );
}

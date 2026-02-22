"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations, useLocale } from "next-intl";
import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";

// ============================================================
// Contact — Client Component
// Formulaire sécurisé : react-hook-form + Zod + tRPC leads.create
// ============================================================

const SERVICE_KEYS = [
  "rpa", "agents", "saas", "web", "medical",
  "agriculture", "education", "energy", "construction", "consulting",
] as const;

type ServiceKey = typeof SERVICE_KEYS[number];

const contactSchema = z.object({
  name: z.string().min(2, "Minimum 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.enum(SERVICE_KEYS, { errorMap: () => ({ message: "Choisissez un service" }) }),
  message: z.string().min(10, "Minimum 10 caractères"),
});

type ContactFormData = z.infer<typeof contactSchema>;

function FormField({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-brand-gray">
        {label}
        {required && <span className="ml-1 text-brand-accent">*</span>}
      </label>
      {children}
      {error && (
        <span className="flex items-center gap-1.5 text-xs text-red-400">
          <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
}

const inputBase =
  "w-full rounded-xl border border-brand-border bg-brand-surface/50 px-4 py-3 text-sm text-brand-white placeholder-brand-gray/40 backdrop-blur-sm transition-all duration-200 focus:border-brand-accent/50 focus:bg-brand-surface/80 focus:outline-none focus:ring-1 focus:ring-brand-accent/30";

export function Contact() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const fr = locale === "fr";

  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const createLead = api.leads.create.useMutation({
    onSuccess: () => {
      setIsSuccess(true);
      reset();
    },
  });

  const onSubmit = (data: ContactFormData) => {
    createLead.mutate({ ...data, source: "contact_form" });
  };

  const serviceLabels: Record<ServiceKey, string> = {
    rpa:          fr ? "Automatisation des Processus (RPA)"  : "Process Automation (RPA)",
    agents:       fr ? "Agents IA & Chatbots"               : "AI Agents & Chatbots",
    saas:         fr ? "SaaS sur Mesure"                    : "Custom SaaS Platform",
    web:          fr ? "Développement Web"                  : "Web Development",
    medical:      fr ? "Solutions IA Médicales"             : "Medical AI Solutions",
    agriculture:  fr ? "IA & AgriTech"                     : "AI & AgriTech",
    education:    fr ? "EduTech & IA"                       : "EduTech & AI",
    energy:       fr ? "Optimisation Énergétique"           : "Energy Optimization",
    construction: fr ? "Construction & Smart Building"      : "Construction & Smart Building",
    consulting:   fr ? "Conseil & Formation IA"             : "AI Consulting & Training",
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-brand-darker">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-brand-accent/[0.04] blur-[130px]" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-[300px] w-[300px] rounded-full bg-[#1f6feb]/[0.05] blur-[100px]" />

      <div className="container-max relative z-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">

          {/* Left — Info */}
          <div>
            <h2 className="text-4xl font-bold text-brand-white md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-brand-gray">
              {t("subtitle")}
            </p>

            {/* Contact info cards */}
            <div className="mt-10 space-y-4">
              {/* Email */}
              <div className="flex items-center gap-4 rounded-2xl border border-brand-border bg-brand-surface/30 p-4 backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-accent/20 bg-brand-accent/10 text-brand-accent">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-gray/60">Email</p>
                  <a
                    href={`mailto:${t("info.email")}`}
                    className="text-sm font-medium text-brand-white hover:text-brand-accent"
                  >
                    {t("info.email")}
                  </a>
                </div>
              </div>

              {/* Bureaux — 2 locations */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-start gap-3 rounded-2xl border border-brand-border bg-brand-surface/30 p-4 backdrop-blur-sm">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-brand-accent/20 bg-brand-accent/10 text-brand-accent">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-gray/60">
                      {fr ? "Bureau DRC" : "DRC Office"}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-brand-white">Lubumbashi, RDC</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-brand-border bg-brand-surface/30 p-4 backdrop-blur-sm">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-brand-accent/20 bg-brand-accent/10 text-brand-accent">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-gray/60">
                      {fr ? "Bureau SA" : "SA Office"}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-brand-white">Pretoria, SA</p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-center gap-4 rounded-2xl border border-brand-border bg-brand-surface/30 p-4 backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-accent/20 bg-brand-accent/10 text-brand-accent">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-gray/60">
                    {fr ? "Horaires" : "Hours"}
                  </p>
                  <p className="text-sm font-medium text-brand-white">{t("info.hours")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="rounded-2xl border border-brand-border bg-brand-surface/30 p-8 backdrop-blur-sm">
            {/* Success state */}
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-white">
                    {fr ? "Message envoyé !" : "Message sent!"}
                  </h3>
                  <p className="mt-2 text-sm text-brand-gray">{t("form.success")}</p>
                </div>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-2 text-sm text-brand-accent underline underline-offset-4 hover:text-brand-accent/80"
                >
                  {fr ? "Envoyer un autre message" : "Send another message"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

                {/* Row 1: Name + Email */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FormField label={t("form.name")} error={errors.name?.message} required>
                    <input
                      {...register("name")}
                      placeholder={t("form.name_placeholder")}
                      className={cn(inputBase, errors.name && "border-red-500/50")}
                    />
                  </FormField>
                  <FormField label={t("form.email")} error={errors.email?.message} required>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder={t("form.email_placeholder")}
                      className={cn(inputBase, errors.email && "border-red-500/50")}
                    />
                  </FormField>
                </div>

                {/* Row 2: Phone + Company */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FormField label={t("form.phone")} error={errors.phone?.message}>
                    <input
                      {...register("phone")}
                      placeholder={t("form.phone_placeholder")}
                      className={inputBase}
                    />
                  </FormField>
                  <FormField label={t("form.company")} error={errors.company?.message}>
                    <input
                      {...register("company")}
                      placeholder={t("form.company_placeholder")}
                      className={inputBase}
                    />
                  </FormField>
                </div>

                {/* Service select */}
                <FormField label={t("form.service")} error={errors.service?.message} required>
                  <select
                    {...register("service")}
                    className={cn(
                      inputBase,
                      "cursor-pointer appearance-none",
                      errors.service && "border-red-500/50"
                    )}
                    defaultValue=""
                  >
                    <option value="" disabled className="bg-brand-dark text-brand-gray">
                      {t("form.service_placeholder")}
                    </option>
                    {SERVICE_KEYS.map((key) => (
                      <option key={key} value={key} className="bg-brand-dark text-brand-white">
                        {serviceLabels[key]}
                      </option>
                    ))}
                  </select>
                </FormField>

                {/* Message */}
                <FormField label={t("form.message")} error={errors.message?.message} required>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder={t("form.message_placeholder")}
                    className={cn(inputBase, "resize-none", errors.message && "border-red-500/50")}
                  />
                </FormField>

                {/* tRPC Error */}
                {createLead.isError && (
                  <div className="flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    {t("form.error")}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={createLead.isPending}
                  className={cn(
                    "flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300",
                    createLead.isPending
                      ? "cursor-not-allowed bg-brand-accent/50"
                      : "bg-brand-accent shadow-glow hover:bg-brand-accent/90 hover:shadow-glow-lg"
                  )}
                >
                  {createLead.isPending ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {t("form.submitting")}
                    </>
                  ) : (
                    <>
                      {t("form.submit")}
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

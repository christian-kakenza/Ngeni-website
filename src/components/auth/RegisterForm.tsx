"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { registerSchema } from "@/lib/validations/auth.schema";
import { api } from "@/trpc/react";
import type { z } from "zod";
import { cn } from "@/lib/utils";

// ============================================================
// RegisterForm — Client Component
// react-hook-form + Zod + tRPC auth.register + auto signIn
// ============================================================

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const t = useTranslations("auth.register");
  const locale = useLocale();
  const passwordRef = useRef<string>("");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = api.auth.register.useMutation({
    onSuccess: async (_, variables) => {
      // Auto sign-in after registration
      const result = await signIn("credentials", {
        email: variables.email,
        password: passwordRef.current,
        redirect: false,
      });
      if (!result?.error) {
        window.location.href = `/${locale}/${locale === "fr" ? "tableau-de-bord" : "dashboard"}`;
      }
    },
    onError: (error) => {
      if (error.data?.code === "CONFLICT") {
        setServerError(t("error_email"));
      } else {
        setServerError(error.message);
      }
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    setServerError(null);
    passwordRef.current = data.password;
    registerMutation.mutate(data);
  };

  const isPending = isSubmitting || registerMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {/* Server error */}
      {serverError && (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9.303 3.376c.866 1.5-.217 3.374-1.948 3.374H2.645c-1.73 0-2.813-1.874-1.948-3.374L10.05 3.378c.866-1.5 3.032-1.5 3.898 0L21.303 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          {serverError}
        </div>
      )}

      {/* Full name */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-brand-gray">
          {t("name")}
        </label>
        <input
          {...register("name")}
          type="text"
          autoComplete="name"
          placeholder="Jean Mukeba"
          className={cn(
            "w-full rounded-xl border bg-brand-surface/40 px-4 py-3 text-sm text-brand-white outline-none backdrop-blur-sm transition-all duration-200 placeholder:text-brand-gray/40",
            "focus:border-brand-accent/50 focus:bg-brand-surface/60 focus:ring-1 focus:ring-brand-accent/30",
            errors.name ? "border-red-500/50 bg-red-500/5" : "border-brand-border"
          )}
        />
        {errors.name && (
          <p className="text-xs text-red-400">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-brand-gray">
          {t("email")}
        </label>
        <input
          {...register("email")}
          type="email"
          autoComplete="email"
          placeholder="vous@exemple.com"
          className={cn(
            "w-full rounded-xl border bg-brand-surface/40 px-4 py-3 text-sm text-brand-white outline-none backdrop-blur-sm transition-all duration-200 placeholder:text-brand-gray/40",
            "focus:border-brand-accent/50 focus:bg-brand-surface/60 focus:ring-1 focus:ring-brand-accent/30",
            errors.email ? "border-red-500/50 bg-red-500/5" : "border-brand-border"
          )}
        />
        {errors.email && (
          <p className="text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-brand-gray">
          {t("password")}
        </label>
        <input
          {...register("password")}
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          className={cn(
            "w-full rounded-xl border bg-brand-surface/40 px-4 py-3 text-sm text-brand-white outline-none backdrop-blur-sm transition-all duration-200 placeholder:text-brand-gray/40",
            "focus:border-brand-accent/50 focus:bg-brand-surface/60 focus:ring-1 focus:ring-brand-accent/30",
            errors.password ? "border-red-500/50 bg-red-500/5" : "border-brand-border"
          )}
        />
        {errors.password && (
          <p className="text-xs text-red-400">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm password */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-brand-gray">
          {t("confirm_password")}
        </label>
        <input
          {...register("confirmPassword")}
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          className={cn(
            "w-full rounded-xl border bg-brand-surface/40 px-4 py-3 text-sm text-brand-white outline-none backdrop-blur-sm transition-all duration-200 placeholder:text-brand-gray/40",
            "focus:border-brand-accent/50 focus:bg-brand-surface/60 focus:ring-1 focus:ring-brand-accent/30",
            errors.confirmPassword ? "border-red-500/50 bg-red-500/5" : "border-brand-border"
          )}
        />
        {errors.confirmPassword && (
          <p className="text-xs text-red-400">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className={cn(
          "relative mt-1 w-full overflow-hidden rounded-xl py-3 text-sm font-semibold text-white transition-all duration-300",
          "bg-brand-accent shadow-glow hover:bg-brand-accent/90 hover:shadow-glow-lg",
          "disabled:cursor-not-allowed disabled:opacity-60"
        )}
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {t("submit")}…
          </span>
        ) : (
          t("submit")
        )}
      </button>

      {/* Login link */}
      <p className="text-center text-sm text-brand-gray">
        {t("already_account")}{" "}
        <Link
          href="/login"
          className="font-semibold text-brand-accent hover:text-brand-accent/80 transition-colors"
        >
          {t("login_link")}
        </Link>
      </p>
    </form>
  );
}

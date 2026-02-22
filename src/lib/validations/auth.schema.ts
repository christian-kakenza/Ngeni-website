import { z } from "zod";

// ============================================================
// Auth — Schémas de validation Zod
// ============================================================

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email requis" })
    .email("Format d'email invalide")
    .toLowerCase()
    .trim(),
  password: z
    .string({ required_error: "Mot de passe requis" })
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

export const registerSchema = z
  .object({
    name: z
      .string({ required_error: "Nom requis" })
      .min(2, "Le nom doit contenir au moins 2 caractères")
      .max(100, "Le nom est trop long")
      .trim(),
    email: z
      .string({ required_error: "Email requis" })
      .email("Format d'email invalide")
      .toLowerCase()
      .trim(),
    password: z
      .string({ required_error: "Mot de passe requis" })
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre"
      ),
    confirmPassword: z.string({ required_error: "Confirmation requise" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

import { z } from "zod";

// ============================================================
// Lead (AI Concierge + Contact) — Schémas de validation Zod
// ============================================================

export const SERVICE_KEYS = [
  "rpa",
  "agents",
  "saas",
  "web",
  "medical",
  "agriculture",
  "education",
  "energy",
  "construction",
  "consulting",
] as const;

export const leadCreateSchema = z.object({
  name: z
    .string({ required_error: "Nom requis" })
    .min(2, "Nom trop court")
    .max(200)
    .trim(),
  email: z
    .string({ required_error: "Email requis" })
    .email("Format d'email invalide")
    .toLowerCase()
    .trim(),
  phone: z
    .string()
    .regex(/^[\+\d\s\-\(\)]{7,20}$/, "Numéro de téléphone invalide")
    .optional()
    .or(z.literal("")),
  company: z.string().max(200).trim().optional().or(z.literal("")),
  message: z
    .string({ required_error: "Message requis" })
    .min(20, "Message trop court (minimum 20 caractères)")
    .max(5000, "Message trop long")
    .trim(),
  service: z.enum(SERVICE_KEYS).optional(),
  source: z.enum(["chatbot", "contact_form", "landing"]).default("contact_form"),
});

export type LeadCreateInput = z.infer<typeof leadCreateSchema>;

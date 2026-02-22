import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// ============================================================
// WHITEBOXAi — Seed de développement
// Crée des données réalistes pour tester le Dashboard
//
// Comptes créés :
//   ADMIN  → admin@whitebox.ai    / Admin1234!
//   CLIENT → client@whitebox.ai   / Client1234!
// ============================================================

const db = new PrismaClient();

async function main() {
  console.log("🌱  Seeding WHITEBOXAi database…\n");

  // ── 1. Nettoyage (idempotent) ────────────────────────────────────────────
  await db.task.deleteMany();
  await db.project.deleteMany();
  await db.lead.deleteMany();
  await db.session.deleteMany();
  await db.account.deleteMany();
  await db.user.deleteMany();

  // ── 2. Utilisateurs ─────────────────────────────────────────────────────
  const adminHash  = await bcrypt.hash("Admin1234!", 12);
  const clientHash = await bcrypt.hash("Client1234!", 12);

  const admin = await db.user.create({
    data: {
      email:        "admin@whitebox.ai",
      passwordHash: adminHash,
      name:         "Admin WHITEBOXAi",
      role:         "ADMIN",
    },
  });

  const client = await db.user.create({
    data: {
      email:        "client@whitebox.ai",
      passwordHash: clientHash,
      name:         "Jean-Baptiste Mulamba",
      role:         "CLIENT",
    },
  });

  console.log("✅  Users created:");
  console.log(`    ADMIN  → ${admin.email}`);
  console.log(`    CLIENT → ${client.email}\n`);

  // ── 3. Projet 1 — En cours (60 % terminé) ───────────────────────────────
  const project1 = await db.project.create({
    data: {
      title:       "Plateforme SaaS RH — Groupe Kivu",
      description: "Développement d'une plateforme SaaS de gestion des ressources humaines avec module de paie automatisé, tableau de bord analytique et intégration des agents IA pour les entretiens virtuels.",
      status:      "IN_PROGRESS",
      clientId:    client.id,
      budget:      48000,
      startDate:   new Date("2025-01-10"),
      endDate:     new Date(Date.now() + 25 * 24 * 60 * 60 * 1000), // +25 jours
      tasks: {
        create: [
          { title: "Architecture backend & schéma DB",         status: "DONE",        priority: "HIGH",   dueDate: new Date("2025-01-25") },
          { title: "API REST tRPC — modules Users & Auth",      status: "DONE",        priority: "HIGH",   dueDate: new Date("2025-02-05") },
          { title: "Dashboard Admin — vue analytique",          status: "DONE",        priority: "MEDIUM", dueDate: new Date("2025-02-15") },
          { title: "Module de paie automatisé",                 status: "DONE",        priority: "URGENT", dueDate: new Date("2025-02-28") },
          { title: "Intégration Agent IA — entretiens RH",      status: "IN_PROGRESS", priority: "HIGH",   dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
          { title: "Tests E2E & sécurité OWASP",                status: "IN_PROGRESS", priority: "HIGH",   dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) },
          { title: "Déploiement staging + recette client",      status: "TODO",        priority: "MEDIUM", dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000) },
          { title: "Mise en production & formation équipe",     status: "TODO",        priority: "MEDIUM", dueDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000) },
          { title: "Documentation technique & API guide",       status: "TODO",        priority: "LOW",    dueDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000) },
          { title: "Handover & SLA support 3 mois",             status: "TODO",        priority: "LOW",    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
        ],
      },
    },
  });

  // ── 4. Projet 2 — En révision (80 % terminé) ────────────────────────────
  const project2 = await db.project.create({
    data: {
      title:       "Agent IA Commercial — Congo Telecom",
      description: "Déploiement d'un agent IA conversationnel pour la gestion des leads entrants, qualification automatique et routing intelligent vers les équipes commerciales. Intégration CRM Salesforce.",
      status:      "REVIEW",
      clientId:    client.id,
      budget:      22500,
      startDate:   new Date("2024-11-01"),
      endDate:     new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // +6 jours (urgent)
      tasks: {
        create: [
          { title: "Spécifications fonctionnelles & use cases",         status: "DONE",        priority: "HIGH",   dueDate: new Date("2024-11-15") },
          { title: "Modélisation des flux de conversation",              status: "DONE",        priority: "HIGH",   dueDate: new Date("2024-11-30") },
          { title: "Développement agent NLP — intent recognition",       status: "DONE",        priority: "URGENT", dueDate: new Date("2024-12-20") },
          { title: "Intégration API Salesforce CRM",                     status: "DONE",        priority: "HIGH",   dueDate: new Date("2025-01-10") },
          { title: "Interface de monitoring temps réel",                  status: "DONE",        priority: "MEDIUM", dueDate: new Date("2025-01-25") },
          { title: "Tests de charge (10k conversations/jour)",            status: "DONE",        priority: "HIGH",   dueDate: new Date("2025-02-05") },
          { title: "Fine-tuning modèle sur données sectorielles",         status: "DONE",        priority: "HIGH",   dueDate: new Date("2025-02-12") },
          { title: "Recette client & ajustements UX",                     status: "DONE",        priority: "MEDIUM", dueDate: new Date("2025-02-18") },
          { title: "Validation finale des performances (KPIs)",           status: "IN_PROGRESS", priority: "URGENT", dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) },
          { title: "Déploiement production & activation live",            status: "TODO",        priority: "URGENT", dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000) },
        ],
      },
    },
  });

  // ── 5. Projet 3 — Terminé (100 %) ───────────────────────────────────────
  const project3 = await db.project.create({
    data: {
      title:       "Site Web Corporate — Minafet",
      description: "Conception et développement du site institutionnel du Ministère des Affaires Étrangères avec interface multilingue (FR/EN/SW), gestion de contenu headless CMS et intégration chatbot.",
      status:      "COMPLETED",
      clientId:    client.id,
      budget:      8500,
      startDate:   new Date("2024-09-01"),
      endDate:     new Date("2024-12-15"),
      tasks: {
        create: [
          { title: "Charte graphique & maquettes Figma",    status: "DONE", priority: "HIGH",   dueDate: new Date("2024-09-20") },
          { title: "Développement frontend Next.js",        status: "DONE", priority: "HIGH",   dueDate: new Date("2024-10-20") },
          { title: "CMS headless Contentful — setup",       status: "DONE", priority: "MEDIUM", dueDate: new Date("2024-11-01") },
          { title: "Internationalisation FR/EN/SW",         status: "DONE", priority: "MEDIUM", dueDate: new Date("2024-11-15") },
          { title: "SEO technique & Core Web Vitals",       status: "DONE", priority: "MEDIUM", dueDate: new Date("2024-11-25") },
          { title: "Intégration ChatBot assistance",        status: "DONE", priority: "LOW",    dueDate: new Date("2024-12-01") },
          { title: "Tests cross-browser & responsive",      status: "DONE", priority: "HIGH",   dueDate: new Date("2024-12-08") },
          { title: "Mise en production & remise des clés",  status: "DONE", priority: "HIGH",   dueDate: new Date("2024-12-15") },
        ],
      },
    },
  });

  console.log("✅  Projects created:");
  console.log(`    [IN_PROGRESS]  ${project1.title}`);
  console.log(`    [REVIEW]       ${project2.title}`);
  console.log(`    [COMPLETED]    ${project3.title}\n`);

  // ── 6. Leads de démo ────────────────────────────────────────────────────
  await db.lead.createMany({
    data: [
      {
        name:    "Marie Kabila",
        email:   "m.kabila@rawbankgroup.cd",
        company: "Rawbank",
        message: "Nous cherchons une solution IA pour automatiser notre service client et réduire les délais de traitement des demandes. Budget disponible : 50 000 USD.",
        service: "agents",
        source:  "chatbot",
      },
      {
        name:    "Pierre Lumumba",
        email:   "p.lumumba@gecamines.cd",
        phone:   "+243 81 234 5678",
        company: "Gécamines",
        message: "Intéressé par une plateforme SaaS pour la gestion de nos opérations minières avec suivi en temps réel via IoT et dashboard analytique.",
        service: "saas",
        source:  "landing",
      },
      {
        name:    "Sophia Mobutu",
        email:   "sophia.mobutu@airtelrdc.com",
        company: "Airtel RDC",
        message: "Projet de déploiement d'agents IA pour notre call center. Nous traitons 10 000 appels/jour. Besoin d'une demo.",
        service: "agents",
        source:  "contact_form",
      },
    ],
  });

  console.log("✅  3 demo leads created\n");

  // ── Résumé final ─────────────────────────────────────────────────────────
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🎉  Seed terminé avec succès !\n");
  console.log("  Connexion ADMIN   →  admin@whitebox.ai   /  Admin1234!");
  console.log("  Connexion CLIENT  →  client@whitebox.ai  /  Client1234!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main()
  .catch((e) => {
    console.error("❌  Seed error:", e);
    process.exit(1);
  })
  .finally(() => void db.$disconnect());

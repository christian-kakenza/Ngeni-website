"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { X, Send, Loader2, Sparkles, Zap } from "lucide-react";
import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";

// ============================================================
// WBOX AI Concierge — Phase 8
// • Authenticated  → live project progress + next deadline
// • Unauthenticated → sales flow for 10 services + lead capture
// • No external AI API — scripted multilingual conversation
// ============================================================

// ── Types ─────────────────────────────────────────────────────────────────────

type QR  = { label: string; value: string };
type Msg = {
  id: string;
  role: "bot" | "user";
  text: string;
  qrs?: QR[];
  showProjects?: boolean;
};

type Flow =
  | "welcome"
  | "service_list"
  | "service_detail"
  | "lead_name"
  | "lead_email"
  | "lead_service"
  | "lead_message"
  | "lead_done"
  | "project_check";

type SK =
  | "rpa" | "agents" | "saas" | "web" | "medical"
  | "agriculture" | "education" | "energy" | "construction" | "consulting";

// ── Services catalogue ─────────────────────────────────────────────────────────

const SVC: Record<SK, { fr: { n: string; p: string }; en: { n: string; p: string } }> = {
  rpa:          { fr: { n: "RPA & Automatisation",      p: "Nos robots logiciels automatisent vos processus répétitifs. Économies jusqu'à 70 %, zéro erreur humaine." },                 en: { n: "RPA & Automation",          p: "Software robots automate repetitive tasks. Up to 70% savings, zero human error." } },
  agents:       { fr: { n: "Agents IA Autonomes",       p: "Des agents IA qui décident et agissent de façon autonome 24h/24. Scalables à l'infini." },                                   en: { n: "Autonomous AI Agents",       p: "AI agents that decide and act autonomously 24/7. Infinitely scalable." } },
  saas:         { fr: { n: "Développement SaaS",        p: "De l'idée au SaaS scalable : cloud, sécurité, paiements, analytics — tout inclus." },                                         en: { n: "SaaS Development",           p: "From idea to scalable SaaS: cloud, security, payments, analytics — all included." } },
  web:          { fr: { n: "Web & Mobile Premium",      p: "Applications web et mobiles hautes performances, UI/UX de classe mondiale, 100 % responsive." },                              en: { n: "Premium Web & Mobile",       p: "High-performance web & mobile apps, world-class UI/UX, 100% responsive." } },
  medical:      { fr: { n: "Solutions Médicales IA",    p: "Diagnostic IA, dossiers patients intelligents, télémédecine — la technologie au service de la santé." },                      en: { n: "AI Medical Solutions",       p: "AI diagnostics, smart patient records, telemedicine — technology for healthcare." } },
  agriculture:  { fr: { n: "AgriTech Intelligente",     p: "IoT, analyse prédictive des cultures, gestion des ressources — maximisez vos rendements." },                                  en: { n: "Smart AgriTech",             p: "IoT sensors, crop predictive analytics, resource management — maximize yields." } },
  education:    { fr: { n: "EdTech IA",                 p: "Plateformes adaptatives, tuteurs IA personnalisés, analytics pédagogiques — l'école du futur." },                             en: { n: "AI EdTech",                  p: "Adaptive learning platforms, AI tutors, educational analytics — the school of the future." } },
  energy:       { fr: { n: "Énergie & Smart Grid",      p: "Gestion intelligente de l'énergie, prédiction de consommation, optimisation du réseau électrique." },                         en: { n: "Energy & Smart Grid",        p: "Smart energy management, consumption prediction, grid optimization." } },
  construction: { fr: { n: "Construction Intelligente", p: "BIM augmenté, suivi de chantier IA, détection de risques, logistique optimisée." },                                           en: { n: "Smart Construction",         p: "Enhanced BIM, AI site monitoring, risk detection, optimized logistics." } },
  consulting:   { fr: { n: "Consulting IA Stratégique", p: "Audit IA, roadmap de transformation digitale, accompagnement par nos experts certifiés." },                                   en: { n: "Strategic AI Consulting",    p: "AI audit, digital transformation roadmap, guidance from certified experts." } },
};

const SKS = Object.keys(SVC) as SK[];

// ── ID generator ──────────────────────────────────────────────────────────────
let _uid = 0;
const uid = () => `m${++_uid}`;

// ── Component ─────────────────────────────────────────────────────────────────

export function ChatBot() {
  const locale  = useLocale();
  const fr      = locale === "fr";

  // ── tRPC ──────────────────────────────────────────────────────────────────
  // Use api.auth.me as auth-detection — throws UNAUTHORIZED when not logged in
  const { data: me, isLoading: meLoading } = api.auth.me.useQuery(undefined, {
    retry: false,
  });

  const { data: projects } = api.projects.getAll.useQuery(undefined, {
    enabled: !!me,
  });

  const createLead = api.leads.create.useMutation();

  // ── Local state ────────────────────────────────────────────────────────────
  const [open,    setOpen]    = useState(false);
  const [msgs,    setMsgs]    = useState<Msg[]>([]);
  const [flow,    setFlow]    = useState<Flow>("welcome");
  const [typing,  setTyping]  = useState(false);
  const [inp,     setInp]     = useState("");
  const [inpErr,  setInpErr]  = useState<string | null>(null);
  const [inited,  setInited]  = useState(false);
  const [activeSvc, setActiveSvc] = useState<SK | null>(null);
  const [lead, setLead] = useState<{
    name?: string; email?: string; service?: SK; message?: string;
  }>({});

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  // Focus input when open
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350);
  }, [open]);

  // ── Message helpers ────────────────────────────────────────────────────────

  const botSay = useCallback(
    (text: string, qrs?: QR[], extra?: Partial<Msg>, delay = 870) => {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMsgs(prev => [...prev, { id: uid(), role: "bot", text, qrs, ...extra }]);
      }, delay);
    },
    []
  );

  const userSay  = useCallback((text: string) => {
    setMsgs(prev => [...prev, { id: uid(), role: "user", text }]);
  }, []);

  const clearQRs = useCallback(() => {
    setMsgs(prev => prev.map(m => ({ ...m, qrs: undefined })));
  }, []);

  // ── Conversation init ──────────────────────────────────────────────────────

  const initConv = useCallback(() => {
    if (inited || meLoading) return;
    setInited(true);

    if (me) {
      const name = me.name?.split(" ")[0];
      botSay(
        fr
          ? `Bonjour **${name ?? ""}** ! 👋 Je suis **WBOX**, votre concierge IA.\n\nComment puis-je vous aider aujourd'hui ?`
          : `Hello **${name ?? ""}**! 👋 I'm **WBOX**, your AI concierge.\n\nHow can I help you today?`,
        [
          { label: fr ? "📊 Avancement de mes projets" : "📊 My project status",   value: "check_projects" },
          { label: fr ? "🔧 Nos solutions IA"           : "🔧 Our AI solutions",     value: "discover"        },
          { label: fr ? "💬 Parler à un expert"         : "💬 Talk to an expert",    value: "expert"          },
        ],
        undefined, 620
      );
    } else {
      botSay(
        fr
          ? `Bonjour ! 👋 Je suis **WBOX**, le concierge IA de **NGENI**.\n\nNous créons des solutions IA sur-mesure pour transformer votre entreprise. Comment puis-je vous aider ?`
          : `Hello! 👋 I'm **WBOX**, **NGENI**'s AI concierge.\n\nWe build custom AI solutions to transform your business. How can I help?`,
        [
          { label: fr ? "🚀 Découvrir nos services" : "🚀 Discover our services", value: "discover" },
          { label: fr ? "💰 Obtenir un devis"        : "💰 Get a quote",           value: "quote"    },
          { label: fr ? "💬 Parler à un expert"      : "💬 Talk to an expert",     value: "expert"   },
        ],
        undefined, 620
      );
    }
  }, [inited, meLoading, me, fr, botSay]);

  useEffect(() => {
    if (open && !inited && !meLoading) initConv();
  }, [open, inited, meLoading, initConv]);

  // ── Start lead flow ────────────────────────────────────────────────────────

  const startLead = useCallback((svc?: SK) => {
    if (svc) { setActiveSvc(svc); setLead(prev => ({ ...prev, service: svc })); }
    setFlow("lead_name");
    botSay(
      fr
        ? `Parfait ! 🎯 Pour vous proposer une solution sur-mesure, j'ai besoin de quelques informations.\n\n**Quel est votre nom complet ?**`
        : `Perfect! 🎯 To prepare a custom proposal, I need a few details.\n\n**What is your full name?**`
    );
  }, [fr, botSay]);

  // ── Quick-reply / action handler ───────────────────────────────────────────

  const handleAction = useCallback((value: string, label: string) => {
    clearQRs();
    userSay(label);

    // ── Lead service selection ─────────────────────────────────────────────
    if (value.startsWith("lsvc_")) {
      const k = value.slice(5) as SK;
      setLead(prev => ({ ...prev, service: k }));
      setFlow("lead_message");
      botSay(
        fr
          ? `**${SVC[k].fr.n}** — excellent choix !\n\n**Décrivez brièvement votre projet** (min. 20 caractères) :`
          : `**${SVC[k].en.n}** — excellent choice!\n\n**Briefly describe your project** (min. 20 chars):`
      );
      return;
    }

    // ── Service catalogue ──────────────────────────────────────────────────
    if (value.startsWith("svc_")) {
      const k = value.slice(4) as SK;
      setActiveSvc(k);
      setFlow("service_detail");
      const s = SVC[k][fr ? "fr" : "en"];
      botSay(
        `**${s.n}**\n\n${s.p}`,
        [
          { label: fr ? "✅ Je suis intéressé(e)"  : "✅ I'm interested",   value: `go_${k}` },
          { label: fr ? "← Autres services"         : "← Other services",   value: "discover" },
        ]
      );
      return;
    }

    // ── Interested in a specific service ───────────────────────────────────
    if (value.startsWith("go_")) {
      startLead(value.slice(3) as SK);
      return;
    }

    switch (value) {
      case "check_projects": {
        setFlow("project_check");
        if (!projects?.length) {
          botSay(
            fr
              ? "Vous n'avez pas encore de projets actifs. Notre équipe prépare votre espace ! 🚧"
              : "No active projects yet. Our team is preparing your space! 🚧",
            [{ label: fr ? "💬 Contacter l'équipe" : "💬 Contact team", value: "expert" }]
          );
        } else {
          botSay(
            fr
              ? `Voici l'état de vos **${projects.length} projet(s)** :`
              : `Here's your **${projects.length} project(s)** status:`,
            [{ label: fr ? "💬 Parler à un expert" : "💬 Talk to an expert", value: "expert" }],
            { showProjects: true }
          );
        }
        break;
      }

      case "discover": {
        setFlow("service_list");
        botSay(
          fr
            ? "Voici nos **10 solutions IA** spécialisées. Laquelle vous intéresse ?"
            : "Here are our **10 specialized AI solutions**. Which one interests you?",
          SKS.map(k => ({ label: SVC[k][fr ? "fr" : "en"].n, value: `svc_${k}` }))
        );
        break;
      }

      case "expert":
      case "quote": {
        startLead(activeSvc ?? undefined);
        break;
      }

      default: {
        botSay(
          fr
            ? "Je transmets votre demande à notre équipe. Puis-je vous aider autrement ?"
            : "Forwarding your request to our team. Can I help with anything else?",
          [{ label: fr ? "💬 Contacter l'équipe" : "💬 Contact team", value: "expert" }]
        );
      }
    }
  }, [clearQRs, userSay, fr, botSay, projects, activeSvc, startLead]);

  // ── Text input submit ──────────────────────────────────────────────────────

  const handleSend = useCallback(async () => {
    const text = inp.trim();
    if (!text || typing) return;
    setInpErr(null);
    setInp("");

    switch (flow) {
      case "lead_name": {
        if (text.length < 2) {
          setInpErr(fr ? "Nom trop court" : "Name too short");
          setInp(text);
          return;
        }
        userSay(text);
        setLead(prev => ({ ...prev, name: text }));
        setFlow("lead_email");
        botSay(
          fr
            ? `Merci **${text.split(" ")[0]}** ! 😊\n\n**Quelle est votre adresse email ?**`
            : `Thank you **${text.split(" ")[0]}**! 😊\n\n**What is your email address?**`
        );
        break;
      }

      case "lead_email": {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
          setInpErr(fr ? "Email invalide" : "Invalid email");
          setInp(text);
          return;
        }
        userSay(text);
        setLead(prev => ({ ...prev, email: text }));

        // Skip service selection if already chosen
        if (lead.service ?? activeSvc) {
          setLead(prev => ({ ...prev, service: prev.service ?? activeSvc ?? undefined }));
          setFlow("lead_message");
          botSay(
            fr
              ? "**Décrivez votre projet ou besoin** (min. 20 caractères) :"
              : "**Describe your project or need** (min. 20 chars):"
          );
        } else {
          setFlow("lead_service");
          botSay(
            fr ? "**Quel service vous intéresse ?**" : "**Which service are you interested in?**",
            SKS.map(k => ({ label: SVC[k][fr ? "fr" : "en"].n, value: `lsvc_${k}` }))
          );
        }
        break;
      }

      case "lead_message": {
        if (text.length < 20) {
          setInpErr(
            fr ? `Trop court (${text.length}/20 caractères min)` : `Too short (${text.length}/20 chars min)`
          );
          setInp(text);
          return;
        }
        userSay(text);
        const finalLead = { ...lead, message: text };
        setFlow("lead_done");
        setTyping(true);

        try {
          await createLead.mutateAsync({
            name:    finalLead.name!,
            email:   finalLead.email!,
            service: finalLead.service,
            message: finalLead.message!,
            source:  "chatbot",
          });
        } catch {
          // Silent — UX doesn't reveal anti-spam or errors
        }

        setTimeout(() => {
          setTyping(false);
          setMsgs(prev => [
            ...prev,
            {
              id: uid(), role: "bot",
              text: fr
                ? `✅ **Message bien reçu !**\n\nMerci **${finalLead.name?.split(" ")[0]}**, notre équipe analysera votre demande et vous contactera sous **24h** à l'adresse **${finalLead.email}**.\n\nÀ très bientôt ! 🚀`
                : `✅ **Message received!**\n\nThank you **${finalLead.name?.split(" ")[0]}**, our team will review your request and reach out within **24h** at **${finalLead.email}**.\n\nSee you soon! 🚀`,
              qrs: [{ label: fr ? "🔧 Voir nos services" : "🔧 Explore services", value: "discover" }],
            },
          ]);
        }, 1400);
        break;
      }

      default: {
        userSay(text);
        botSay(
          fr
            ? "Je suis encore en apprentissage pour cette requête. Notre équipe peut vous aider directement !"
            : "Still learning for this specific query. Our team can help directly!",
          [{ label: fr ? "💬 Contacter l'équipe" : "💬 Contact team", value: "expert" }]
        );
      }
    }
  }, [inp, typing, flow, fr, userSay, botSay, lead, activeSvc, createLead]);

  const handleKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void handleSend(); }
  }, [handleSend]);

  // ── Project cards ──────────────────────────────────────────────────────────

  const projectCards = projects?.map(p => {
    const done  = p.tasks.filter(t => t.status === "DONE").length;
    const total = p.tasks.length;
    const pct   = total > 0 ? Math.round((done / total) * 100) : 0;
    const daysLeft = p.endDate
      ? Math.ceil((new Date(p.endDate).getTime() - Date.now()) / 86_400_000)
      : null;
    const urgent = daysLeft !== null && daysLeft <= 7;

    return (
      <div key={p.id} className="mt-2 rounded-xl border border-brand-border/50 bg-brand-black/50 p-3">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-bold leading-tight text-brand-white">{p.title}</p>
          <span className={cn(
            "shrink-0 text-[9px] font-bold uppercase tracking-wider",
            urgent ? "text-amber-400" : pct === 100 ? "text-emerald-400" : "text-brand-gray/50"
          )}>
            {daysLeft === null   ? "—"
              : daysLeft <= 0    ? (fr ? "Dépassée" : "Overdue")
              : daysLeft === 1   ? (fr ? "Demain" : "Tomorrow")
              : fr ? `${daysLeft}j` : `${daysLeft}d`}
          </span>
        </div>
        <div className="mt-2">
          <div className="mb-1 flex justify-between text-[10px] text-brand-gray/50">
            <span>{pct}% {fr ? "terminé" : "done"}</span>
            <span>{done}/{total} {fr ? "tâches" : "tasks"}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-brand-border">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-700",
                pct === 100
                  ? "bg-emerald-400"
                  : "bg-gradient-to-r from-brand-accent to-violet-500"
              )}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    );
  });

  // ── Markdown bold renderer ─────────────────────────────────────────────────
  function bold(text: string): React.ReactNode {
    return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
      part.startsWith("**") && part.endsWith("**")
        ? <strong key={i} className="font-bold text-brand-white">{part.slice(2, -2)}</strong>
        : <span key={i}>{part}</span>
    );
  }

  // ── Input visibility ───────────────────────────────────────────────────────
  const showInput   = ["lead_name", "lead_email", "lead_message"].includes(flow);
  const inputType   = flow === "lead_email" ? "email" : "text";
  const placeholder =
    flow === "lead_name"    ? (fr ? "Votre nom complet…"     : "Your full name…")
    : flow === "lead_email" ? (fr ? "votre@email.com"         : "your@email.com")
    : fr ? "Décrivez votre projet…" : "Describe your project…";

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Floating action button ──────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.button
              key="fab"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={() => setOpen(true)}
              className="relative flex h-14 w-14 items-center justify-center rounded-full"
              aria-label={fr ? "Ouvrir le chat IA" : "Open AI chat"}
            >
              {/* Bicolor animated glow */}
              <span className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-brand-accent via-violet-500 to-brand-accent opacity-50 blur-xl" />
              <span className="absolute inset-[-3px] animate-spin-slow rounded-full bg-gradient-to-br from-brand-accent to-violet-600 opacity-30 blur-sm"
                style={{ animationDuration: "4s" }} />
              {/* Button face */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-accent to-violet-600 shadow-2xl" />
              {/* Icon */}
              <Sparkles className="relative z-10 h-5 w-5 text-white" />
              {/* Online indicator */}
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 shadow-md">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
            </motion.button>
          ) : (
            <motion.button
              key="close"
              initial={{ scale: 0, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 90, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={() => setOpen(false)}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-border bg-brand-surface text-brand-gray/60 shadow-xl transition-colors hover:text-brand-white"
              aria-label={fr ? "Fermer" : "Close"}
            >
              <X className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Backdrop click-outside — Action 2 ───────────────────────────────── */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Chat window — toujours monté pour persister l'état — Action 3 ──── */}
      <motion.div
            initial={false}
            animate={{
              opacity: open ? 1 : 0,
              y: open ? 0 : 24,
              scale: open ? 1 : 0.94,
            }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="fixed bottom-24 right-6 z-50 flex w-[360px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-brand-black/80 backdrop-blur-2xl"
            style={{
              pointerEvents: open ? "auto" : "none",
              height: "clamp(380px, 520px, 85vh)",
              boxShadow: "0 0 60px rgba(0,102,255,0.10), 0 32px 64px rgba(0,0,0,0.55)",
            }}
          >
            {/* Header */}
            <div className="relative shrink-0 flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
              {/* top accent line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent/60 to-transparent" />

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-accent to-violet-600 shadow-glow">
                <Sparkles className="h-4 w-4 text-white" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-black text-brand-white">
                  WBOX <span className="text-brand-accent">AI</span>
                </p>
                <p className="flex items-center gap-1.5 text-[11px] text-brand-gray/50">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  {fr ? "Concierge en ligne" : "Concierge online"}
                </p>
              </div>

              <div className="flex items-center gap-1.5 rounded-full border border-brand-accent/20 bg-brand-accent/10 px-2.5 py-1 text-[10px] font-bold text-brand-accent">
                <Zap className="h-3 w-3" />
                AI
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 [scrollbar-width:thin]">
              <AnimatePresence initial={false}>
                {msgs.map(msg => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className={cn(
                      "flex flex-col gap-1.5",
                      msg.role === "user" ? "items-end" : "items-start"
                    )}
                  >
                    {/* Bubble */}
                    <div className={cn(
                      "max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line",
                      msg.role === "user"
                        ? "rounded-tr-sm bg-gradient-to-br from-brand-accent to-violet-600 text-white"
                        : "rounded-tl-sm border border-white/10 bg-white/5 text-brand-gray/80"
                    )}>
                      {msg.role === "bot" ? bold(msg.text) : msg.text}

                      {/* Inline project cards */}
                      {msg.showProjects && (
                        <div className="mt-1 space-y-0">{projectCards}</div>
                      )}
                    </div>

                    {/* Quick replies */}
                    {msg.qrs && msg.qrs.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 max-w-[90%]">
                        {msg.qrs.map(qr => (
                          <motion.button
                            key={qr.value}
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => handleAction(qr.value, qr.label)}
                            className="rounded-xl border border-brand-accent/25 bg-brand-accent/10 px-3 py-1.5 text-[11px] font-semibold text-brand-accent transition-all hover:bg-brand-accent/20 hover:border-brand-accent/40"
                          >
                            {qr.label}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex"
                  >
                    <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-white/10 bg-white/5 px-3.5 py-3">
                      {[0, 1, 2].map(i => (
                        <motion.span
                          key={i}
                          className="block h-1.5 w-1.5 rounded-full bg-brand-accent"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* Input area */}
            <AnimatePresence>
              {showInput && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="shrink-0 border-t border-white/10 px-3 py-3"
                >
                  {inpErr && (
                    <p className="mb-1.5 text-[11px] font-medium text-red-400">{inpErr}</p>
                  )}
                  <div className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type={inputType}
                      value={inp}
                      onChange={e => { setInp(e.target.value); setInpErr(null); }}
                      onKeyDown={handleKey}
                      placeholder={placeholder}
                      disabled={typing || flow === "lead_done"}
                      className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-brand-white placeholder-brand-gray/30 outline-none transition-all focus:border-brand-accent/50 focus:bg-white/[0.08] disabled:opacity-50"
                    />
                    <button
                      onClick={() => void handleSend()}
                      disabled={!inp.trim() || typing || flow === "lead_done"}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-accent to-violet-600 text-white shadow transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {typing
                        ? <Loader2 className="h-4 w-4 animate-spin" />
                        : <Send className="h-3.5 w-3.5" />
                      }
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
    </>
  );
}

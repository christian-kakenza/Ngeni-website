// ============================================================
// email.ts — Notifications email via Resend (HTTP API)
// Pas de dépendance npm supplémentaire — utilise fetch natif
// ============================================================

type LeadEmailData = {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  message: string;
  source: string;
};

const SERVICE_LABELS: Record<string, string> = {
  rpa:          "Automatisation des Processus (RPA)",
  agents:       "Agents IA & Chatbots",
  saas:         "SaaS sur Mesure",
  web:          "Développement Web",
  medical:      "Solutions IA Médicales",
  agriculture:  "IA & AgriTech",
  education:    "EduTech & IA",
  energy:       "Optimisation Énergétique",
  construction: "Construction & Smart Building",
  consulting:   "Conseil & Formation IA",
};

/**
 * Envoie une notification email à christian.kakenza0@gmail.com
 * quand un nouveau lead est créé via le formulaire de contact.
 * Si RESEND_API_KEY n'est pas configuré, la fonction échoue silencieusement.
 */
export async function sendLeadNotificationEmail(lead: LeadEmailData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const emailTo = process.env.EMAIL_TO ?? "christian.kakenza0@gmail.com";

  if (!apiKey || !apiKey.startsWith("re_")) {
    // Resend non configuré — skip silencieux
    return;
  }

  const serviceLabel = lead.service
    ? (SERVICE_LABELS[lead.service] ?? lead.service)
    : "Non spécifié";

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #050505; color: #f0f6fc; padding: 32px; border-radius: 16px; border: 1px solid #21262d;">
      <div style="margin-bottom: 24px;">
        <div style="display: inline-flex; align-items: center; gap: 8px;">
          <div style="width: 28px; height: 28px; background: #58a6ff22; border: 1px solid #58a6ff44; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 900; color: #58a6ff; font-size: 14px; line-height: 28px; text-align: center;">N</div>
          <span style="font-size: 18px; font-weight: 700; color: #f0f6fc;">NGE<span style="color: #58a6ff;">NI</span></span>
        </div>
      </div>

      <h2 style="font-size: 20px; font-weight: 700; color: #f0f6fc; margin: 0 0 8px;">
        Nouveau message de contact
      </h2>
      <p style="color: #8b949e; font-size: 13px; margin: 0 0 24px;">
        Reçu via le formulaire ngeni.ai — Source : ${lead.source}
      </p>

      <div style="background: #161b22; border-radius: 12px; padding: 20px; border: 1px solid #21262d; margin-bottom: 16px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="color: #8b949e; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; padding: 8px 0; width: 120px; vertical-align: top;">Nom</td>
            <td style="color: #f0f6fc; font-size: 14px; padding: 8px 0;">${lead.name}</td>
          </tr>
          <tr>
            <td style="color: #8b949e; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; padding: 8px 0; vertical-align: top;">Email</td>
            <td style="padding: 8px 0;"><a href="mailto:${lead.email}" style="color: #58a6ff; text-decoration: none; font-size: 14px;">${lead.email}</a></td>
          </tr>
          ${lead.phone ? `<tr><td style="color: #8b949e; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; padding: 8px 0; vertical-align: top;">Téléphone</td><td style="color: #f0f6fc; font-size: 14px; padding: 8px 0;">${lead.phone}</td></tr>` : ""}
          ${lead.company ? `<tr><td style="color: #8b949e; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; padding: 8px 0; vertical-align: top;">Entreprise</td><td style="color: #f0f6fc; font-size: 14px; padding: 8px 0;">${lead.company}</td></tr>` : ""}
          <tr>
            <td style="color: #8b949e; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; padding: 8px 0; vertical-align: top;">Service</td>
            <td style="color: #58a6ff; font-size: 14px; padding: 8px 0; font-weight: 600;">${serviceLabel}</td>
          </tr>
        </table>
      </div>

      <div style="background: #161b22; border-radius: 12px; padding: 20px; border: 1px solid #21262d;">
        <p style="color: #8b949e; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 12px;">Message</p>
        <p style="color: #f0f6fc; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${lead.message}</p>
      </div>

      <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #21262d;">
        <a href="mailto:${lead.email}" style="display: inline-block; background: #58a6ff; color: white; text-decoration: none; padding: 10px 20px; border-radius: 10px; font-size: 13px; font-weight: 600;">
          Répondre à ${lead.name}
        </a>
      </div>

      <p style="color: #30363d; font-size: 11px; margin-top: 24px; text-align: center;">
        NGENI — Lubumbashi, RDC | Pretoria, SA — contact@ngeni.ai
      </p>
    </div>
  `;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "NGENI <onboarding@resend.dev>",
        to: [emailTo],
        reply_to: lead.email,
        subject: `[NGENI] Nouveau contact — ${lead.name} (${serviceLabel})`,
        html: htmlBody,
      }),
    });
  } catch {
    // Échec silencieux — ne pas bloquer la soumission du formulaire
  }
}

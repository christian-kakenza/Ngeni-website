"use client";

import { useLocale } from "next-intl";
import { Receipt, CheckCircle2, Clock, Download, FileX } from "lucide-react";
import type { RouterOutputs } from "@/trpc/react";
import { cn } from "@/lib/utils";

// ============================================================
// InvoiceList — Client Component
// Factures simulées depuis le budget projet (Phase 7 preview)
// Les vraies factures seront connectées en Phase 8
// ============================================================

type Project = RouterOutputs["projects"]["getById"];

type FakeInvoice = {
  id: string;
  label: string;
  labelEn: string;
  amount: number;
  status: "PAID" | "PENDING";
  date: string;
};

// Génère des factures déterministes depuis le budget + id du projet
function generateInvoices(project: Project): FakeInvoice[] {
  if (!project.budget || project.budget <= 0) return [];

  const seed = project.id.slice(-4).toUpperCase();
  const base  = new Date(project.startDate ?? project.createdAt);

  const offset = (days: number) => {
    const d = new Date(base);
    d.setDate(d.getDate() + days);
    return d.toISOString().split("T")[0]!;
  };

  const isCompleted = project.status === "COMPLETED";

  return [
    {
      id:      `WB-${seed}-001`,
      label:   "Acompte démarrage — 40%",
      labelEn: "Down payment — 40%",
      amount:  Math.round(project.budget * 0.4),
      status:  "PAID",
      date:    offset(0),
    },
    {
      id:      `WB-${seed}-002`,
      label:   "Livraison intermédiaire — 35%",
      labelEn: "Milestone delivery — 35%",
      amount:  Math.round(project.budget * 0.35),
      status:  "PAID",
      date:    offset(30),
    },
    {
      id:      `WB-${seed}-003`,
      label:   "Solde final — 25%",
      labelEn: "Final balance — 25%",
      amount:  Math.round(project.budget * 0.25),
      status:  isCompleted ? "PAID" : "PENDING",
      date:    project.endDate
        ? new Date(project.endDate).toISOString().split("T")[0]!
        : offset(60),
    },
  ];
}

export function InvoiceList({ project }: { project: Project }) {
  const locale = useLocale();
  const fr     = locale === "fr";

  const invoices   = generateInvoices(project);
  const totalPaid  = invoices.filter((i) => i.status === "PAID").reduce((s, i) => s + i.amount, 0);
  const totalPend  = invoices.filter((i) => i.status === "PENDING").reduce((s, i) => s + i.amount, 0);

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-border bg-brand-surface/20 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-brand-border px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-brand-accent text-white shadow-glow">
            <Receipt className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-brand-white">
              {fr ? "Facturation" : "Invoicing"}
            </h3>
            <p className="text-xs text-brand-gray/50">
              {fr ? "Aperçu — module complet Phase 8" : "Preview — full module Phase 8"}
            </p>
          </div>
        </div>

        {/* Totals badges */}
        <div className="hidden items-center gap-3 sm:flex">
          {totalPaid > 0 && (
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              ${totalPaid.toLocaleString()} {fr ? "payé" : "paid"}
            </span>
          )}
          {totalPend > 0 && (
            <span className="flex items-center gap-1.5 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-400">
              <Clock className="h-3.5 w-3.5" />
              ${totalPend.toLocaleString()} {fr ? "en attente" : "pending"}
            </span>
          )}
        </div>
      </div>

      {/* Empty state */}
      {invoices.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-border bg-brand-surface/50">
            <FileX className="h-6 w-6 text-brand-gray/30" />
          </div>
          <p className="text-sm text-brand-gray/50">
            {fr
              ? "Aucun budget défini — configurez le budget pour activer la facturation."
              : "No budget defined — set a budget to enable invoicing."}
          </p>
        </div>
      ) : (
        <>
          {/* Invoice rows */}
          <div className="divide-y divide-brand-border/40">
            {invoices.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-brand-surface/30"
              >
                {/* Status icon */}
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                    inv.status === "PAID"
                      ? "bg-emerald-400/10 text-emerald-400"
                      : "bg-amber-400/10 text-amber-400"
                  )}
                >
                  {inv.status === "PAID" ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <Clock className="h-4 w-4" />
                  )}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-brand-white">
                    {fr ? inv.label : inv.labelEn}
                  </p>
                  <p className="text-xs text-brand-gray/50">
                    {inv.id} · {inv.date}
                  </p>
                </div>

                {/* Amount + status */}
                <div className="text-right">
                  <p className="text-sm font-black text-brand-white">
                    ${inv.amount.toLocaleString()}
                  </p>
                  <span
                    className={cn(
                      "text-[10px] font-bold uppercase tracking-wider",
                      inv.status === "PAID" ? "text-emerald-400" : "text-amber-400"
                    )}
                  >
                    {inv.status === "PAID"
                      ? fr ? "Payé" : "Paid"
                      : fr ? "En attente" : "Pending"}
                  </span>
                </div>

                {/* Download button */}
                <button
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-border text-brand-gray/30 transition-all hover:border-brand-accent/30 hover:text-brand-accent"
                  title={fr ? "Télécharger" : "Download"}
                >
                  <Download className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Summary footer */}
          <div className="flex items-center justify-between border-t border-brand-border bg-brand-surface/30 px-5 py-3">
            <div>
              <p className="text-xs text-brand-gray/50">
                {fr ? "Budget total du projet" : "Total project budget"}
              </p>
              <p className="text-sm font-black text-brand-white">
                ${project.budget?.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              {/* Progress bar */}
              <p className="mb-1.5 text-xs text-brand-gray/50">
                {Math.round((totalPaid / (project.budget ?? 1)) * 100)}%{" "}
                {fr ? "encaissé" : "collected"}
              </p>
              <div className="h-1.5 w-32 overflow-hidden rounded-full bg-brand-border">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-brand-accent transition-all duration-700"
                  style={{
                    width: `${Math.round((totalPaid / (project.budget ?? 1)) * 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

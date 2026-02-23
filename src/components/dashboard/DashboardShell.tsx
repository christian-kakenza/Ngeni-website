"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { SidebarNav } from "./SidebarNav";
import { TopBar } from "./TopBar";
import { cn } from "@/lib/utils";

// ============================================================
// DashboardShell — Client Component
// Gère l'état de la sidebar mobile + composition du layout
// Reçoit children (server-rendered) depuis le layout
// ============================================================

type DashboardShellProps = {
  children: React.ReactNode;
  user: {
    name?: string | null;
    email?: string | null;
  };
};

export function DashboardShell({ children, user }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const initials = user.name
    ? user.name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0]?.toUpperCase() ?? "")
        .join("")
    : "U";

  return (
    <div className="flex h-screen overflow-hidden bg-brand-black">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-brand-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-brand-border bg-brand-surface/50 backdrop-blur-md transition-transform duration-300",
          "lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-14 shrink-0 items-center border-b border-brand-border px-5">
          <Link href="/" className="transition-opacity hover:opacity-80">
            <Image src="/logo.svg" alt="Ngeni" width={120} height={31} className="h-7 w-auto" />
          </Link>
        </div>

        {/* Nav links */}
        <div className="flex flex-1 flex-col overflow-y-auto p-3">
          <SidebarNav />
        </div>

        {/* User info */}
        <div className="shrink-0 border-t border-brand-border p-3">
          <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-accent to-[#1f6feb] text-xs font-black text-white shadow-glow">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-brand-white">
                {user.name ?? "—"}
              </p>
              <p className="truncate text-xs text-brand-gray/60">
                {user.email ?? "—"}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <TopBar onToggleSidebar={() => setSidebarOpen((o) => !o)} />
        <main className="flex-1 overflow-y-auto p-5 lg:p-7">{children}</main>
      </div>
    </div>
  );
}

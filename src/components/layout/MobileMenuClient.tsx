"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

type NavLink = {
  href: string;
  label: string;
  isHash?: boolean;
};

type MobileMenuClientProps = {
  navLinks: NavLink[];
  isLoggedIn: boolean;
  loginLabel: string;
  dashboardLabel: string;
  logoutLabel: string;
};

export function MobileMenuClient({
  navLinks,
  isLoggedIn,
  loginLabel,
  dashboardLabel,
  logoutLabel,
}: MobileMenuClientProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Bloque le scroll quand le menu est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Ferme le menu sur la touche Échap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const close = () => setIsOpen(false);

  return (
    <>
      {/* Bouton hamburger */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={isOpen}
        className={cn(
          "relative flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg border border-brand-border bg-brand-surface transition-all md:hidden",
          "hover:border-brand-muted hover:bg-brand-muted/50"
        )}
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className="h-px w-5 bg-brand-white"
        />
        <motion.span
          animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.15 }}
          className="h-px w-5 bg-brand-white"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className="h-px w-5 bg-brand-white"
        />
      </button>

      {/* Overlay + Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop semi-transparent */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
              className="fixed inset-0 top-16 z-40 bg-brand-black/80 backdrop-blur-sm md:hidden"
              aria-hidden="true"
            />

            {/* Panneau latéral */}
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-16 z-50 flex h-[calc(100dvh-4rem)] w-72 flex-col border-l border-brand-border bg-brand-dark md:hidden"
            >
              {/* Navigation links */}
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    {link.isHash ? (
                      <a
                        href={link.href}
                        onClick={close}
                        className="flex items-center rounded-xl px-4 py-3 text-brand-gray transition-all hover:bg-brand-surface hover:text-white"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href as "/"}
                        onClick={close}
                        className="flex items-center rounded-xl px-4 py-3 text-brand-gray transition-all hover:bg-brand-surface hover:text-white"
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Footer du drawer : langue + thème + auth */}
              <div className="flex flex-col gap-3 border-t border-brand-border p-6">
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <LanguageSwitcher />
                  </div>
                </div>

                {isLoggedIn ? (
                  <Link
                    href="/dashboard"
                    onClick={close}
                    className="flex items-center justify-center rounded-xl border border-brand-accent/30 bg-brand-accent/10 py-2.5 text-sm font-semibold text-brand-accent transition-all hover:bg-brand-accent/20"
                  >
                    {dashboardLabel}
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    onClick={close}
                    className="flex items-center justify-center rounded-xl bg-brand-accent py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-accent/90"
                  >
                    {loginLabel}
                  </Link>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

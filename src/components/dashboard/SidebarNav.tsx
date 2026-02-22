"use client";

import { usePathname, Link } from "@/i18n/routing";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

// ============================================================
// SidebarNav — Client Component
// Navigation active via usePathname + signOut button
// ============================================================

type NavItem = {
  href: "/dashboard" | "/dashboard/projects" | "/dashboard/profile";
  labelKey: "overview" | "projects" | "profile";
  icon: React.ReactNode;
  exact?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  {
    href: "/dashboard",
    labelKey: "overview",
    exact: true,
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    href: "/dashboard/projects",
    labelKey: "projects",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
      </svg>
    ),
  },
  {
    href: "/dashboard/profile",
    labelKey: "profile",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
];

export function SidebarNav() {
  const t = useTranslations("dashboard.nav");
  const tNav = useTranslations("nav");
  const pathname = usePathname();

  const isActive = (item: NavItem) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <nav className="flex flex-1 flex-col gap-1">
      {NAV_ITEMS.map((item) => {
        const active = isActive(item);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
              active
                ? "bg-brand-accent/15 text-brand-accent shadow-sm ring-1 ring-brand-accent/20"
                : "text-brand-gray hover:bg-brand-surface/60 hover:text-brand-white"
            )}
          >
            <span className={cn("transition-colors", active ? "text-brand-accent" : "text-brand-gray/60 group-hover:text-brand-gray")}>
              {item.icon}
            </span>
            {t(item.labelKey)}
            {active && (
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-accent" />
            )}
          </Link>
        );
      })}

      {/* Spacer */}
      <div className="mt-auto pt-4" />

      {/* Sign out */}
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-brand-gray/60 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
        </svg>
        {tNav("logout")}
      </button>
    </nav>
  );
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes without conflicts.
 * Usage: cn("px-4", condition && "py-2", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date to locale string.
 */
export function formatDate(date: Date | string, locale = "fr-CD"): string {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

/**
 * Format currency (USD for DRC context).
 */
export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("fr-CD", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Truncate a string to a given length.
 */
export function truncate(str: string, length: number): string {
  return str.length > length ? `${str.slice(0, length)}…` : str;
}

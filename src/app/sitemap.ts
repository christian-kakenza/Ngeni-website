import type { MetadataRoute } from "next";

// ============================================================
// Sitemap dynamique — Next.js App Router
// Généré automatiquement à /sitemap.xml
// ============================================================

const BASE_URL = process.env.NEXTAUTH_URL ?? "https://ngeni.ai";

const SERVICE_SLUGS = [
  "rpa", "agents", "saas", "web", "medical",
  "agriculture", "education", "energy", "construction", "consulting",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // ── Pages principales ──────────────────────────────────────
  const mainRoutes: {
    fr: string;
    en: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { fr: "/fr",  en: "/en",  priority: 1.0, changeFrequency: "weekly"  },
    { fr: "/fr/confidentialite", en: "/en/privacy", priority: 0.5, changeFrequency: "yearly" },
    { fr: "/fr/conditions-utilisation", en: "/en/terms", priority: 0.5, changeFrequency: "yearly" },
  ];

  for (const route of mainRoutes) {
    entries.push({
      url:             `${BASE_URL}${route.fr}`,
      lastModified:    new Date(),
      changeFrequency: route.changeFrequency,
      priority:        route.priority,
    });
    entries.push({
      url:             `${BASE_URL}${route.en}`,
      lastModified:    new Date(),
      changeFrequency: route.changeFrequency,
      priority:        route.priority,
    });
  }

  // ── Pages services (10 services × 2 locales) ──────────────
  for (const slug of SERVICE_SLUGS) {
    entries.push({
      url:             `${BASE_URL}/fr/services/${slug}`,
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        0.8,
    });
    entries.push({
      url:             `${BASE_URL}/en/services/${slug}`,
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        0.8,
    });
  }

  return entries;
}

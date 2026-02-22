import type { MetadataRoute } from "next";

// ============================================================
// Sitemap dynamique — Next.js App Router
// Généré automatiquement à /sitemap.xml
// ============================================================

const BASE_URL = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

// Pages publiques indexables par locale
// (dashboard, auth et API sont exclus)
const PUBLIC_ROUTES: {
  fr: string;
  en: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { fr: "/fr",  en: "/en",  priority: 1.0, changeFrequency: "weekly"  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of PUBLIC_ROUTES) {
    // Version française
    entries.push({
      url:             `${BASE_URL}${route.fr}`,
      lastModified:    new Date(),
      changeFrequency: route.changeFrequency,
      priority:        route.priority,
    });

    // Version anglaise
    entries.push({
      url:             `${BASE_URL}${route.en}`,
      lastModified:    new Date(),
      changeFrequency: route.changeFrequency,
      priority:        route.priority,
    });
  }

  return entries;
}

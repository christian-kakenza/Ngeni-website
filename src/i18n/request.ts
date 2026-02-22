import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Valider la locale entrante contre les locales supportées
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "fr" | "en")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (
      await (locale === "fr"
        ? import("./fr.json")
        : import("./en.json"))
    ).default,
  };
});

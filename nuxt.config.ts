// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n'
  ],

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'fr',
    langDir: 'locales', // Nuxt cherchera par défaut dans le dossier i18n/locales
    locales: [
      { code: 'fr', iso: 'fr-FR', file: 'fr.json', name: 'Français' },
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' }
    ],
  },

  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },

  devtools: { enabled: true },
  compatibilityDate: '2024-11-01'
})
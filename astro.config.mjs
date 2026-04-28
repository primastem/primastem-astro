import { defineConfig } from "astro/config";
import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://primastem.com",
  integrations: [
    icon(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en-GB",
          fr: "fr-FR",
          de: "de-DE",
          es: "es-ES",
          ru: "ru-RU",
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr", "de", "es", "ru"],
    routing: { prefixDefaultLocale: false },
    fallback: { fr: "en", de: "en", es: "en", ru: "en" },
  },
});

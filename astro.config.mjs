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
          // fr: "fr-FR",  // uncomment when adding French
          // ru: "ru-RU",  // uncomment when adding Russian
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
    routing: { prefixDefaultLocale: false },
    // When adding a language:
    // 1. Add to locales: ["en", "fr"]
    // 2. Add fallback: { fr: "en" }
    // 3. Uncomment in src/i18n/languages.ts
    // 4. Add keys in src/i18n/ui.ts
    // 5. Duplicate pages to src/pages/{lang}/
  },
});

import { getLocaleFromNavigator, init as initI18n, addMessages as addI18nMessages } from "svelte-i18n";

import JA from "~/locales/ja.json";

addI18nMessages("ja", JA);
initI18n({
  fallbackLocale: "ja",
  initialLocale: getLocaleFromNavigator(),
});

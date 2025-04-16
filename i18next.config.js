i18next.init({
  fallbackLng: "en",
  resources: {
    en: { common: require("./public/locales/en/common.json") },
    vi: { common: require("./public/locales/vi/common.json") },
  },
});

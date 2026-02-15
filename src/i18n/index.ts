import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ar from "./locales/ar.json";
import hi from "./locales/hi.json";
import ta from "./locales/ta.json";
import fr from "./locales/fr.json";
import de from "./locales/de.json";
import ja from "./locales/ja.json";
import es from "./locales/es.json";
import zh from "./locales/zh.json";
import ko from "./locales/ko.json";

const resources = {
  en: { translation: en },
  ar: { translation: ar },
  hi: { translation: hi },
  ta: { translation: ta },
  fr: { translation: fr },
  de: { translation: de },
  ja: { translation: ja },
  es: { translation: es },
  zh: { translation: zh },
  ko: { translation: ko }
};

void i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  supportedLngs: ["en", "ar", "hi", "ta", "fr", "de", "ja", "es", "zh", "ko"],
  nonExplicitSupportedLngs: true,
  load: "languageOnly",
  react: {
    useSuspense: false
  },
  interpolation: {
    escapeValue: false
  }
});

export default i18n;

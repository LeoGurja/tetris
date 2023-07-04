import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          music: "Music",
          sfx: "Sound Effects",
          score: "Score",
          record: "High Score",
          level: "Level",
          sourceCode: "Source Code",
          portfolio: "Portfolio",
        },
      },
      pt: {
        translation: {
          music: "Música",
          sfx: "Efeitos Sonoros",
          score: "Pontuação",
          record: "Recorde",
          level: "Nível",
          sourceCode: "Código Fonte",
          portfolio: "Portfólio",
        },
      },
    },
  });

export default i18n;

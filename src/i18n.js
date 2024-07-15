import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import translationEN from './locales/en/translation.json';
import translationHE from './locales/he/translation.json';
import translationES from './locales/es/translation.json';
import translationRU from './locales/ru/translation.json';

// Define the resources
const resources = {
  en: {
    translation: translationEN,
  },
  he: {
    translation: translationHE,
  },
  es: {
    translation: translationES,
  },
  ru: {
    translation: translationRU,
  },
};

// Initialize i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;

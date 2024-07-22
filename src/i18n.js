// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import fetchTranslations from './fetchTranslations'; // Import the function to fetch translations

const initTranslations = async () => {
  const translationEN = await fetchTranslations('en');
  const translationHE = await fetchTranslations('he');
  const translationES = await fetchTranslations('es');
  const translationRU = await fetchTranslations('ru');

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

  await i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false, // React already does escaping
      },
    });
  console.log('i18n initialized');
  return i18n;
};

export default initTranslations;

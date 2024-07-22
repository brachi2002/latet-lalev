// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import fetchTranslations from './fetchTranslations';


// // Import translation files
// import translationEN from './locales/en/translation.json';
// import translationHE from './locales/he/translation.json';
// import translationES from './locales/es/translation.json';
// import translationRU from './locales/ru/translation.json';

// // Define the resources
// const resources = {
//   en: {
//     translation: translationEN,
//   },
//   he: {
//     translation: translationHE,
//   },
//   es: {
//     translation: translationES,
//   },
//   ru: {
//     translation: translationRU,
//   },
// };

// // Initialize i18n
// i18n
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     resources,
//     fallbackLng: 'en',
//     interpolation: {
//       escapeValue: false, // React already does escaping
//     },
//   });

// export default i18n;


// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import fetchTranslations from './fetchTranslations'; // Import the function to fetch translations

const initTranslations = async () => {
  try {
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

    return i18n;
  } catch (error) {
    console.error("Error initializing i18next:", error);
    throw error;
  }
};

export default initTranslations;

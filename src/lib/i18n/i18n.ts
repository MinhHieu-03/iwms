import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './locales/en';
import { vi } from './locales/vi';

// Initialize i18next
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: en },
      vi: { translation: vi },
      // Fallbacks for other languages
      zh: { translation: en },
      ja: { translation: en },
      ko: { translation: en },
    },
    lng: localStorage.getItem('language') || 'vi', // Default language
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
  });

export default i18n;

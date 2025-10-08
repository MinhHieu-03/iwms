import { useTranslation } from 'react-i18next';
import { useLanguage } from './useLanguage';
import { SupportedLanguages, TranslationKey } from '@/lib/i18n/translations';

/**
 * A custom hook that combines our existing language context with react-i18next
 */
export const useI18n = () => {
  const { language, setLanguage, themeSettings, updateThemeSetting } = useLanguage();
  const { t: translate, i18n } = useTranslation();

  // Type-safe translation function that uses our translation keys
  const t = (key: TranslationKey, options?: Record<string, any>): string => {
    return translate(key, options);
  };

  // Change language function that updates both contexts
  const changeLanguage = (newLang: SupportedLanguages) => {
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  return {
    t,
    i18n,
    language,
    changeLanguage,
    themeSettings,
    updateThemeSetting
  };
};


import { SupportedLanguages, TranslationKey } from './types';
import { en } from './locales/en';
import { vi } from './locales/vi';

export type { SupportedLanguages, TranslationKey };

export const translations: Record<SupportedLanguages, Record<TranslationKey, string>> = {
  en,
  vi,
  // Placeholder for future languages
  zh: en, // Using English as fallback for now
  ja: en, // Using English as fallback for now
  ko: en, // Using English as fallback for now
};

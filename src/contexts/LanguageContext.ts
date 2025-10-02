import React from 'react';
import { SupportedLanguages, TranslationKey } from '@/lib/i18n/translations';

type ThemeSettings = {
  darkMode: boolean;
};

export type LanguageContextType = {
  language: SupportedLanguages;
  setLanguage: (lang: SupportedLanguages) => void;
  t: (key: TranslationKey) => string;
  themeSettings: ThemeSettings;
  updateThemeSetting: (setting: keyof ThemeSettings, value: boolean) => void;
};

export const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

import React, { createContext, useState, useEffect } from 'react';
import { SupportedLanguages, TranslationKey } from '@/lib/i18n/translations';
import { useTranslation } from 'react-i18next';
import i18n from '@/lib/i18n/i18n';

type ThemeSettings = {
  darkMode: boolean;
};

type LanguageContextType = {
  language: SupportedLanguages;
  setLanguage: (lang: SupportedLanguages) => void;
  t: (key: TranslationKey) => string;
  themeSettings: ThemeSettings;
  updateThemeSetting: (setting: keyof ThemeSettings, value: boolean) => void;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<SupportedLanguages>('vi');
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    darkMode: false
  });
  
  const { t: translate } = useTranslation();

  // Load saved settings on initial mount
  useEffect(() => {
    // Load language from localStorage
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'en' || savedLanguage === 'vi') {
      setLanguage(savedLanguage as SupportedLanguages);
    } else {
      // Set default language to Vietnamese if no saved language
      setLanguage('vi');
      localStorage.setItem('language', 'vi');
    }

    // Load theme settings from localStorage on initialization
    const darkMode = localStorage.getItem("darkMode") === "true";
    
    setThemeSettings({
      darkMode
    });
    
    // Apply theme settings to document
    applyThemeSettings({ darkMode });
  }, []);

  // Apply theme settings to document root
  const applyThemeSettings = (settings: ThemeSettings) => {
    const root = document.documentElement;
    
    if (settings.darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const updateThemeSetting = (setting: keyof ThemeSettings, value: boolean) => {
    const newSettings = { ...themeSettings, [setting]: value };
    setThemeSettings(newSettings);
    
    // Save to localStorage
    localStorage.setItem(setting, value.toString());
    
    // Apply changes
    applyThemeSettings(newSettings);
  };

  const handleSetLanguage = (lang: SupportedLanguages) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    i18n.changeLanguage(lang); // Change i18next language
  };

  const t = (key: TranslationKey): string => {
    return translate(key);
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: handleSetLanguage, 
      t, 
      themeSettings,
      updateThemeSetting 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};


import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguages, TranslationKey, translations } from '@/lib/i18n/translations';

type ThemeSettings = {
  darkMode: boolean;
  highContrast: boolean;
};

type LanguageContextType = {
  language: SupportedLanguages;
  setLanguage: (lang: SupportedLanguages) => void;
  t: (key: TranslationKey) => string;
  themeSettings: ThemeSettings;
  updateThemeSetting: (setting: keyof ThemeSettings, value: boolean) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<SupportedLanguages>('en');
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    darkMode: false,
    highContrast: false
  });

  // Load saved settings on initial mount
  useEffect(() => {
    // Load language from localStorage
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'en' || savedLanguage === 'vi') {
      setLanguage(savedLanguage);
    }

    // Load theme settings from localStorage on initialization
    const darkMode = localStorage.getItem("darkMode") === "true";
    const highContrast = localStorage.getItem("highContrast") === "true";
    
    setThemeSettings({
      darkMode,
      highContrast
    });
    
    // Apply theme settings to document
    applyThemeSettings({ darkMode, highContrast });
  }, []);

  // Apply theme settings to document root
  const applyThemeSettings = (settings: ThemeSettings) => {
    const root = document.documentElement;
    
    if (settings.darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    if (settings.highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
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
  };

  const t = (key: TranslationKey): string => {
    if (!translations[language][key]) {
      console.warn(`Translation missing for key: ${key} in language: ${language}`);
      return key;
    }
    return translations[language][key];
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

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

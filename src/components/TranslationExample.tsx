import React from 'react';
import { useI18n } from '@/contexts/useI18n';
import { useTranslation } from 'react-i18next';

/**
 * Example component demonstrating both translation methods:
 * 1. Using our custom useI18n hook with type-safe keys
 * 2. Using react-i18next's useTranslation directly
 */
const TranslationExample: React.FC = () => {
  // Method 1: Use our custom hook with type-safe keys
  const { t, language } = useI18n();
  
  // Method 2: Use react-i18next directly
  const { t: t2 } = useTranslation();
  
  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-lg font-bold mb-4">Translation Examples</h2>
      
      <div className="mb-4">
        <h3 className="font-semibold">Custom useI18n hook (Type-safe)</h3>
        <p className="mb-2">Current language: {language}</p>
        <p>{t('welcome')}</p>
        <p>{t('dashboard')}</p>
      </div>
      
      <div>
        <h3 className="font-semibold">Direct react-i18next usage</h3>
        <p>{t2('welcome')}</p>
        <p>{t2('dashboard')}</p>
      </div>
    </div>
  );
};

export default TranslationExample;

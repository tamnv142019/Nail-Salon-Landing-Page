import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, getTranslation } from '../translations';

interface TranslationContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, defaultValue?: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Check if language preference is saved
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage && ['en', 'zh', 'vi', 'fr', 'es'].includes(savedLanguage)) {
      return savedLanguage;
    }
    // Default to English
    return 'en';
  });

  const handleSetLanguage = (lang: Language) => {
    if (['en', 'zh', 'vi', 'fr', 'es'].includes(lang)) {
      setLanguage(lang);
      localStorage.setItem('language', lang);
      document.documentElement.lang = lang;
    }
  };

  const t = (key: string, defaultValue?: string) => {
    return getTranslation(language, key, defaultValue);
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }
  return context;
};

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Language, getTranslation } from '../translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultValue?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language | null;
    if (saved && ['en', 'zh', 'vi', 'fr', 'es'].includes(saved)) {
      return saved;
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language } }));
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    if (['en', 'zh', 'vi', 'fr', 'es'].includes(lang)) {
      setLanguageState(lang);
    }
  };

  const t = (key: string, defaultValue?: string) => {
    return getTranslation(language, key, defaultValue);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
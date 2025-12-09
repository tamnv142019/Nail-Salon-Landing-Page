import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const languages = [
  { code: 'en' as const, name: 'English', flag: '🇺🇸' },
  // { code: 'vi' as const, name: 'Tiếng Việt', flag: '🇻🇳' },
  // { code: 'fr' as const, name: 'Français', flag: '🇫🇷' },
  // { code: 'es' as const, name: 'Español', flag: '🇪🇸' },
  // { code: 'zh' as const, name: '中文', flag: '🇨🇳' },
];

interface LanguageSwitcherProps {
  isScrolled?: boolean;
  isDark?: boolean;
}

export function LanguageSwitcher({ isScrolled = false, isDark = false }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger Button - Minimal Flag Only */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 outline-none hover:scale-105 ${
          isScrolled || isDark
            ? 'bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-800/80'
            : 'bg-white/20 backdrop-blur-xl border border-white/20 hover:bg-white/30'
        }`}
        aria-label="Change Language"
      >
        <span className="text-xl">{currentLanguage.flag}</span>
      </button>

      {/* Dropdown Menu - iOS Glass Style */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-200 ${
                language === lang.code
                  ? 'bg-rose-500/20 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50'
              }`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <span className="flex-1 text-left font-medium">{lang.name}</span>
              {language === lang.code && (
                <span className="text-rose-500">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
import { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const languages = [
  { code: 'en', flag: '🇺🇸' },
  { code: 'vi', flag: '🇻🇳' },
  { code: 'fr', flag: '🇫🇷' },
  { code: 'es', flag: '🇪🇸' },
  { code: 'zh', flag: '🇨🇳' },
] as const;

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-105"
        aria-label="Select language"
      >
        <span className="text-xl">{currentLanguage?.flag}</span>
      </button>

      {/* Compact Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex gap-1 p-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as any);
                  setIsOpen(false);
                }}
                className={`p-2 rounded-lg transition-all duration-200 text-xl ${
                  language === lang.code
                    ? 'bg-gradient-to-r from-rose-500 to-purple-600 scale-110'
                    : 'hover:bg-gray-100 dark:hover:bg-white/10 hover:scale-110'
                }`}
                title={lang.code.toUpperCase()}
              >
                {lang.flag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
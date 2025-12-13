import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const languages = [
  { code: 'en' as const, name: 'English', flag: '🇺🇸' },
  { code: 'vi' as const, name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'fr' as const, name: 'Français', flag: '🇫🇷' },
  { code: 'es' as const, name: 'Español', flag: '🇪🇸' },
  { code: 'zh' as const, name: '中文', flag: '🇨🇳' },
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
        className={`flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200 ease-out outline-none hover:scale-105 focus-visible:ring-[3px] focus-visible:ring-[color:var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
          isScrolled || isDark
            ? 'bg-background/70 dark:bg-card/70 backdrop-blur-xl border border-border/40 hover:bg-background/80 dark:hover:bg-card/80'
            : 'bg-[color:var(--glass-on-image-bg)] backdrop-blur-xl border border-[color:var(--glass-on-image-border)] hover:bg-[color:var(--glass-on-image-bg-hover)]'
        }`}
        aria-label="Change Language"
      >
        <span className="text-xl">{currentLanguage.flag}</span>
      </button>

      {/* Dropdown Menu - iOS Glass Style */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-background/85 dark:bg-popover/85 backdrop-blur-xl rounded-2xl shadow-2xl border border-border/40 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-200 outline-none focus-visible:ring-[3px] focus-visible:ring-[color:var(--focus-ring)] focus-visible:ring-inset ${
                language === lang.code
                  ? 'bg-primary/15 text-foreground'
                  : 'text-foreground hover:bg-background/60 dark:hover:bg-card/50'
              }`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <span className="flex-1 text-left font-medium">{lang.name}</span>
              {language === lang.code && (
                <span className="text-[color:var(--primary-hover)]">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
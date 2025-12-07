import { useTranslation } from '../contexts/TranslationContext';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex items-center gap-2 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 rounded-full p-1">
      <button
        onClick={() => setLanguage('en')}
        className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-300 ${
          language === 'en'
            ? 'bg-rose-500 text-white shadow-lg'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
        }`}
        title="English"
        aria-label="Switch to English"
      >
        <Globe size={16} />
        <span className="text-sm font-medium">EN</span>
      </button>
      <button
        onClick={() => setLanguage('zh')}
        className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-300 ${
          language === 'zh'
            ? 'bg-rose-500 text-white shadow-lg'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
        }`}
        title="中文"
        aria-label="Switch to Chinese"
      >
        <Globe size={16} />
        <span className="text-sm font-medium">中</span>
      </button>
    </div>
  );
}

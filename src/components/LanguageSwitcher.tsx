import { useTranslation } from '../contexts/TranslationContext';
import { Globe, Check } from 'lucide-react';
import { useState } from 'react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleLanguageChange = (lang: 'en' | 'zh' | 'vi') => {
    if (language === lang) return; // Don't change if already selected

    setLanguage(lang);

    // Show notification
    let message = '';
    switch (lang) {
      case 'en':
        message = '✓ Changed to English';
        break;
      case 'zh':
        message = '✓ 已切换到中文';
        break;
      case 'vi':
        message = '✓ Đã chuyển sang Tiếng Việt';
        break;
    }
    setNotificationMessage(message);
    setShowNotification(true);

    // Hide notification after 2 seconds
    setTimeout(() => setShowNotification(false), 2000);

    // Dispatch custom event for other components to listen
    const event = new CustomEvent('languageChanged', { detail: { language: lang } });
    window.dispatchEvent(event);
  };

  return (
    <>
      <div className="flex items-center gap-2 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 rounded-full p-1 shadow-md hover:shadow-lg transition-shadow duration-300">
        <button
          onClick={() => handleLanguageChange('en')}
          disabled={language === 'en'}
          className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-300 cursor-pointer text-xs sm:text-sm ${
            language === 'en'
              ? 'bg-rose-500 text-white shadow-lg scale-105'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 hover:scale-105'
          }`}
          title="English"
          aria-label="Switch to English"
        >
          {language === 'en' ? <Check size={14} /> : <Globe size={14} />}
          <span className="font-medium">EN</span>
        </button>
        <button
          onClick={() => handleLanguageChange('zh')}
          disabled={language === 'zh'}
          className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-300 cursor-pointer text-xs sm:text-sm ${
            language === 'zh'
              ? 'bg-rose-500 text-white shadow-lg scale-105'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 hover:scale-105'
          }`}
          title="中文"
          aria-label="Switch to Chinese"
        >
          {language === 'zh' ? <Check size={14} /> : <Globe size={14} />}
          <span className="font-medium">中</span>
        </button>
        <button
          onClick={() => handleLanguageChange('vi')}
          disabled={language === 'vi'}
          className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-300 cursor-pointer text-xs sm:text-sm ${
            language === 'vi'
              ? 'bg-rose-500 text-white shadow-lg scale-105'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 hover:scale-105'
          }`}
          title="Tiếng Việt"
          aria-label="Switch to Vietnamese"
        >
          {language === 'vi' ? <Check size={14} /> : <Globe size={14} />}
          <span className="font-medium">VI</span>
        </button>
      </div>

      {/* Toast Notification */}
      {showNotification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-3 rounded-full text-white bg-rose-500 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
          <Check size={20} />
          <span className="text-sm font-medium">{notificationMessage}</span>
        </div>
      )}
    </>
  );
}

import { useLanguage } from '../contexts/LanguageContext';
import { Globe, Check } from 'lucide-react';
import { useState } from 'react';

export function FloatingLanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLanguageChange = (lang: 'en' | 'zh' | 'vi' | 'fr' | 'es') => {
    if (language === lang) return;

    setLanguage(lang);

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
      case 'fr':
        message = '✓ Changé en Français';
        break;
      case 'es':
        message = '✓ Cambiado a Español';
        break;
    }
    setNotificationMessage(message);
    setShowNotification(true);
    setIsExpanded(false);

    setTimeout(() => setShowNotification(false), 2000);

    const event = new CustomEvent('languageChanged', { detail: { language: lang } });
    window.dispatchEvent(event);
  };

  return (
    <>
      {/* Floating Language Switcher - Top Right */}
      <div className="fixed top-6 right-6 z-50">
        {/* Expanded Menu */}
        {isExpanded && (
          <div className="absolute top-0 right-0 flex flex-col gap-2 mb-2 p-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl animate-in fade-in slide-in-from-top-2 duration-300">
            <button
              onClick={() => handleLanguageChange('en')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                language === 'en'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              title="English"
            >
              {language === 'en' ? <Check size={16} /> : <Globe size={16} />}
              <span className="text-sm font-medium">English</span>
            </button>
            <button
              onClick={() => handleLanguageChange('zh')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                language === 'zh'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              title="中文"
            >
              {language === 'zh' ? <Check size={16} /> : <Globe size={16} />}
              <span className="text-sm font-medium">中文</span>
            </button>
            <button
              onClick={() => handleLanguageChange('vi')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                language === 'vi'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              title="Tiếng Việt"
            >
              {language === 'vi' ? <Check size={16} /> : <Globe size={16} />}
              <span className="text-sm font-medium">Tiếng Việt</span>
            </button>
            <button
              onClick={() => handleLanguageChange('fr')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                language === 'fr'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              title="Français"
            >
              {language === 'fr' ? <Check size={16} /> : <Globe size={16} />}
              <span className="text-sm font-medium">Français</span>
            </button>
            <button
              onClick={() => handleLanguageChange('es')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                language === 'es'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              title="Español"
            >
              {language === 'es' ? <Check size={16} /> : <Globe size={16} />}
              <span className="text-sm font-medium">Español</span>
            </button>
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          title="Change Language"
          aria-label="Change Language"
        >
          <Globe size={24} />
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

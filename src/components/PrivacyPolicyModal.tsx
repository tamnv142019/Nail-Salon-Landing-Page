import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useEffect } from 'react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  const { t } = useLanguage();

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-linear-to-r from-rose-500 to-purple-600 text-white px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold">{t('privacy.title', 'Privacy Policy')}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
            aria-label="Close Privacy Policy"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] px-6 py-6 text-gray-700 dark:text-gray-300">
          <div className="space-y-6">
            {/* Effective Date */}
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('privacy.effectiveDate', 'Effective Date')}: {t('privacy.date', 'December 12, 2025')}
              </p>
            </div>

            {/* Introduction */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('privacy.introduction.title', '1. Introduction')}
              </h3>
              <p className="leading-relaxed">
                {t('privacy.introduction.content', 
                  'Welcome to Queen\'s Nails Hair and Skincare ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.'
                )}
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('privacy.collection.title', '2. Information We Collect')}
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {t('privacy.collection.personal.title', 'Personal Information')}
                  </h4>
                  <p className="leading-relaxed mb-2">
                    {t('privacy.collection.personal.content', 
                      'We collect personal information that you voluntarily provide to us when you:'
                    )}
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>{t('privacy.collection.personal.item1', 'Book an appointment')}</li>
                    <li>{t('privacy.collection.personal.item2', 'Subscribe to our newsletter')}</li>
                    <li>{t('privacy.collection.personal.item3', 'Contact us for inquiries')}</li>
                    <li>{t('privacy.collection.personal.item4', 'Create an account or profile')}</li>
                  </ul>
                  <p className="leading-relaxed mt-2">
                    {t('privacy.collection.personal.types', 
                      'This may include: name, email address, phone number, payment information, and service preferences.'
                    )}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {t('privacy.collection.automatic.title', 'Automatically Collected Information')}
                  </h4>
                  <p className="leading-relaxed">
                    {t('privacy.collection.automatic.content', 
                      'When you visit our website, we automatically collect certain information about your device, including IP address, browser type, operating system, access times, and pages viewed. We use cookies and similar tracking technologies to enhance your experience.'
                    )}
                  </p>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('privacy.usage.title', '3. How We Use Your Information')}
              </h3>
              <p className="leading-relaxed mb-2">
                {t('privacy.usage.content', 'We use your information to:')}
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>{t('privacy.usage.item1', 'Process and manage your appointments')}</li>
                <li>{t('privacy.usage.item2', 'Send you confirmations, reminders, and service updates')}</li>
                <li>{t('privacy.usage.item3', 'Process payments and prevent fraud')}</li>
                <li>{t('privacy.usage.item4', 'Respond to your inquiries and provide customer support')}</li>
                <li>{t('privacy.usage.item5', 'Send promotional emails and special offers (with your consent)')}</li>
                <li>{t('privacy.usage.item6', 'Improve our website and services')}</li>
                <li>{t('privacy.usage.item7', 'Comply with legal obligations')}</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('privacy.sharing.title', '4. Information Sharing and Disclosure')}
              </h3>
              <p className="leading-relaxed mb-2">
                {t('privacy.sharing.content', 
                  'We do not sell your personal information. We may share your information with:'
                )}
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>{t('privacy.sharing.item1', 'Service providers who assist us in operating our business (e.g., payment processors, email services)')}</li>
                <li>{t('privacy.sharing.item2', 'Law enforcement or regulatory authorities when required by law')}</li>
                <li>{t('privacy.sharing.item3', 'Business partners with your explicit consent')}</li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('privacy.security.title', '5. Data Security')}
              </h3>
              <p className="leading-relaxed">
                {t('privacy.security.content', 
                  'We implement appropriate technical and organizational security measures to protect your personal information. However, no electronic transmission or storage system is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.'
                )}
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('privacy.rights.title', '6. Your Privacy Rights')}
              </h3>
              <p className="leading-relaxed mb-2">
                {t('privacy.rights.content', 'You have the right to:')}
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>{t('privacy.rights.item1', 'Access the personal information we hold about you')}</li>
                <li>{t('privacy.rights.item2', 'Request correction of inaccurate data')}</li>
                <li>{t('privacy.rights.item3', 'Request deletion of your personal information')}</li>
                <li>{t('privacy.rights.item4', 'Opt-out of marketing communications')}</li>
                <li>{t('privacy.rights.item5', 'Withdraw consent where processing is based on consent')}</li>
              </ul>
            </section>

            {/* Cookies */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('privacy.cookies.title', '7. Cookies and Tracking Technologies')}
              </h3>
              <p className="leading-relaxed">
                {t('privacy.cookies.content', 
                  'We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and understand user preferences. You can control cookie settings through your browser, but disabling cookies may affect website functionality.'
                )}
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('privacy.retention.title', '8. Data Retention')}
              </h3>
              <p className="leading-relaxed">
                {t('privacy.retention.content', 
                  'We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.'
                )}
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('privacy.children.title', '9. Children\'s Privacy')}
              </h3>
              <p className="leading-relaxed">
                {t('privacy.children.content', 
                  'Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.'
                )}
              </p>
            </section>

            {/* Changes to Policy */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('privacy.changes.title', '10. Changes to This Privacy Policy')}
              </h3>
              <p className="leading-relaxed">
                {t('privacy.changes.content', 
                  'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top. You are advised to review this Privacy Policy periodically.'
                )}
              </p>
            </section>

            {/* Contact */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('privacy.contact.title', '11. Contact Us')}
              </h3>
              <p className="leading-relaxed mb-2">
                {t('privacy.contact.content', 
                  'If you have questions or concerns about this Privacy Policy, please contact us at:'
                )}
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg space-y-1">
                <p>
                  <strong className="inline-block transition-all duration-300 hover:-translate-y-0.5 hover:tracking-wide hover:text-brand-gold">
                    Queen's Nails Hair and Skincare
                  </strong>
                </p>
                <p>4869 Santa Monica Ave, San Diego, CA 92107</p>
                <p>Phone: (619) 224-5050</p>
                <p>Email: support@queensobnail.com</p>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-100 dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-linear-to-r from-rose-500 to-purple-600 text-white rounded-xl hover:from-rose-600 hover:to-purple-700 transition-all duration-300 font-semibold"
          >
            {t('privacy.close', 'Close')}
          </button>
        </div>
      </div>
    </div>
  );
}

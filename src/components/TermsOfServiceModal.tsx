import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useEffect } from 'react';

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsOfServiceModal({ isOpen, onClose }: TermsOfServiceModalProps) {
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
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold">{t('terms.title', 'Terms of Service')}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
            aria-label="Close Terms of Service"
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
                {t('terms.effectiveDate', 'Effective Date')}: {t('terms.date', 'December 12, 2025')}
              </p>
            </div>

            {/* Introduction */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('terms.introduction.title', '1. Agreement to Terms')}
              </h3>
              <p className="leading-relaxed">
                {t('terms.introduction.content', 
                  'By accessing or using Queen\'s Nails Hair and Skincare\'s website and services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services. These terms apply to all visitors, users, and others who access or use our services.'
                )}
              </p>
            </section>

            {/* Services */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('terms.services.title', '2. Services Description')}
              </h3>
              <p className="leading-relaxed mb-2">
                {t('terms.services.content', 
                  'Queen\'s Nails Hair and Skincare provides professional beauty and wellness services, including but not limited to:'
                )}
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>{t('terms.services.item1', 'Manicure and pedicure services')}</li>
                <li>{t('terms.services.item2', 'Nail art and design')}</li>
                <li>{t('terms.services.item3', 'Hair care and styling')}</li>
                <li>{t('terms.services.item4', 'Skincare treatments')}</li>
                <li>{t('terms.services.item5', 'Spa and relaxation services')}</li>
              </ul>
              <p className="leading-relaxed mt-2">
                {t('terms.services.disclaimer', 
                  'Services and pricing are subject to change. We reserve the right to modify, suspend, or discontinue any service at any time without prior notice.'
                )}
              </p>
            </section>

            {/* Appointments */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('terms.appointments.title', '3. Appointments and Bookings')}
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {t('terms.appointments.booking.title', 'Booking')}
                  </h4>
                  <p className="leading-relaxed">
                    {t('terms.appointments.booking.content', 
                      'Appointments can be made through our website, phone, or in person. By booking an appointment, you agree to arrive on time and provide accurate contact information.'
                    )}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {t('terms.appointments.cancellation.title', 'Cancellation Policy')}
                  </h4>
                  <p className="leading-relaxed">
                    {t('terms.appointments.cancellation.content', 
                      'We require at least 24 hours notice for cancellations or rescheduling. Late cancellations or no-shows may result in a cancellation fee. We reserve the right to refuse future appointments for repeated no-shows.'
                    )}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {t('terms.appointments.lateness.title', 'Late Arrivals')}
                  </h4>
                  <p className="leading-relaxed">
                    {t('terms.appointments.lateness.content', 
                      'If you arrive more than 15 minutes late, we may need to reschedule your appointment or reduce your service time to accommodate other scheduled clients.'
                    )}
                  </p>
                </div>
              </div>
            </section>

            {/* Payment */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('terms.payment.title', '4. Payment Terms')}
              </h3>
              <p className="leading-relaxed mb-2">
                {t('terms.payment.content', 'Payment terms and conditions:')}
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>{t('terms.payment.item1', 'Payment is due at the time of service')}</li>
                <li>{t('terms.payment.item2', 'We accept cash, credit cards, and debit cards')}</li>
                <li>{t('terms.payment.item3', 'All prices are in USD and subject to applicable taxes')}</li>
                <li>{t('terms.payment.item4', 'Gratuity is not included in service prices')}</li>
                <li>{t('terms.payment.item5', 'Promotional offers cannot be combined unless explicitly stated')}</li>
              </ul>
            </section>

            {/* Health and Safety */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('terms.health.title', '5. Health and Safety')}
              </h3>
              <div className="space-y-3">
                <p className="leading-relaxed">
                  {t('terms.health.disclosure', 
                    'You must disclose any medical conditions, allergies, or sensitivities that may affect your service. We are not liable for adverse reactions if you fail to disclose relevant health information.'
                  )}
                </p>
                <p className="leading-relaxed">
                  {t('terms.health.sanitation', 
                    'We maintain strict sanitation and sterilization protocols. All tools and equipment are sanitized according to industry standards and local health regulations.'
                  )}
                </p>
                <p className="leading-relaxed">
                  {t('terms.health.refusal', 
                    'We reserve the right to refuse service if we believe providing the service may pose a health risk to you or others.'
                  )}
                </p>
              </div>
            </section>

            {/* Liability */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('terms.liability.title', '6. Limitation of Liability')}
              </h3>
              <p className="leading-relaxed mb-2">
                {t('terms.liability.content', 
                  'While we strive to provide excellent services, Queen\'s Nails Hair and Skincare shall not be liable for:'
                )}
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>{t('terms.liability.item1', 'Allergic reactions to products when proper disclosure was not made')}</li>
                <li>{t('terms.liability.item2', 'Damage to nails or skin resulting from pre-existing conditions')}</li>
                <li>{t('terms.liability.item3', 'Dissatisfaction with color or design choices made by the client')}</li>
                <li>{t('terms.liability.item4', 'Loss or damage to personal belongings')}</li>
                <li>{t('terms.liability.item5', 'Indirect, incidental, or consequential damages')}</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('terms.intellectual.title', '7. Intellectual Property')}
              </h3>
              <p className="leading-relaxed">
                {t('terms.intellectual.content', 
                  'All content on our website, including text, graphics, logos, images, and designs, is the property of Queen\'s Nails Hair and Skincare or its content suppliers and is protected by copyright and trademark laws. You may not reproduce, distribute, or use any content without our written permission.'
                )}
              </p>
            </section>

            {/* User Conduct */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('terms.conduct.title', '8. User Conduct')}
              </h3>
              <p className="leading-relaxed mb-2">
                {t('terms.conduct.content', 'When using our services, you agree not to:')}
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>{t('terms.conduct.item1', 'Engage in disruptive, abusive, or harassing behavior')}</li>
                <li>{t('terms.conduct.item2', 'Damage or vandalize our property')}</li>
                <li>{t('terms.conduct.item3', 'Use our services for any illegal purpose')}</li>
                <li>{t('terms.conduct.item4', 'Interfere with other clients\' enjoyment of services')}</li>
                <li>{t('terms.conduct.item5', 'Record or photograph staff or other clients without consent')}</li>
              </ul>
            </section>

            {/* Privacy */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('terms.privacy.title', '9. Privacy')}
              </h3>
              <p className="leading-relaxed">
                {t('terms.privacy.content', 
                  'Your use of our services is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices regarding the collection and use of your personal information.'
                )}
              </p>
            </section>

            {/* Modifications */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('terms.modifications.title', '10. Modifications to Terms')}
              </h3>
              <p className="leading-relaxed">
                {t('terms.modifications.content', 
                  'We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after changes are posted constitutes acceptance of the modified terms.'
                )}
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('terms.law.title', '11. Governing Law')}
              </h3>
              <p className="leading-relaxed">
                {t('terms.law.content', 
                  'These Terms of Service shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any disputes arising from these terms shall be resolved in the courts of San Diego County, California.'
                )}
              </p>
            </section>

            {/* Severability */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('terms.severability.title', '12. Severability')}
              </h3>
              <p className="leading-relaxed">
                {t('terms.severability.content', 
                  'If any provision of these Terms of Service is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these terms will otherwise remain in full force and effect.'
                )}
              </p>
            </section>

            {/* Contact */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('terms.contact.title', '13. Contact Information')}
              </h3>
              <p className="leading-relaxed mb-2">
                {t('terms.contact.content', 
                  'If you have any questions about these Terms of Service, please contact us at:'
                )}
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg space-y-1">
                <p>
                  <strong className="inline-block transition-all duration-300 hover:-translate-y-0.5 hover:tracking-wide hover:text-brand-gold">
                    Queen’s Nails Hair and Skincare
                  </strong>
                </p>
                <p>4869 Santa Monica Ave, San Diego, CA 92107</p>
                <p>Phone: (619) 224-5050</p>
                <p>Email: info@queensnails.com</p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="bg-rose-50 dark:bg-rose-950/20 p-4 rounded-lg border border-rose-200 dark:border-rose-800">
              <p className="text-sm leading-relaxed">
                {t('terms.acknowledgment', 
                  'By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.'
                )}
              </p>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-100 dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold"
          >
            {t('terms.close', 'Close')}
          </button>
        </div>
      </div>
    </div>
  );
}

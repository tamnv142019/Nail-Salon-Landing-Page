import { ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO/SEO';
import { generateWebPageSchema } from '../utils/schema-generators';
import { useLanguage } from '../contexts/LanguageContext';

interface TermsOfServicePageProps {
  onNavigateBack: () => void;
}

export function TermsOfServicePage({ onNavigateBack }: TermsOfServicePageProps) {
  const { t } = useLanguage();

  const schema = generateWebPageSchema({
    name: "Terms of Service - Queen's Nails Hair & Skincare",
    description: "Terms of service for Queen's Nails Hair & Skincare. Review our service terms, policies, and guidelines.",
    url: "https://queensnails.live/terms"
  });

  return (
    <>
      <SEO
        title="Terms of Service"
        description="Terms of service for Queen's Nails Hair & Skincare. Review our service terms, policies, and guidelines."
        canonical="https://queensnails.live/terms"
        noindex={true}
        schema={schema}
      />

      <div className="min-h-screen bg-secondary dark:bg-background transition-colors duration-500">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background text-foreground shadow-lg border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <h1 className="text-4xl font-bold">{t('terms.title', 'Terms of Service')}</h1>
          <p className="text-muted-foreground mt-2">
            {t('terms.effectiveDate', 'Effective Date')}: {t('terms.date', 'December 12, 2025')}
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-card rounded-2xl shadow-xl p-8 md:p-12 text-foreground transition-colors duration-500 border border-border">
          <div className="space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('terms.introduction.title', '1. Agreement to Terms')}
              </h2>
              <p className="leading-relaxed text-lg">
                {t('terms.introduction.content', 
                  'By accessing or using Queen\'s Nails Hair & Skincare\'s website and services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services. These terms apply to all visitors, users, and others who access or use our services.'
                )}
              </p>
            </section>

            {/* Services */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('terms.services.title', '2. Services Description')}
              </h2>
              <p className="leading-relaxed mb-2">
                {t('terms.services.content', 
                  'Queen\'s Nails Hair & Skincare provides professional beauty and wellness services, including but not limited to:'
                )}
              </p>
              <ul className="list-disc pl-6 space-y-2 text-lg mb-4">
                <li>{t('terms.services.item1', 'Manicure and pedicure services')}</li>
                <li>{t('terms.services.item2', 'Nail art and design')}</li>
                <li>{t('terms.services.item3', 'Hair care and styling')}</li>
                <li>{t('terms.services.item4', 'Skincare treatments')}</li>
                <li>{t('terms.services.item5', 'Spa and relaxation services')}</li>
              </ul>
              <p className="leading-relaxed text-muted-foreground">
                {t('terms.services.disclaimer', 
                  'Services and pricing are subject to change. We reserve the right to modify, suspend, or discontinue any service at any time without prior notice.'
                )}
              </p>
            </section>

            {/* Appointments */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('terms.appointments.title', '3. Appointments and Bookings')}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {t('terms.appointments.booking.title', 'Booking')}
                  </h3>
                  <p className="leading-relaxed">
                    {t('terms.appointments.booking.content', 
                      'Appointments can be made through our website, phone, or in person. By booking an appointment, you agree to arrive on time and provide accurate contact information.'
                    )}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {t('terms.appointments.cancellation.title', 'Cancellation Policy')}
                  </h3>
                  <p className="leading-relaxed">
                    {t('terms.appointments.cancellation.content', 
                      'We require at least 24 hours notice for cancellations or rescheduling. Late cancellations or no-shows may result in a cancellation fee. We reserve the right to refuse future appointments for repeated no-shows.'
                    )}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {t('terms.appointments.lateness.title', 'Late Arrivals')}
                  </h3>
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
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('terms.payment.title', '4. Payment Terms')}
              </h2>
              <p className="leading-relaxed mb-2">
                {t('terms.payment.content', 'Payment terms and conditions:')}
              </p>
              <ul className="list-disc pl-6 space-y-2 text-lg">
                <li>{t('terms.payment.item1', 'Payment is due at the time of service')}</li>
                <li>{t('terms.payment.item2', 'We accept cash, credit cards, and debit cards')}</li>
                <li>{t('terms.payment.item3', 'All prices are in USD and subject to applicable taxes')}</li>
                <li>{t('terms.payment.item4', 'Gratuity is not included in service prices')}</li>
                <li>{t('terms.payment.item5', 'Promotional offers cannot be combined unless explicitly stated')}</li>
              </ul>
            </section>

            {/* Health and Safety */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('terms.health.title', '5. Health and Safety')}
              </h2>
              <div className="space-y-4">
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
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('terms.liability.title', '6. Limitation of Liability')}
              </h2>
              <p className="leading-relaxed mb-2">
                {t('terms.liability.content', 
                  'While we strive to provide excellent services, Queen\'s Nails Hair & Skincare shall not be liable for:'
                )}
              </p>
              <ul className="list-disc pl-6 space-y-2 text-lg">
                <li>{t('terms.liability.item1', 'Allergic reactions to products when proper disclosure was not made')}</li>
                <li>{t('terms.liability.item2', 'Damage to nails or skin resulting from pre-existing conditions')}</li>
                <li>{t('terms.liability.item3', 'Dissatisfaction with color or design choices made by the client')}</li>
                <li>{t('terms.liability.item4', 'Loss or damage to personal belongings')}</li>
                <li>{t('terms.liability.item5', 'Indirect, incidental, or consequential damages')}</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('terms.intellectual.title', '7. Intellectual Property')}
              </h2>
              <p className="leading-relaxed">
                {t('terms.intellectual.content', 
                  'All content on our website, including text, graphics, logos, images, and designs, is the property of Queen\'s Nails Hair & Skincare or its content suppliers and is protected by copyright and trademark laws. You may not reproduce, distribute, or use any content without our written permission.'
                )}
              </p>
            </section>

            {/* User Conduct */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('terms.conduct.title', '8. User Conduct')}
              </h2>
              <p className="leading-relaxed mb-2">
                {t('terms.conduct.content', 'When using our services, you agree not to:')}
              </p>
              <ul className="list-disc pl-6 space-y-2 text-lg">
                <li>{t('terms.conduct.item1', 'Engage in disruptive, abusive, or harassing behavior')}</li>
                <li>{t('terms.conduct.item2', 'Damage or vandalize our property')}</li>
                <li>{t('terms.conduct.item3', 'Use our services for any illegal purpose')}</li>
                <li>{t('terms.conduct.item4', 'Interfere with other clients\' enjoyment of services')}</li>
                <li>{t('terms.conduct.item5', 'Record or photograph staff or other clients without consent')}</li>
              </ul>
            </section>

            {/* Privacy */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('terms.privacy.title', '9. Privacy')}
              </h2>
              <p className="leading-relaxed">
                {t('terms.privacy.content', 
                  'Your use of our services is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices regarding the collection and use of your personal information.'
                )}
              </p>
            </section>

            {/* Modifications */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('terms.modifications.title', '10. Modifications to Terms')}
              </h2>
              <p className="leading-relaxed">
                {t('terms.modifications.content', 
                  'We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after changes are posted constitutes acceptance of the modified terms.'
                )}
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('terms.law.title', '11. Governing Law')}
              </h2>
              <p className="leading-relaxed">
                {t('terms.law.content', 
                  'These Terms of Service shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any disputes arising from these terms shall be resolved in the courts of San Diego County, California.'
                )}
              </p>
            </section>

            {/* Severability */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('terms.severability.title', '12. Severability')}
              </h2>
              <p className="leading-relaxed">
                {t('terms.severability.content', 
                  'If any provision of these Terms of Service is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these terms will otherwise remain in full force and effect.'
                )}
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('terms.contact.title', '13. Contact Information')}
              </h2>
              <p className="leading-relaxed mb-4">
                {t('terms.contact.content', 
                  'If you have any questions about these Terms of Service, please contact us at:'
                )}
              </p>
              <div className="bg-secondary dark:bg-secondary p-6 rounded-lg space-y-2 transition-colors duration-500 border border-border">
                <p className="inline-block font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:tracking-wide hover:text-brand-gold">
                  Queen's Nails Hair & Skincare
                </p>
                <p>4869 Santa Monica Ave, San Diego, CA 92107</p>
                <p>Phone: (619) 224-5050</p>
                <p>Email: info@queensnails.com</p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="bg-secondary dark:bg-secondary p-6 rounded-lg border border-border transition-colors duration-500">
              <p className="leading-relaxed">
                {t('terms.acknowledgment', 
                  'By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.'
                )}
              </p>
            </section>
          </div>

          {/* Back Button */}
          <div className="mt-12 pt-8 border-t border-border">
            <button
              onClick={onNavigateBack}
              className="w-full md:w-auto px-8 py-4 rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl bg-btn-accent hover:bg-btn-accent-hover active:bg-btn-accent-active text-btn-theme-foreground"
            >
              Back to Home
            </button>
          </div>
        </div>
      </main>
      </div>
    </>
  );
}

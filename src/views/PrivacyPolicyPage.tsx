import { ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO/SEO';
import { generateWebPageSchema } from '../utils/schema-generators';
import { useLanguage } from '../contexts/LanguageContext';

interface PrivacyPolicyPageProps {
  onNavigateBack: () => void;
}

export function PrivacyPolicyPage({ onNavigateBack }: PrivacyPolicyPageProps) {
  const { t } = useLanguage();

  const schema = generateWebPageSchema({
    name: "Privacy Policy - Queen's Nails Hair & Skincare",
    description: "Privacy policy for Queen's Nails Hair & Skincare. Learn how we protect and handle your personal information.",
    url: "https://queensobnail.com/privacy"
  });

  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Privacy policy for Queen's Nails Hair & Skincare. Learn how we protect and handle your personal information."
        canonical="https://queensobnail.com/privacy"
        noindex={true}
        schema={schema}
      />

      <div className="min-h-screen bg-secondary dark:bg-background transition-colors duration-500">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background text-foreground shadow-lg border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <h1 className="text-4xl font-bold">{t('privacy.title', 'Privacy Policy')}</h1>
          <p className="text-foreground mt-2">
            {t('privacy.effectiveDate', 'Effective Date')}: {t('privacy.date', 'December 12, 2025')}
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
                {t('privacy.introduction.title', '1. Introduction')}
              </h2>
              <p className="leading-relaxed text-lg">
                {t('privacy.introduction.content', 
                  'Welcome to Queen\'s Nails Hair & Skincare ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.'
                )}
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('privacy.collection.title', '2. Information We Collect')}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {t('privacy.collection.personal.title', 'Personal Information')}
                  </h3>
                  <p className="leading-relaxed mb-2">
                    {t('privacy.collection.personal.content', 
                      'We collect personal information that you voluntarily provide to us when you:'
                    )}
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-lg">
                    <li>{t('privacy.collection.personal.item1', 'Book an appointment')}</li>
                    <li>{t('privacy.collection.personal.item2', 'Subscribe to our newsletter')}</li>
                    <li>{t('privacy.collection.personal.item3', 'Contact us for inquiries')}</li>
                    <li>{t('privacy.collection.personal.item4', 'Create an account or profile')}</li>
                  </ul>
                  <p className="leading-relaxed mt-3">
                    {t('privacy.collection.personal.types', 
                      'This may include: name, email address, phone number, payment information, and service preferences.'
                    )}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {t('privacy.collection.automatic.title', 'Automatically Collected Information')}
                  </h3>
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
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('privacy.usage.title', '3. How We Use Your Information')}
              </h2>
              <p className="leading-relaxed mb-2">
                {t('privacy.usage.content', 'We use your information to:')}
              </p>
              <ul className="list-disc pl-6 space-y-2 text-lg">
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
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('privacy.sharing.title', '4. Information Sharing and Disclosure')}
              </h2>
              <p className="leading-relaxed mb-2">
                {t('privacy.sharing.content', 
                  'We do not sell your personal information. We may share your information with:'
                )}
              </p>
              <ul className="list-disc pl-6 space-y-2 text-lg">
                <li>{t('privacy.sharing.item1', 'Service providers who assist us in operating our business (e.g., payment processors, email services)')}</li>
                <li>{t('privacy.sharing.item2', 'Law enforcement or regulatory authorities when required by law')}</li>
                <li>{t('privacy.sharing.item3', 'Business partners with your explicit consent')}</li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('privacy.security.title', '5. Data Security')}
              </h2>
              <p className="leading-relaxed">
                {t('privacy.security.content', 
                  'We implement appropriate technical and organizational security measures to protect your personal information. However, no electronic transmission or storage system is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.'
                )}
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('privacy.rights.title', '6. Your Privacy Rights')}
              </h2>
              <p className="leading-relaxed mb-2">
                {t('privacy.rights.content', 'You have the right to:')}
              </p>
              <ul className="list-disc pl-6 space-y-2 text-lg">
                <li>{t('privacy.rights.item1', 'Access the personal information we hold about you')}</li>
                <li>{t('privacy.rights.item2', 'Request correction of inaccurate data')}</li>
                <li>{t('privacy.rights.item3', 'Request deletion of your personal information')}</li>
                <li>{t('privacy.rights.item4', 'Opt-out of marketing communications')}</li>
                <li>{t('privacy.rights.item5', 'Withdraw consent where processing is based on consent')}</li>
              </ul>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('privacy.cookies.title', '7. Cookies and Tracking Technologies')}
              </h2>
              <p className="leading-relaxed">
                {t('privacy.cookies.content', 
                  'We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and understand user preferences. You can control cookie settings through your browser, but disabling cookies may affect website functionality.'
                )}
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('privacy.retention.title', '8. Data Retention')}
              </h2>
              <p className="leading-relaxed">
                {t('privacy.retention.content', 
                  'We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.'
                )}
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('privacy.children.title', '9. Children\'s Privacy')}
              </h2>
              <p className="leading-relaxed">
                {t('privacy.children.content', 
                  'Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.'
                )}
              </p>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('privacy.changes.title', '10. Changes to This Privacy Policy')}
              </h2>
              <p className="leading-relaxed">
                {t('privacy.changes.content', 
                  'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top. You are advised to review this Privacy Policy periodically.'
                )}
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('privacy.contact.title', '11. Contact Us')}
              </h2>
              <p className="leading-relaxed mb-4">
                {t('privacy.contact.content', 
                  'If you have questions or concerns about this Privacy Policy, please contact us at:'
                )}
              </p>
              <div className="bg-secondary dark:bg-secondary p-6 rounded-lg space-y-2 transition-colors duration-500 border border-border">
                <p className="inline-block font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:tracking-wide hover:text-brand-gold">
                  Queen's Nails Hair & Skincare
                </p>
                <p>4869 Santa Monica Ave, San Diego, CA 92107</p>
                <p>Phone: (619) 224-5050</p>
                <p>Email: support@queensobnail.com</p>
              </div>
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

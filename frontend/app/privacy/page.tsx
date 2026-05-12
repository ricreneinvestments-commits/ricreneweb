import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Ricrene Investment Ltd",
  description:
    "Privacy Policy for Ricrene Investment Ltd — how we collect, use, and protect your personal information.",
};

const BRAND      = "#44B6E8";
const BRAND_DARK = "#2A9FD4";
const BRAND_PALE = "#EBF8FD";
const BRAND_LIGHT = "#D6F0FB";

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly to us, such as when you fill out our contact form, create an account, or communicate with our team. This may include:
    
    • Your name, email address, and phone number
    • Company name and business details
    • Project requirements and messages you send us
    • Payment information (processed securely through our payment partners)
    • Account credentials (passwords are always stored encrypted)`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to:
    
    • Respond to your enquiries and provide the services you request
    • Manage your client account and project communications
    • Send invoices, receipts, and project updates
    • Improve our website, services, and user experience
    • Send occasional service announcements (you may opt out at any time)
    • Comply with legal obligations`,
  },
  {
    title: "3. Information Sharing",
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
    
    • With service providers who assist us in operating our website and delivering services (e.g. hosting, email delivery, payment processing) — these parties are contractually bound to keep your data confidential
    • When required by law or to protect our legal rights
    • With your explicit consent`,
  },
  {
    title: "4. Data Storage & Security",
    content: `Your data is stored securely using industry-standard encryption. We use Supabase for our database infrastructure, which employs enterprise-grade security practices. Access to personal data is restricted to authorised team members only.
    
    We retain your data for as long as your account remains active or as needed to provide services. You may request deletion of your data at any time by contacting us.`,
  },
  {
    title: "5. Cookies",
    content: `Our website uses cookies to improve your browsing experience. These include:
    
    • Essential cookies required for the site to function correctly
    • Analytics cookies that help us understand how visitors use our site (anonymised data only)
    
    You can disable cookies through your browser settings, though this may affect some functionality of our website.`,
  },
  {
    title: "6. Your Rights",
    content: `You have the right to:
    
    • Access the personal information we hold about you
    • Request correction of inaccurate or incomplete data
    • Request deletion of your personal data
    • Withdraw consent for marketing communications at any time
    • Lodge a complaint with a relevant data protection authority
    
    To exercise any of these rights, please contact us at ricreneinvestments@gmail.com.`,
  },
  {
    title: "7. Third-Party Links",
    content: `Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policy of any external site you visit.`,
  },
  {
    title: "8. Children's Privacy",
    content: `Our services are not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.`,
  },
  {
    title: "9. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify registered users of significant changes via email. The date at the top of this page indicates when the policy was last revised.`,
  },
  {
    title: "10. Contact Us",
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your data, please contact us:
    
    Email: ricreneinvestments@gmail.com
    Phone: +255 674 114 407
    Address: Samora Tower, Dar es Salaam, Tanzania`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${BRAND_PALE} 0%, white 60%, ${BRAND_LIGHT}30 100%)` }}
      >
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: `${BRAND}12` }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-10">
            <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
            <span>/</span>
            <span className="font-medium text-gray-700">Privacy Policy</span>
          </nav>

          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5"
            style={{ backgroundColor: BRAND_PALE, color: BRAND_DARK }}
          >
            Legal
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-6">
            We take your privacy seriously. This policy explains how Ricrene Investment Ltd collects,
            uses, and protects your personal information.
          </p>
          <p className="text-sm text-gray-400">
            Last updated: <span className="font-medium text-gray-600">May 2026</span>
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Intro card */}
          <div
            className="rounded-2xl p-6 mb-12 border"
            style={{ backgroundColor: BRAND_PALE, borderColor: BRAND_LIGHT }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg"
                style={{ backgroundColor: BRAND_LIGHT }}
              >
                🔒
              </div>
              <div>
                <h2 className="font-bold text-gray-900 mb-1">Your data is safe with us</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Ricrene Investment Ltd is committed to protecting your personal information.
                  We never sell your data to third parties, and we only collect what we need
                  to deliver our services effectively.
                </p>
              </div>
            </div>
          </div>

          {/* Policy sections */}
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title} className="group">
                <div className="flex items-start gap-4">
                  {/* Blue left accent */}
                  <div
                    className="w-1 rounded-full shrink-0 mt-1 self-stretch min-h-[1.5rem]"
                    style={{ backgroundColor: BRAND }}
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h2>
                    <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                </div>
                <div className="border-b border-gray-100 mt-10" />
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div
            className="mt-16 rounded-2xl p-8 text-center"
            style={{ background: `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})` }}
          >
            <h2 className="text-2xl font-bold text-white mb-3">Questions about your privacy?</h2>
            <p className="text-blue-100 mb-6 text-sm leading-relaxed">
              We&apos;re happy to explain anything in this policy or discuss how your data is handled.
              Reach out any time.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:ricreneinvestments@gmail.com"
                className="inline-flex items-center justify-center gap-2 bg-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-all text-sm"
                style={{ color: BRAND_DARK }}
              >
                Email Us
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-all text-sm"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
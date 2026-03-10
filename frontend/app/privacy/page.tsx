import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Ricrene Investment Ltd — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-red-300 hover:text-white transition-colors mb-8 text-sm font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-300 text-lg">Last updated: March 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
          <p className="text-gray-600 leading-relaxed">
            Ricrene Investment Ltd is committed to protecting your personal information.
            This Privacy Policy explains how we collect, use, store, and protect information when you use our website
            at <strong>ricreneinvestments.co.tz</strong> and our services. By using our website or services, you agree to the terms of this policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p><strong className="text-gray-900">Information you provide directly:</strong></p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Name, email address, and phone number when you fill out our contact form</li>
              <li>Account credentials (name, email, password) when you register for a client portal account</li>
              <li>Project details and requirements when you submit a project request</li>
              <li>Messages you send us through the client portal or contact form</li>
              <li>Payment inquiry information when you express interest in our services</li>
            </ul>
            <p className="mt-4"><strong className="text-gray-900">Information collected automatically:</strong></p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Browser type and device information</li>
              <li>Pages visited and time spent on our website</li>
              <li>IP address and approximate location</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600 leading-relaxed ml-4">
            <li>To respond to your inquiries and provide our IT services</li>
            <li>To create and manage your client portal account</li>
            <li>To send you project updates, invoices, and service notifications</li>
            <li>To improve our website and services</li>
            <li>To comply with legal obligations</li>
            <li>To communicate about promotions or new services (only with your consent)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How We Store and Protect Your Data</h2>
          <p className="text-gray-600 leading-relaxed">
            Your data is stored securely using Supabase (PostgreSQL), hosted on AWS infrastructure in the EU Central region.
            We use industry-standard security measures including encrypted connections (HTTPS/TLS), password hashing,
            JWT authentication tokens, and rate limiting to protect against unauthorized access.
            Passwords are never stored in plain text.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Sharing Your Information</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We do not sell, trade, or rent your personal information to third parties. We may share your information only with:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 leading-relaxed ml-4">
            <li><strong className="text-gray-900">Service providers</strong> — Brevo (email delivery), Supabase (database hosting), Render (server hosting). These providers are bound by confidentiality agreements.</li>
            <li><strong className="text-gray-900">Legal requirements</strong> — if required by Tanzanian law or a valid court order.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies</h2>
          <p className="text-gray-600 leading-relaxed">
            Our website uses minimal cookies necessary for functionality, including authentication tokens to keep you
            logged into the client portal. We do not use advertising or tracking cookies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
          <p className="text-gray-600 leading-relaxed mb-4">You have the right to:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 leading-relaxed ml-4">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your account and associated data</li>
            <li>Withdraw consent for marketing communications at any time</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-4">
            To exercise any of these rights, contact us at{" "}
            <a href="mailto:ricreneinvestments@gmail.com" className="text-red-600 hover:underline">
              ricreneinvestments@gmail.com
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
          <p className="text-gray-600 leading-relaxed">
            We retain your personal data for as long as your account is active or as needed to provide services.
            Contact form inquiries are retained for 2 years. You may request deletion of your data at any time.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children&apos;s Privacy</h2>
          <p className="text-gray-600 leading-relaxed">
            Our services are not directed at individuals under the age of 18. We do not knowingly collect
            personal information from children.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
          <p className="text-gray-600 leading-relaxed">
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.
            Continued use of our services after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
          <p className="text-gray-600 leading-relaxed">
            If you have questions about this Privacy Policy or how we handle your data, please contact us:
          </p>
          <div className="mt-4 bg-gray-50 rounded-2xl p-6 space-y-2 text-gray-600">
            <p><strong className="text-gray-900">Ricrene Investment Ltd</strong></p>
            <p>Samora Tower, Dar es Salaam, Tanzania</p>
            <p>Email: <a href="mailto:ricreneinvestments@gmail.com" className="text-red-600 hover:underline">ricreneinvestments@gmail.com</a></p>
            <p>
            Phone: 
            <a href="tel:+255674114407" className="text-red-600 hover:underline block">
                +255 674 114 407
            </a>
            <a href="tel:+255784075702" className="text-red-600 hover:underline block">
                +255 784 075 702
            </a>
            </p>
          </div>
        </section>

        <div className="border-t pt-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
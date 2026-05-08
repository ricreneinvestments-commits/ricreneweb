"use client";

import { useState, useEffect } from "react";

const BRAND = "#44B6E8";
const BRAND_DARK = "#2A9FD4";
const BRAND_PALE = "#EBF8FD";
const BRAND_LIGHT = "#D6F0FB";

const contact = {
  email: "ricreneinvestments@gmail.com",
  phones: ["+255 674 114 407", "+255 784 075 702"],
  whatsapp: ["255674114407", "255784075702"],
  address: "Samora Tower, Dar es Salaam, Tanzania",
};

const serviceOptions = [
  { value: "", label: "Select a service..." },
  // Website Design & Maintenance
  { value: "website-design", label: "Website Design & Development" },
  { value: "domain-hosting", label: "Domain Registration & Hosting" },
  { value: "business-email", label: "Custom Business Emails" },
  { value: "seo", label: "SEO Optimization" },
  { value: "website-maintenance", label: "Website Maintenance & Support" },
  // Photography & Media
  { value: "photoshoots", label: "Professional Photoshoots" },
  { value: "events-photography", label: "Events Photography Coverage" },
  { value: "live-streaming", label: "Live Streaming" },
  { value: "video-production", label: "Video Production" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "digital-invitations", label: "Digital Invitation Cards" },
  // Printing
  { value: "branded-merchandise", label: "Branded Merchandise (T-shirts, Cups, etc.)" },
  { value: "business-cards", label: "Business Cards & Stationery" },
  { value: "large-format", label: "Large Format Printing (Banners, Posters)" },
  { value: "publications", label: "Books & Publications" },
  { value: "promotional", label: "Promotional Materials (Flyers, Brochures)" },
  // Business Automation
  { value: "pos-systems", label: "Point of Sale (POS) System" },
  { value: "ecommerce", label: "E-Commerce Platform" },
  { value: "school-management", label: "School Management System" },
  { value: "hospital-management", label: "Hospital / Clinic Management System" },
  { value: "financial-systems", label: "Financial & Accounting System" },
  // Data Intelligence
  { value: "bi-dashboards", label: "Business Intelligence Dashboards" },
  { value: "data-analytics", label: "Data Analytics & Reporting" },
  { value: "database-management", label: "Database Design & Management" },
  { value: "data-integration", label: "Data Migration & Integration" },
  { value: "other", label: "Other / Not Sure Yet" },
];

export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border-2 border-gray-200 transition-all outline-none bg-white text-gray-900";

  return (
    <>
      <section id="contact" className="py-20 md:py-32 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none" style={{ backgroundColor: BRAND_LIGHT }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none" style={{ backgroundColor: BRAND_LIGHT }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ backgroundColor: BRAND_PALE, color: BRAND_DARK }}
            >
              Get In Touch
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Let&apos;s Build Something Amazing Together
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Ready to grow your business? Get in touch for a free consultation — no strings attached.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left: Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Get In Touch</h3>
                <p className="text-gray-600">
                  Have a project in mind? We&apos;d love to hear about it. Fill out the form or reach out directly — we respond within 24 hours.
                </p>
              </div>

              <div className="space-y-5">
                {/* Email */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md" style={{ background: `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})` }}>
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email Us</h4>
                    <a href={`mailto:${contact.email}`} className="text-gray-600 hover:text-[#44B6E8] transition-colors text-sm">{contact.email}</a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md" style={{ background: `linear-gradient(135deg, ${BRAND_DARK}, #1A7FAA)` }}>
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Call Us</h4>
                    {contact.phones.map((p) => (
                      <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block text-gray-600 hover:text-[#44B6E8] transition-colors text-sm">{p}</a>
                    ))}
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">WhatsApp</h4>
                    {contact.whatsapp.map((num, i) => (
                      <a key={num} href={`https://wa.me/${num}`} target="_blank" rel="noopener noreferrer" className="block text-gray-600 hover:text-green-600 transition-colors text-sm">
                        {contact.phones[i]}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md" style={{ background: `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})` }}>
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Visit Us</h4>
                    <p className="text-gray-600 text-sm">{contact.address}</p>
                  </div>
                </div>
              </div>

              {/* Business hours */}
              <div className="rounded-2xl p-6 border" style={{ background: `linear-gradient(135deg, ${BRAND_PALE}, white)`, borderColor: BRAND_LIGHT }}>
                <h4 className="font-semibold text-gray-900 mb-4">Business Hours</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  {[["Monday – Friday", "9:00 AM – 5:00 PM"], ["Saturday", "9:00 AM – 12:00 PM"], ["Sunday", "Closed"]].map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span>{day}</span>
                      <span className="font-medium text-gray-900">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>

                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-green-900">Message sent successfully!</p>
                      <p className="text-sm text-green-700">We&apos;ll get back to you within 24 hours.</p>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                    <svg className="w-6 h-6 text-red-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-red-900">Something went wrong</p>
                      <p className="text-sm text-red-700">Please try again or contact us directly via email.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">Your Name *</label>
                    <input
                      type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                      placeholder="John Doe" className={inputClass}
                      onFocus={e => { e.target.style.borderColor = BRAND; e.target.style.boxShadow = `0 0 0 4px ${BRAND}15`; }}
                      onBlur={e => { e.target.style.borderColor = ""; e.target.style.boxShadow = ""; }}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">Email Address *</label>
                      <input
                        type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                        placeholder="john@company.com" className={inputClass}
                        onFocus={e => { e.target.style.borderColor = BRAND; e.target.style.boxShadow = `0 0 0 4px ${BRAND}15`; }}
                        onBlur={e => { e.target.style.borderColor = ""; e.target.style.boxShadow = ""; }}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">Phone Number</label>
                      <input
                        type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                        placeholder="+255 674 114 407" className={inputClass}
                        onFocus={e => { e.target.style.borderColor = BRAND; e.target.style.boxShadow = `0 0 0 4px ${BRAND}15`; }}
                        onBlur={e => { e.target.style.borderColor = ""; e.target.style.boxShadow = ""; }}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-semibold text-gray-900 mb-2">Service Interested In</label>
                    <select
                      id="service" name="service" value={formData.service} onChange={handleChange}
                      className={inputClass}
                      onFocus={e => { e.target.style.borderColor = BRAND; e.target.style.boxShadow = `0 0 0 4px ${BRAND}15`; }}
                      onBlur={e => { e.target.style.borderColor = ""; e.target.style.boxShadow = ""; }}
                    >
                      {serviceOptions.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">Tell Us About Your Project *</label>
                    <textarea
                      id="message" name="message" value={formData.message} onChange={handleChange} required rows={5}
                      placeholder="Describe your project, goals, and any specific requirements..."
                      className={`${inputClass} resize-none`}
                      onFocus={e => { e.target.style.borderColor = BRAND; e.target.style.boxShadow = `0 0 0 4px ${BRAND}15`; }}
                      onBlur={e => { e.target.style.borderColor = ""; e.target.style.boxShadow = ""; }}
                    />
                  </div>

                  <button
                    type="submit" disabled={isSubmitting}
                    className="w-full text-white px-8 py-4 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    style={{ background: `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})`, boxShadow: `0 8px 24px ${BRAND}40` }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 12px 32px ${BRAND}55`)}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 8px 24px ${BRAND}40`)}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    By submitting this form, you agree to our{" "}
                    <a href="/privacy" className="hover:underline" style={{ color: BRAND }}>Privacy Policy</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/255674114407"
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="absolute left-16 bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat on WhatsApp
        </span>
      </a>

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group ${showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
        style={{ backgroundColor: BRAND }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = BRAND_DARK)}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = BRAND)}
        aria-label="Back to top"
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
        <span className="absolute right-16 bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Back to top
        </span>
      </button>
    </>
  );
}
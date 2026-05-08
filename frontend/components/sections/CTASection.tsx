"use client";

const BRAND = "#44B6E8";
const BRAND_DARK = "#2A9FD4";
const BRAND_DEEPER = "#1A7FAA";

export default function CTASection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK}, ${BRAND_DEEPER})` }}
      />

      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="text-sm font-medium text-white">Ready to Get Started?</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          Transform Your Business with Digital Solutions
        </h2>

        {/* Description */}
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Whether you need a website, a photo shoot, branded merchandise, a custom business system, or data insights — we&apos;ve got you covered. Get a free consultation today.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            style={{ color: BRAND_DARK }}
          >
            Schedule Free Consultation
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#services"
            onClick={(e) => { e.preventDefault(); document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl font-semibold border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all"
          >
            View Our Services
          </a>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/80 text-sm">
          {[
            { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Secure & Reliable" },
            { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "24/7 Support" },
            { icon: "M13 10V3L4 14h7v7l9-11h-7z", label: "Fast Delivery" },
            { icon: "M5 3l14 9-14 9V3z", label: "5 Service Categories" },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
              </svg>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
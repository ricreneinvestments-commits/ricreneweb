"use client";

const BRAND = "#44B6E8";
const BRAND_PALE = "#EBF8FD";
const BRAND_LIGHT = "#D6F0FB";

const socialProof = {
  headline: "Trusted by Leading Organizations",
  subheadline:
    "We partner with organizations across various sectors to deliver secure, scalable digital solutions tailored to their needs.",
};

const clientTypes = [
  { label: "Government Institutions", icon: "🏛️" },
  { label: "Financial Services",      icon: "🏦" },
  { label: "Educational Organizations", icon: "🎓" },
  { label: "Healthcare Providers",    icon: "🏥" },
  { label: "Technology Companies",    icon: "💻" },
  { label: "Professional Services",   icon: "💼" },
];

export function SocialProof() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ backgroundColor: BRAND_PALE, color: BRAND }}
          >
            Who We Work With
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {socialProof.headline}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {socialProof.subheadline}
          </p>
        </div>

        {/* Client type cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {clientTypes.map(({ label, icon }) => (
            <div
              key={label}
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all border border-gray-100 group cursor-default"
              onMouseEnter={e => {
                (e.currentTarget.style.borderColor = `${BRAND}50`);
                (e.currentTarget.style.backgroundColor = BRAND_PALE);
              }}
              onMouseLeave={e => {
                (e.currentTarget.style.borderColor = "");
                (e.currentTarget.style.backgroundColor = "");
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mx-auto mb-3 transition-colors"
                style={{ backgroundColor: BRAND_LIGHT }}
              >
                {icon}
              </div>
              <p className="text-gray-700 font-medium text-sm group-hover:text-gray-900 transition-colors">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-14 text-center">
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border text-sm text-gray-600"
            style={{ borderColor: BRAND_LIGHT, backgroundColor: BRAND_PALE }}
          >
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: BRAND }} />
            Trusted by organizations across Tanzania and East Africa
          </div>
        </div>
      </div>
    </section>
  );
}
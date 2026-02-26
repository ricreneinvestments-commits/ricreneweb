
"use client";

const socialProof = {
  headline: "Trusted by Leading Organizations",
  subheadline: "We partner with organizations across various sectors to deliver secure, scalable solutions",
};

const clientTypes = [
  "Government Institutions",
  "Financial Services",
  "Educational Organizations",
  "Healthcare Providers",
  "Technology Companies",
  "Professional Services",
];

export function SocialProof() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {socialProof.headline}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {socialProof.subheadline}
          </p>
        </div>

        {/* Client Types Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {clientTypes.map((type, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100 hover:border-red-200"
            >
              <p className="text-gray-700 font-medium">{type}</p>
            </div>
          ))}
        </div>

        {/* Optional: Add testimonials section */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            Trusted by organizations across Tanzania and East Africa
          </p>
        </div>
      </div>
    </section>
  );
}


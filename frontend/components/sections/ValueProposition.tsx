"use client";

const differentiators = {
  headline: "Why Choose Ricrene Investment",
  subheadline: "We combine local expertise with global standards to deliver exceptional results for our clients",
  points: [
    {
      title: "Proven Track Record",
      description: "Over 5 years of successful project delivery across diverse industries. We've helped businesses transform their operations and achieve measurable results.",
      icon: "shield",
    },
    {
      title: "Results-Driven Approach",
      description: "We focus on outcomes that matter to your business. Every solution is designed to deliver ROI and drive sustainable growth.",
      icon: "chart",
    },
    {
      title: "Dedicated Support",
      description: "Your success is our priority. Our team provides ongoing support, training, and maintenance to ensure your systems run smoothly.",
      icon: "users",
    },
    {
      title: "Security First",
      description: "Enterprise-grade security built into every solution. We protect your data and ensure compliance with industry standards.",
      icon: "lock",
    },
  ],
};

export function ValueProposition() {
  return (
    <section id="why-us" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-200/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {differentiators.headline}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {differentiators.subheadline}
          </p>
        </div>

        {/* Value Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {differentiators.points.map((point, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {index === 0 && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  )}
                  {index === 1 && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  )}
                  {index === 2 && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  )}
                  {index === 3 && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  )}
                </svg>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {point.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
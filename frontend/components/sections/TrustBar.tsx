"use client";

const trustBar = {
  headline: "Industries We Serve",
  industries: [
    "Government Agencies",
    "Financial Services",
    "Healthcare Providers",
    "Educational Institutions",
    "Manufacturing",
    "Retail & E-commerce",
    "Professional Services",
    "Technology Companies",
    "Hospitality & Tourism",
    "Construction & Real Estate",
    "Agriculture & Agribusiness",
    "Non-Profit Organizations",
  ],
};

export function TrustBar() {
  // Duplicate array for seamless infinite scroll
  const industries = [...trustBar.industries, ...trustBar.industries];

  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            {trustBar.headline}
          </p>
        </div>

        {/* Industry marquee */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          {/* Scrolling container */}
          <div className="flex gap-12 animate-marquee">
            {industries.map((industry, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 whitespace-nowrap px-6 py-3 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span className="text-gray-700 font-medium">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
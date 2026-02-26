"use client";

const process = {
  headline: "Our Simple Process",
  subheadline: "Clear steps, transparent communication, and smooth project delivery",
  steps: [
    {
      number: "01",
      title: "Share Your Needs",
      description: "You tell us your ideas, goals, and requirements. We analyze them and propose the best solution and timeline.",
    },
    {
      number: "02",
      title: "Confirm & Start",
      description: "Once the plan is approved, we begin the project after receiving an advance payment to secure resources and timelines.",
    },
    {
      number: "03",
      title: "Build & Review",
      description: "We design and build your product, then show you the progress and apply one round of requested changes.",
    },
    {
      number: "04",
      title: "Finalize, Launch & Final Payment",
      description: "After final approval, we deploy your website live and complete the project upon final payment.",
    },
  ],
};


export function ProcessOverview() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {process.headline}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {process.subheadline}
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {process.steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Number */}
              <div className="text-5xl font-bold text-red-100 mb-4">
                {step.number}
              </div>
              
              {/* Step Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>

              {/* Connector Line (hidden on last item and on mobile) */}
              {index < process.steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-red-200 -z-10" />
              )}
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
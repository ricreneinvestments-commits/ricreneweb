"use client";

const BRAND = "#44B6E8";
const BRAND_DARK = "#2A9FD4";
const BRAND_PALE = "#EBF8FD";
const BRAND_LIGHT = "#D6F0FB";

const processData = {
  headline: "Our Simple Process",
  subheadline: "Clear steps, transparent communication, and smooth project delivery — every time.",
  steps: [
    {
      number: "01",
      title: "Share Your Needs",
      description:
        "Tell us your ideas, goals, and requirements. We listen carefully, analyse your situation, and propose the best solution with a realistic timeline.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Confirm & Start",
      description:
        "Once the plan is approved, we kick off the project after receiving an advance payment to secure resources, tools, and dedicated timelines.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Build & Review",
      description:
        "We design and build your product with regular progress updates. You review the work and we apply one round of revisions to get it perfect.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      number: "04",
      title: "Launch & Support",
      description:
        "After final approval, we deploy your solution live, complete the project on final payment, and remain available for ongoing support.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
        </svg>
      ),
    },
  ],
};

export function ProcessOverview() {
  return (
    <section id="process" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ backgroundColor: BRAND_PALE, color: BRAND_DARK }}
          >
            How We Work
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {processData.headline}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {processData.subheadline}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {processData.steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector line */}
              {index < processData.steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-10 left-full w-full h-0.5 -z-10"
                  style={{ background: `linear-gradient(90deg, ${BRAND_LIGHT}, ${BRAND_PALE})` }}
                />
              )}

              {/* Step number bubble */}
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 relative transition-transform group-hover:scale-110 duration-300"
                style={{ background: `linear-gradient(135deg, ${BRAND_PALE}, ${BRAND_LIGHT})` }}
              >
                <span className="text-4xl font-bold" style={{ color: `${BRAND}60` }}>
                  {step.number}
                </span>
                <div
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-md"
                  style={{ backgroundColor: BRAND }}
                >
                  {step.icon}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#44B6E8] transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">{step.description}</p>

              {/* Bottom accent */}
              <div
                className="mt-4 h-0.5 w-10 rounded-full group-hover:w-16 transition-all duration-300"
                style={{ backgroundColor: BRAND }}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div
          className="rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: `linear-gradient(135deg, ${BRAND_PALE}, white)`, border: `1px solid ${BRAND_LIGHT}` }}
        >
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Ready to begin?</h3>
            <p className="text-gray-600 text-sm">The first step is a free 30-minute consultation — no commitment required.</p>
          </div>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="shrink-0 inline-flex items-center gap-2 text-white px-7 py-3.5 rounded-xl font-semibold transition-all"
            style={{ backgroundColor: BRAND }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = BRAND_DARK)}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = BRAND)}
          >
            Start Your Project
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
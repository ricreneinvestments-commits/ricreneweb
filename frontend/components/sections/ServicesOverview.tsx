"use client";

const ServiceIcons = {
  browser: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  dashboard: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  email: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  chart: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  server: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  ),
  wrench: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  card: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
    </svg>
  ),
  video: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  megaphone: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  ),
};

const servicesContent = {
  headline: "Comprehensive IT Solutions for Every Business Need",
  subheadline: "From web development to business intelligence, we provide end-to-end technology solutions tailored to your success.",
  services: [
    {
      title: "Website Design & Development",
      shortDescription: "Create stunning, high-performance websites that convert visitors into customers. Modern designs optimized for all devices.",
      features: [
        "Responsive mobile-first design",
        "SEO-optimized architecture",
        "E-commerce integration",
      ],
      icon: "browser",
      slug: "web-development",
      detailPageUrl: "/services/web-development",
    },
    {
      title: "Domain & Hosting Subscriptions",
      shortDescription: "Secure your online presence with professional domain registration and reliable hosting solutions.",
      features: [
        "Domain name registration",
        "Fast & reliable hosting",
        "SSL certificates included",
      ],
      icon: "server",
      slug: "domain-hosting",
      detailPageUrl: "/services/domain-hosting",
    },
    {
      title: "Website Maintenance & Support",
      shortDescription: "Keep your website running smoothly with regular updates, security patches, and technical support.",
      features: [
        "Regular updates & backups",
        "Security monitoring",
        "Technical support 24/7",
      ],
      icon: "wrench",
      slug: "website-maintainance",
      detailPageUrl: "/services/website-maintainance",
    },
    {
      title: "Business Automation & Systems",
      shortDescription: "Streamline your operations with custom business systems designed for your unique workflow.",
      features: [
        "Custom CRM & ERP systems",
        "Workflow automation",
        "API integrations",
      ],
      icon: "dashboard",
      slug: "custom-systems",
      detailPageUrl: "/services/custom-systems",
    },
    {
      title: "Data Analytics & Insights",
      shortDescription: "Transform raw data into actionable insights that drive smarter business decisions.",
      features: [
        "Interactive dashboards",
        "Predictive analytics",
        "Custom reporting",
      ],
      icon: "chart",
      slug: "data-analysis",
      detailPageUrl: "/services/data-analysis",
    },
    {
      title: "Custom Business Email Solutions",
      shortDescription: "Professional email infrastructure with enterprise-grade security and reliability.",
      features: [
        "Custom domain emails",
        "Cloud-based solutions",
        "Advanced security features",
      ],
      icon: "email",
      slug: "corporate-email",
      detailPageUrl: "/services/corporate-email",
    },
    {
      title: "SEO & Digital Marketing",
      shortDescription: "Boost your online visibility and attract more customers with data-driven marketing strategies.",
      features: [
        "Search engine optimization",
        "Social media marketing",
        "Content strategy & ads",
      ],
      icon: "megaphone",
      slug: "seo-marketing",
      detailPageUrl: "/services/seo-digital-marketing",
    },
    {
      title: "Digital Invitations & Cards",
      shortDescription: "Modern digital solutions for events, networking, and professional communications.",
      features: [
        "Custom digital invitations",
        "Smart business cards",
        "QR code integration",
      ],
      icon: "card",
      slug: "digital-solutions",
      detailPageUrl: "/services/digital-solutions",
    },
    {
      title: "Video Production & Streaming",
      shortDescription: "Professional video content creation and live streaming services for events and marketing.",
      features: [
        "Event live streaming",
        "Corporate video production",
        "Multi-platform distribution",
      ],
      icon: "video",
      slug: "video-production",
      detailPageUrl: "/services/video-production",
    },
  ],
  cta: {
    headline: "Ready to Transform Your Business?",
    description: "Let's discuss how our IT solutions can help you achieve your goals.",
    buttonText: "Schedule a Free Consultation",
    buttonUrl: "#contact",
  },
};

export function ServicesOverview() {
  const { headline, subheadline, services, cta } = servicesContent;

  return (
    <section id="services" className="py-20 md:py-32 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {headline}
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            {subheadline}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service) => {
            const Icon = ServiceIcons[service.icon as keyof typeof ServiceIcons] || ServiceIcons.dashboard;
            
            return (
              <div
                key={service.slug}
                className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-red-300 hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-700/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Icon />
                    </div>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-red-600 to-red-700 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                    {service.shortDescription}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600">
                        <svg className="h-5 w-5 text-red-600 mr-2 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a href={service.detailPageUrl} className="inline-flex items-center text-red-600 font-semibold text-sm group-hover:gap-2 transition-all">
                    Learn more
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>

                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/10 to-red-700/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-8 md:p-12 border border-red-200 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{cta.headline}</h3>
            <p className="text-lg text-gray-600 mb-8">{cta.description}</p>
            <a 
              href={cta.buttonUrl} 
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(cta.buttonUrl)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-linear-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-600/40 transform hover:-translate-y-1"
            >
              {cta.buttonText}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
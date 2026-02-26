// content/site.ts
export const siteContent = {
  // Company identity
  company: {
    name: "Ricrene Investment Ltd",
    tagline: "Modern IT Solutions for Growing Businesses",
    description: "We build secure, scalable systems that solve real business problems. From custom web applications to biometric systems and corporate infrastructure, we're your long-term technology partner.",
    location: "Dar es Salaam, Tanzania",
    foundedYear: "", // Removed - no establishment year
  },

  // Hero section
  hero: {
    headline: "Modern IT Solutions for Growing Businesses",
    subheadline: "Transform your business with cutting-edge technology solutions. We build custom websites, business systems, and digital infrastructure that drive real results.",
    cta: {
      primary: "Explore Our Services",
      primaryUrl: "#services",
      secondary: "Get Free Consultation",
      secondaryUrl: "#contact",
    },
    backgroundMedia: {
      type: "image",
      url: "https://placehold.co/1920x1080/B91C1C/ffffff?text=Ricrene+Investment+Ltd&font=roboto",
      videoUrl: "/videos/hero-bg.mp4",
      overlay: true,
    },
    // Updated stats - removed "Established" year
    stats: [
      { value: "100", label: "Quality Solutions", suffix: "%" },
      { value: "24/7", label: "Support Available", suffix: "" },
      { value: "7", label: "Services Offered", suffix: "+" },
    ],
  },

  // Trust bar
  trustBar: {
    headline: "Specialized Solutions Across Industries",
    industries: [
      "Banking & Finance",
      "Education",
      "Healthcare",
      "Government",
      "Retail & E-commerce",
      "Professional Services",
      "Manufacturing",
      "Hospitality",
    ],
  },

  // Services overview
  services: {
    headline: "Complete IT Solutions for Your Business",
    subheadline: "From stunning websites to complex business systems, we deliver technology solutions that work.",
  },

  // Capabilities showcase - ALL 7 SERVICES
  capabilities: [
    {
      id: "web-development",
      title: "Websites That Convert and Perform",
      description: "Professional websites built for speed, SEO, and conversions. Your digital presence should work as hard as you do.",
      features: [
        "SEO-optimized from day one",
        "Lightning-fast load times (under 2 seconds)",
        "Mobile-first responsive design",
        "Conversion-focused architecture",
        "CMS for easy content updates",
        "E-commerce integration ready",
      ],
      cta: {
        text: "View Web Portfolio",
        url: "/services/web-development",
      },
      media: {
        type: "image",
        url: "https://placehold.co/1200x675/B91C1C/white?text=Web+Development+Portfolio&font=roboto",
        thumbnail: "https://placehold.co/600x400/B91C1C/white?text=Web+Thumbnail&font=roboto",
        alt: "Professional website examples",
      },
    },
    {
      id: "custom-systems",
      title: "Custom Systems Built for Your Workflow",
      description: "Tailored business solutions that fit your exact needs. No forced compromises, no unnecessary complexity.",
      features: [
        "Attendance tracking with biometric integration",
        "Real-time dashboards and reporting",
        "Mobile-first employee interfaces",
        "Seamless third-party integrations",
        "Custom CRM and inventory systems",
        "Automated workflow management",
      ],
      cta: {
        text: "Explore Business Systems",
        url: "/services/custom-systems",
      },
      media: {
        type: "image",
        url: "https://placehold.co/1200x675/000000/B91C1C?text=Custom+Business+Systems&font=roboto",
        alt: "Custom attendance management system dashboard",
      },
    },
    {
      id: "digital-solutions",
      title: "Digital Invitations & Smart Cards",
      description: "Modern digital experiences for events, networking, and brand engagement that make lasting impressions.",
      features: [
        "Custom interactive event invitations",
        "NFC-enabled digital business cards",
        "RSVP management and tracking",
        "QR code integration for easy sharing",
        "Real-time guest analytics",
        "Social media integration",
      ],
      cta: {
        text: "See Digital Solutions",
        url: "/services/digital-solutions",
      },
      media: {
        type: "image",
        url: "https://placehold.co/1200x675/B91C1C/white?text=Digital+Invitations&font=roboto",
        alt: "Digital invitation and smart card examples",
      },
    },
    {
      id: "video-production",
      title: "Video Production & Live Streaming",
      description: "Broadcast-quality video content and live streaming for events, marketing, and training that engages your audience.",
      features: [
        "Corporate video production",
        "Multi-camera live event streaming",
        "Professional editing and post-production",
        "YouTube and social media optimization",
        "Reliable streaming infrastructure",
        "Content hosting and distribution",
      ],
      cta: {
        text: "View Video Portfolio",
        url: "/services/video-production",
      },
      media: {
        type: "image",
        url: "https://placehold.co/1200x675/000000/B91C1C?text=Video+Production&font=roboto",
        thumbnail: "https://placehold.co/600x400/000000/B91C1C?text=Video+Thumbnail&font=roboto",
        alt: "Video production and live streaming examples",
      },
    },
    {
      id: "corporate-email",
      title: "Professional Corporate Email Systems",
      description: "Secure, reliable email infrastructure with your domain name that enhances your business credibility.",
      features: [
        "Custom domain email addresses",
        "Advanced spam and security protection",
        "Mobile and desktop synchronization",
        "Large attachment support",
        "Seamless email migration services",
        "Team collaboration tools included",
      ],
      cta: {
        text: "Setup Corporate Email",
        url: "/services/corporate-email",
      },
      media: {
        type: "image",
        url: "https://placehold.co/1200x675/B91C1C/white?text=Corporate+Email&font=roboto",
        alt: "Corporate email management interface",
      },
    },
    {
      id: "data-analysis",
      title: "Data Analysis & Business Intelligence",
      description: "Transform your data into actionable insights with custom analytics dashboards that drive smarter decisions.",
      features: [
        "Custom interactive dashboards",
        "Automated reporting systems",
        "Advanced data visualization",
        "Trend analysis and forecasting",
        "Predictive analytics capabilities",
        "Database optimization",
      ],
      cta: {
        text: "Explore Analytics",
        url: "/services/data-analysis",
      },
      media: {
        type: "image",
        url: "https://placehold.co/1200x675/000000/B91C1C?text=Data+Analytics&font=roboto",
        alt: "Business intelligence dashboard example",
      },
    },
    {
      id: "seo-marketing",
      title: "SEO & Digital Marketing",
      description: "Get found online and attract more customers with strategic SEO and data-driven digital marketing campaigns.",
      features: [
        "Search engine optimization (SEO)",
        "Google Ads campaign management",
        "Social media marketing strategy",
        "Content marketing and strategy",
        "Email marketing campaigns",
        "Performance tracking and analytics",
      ],
      cta: {
        text: "Boost Your Visibility",
        url: "/services/seo-digital-marketing",
      },
      media: {
        type: "image",
        url: "https://placehold.co/1200x675/B91C1C/white?text=SEO+Marketing&font=roboto",
        alt: "SEO and marketing analytics dashboard",
      },
    },
  ],

  // Process overview
  process: {
    headline: "Our Process",
    subheadline: "Simple, transparent, and results-focused. We're with you every step of the way.",
    steps: [
      {
        number: "01",
        title: "Discovery",
        description: "We listen to understand your unique challenges and goals. Every project starts with your vision.",
        icon: "search",
      },
      {
        number: "02",
        title: "Design & Planning",
        description: "We create a clear roadmap with milestones, timelines, and deliverables. No surprises, just clarity.",
        icon: "blueprint",
      },
      {
        number: "03",
        title: "Development",
        description: "Agile development with regular updates. You're involved at every stage, seeing progress in real-time.",
        icon: "code",
      },
      {
        number: "04",
        title: "Launch & Support",
        description: "Smooth deployment, comprehensive training, and ongoing support. We're your long-term technology partner.",
        icon: "rocket",
      },
    ],
  },

  // Why choose us
  differentiators: {
    headline: "Why Choose Ricrene Investment Ltd",
    subheadline: "We're not just another IT company. We're your technology partner.",
    points: [
      {
        title: "Modern Technology Stack",
        description: "We use the latest, most reliable technologies to build solutions that are fast, secure, and scalable for years to come.",
        icon: "tech",
      },
      {
        title: "Transparent Communication",
        description: "No jargon, no confusion. We explain everything in plain language and keep you updated every step of the way.",
        icon: "communication",
      },
      {
        title: "Flexible & Scalable",
        description: "Start with what you need now. Our solutions are built to grow with your business without costly rebuilds.",
        icon: "scale",
      },
      {
        title: "Dedicated Support",
        description: "Quick response times, knowledgeable support staff, and genuine care for your success. We're here when you need us.",
        icon: "support",
      },
    ],
  },

  // Metrics
  metrics: {
    headline: "Built on Modern Standards",
    stats: [
      {
        value: 90,
        displayValue: "90+",
        label: "Performance Score",
        description: "Lightning-fast websites that rank higher",
      },
      {
        value: 99,
        displayValue: "99.9%",
        label: "Uptime Guarantee",
        description: "Reliable systems you can count on",
      },
      {
        value: 24,
        displayValue: "24/7",
        label: "Support Available",
        description: "We're here when you need us",
      },
      {
        value: 100,
        displayValue: "100%",
        label: "Custom Solutions",
        description: "Built specifically for your needs",
      },
    ],
  },

  // Primary CTA
  cta: {
    headline: "Ready to Transform Your Business?",
    subheadline: "Let's discuss your project. Get a free consultation and see how we can help you achieve your goals.",
    primaryButton: {
      text: "Get Free Consultation",
      url: "#contact",
    },
    secondaryButton: {
      text: "View All Services",
      url: "#services",
    },
  },

  // Insights
  insights: {
    headline: "Latest Insights & Updates",
    subheadline: "Technology tips, industry news, and updates from our team.",
    ctaText: "View All Articles",
    ctaUrl: "/insights",
  },
} as const;
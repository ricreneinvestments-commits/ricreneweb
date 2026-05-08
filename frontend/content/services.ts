// content/services.ts
// ── 5 Main Service Categories ─────────────────────────────────────────────────

export const servicesContent = {
  headline: "Five Pillars of Digital Growth",
  subheadline:
    "From your first website to a fully automated business ecosystem — every service we offer is designed to move your business forward.",

  services: [
    // ── 1. Website Design & Maintenance ──────────────────────────────────────
    {
      slug: "website-design",
      title: "Website Design & Maintenance",
      tagline: "Your complete digital front door",
      shortDescription:
        "Professional websites, domain registration, hosting, business emails, SEO, and ongoing maintenance — all under one roof.",
      fullDescription:
        "We build fast, beautiful, SEO-optimised websites that represent your brand professionally and convert visitors into customers. From first-time domain registration through to daily maintenance, we handle every layer of your online presence so you can focus on running your business.",
      icon: "🌐",
      category: "web" as const,
      featured: true,
      detailPageUrl: "/services/website-design",
      subServices: [
        {
          slug: "website-design-dev",
          title: "Website Design & Development",
          description: "Custom, responsive websites built to convert visitors into customers.",
          features: ["Custom responsive design", "SEO-optimised from day one", "CMS for easy content updates", "E-commerce ready", "Analytics & conversion tracking", "Fast load times (under 2 seconds)"],
        },
        {
          slug: "domain-hosting",
          title: "Domain Registration & Hosting",
          description: "Register the perfect domain and get reliable, high-speed hosting.",
          features: ["Domain name search & registration", "Shared & dedicated hosting plans", "99.9% uptime guarantee", "Daily automated backups", "SSL certificate included", "CDN for global speed"],
        },
        {
          slug: "business-email",
          title: "Custom Business Emails",
          description: "Professional email addresses matching your domain that build credibility.",
          features: ["Custom domain email (you@yourcompany.co.tz)", "Advanced spam & phishing protection", "Mobile & desktop sync", "Large attachment support", "Email migration from old provider", "Team collaboration tools"],
        },
        {
          slug: "seo",
          title: "SEO Optimization",
          description: "Rank higher on Google and attract customers who are already searching for you.",
          features: ["Technical SEO audit & fixes", "Keyword research & strategy", "On-page optimisation", "Google Search Console setup", "Local SEO for Tanzania", "Monthly performance reports"],
        },
        {
          slug: "website-maintenance",
          title: "Website Maintenance & Support",
          description: "Keep your site secure, fast, and up to date with our managed maintenance plans.",
          features: ["Security patches & updates", "Regular performance audits", "Content updates on request", "Uptime monitoring", "Bug fixes & troubleshooting", "Monthly health reports"],
        },
      ],
    },

    // ── 2. Photography & Media Production ────────────────────────────────────
    {
      slug: "photography-media",
      title: "Photography & Media Production",
      tagline: "Capture every moment. Amplify every story.",
      shortDescription:
        "Professional photography, events coverage, live streaming, video production, digital marketing, and digital invitation cards.",
      fullDescription:
        "From boardroom headshots to live-streamed conferences, our media team covers every visual need your brand has. We combine technical excellence with creative storytelling to produce content that resonates, engages, and converts.",
      icon: "📸",
      category: "media" as const,
      featured: true,
      detailPageUrl: "/services/photography-media",
      subServices: [
        {
          slug: "photoshoots",
          title: "Professional Photoshoots",
          description: "Corporate, product, and lifestyle photography that tells your brand's story.",
          features: ["Corporate & team portraits", "Product photography", "Office & workspace shoots", "High-resolution edited images", "Multiple format deliverables", "Fast 48-hour turnaround"],
        },
        {
          slug: "events-photography",
          title: "Events Photography Coverage",
          description: "Full event documentation from arrival to the closing ceremony.",
          features: ["Multi-photographer coverage", "Real-time social media delivery", "Candid & posed shots", "Award ceremonies & conferences", "Weddings & private events", "Same-day highlight gallery"],
        },
        {
          slug: "live-streaming",
          title: "Live Streaming",
          description: "Broadcast your events to a global audience in real time with professional quality.",
          features: ["Multi-camera live production", "YouTube, Facebook & custom RTMP", "Reliable internet backup systems", "Lower thirds & graphics", "Live audience interaction tools", "Replay archive & download"],
        },
        {
          slug: "video-production",
          title: "Video Production",
          description: "High-quality promotional, documentary, and training videos for your brand.",
          features: ["Pre-production planning & scripting", "Professional filming crew", "Motion graphics & animations", "Colour grading & sound design", "YouTube & social optimisation", "Full rights to final content"],
        },
        {
          slug: "digital-marketing",
          title: "Digital Marketing",
          description: "Targeted campaigns across digital channels that convert attention into revenue.",
          features: ["Social media strategy & management", "Google & Facebook Ads", "Content creation & scheduling", "Influencer marketing coordination", "Campaign analytics & reporting", "A/B testing & optimisation"],
        },
        {
          slug: "digital-invitations",
          title: "Digital Invitation Cards",
          description: "Elegant, interactive digital invitations for weddings, corporate events, and more.",
          features: ["Custom-branded designs", "RSVP management system", "QR code integration", "WhatsApp & email delivery", "Countdown timers & maps", "Unlimited guest sharing"],
        },
      ],
    },

    // ── 3. Printing Services ──────────────────────────────────────────────────
    {
      slug: "printing-services",
      title: "Printing Services",
      tagline: "If it can be printed, we print it.",
      shortDescription:
        "T-shirts, cups, business cards, books, banners, brochures — full-range printing with fast turnaround and competitive pricing.",
      fullDescription:
        "Our full-range printing facility handles everything from branded T-shirts and coffee cups to company books and billboard banners. We use high-quality materials and modern printing technology to deliver crisp, vibrant results every time — with turnaround times that keep your business moving.",
      icon: "🖨️",
      category: "print" as const,
      featured: true,
      detailPageUrl: "/services/printing-services",
      subServices: [
        {
          slug: "branded-merchandise",
          title: "Branded Merchandise",
          description: "T-shirts, polo shirts, caps, mugs, water bottles, tote bags, and more.",
          features: ["Screen printing & embroidery", "Sublimation printing", "Bulk order discounts", "Pantone colour matching", "Sampling before full production", "Fast 3–5 day turnaround"],
        },
        {
          slug: "business-cards",
          title: "Business Cards & Stationery",
          description: "Premium business cards, letterheads, envelopes, and corporate stationery.",
          features: ["Matte, gloss & soft-touch finishes", "Standard & custom sizes", "Spot UV & foil options", "Letterheads & compliment slips", "Branded envelopes", "Minimum 50 cards"],
        },
        {
          slug: "large-format",
          title: "Large Format Printing",
          description: "Banners, roll-ups, billboards, posters, and outdoor signage.",
          features: ["Indoor & outdoor banners", "Roll-up / pull-up stands", "Vinyl & mesh banners", "Window graphics & decals", "Event backdrops", "Weatherproof inks"],
        },
        {
          slug: "publications",
          title: "Books & Publications",
          description: "Magazines, company reports, catalogues, manuals, and bound books.",
          features: ["Saddle-stitch & perfect binding", "Full colour or black & white", "Custom page sizes", "Annual reports & proposals", "Product catalogues", "Academic & educational books"],
        },
        {
          slug: "promotional",
          title: "Promotional Materials",
          description: "Flyers, brochures, leaflets, and event collateral that gets noticed.",
          features: ["A4, A5, DL flyers", "Bi-fold & tri-fold brochures", "Event programmes", "Table tent cards", "Stickers & labels", "Promotional notepads"],
        },
        {
          slug: "packaging",
          title: "Custom Packaging & Labels",
          description: "Branded product packaging, boxes, bags, and custom labels.",
          features: ["Custom box design & printing", "Product labels & stickers", "Branded paper bags", "Food & beverage packaging", "Shrink wrap labels", "QR code & barcode integration"],
        },
      ],
    },

    // ── 4. Business Automation ────────────────────────────────────────────────
    {
      slug: "business-automation",
      title: "Business Automation",
      tagline: "Custom systems built around how you work.",
      shortDescription:
        "POS systems, e-commerce platforms, school management, hospital management, financial systems, and custom enterprise software.",
      fullDescription:
        "We design and develop tailor-made software systems that eliminate manual processes, reduce human error, and scale with your business. Whether you need a simple POS terminal or a full multi-branch enterprise platform, we build it from the ground up to match your exact workflows.",
      icon: "⚙️",
      category: "automation" as const,
      featured: true,
      detailPageUrl: "/services/business-automation",
      subServices: [
        {
          slug: "pos-systems",
          title: "Point of Sale (POS) Systems",
          description: "Smart, fast POS solutions tailored for retail, restaurants, and hospitality.",
          features: ["Sales & inventory tracking", "Multi-branch support", "Receipt printing & digital receipts", "Cashier & manager roles", "Daily/weekly/monthly reports", "Offline mode support"],
        },
        {
          slug: "ecommerce",
          title: "E-Commerce Platforms",
          description: "Full-featured online stores with payment integration built for growth.",
          features: ["Mobile-first storefront design", "M-Pesa, Airtel Money & card payments", "Inventory & order management", "Customer accounts & wishlists", "SEO-optimised product pages", "Admin dashboard & analytics"],
        },
        {
          slug: "school-management",
          title: "School Management Systems",
          description: "All-in-one platforms covering academics, finance, and parent communication.",
          features: ["Student admissions & records", "Timetabling & class scheduling", "Examinations & grade books", "Fee collection & receipting", "Parent portal & SMS alerts", "Staff attendance & payroll"],
        },
        {
          slug: "hospital-management",
          title: "Hospital & Clinic Management Systems",
          description: "Streamline patient care, billing, and operations for healthcare providers.",
          features: ["Patient registration & records (EMR)", "Appointment & queue management", "Pharmacy & laboratory modules", "In-patient & out-patient billing", "Insurance claims processing", "Doctor & nurse scheduling"],
        },
        {
          slug: "financial-systems",
          title: "Financial & Accounting Systems",
          description: "Automate your books, invoicing, payroll, and financial reporting.",
          features: ["Invoicing & receipts", "Expense tracking & approvals", "Payroll & NSSF/PAYE computation", "Multi-currency support", "Bank reconciliation", "Custom financial dashboards"],
        },
        {
          slug: "custom-enterprise",
          title: "Custom Enterprise Platforms",
          description: "Bespoke software solutions for any industry and any scale.",
          features: ["Requirement analysis & scoping", "Custom database architecture", "API integrations (M-Pesa, ERP, etc.)", "Mobile app (iOS & Android)", "Role-based access control", "Ongoing support & enhancements"],
        },
      ],
    },

    // ── 5. Data Intelligence ──────────────────────────────────────────────────
    {
      slug: "data-intelligence",
      title: "Data Intelligence",
      tagline: "Turn your data into a competitive advantage.",
      shortDescription:
        "Business intelligence dashboards, data analytics, database design, data migration, predictive analytics, and data strategy consulting.",
      fullDescription:
        "We help businesses understand what their data is telling them. From real-time interactive dashboards to deep statistical analysis and database architecture, we provide the intelligence layer your decisions deserve — translating raw numbers into clear, actionable insights.",
      icon: "📊",
      category: "data" as const,
      featured: true,
      detailPageUrl: "/services/data-intelligence",
      subServices: [
        {
          slug: "bi-dashboards",
          title: "Business Intelligence Dashboards",
          description: "Live, interactive dashboards that give every department real-time clarity.",
          features: ["Custom KPI dashboards", "Real-time data refresh", "Drill-down & filter capabilities", "Mobile-responsive design", "Role-based access (executives, managers, staff)", "Export to PDF/Excel"],
        },
        {
          slug: "data-analytics",
          title: "Data Analytics & Reporting",
          description: "Identify trends, opportunities, and risks hidden in your business data.",
          features: ["Sales & revenue analysis", "Customer behaviour analytics", "Operational efficiency reports", "Automated scheduled reports", "Cohort & funnel analysis", "Competitive benchmarking"],
        },
        {
          slug: "database-management",
          title: "Database Design & Management",
          description: "Scalable, optimised databases built to grow with your business.",
          features: ["Relational & NoSQL database design", "Performance optimisation & indexing", "Backup & disaster recovery", "Database migration & upgrades", "Security hardening", "24/7 monitoring"],
        },
        {
          slug: "data-integration",
          title: "Data Migration & Integration",
          description: "Connect disparate systems into a single, reliable source of truth.",
          features: ["Legacy system data migration", "API & webhook integrations", "ETL pipeline development", "Data cleansing & validation", "Real-time sync between systems", "Integration documentation"],
        },
        {
          slug: "predictive-analytics",
          title: "Predictive Analytics",
          description: "Forecast demand, customer churn, and business outcomes with confidence.",
          features: ["Demand forecasting models", "Customer churn prediction", "Sales forecasting", "Inventory optimisation models", "Risk scoring systems", "Machine learning pipelines"],
        },
        {
          slug: "data-strategy",
          title: "Data Strategy Consulting",
          description: "Build the roadmap to becoming a truly data-driven organisation.",
          features: ["Data maturity assessment", "KPI framework design", "Data governance policies", "Team training & workshops", "Technology stack recommendations", "Implementation roadmap"],
        },
      ],
    },
  ],

  cta: {
    headline: "Not sure which service fits your needs?",
    description: "Let's discuss your challenges and find the right solution together.",
    buttonText: "Get Free Consultation",
    buttonUrl: "#contact",
  },
} as const;
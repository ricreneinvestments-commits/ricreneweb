// Navigation structure for RickRyn IT Solutions
// Centralized for consistency across header, footer, and mobile menus

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface SocialLink {
  platform: string;
  label: string;
  href: string;
  icon: string;
}

export const navigationContent = {
  // Primary navigation
  main: [
    { label: "Home", href: "/" },
    { label: "Services", href: "#services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "#contact" },
  ] as NavLink[],

  // Footer navigation groups
  footer: {
    services: {
      title: "Our Services",
      links: [
        { label: "Website Design & Development", href: "/services/web-development" },
        { label: "Domain & Hosting Subscriptions", href: "/services/domain-hosting" },
        { label: "Website Maintenance & Support", href: "/services/website-maintenance" },
        { label: "SEO & Digital Marketing", href: "/services/seo-digital-marketing" },
        { label: "Business Automation & Systems", href: "/services/custom-systems" },
        { label: "Custom Business Email Solutions", href: "/services/corporate-email" },
        { label: "Data Analytics & Insights", href: "/services/data-analysis" },
        { label: "Digital Invitations & Cards", href: "/services/digital-solutions" },
        { label: "Video Production & Live Streaming", href: "/services/video-production" },
      ] as NavLink[],
    },
    company: {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Process", href: "#process" },
        { label: "Contact", href: "#contact" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
      ] as NavLink[],
    },
    resources: {
      title: "Resources",
      links: [
        { label: "Blog & Insights", href: "/insights" },
        { label: "FAQ", href: "/faq" },
        { label: "Support", href: "/support" },
        { label: "Free Consultation", href: "#contact" },
      ] as NavLink[],
    },
  },

  // Contact information for footer
  contact: {
    email: "ricreneinvestments@gmail.com",
    phone: "+255 756 123 456",
    whatsapp: "+255 756 123 456",
    address: "Dar es Salaam, Tanzania",
  },

  // Social media links
  social: [
    {
      platform: "facebook",
      label: "Facebook",
      href: "https://facebook.com/rickrynIT",
      icon: "facebook",
    },
    {
      platform: "instagram",
      label: "Instagram",
      href: "https://instagram.com/rickrynIT",
      icon: "instagram",
    },
    {
      platform: "twitter",
      label: "Twitter",
      href: "https://twitter.com/rickrynIT",
      icon: "twitter",
    },
    {
      platform: "linkedin",
      label: "LinkedIn",
      href: "https://linkedin.com/company/rickryn-it-solutions",
      icon: "linkedin",
    },
    {
      platform: "youtube",
      label: "YouTube",
      href: "https://youtube.com/@rickrynIT",
      icon: "youtube",
    },
  ] as SocialLink[],
} as const;
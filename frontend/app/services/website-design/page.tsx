/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import { servicesContent } from "@/content/services";

export const metadata: Metadata = {
  title: "Website Design, Hosting, Email & SEO",
  description:
    "Professional website design, domain registration, web hosting, custom business emails, SEO optimisation, and website maintenance services in Tanzania.",
};

const serviceData = servicesContent.services.find(
  (s) => s.slug === "website-design"
)!;

const relatedServices = [
  {
    title: "Photography & Media",
    href: "/services/photography-media",
    icon: "📸",
  },
  {
    title: "Printing Services",
    href: "/services/printing-services",
    icon: "🖨️",
  },
  {
    title: "Business Automation",
    href: "/services/business-automation",
    icon: "⚙️",
  },
  {
    title: "Data Intelligence",
    href: "/services/data-intelligence",
    icon: "📊",
  },
];

export default function Page() {
  return (
    <ServicePageLayout
      data={{
        title: serviceData.title,
        tagline: serviceData.tagline,
        icon: serviceData.icon,
        fullDescription: serviceData.fullDescription,
        subServices: serviceData.subServices as any,
        relatedServices,

        // NEW
        heroImage: "/images/services/web-design.png",
      }}
    />
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import { servicesContent } from "@/content/services";

export const metadata: Metadata = {
  title: "Data Intelligence — Analytics, Dashboards & Database Solutions",
  description: "Business intelligence dashboards, data analytics, database design, data migration, predictive analytics, and data strategy consulting in Tanzania.",
};

const serviceData = servicesContent.services.find(s => s.slug === "data-intelligence")!;

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
        heroImage: "/images/services/data.png",
      }}
    />
  );
}
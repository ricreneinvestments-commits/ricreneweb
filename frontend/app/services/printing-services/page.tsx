/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import { servicesContent } from "@/content/services";

export const metadata: Metadata = {
  title: "Printing Services — T-shirts, Cards, Banners & More",
  description: "Full-range printing services in Tanzania: branded merchandise, business cards, large format banners, books, brochures, and custom packaging.",
};

const serviceData = servicesContent.services.find(s => s.slug === "printing-services")!;

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
        heroImage: "/images/services/printing.png",
      }}
    />
  );
}
import { Metadata } from "next";
import { siteContent } from "@/content/site";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

/**
 * Generate consistent metadata for pages
 * Centralizes SEO configuration for maintainability
 */
export function generateMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
}: SEOProps): Metadata {
  const url = `https://vertexsolutions.co.tz${path}`;
  const siteName = siteContent.company.name;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName,
      images: image ? [{ url: image }] : [],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  };
}

/**
 * Generate structured data (JSON-LD) for organization
 * Improves search engine understanding of the business
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteContent.company.name,
    description: siteContent.company.description,
    url: "https://vertexsolutions.co.tz",
    logo: "https://vertexsolutions.co.tz/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+255-XXX-XXX-XXX",
      contactType: "customer service",
      areaServed: "TZ",
      availableLanguage: ["en", "sw"],
    },
    sameAs: [
      // Social media profiles go here when available
    ],
  };
}

/**
 * Generate breadcrumb structured data
 * Helps search engines understand site hierarchy
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://vertexsolutions.co.tz${item.url}`,
    })),
  };
}
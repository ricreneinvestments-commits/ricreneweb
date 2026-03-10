import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./Providers";
import PageLoader from "@/components/PageLoader";
import ConditionalShell from "@/components/ConditionalShell";
import "./globals.css";

// ── Font ──────────────────────────────────────────────────────────────────────

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// ── Site info ─────────────────────────────────────────────────────────────────

const siteInfo = {
  name: "Ricrene Investment Ltd",
  tagline: "Innovative IT Solutions for Business Growth",
  description:
    "Leading IT solutions provider in Tanzania offering web development, custom business systems, data analytics, SEO, video production, and digital transformation services. Based in Dar es Salaam.",
  url: "https://ricrene.co.tz",
};

// ── Local Business Structured Data (Google) ───────────────────────────────────

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ITService",
  "name": "Ricrene Investment Ltd",
  "description": siteInfo.description,
  "url": siteInfo.url,
  "logo": `${siteInfo.url}/images/logo.png`,
  "image": `${siteInfo.url}/images/og-image.jpg`,
  "telephone": "+255-674-114-407",
  "email": "ricreneinvestments@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dar es Salaam",
    "addressCountry": "TZ"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -6.7924,
    "longitude": 39.2083
  },
  "areaServed": {
    "@type": "Country",
    "name": "Tanzania"
  },
  "priceRange": "TZS 50,000 – 10,000,000",
  "openingHours": "Mo-Sa 09:00-17:00",
  "sameAs": [],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "IT Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Website Design & Development" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Automation & Systems" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO & Digital Marketing" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Data Analytics & Insights" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Video Production & Streaming" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Domain & Hosting Subscriptions" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Business Email Solutions" } },
    ]
  }
};

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(siteInfo.url),
  title: {
    default: `${siteInfo.name} | IT Solutions Tanzania`,
    template: `%s | ${siteInfo.name}`,
  },
  description: siteInfo.description,
  keywords: [
    "IT solutions Tanzania",
    "web development Tanzania",
    "web development Dar es Salaam",
    "custom software Tanzania",
    "business systems Tanzania",
    "digital transformation Tanzania",
    "SEO services Tanzania",
    "data analysis Tanzania",
    "corporate email Tanzania",
    "video production Dar es Salaam",
    "website design Tanzania",
    "business automation Tanzania",
    "Ricrene Investment",
  ],
  authors: [{ name: siteInfo.name, url: siteInfo.url }],
  creator: siteInfo.name,
  publisher: siteInfo.name,
  alternates: {
    canonical: siteInfo.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteInfo.url,
    siteName: siteInfo.name,
    title: `${siteInfo.name} | IT Solutions Tanzania`,
    description: siteInfo.description,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${siteInfo.name} — IT Solutions Tanzania`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteInfo.name} | IT Solutions Tanzania`,
    description: siteInfo.description,
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your Google Search Console verification token here once domain is registered
    // google: "your-verification-token",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#DC2626",
};

// ── Layout ────────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="geo.region" content="TZ" />
        <meta name="geo.placename" content="Dar es Salaam, Tanzania" />
        {/* Local Business Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased bg-white text-gray-900">
        <Providers>
          <PageLoader />
          <ConditionalShell>
            {children}
          </ConditionalShell>
        </Providers>
      </body>
    </html>
  );
}
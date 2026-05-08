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
  tagline: "Innovative Digital Solutions for Business Growth",
  description:
    "Leading digital solutions provider in Tanzania offering website design & maintenance, professional photography & media production, printing services, business automation systems, and data intelligence. Based in Dar es Salaam.",
  url: "https://ricreneinvestment.co.tz",
};

// ── Local Business Structured Data (Google) ───────────────────────────────────

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ITService",
  "name": "Ricrene Investment Ltd",
  "description": siteInfo.description,
  "url": siteInfo.url,
  "logo": `${siteInfo.url}/images/logoBlue.png`,
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
    "name": "Digital Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Website Design & Maintenance",
          "description": "Professional website design, development, domain registration, web hosting, custom business emails, and SEO services."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Photography & Media Production",
          "description": "Professional photoshoots, events photography, live streaming, video production, digital marketing, and digital invitation cards."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Printing Services",
          "description": "Full-range printing solutions including T-shirts, cups, business cards, books, banners, brochures, and branded merchandise."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Business Automation",
          "description": "Custom business management systems including POS, e-commerce platforms, school management, hospital management, and financial systems."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Data Intelligence",
          "description": "Business intelligence, data analytics, dashboards, reporting systems, and data-driven decision support services."
        }
      }
    ]
  }
};

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(siteInfo.url),
  title: {
    default: `${siteInfo.name} | Digital Solutions Tanzania`,
    template: `%s | ${siteInfo.name}`,
  },
  description: siteInfo.description,
  keywords: [
    "digital solutions Tanzania",
    "website design Tanzania",
    "web development Dar es Salaam",
    "photography Tanzania",
    "events photography Dar es Salaam",
    "printing services Tanzania",
    "business automation Tanzania",
    "custom software Tanzania",
    "POS systems Tanzania",
    "school management system Tanzania",
    "data analytics Tanzania",
    "business intelligence Tanzania",
    "digital marketing Tanzania",
    "live streaming Tanzania",
    "video production Dar es Salaam",
    "SEO services Tanzania",
    "custom email Tanzania",
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
    title: `${siteInfo.name} | Digital Solutions Tanzania`,
    description: siteInfo.description,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${siteInfo.name} — Digital Solutions Tanzania`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteInfo.name} | Digital Solutions Tanzania`,
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
    // google: "your-verification-token",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#44B6E8",
};

// ── Layout ───────────────────────────────────────────────────────────────────
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
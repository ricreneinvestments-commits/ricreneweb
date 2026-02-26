import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

// Font optimization
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Site metadata
const siteInfo = {
  name: "Ricrene Investment Ltd",
  tagline: "Innovative IT Solutions for Business Growth",
  description: "Leading IT solutions provider in Tanzania, offering web development, custom business systems, data analysis, and digital transformation services.",
  url: "https://ricrene.co.tz", // Update with your actual domain
};

// Global metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL(siteInfo.url),
  title: {
    default: `${siteInfo.name} - ${siteInfo.tagline}`,
    template: `%s | ${siteInfo.name}`,
  },
  description: siteInfo.description,
  keywords: [
    "IT solutions Tanzania",
    "web development Pemba",
    "custom software Tanzania",
    "business systems",
    "enterprise solutions",
    "digital transformation",
    "SEO services Tanzania",
    "data analysis",
    "corporate email systems",
    "video production Tanzania",
  ],
  authors: [{ name: siteInfo.name }],
  creator: siteInfo.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteInfo.url,
    siteName: siteInfo.name,
    title: siteInfo.tagline,
    description: siteInfo.description,
    images: [
      {
        url: "/images/og-image.jpg", // Add this image to /public/images/
        width: 1200,
        height: 630,
        alt: siteInfo.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteInfo.tagline,
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
};

// Viewport configuration (separated from metadata as per Next.js 14+)
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#DC2626",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Additional Meta Tags */}
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="antialiased bg-white text-gray-900">
        {/* Fixed navbar */}
        <Navbar />
        
        {/* Main content */}
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* Optional: Add Analytics Script Here */}
        {/* Google Analytics, Facebook Pixel, etc. */}
      </body>
    </html>
  );
}
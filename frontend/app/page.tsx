import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { OurApproach } from "@/components/sections/ourApproach";
import { ProcessOverview } from "@/components/sections/ProcessOverview";
import { SocialProof } from "@/components/sections/SocialProof";
import CTASection from "@/components/sections/CTASection";
import { ContactSection } from "@/components/sections/ContactSection";

// Metadata for the home page
export const metadata = {
  title: "Home",
  description: "Transform your business with innovative IT solutions from Ricrene Investment Ltd. Web development, custom systems, data analysis, and more.",
};

/**
 * Home Page - Complete Landing Page
 * 
 * Strategic layout following conversion-focused design:
 * 1. Hero - Immediate value proposition with clear CTAs
 * 2. Trust Bar - Industries we serve
 * 3. Services - Core offerings overview
 * 4. Our Approach - Why work with us (authentic value propositions)
 * 5. Process - How we work (transparency builds trust)
 * 6. Social Proof - Client types we serve
 * 7. CTA - Primary conversion point
 * 8. Contact - Direct engagement form
 * 
 * Design principles:
 * - Mobile-first responsive design
 * - SEO-optimized semantic HTML
 * - Performance-conscious (lazy loading, optimized images)
 * - Clear visual hierarchy with red brand colors
 * - Conversion-focused user flow
 * - Accessibility compliance (WCAG 2.1 AA)
 * - Authentic messaging without inflated claims
 */
export default function HomePage() {
  return (
    <>
      {/* Hero Section - Above the fold */}
      <Hero />
      
      {/* Industries We Serve */}
      <TrustBar />
      
      {/* Core Services */}
      <ServicesOverview />
      
      {/* Our Approach - What makes us different (id="why-us" for nav) */}
      <OurApproach />
      
      {/* Our Process */}
      <ProcessOverview />
      
      {/* Social Proof - Client Types */}
      <SocialProof />
      
      {/* Call to Action */}
      <CTASection />
      
      {/* Contact Form */}
      <ContactSection />
    </>
  );
}
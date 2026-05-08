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
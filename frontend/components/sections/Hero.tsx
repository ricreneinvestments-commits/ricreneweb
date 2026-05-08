"use client";

import { useEffect, useRef, useState } from "react";

const BRAND = "#44B6E8";
const BRAND_DARK = "#2A9FD4";
const BRAND_PALE = "#EBF8FD";

const siteContent = {
  company: { foundedYear: "2020" },
  hero: {
    headline: "Innovative Digital Solutions for Business Growth",
    subheadline:
      "Empowering Tanzanian businesses with websites, media production, printing, custom systems, and data intelligence — all under one roof.",
    cta: {
      primary: "Explore Our Services",
      primaryUrl: "#services",
      secondary: "Get In Touch",
      secondaryUrl: "#contact",
    },
    backgroundMedia: { videoUrl: "" },
  },
};

export function Hero() {
  const { hero } = siteContent;
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const elements = heroRef.current?.querySelectorAll(".hero-animate");
    elements?.forEach((el, index) => {
      setTimeout(() => el.classList.add("animate-in"), index * 150);
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-sky-50 via-white to-gray-50"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-100/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-sky-50/40 via-transparent to-transparent" />

        {hero.backgroundMedia.videoUrl && (
          <video
            autoPlay loop muted playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? "opacity-20" : "opacity-0"}`}
          >
            <source src={hero.backgroundMedia.videoUrl} type="video/mp4" />
          </video>
        )}

        {/* Animated particles */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-[10%] w-3 h-3 rounded-full animate-ping" style={{ backgroundColor: BRAND }} />
          <div className="absolute top-40 right-[15%] w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: BRAND, animationDelay: "1s" }} />
          <div className="absolute bottom-32 left-[20%] w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: BRAND, animationDelay: "2s" }} />
          <div className="absolute bottom-20 right-[25%] w-3 h-3 rounded-full animate-ping" style={{ backgroundColor: BRAND, animationDelay: "0.5s" }} />
        </div>

        {/* Floating orbs */}
        <div
          className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full blur-3xl animate-float"
          style={{ background: `radial-gradient(circle, ${BRAND}30, ${BRAND}15)` }}
        />
        <div
          className="absolute bottom-20 left-[5%] w-[600px] h-[600px] rounded-full blur-3xl animate-float-delayed"
          style={{ background: `radial-gradient(circle, ${BRAND}20, ${BRAND}10)` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left content */}
          <div className="lg:col-span-6">
            {/* Badge */}
            <div className="hero-animate opacity-0 translate-y-4 transition-all duration-600 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border shadow-sm" style={{ borderColor: `${BRAND}50` }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: BRAND }} />
                <span className="text-sm font-medium text-gray-900">
                  Est. {siteContent.company.foundedYear} • Digital Solutions Tanzania
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="hero-animate opacity-0 translate-y-4 transition-all duration-600 text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {hero.headline}
            </h1>

            {/* Subheadline */}
            <p className="hero-animate opacity-0 translate-y-4 transition-all duration-600 text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-2xl">
              {hero.subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="hero-animate opacity-0 translate-y-4 transition-all duration-600 flex flex-col sm:flex-row gap-4">
              <a
                href={hero.cta.primaryUrl}
                onClick={(e) => { e.preventDefault(); document.querySelector(hero.cta.primaryUrl)?.scrollIntoView({ behavior: "smooth" }); }}
                className="group inline-flex items-center justify-center gap-2 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:-translate-y-1"
                style={{ background: `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})`, boxShadow: `0 10px 30px ${BRAND}40` }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 14px 36px ${BRAND}55`)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 10px 30px ${BRAND}40`)}
              >
                {hero.cta.primary}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href={hero.cta.secondaryUrl}
                onClick={(e) => { e.preventDefault(); document.querySelector(hero.cta.secondaryUrl)?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold border-2 hover:bg-sky-50 hover:shadow-lg transition-all"
                style={{ borderColor: `${BRAND}50` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = BRAND)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = `${BRAND}50`)}
              >
                {hero.cta.secondary}
              </a>
            </div>

            {/* Service pills */}
            <div className="hero-animate opacity-0 translate-y-4 transition-all duration-600 mt-10 flex flex-wrap gap-2">
              {["Web Design", "Photography", "Printing", "Business Automation", "Data Intelligence"].map((s) => (
                <span
                  key={s}
                  className="text-xs font-medium px-3 py-1.5 rounded-full border"
                  style={{ backgroundColor: BRAND_PALE, color: BRAND_DARK, borderColor: `${BRAND}40` }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Right visual */}
          <div className="lg:col-span-6 hero-animate opacity-0 scale-95 transition-all duration-800">
            <div className="relative">
              <div className="relative bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-gray-200 overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
                {/* Browser chrome */}
                <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-500 flex items-center gap-2">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    ricreneinvestment.co.tz
                  </div>
                </div>
                <div
                  className="aspect-[4/3] lg:min-h-[480px]"
                  style={{
                    background: `linear-gradient(135deg, white, ${BRAND_PALE})`,
                  }}
                >
                  <img src="/images/heroImage.png" alt="Website Preview" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Live badge */}
              <div className="absolute top-16 -right-3 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg rotate-12 animate-pulse" style={{ backgroundColor: BRAND }}>
                Live Preview
              </div>

              {/* Decorative shapes */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-3xl blur-2xl animate-pulse-slow" style={{ background: `${BRAND}40` }} />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-3xl blur-2xl animate-pulse-slow" style={{ background: `${BRAND}30`, animationDelay: "1s" }} />
              <div className="absolute -top-8 -left-8 w-16 h-16 rounded-2xl rotate-12 animate-spin-slow" style={{ border: `2px solid ${BRAND}40` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 hero-animate opacity-0 transition-all duration-600">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-gray-500 text-sm">Scroll to explore</span>
          <svg className="w-6 h-6" style={{ color: BRAND }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      <style jsx>{`
        .animate-in { opacity: 1 !important; transform: translateY(0) scale(1) !important; }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(5deg); }
          66% { transform: translate(-20px, 20px) rotate(-5deg); }
        }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        .animate-float { animation: float 20s ease-in-out infinite; }
        .animate-float-delayed { animation: float 25s ease-in-out infinite; animation-delay: -10s; }
        .animate-spin-slow { animation: spin-slow 30s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MobilePaymentModal } from "@/components/MobilePaymentModal";

// ─── Video packages (fixed prices shown) ──────────────────────────────────────
const videoPackages = [
  {
    id: "corporate",
    name: "Corporate Video",
    tagline: "Professional video content for your business",
    price: 800000,
    badge: null,
    theme: "light",
    duration: "Up to 3 min",
    delivery: "5–7 days",
    revisions: "2 rounds",
    features: [
      { text: "1-day shoot (half day)", included: true },
      { text: "Professional camera & lighting", included: true },
      { text: "Background music", included: true },
      { text: "Basic color grading", included: true },
      { text: "Lower thirds & titles", included: true },
      { text: "2 rounds of revisions", included: true },
      { text: "Multi-camera setup", included: false },
      { text: "Drone footage", included: false },
      { text: "Voiceover recording", included: false },
    ],
    idealFor: ["Company intro videos", "Product demos", "Staff profiles"],
  },
  {
    id: "live-streaming",
    name: "Live Streaming",
    tagline: "Broadcast your event to audiences everywhere",
    price: 1200000,
    badge: "Most Popular",
    theme: "red",
    duration: "Up to 8 hours",
    delivery: "Live event",
    revisions: "N/A",
    features: [
      { text: "Multi-camera live setup", included: true },
      { text: "Live streaming to YouTube/Facebook", included: true },
      { text: "Professional audio mixing", included: true },
      { text: "Live graphics & lower thirds", included: true },
      { text: "Recording & archive copy", included: true },
      { text: "Dedicated streaming crew", included: true },
      { text: "Drone footage", included: false },
      { text: "Post-event highlight reel", included: false },
      { text: "Multi-platform simultaneous", included: false },
    ],
    idealFor: ["Conferences", "Weddings", "Product launches", "Church services"],
  },
  {
    id: "premium",
    name: "Premium Production",
    tagline: "Full broadcast-quality production & streaming",
    price: 3500000,
    badge: "Broadcast Quality",
    theme: "dark",
    duration: "Full day +",
    delivery: "7–14 days",
    revisions: "Unlimited",
    features: [
      { text: "Full-day shoot (multiple locations)", included: true },
      { text: "Multi-camera 4K setup", included: true },
      { text: "Cinematic color grading", included: true },
      { text: "Professional voiceover", included: true },
      { text: "Custom motion graphics", included: true },
      { text: "Unlimited revisions", included: true },
      { text: "Drone aerial footage", included: true },
      { text: "Highlight reel + full recording", included: true },
      { text: "Multi-platform live streaming", included: true },
    ],
    idealFor: ["Major corporate events", "Brand films", "Award ceremonies"],
  },
];

// ─── Photography & custom services (quote-based) ──────────────────────────────
const photoServices = [
  {
    id: "wedding-photography",
    icon: "💍",
    name: "Wedding Photography",
    desc: "Full-day wedding coverage from getting ready to reception. Multiple edited galleries, drone shots of the venue, and a highlight photo album delivered within 2 weeks.",
    tags: ["Full-day coverage", "Edited gallery", "Drone shots", "Print-ready files"],
    idealFor: ["Weddings", "Engagement shoots", "Pre-wedding sessions"],
  },
  {
    id: "event-photography",
    icon: "🎉",
    name: "Event Photography",
    desc: "Conferences, galas, graduations, birthday celebrations, and corporate events — captured professionally with fast turnaround on edited images.",
    tags: ["Same-day previews", "Fast turnaround", "High-res delivery", "Group & candid shots"],
    idealFor: ["Corporate events", "Graduations", "Galas & parties"],
  },
  {
    id: "headshots",
    icon: "🧑‍💼",
    name: "Corporate Headshots & Team Photos",
    desc: "Professional headshots for staff profiles, LinkedIn, and company websites. Studio setup or on-location at your office. Individual and group formats.",
    tags: ["Studio or on-location", "LinkedIn-ready", "Same-day preview", "Multiple backgrounds"],
    idealFor: ["Executives", "Sales teams", "Company websites", "LinkedIn profiles"],
  },
  {
    id: "real-estate",
    icon: "🏠",
    name: "Real Estate Photography & Video",
    desc: "Property listings that sell faster. Interior photography, exterior drone shots, and walkthrough video tours — all optimized for listings and social media.",
    tags: ["Interior & exterior", "Drone aerial shots", "Video walkthroughs", "Listing-ready edits"],
    idealFor: ["Property developers", "Real estate agents", "Airbnb hosts", "Hotel & resort marketing"],
  },
  {
    id: "music-video",
    icon: "🎵",
    name: "Music Video & Short Film",
    desc: "Cinematic storytelling for artists and creators. Location scouting, lighting design, direction, and full post-production editing with color grading and VFX.",
    tags: ["Cinematic 4K", "Location scouting", "Color grading", "VFX & motion graphics"],
    idealFor: ["Music artists", "Filmmakers", "Content creators", "Festival submissions"],
  },
  {
    id: "commercial",
    icon: "📢",
    name: "TV Commercials & Ad Production",
    desc: "Broadcast-quality TV and social media ads. Concept development, scripting, full production crew, voiceover, and delivery in all broadcast formats.",
    tags: ["Concept to delivery", "Scriptwriting", "Broadcast formats", "Social media cuts"],
    idealFor: ["Brands & businesses", "Product launches", "TV & radio stations", "Digital ad campaigns"],
  },
];

// ─── All capabilities grid ────────────────────────────────────────────────────
const capabilities = [
  { icon: "🎬", title: "Corporate Video Production", desc: "Company intros, product showcases, testimonials, and training content — shot and edited to represent your brand." },
  { icon: "📸", title: "Event & Wedding Photography", desc: "Full-day coverage for weddings, corporate events, galas, and graduations with fast-turnaround edited galleries." },
  { icon: "📡", title: "Live Event Streaming", desc: "Broadcast your conference, seminar, wedding, or product launch to YouTube, Facebook, and custom platforms in real time." },
  { icon: "🚁", title: "Drone Aerial Footage", desc: "Cinematic aerial perspectives for real estate, events, music videos, and brand storytelling." },
  { icon: "🎤", title: "Voiceover & Audio", desc: "Professional voiceover in English and Swahili, plus high-quality audio mixing for broadcast-ready productions." },
  { icon: "✂️", title: "Post-Production & Editing", desc: "Color grading, motion graphics, title animations, subtitles, and sound design from raw footage to polished final cut." },
  { icon: "🎵", title: "Music Video & Short Film", desc: "Cinematic storytelling for artists and creators — from concept and location scouting through to full post-production." },
  { icon: "📢", title: "TV & Ad Production", desc: "Broadcast-quality commercials and social media ads — scriptwriting, full crew, voiceover, and delivery in all formats." },
];

// ─── Equipment we own ─────────────────────────────────────────────────────────
const equipment = [
  { icon: "📷", label: "4K Cinema Cameras" },
  { icon: "🚁", label: "Licensed Drones" },
  { icon: "💡", label: "Professional Lighting" },
  { icon: "🎤", label: "Studio Audio Gear" },
  { icon: "🎬", label: "Gimbal Stabilizers" },
  { icon: "📡", label: "Live Streaming Rigs" },
  { icon: "🖥️", label: "Editing Workstations" },
  { icon: "🔭", label: "Telephoto & Wide Lenses" },
];

// ─── Process steps ────────────────────────────────────────────────────────────
const processSteps = [
  { step: "01", icon: "📋", title: "Brief & Consultation", desc: "We discuss your goals, timeline, and creative vision. For video, we develop the script and shot list. For photography, we plan the shoot schedule and locations." },
  { step: "02", icon: "🎬", title: "Production Day", desc: "Our crew arrives fully equipped. We manage lighting, audio, direction, and camera work — you focus on your event or subject." },
  { step: "03", icon: "✂️", title: "Editing & Post-Production", desc: "We edit, color grade, add music and graphics, and send you a preview. Your feedback shapes the final version." },
  { step: "04", icon: "🚀", title: "Delivery", desc: "You receive all files in every format you need — broadcast, web, social media. We can upload and optimize for YouTube and listing platforms." },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatTZS(n: number) {
  return `TZS ${n.toLocaleString("en-TZ")}`;
}

function Check({ ok, theme }: { ok: boolean; theme: string }) {
  if (ok) {
    const color = theme === "red" ? "text-red-300" : theme === "dark" ? "text-emerald-400" : "text-red-600";
    return (
      <svg className={`w-5 h-5 shrink-0 ${color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5 shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function getCardStyle(theme: string) {
  if (theme === "red") return {
    wrapper: "border-red-300 shadow-2xl shadow-red-100/80",
    header: "bg-gradient-to-br from-red-600 to-red-700",
    headerText: "text-white", headerSub: "text-red-100",
    priceColor: "text-white", divider: "border-white/10",
    btn: "bg-white text-red-700 font-bold hover:bg-red-50 shadow-md",
    ideaBg: "bg-white/10 border border-white/10", accent: "text-red-200",
  };
  if (theme === "dark") return {
    wrapper: "border-gray-800 shadow-xl",
    header: "bg-gradient-to-br from-gray-900 to-black",
    headerText: "text-white", headerSub: "text-gray-400",
    priceColor: "text-white", divider: "border-white/10",
    btn: "bg-gradient-to-r from-red-600 to-red-700 text-white font-bold hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-500/20",
    ideaBg: "bg-gray-800/60 border border-gray-700", accent: "text-gray-500",
  };
  return {
    wrapper: "border-gray-200 shadow-sm hover:shadow-xl hover:border-red-100",
    header: "bg-gradient-to-br from-gray-50 to-white border-b border-gray-100",
    headerText: "text-gray-900", headerSub: "text-gray-500",
    priceColor: "text-red-600", divider: "border-gray-100",
    btn: "bg-gradient-to-r from-red-600 to-red-700 text-white font-bold hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-500/20",
    ideaBg: "bg-gray-50 border border-gray-100", accent: "text-gray-500",
  };
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function VideoProductionPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; amount: number; billingPeriod: "once" }>({
    name: "", amount: 0, billingPeriod: "once",
  });

  const openPayment = (name: string, amount: number) => {
    setSelectedPlan({ name, amount, billingPeriod: "once" });
    setModalOpen(true);
  };

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const goContact = () => { window.location.href = "/#contact"; };

  return (
    <div className="min-h-screen bg-white">
      <MobilePaymentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        planName={selectedPlan.name}
        amount={selectedPlan.amount}
        billingPeriod={selectedPlan.billingPeriod}
      />

      {/* ══ HERO ══ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-red-50 via-white to-gray-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-100/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 right-[8%] w-[500px] h-[500px] bg-gradient-to-br from-red-200/30 to-red-300/20 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-10 left-[3%] w-[600px] h-[600px] bg-gradient-to-tr from-red-100/20 to-red-200/15 rounded-full blur-3xl animate-float-delayed pointer-events-none" />
        <div className="absolute top-[10%] right-[20%] w-20 h-20 border-2 border-red-200/50 rounded-2xl rotate-12 animate-spin-slow pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <nav className={`flex items-center gap-2 text-sm text-gray-500 mb-10 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/#services" className="hover:text-red-600 transition-colors">Services</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-800 font-medium">Video & Photography</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <div className={`mb-6 transition-all duration-700 delay-100 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-red-200/50 shadow-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-900">Video Production · Photography · Live Streaming</span>
                </div>
              </div>

              <h1 className={`transition-all duration-700 delay-200 text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-[1.08] tracking-tight ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                Your Vision,
                <span className="relative block mt-1">
                  <span className="text-red-600">Captured Perfectly.</span>
                  <span className="absolute -bottom-1 left-0 w-2/3 h-3 bg-red-100/70 rounded-sm -z-0" />
                </span>
                <span className="block text-gray-500 text-3xl md:text-4xl lg:text-5xl font-semibold mt-2">Every frame counts.</span>
              </h1>

              <p className={`transition-all duration-700 delay-300 text-xl text-gray-600 mb-10 leading-relaxed max-w-xl ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                From cinematic wedding photography to broadcast-quality live streams and TV commercials — we own the equipment, we have the crew, and we handle everything from brief to final delivery.
              </p>

              <div className={`transition-all duration-700 delay-[400ms] flex flex-col sm:flex-row gap-4 mb-12 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <a
                  href="#video-packages"
                  onClick={(e) => { e.preventDefault(); document.getElementById("video-packages")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-500/30 hover:shadow-xl transform hover:-translate-y-1"
                >
                  View Packages & Services
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
                <button onClick={goContact} className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold border-2 border-red-200 hover:border-red-300 hover:bg-red-50 hover:shadow-lg transition-all">
                  Discuss Your Project
                </button>
              </div>

              <div className={`transition-all duration-700 delay-500 flex flex-wrap gap-3 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                {[
                  { icon: "🎬", text: "4K video" },
                  { icon: "📸", text: "Photography" },
                  { icon: "📡", text: "Live streaming" },
                  { icon: "🚁", text: "Licensed drones" },
                  { icon: "🎤", text: "Swahili voiceover" },
                  { icon: "🇹🇿", text: "Dar es Salaam" },
                ].map((pill) => (
                  <div key={pill.text} className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/70 backdrop-blur-sm border border-gray-200/80 rounded-full text-sm text-gray-700 shadow-sm">
                    <span>{pill.icon}</span><span className="font-medium">{pill.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero mockup */}
            <div className={`lg:col-span-5 transition-all duration-1000 delay-300 ${heroVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-full h-full bg-red-100 rounded-3xl border border-red-200 opacity-40" />
                <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
                  <div className="bg-gradient-to-br from-gray-900 to-black p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">● LIVE</p>
                        <h3 className="text-white text-xl font-black mt-0.5">Annual Conference 2025</h3>
                      </div>
                      <div className="flex items-center gap-1.5 bg-red-500/20 border border-red-500/40 rounded-full px-3 py-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-red-300 text-xs font-bold">ON AIR</span>
                      </div>
                    </div>
                    <div className="bg-black rounded-xl overflow-hidden aspect-video flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 to-black" />
                      <div className="relative text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                        <p className="text-white/60 text-xs">Live Preview</p>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/60 rounded px-2 py-1">
                        <p className="text-white text-xs font-bold">4K 30fps</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {[{ l: "Viewers", v: "1,842" }, { l: "Duration", v: "2:14:33" }, { l: "Cameras", v: "3 active" }].map((m) => (
                        <div key={m.l} className="bg-white/5 rounded-xl p-2.5 text-center">
                          <p className="text-white font-black text-sm">{m.v}</p>
                          <p className="text-gray-400 text-xs">{m.l}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    {[
                      { label: "YouTube Live", status: "Streaming" },
                      { label: "Facebook Live", status: "Streaming" },
                      { label: "Recording backup", status: "Saving" },
                      { label: "Audio levels", status: "Optimal" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                        <p className="text-xs text-gray-700 font-medium">{item.label}</p>
                        <span className="text-xs font-bold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full">{item.status}</span>
                      </div>
                    ))}
                  </div>
                  <div className="px-5 pb-5">
                    <button onClick={goContact} className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-sm hover:from-red-700 hover:to-red-800 transition-all">
                      Book Our Team
                    </button>
                  </div>
                </div>
                <div className="absolute -top-4 -left-6 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 z-20 animate-float">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center"><span className="text-base">🚁</span></div>
                    <div><p className="text-xs font-bold text-gray-800">Drone available</p><p className="text-xs text-gray-400">Licensed & permitted</p></div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 z-20 animate-float-delayed">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center"><span className="text-base">📸</span></div>
                    <div><p className="text-xs font-bold text-gray-800">Photo + Video</p><p className="text-xs text-gray-400">One crew, full coverage</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CAPABILITIES ══ */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-red-700">What We Do</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Video, photography, and everything in between</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">One professional crew with all the equipment — for every kind of production job in Tanzania.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {capabilities.map((item) => (
              <div key={item.title} className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-red-200 hover:shadow-lg transition-all duration-300">
                <span className="text-3xl block mb-4">{item.icon}</span>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                <div className="mt-4 h-1 w-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full group-hover:w-14 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ EQUIPMENT STRIP ══ */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mr-2">Our equipment:</span>
            {equipment.map((item) => (
              <div key={item.label} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-700">
                <span>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ VIDEO PACKAGES (with prices) ══ */}
      <section id="video-packages" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-red-700">Video Production</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">Video Packages</h2>
            <p className="text-gray-500 text-lg">Fixed per-project pricing for our most common video services.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-8">
            {videoPackages.map((pkg) => {
              const s = getCardStyle(pkg.theme);
              return (
                <div key={pkg.id} className={`relative flex flex-col rounded-3xl border-2 overflow-hidden transition-all duration-300 ${s.wrapper}`}>
                  {pkg.badge && (
                    <div className="bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-black text-center py-2 tracking-wider uppercase">
                      ✦ {pkg.badge} ✦
                    </div>
                  )}
                  <div className={`p-8 ${s.header}`}>
                    <h3 className={`text-2xl font-black ${s.headerText}`}>{pkg.name}</h3>
                    <p className={`text-sm mt-1 mb-5 ${s.headerSub}`}>{pkg.tagline}</p>
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-wide mb-1 ${pkg.theme !== "light" ? "text-white/40" : "text-gray-400"}`}>Starting from</p>
                      <span className={`text-4xl font-black ${s.priceColor}`}>{formatTZS(pkg.price)}</span>
                      <span className={`text-sm ml-2 ${s.headerSub}`}>per project</span>
                    </div>
                    <div className={`mt-5 flex gap-3 pt-5 border-t ${s.divider}`}>
                      {[{ l: "Duration", v: pkg.duration }, { l: "Delivery", v: pkg.delivery }, { l: "Revisions", v: pkg.revisions }].map((sp) => (
                        <div key={sp.l} className="text-center flex-1">
                          <p className={`text-xs font-bold uppercase tracking-wide mb-0.5 ${pkg.theme !== "light" ? "text-white/40" : "text-gray-400"}`}>{sp.l}</p>
                          <p className={`text-xs font-bold ${pkg.theme !== "light" ? "text-white" : "text-gray-800"}`}>{sp.v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col p-8">
                    <div className={`mb-6 rounded-xl p-4 ${s.ideaBg}`}>
                      <p className={`text-xs font-bold uppercase tracking-wide mb-2 ${s.accent}`}>Ideal for</p>
                      <div className="flex flex-wrap gap-1.5">
                        {pkg.idealFor.map((u) => (
                          <span key={u} className="text-xs bg-white border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full">{u}</span>
                        ))}
                      </div>
                    </div>
                    <ul className="space-y-3 mb-8 flex-1">
                      {pkg.features.map((f) => (
                        <li key={f.text} className={`flex items-center gap-3 text-sm ${f.included ? "text-gray-700" : "text-gray-400"}`}>
                          <Check ok={f.included} theme={pkg.theme} />
                          <span className={!f.included ? "line-through decoration-gray-300" : ""}>{f.text}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => openPayment(pkg.name, pkg.price)}
                      className={`w-full py-4 rounded-xl text-sm transition-all duration-200 transform hover:-translate-y-0.5 ${s.btn}`}
                    >
                      Book {pkg.name}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-gray-400 text-sm">
            Need something not listed above?{" "}
            <button onClick={goContact} className="text-red-600 font-semibold hover:underline">Request a custom video quote →</button>
          </p>
        </div>
      </section>

      {/* ══ PHOTOGRAPHY & CUSTOM SERVICES (quote-based) ══ */}
      <section id="photography" className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-red-700">Photography & Production Services</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Photography & Custom Productions</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Every project is unique — these services are quoted individually based on your brief, location, timeline, and scope.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photoServices.map((svc) => (
              <div key={svc.id} className="group bg-white rounded-2xl border border-gray-200 hover:border-red-200 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
                {/* Card header */}
                <div className="p-6 pb-4 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl">{svc.icon}</span>
                    <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Custom quote</span>
                  </div>
                  <h3 className="text-lg font-black text-gray-900 mb-2 group-hover:text-red-600 transition-colors">{svc.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{svc.desc}</p>
                </div>

                {/* Tags */}
                <div className="px-6 py-4 flex-1">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Includes</p>
                  <div className="flex flex-wrap gap-2">
                    {svc.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1.5 text-xs bg-red-50 text-red-700 border border-red-100 px-2.5 py-1 rounded-full font-medium">
                        <div className="w-1 h-1 bg-red-400 rounded-full" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Ideal for</p>
                    <p className="text-xs text-gray-500">{svc.idealFor.join(" · ")}</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="px-6 pb-6">
                  <button
                    onClick={goContact}
                    className="w-full py-3 rounded-xl border-2 border-red-200 text-red-700 font-bold text-sm hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                  >
                    Get a Quote for {svc.name}
                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Why no prices note */}
          <div className="mt-10 max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 flex gap-4 items-start">
            <span className="text-2xl shrink-0">💬</span>
            <div>
              <p className="font-bold text-gray-900 mb-1">Why no prices listed?</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Photography and custom production jobs vary significantly — a corporate headshot session at your office is very different from a multi-location wedding or a TV commercial. We quote every project individually so you only pay for exactly what your job needs. Get in touch with your brief and we&apos;ll come back within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-red-700">How It Works</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">From Brief to Final Delivery</h2>
            <p className="text-gray-500 text-lg">A professional, stress-free process whether it&apos;s a photoshoot, live stream, or full film production.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <div key={step.step} className="relative group">
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-red-200 to-transparent z-0" />
                )}
                <div className="relative z-10 bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-red-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{step.icon}</span>
                    <span className="text-5xl font-black text-red-100 leading-none">{step.step}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">Common Questions</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "Do you do both photography and video at the same event?", a: "Yes. Because we own all the equipment and have a full crew, we can run a simultaneous photo and video operation at the same event — one team, full coverage. This is especially useful for weddings and corporate events where you want both." },
              { q: "How far in advance should I book?", a: "For live streaming, at least 2 weeks to allow for a technical site visit. For major events or weddings, 4–6 weeks is ideal. Corporate video shoots and headshot sessions can usually be arranged within 1 week." },
              { q: "How do I get a quote for photography or custom services?", a: "Send us a brief via the contact form or WhatsApp — your event date, location, what you need covered, and any specific requirements. We'll come back within 24 hours with a detailed quote." },
              { q: "What internet speed is needed for live streaming?", a: "At least 10 Mbps stable upload at the venue. We always do a technical site visit beforehand. If the venue internet is unreliable, we bring our own 4G/5G bonding equipment as a backup." },
              { q: "Do you produce and shoot in Swahili?", a: "Yes. We have professional voiceover artists for both English and Swahili productions, and our crew is fully bilingual for on-set direction." },
              { q: "Do you have drone permits in Tanzania?", a: "Yes. We operate commercially licensed drones and hold all required permits for aerial filming in Tanzania. We handle permit logistics for every job." },
              { q: "Can I get edited photos on the same day as the event?", a: "For events, we can provide a set of quick-edited preview photos on the same day, with the full professionally edited gallery delivered within 3–7 days depending on volume." },
              { q: "What formats do I receive for video deliverables?", a: "You receive the full HD/4K master file plus optimized versions for YouTube, Instagram, WhatsApp, and any broadcast format you specify. We provide both landscape (16:9) and portrait (9:16) cuts for social media." },
            ].map((faq, i) => (
              <details key={i} className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-red-200 transition-colors">
                <summary className="flex justify-between items-center px-6 py-5 cursor-pointer font-semibold text-gray-900 hover:text-red-700 transition-colors list-none group-open:text-red-700">
                  {faq.q}
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 group-open:text-red-500 transition-all shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-red-50 via-white to-gray-50">
        <div className="absolute top-10 right-[10%] w-72 h-72 bg-gradient-to-br from-red-200/30 to-red-300/20 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-10 left-[5%] w-96 h-96 bg-gradient-to-tr from-red-100/20 to-red-200/15 rounded-full blur-3xl animate-float-delayed pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-red-200/50 shadow-sm mb-6">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-900">Ready to create something great?</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
            Tell us about your project.
            <span className="block text-red-600">We&apos;ll handle the rest.</span>
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-xl mx-auto">
            Whether it&apos;s a wedding, a live stream, a commercial, or a real estate shoot — send us your brief and we&apos;ll come back with a detailed proposal within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={goContact}
              className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-500/30 hover:shadow-xl transform hover:-translate-y-1"
            >
              Book Our Team
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <Link href="/#services" className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold border-2 border-red-200 hover:border-red-300 hover:bg-red-50 hover:shadow-lg transition-all">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float { 0%, 100% { transform: translate(0,0) rotate(0deg); } 33% { transform: translate(20px,-20px) rotate(3deg); } 66% { transform: translate(-15px,15px) rotate(-3deg); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-float { animation: float 18s ease-in-out infinite; }
        .animate-float-delayed { animation: float 22s ease-in-out infinite; animation-delay: -8s; }
        .animate-spin-slow { animation: spin-slow 25s linear infinite; }
      `}</style>
    </div>
  );
}
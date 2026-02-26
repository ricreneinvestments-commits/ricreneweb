"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MobilePaymentModal } from "@/components/MobilePaymentModal";

type Tab = "websites" | "hosting" | "maintenance";

// ─── Data ─────────────────────────────────────────────────────────────────────
const websitePackages = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Perfect for individuals & small businesses",
    price: 350000,
    badge: null,
    theme: "light",
    idealFor: ["Personal websites", "Landing pages", "Portfolio sites", "Small business brochure"],
    deliveryDays: "7–10 days",
    pages: "Up to 5 pages",
    revisions: "1 round",
    features: [
      { text: "Up to 5 pages", included: true },
      { text: "Mobile responsive design", included: true },
      { text: "Contact form integration", included: true },
      { text: "Basic SEO setup", included: true },
      { text: "Google Maps integration", included: true },
      { text: "WhatsApp chat button", included: true },
      { text: "Social media links", included: true },
      { text: "1 round of revisions", included: true },
      { text: "E-commerce / online shop", included: false },
      { text: "Blog / news section", included: false },
      { text: "Admin dashboard", included: false },
      { text: "Custom integrations", included: false },
    ],
  },
  {
    id: "business",
    name: "Business",
    tagline: "For growing businesses that need more",
    price: 950000,
    badge: "Most Popular",
    theme: "red",
    idealFor: ["Corporate websites", "Service businesses", "Blogs & news sites", "NGOs & non-profits"],
    deliveryDays: "14–21 days",
    pages: "Up to 15 pages",
    revisions: "3 rounds",
    features: [
      { text: "Up to 15 pages", included: true },
      { text: "Mobile responsive design", included: true },
      { text: "Contact + booking forms", included: true },
      { text: "Full SEO optimization", included: true },
      { text: "Google Maps + Analytics", included: true },
      { text: "WhatsApp chat button", included: true },
      { text: "Social media integration", included: true },
      { text: "3 rounds of revisions", included: true },
      { text: "Blog / news section", included: true },
      { text: "Gallery / portfolio section", included: true },
      { text: "E-commerce / online shop", included: false },
      { text: "Admin dashboard", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Full-featured solution for serious businesses",
    price: 2000000,
    badge: "Full Power",
    theme: "dark",
    idealFor: ["E-commerce stores", "Booking systems", "Membership portals", "Complex business apps"],
    deliveryDays: "21–35 days",
    pages: "Unlimited pages",
    revisions: "Unlimited",
    features: [
      { text: "Unlimited pages", included: true },
      { text: "Mobile responsive design", included: true },
      { text: "Advanced forms & automation", included: true },
      { text: "Full SEO + performance audit", included: true },
      { text: "Google Analytics + Tag Manager", included: true },
      { text: "WhatsApp chat button", included: true },
      { text: "Social media integration", included: true },
      { text: "Unlimited revisions", included: true },
      { text: "Blog / news section", included: true },
      { text: "E-commerce / online shop", included: true },
      { text: "Admin dashboard", included: true },
      { text: "Custom integrations", included: true },
    ],
  },
];

const hostingPlans = [
  {
    id: "basic-host",
    name: "Basic",
    yearlyPrice: 120000,
    theme: "light",
    badge: null,
    specs: [
      { label: "Websites", value: "1 website" },
      { label: "Storage", value: "5 GB SSD" },
      { label: "Emails", value: "5 accounts" },
      { label: "Bandwidth", value: "Limited" },
    ],
    features: [
      { text: "Free .co.tz domain (1st year)", included: true },
      { text: "Free SSL certificate", included: true },
      { text: "cPanel control panel", included: true },
      { text: "99.9% uptime guarantee", included: true },
      { text: "Unlimited bandwidth", included: false },
      { text: "Daily backups", included: false },
      { text: "Priority support", included: false },
    ],
  },
  {
    id: "business-host",
    name: "Business",
    yearlyPrice: 300000,
    badge: "Best Value",
    theme: "red",
    specs: [
      { label: "Websites", value: "5 websites" },
      { label: "Storage", value: "20 GB SSD" },
      { label: "Emails", value: "25 accounts" },
      { label: "Bandwidth", value: "Unlimited" },
    ],
    features: [
      { text: "Free domain (1st year)", included: true },
      { text: "Free SSL certificate", included: true },
      { text: "cPanel control panel", included: true },
      { text: "99.9% uptime guarantee", included: true },
      { text: "Unlimited bandwidth", included: true },
      { text: "Daily backups", included: true },
      { text: "Priority support", included: false },
    ],
  },
  {
    id: "premium-host",
    name: "Premium",
    yearlyPrice: 600000,
    theme: "dark",
    badge: null,
    specs: [
      { label: "Websites", value: "Unlimited" },
      { label: "Storage", value: "50 GB SSD" },
      { label: "Emails", value: "Unlimited" },
      { label: "Bandwidth", value: "Unlimited" },
    ],
    features: [
      { text: "Free domain (1st year)", included: true },
      { text: "Free SSL certificate", included: true },
      { text: "cPanel control panel", included: true },
      { text: "99.99% uptime guarantee", included: true },
      { text: "Unlimited bandwidth", included: true },
      { text: "Daily backups + restore", included: true },
      { text: "24/7 priority support", included: true },
    ],
  },
];

const maintenancePlans = [
  {
    id: "basic-maint",
    name: "Basic Care",
    monthlyPrice: 30000,
    yearlyPrice: 300000,
    theme: "light",
    badge: null,
    responseTime: "48 hours",
    contentHours: "1 hr / month",
    features: [
      { text: "Monthly security scans", included: true },
      { text: "CMS & plugin updates", included: true },
      { text: "Uptime monitoring", included: true },
      { text: "Monthly performance report", included: true },
      { text: "Weekly backups", included: true },
      { text: "1 hour content updates/month", included: true },
      { text: "Bug fixes", included: false },
      { text: "Priority response (24hr)", included: false },
      { text: "Design changes", included: false },
    ],
  },
  {
    id: "business-maint",
    name: "Business Care",
    monthlyPrice: 70000,
    yearlyPrice: 720000,
    badge: "Most Popular",
    theme: "red",
    responseTime: "24 hours",
    contentHours: "3 hrs / month",
    features: [
      { text: "Weekly security scans", included: true },
      { text: "CMS & plugin updates", included: true },
      { text: "Uptime monitoring", included: true },
      { text: "Weekly performance reports", included: true },
      { text: "Daily backups", included: true },
      { text: "3 hours content updates/month", included: true },
      { text: "Bug fixes included", included: true },
      { text: "Priority response (24hr)", included: true },
      { text: "Design changes", included: false },
    ],
  },
  {
    id: "premium-maint",
    name: "Premium Care",
    monthlyPrice: 150000,
    yearlyPrice: 1500000,
    theme: "dark",
    badge: null,
    responseTime: "2 hours",
    contentHours: "Unlimited",
    features: [
      { text: "Daily security scans", included: true },
      { text: "CMS & plugin updates", included: true },
      { text: "Real-time uptime monitoring", included: true },
      { text: "Real-time performance dashboard", included: true },
      { text: "Hourly backups + restore", included: true },
      { text: "Unlimited content updates", included: true },
      { text: "Bug fixes included", included: true },
      { text: "Priority response (2hr)", included: true },
      { text: "Design changes included", included: true },
    ],
  },
];

const websiteTypes = [
  { id: "brochure", label: "Brochure Site", icon: "🏢", recommended: "starter", desc: "5 pages or less" },
  { id: "portfolio", label: "Portfolio / CV", icon: "🎨", recommended: "starter", desc: "Showcase your work" },
  { id: "corporate", label: "Corporate", icon: "💼", recommended: "business", desc: "Full company site" },
  { id: "blog", label: "Blog / News", icon: "📰", recommended: "business", desc: "Content-driven" },
  { id: "ecommerce", label: "Online Shop", icon: "🛒", recommended: "premium", desc: "Sell products online" },
  { id: "booking", label: "Booking System", icon: "📅", recommended: "premium", desc: "Appointments & reservations" },
  { id: "nonprofit", label: "NGO / Non-Profit", icon: "🤝", recommended: "business", desc: "Organization website" },
  { id: "school", label: "School / Institution", icon: "🎓", recommended: "premium", desc: "Education platform" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatTZS(n: number) {
  return `TZS ${n.toLocaleString("en-TZ")}`;
}

function Check({ ok, theme }: { ok: boolean; theme: string }) {
  if (ok) {
    const color = theme === "red" ? "text-red-400" : theme === "dark" ? "text-emerald-400" : "text-red-600";
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

function getCardStyle(theme: string, highlighted: boolean) {
  const scale = highlighted ? "scale-[1.02]" : "";
  if (theme === "red") return {
    wrapper: `border-red-300 shadow-2xl shadow-red-100/80 ${scale}`,
    header: "bg-gradient-to-br from-red-600 to-red-700",
    headerText: "text-white", headerSub: "text-red-100",
    priceColor: "text-white", divider: "border-white/10",
    badgeBg: "bg-white text-red-600",
    btn: "bg-white text-red-700 font-bold hover:bg-red-50 shadow-md",
    ideaBg: "bg-red-50 border border-red-100", accent: "text-red-600",
  };
  if (theme === "dark") return {
    wrapper: `border-gray-800 shadow-xl ${scale}`,
    header: "bg-gradient-to-br from-gray-900 to-black",
    headerText: "text-white", headerSub: "text-gray-400",
    priceColor: "text-white", divider: "border-white/10",
    badgeBg: "bg-red-600 text-white",
    btn: "bg-gradient-to-r from-red-600 to-red-700 text-white font-bold hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-500/20",
    ideaBg: "bg-gray-50 border border-gray-200", accent: "text-gray-500",
  };
  return {
    wrapper: `border-gray-200 shadow-sm hover:shadow-xl hover:border-red-100 ${highlighted ? "border-red-300 shadow-xl shadow-red-50 " + scale : ""}`,
    header: "bg-gradient-to-br from-gray-50 to-white border-b border-gray-100",
    headerText: "text-gray-900", headerSub: "text-gray-500",
    priceColor: "text-red-600", divider: "border-gray-100",
    badgeBg: "bg-red-100 text-red-700",
    btn: "bg-gradient-to-r from-red-600 to-red-700 text-white font-bold hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-500/20",
    ideaBg: "bg-gray-50 border border-gray-100", accent: "text-gray-500",
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function WebDevelopmentPage() {
  const [activeTab, setActiveTab] = useState<Tab>("websites");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [highlightPkg, setHighlightPkg] = useState<string | null>(null);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [heroVisible, setHeroVisible] = useState(false);

  // ── Modal state ──────────────────────────────────────────────────────────────
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    amount: number;
    billingPeriod: "monthly" | "yearly" | "once";
  }>({ name: "", amount: 0, billingPeriod: "once" });

  const openPayment = (
    name: string,
    amount: number,
    billingPeriod: "monthly" | "yearly" | "once"
  ) => {
    setSelectedPlan({ name, amount, billingPeriod });
    setModalOpen(true);
  };
  // ────────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const goContact = () => { window.location.href = "/#contact"; };

  const handleTypeSelect = (id: string, recommended: string) => {
    if (selectedType === id) {
      setSelectedType(null); setHighlightPkg(null);
    } else {
      setSelectedType(id); setHighlightPkg(recommended);
      setActiveTab("websites");
      setTimeout(() => document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    }
  };

  const tabs: { id: Tab; label: string; sub: string }[] = [
    { id: "websites", label: "Website Packages", sub: "One-time" },
    { id: "hosting", label: "Hosting Plans", sub: "Yearly" },
    { id: "maintenance", label: "Maintenance", sub: "Monthly" },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* ── Modal — rendered once, outside all sections ── */}
      <MobilePaymentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        planName={selectedPlan.name}
        amount={selectedPlan.amount}
        billingPeriod={selectedPlan.billingPeriod}
      />

      {/* ══ HERO ══ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-red-50 via-white to-gray-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-100/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-red-50/50 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 right-[8%] w-[500px] h-[500px] bg-gradient-to-br from-red-200/30 to-red-300/20 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-10 left-[3%] w-[600px] h-[600px] bg-gradient-to-tr from-red-100/20 to-red-200/15 rounded-full blur-3xl animate-float-delayed pointer-events-none" />
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          {[
            { top: "15%", left: "8%", delay: "0s", size: "w-3 h-3" },
            { top: "35%", right: "12%", delay: "1s", size: "w-2 h-2" },
            { bottom: "28%", left: "18%", delay: "2s", size: "w-2 h-2" },
            { bottom: "18%", right: "22%", delay: "0.5s", size: "w-3 h-3" },
            { top: "60%", left: "45%", delay: "1.5s", size: "w-2 h-2" },
          ].map((p: { top?: string; bottom?: string; left?: string; right?: string; delay: string; size: string }, i) => (
            <div key={i} className={`absolute ${p.size} bg-red-400 rounded-full animate-ping`}
              style={{ top: p.top, bottom: p.bottom, left: p.left, right: p.right, animationDelay: p.delay }} />
          ))}
        </div>
        <div className="absolute top-[12%] right-[18%] w-20 h-20 border-2 border-red-200/50 rounded-2xl rotate-12 animate-spin-slow pointer-events-none" />
        <div className="absolute bottom-[20%] left-[12%] w-12 h-12 border-2 border-red-200/40 rounded-xl -rotate-6 animate-spin-slow pointer-events-none" style={{ animationDirection: "reverse" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <nav className={`flex items-center gap-2 text-sm text-gray-500 mb-10 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/#services" className="hover:text-red-600 transition-colors">Services</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-800 font-medium">Website Design & Development</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <div className={`mb-6 transition-all duration-700 delay-100 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-red-200/50 shadow-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-900">Website Design & Development</span>
                </div>
              </div>

              <h1 className={`transition-all duration-700 delay-200 text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-[1.08] tracking-tight ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                Websites That
                <span className="relative inline-block ml-3">
                  <span className="text-red-600">Work For You</span>
                  <span className="absolute -bottom-1 left-0 w-full h-3 bg-red-100/70 rounded-sm -z-0" />
                </span>
                <span className="block text-gray-500 text-3xl md:text-4xl lg:text-5xl font-semibold mt-2">
                  Around the clock.
                </span>
              </h1>

              <p className={`transition-all duration-700 delay-300 text-xl text-gray-600 mb-10 leading-relaxed max-w-xl ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                From a clean brochure site to a full optimized website — we build fast, modern websites tailored for Tanzanian businesses. Transparent pricing, local support.
              </p>

              <div className={`transition-all duration-700 delay-[400ms] flex flex-col sm:flex-row gap-4 mb-12 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <a
                  href="#type-selector"
                  onClick={(e) => { e.preventDefault(); document.getElementById("type-selector")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transform hover:-translate-y-1"
                >
                  Choose Your Package
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <button onClick={goContact} className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold border-2 border-red-200 hover:border-red-300 hover:bg-red-50 hover:shadow-lg transition-all">
                  Get a Custom Quote
                </button>
              </div>

              <div className={`transition-all duration-700 delay-500 flex flex-wrap gap-3 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                {[
                  { icon: "⚡", text: "Fast delivery" },
                  { icon: "📱", text: "Mobile-first" },
                  { icon: "🔒", text: "SSL included" },
                  { icon: "🇹🇿", text: "Tanzanian team" },
                  { icon: "💬", text: "WhatsApp support" },
                ].map((pill) => (
                  <div key={pill.text} className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/70 backdrop-blur-sm border border-gray-200/80 rounded-full text-sm text-gray-700 shadow-sm">
                    <span>{pill.icon}</span>
                    <span className="font-medium">{pill.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`lg:col-span-5 transition-all duration-1000 delay-300 ${heroVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-full h-full bg-red-100 rounded-3xl border border-red-200 opacity-40" />
                <div className="absolute -top-2 -right-2 w-full h-full bg-red-50 rounded-3xl border border-red-100 opacity-60" />
                <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
                  <div className="bg-gradient-to-br from-red-600 to-red-700 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-red-200 text-xs font-bold uppercase tracking-widest">Most Popular</span>
                        <h3 className="text-white text-2xl font-black mt-1">Business Package</h3>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2 text-center">
                        <span className="text-white/70 text-xs block">Starting at</span>
                        <span className="text-white font-black text-sm">TZS 950K</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["15 pages", "SEO included", "3 revisions", "21 days"].map((tag) => (
                        <span key={tag} className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">What&apos;s included</p>
                    <ul className="space-y-2.5 mb-6">
                      {["Mobile responsive design", "Full SEO optimization", "Blog / news section", "Contact + booking forms", "Google Analytics setup"].map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                          <div className="w-5 h-5 rounded-full bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
                            <svg className="w-3 h-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => document.getElementById("type-selector")?.scrollIntoView({ behavior: "smooth" })}
                      className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-sm hover:from-red-700 hover:to-red-800 transition-all"
                    >
                      See All Packages ↓
                    </button>
                  </div>
                </div>
                <div className="absolute -top-4 -left-6 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 z-20 animate-float">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">M-Pesa accepted</p>
                      <p className="text-xs text-gray-400">Easy payment</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 z-20 animate-float-delayed">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🇹🇿</span>
                    <div>
                      <p className="text-xs font-bold text-gray-800">Local Support</p>
                      <p className="text-xs text-gray-400">Dar es Salaam based</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-red-300/40 to-red-400/30 rounded-3xl blur-2xl animate-pulse-slow pointer-events-none" />
                <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-gradient-to-br from-red-200/30 to-red-300/40 rounded-3xl blur-2xl animate-pulse-slow pointer-events-none" style={{ animationDelay: "1s" }} />
                <div className="absolute -top-8 -left-8 w-14 h-14 border-2 border-red-200/40 rounded-2xl rotate-12 animate-spin-slow pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-all duration-700 delay-700 ${heroVisible ? "opacity-100" : "opacity-0"}`}>
          <a href="#type-selector"
            onClick={(e) => { e.preventDefault(); document.getElementById("type-selector")?.scrollIntoView({ behavior: "smooth" }); }}
            className="flex flex-col items-center gap-2 animate-bounce text-gray-500 hover:text-red-500 transition-colors">
            <span className="text-sm">Explore packages</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>

      {/* ══ WEBSITE TYPE SELECTOR ══ */}
      <section id="type-selector" className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-red-700">Step 1 of 2</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">What kind of website do you need?</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Select your type and we&apos;ll highlight the right package for you.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
            {websiteTypes.map((type) => (
              <button key={type.id} onClick={() => handleTypeSelect(type.id, type.recommended)}
                className={`group relative flex flex-col items-center gap-2.5 p-4 rounded-2xl border-2 transition-all duration-200 text-center overflow-hidden ${
                  selectedType === type.id
                    ? "border-red-500 bg-red-600 shadow-lg shadow-red-200"
                    : "border-gray-200 bg-white hover:border-red-300 hover:shadow-md hover:bg-red-50/30"
                }`}>
                {selectedType === type.id && <div className="absolute inset-0 bg-red-600" />}
                <span className={`text-3xl relative z-10 ${selectedType !== type.id && "group-hover:scale-110 transition-transform duration-200"}`}>
                  {type.icon}
                </span>
                <div className="relative z-10">
                  <p className={`text-xs font-bold leading-tight ${selectedType === type.id ? "text-white" : "text-gray-800 group-hover:text-red-700"}`}>{type.label}</p>
                  <p className={`text-xs mt-0.5 ${selectedType === type.id ? "text-red-100" : "text-gray-400"}`}>{type.desc}</p>
                </div>
                {selectedType === type.id && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>

          {selectedType && (
            <div className="flex items-center justify-center gap-3 text-sm text-red-700 bg-white border-2 border-red-200 rounded-2xl px-6 py-4 w-fit mx-auto shadow-sm">
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold">We&apos;ve highlighted the best package for you below ↓</span>
            </div>
          )}
        </div>
      </section>

      {/* ══ STICKY TABS ══ */}
      <div id="pricing-section" className="sticky top-0 z-30 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 sm:px-8 py-4 border-b-2 transition-all duration-200 ${
                  activeTab === tab.id ? "border-red-600 text-red-600" : "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300"
                }`}>
                <span className="text-sm font-bold">{tab.label}</span>
                <span className="hidden sm:inline text-xs text-gray-400">{tab.sub}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══ WEBSITE PACKAGES ══ */}
      {activeTab === "websites" && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">Website Packages</h2>
              <p className="text-gray-500">One-time payment. Your website belongs to you, forever.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {websitePackages.map((pkg) => {
                const isHL = highlightPkg === pkg.id;
                const s = getCardStyle(pkg.theme, isHL);
                return (
                  <div key={pkg.id} className={`relative flex flex-col rounded-3xl border-2 overflow-hidden transition-all duration-500 ${s.wrapper}`}>
                    {isHL && (
                      <div className="bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-black text-center py-2 tracking-wider uppercase">
                        ✦ Recommended for your selection ✦
                      </div>
                    )}
                    <div className={`p-8 ${s.header}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          {pkg.badge && !isHL && (
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${s.badgeBg} mb-3 inline-block`}>{pkg.badge}</span>
                          )}
                          <h3 className={`text-2xl font-black ${s.headerText}`}>{pkg.name}</h3>
                          <p className={`text-sm mt-1 ${s.headerSub}`}>{pkg.tagline}</p>
                        </div>
                      </div>
                      <div className="mt-5">
                        <span className={`text-4xl font-black ${s.priceColor}`}>{formatTZS(pkg.price)}</span>
                        <span className={`text-sm ml-2 ${s.headerSub}`}>one-time</span>
                      </div>
                      <div className={`mt-5 flex gap-4 pt-5 border-t ${s.divider}`}>
                        {[{ l: "Pages", v: pkg.pages }, { l: "Delivery", v: pkg.deliveryDays }, { l: "Revisions", v: pkg.revisions }].map((sp) => (
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
                          {pkg.idealFor.map((use) => (
                            <span key={use} className="text-xs bg-white border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full">{use}</span>
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
                      {/* ── CHANGED: openPayment with "once" billing ── */}
                      <button
                        onClick={() => openPayment(`${pkg.name} Website`, pkg.price, "once")}
                        className={`w-full py-4 rounded-xl text-sm transition-all duration-200 transform hover:-translate-y-0.5 ${s.btn}`}
                      >
                        Get Started with {pkg.name}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom CTA */}
            <div className="mt-12 bg-gradient-to-br from-red-50 to-white border-2 border-red-100 rounded-3xl p-8 max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-100 rounded-full mb-4">
                <span className="text-red-600 text-xs font-bold uppercase tracking-wide">Custom Project?</span>
              </div>
              <p className="text-gray-700 font-semibold text-lg mb-2">None of these fit exactly what you need?</p>
              <p className="text-gray-500 text-sm mb-6">Tell us about your project and we&apos;ll put together a tailored proposal within 24 hours — no commitment required.</p>
              <button onClick={goContact} className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-bold hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-500/20 transform hover:-translate-y-1">
                Request a Custom Quote
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ══ HOSTING ══ */}
      {activeTab === "hosting" && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">Hosting Plans</h2>
              <p className="text-gray-500 text-lg">Paid yearly. Includes a free domain in your first year.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {hostingPlans.map((plan) => {
                const s = getCardStyle(plan.theme, false);
                return (
                  <div key={plan.id} className={`relative flex flex-col rounded-3xl border-2 overflow-hidden transition-all duration-300 ${s.wrapper}`}>
                    {plan.badge && (
                      <div className="bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-black text-center py-2 tracking-wider uppercase">✦ {plan.badge} ✦</div>
                    )}
                    <div className={`p-8 ${s.header}`}>
                      <h3 className={`text-2xl font-black ${s.headerText}`}>{plan.name} Hosting</h3>
                      <div className="mt-4">
                        <span className={`text-4xl font-black ${s.priceColor}`}>{formatTZS(plan.yearlyPrice)}</span>
                        <span className={`text-sm ml-2 ${s.headerSub}`}>/ year</span>
                        <p className={`text-xs mt-1 ${s.headerSub}`}>≈ {formatTZS(Math.round(plan.yearlyPrice / 12))} / month</p>
                      </div>
                      <div className={`mt-5 grid grid-cols-2 gap-3 pt-5 border-t ${s.divider}`}>
                        {plan.specs.map((sp) => (
                          <div key={sp.label}>
                            <p className={`text-xs uppercase tracking-wide font-bold mb-0.5 ${plan.theme !== "light" ? "text-white/40" : "text-gray-400"}`}>{sp.label}</p>
                            <p className={`text-sm font-bold ${plan.theme !== "light" ? "text-white" : "text-gray-800"}`}>{sp.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col p-8">
                      <ul className="space-y-3 mb-8 flex-1">
                        {plan.features.map((f) => (
                          <li key={f.text} className={`flex items-center gap-3 text-sm ${f.included ? "text-gray-700" : "text-gray-400"}`}>
                            <Check ok={f.included} theme={plan.theme} />
                            <span className={!f.included ? "line-through decoration-gray-300" : ""}>{f.text}</span>
                          </li>
                        ))}
                      </ul>
                      {/* ── CHANGED: openPayment with "yearly" billing ── */}
                      <button
                        onClick={() => openPayment(`${plan.name} Hosting`, plan.yearlyPrice, "yearly")}
                        className={`w-full py-4 rounded-xl text-sm transition-all duration-200 transform hover:-translate-y-0.5 ${s.btn}`}
                      >
                        Get {plan.name} Hosting
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-center text-gray-400 text-sm mt-8">Domain renewal fees apply from year 2. Contact us for current rates.</p>
          </div>
        </section>
      )}

      {/* ══ MAINTENANCE ══ */}
      {activeTab === "maintenance" && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">Maintenance Plans</h2>
              <p className="text-gray-500 text-lg">Keep your website secure, fast, and always up to date.</p>
              <div className="inline-flex items-center bg-gray-100 rounded-2xl p-1.5 mt-6 gap-1">
                <button onClick={() => setBilling("monthly")} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${billing === "monthly" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>Monthly</button>
                <button onClick={() => setBilling("yearly")} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${billing === "yearly" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                  Yearly
                  <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">Save ~17%</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {maintenancePlans.map((plan) => {
                const s = getCardStyle(plan.theme, false);
                const price = billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
                const period = billing === "monthly" ? "/ month" : "/ year";
                return (
                  <div key={plan.id} className={`relative flex flex-col rounded-3xl border-2 overflow-hidden transition-all duration-300 ${s.wrapper}`}>
                    {plan.badge && (
                      <div className="bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-black text-center py-2 tracking-wider uppercase">✦ {plan.badge} ✦</div>
                    )}
                    <div className={`p-8 ${s.header}`}>
                      <h3 className={`text-2xl font-black ${s.headerText}`}>{plan.name}</h3>
                      <div className="mt-4">
                        <span className={`text-4xl font-black ${s.priceColor}`}>{formatTZS(price)}</span>
                        <span className={`text-sm ml-2 ${s.headerSub}`}>{period}</span>
                        {billing === "yearly" && <p className={`text-xs mt-1 ${s.headerSub}`}>≈ {formatTZS(Math.round(plan.yearlyPrice / 12))} / month</p>}
                      </div>
                      <div className={`mt-5 flex gap-4 pt-5 border-t ${s.divider}`}>
                        {[{ l: "Response time", v: plan.responseTime }, { l: "Content edits", v: plan.contentHours }].map((sp) => (
                          <div key={sp.l} className="flex-1 text-center">
                            <p className={`text-xs font-bold uppercase tracking-wide mb-0.5 ${plan.theme !== "light" ? "text-white/40" : "text-gray-400"}`}>{sp.l}</p>
                            <p className={`text-xs font-bold ${plan.theme !== "light" ? "text-white" : "text-gray-800"}`}>{sp.v}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col p-8">
                      <ul className="space-y-3 mb-8 flex-1">
                        {plan.features.map((f) => (
                          <li key={f.text} className={`flex items-center gap-3 text-sm ${f.included ? "text-gray-700" : "text-gray-400"}`}>
                            <Check ok={f.included} theme={plan.theme} />
                            <span className={!f.included ? "line-through decoration-gray-300" : ""}>{f.text}</span>
                          </li>
                        ))}
                      </ul>
                      {/* ── CHANGED: openPayment passes current billing period ── */}
                      <button
                        onClick={() => openPayment(plan.name, price, billing)}
                        className={`w-full py-4 rounded-xl text-sm transition-all duration-200 transform hover:-translate-y-0.5 ${s.btn}`}
                      >
                        Start {plan.name}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══ WHY US ══ */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🇹🇿", title: "Based in Dar es Salaam", desc: "We understand the local market, Swahili language needs, and Tanzanian business culture." },
              { icon: "💬", title: "WhatsApp-first support", desc: "Reach us directly on WhatsApp — no tickets, no long email chains, just fast help." },
              { icon: "📦", title: "No hidden costs", desc: "What you see is what you pay. We agree on scope and cost before any work starts." },
              { icon: "🎓", title: "Full handover training", desc: "We train you to manage your own website so you're never dependent on us for simple changes." },
            ].map((item) => (
              <div key={item.title} className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-lg transition-all duration-300">
                <span className="text-4xl block mb-4">{item.icon}</span>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">Common Questions</h2>
            <p className="text-gray-500">Everything you need to know before getting started.</p>
          </div>
          <div className="space-y-3">
            {[
              { q: "Do I need hosting to get a website?", a: "Yes — your website files need to live on a server. We can bundle hosting with your package or set it up separately. We'll recommend the best option based on your needs and budget." },
              { q: "Can I manage my own content after launch?", a: "Absolutely. All websites are built with easy-to-use CMS systems. We provide full training so you can update text, images, and products yourself without needing to contact us." },
              { q: "Do you build websites in Swahili?", a: "Yes! We build fully bilingual (English & Swahili) or Swahili-only sites. Just tell us your preference during our initial consultation." },
              { q: "What if I need more pages later?", a: "No problem — we charge a small fee per additional page. It's far more affordable than rebuilding from scratch and we keep your design consistent throughout." },
              { q: "How do I pay?", a: "We accept M-Pesa, Tigopesa, Airtel Money, and bank transfer. A 50% deposit is required to begin, with the balance due on final delivery and your approval." },
              { q: "What happens after my website launches?", a: "We hand over all files, login credentials, and provide a full training session. You can choose a maintenance plan or manage things yourself — entirely your choice." },
            ].map((faq, i) => (
              <details key={i} className="group bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden hover:border-red-200 transition-colors">
                <summary className="flex justify-between items-center px-6 py-5 cursor-pointer font-semibold text-gray-900 hover:text-red-700 transition-colors list-none group-open:text-red-700">
                  {faq.q}
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 group-open:text-red-500 transition-all shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4 bg-white">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-red-50 via-white to-gray-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-100/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-10 right-[10%] w-72 h-72 bg-gradient-to-br from-red-200/30 to-red-300/20 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-10 left-[5%] w-96 h-96 bg-gradient-to-tr from-red-100/20 to-red-200/15 rounded-full blur-3xl animate-float-delayed pointer-events-none" />
        <div className="absolute top-[20%] right-[20%] w-14 h-14 border-2 border-red-200/40 rounded-2xl rotate-12 animate-spin-slow pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-red-200/50 shadow-sm mb-6">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-900">Ready to get started?</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
            Let&apos;s build your website
            <span className="block text-red-600">the right way.</span>
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-xl mx-auto">
            Tell us what you need. We&apos;ll respond within 24 hours with a clear plan and transparent quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={goContact}
              className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transform hover:-translate-y-1">
              Get a Free Quote
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
        @keyframes float {
          0%, 100% { transform: translate(0,0) rotate(0deg); }
          33% { transform: translate(20px,-20px) rotate(3deg); }
          66% { transform: translate(-15px,15px) rotate(-3deg); }
        }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        .animate-float { animation: float 18s ease-in-out infinite; }
        .animate-float-delayed { animation: float 22s ease-in-out infinite; animation-delay: -8s; }
        .animate-spin-slow { animation: spin-slow 25s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
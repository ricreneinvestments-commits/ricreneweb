"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MobilePaymentModal } from "@/components/MobilePaymentModal";

// ─── Data ─────────────────────────────────────────────────────────────────────
const plans = [
  {
    id: "basic",
    name: "Basic Care",
    tagline: "Essential maintenance for live websites",
    monthlyPrice: 30000,
    yearlyPrice: 300000,
    theme: "light",
    badge: null,
    responseTime: "48 hours",
    contentHours: "1 hr / month",
    backupFreq: "Weekly",
    scanFreq: "Monthly",
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
      { text: "Daily backups", included: false },
    ],
  },
  {
    id: "business",
    name: "Business Care",
    tagline: "Regular updates & faster response times",
    monthlyPrice: 70000,
    yearlyPrice: 720000,
    theme: "red",
    badge: "Most Popular",
    responseTime: "24 hours",
    contentHours: "3 hrs / month",
    backupFreq: "Daily",
    scanFreq: "Weekly",
    features: [
      { text: "Weekly security scans", included: true },
      { text: "CMS & plugin updates", included: true },
      { text: "Uptime monitoring + alerts", included: true },
      { text: "Weekly performance reports", included: true },
      { text: "Daily backups", included: true },
      { text: "3 hours content updates/month", included: true },
      { text: "Bug fixes included", included: true },
      { text: "Priority response (24hr)", included: true },
      { text: "Design changes", included: false },
      { text: "Staging environment", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium Care",
    tagline: "Full-service management & design support",
    monthlyPrice: 150000,
    yearlyPrice: 1500000,
    theme: "dark",
    badge: null,
    responseTime: "2 hours",
    contentHours: "Unlimited",
    backupFreq: "Hourly",
    scanFreq: "Daily",
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
      { text: "Staging environment", included: true },
    ],
  },
];

const whatWeMonitor = [
  { icon: "🔒", title: "Security", desc: "We scan daily for malware, vulnerabilities, and unauthorized access attempts." },
  { icon: "⚡", title: "Performance", desc: "Page speed, load times, and Core Web Vitals tracked and optimized continuously." },
  { icon: "🔄", title: "Uptime", desc: "We monitor your site every 5 minutes. If it goes down, we know before you do." },
  { icon: "💾", title: "Backups", desc: "Automated backups stored securely off-site. One-click restore when needed." },
  { icon: "🔧", title: "Updates", desc: "CMS, plugins, and themes kept current to prevent security holes." },
  { icon: "🔗", title: "Broken Links", desc: "Regular scans for broken links and missing pages that hurt your SEO." },
];

const processSteps = [
  { step: "01", icon: "🔍", title: "Free Website Audit", desc: "We scan your current site for security issues, outdated software, broken links, and performance bottlenecks." },
  { step: "02", icon: "⚙️", title: "Setup & Onboarding", desc: "We install monitoring tools, configure backups, and establish secure access — no disruption to your live site." },
  { step: "03", icon: "🛡️", title: "Ongoing Maintenance", desc: "Regular updates, security patches, backups, and performance checks run on your plan's schedule." },
  { step: "04", icon: "📊", title: "Reports & Support", desc: "You receive regular reports and can reach us for support anytime within your plan's response window." },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
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
    specBg: "bg-white/10", specText: "text-white", specLabel: "text-red-200",
  };
  if (theme === "dark") return {
    wrapper: "border-gray-800 shadow-xl",
    header: "bg-gradient-to-br from-gray-900 to-black",
    headerText: "text-white", headerSub: "text-gray-400",
    priceColor: "text-white", divider: "border-white/10",
    btn: "bg-gradient-to-r from-red-600 to-red-700 text-white font-bold hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-500/20",
    specBg: "bg-white/5", specText: "text-white", specLabel: "text-gray-500",
  };
  return {
    wrapper: "border-gray-200 shadow-sm hover:shadow-xl hover:border-red-100",
    header: "bg-gradient-to-br from-gray-50 to-white border-b border-gray-100",
    headerText: "text-gray-900", headerSub: "text-gray-500",
    priceColor: "text-red-600", divider: "border-gray-100",
    btn: "bg-gradient-to-r from-red-600 to-red-700 text-white font-bold hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-500/20",
    specBg: "bg-gray-50", specText: "text-gray-800", specLabel: "text-gray-400",
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function WebsiteMaintenancePage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  // ── Modal state ──────────────────────────────────────────────────────────────
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    amount: number;
    billingPeriod: "monthly" | "yearly";
  }>({ name: "", amount: 0, billingPeriod: "monthly" });

  const openPayment = (name: string, amount: number, billingPeriod: "monthly" | "yearly") => {
    setSelectedPlan({ name, amount, billingPeriod });
    setModalOpen(true);
  };
  // ────────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const goContact = () => { window.location.href = "/#contact"; };

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
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-red-50 via-white to-gray-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-100/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-red-50/50 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 right-[8%] w-[500px] h-[500px] bg-gradient-to-br from-red-200/30 to-red-300/20 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-10 left-[3%] w-[600px] h-[600px] bg-gradient-to-tr from-red-100/20 to-red-200/15 rounded-full blur-3xl animate-float-delayed pointer-events-none" />
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <div className="absolute top-[15%] left-[8%] w-3 h-3 bg-red-400 rounded-full animate-ping" />
          <div className="absolute top-[40%] right-[10%] w-2 h-2 bg-red-500 rounded-full animate-ping" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-[25%] left-[20%] w-2 h-2 bg-red-300 rounded-full animate-ping" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-[15%] right-[28%] w-3 h-3 bg-red-400 rounded-full animate-ping" style={{ animationDelay: "0.5s" }} />
        </div>
        <div className="absolute top-[10%] right-[20%] w-20 h-20 border-2 border-red-200/50 rounded-2xl rotate-12 animate-spin-slow pointer-events-none" />
        <div className="absolute bottom-[22%] left-[14%] w-12 h-12 border-2 border-red-200/40 rounded-xl -rotate-6 animate-spin-slow pointer-events-none" style={{ animationDirection: "reverse" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <nav className={`flex items-center gap-2 text-sm text-gray-500 mb-10 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/#services" className="hover:text-red-600 transition-colors">Services</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-800 font-medium">Website Maintenance</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <div className={`mb-6 transition-all duration-700 delay-100 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-red-200/50 shadow-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-900">Website Maintenance & Support</span>
                </div>
              </div>

              <h1 className={`transition-all duration-700 delay-200 text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-[1.08] tracking-tight ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                Your Website,
                <span className="relative block mt-1">
                  <span className="text-red-600">Always Healthy.</span>
                  <span className="absolute -bottom-1 left-0 w-2/3 h-3 bg-red-100/70 rounded-sm -z-0" />
                </span>
                <span className="block text-gray-500 text-3xl md:text-4xl lg:text-5xl font-semibold mt-2">
                  Always Online.
                </span>
              </h1>

              <p className={`transition-all duration-700 delay-300 text-xl text-gray-600 mb-10 leading-relaxed max-w-xl ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                We handle all the technical upkeep — security patches, backups, updates, and monitoring — so you never have to worry about your website going down or getting hacked.
              </p>

              <div className={`transition-all duration-700 delay-[400ms] flex flex-col sm:flex-row gap-4 mb-12 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <a
                  href="#pricing"
                  onClick={(e) => { e.preventDefault(); document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transform hover:-translate-y-1"
                >
                  View Plans & Pricing
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <button onClick={goContact} className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold border-2 border-red-200 hover:border-red-300 hover:bg-red-50 hover:shadow-lg transition-all">
                  Get a Free Audit
                </button>
              </div>

              <div className={`transition-all duration-700 delay-500 flex flex-wrap gap-3 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                {[
                  { icon: "🛡️", text: "Security scans" },
                  { icon: "💾", text: "Auto backups" },
                  { icon: "⚡", text: "Uptime monitoring" },
                  { icon: "🔧", text: "Bug fixes" },
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
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-red-200 text-xs font-bold uppercase tracking-widest">Live Status</p>
                        <h3 className="text-white text-xl font-black mt-0.5">Website Health Monitor</h3>
                      </div>
                      <div className="flex items-center gap-1.5 bg-green-400/20 border border-green-400/40 rounded-full px-3 py-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-300 text-xs font-bold">All Good</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-red-200 mb-1.5">
                        <span>Uptime this month</span>
                        <span className="font-bold text-white">99.97%</span>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-green-400 rounded-full" style={{ width: "99.97%" }} />
                      </div>
                    </div>
                  </div>
                  <div className="p-5 grid grid-cols-2 gap-3">
                    {[
                      { label: "Last backup", value: "2 hrs ago", icon: "💾", ok: true },
                      { label: "Security scan", value: "Clean", icon: "🔒", ok: true },
                      { label: "Page speed", value: "94/100", icon: "⚡", ok: true },
                      { label: "SSL certificate", value: "Valid", icon: "✅", ok: true },
                      { label: "Plugin updates", value: "3 pending", icon: "🔄", ok: false },
                      { label: "Broken links", value: "0 found", icon: "🔗", ok: true },
                    ].map((metric) => (
                      <div key={metric.label} className={`rounded-xl p-3 border ${metric.ok ? "bg-gray-50 border-gray-100" : "bg-amber-50 border-amber-100"}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-base">{metric.icon}</span>
                          <div className={`w-2 h-2 rounded-full ${metric.ok ? "bg-green-400" : "bg-amber-400"}`} />
                        </div>
                        <p className={`text-sm font-bold ${metric.ok ? "text-gray-800" : "text-amber-800"}`}>{metric.value}</p>
                        <p className="text-xs text-gray-400">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-5 pb-5">
                    <button onClick={goContact} className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-sm hover:from-red-700 hover:to-red-800 transition-all">
                      Get This for Your Website →
                    </button>
                  </div>
                </div>
                <div className="absolute -top-4 -left-6 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 z-20 animate-float">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                      <span className="text-base">🔔</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">Instant alerts</p>
                      <p className="text-xs text-gray-400">Via WhatsApp & email</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 z-20 animate-float-delayed">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                      <span className="text-base">📊</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">Monthly reports</p>
                      <p className="text-xs text-gray-400">Sent to your inbox</p>
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
          <a href="#pricing" onClick={(e) => { e.preventDefault(); document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }); }}
            className="flex flex-col items-center gap-2 animate-bounce text-gray-500 hover:text-red-500 transition-colors">
            <span className="text-sm">View plans</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>

      {/* ══ WHAT WE MONITOR ══ */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-red-700">What We Handle</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">We watch everything, so you don&apos;t have to</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              From security to speed — here&apos;s what&apos;s covered under your maintenance plan.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatWeMonitor.map((item) => (
              <div key={item.title} className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-red-200 hover:shadow-lg transition-all duration-300">
                <span className="text-4xl block mb-4">{item.icon}</span>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                <div className="mt-4 h-1 w-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full group-hover:w-16 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRICING ══ */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">Maintenance Plans</h2>
            <p className="text-gray-500 text-lg">Cancel anytime. No long-term contracts.</p>
            <div className="inline-flex items-center bg-gray-100 rounded-2xl p-1.5 mt-6 gap-1">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${billing === "monthly" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("yearly")}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${billing === "yearly" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                Yearly
                <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">Save ~17%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {plans.map((plan) => {
              const s = getCardStyle(plan.theme);
              const price = billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
              const period = billing === "monthly" ? "/ month" : "/ year";

              return (
                <div key={plan.id} className={`relative flex flex-col rounded-3xl border-2 overflow-hidden transition-all duration-300 ${s.wrapper}`}>
                  {plan.badge && (
                    <div className="bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-black text-center py-2 tracking-wider uppercase">
                      ✦ {plan.badge} ✦
                    </div>
                  )}

                  <div className={`p-8 ${s.header}`}>
                    <h3 className={`text-2xl font-black ${s.headerText}`}>{plan.name}</h3>
                    <p className={`text-sm mt-1 mb-5 ${s.headerSub}`}>{plan.tagline}</p>
                    <div>
                      <span className={`text-4xl font-black ${s.priceColor}`}>{formatTZS(price)}</span>
                      <span className={`text-sm ml-2 ${s.headerSub}`}>{period}</span>
                      {billing === "yearly" && (
                        <p className={`text-xs mt-1 ${s.headerSub}`}>
                          ≈ {formatTZS(Math.round(plan.yearlyPrice / 12))} / month
                        </p>
                      )}
                    </div>
                    <div className={`mt-6 grid grid-cols-2 gap-2 pt-5 border-t ${s.divider}`}>
                      {[
                        { label: "Response", value: plan.responseTime, icon: "⚡" },
                        { label: "Content edits", value: plan.contentHours, icon: "✏️" },
                        { label: "Backups", value: plan.backupFreq, icon: "💾" },
                        { label: "Security scan", value: plan.scanFreq, icon: "🔒" },
                      ].map((spec) => (
                        <div key={spec.label} className={`${s.specBg} rounded-xl p-2.5 text-center`}>
                          <span className="text-base block mb-0.5">{spec.icon}</span>
                          <p className={`text-xs font-bold leading-tight ${s.specText}`}>{spec.value}</p>
                          <p className={`text-xs ${s.specLabel}`}>{spec.label}</p>
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
                    {/* ── CHANGED: openPayment instead of goContact, passes current billing ── */}
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

          <p className="text-center text-gray-400 text-sm mt-8">
            All plans require an initial free website audit. Prices exclude VAT. Cancel anytime with 30 days notice.
          </p>
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-red-700">Simple Onboarding</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">How It Works</h2>
            <p className="text-gray-500 text-lg">We take care of everything from day one.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <div key={step.step} className="relative group">
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(100%-0px)] w-full h-0.5 bg-gradient-to-r from-red-200 to-transparent z-0" />
                )}
                <div className="relative z-10 bg-white rounded-2xl p-6 border border-gray-200 hover:border-red-200 hover:shadow-lg transition-all duration-300">
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
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">Common Questions</h2>
            <p className="text-gray-500">Everything about website maintenance — answered.</p>
          </div>
          <div className="space-y-3">
            {[
              { q: "Do I need maintenance if my website is working fine?", a: "Yes. A website that looks fine can still have outdated plugins with known security vulnerabilities, slow load times, or a backup system that hasn't run in weeks. Maintenance is preventative — like servicing a car before it breaks down." },
              { q: "What happens if my website gets hacked?", a: "Under Business Care and Premium Care plans, emergency security remediation is included. We'll clean the site, patch the vulnerability, and restore from a clean backup. Basic Care plans cover regular scanning but emergency fixes are billed separately." },
              { q: "Do I need to give you access to my website?", a: "Yes — we need admin access to your CMS (e.g. WordPress), your hosting cPanel, and your domain registrar for DNS. We treat all credentials with strict confidentiality and can sign an NDA on request." },
              { q: "Can you maintain a website that wasn't built by you?", a: "Absolutely. We maintain websites built on WordPress, Wix, Webflow, and custom-built sites. We'll do a free audit first to assess the site's current state before recommending a plan." },
              { q: "What does '1 hour content updates' mean?", a: "It means we'll make small content changes for you each month — updating text, swapping images, adding a new team member, etc. — up to 1 hour of our time. Larger changes are quoted separately." },
              { q: "Can I cancel my plan?", a: "Yes. There are no long-term contracts. You can cancel with 30 days written notice. We'll hand over all access credentials and provide a final backup of your website." },
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
        <div className="absolute top-[20%] right-[22%] w-14 h-14 border-2 border-red-200/40 rounded-2xl rotate-12 animate-spin-slow pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-red-200/50 shadow-sm mb-6">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-900">Start with a free audit</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
            Let us take care of
            <span className="block text-red-600">your website.</span>
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-xl mx-auto">
            We&apos;ll start with a free website audit to identify any issues, then recommend the right maintenance plan for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={goContact}
              className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transform hover:-translate-y-1">
              Get a Free Website Audit
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
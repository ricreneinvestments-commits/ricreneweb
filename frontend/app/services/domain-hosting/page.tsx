"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MobilePaymentModal } from "@/components/MobilePaymentModal";

// ─── Data ─────────────────────────────────────────────────────────────────────
const tlds = [
  { ext: ".co.tz", price: 45000, badge: "Popular 🇹🇿", desc: "The Tanzanian standard" },
  { ext: ".tz", price: 60000, badge: "Official", desc: "Premium .tz domain" },
  { ext: ".or.tz", price: 45000, badge: "NGOs", desc: "For organizations" },
  { ext: ".ac.tz", price: 45000, badge: "Education", desc: "Academic institutions" },
  { ext: ".com", price: 35000, badge: "Global", desc: "Most recognized worldwide" },
  { ext: ".org", price: 38000, badge: "Non-profit", desc: "Organizations & NGOs" },
  { ext: ".net", price: 38000, badge: "Tech", desc: "Networks & tech brands" },
  { ext: ".info", price: 30000, badge: "Budget", desc: "Affordable global option" },
];

const hostingPlans = [
  {
    id: "basic",
    name: "Basic",
    tagline: "Get your first website online",
    yearlyPrice: 120000,
    theme: "light",
    badge: null,
    specs: [
      { label: "Websites", value: "1 website", icon: "🌐" },
      { label: "Storage", value: "5 GB SSD", icon: "💾" },
      { label: "Emails", value: "5 accounts", icon: "📧" },
      { label: "Bandwidth", value: "Limited", icon: "📡" },
      { label: "Backups", value: "Weekly", icon: "🔄" },
      { label: "Uptime", value: "99.9%", icon: "⚡" },
    ],
    features: [
      { text: "Free .co.tz domain (1st year)", included: true },
      { text: "Free SSL certificate (HTTPS)", included: true },
      { text: "cPanel control panel", included: true },
      { text: "1-click WordPress install", included: true },
      { text: "Email via Webmail", included: true },
      { text: "Unlimited bandwidth", included: false },
      { text: "Daily backups", included: false },
      { text: "Priority support", included: false },
      { text: "Staging environment", included: false },
    ],
  },
  {
    id: "business",
    name: "Business",
    tagline: "For growing websites with more traffic",
    yearlyPrice: 300000,
    theme: "red",
    badge: "Best Value",
    specs: [
      { label: "Websites", value: "5 websites", icon: "🌐" },
      { label: "Storage", value: "20 GB SSD", icon: "💾" },
      { label: "Emails", value: "25 accounts", icon: "📧" },
      { label: "Bandwidth", value: "Unlimited", icon: "📡" },
      { label: "Backups", value: "Daily", icon: "🔄" },
      { label: "Uptime", value: "99.9%", icon: "⚡" },
    ],
    features: [
      { text: "Free domain (1st year)", included: true },
      { text: "Free SSL certificate (HTTPS)", included: true },
      { text: "cPanel control panel", included: true },
      { text: "1-click WordPress install", included: true },
      { text: "Email via Webmail", included: true },
      { text: "Unlimited bandwidth", included: true },
      { text: "Daily backups", included: true },
      { text: "Priority support", included: false },
      { text: "Staging environment", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Enterprise-grade for serious businesses",
    yearlyPrice: 600000,
    theme: "dark",
    badge: null,
    specs: [
      { label: "Websites", value: "Unlimited", icon: "🌐" },
      { label: "Storage", value: "50 GB SSD", icon: "💾" },
      { label: "Emails", value: "Unlimited", icon: "📧" },
      { label: "Bandwidth", value: "Unlimited", icon: "📡" },
      { label: "Backups", value: "Hourly", icon: "🔄" },
      { label: "Uptime", value: "99.99%", icon: "⚡" },
    ],
    features: [
      { text: "Free domain (1st year)", included: true },
      { text: "Free SSL certificate (HTTPS)", included: true },
      { text: "cPanel control panel", included: true },
      { text: "1-click WordPress install", included: true },
      { text: "Email via Webmail", included: true },
      { text: "Unlimited bandwidth", included: true },
      { text: "Daily backups + restore", included: true },
      { text: "24/7 priority support", included: true },
      { text: "Staging environment", included: true },
    ],
  },
];

const processSteps = [
  {
    step: "01",
    title: "Choose Your Domain",
    desc: "Tell us your preferred domain name. We'll check availability and suggest alternatives if needed.",
    icon: "🔍",
  },
  {
    step: "02",
    title: "Pick a Hosting Plan",
    desc: "Select the plan that fits your website size and traffic. You can always upgrade later.",
    icon: "📦",
  },
  {
    step: "03",
    title: "We Set Everything Up",
    desc: "We handle all the technical setup — DNS, SSL, email, and CMS installation. No IT skills needed.",
    icon: "⚙️",
  },
  {
    step: "04",
    title: "You Go Live",
    desc: "Your domain is live and your hosting is ready. We hand over your login credentials and guide you through.",
    icon: "🚀",
  },
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

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function DomainHostingPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [domainQuery, setDomainQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [activeTab, setActiveTab] = useState<"hosting" | "domains">("hosting");

  // ── Modal state ──────────────────────────────────────────────────────────────
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    amount: number;
    billingPeriod: "yearly" | "once";
  }>({ name: "", amount: 0, billingPeriod: "yearly" });

  const openPayment = (
    name: string,
    amount: number,
    billingPeriod: "yearly" | "once" = "yearly"
  ) => {
    setSelectedPlan({ name, amount, billingPeriod });
    setModalOpen(true);
  };
  // ────────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleDomainSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (domainQuery.trim()) setSearched(true);
  };

  const cleanQuery = domainQuery.replace(/\.(co\.tz|tz|com|org|net|info)$/i, "").trim().toLowerCase().replace(/\s+/g, "");

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
          <div className="absolute bottom-[15%] right-[25%] w-3 h-3 bg-red-400 rounded-full animate-ping" style={{ animationDelay: "0.5s" }} />
        </div>
        <div className="absolute top-[10%] right-[20%] w-20 h-20 border-2 border-red-200/50 rounded-2xl rotate-12 animate-spin-slow pointer-events-none" />
        <div className="absolute bottom-[22%] left-[14%] w-12 h-12 border-2 border-red-200/40 rounded-xl -rotate-6 animate-spin-slow pointer-events-none" style={{ animationDirection: "reverse" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <nav className={`flex items-center gap-2 text-sm text-gray-500 mb-10 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/#services" className="hover:text-red-600 transition-colors">Services</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-800 font-medium">Domain & Hosting</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <div className={`mb-6 transition-all duration-700 delay-100 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-red-200/50 shadow-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-900">Domain Registration & Web Hosting</span>
                </div>
              </div>

              <h1 className={`transition-all duration-700 delay-200 text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-[1.08] tracking-tight ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                Your Business
                <span className="relative inline-block ml-3">
                  <span className="text-red-600">Deserves</span>
                  <span className="absolute -bottom-1 left-0 w-full h-3 bg-red-100/70 rounded-sm -z-0" />
                </span>
                <span className="block mt-1">A Great Domain.</span>
              </h1>

              <p className={`transition-all duration-700 delay-300 text-xl text-gray-600 mb-8 leading-relaxed max-w-xl ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                Register your .co.tz or .com domain, pair it with reliable hosting, and get your business online — fast. We handle all the technical setup so you don&apos;t have to.
              </p>

              <div className={`transition-all duration-700 delay-[400ms] mb-10 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <form onSubmit={handleDomainSearch} className="flex gap-2">
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={domainQuery}
                      onChange={(e) => { setDomainQuery(e.target.value); setSearched(false); }}
                      placeholder="yourcompany.co.tz"
                      className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-4 focus:ring-red-50 transition-all font-medium text-lg shadow-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-500/30 hover:shadow-xl whitespace-nowrap"
                  >
                    Check Domain
                  </button>
                </form>
                <p className="text-xs text-gray-400 mt-2 ml-1">Type a name and we&apos;ll check which extensions are available</p>
              </div>

              <div className={`transition-all duration-700 delay-500 flex flex-wrap gap-3 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                {[
                  { icon: "🇹🇿", text: ".co.tz domains" },
                  { icon: "🔒", text: "Free SSL" },
                  { icon: "📧", text: "Business email" },
                  { icon: "⚡", text: "99.9% uptime" },
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
                    <p className="text-red-200 text-xs font-bold uppercase tracking-widest mb-1">Domain Availability</p>
                    <h3 className="text-white text-xl font-black">
                      {searched && cleanQuery ? `${cleanQuery}.*` : "yourcompany.*"}
                    </h3>
                    <p className="text-red-200 text-sm mt-1">Extensions available for registration</p>
                  </div>
                  <div className="p-5 space-y-2.5">
                    {tlds.slice(0, 5).map((tld, i) => (
                      <div key={tld.ext} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-red-50 border border-gray-100 hover:border-red-200 transition-all group">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-green-400" />
                          <div>
                            <span className="font-black text-gray-900 text-sm">
                              {searched && cleanQuery ? cleanQuery : "yourcompany"}
                              <span className="text-red-600">{tld.ext}</span>
                            </span>
                            <p className="text-xs text-gray-400">{tld.desc}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-gray-900">{formatTZS(tld.price)}</p>
                          <p className="text-xs text-gray-400">/year</p>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={goContact}
                      className="w-full py-3 mt-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-sm hover:from-red-700 hover:to-red-800 transition-all"
                    >
                      Register Your Domain →
                    </button>
                  </div>
                </div>
                <div className="absolute -top-4 -left-6 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 z-20 animate-float">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">Free SSL included</p>
                      <p className="text-xs text-gray-400">All hosting plans</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 z-20 animate-float-delayed">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📧</span>
                    <div>
                      <p className="text-xs font-bold text-gray-800">Business email</p>
                      <p className="text-xs text-gray-400">you@yourcompany.co.tz</p>
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
          <a href="#plans" onClick={(e) => { e.preventDefault(); document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" }); }}
            className="flex flex-col items-center gap-2 animate-bounce text-gray-500 hover:text-red-500 transition-colors">
            <span className="text-sm">View plans</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>

      {/* ══ TABS ══ */}
      <div id="plans" className="sticky top-0 z-30 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex">
            {[
              { id: "hosting" as const, label: "Hosting Plans", sub: "Yearly billing" },
              { id: "domains" as const, label: "Domain Pricing", sub: "Per year" },
            ].map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 sm:px-10 py-4 border-b-2 transition-all duration-200 ${
                  activeTab === tab.id ? "border-red-600 text-red-600" : "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300"
                }`}>
                <span className="text-sm font-bold">{tab.label}</span>
                <span className="hidden sm:inline text-xs text-gray-400">{tab.sub}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══ HOSTING PLANS ══ */}
      {activeTab === "hosting" && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">Hosting Plans</h2>
              <p className="text-gray-500 text-lg">Reliable, fast hosting for Tanzanian websites. Billed yearly.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {hostingPlans.map((plan) => {
                const s = getCardStyle(plan.theme);
                return (
                  <div key={plan.id} className={`relative flex flex-col rounded-3xl border-2 overflow-hidden transition-all duration-300 ${s.wrapper}`}>
                    {plan.badge && (
                      <div className="bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-black text-center py-2 tracking-wider uppercase">
                        ✦ {plan.badge} ✦
                      </div>
                    )}
                    <div className={`p-8 ${s.header}`}>
                      <h3 className={`text-2xl font-black ${s.headerText}`}>{plan.name} Hosting</h3>
                      <p className={`text-sm mt-1 mb-5 ${s.headerSub}`}>{plan.tagline}</p>
                      <div>
                        <span className={`text-4xl font-black ${s.priceColor}`}>{formatTZS(plan.yearlyPrice)}</span>
                        <span className={`text-sm ml-2 ${s.headerSub}`}>/ year</span>
                        <p className={`text-xs mt-1 ${s.headerSub}`}>
                          ≈ {formatTZS(Math.round(plan.yearlyPrice / 12))} / month
                        </p>
                      </div>
                      <div className={`mt-6 grid grid-cols-3 gap-2 pt-5 border-t ${s.divider}`}>
                        {plan.specs.map((spec) => (
                          <div key={spec.label} className={`${s.specBg} rounded-xl p-2.5 text-center`}>
                            <span className="text-lg block mb-0.5">{spec.icon}</span>
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
                      {/* ── CHANGED: openPayment instead of goContact ── */}
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
            <p className="text-center text-gray-400 text-sm mt-8">
              Domain renewal fees apply from year 2. All plans include cPanel and free SSL. Prices exclude VAT.
            </p>
          </div>
        </section>
      )}

      {/* ══ DOMAIN PRICING ══ */}
      {activeTab === "domains" && (
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">Domain Pricing</h2>
              <p className="text-gray-500 text-lg">Register your domain today. Prices are per year.</p>
            </div>

            <form onSubmit={handleDomainSearch} className="flex gap-2 max-w-xl mx-auto mb-12">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={domainQuery}
                  onChange={(e) => { setDomainQuery(e.target.value); setSearched(false); }}
                  placeholder="yourcompany"
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-4 focus:ring-red-50 transition-all font-medium shadow-sm"
                />
              </div>
              <button type="submit" className="px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-500/30 whitespace-nowrap">
                Check
              </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tlds.map((tld, i) => (
                <div key={tld.ext} className={`group flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-200 ${
                  i === 0 ? "border-red-200 bg-red-50 hover:border-red-300" : "border-gray-200 bg-white hover:border-red-200 hover:bg-red-50/30"
                }`}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center shrink-0">
                      <div className="w-3 h-3 bg-green-400 rounded-full" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-gray-900 text-lg">
                          {searched && cleanQuery ? (
                            <><span className="text-gray-600">{cleanQuery}</span><span className="text-red-600">{tld.ext}</span></>
                          ) : (
                            <span className="text-red-600">{tld.ext}</span>
                          )}
                        </span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${i === 0 ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"}`}>
                          {tld.badge}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">{tld.desc}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="font-black text-gray-900 text-lg">{formatTZS(tld.price)}</p>
                    <p className="text-xs text-gray-400">per year</p>
                    {/* ── CHANGED: openPayment on domain register buttons ── */}
                    <button
                      onClick={() => openPayment(
                        `${searched && cleanQuery ? cleanQuery : ""}${tld.ext} Domain`,
                        tld.price,
                        "once"
                      )}
                      className="mt-2 text-xs font-bold text-red-600 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      Register →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center">
              <p className="text-gray-500 text-sm">
                <span className="font-bold text-gray-700">Not sure which domain to choose?</span>{" "}
                We recommend <span className="font-bold text-red-600">.co.tz</span> for Tanzanian businesses — it&apos;s what customers recognize and trust locally. Contact us and we&apos;ll help you decide.
              </p>
              <button onClick={goContact} className="mt-4 inline-flex items-center gap-2 text-red-600 font-semibold text-sm hover:text-red-700 transition-colors">
                Ask us which domain is right for you
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ══ HOW IT WORKS ══ */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-red-700">Simple Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">How It Works</h2>
            <p className="text-gray-500 text-lg">From idea to online in 4 simple steps.</p>
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

      {/* ══ WHY CHOOSE US ══ */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🇹🇿", title: ".co.tz specialists", desc: "We handle Tanzanian domain registrations daily and know the requirements inside out." },
              { icon: "⚡", title: "Same-day setup", desc: "Your hosting is configured and live the same day you sign up. No waiting around." },
              { icon: "📧", title: "Business email included", desc: "Get professional email addresses like info@yourcompany.co.tz with your hosting plan." },
              { icon: "🔄", title: "We manage renewals", desc: "We remind you before your domain or hosting expires so you never accidentally go offline." },
            ].map((item) => (
              <div key={item.title} className="group p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-lg hover:bg-white transition-all duration-300">
                <span className="text-4xl block mb-4">{item.icon}</span>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
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
            <p className="text-gray-500">Everything about domains and hosting — answered simply.</p>
          </div>
          <div className="space-y-3">
            {[
              { q: "What is the difference between a domain and hosting?", a: "A domain is your address on the internet (e.g. yourcompany.co.tz). Hosting is the space on a server where your website's files are stored. You need both to have a working website." },
              { q: "Can I use a domain I already own?", a: "Absolutely. If you already have a domain registered elsewhere, we can point it to our hosting servers. Just let us know and we'll handle the DNS configuration." },
              { q: "Do I need to renew every year?", a: "Yes — both domains and hosting are annual subscriptions. We send renewal reminders well in advance so your website never unexpectedly goes offline." },
              { q: "What does 'free SSL' mean?", a: "SSL is the technology that gives your website the padlock icon and 'https://' in the browser. It encrypts data and is essential for trust. We include this free with all hosting plans." },
              { q: "Can I get a professional email with my domain?", a: "Yes! All hosting plans include email accounts like info@yourcompany.co.tz. Basic plans include 5 email accounts; Business plans include 25; Premium includes unlimited." },
              { q: "Can I upgrade my hosting plan later?", a: "Yes, you can upgrade your hosting plan at any time. We'll migrate your website data to the new plan without any downtime." },
            ].map((faq, i) => (
              <details key={i} className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-red-200 transition-colors">
                <summary className="flex justify-between items-center px-6 py-5 cursor-pointer font-semibold text-gray-900 hover:text-red-700 transition-colors list-none group-open:text-red-700">
                  {faq.q}
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 group-open:text-red-500 transition-all shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
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
            <span className="text-sm font-medium text-gray-900">Ready to get online?</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
            Your domain is waiting.
            <span className="block text-red-600">Let&apos;s claim it.</span>
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-xl mx-auto">
            Tell us your preferred domain name and we&apos;ll check availability, recommend the best hosting plan, and get everything live — fast.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={goContact}
              className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transform hover:-translate-y-1">
              Register My Domain
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
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MobilePaymentModal } from "@/components/MobilePaymentModal";

// ─── Data ─────────────────────────────────────────────────────────────────────
const marketingPackages = [
  {
    id: "starter",
    name: "Visibility Starter",
    tagline: "Get found on Google and build your online presence",
    monthlyPrice: 400000,
    yearlyPrice: 4000000,
    badge: null,
    theme: "light",
    features: [
      { text: "SEO audit & keyword research", included: true },
      { text: "On-page SEO optimization", included: true },
      { text: "Google My Business setup", included: true },
      { text: "Monthly SEO report", included: true },
      { text: "Basic backlink building", included: true },
      { text: "Google Ads management", included: false },
      { text: "Social media management", included: false },
      { text: "Content creation (blogs)", included: false },
      { text: "Meta / Instagram Ads", included: false },
    ],
    deliverables: ["SEO audit", "Keyword plan", "Monthly report"],
  },
  {
    id: "growth",
    name: "Growth Package",
    tagline: "SEO + paid ads + social for serious growth",
    monthlyPrice: 900000,
    yearlyPrice: 9000000,
    badge: "Most Popular",
    theme: "red",
    features: [
      { text: "Full SEO strategy & execution", included: true },
      { text: "On-page & technical SEO", included: true },
      { text: "Google My Business management", included: true },
      { text: "Weekly performance reports", included: true },
      { text: "Advanced backlink building", included: true },
      { text: "Google Ads management", included: true },
      { text: "Social media management (2 platforms)", included: true },
      { text: "Content creation (4 blogs/month)", included: true },
      { text: "Meta / Instagram Ads", included: false },
    ],
    deliverables: ["Full SEO", "Google Ads", "Social media", "4 blog posts"],
  },
  {
    id: "dominate",
    name: "Market Domination",
    tagline: "Full-scale digital marketing across every channel",
    monthlyPrice: 2000000,
    yearlyPrice: 20000000,
    badge: "Full Scale",
    theme: "dark",
    features: [
      { text: "Full SEO strategy & execution", included: true },
      { text: "On-page & technical SEO", included: true },
      { text: "Google My Business management", included: true },
      { text: "Real-time performance dashboard", included: true },
      { text: "Premium backlink building", included: true },
      { text: "Google Ads management", included: true },
      { text: "Social media (all platforms)", included: true },
      { text: "Content creation (8 blogs/month)", included: true },
      { text: "Meta / Instagram Ads", included: true },
    ],
    deliverables: ["All channels", "Google + Meta Ads", "8 blogs", "Real-time dashboard"],
  },
];

const services = [
  { icon: "🔍", title: "Search Engine Optimization", desc: "We optimize your website to rank on page 1 of Google for the keywords your customers are actually searching — locally and nationally." },
  { icon: "📣", title: "Google Ads (PPC)", desc: "We manage targeted Google Ads campaigns that put your business in front of customers ready to buy. Every shilling tracked and optimized." },
  { icon: "📱", title: "Social Media Marketing", desc: "We manage your Facebook, Instagram, and LinkedIn presence — consistent posts, engagement, and community building that converts followers to customers." },
  { icon: "✍️", title: "Content Marketing", desc: "We write SEO-optimized blog posts, articles, and web content that attract organic traffic and position your business as an industry authority." },
  { icon: "🎯", title: "Meta & Instagram Ads", desc: "Highly targeted paid campaigns on Facebook and Instagram. We build audiences, design creatives, and optimize for leads and conversions." },
  { icon: "📊", title: "Analytics & Reporting", desc: "Monthly reports showing exactly what's working — traffic, rankings, ad performance, lead generation, and ROI — in plain language." },
];

const processSteps = [
  { step: "01", icon: "🔍", title: "Audit & Strategy", desc: "We analyze your current online presence, competitors, and target audience to build a custom digital marketing strategy." },
  { step: "02", icon: "⚙️", title: "Setup & Launch", desc: "We set up tracking, create ad accounts, optimize your website, and launch campaigns — everything in the first 2 weeks." },
  { step: "03", icon: "📈", title: "Optimize & Scale", desc: "We monitor performance daily, A/B test creatives and copy, and continuously optimize to improve results month over month." },
  { step: "04", icon: "📊", title: "Report & Plan", desc: "Monthly reports with clear metrics and a plan for the next month. We're always accountable to results, not just activity." },
];

function formatTZS(n: number) {
  return `TZS ${n.toLocaleString("en-TZ")}`;
}

function Check({ ok, theme }: { ok: boolean; theme: string }) {
  if (ok) {
    const color = theme === "red" ? "text-red-300" : theme === "dark" ? "text-emerald-400" : "text-red-600";
    return <svg className={`w-5 h-5 shrink-0 ${color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;
  }
  return <svg className="w-5 h-5 shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;
}

function getCardStyle(theme: string) {
  if (theme === "red") return {
    wrapper: "border-red-300 shadow-2xl shadow-red-100/80",
    header: "bg-gradient-to-br from-red-600 to-red-700",
    headerText: "text-white", headerSub: "text-red-100",
    priceColor: "text-white", divider: "border-white/10",
    btn: "bg-white text-red-700 font-bold hover:bg-red-50 shadow-md",
    tagBg: "bg-white/15 text-white",
  };
  if (theme === "dark") return {
    wrapper: "border-gray-800 shadow-xl",
    header: "bg-gradient-to-br from-gray-900 to-black",
    headerText: "text-white", headerSub: "text-gray-400",
    priceColor: "text-white", divider: "border-white/10",
    btn: "bg-gradient-to-r from-red-600 to-red-700 text-white font-bold hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-500/20",
    tagBg: "bg-white/10 text-gray-300",
  };
  return {
    wrapper: "border-gray-200 shadow-sm hover:shadow-xl hover:border-red-100",
    header: "bg-gradient-to-br from-gray-50 to-white border-b border-gray-100",
    headerText: "text-gray-900", headerSub: "text-gray-500",
    priceColor: "text-red-600", divider: "border-gray-100",
    btn: "bg-gradient-to-r from-red-600 to-red-700 text-white font-bold hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-500/20",
    tagBg: "bg-gray-100 text-gray-600",
  };
}

export default function SEOMarketingPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; amount: number; billingPeriod: "monthly" | "yearly" }>({ name: "", amount: 0, billingPeriod: "monthly" });

  const openPayment = (name: string, amount: number, billingPeriod: "monthly" | "yearly") => { setSelectedPlan({ name, amount, billingPeriod }); setModalOpen(true); };
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);
  const goContact = () => { window.location.href = "/#contact"; };

  return (
    <div className="min-h-screen bg-white">
      <MobilePaymentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} planName={selectedPlan.name} amount={selectedPlan.amount} billingPeriod={selectedPlan.billingPeriod} />

      {/* ══ HERO ══ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-red-50 via-white to-gray-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-100/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 right-[8%] w-[500px] h-[500px] bg-gradient-to-br from-red-200/30 to-red-300/20 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-10 left-[3%] w-[600px] h-[600px] bg-gradient-to-tr from-red-100/20 to-red-200/15 rounded-full blur-3xl animate-float-delayed pointer-events-none" />
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          {[{ t: "15%", l: "8%", d: "0s" }, { t: "40%", r: "10%", d: "1s" }, { b: "25%", l: "20%", d: "2s" }, { b: "15%", r: "28%", d: "0.5s" }].map((p: { t?: string; l?: string; r?: string; b?: string; d: string }, i) => (
            <div key={i} className="absolute w-2 h-2 bg-red-400 rounded-full animate-ping" style={{ top: p.t, bottom: p.b, left: p.l, right: p.r, animationDelay: p.d }} />
          ))}
        </div>
        <div className="absolute top-[10%] right-[20%] w-20 h-20 border-2 border-red-200/50 rounded-2xl rotate-12 animate-spin-slow pointer-events-none" />
        <div className="absolute bottom-[22%] left-[14%] w-12 h-12 border-2 border-red-200/40 rounded-xl -rotate-6 animate-spin-slow pointer-events-none" style={{ animationDirection: "reverse" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <nav className={`flex items-center gap-2 text-sm text-gray-500 mb-10 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/#services" className="hover:text-red-600 transition-colors">Services</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-800 font-medium">SEO & Digital Marketing</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <div className={`mb-6 transition-all duration-700 delay-100 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-red-200/50 shadow-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-900">SEO & Digital Marketing</span>
                </div>
              </div>

              <h1 className={`transition-all duration-700 delay-200 text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-[1.08] tracking-tight ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                Get Found. Get Customers.
                <span className="relative block mt-1">
                  <span className="text-red-600">Grow Online.</span>
                  <span className="absolute -bottom-1 left-0 w-2/3 h-3 bg-red-100/70 rounded-sm -z-0" />
                </span>
                <span className="block text-gray-500 text-3xl md:text-4xl lg:text-5xl font-semibold mt-2">Measurably.</span>
              </h1>

              <p className={`transition-all duration-700 delay-300 text-xl text-gray-600 mb-10 leading-relaxed max-w-xl ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                From ranking #1 on Google to running high-converting ad campaigns — we drive real traffic, leads, and revenue for Tanzanian businesses through proven digital marketing strategies.
              </p>

              <div className={`transition-all duration-700 delay-[400ms] flex flex-col sm:flex-row gap-4 mb-12 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <a href="#pricing" onClick={(e) => { e.preventDefault(); document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transform hover:-translate-y-1">
                  View Marketing Packages
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
                <button onClick={goContact} className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold border-2 border-red-200 hover:border-red-300 hover:bg-red-50 hover:shadow-lg transition-all">
                  Get a Free Audit
                </button>
              </div>

              <div className={`transition-all duration-700 delay-500 flex flex-wrap gap-3 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                {[{ icon: "🔍", text: "SEO optimization" }, { icon: "📣", text: "Google Ads" }, { icon: "📱", text: "Social media" }, { icon: "📊", text: "Monthly reports" }, { icon: "🇹🇿", text: "Local expertise" }].map((pill) => (
                  <div key={pill.text} className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/70 backdrop-blur-sm border border-gray-200/80 rounded-full text-sm text-gray-700 shadow-sm">
                    <span>{pill.icon}</span><span className="font-medium">{pill.text}</span>
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
                        <p className="text-red-200 text-xs font-bold uppercase tracking-widest">Performance Dashboard</p>
                        <h3 className="text-white text-xl font-black mt-0.5">YourBusiness.co.tz</h3>
                      </div>
                      <div className="flex items-center gap-1.5 bg-green-400/20 border border-green-400/40 rounded-full px-3 py-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-300 text-xs font-bold">Growing</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[{ l: "Google Rank", v: "#3 → #1", up: true }, { l: "Monthly Traffic", v: "+142%", up: true }, { l: "Leads This Month", v: "68", up: true }].map((m) => (
                        <div key={m.l} className="bg-white/10 rounded-xl p-2.5 text-center">
                          <p className="text-white font-black text-sm">{m.v}</p>
                          <p className="text-red-200 text-xs">{m.l}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-5 space-y-2.5">
                    {[
                      { label: "Google ranking: 'IT services Dar'", value: "Position #1", icon: "🔍", ok: true },
                      { label: "Google Ads ROI", value: "4.2x return", icon: "📣", ok: true },
                      { label: "Facebook Page followers", value: "+340 this month", icon: "👥", ok: true },
                      { label: "Blog organic traffic", value: "+89% vs last month", icon: "✍️", ok: true },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{item.icon}</span>
                          <p className="text-xs text-gray-600">{item.label}</p>
                        </div>
                        <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full shrink-0 ml-2">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="px-5 pb-5">
                    <button onClick={goContact} className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-sm hover:from-red-700 hover:to-red-800 transition-all">
                      Grow My Business Online →
                    </button>
                  </div>
                </div>
                <div className="absolute -top-4 -left-6 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 z-20 animate-float">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center"><span className="text-base">📈</span></div>
                    <div><p className="text-xs font-bold text-gray-800">Avg. 3x traffic</p><p className="text-xs text-gray-400">In first 6 months</p></div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 z-20 animate-float-delayed">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center"><span className="text-base">🎯</span></div>
                    <div><p className="text-xs font-bold text-gray-800">ROI-focused</p><p className="text-xs text-gray-400">Every TZS tracked</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-red-700">Our Channels</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Every channel that drives customers to your door</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">We combine multiple digital marketing channels for maximum reach and return on investment.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item) => (
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
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">Marketing Packages</h2>
            <p className="text-gray-500 text-lg">Monthly retainer. Cancel anytime with 30 days notice.</p>
            <div className="inline-flex items-center bg-gray-100 rounded-2xl p-1.5 mt-6 gap-1">
              <button onClick={() => setBilling("monthly")} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${billing === "monthly" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>Monthly</button>
              <button onClick={() => setBilling("yearly")} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${billing === "yearly" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                Yearly <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">Save ~17%</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {marketingPackages.map((pkg) => {
              const s = getCardStyle(pkg.theme);
              const price = billing === "monthly" ? pkg.monthlyPrice : pkg.yearlyPrice;
              const period = billing === "monthly" ? "/ month" : "/ year";
              return (
                <div key={pkg.id} className={`relative flex flex-col rounded-3xl border-2 overflow-hidden transition-all duration-300 ${s.wrapper}`}>
                  {pkg.badge && <div className="bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-black text-center py-2 tracking-wider uppercase">✦ {pkg.badge} ✦</div>}
                  <div className={`p-8 ${s.header}`}>
                    <h3 className={`text-2xl font-black ${s.headerText}`}>{pkg.name}</h3>
                    <p className={`text-sm mt-1 mb-5 ${s.headerSub}`}>{pkg.tagline}</p>
                    <div>
                      <span className={`text-4xl font-black ${s.priceColor}`}>{formatTZS(price)}</span>
                      <span className={`text-sm ml-2 ${s.headerSub}`}>{period}</span>
                      {billing === "yearly" && <p className={`text-xs mt-1 ${s.headerSub}`}>≈ {formatTZS(Math.round(pkg.yearlyPrice / 12))} / month</p>}
                    </div>
                    <div className={`mt-5 pt-4 border-t ${s.divider} flex flex-wrap gap-2`}>
                      {pkg.deliverables.map((d) => <span key={d} className={`text-xs px-2.5 py-1 rounded-full font-medium ${s.tagBg}`}>{d}</span>)}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col p-8">
                    <ul className="space-y-3 mb-8 flex-1">
                      {pkg.features.map((f) => (
                        <li key={f.text} className={`flex items-center gap-3 text-sm ${f.included ? "text-gray-700" : "text-gray-400"}`}>
                          <Check ok={f.included} theme={pkg.theme} />
                          <span className={!f.included ? "line-through decoration-gray-300" : ""}>{f.text}</span>
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => openPayment(pkg.name, price, billing)} className={`w-full py-4 rounded-xl text-sm transition-all duration-200 transform hover:-translate-y-0.5 ${s.btn}`}>
                      Start {pkg.name}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-center text-gray-400 text-sm mt-8">Ad spend (Google Ads, Meta Ads) is separate and billed directly by the platforms. Prices exclude VAT.</p>
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-red-700">How We Work</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">From Day 1 to Consistent Growth</h2>
            <p className="text-gray-500 text-lg">A data-driven process that builds momentum month over month.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <div key={step.step} className="relative group">
                {i < processSteps.length - 1 && <div className="hidden lg:block absolute top-10 left-[calc(100%-0px)] w-full h-0.5 bg-gradient-to-r from-red-200 to-transparent z-0" />}
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
            <p className="text-gray-500">Everything about digital marketing — answered.</p>
          </div>
          <div className="space-y-3">
            {[
              { q: "How long before I see results from SEO?", a: "SEO typically shows meaningful results within 3–6 months. You may see improvements in rankings and traffic from month 1 for less competitive keywords, with more significant gains building over time. We set realistic expectations from the start." },
              { q: "How much should I budget for Google Ads?", a: "That depends on your industry and competition. We recommend a minimum ad spend of TZS 300,000–500,000/month for Google Ads to gather meaningful data. Our management fee covers strategy and optimization on top of your ad spend." },
              { q: "Do you manage our social media accounts?", a: "Yes — under the Growth and Market Domination packages, we fully manage your social media presence including content creation, posting, engagement with followers, and paid campaigns." },
              { q: "How do I know the marketing is actually working?", a: "We set up proper tracking from day one — Google Analytics, conversion tracking, and call tracking. You receive monthly reports showing traffic, leads, rankings, ad performance, and ROI. We're accountable to measurable results." },
              { q: "Can you do digital marketing for a business that doesn't have a website yet?", a: "We strongly recommend having a professional website first, since it's the destination for all your marketing. We can build you a website and then start marketing it — contact us about a bundled package." },
              { q: "Can I run just SEO without ads?", a: "Absolutely. SEO-only is our Visibility Starter package. Many clients start with SEO and add ads once their budget grows. We'll always recommend the right mix based on your goals and budget." },
            ].map((faq, i) => (
              <details key={i} className="group bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden hover:border-red-200 transition-colors">
                <summary className="flex justify-between items-center px-6 py-5 cursor-pointer font-semibold text-gray-900 hover:text-red-700 transition-colors list-none group-open:text-red-700">
                  {faq.q}
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 group-open:text-red-500 transition-all shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4 bg-white">{faq.a}</div>
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
            <span className="text-sm font-medium text-gray-900">Free digital marketing audit</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
            Your customers are online.
            <span className="block text-red-600">Are you visible?</span>
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-xl mx-auto">We&apos;ll audit your current online presence for free and show you exactly where you&apos;re losing customers to competitors.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={goContact} className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-500/30 hover:shadow-xl transform hover:-translate-y-1">
              Get a Free Marketing Audit
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
            <Link href="/#services" className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold border-2 border-red-200 hover:border-red-300 hover:bg-red-50 hover:shadow-lg transition-all">View All Services</Link>
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
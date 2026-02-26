"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MobilePaymentModal } from "@/components/MobilePaymentModal";

// ─── Data ─────────────────────────────────────────────────────────────────────
const analyticsPackages = [
  {
    id: "starter",
    name: "Insights Starter",
    tagline: "Your first step from spreadsheets to dashboards",
    price: 800000,
    badge: null,
    theme: "light",
    deliveryDays: "7–14 days",
    dashboards: "1–2 dashboards",
    dataSources: "Up to 2 sources",
    features: [
      { text: "Custom dashboard design", included: true },
      { text: "Excel / Google Sheets integration", included: true },
      { text: "Up to 10 key metrics", included: true },
      { text: "Bar, line & pie charts", included: true },
      { text: "PDF/Excel report export", included: true },
      { text: "Auto-refresh data", included: false },
      { text: "Multiple data source integration", included: false },
      { text: "Predictive analytics", included: false },
      { text: "Team access & sharing", included: false },
    ],
    idealFor: ["Small business owners", "Sales reporting", "Basic KPI tracking"],
  },
  {
    id: "business",
    name: "Business Intelligence",
    tagline: "Real-time dashboards connecting all your data",
    price: 2500000,
    badge: "Most Popular",
    theme: "red",
    deliveryDays: "14–28 days",
    dashboards: "Up to 5 dashboards",
    dataSources: "Up to 5 sources",
    features: [
      { text: "Custom dashboard design", included: true },
      { text: "Database & system integration", included: true },
      { text: "Unlimited key metrics", included: true },
      { text: "All chart types", included: true },
      { text: "Scheduled automated reports", included: true },
      { text: "Auto-refresh data", included: true },
      { text: "Multiple data source integration", included: true },
      { text: "Predictive analytics", included: false },
      { text: "Team access & sharing", included: true },
    ],
    idealFor: ["Operations managers", "Multi-branch businesses", "Finance teams"],
  },
  {
    id: "enterprise",
    name: "Advanced Analytics",
    tagline: "Predictive intelligence for data-driven leaders",
    price: 6000000,
    badge: "Full Power",
    theme: "dark",
    deliveryDays: "28–60 days",
    dashboards: "Unlimited dashboards",
    dataSources: "Unlimited sources",
    features: [
      { text: "Custom dashboard design", included: true },
      { text: "Database & API integration", included: true },
      { text: "Unlimited key metrics", included: true },
      { text: "All chart types + custom visuals", included: true },
      { text: "Scheduled automated reports", included: true },
      { text: "Real-time auto-refresh", included: true },
      { text: "Unlimited data sources", included: true },
      { text: "Predictive & trend analytics", included: true },
      { text: "Team access, roles & sharing", included: true },
    ],
    idealFor: ["C-suite executives", "Enterprise operations", "Data-heavy industries"],
  },
];

const processSteps = [
  { step: "01", icon: "🔍", title: "Data Audit", desc: "We assess your current data sources — spreadsheets, systems, databases — and identify what insights you need most." },
  { step: "02", icon: "📐", title: "Dashboard Design", desc: "We design your dashboard layout, choose the right chart types, and agree on KPIs before any development begins." },
  { step: "03", icon: "🔗", title: "Data Integration", desc: "We connect your data sources, set up automated pipelines, and ensure everything flows accurately into your dashboards." },
  { step: "04", icon: "📊", title: "Launch & Training", desc: "We go live, walk you through every feature, and set up automated reports so insights arrive in your inbox regularly." },
];

const useCases = [
  { icon: "📈", title: "Sales Performance", desc: "Track revenue, conversion rates, top products, and sales team performance across branches in real time." },
  { icon: "👥", title: "HR & Workforce", desc: "Monitor attendance patterns, overtime, turnover rates, and payroll costs against headcount." },
  { icon: "📦", title: "Inventory Analytics", desc: "Spot slow-moving stock, forecast demand, track supplier performance, and reduce waste." },
  { icon: "💰", title: "Financial Reporting", desc: "Automated P&L statements, cash flow tracking, expense breakdowns, and budget vs. actual comparisons." },
  { icon: "🛒", title: "Customer Analytics", desc: "Understand customer behavior, lifetime value, churn risk, and segment your best customers automatically." },
  { icon: "🏥", title: "Operations & KPIs", desc: "Custom dashboards for any operational metric — delivery times, service levels, quality control, and more." },
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
    ideaBg: "bg-red-50/20 border border-red-100/50", accent: "text-red-200",
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

export default function DataAnalysisPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; amount: number; billingPeriod: "once" }>({ name: "", amount: 0, billingPeriod: "once" });

  const openPayment = (name: string, amount: number) => { setSelectedPlan({ name, amount, billingPeriod: "once" }); setModalOpen(true); };

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
            <span className="text-gray-800 font-medium">Data Analytics & Insights</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <div className={`mb-6 transition-all duration-700 delay-100 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-red-200/50 shadow-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-900">Data Analytics & Business Intelligence</span>
                </div>
              </div>

              <h1 className={`transition-all duration-700 delay-200 text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-[1.08] tracking-tight ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                Stop Drowning
                <span className="relative block mt-1">
                  <span className="text-red-600">In Spreadsheets.</span>
                  <span className="absolute -bottom-1 left-0 w-2/3 h-3 bg-red-100/70 rounded-sm -z-0" />
                </span>
                <span className="block text-gray-500 text-3xl md:text-4xl lg:text-5xl font-semibold mt-2">See the full picture.</span>
              </h1>

              <p className={`transition-all duration-700 delay-300 text-xl text-gray-600 mb-10 leading-relaxed max-w-xl ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                We transform your raw business data into beautiful, interactive dashboards that give you instant answers — so you spend less time reporting and more time deciding.
              </p>

              <div className={`transition-all duration-700 delay-[400ms] flex flex-col sm:flex-row gap-4 mb-12 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <a href="#pricing" onClick={(e) => { e.preventDefault(); document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transform hover:-translate-y-1">
                  View Packages
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
                <button onClick={goContact} className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold border-2 border-red-200 hover:border-red-300 hover:bg-red-50 hover:shadow-lg transition-all">
                  Get a Free Demo
                </button>
              </div>

              <div className={`transition-all duration-700 delay-500 flex flex-wrap gap-3 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                {[{ icon: "⚡", text: "Real-time data" }, { icon: "📊", text: "Custom dashboards" }, { icon: "🤖", text: "Automated reports" }, { icon: "📱", text: "Mobile accessible" }, { icon: "🔗", text: "Connects to your systems" }].map((pill) => (
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
                        <p className="text-red-200 text-xs font-bold uppercase tracking-widest">Live Dashboard</p>
                        <h3 className="text-white text-xl font-black mt-0.5">Business Overview</h3>
                      </div>
                      <div className="text-xs bg-white/20 text-white px-3 py-1.5 rounded-full font-bold">Nov 2024</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[{ l: "Revenue", v: "TZS 48.2M", up: true }, { l: "Orders", v: "1,284", up: true }, { l: "Customers", v: "342", up: false }].map((m) => (
                        <div key={m.l} className="bg-white/10 rounded-xl p-2.5 text-center">
                          <p className="text-white font-black text-base">{m.v}</p>
                          <p className="text-red-200 text-xs">{m.l}</p>
                          <span className={`text-xs font-bold ${m.up ? "text-green-300" : "text-amber-300"}`}>{m.up ? "▲ 12%" : "▼ 3%"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Monthly Revenue Trend</p>
                    <div className="flex items-end gap-1 h-20 mb-4">
                      {[40, 55, 45, 70, 60, 80, 65, 90, 75, 95, 85, 100].map((h, i) => (
                        <div key={i} className="flex-1 rounded-t-sm transition-all duration-300 hover:opacity-80" style={{ height: `${h}%`, background: i === 11 ? "linear-gradient(to top, #dc2626, #ef4444)" : i >= 9 ? "#fca5a5" : "#fee2e2" }} />
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[{ l: "Top Product", v: "Packaging A", icon: "📦" }, { l: "Best Region", v: "Dar es Salaam", icon: "📍" }].map((item) => (
                        <div key={item.l} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                          <div className="flex items-center gap-1.5 mb-1"><span>{item.icon}</span><p className="text-xs text-gray-400">{item.l}</p></div>
                          <p className="text-sm font-bold text-gray-800">{item.v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="px-5 pb-5">
                    <button onClick={goContact} className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-sm hover:from-red-700 hover:to-red-800 transition-all">
                      Build My Dashboard →
                    </button>
                  </div>
                </div>
                <div className="absolute -top-4 -left-6 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 z-20 animate-float">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center"><span className="text-base">🔄</span></div>
                    <div><p className="text-xs font-bold text-gray-800">Auto-updates</p><p className="text-xs text-gray-400">Data refreshes live</p></div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 z-20 animate-float-delayed">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center"><span className="text-base">📧</span></div>
                    <div><p className="text-xs font-bold text-gray-800">Weekly report</p><p className="text-xs text-gray-400">Sent to your inbox</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ USE CASES ══ */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-red-700">What We Analyze</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Insights across every part of your business</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Whether it&apos;s sales, HR, or operations — if you have data, we can build dashboards around it.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((item) => (
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
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">Analytics Packages</h2>
            <p className="text-gray-500 text-lg">One-time setup. Your dashboards are yours forever.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {analyticsPackages.map((pkg) => {
              const s = getCardStyle(pkg.theme);
              return (
                <div key={pkg.id} className={`relative flex flex-col rounded-3xl border-2 overflow-hidden transition-all duration-300 ${s.wrapper}`}>
                  {pkg.badge && <div className="bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-black text-center py-2 tracking-wider uppercase">✦ {pkg.badge} ✦</div>}
                  <div className={`p-8 ${s.header}`}>
                    <h3 className={`text-2xl font-black ${s.headerText}`}>{pkg.name}</h3>
                    <p className={`text-sm mt-1 mb-5 ${s.headerSub}`}>{pkg.tagline}</p>
                    <div>
                      <span className={`text-4xl font-black ${s.priceColor}`}>{formatTZS(pkg.price)}</span>
                      <span className={`text-sm ml-2 ${s.headerSub}`}>one-time</span>
                    </div>
                    <div className={`mt-5 flex gap-4 pt-5 border-t ${s.divider}`}>
                      {[{ l: "Dashboards", v: pkg.dashboards }, { l: "Delivery", v: pkg.deliveryDays }, { l: "Data Sources", v: pkg.dataSources }].map((sp) => (
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
                        {pkg.idealFor.map((u) => <span key={u} className="text-xs bg-white border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full">{u}</span>)}
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
                    <button onClick={() => openPayment(pkg.name, pkg.price)} className={`w-full py-4 rounded-xl text-sm transition-all duration-200 transform hover:-translate-y-0.5 ${s.btn}`}>
                      Get Started with {pkg.name}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-red-700">Simple Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">From Raw Data to Clear Insights</h2>
            <p className="text-gray-500 text-lg">A proven process to get your dashboards live fast.</p>
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
            <p className="text-gray-500">Everything about data analytics — answered simply.</p>
          </div>
          <div className="space-y-3">
            {[
              { q: "What data sources can you connect to?", a: "We can connect to almost any data source — Excel and Google Sheets, MySQL/PostgreSQL databases, your custom business systems, accounting software, POS systems, Google Analytics, social media platforms, and many more via API." },
              { q: "I only have data in spreadsheets. Can you still help?", a: "Absolutely — most of our clients start with spreadsheets. We can connect directly to your Excel files or Google Sheets, clean the data, and turn it into professional dashboards. This is one of our most popular use cases." },
              { q: "Will the dashboards update automatically?", a: "Yes, under Business Intelligence and Advanced Analytics packages, dashboards refresh automatically based on your data update frequency — from every few minutes to daily. Starter dashboards require a manual refresh." },
              { q: "Who can access the dashboards?", a: "We set up secure, role-based access. You can share dashboards with specific team members at different permission levels — some can view only, others can filter and explore, and admins can manage settings." },
              { q: "What tools do you use to build dashboards?", a: "We use a combination of tools depending on your needs — including custom web dashboards (React + charts), Power BI, Google Looker Studio, or Metabase. We'll recommend the best fit for your data volume and team." },
              { q: "Can I request new metrics or changes after delivery?", a: "Yes. The first 30 days include free revisions. After that, we offer affordable hourly rates or an ongoing support package for adding new dashboards, metrics, and data sources as your business grows." },
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
            <span className="text-sm font-medium text-gray-900">Start with a free data audit</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
            Your data has the answers.
            <span className="block text-red-600">Let&apos;s find them.</span>
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-xl mx-auto">We&apos;ll review your current data setup for free and show you what dashboards are possible before you commit to anything.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={goContact} className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-500/30 hover:shadow-xl transform hover:-translate-y-1">
              Get a Free Data Audit
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
            <Link href="/#services" className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold border-2 border-red-200 hover:border-red-300 hover:bg-red-50 hover:shadow-lg transition-all">View All Services</Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float { 0%, 100% { transform: translate(0,0) rotate(0deg); } 33% { transform: translate(20px,-20px) rotate(3deg); } 66% { transform: translate(-15px,15px) rotate(-3deg); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.05); } }
        .animate-float { animation: float 18s ease-in-out infinite; }
        .animate-float-delayed { animation: float 22s ease-in-out infinite; animation-delay: -8s; }
        .animate-spin-slow { animation: spin-slow 25s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
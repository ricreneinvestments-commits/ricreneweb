"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MobilePaymentModal } from "@/components/MobilePaymentModal";

// ─── Data ─────────────────────────────────────────────────────────────────────
const systemPackages = [
  {
    id: "starter",
    name: "Starter System",
    tagline: "A focused solution for one core business need",
    price: 1500000,
    badge: null,
    theme: "light",
    deliveryDays: "14–21 days",
    modules: "1–2 modules",
    users: "Up to 10 users",
    features: [
      { text: "Custom module design", included: true },
      { text: "User login & roles", included: true },
      { text: "Dashboard & reports", included: true },
      { text: "Data export (Excel/PDF)", included: true },
      { text: "Mobile-friendly interface", included: true },
      { text: "WhatsApp notifications", included: false },
      { text: "Biometric integration", included: false },
      { text: "API integrations", included: false },
      { text: "Custom mobile app", included: false },
    ],
    idealFor: ["Small HR systems", "Inventory tracking", "Simple CRM"],
  },
  {
    id: "business",
    name: "Business System",
    tagline: "Multi-module system for growing operations",
    price: 4000000,
    badge: "Most Popular",
    theme: "red",
    deliveryDays: "21–45 days",
    modules: "3–6 modules",
    users: "Up to 50 users",
    features: [
      { text: "Multi-module architecture", included: true },
      { text: "Advanced roles & permissions", included: true },
      { text: "Real-time dashboards", included: true },
      { text: "Data export (Excel/PDF)", included: true },
      { text: "Mobile-friendly interface", included: true },
      { text: "WhatsApp/SMS notifications", included: true },
      { text: "Biometric integration", included: true },
      { text: "API integrations", included: false },
      { text: "Custom mobile app", included: false },
    ],
    idealFor: ["HR & payroll systems", "Multi-branch inventory", "School management"],
  },
  {
    id: "enterprise",
    name: "Enterprise System",
    tagline: "Full-scale ERP/CRM tailored to your exact workflow",
    price: 10000000,
    badge: "Full Power",
    theme: "dark",
    deliveryDays: "45–90 days",
    modules: "Unlimited modules",
    users: "Unlimited users",
    features: [
      { text: "Unlimited modules", included: true },
      { text: "Advanced roles & permissions", included: true },
      { text: "Real-time analytics dashboards", included: true },
      { text: "Data export (Excel/PDF)", included: true },
      { text: "Mobile-friendly interface", included: true },
      { text: "WhatsApp/SMS/Email notifications", included: true },
      { text: "Biometric integration", included: true },
      { text: "Third-party API integrations", included: true },
      { text: "Custom mobile app", included: true },
    ],
    idealFor: ["Full ERP systems", "Hospital management", "Government portals"],
  },
];

const systemTypes = [
  { id: "hr", icon: "👥", label: "HR & Payroll", desc: "Staff management", recommended: "business" },
  { id: "inventory", icon: "📦", label: "Inventory", desc: "Stock tracking", recommended: "starter" },
  { id: "crm", icon: "🤝", label: "CRM", desc: "Customer relations", recommended: "business" },
  { id: "school", icon: "🎓", label: "School System", desc: "Education management", recommended: "business" },
  { id: "hospital", icon: "🏥", label: "Hospital/Clinic", desc: "Healthcare records", recommended: "enterprise" },
  { id: "pos", icon: "🛒", label: "Point of Sale", desc: "Retail & billing", recommended: "starter" },
  { id: "erp", icon: "🏢", label: "ERP System", desc: "Full operations", recommended: "enterprise" },
  { id: "custom", icon: "⚙️", label: "Custom System", desc: "Your unique need", recommended: "enterprise" },
];

const processSteps = [
  { step: "01", icon: "💬", title: "Discovery Session", desc: "We sit with your team to map your workflows, pain points, and exactly what the system needs to do." },
  { step: "02", icon: "📐", title: "Design & Approval", desc: "We build wireframes and a full spec document. You review and approve before any code is written." },
  { step: "03", icon: "💻", title: "Development & Testing", desc: "We build your system in sprints, sharing progress regularly. You test each module before we move on." },
  { step: "04", icon: "🚀", title: "Launch & Training", desc: "We deploy the system, migrate your data, and train your entire team. Full handover documentation included." },
];

const capabilities = [
  { icon: "👤", title: "HR & Attendance", desc: "Staff records, leave management, biometric clock-in/out, payroll calculations, and payslip generation." },
  { icon: "📦", title: "Inventory & Stock", desc: "Real-time stock levels, purchase orders, supplier management, low-stock alerts, and branch transfers." },
  { icon: "💰", title: "Finance & Billing", desc: "Invoice generation, payment tracking, expense management, profit/loss reports, and VAT calculations." },
  { icon: "🤝", title: "CRM & Sales", desc: "Lead tracking, client records, follow-up reminders, sales pipeline, and performance dashboards." },
  { icon: "🎓", title: "School Management", desc: "Student enrollment, attendance, exams & grades, fee collection, and parent communication portals." },
  { icon: "📊", title: "Reports & Analytics", desc: "Custom dashboards, scheduled reports, data exports, and visual charts for decision-making." },
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

function getCardStyle(theme: string, highlighted: boolean) {
  const scale = highlighted ? "scale-[1.02]" : "";
  if (theme === "red") return {
    wrapper: `border-red-300 shadow-2xl shadow-red-100/80 ${scale}`,
    header: "bg-gradient-to-br from-red-600 to-red-700",
    headerText: "text-white", headerSub: "text-red-100",
    priceColor: "text-white", divider: "border-white/10",
    btn: "bg-white text-red-700 font-bold hover:bg-red-50 shadow-md",
    ideaBg: "bg-red-50/30 border border-red-100/80", accent: "text-red-200",
  };
  if (theme === "dark") return {
    wrapper: `border-gray-800 shadow-xl ${scale}`,
    header: "bg-gradient-to-br from-gray-900 to-black",
    headerText: "text-white", headerSub: "text-gray-400",
    priceColor: "text-white", divider: "border-white/10",
    btn: "bg-gradient-to-r from-red-600 to-red-700 text-white font-bold hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-500/20",
    ideaBg: "bg-gray-800/50 border border-gray-700", accent: "text-gray-500",
  };
  return {
    wrapper: `border-gray-200 shadow-sm hover:shadow-xl hover:border-red-100 ${highlighted ? "border-red-300 shadow-xl shadow-red-50 " + scale : ""}`,
    header: "bg-gradient-to-br from-gray-50 to-white border-b border-gray-100",
    headerText: "text-gray-900", headerSub: "text-gray-500",
    priceColor: "text-red-600", divider: "border-gray-100",
    btn: "bg-gradient-to-r from-red-600 to-red-700 text-white font-bold hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-500/20",
    ideaBg: "bg-gray-50 border border-gray-100", accent: "text-gray-500",
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CustomSystemsPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [highlightPkg, setHighlightPkg] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; amount: number; billingPeriod: "once" }>({ name: "", amount: 0, billingPeriod: "once" });

  const openPayment = (name: string, amount: number) => {
    setSelectedPlan({ name, amount, billingPeriod: "once" });
    setModalOpen(true);
  };

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const goContact = () => { window.location.href = "/#contact"; };

  const handleTypeSelect = (id: string, recommended: string) => {
    if (selectedType === id) { setSelectedType(null); setHighlightPkg(null); }
    else {
      setSelectedType(id); setHighlightPkg(recommended);
      setTimeout(() => document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    }
  };

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
            <span className="text-gray-800 font-medium">Business Automation & Systems</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <div className={`mb-6 transition-all duration-700 delay-100 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-red-200/50 shadow-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-900">Business Automation & Custom Systems</span>
                </div>
              </div>

              <h1 className={`transition-all duration-700 delay-200 text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-[1.08] tracking-tight ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                Custom Systems
                <span className="relative block mt-1">
                  <span className="text-red-600">Built Around Your Business</span>
                  <span className="absolute -bottom-1 left-0 w-2/3 h-3 bg-red-100/70 rounded-sm -z-0" />
                </span>
                <span className="block text-gray-500 text-3xl md:text-4xl lg:text-5xl font-semibold mt-2">Outgrow Generic Software.</span>
              </h1>

              <p className={`transition-all duration-700 delay-300 text-xl text-gray-600 mb-10 leading-relaxed max-w-xl ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                We build custom management systems designed around your exact workflows — HR, inventory, finance, school management, and more. Built for Tanzania, built for you.
              </p>

              <div className={`transition-all duration-700 delay-[400ms] flex flex-col sm:flex-row gap-4 mb-12 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <a href="#type-selector" onClick={(e) => { e.preventDefault(); document.getElementById("type-selector")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transform hover:-translate-y-1">
                  Choose Your System
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
                <button onClick={goContact} className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold border-2 border-red-200 hover:border-red-300 hover:bg-red-50 hover:shadow-lg transition-all">
                  Get a Free Consultation
                </button>
              </div>

              <div className={`transition-all duration-700 delay-500 flex flex-wrap gap-3 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                {[{ icon: "🇹🇿", text: "Tanzania-based team" }, { icon: "⚙️", text: "100% custom built" }, { icon: "📱", text: "Mobile-friendly" }, { icon: "🔒", text: "Secure & private" }, { icon: "💬", text: "WhatsApp support" }].map((pill) => (
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
                        <p className="text-red-200 text-xs font-bold uppercase tracking-widest">Live Preview</p>
                        <h3 className="text-white text-xl font-black mt-0.5">HR Management System</h3>
                      </div>
                      <div className="flex items-center gap-1.5 bg-green-400/20 border border-green-400/40 rounded-full px-3 py-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-300 text-xs font-bold">Running</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {[{ label: "Employees", value: "142" }, { label: "On Leave", value: "8" }, { label: "Payroll Due", value: "3 days" }].map((stat) => (
                        <div key={stat.label} className="bg-white/10 rounded-xl p-2.5 text-center">
                          <p className="text-white font-black text-lg">{stat.value}</p>
                          <p className="text-red-200 text-xs">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    {[
                      { name: "Attendance Report", status: "Generated", icon: "📊", ok: true },
                      { name: "Payroll – November", status: "Processing", icon: "💰", ok: false },
                      { name: "Leave Request – Ali H.", status: "Approved", icon: "✅", ok: true },
                      { name: "New Staff Onboarding", status: "3 pending", icon: "👤", ok: false },
                    ].map((item) => (
                      <div key={item.name} className={`flex items-center justify-between p-3 rounded-xl border ${item.ok ? "bg-gray-50 border-gray-100" : "bg-amber-50 border-amber-100"}`}>
                        <div className="flex items-center gap-2">
                          <span className="text-base">{item.icon}</span>
                          <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                        </div>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.ok ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{item.status}</span>
                      </div>
                    ))}
                  </div>
                  <div className="px-5 pb-5">
                    <button onClick={goContact} className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-sm hover:from-red-700 hover:to-red-800 transition-all">
                      Build This for My Business →
                    </button>
                  </div>
                </div>
                <div className="absolute -top-4 -left-6 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 z-20 animate-float">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center"><span className="text-base">🔒</span></div>
                    <div><p className="text-xs font-bold text-gray-800">Role-based access</p><p className="text-xs text-gray-400">Admin, manager, staff</p></div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 z-20 animate-float-delayed">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center"><span className="text-base">📱</span></div>
                    <div><p className="text-xs font-bold text-gray-800">Works on phone</p><p className="text-xs text-gray-400">Any device, anywhere</p></div>
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
              <span className="text-sm font-semibold text-red-700">What We Build</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Systems for every part of your business</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">We&apos;ve built custom systems across industries. Here&apos;s what we can create for you.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((item) => (
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

      {/* ══ TYPE SELECTOR ══ */}
      <section id="type-selector" className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-red-700">Step 1 of 2</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">What system do you need?</h2>
            <p className="text-gray-500 text-lg">Select your system type and we&apos;ll recommend the right package.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
            {systemTypes.map((type) => (
              <button key={type.id} onClick={() => handleTypeSelect(type.id, type.recommended)}
                className={`group relative flex flex-col items-center gap-2.5 p-4 rounded-2xl border-2 transition-all duration-200 text-center overflow-hidden ${selectedType === type.id ? "border-red-500 bg-red-600 shadow-lg shadow-red-200" : "border-gray-200 bg-white hover:border-red-300 hover:shadow-md hover:bg-red-50/30"}`}>
                {selectedType === type.id && <div className="absolute inset-0 bg-red-600" />}
                <span className={`text-3xl relative z-10 ${selectedType !== type.id && "group-hover:scale-110 transition-transform duration-200"}`}>{type.icon}</span>
                <div className="relative z-10">
                  <p className={`text-xs font-bold leading-tight ${selectedType === type.id ? "text-white" : "text-gray-800 group-hover:text-red-700"}`}>{type.label}</p>
                  <p className={`text-xs mt-0.5 ${selectedType === type.id ? "text-red-100" : "text-gray-400"}`}>{type.desc}</p>
                </div>
                {selectedType === type.id && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                )}
              </button>
            ))}
          </div>
          {selectedType && (
            <div className="flex items-center justify-center gap-3 text-sm text-red-700 bg-white border-2 border-red-200 rounded-2xl px-6 py-4 w-fit mx-auto shadow-sm">
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="font-semibold">We&apos;ve highlighted the best package for you below ↓</span>
            </div>
          )}
        </div>
      </section>

      {/* ══ PRICING ══ */}
      <section id="pricing-section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">System Packages</h2>
            <p className="text-gray-500 text-lg">One-time project investment. You own the system forever.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {systemPackages.map((pkg) => {
              const isHL = highlightPkg === pkg.id;
              const s = getCardStyle(pkg.theme, isHL);
              return (
                <div key={pkg.id} className={`relative flex flex-col rounded-3xl border-2 overflow-hidden transition-all duration-500 ${s.wrapper}`}>
                  {isHL && (
                    <div className="bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-black text-center py-2 tracking-wider uppercase">✦ Recommended for your selection ✦</div>
                  )}
                  {!isHL && pkg.badge && (
                    <div className="bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-black text-center py-2 tracking-wider uppercase">✦ {pkg.badge} ✦</div>
                  )}
                  <div className={`p-8 ${s.header}`}>
                    <h3 className={`text-2xl font-black ${s.headerText}`}>{pkg.name}</h3>
                    <p className={`text-sm mt-1 mb-5 ${s.headerSub}`}>{pkg.tagline}</p>
                    <div>
                      <span className={`text-4xl font-black ${s.priceColor}`}>{formatTZS(pkg.price)}</span>
                      <span className={`text-sm ml-2 ${s.headerSub}`}>one-time</span>
                    </div>
                    <div className={`mt-5 flex gap-4 pt-5 border-t ${s.divider}`}>
                      {[{ l: "Modules", v: pkg.modules }, { l: "Delivery", v: pkg.deliveryDays }, { l: "Users", v: pkg.users }].map((sp) => (
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
                    <button onClick={() => openPayment(pkg.name, pkg.price)} className={`w-full py-4 rounded-xl text-sm transition-all duration-200 transform hover:-translate-y-0.5 ${s.btn}`}>
                      Start with {pkg.name}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-12 bg-white border-2 border-red-100 rounded-3xl p-8 max-w-3xl mx-auto text-center">
            <p className="text-gray-700 font-semibold text-lg mb-2">Have a complex or unique requirement?</p>
            <p className="text-gray-500 text-sm mb-6">Tell us what you need and we&apos;ll scope a custom solution with a detailed quote within 48 hours.</p>
            <button onClick={goContact} className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-bold hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-500/20 transform hover:-translate-y-1">
              Request a Custom Quote
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </div>
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-red-700">Our Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">How We Build Your System</h2>
            <p className="text-gray-500 text-lg">A collaborative, transparent process from idea to launch.</p>
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
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">Common Questions</h2>
            <p className="text-gray-500">Everything about custom business systems — answered.</p>
          </div>
          <div className="space-y-3">
            {[
              { q: "Do I need technical knowledge to use the system?", a: "No. We design every system with your actual users in mind — simple, intuitive interfaces that require no technical background. We also provide full training for your team before handover." },
              { q: "Can the system be accessed on mobile phones?", a: "Yes. All our systems are built to be fully responsive, meaning they work on smartphones, tablets, and desktop computers without needing a separate app — unless you specifically request a native mobile app." },
              { q: "What happens if I need changes after launch?", a: "Minor changes within the first 30 days are covered at no extra charge. Beyond that, we offer affordable hourly rates or a monthly support retainer to handle updates, new features, and maintenance." },
              { q: "Can the system integrate with my existing tools?", a: "Yes — the Business and Enterprise packages include API integrations. We've connected systems to M-Pesa, accounting software, biometric devices, email platforms, and more." },
              { q: "Where is the data stored? Is it secure?", a: "Your data is stored on secure servers with regular backups. We implement role-based access control so each user only sees what they need to. For sensitive data, we offer on-premise hosting options." },
              { q: "What technology do you build with?", a: "We use modern, proven technologies including React, Next.js, Node.js, and PostgreSQL/MySQL. We choose the right stack for your specific needs rather than forcing one solution on every project." },
            ].map((faq, i) => (
              <details key={i} className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-red-200 transition-colors">
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-100/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-10 right-[10%] w-72 h-72 bg-gradient-to-br from-red-200/30 to-red-300/20 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-10 left-[5%] w-96 h-96 bg-gradient-to-tr from-red-100/20 to-red-200/15 rounded-full blur-3xl animate-float-delayed pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-red-200/50 shadow-sm mb-6">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-900">Let&apos;s build something great</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
            Ready to automate
            <span className="block text-red-600">your business?</span>
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-xl mx-auto">Book a free consultation and we&apos;ll show you exactly how a custom system can save your team hours every week.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={goContact} className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transform hover:-translate-y-1">
              Book a Free Consultation
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
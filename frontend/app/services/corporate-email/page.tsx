"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MobilePaymentModal } from "@/components/MobilePaymentModal";

// ─── Data ─────────────────────────────────────────────────────────────────────
const emailPlans = [
  {
    id: "starter",
    name: "Starter Email",
    tagline: "Professional email for small teams",
    yearlyPrice: 120000,
    monthlyPrice: 12000,
    badge: null,
    theme: "light",
    accounts: "Up to 5 accounts",
    storage: "5 GB / account",
    features: [
      { text: "Custom domain email (you@yourco.co.tz)", included: true },
      { text: "Webmail access (browser)", included: true },
      { text: "Mobile & desktop sync", included: true },
      { text: "Spam & virus filtering", included: true },
      { text: "Email forwarding & aliases", included: true },
      { text: "Shared team inbox", included: false },
      { text: "Email archiving", included: false },
      { text: "Advanced security (2FA)", included: false },
      { text: "Microsoft 365 / Google Workspace", included: false },
    ],
  },
  {
    id: "business",
    name: "Business Email",
    tagline: "Full-featured email for growing businesses",
    yearlyPrice: 350000,
    monthlyPrice: 35000,
    badge: "Most Popular",
    theme: "red",
    accounts: "Up to 25 accounts",
    storage: "15 GB / account",
    features: [
      { text: "Custom domain email", included: true },
      { text: "Webmail access (browser)", included: true },
      { text: "Mobile & desktop sync", included: true },
      { text: "Advanced spam & virus filtering", included: true },
      { text: "Email forwarding & aliases", included: true },
      { text: "Shared team inbox", included: true },
      { text: "Email archiving (1 year)", included: true },
      { text: "Advanced security (2FA)", included: true },
      { text: "Microsoft 365 / Google Workspace", included: false },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise Email",
    tagline: "Microsoft 365 or Google Workspace for your team",
    yearlyPrice: 900000,
    monthlyPrice: 85000,
    badge: "Full Suite",
    theme: "dark",
    accounts: "Unlimited accounts",
    storage: "50 GB+ / account",
    features: [
      { text: "Custom domain email", included: true },
      { text: "Webmail + Outlook/Gmail", included: true },
      { text: "Mobile & desktop sync", included: true },
      { text: "Enterprise spam & threat protection", included: true },
      { text: "Email forwarding & aliases", included: true },
      { text: "Shared inboxes & distribution lists", included: true },
      { text: "Email archiving (unlimited)", included: true },
      { text: "Advanced security (MFA + DLP)", included: true },
      { text: "Microsoft 365 or Google Workspace", included: true },
    ],
  },
];

const whatWeHandle = [
  { icon: "🔧", title: "Full Setup", desc: "We handle domain verification, DNS configuration, MX records, SPF, DKIM, and DMARC so your emails land in inboxes, not spam folders." },
  { icon: "📱", title: "All Devices", desc: "We configure your email on phones (iOS & Android), desktops (Outlook, Apple Mail), and webmail — for every member of your team." },
  { icon: "🔄", title: "Email Migration", desc: "Moving from Gmail, Yahoo, or another provider? We migrate all your existing emails to the new system without losing a single message." },
  { icon: "🛡️", title: "Security Setup", desc: "We configure spam filters, anti-virus scanning, two-factor authentication, and enterprise security policies to protect your business communications." },
  { icon: "👥", title: "Team Training", desc: "We run a training session for your whole team so everyone knows how to use the new email system effectively from day one." },
  { icon: "🔁", title: "Ongoing Support", desc: "Need to add a new staff member or remove one who left? We handle all account changes quickly via WhatsApp." },
];

const processSteps = [
  { step: "01", icon: "💬", title: "Consultation", desc: "We assess your team size, current email setup, and recommend the right platform and plan for your needs." },
  { step: "02", icon: "⚙️", title: "DNS & Setup", desc: "We configure your domain's DNS records and set up the email platform — no disruption to your current email." },
  { step: "03", icon: "🔄", title: "Migration", desc: "We migrate all existing emails, contacts, and calendar data to your new system safely and completely." },
  { step: "04", icon: "🎓", title: "Training & Handover", desc: "We train your team and hand over full admin access. Same-day support during the transition period." },
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

export default function CorporateEmailPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; amount: number; billingPeriod: "monthly" | "yearly" }>({ name: "", amount: 0, billingPeriod: "yearly" });

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
            <span className="text-gray-800 font-medium">Corporate Email Solutions</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <div className={`mb-6 transition-all duration-700 delay-100 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-red-200/50 shadow-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-900">Custom Business Email Solutions</span>
                </div>
              </div>

              <h1 className={`transition-all duration-700 delay-200 text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-[1.08] tracking-tight ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                Stop Using Gmail
                <span className="relative block mt-1">
                  <span className="text-red-600">For Business.</span>
                  <span className="absolute -bottom-1 left-0 w-2/3 h-3 bg-red-100/70 rounded-sm -z-0" />
                </span>
                <span className="block text-gray-500 text-3xl md:text-4xl lg:text-5xl font-semibold mt-2">Look professional.</span>
              </h1>

              <p className={`transition-all duration-700 delay-300 text-xl text-gray-600 mb-10 leading-relaxed max-w-xl ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                Get professional email addresses like <span className="font-bold text-gray-900">info@yourcompany.co.tz</span> for your entire team. We handle all the technical setup, migration, and training so you&apos;re up and running fast.
              </p>

              <div className={`transition-all duration-700 delay-[400ms] flex flex-col sm:flex-row gap-4 mb-12 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <a href="#pricing" onClick={(e) => { e.preventDefault(); document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transform hover:-translate-y-1">
                  View Email Plans
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
                <button onClick={goContact} className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold border-2 border-red-200 hover:border-red-300 hover:bg-red-50 hover:shadow-lg transition-all">
                  Get a Free Consultation
                </button>
              </div>

              <div className={`transition-all duration-700 delay-500 flex flex-wrap gap-3 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                {[{ icon: "✉️", text: "Custom domain email" }, { icon: "🔒", text: "Spam protected" }, { icon: "📱", text: "Works on all devices" }, { icon: "🔄", text: "Email migration" }, { icon: "💬", text: "WhatsApp support" }].map((pill) => (
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
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      </div>
                      <div>
                        <p className="text-red-200 text-xs font-bold uppercase tracking-widest">Professional Inbox</p>
                        <h3 className="text-white text-lg font-black">info@yourcompany.co.tz</h3>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {["ceo@yourcompany.co.tz", "sales@yourcompany.co.tz", "support@yourcompany.co.tz"].map((email) => (
                        <div key={email} className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                            <span className="text-xs text-white font-bold">{email[0].toUpperCase()}</span>
                          </div>
                          <span className="text-white/80 text-sm font-medium">{email}</span>
                          <div className="ml-auto w-2 h-2 bg-green-400 rounded-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    {[
                      { from: "Client — Ahmed K.", subject: "RE: Project Proposal", time: "10:32 AM", unread: true },
                      { from: "Bank of Tanzania", subject: "Monthly Statement", time: "Yesterday", unread: false },
                      { from: "Supplier — Jumbo Ltd", subject: "Invoice #2847", time: "Yesterday", unread: true },
                      { from: "Team — HR System", subject: "Payroll approved ✓", time: "Mon", unread: false },
                    ].map((email) => (
                      <div key={email.subject} className={`flex items-start gap-3 p-3 rounded-xl ${email.unread ? "bg-red-50 border border-red-100" : "bg-gray-50 border border-gray-100"}`}>
                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${email.unread ? "bg-red-500" : "bg-gray-300"}`} />
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-bold truncate ${email.unread ? "text-gray-900" : "text-gray-600"}`}>{email.from}</p>
                          <p className="text-xs text-gray-500 truncate">{email.subject}</p>
                        </div>
                        <span className="text-xs text-gray-400 shrink-0">{email.time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="px-5 pb-5">
                    <button onClick={goContact} className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-sm hover:from-red-700 hover:to-red-800 transition-all">
                      Set Up My Business Email →
                    </button>
                  </div>
                </div>
                <div className="absolute -top-4 -left-6 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 z-20 animate-float">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center"><span className="text-base">🛡️</span></div>
                    <div><p className="text-xs font-bold text-gray-800">99.9% spam blocked</p><p className="text-xs text-gray-400">Enterprise filtering</p></div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 z-20 animate-float-delayed">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center"><span className="text-base">📱</span></div>
                    <div><p className="text-xs font-bold text-gray-800">Works everywhere</p><p className="text-xs text-gray-400">Phone, tablet, desktop</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHAT WE HANDLE ══ */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-red-700">Everything Included</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">We handle everything — you just send emails</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">From technical DNS setup to staff training, we take care of the whole transition.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatWeHandle.map((item) => (
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
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">Email Plans</h2>
            <p className="text-gray-500 text-lg">Simple, transparent pricing for professional email.</p>
            <div className="inline-flex items-center bg-gray-100 rounded-2xl p-1.5 mt-6 gap-1">
              <button onClick={() => setBilling("yearly")} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${billing === "yearly" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                Yearly <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">Save ~17%</span>
              </button>
              <button onClick={() => setBilling("monthly")} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${billing === "monthly" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>Monthly</button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {emailPlans.map((plan) => {
              const s = getCardStyle(plan.theme);
              const price = billing === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;
              const period = billing === "yearly" ? "/ year" : "/ month";
              return (
                <div key={plan.id} className={`relative flex flex-col rounded-3xl border-2 overflow-hidden transition-all duration-300 ${s.wrapper}`}>
                  {plan.badge && <div className="bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-black text-center py-2 tracking-wider uppercase">✦ {plan.badge} ✦</div>}
                  <div className={`p-8 ${s.header}`}>
                    <h3 className={`text-2xl font-black ${s.headerText}`}>{plan.name}</h3>
                    <p className={`text-sm mt-1 mb-5 ${s.headerSub}`}>{plan.tagline}</p>
                    <div>
                      <span className={`text-4xl font-black ${s.priceColor}`}>{formatTZS(price)}</span>
                      <span className={`text-sm ml-2 ${s.headerSub}`}>{period}</span>
                      {billing === "yearly" && <p className={`text-xs mt-1 ${s.headerSub}`}>≈ {formatTZS(Math.round(plan.yearlyPrice / 12))} / month</p>}
                    </div>
                    <div className={`mt-5 grid grid-cols-2 gap-3 pt-5 border-t ${s.divider}`}>
                      {[{ l: "Accounts", v: plan.accounts }, { l: "Storage", v: plan.storage }].map((sp) => (
                        <div key={sp.l} className={`${s.specBg} rounded-xl p-2.5 text-center`}>
                          <p className={`text-xs font-bold leading-tight ${s.specText}`}>{sp.v}</p>
                          <p className={`text-xs ${s.specLabel}`}>{sp.l}</p>
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
                    <button onClick={() => openPayment(plan.name, price, billing)} className={`w-full py-4 rounded-xl text-sm transition-all duration-200 transform hover:-translate-y-0.5 ${s.btn}`}>
                      Get {plan.name}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-center text-gray-400 text-sm mt-8">Setup fee applies for migration from existing email providers. Contact us for a quote. Prices exclude VAT.</p>
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-red-700">How It Works</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Up and running same day</h2>
            <p className="text-gray-500 text-lg">From sign-up to fully configured email in hours, not days.</p>
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
            <p className="text-gray-500">Everything about business email — answered simply.</p>
          </div>
          <div className="space-y-3">
            {[
              { q: "What's the difference between this and a free Gmail account?", a: "A custom domain email (info@yourcompany.co.tz) looks far more professional to clients and partners than a Gmail address. It also provides better security controls, spam filtering, and centralized management for your whole team." },
              { q: "Can I keep my existing emails when switching?", a: "Yes. We migrate all your existing emails, contacts, and calendar data to the new platform. You won't lose a single message or contact during the transition." },
              { q: "Will email work on my phone?", a: "Yes. We configure your email on iOS and Android devices for every team member. We also set up desktop email clients like Outlook or Apple Mail, plus you'll have browser-based webmail as a backup." },
              { q: "How long does setup take?", a: "For most businesses, we complete the DNS configuration within 24 hours and have all staff accounts set up and tested within 1–2 business days. Migration of old emails may take longer depending on volume." },
              { q: "What happens if my emails go to spam?", a: "We configure SPF, DKIM, and DMARC records on your domain which tell email providers worldwide that your emails are legitimate. This dramatically reduces spam classification of your outgoing emails." },
              { q: "Can I add or remove email accounts later?", a: "Yes. Just message us on WhatsApp and we'll add or remove accounts the same day. Adding accounts is charged at a pro-rated monthly/yearly rate." },
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
            <span className="text-sm font-medium text-gray-900">Get set up today</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
            Your business deserves
            <span className="block text-red-600">a professional inbox.</span>
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-xl mx-auto">Stop sending business emails from Gmail. Get set up with professional email today — we&apos;ll handle everything.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={goContact} className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-500/30 hover:shadow-xl transform hover:-translate-y-1">
              Get Started Today
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
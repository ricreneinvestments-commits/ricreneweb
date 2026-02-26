"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MobilePaymentModal } from "@/components/MobilePaymentModal";

// ─── Per-card pricing ─────────────────────────────────────────────────────────
const PRICING_TIERS = [
  { min: 200, max: 300,  ratePerCard: 2000, label: "200 – 300 guests" },
  { min: 301, max: 500,  ratePerCard: 1500, label: "301 – 500 guests" },
  { min: 501, max: 1000, ratePerCard: 1000, label: "501 – 1,000 guests" },
];
const PREMIUM_ADDON_FEE = 50000; // flat fee on top of per-card total
const MIN_GUESTS = 200;
const MAX_STANDARD_GUESTS = 1000;

function calcPrice(guests: number, premium: boolean) {
  const tier = PRICING_TIERS.find((t) => guests >= t.min && guests <= t.max);
  if (!tier) return null;
  const base = guests * tier.ratePerCard;
  const addon = premium ? PREMIUM_ADDON_FEE : 0;
  return { perCard: tier.ratePerCard, base, addon, total: base + addon, tierLabel: tier.label };
}

// ─── What we do ───────────────────────────────────────────────────────────────
const whatWeDo = [
  {
    icon: "🎨",
    title: "Photoshop Card Design",
    desc: "Every card is custom-designed in Photoshop — not a template. We build around your event colours, theme, and details.",
    comingSoon: false, linkText: null, linkHref: null,
  },
  {
    icon: "📸",
    title: "Wedding Photography",
    desc: "Need a beautiful couple photo for your wedding invitation? We do the shoot, edit the best image, and build the card around it.",
    comingSoon: false, linkText: "View photography & video →", linkHref: "/services/video-production",
  },
  {
    icon: "🔢",
    title: "Unique Card Numbers & QR Codes",
    desc: "Every guest gets their own card with a unique number and QR code. No two cards are the same — making entry verification instant and accurate.",
    comingSoon: false, linkText: null, linkHref: null,
  },
  {
    icon: "📲",
    title: "We Deliver to Every Guest",
    desc: "Hand us your guest list and we send each card directly via WhatsApp and SMS — individually addressed to each person. No forwarding needed from you.",
    comingSoon: false, linkText: null, linkHref: null,
  },
  {
    icon: "🔔",
    title: "Automated Reminders",
    desc: "Premium add-on: we send follow-up reminders to guests as the event approaches — reducing no-shows and keeping your RSVP count accurate.",
    comingSoon: false, linkText: null, linkHref: null,
  },
  {
    icon: "✅",
    title: "Guest RSVP Confirmation",
    desc: "Each guest card includes a personal RSVP link. Guests tap it to confirm attendance, choose meal preferences, and leave a note — all tracked in real time on your dashboard.",
    comingSoon: false, linkText: null, linkHref: null,
  },
  {
    icon: "📷",
    title: "QR Entry Scanning",
    desc: "On event day, guests show their card at the door and we scan the unique QR code for instant verification. Fast, professional, and fully paperless.",
    comingSoon: false, linkText: null, linkHref: null,
  },
  {
    icon: "📊",
    title: "Post-Event Report",
    desc: "After the event you receive a clean report — confirmed attendees, no-shows, total headcount, and notes.",
    comingSoon: false, linkText: null, linkHref: null,
  },
  {
    icon: "📡",
    title: "NFC Smart Sharing Cards",
    desc: "Coming soon: tap-to-share digital business cards. One tap on any smartphone opens your profile, contact info, and social links instantly — no app needed.",
    comingSoon: true, linkText: null, linkHref: null,
  },
];

// ─── Process steps ────────────────────────────────────────────────────────────
const processSteps = [
  { step: "01", icon: "🎨", title: "Design & Photoshoot", premiumOnly: false, desc: "We design your invitation card in Photoshop using your event details and branding. Need a great photo? We do the shoot and edit the best image in." },
  { step: "02", icon: "✅", title: "Preview & Approval", premiumOnly: false, desc: "We send you a full preview of the final card before anything goes to guests. You review, request changes, and give the green light. Nothing is sent until you approve." },
  { step: "03", icon: "📲", title: "We Send to Your Guests", premiumOnly: false, desc: "Once approved, we personally send each guest their own card — with their unique card number and QR code — via WhatsApp and SMS." },
  { step: "04", icon: "🔔", title: "Automated Reminders & RSVPs", premiumOnly: true, desc: "We send automated reminder messages to guests as the event date approaches — keeping your headcount accurate and guests informed." },
  { step: "05", icon: "📷", title: "QR Scan at Entry", premiumOnly: false, desc: "On event day, we provide a scanning setup at the door. Each guest's unique QR code is scanned for instant verification. No tickets, no queues." },
  { step: "06", icon: "📊", title: "Post-Event Report", premiumOnly: false, desc: "After the event, we send you a full attendance report — who attended, who didn't, total count, and notes. A clean record for your files." },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatTZS(n: number) {
  return `TZS ${n.toLocaleString("en-TZ")}`;
}

// ─── Pricing Calculator Component ─────────────────────────────────────────────
function PricingCalculator({ onGetQuote }: { onGetQuote: (total: number, label: string) => void }) {
  const [guests, setGuests] = useState(250);
  const [inputValue, setInputValue] = useState("250");
  const [premium, setPremium] = useState(false);

  const isCustom = guests > MAX_STANDARD_GUESTS;
  const isBelowMin = guests < MIN_GUESTS;
  const result = (!isCustom && !isBelowMin) ? calcPrice(guests, premium) : null;

  const activeTierIndex = PRICING_TIERS.findIndex((t) => guests >= t.min && guests <= t.max);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setInputValue(raw);
    const n = parseInt(raw, 10);
    if (!isNaN(n)) setGuests(n);
  };

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = parseInt(e.target.value, 10);
    setGuests(n);
    setInputValue(String(n));
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-gray-200 shadow-xl overflow-hidden">
      {/* Top bar */}
      <div className="bg-gradient-to-br from-gray-900 to-black p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Interactive Calculator</p>
            <h3 className="text-white text-2xl font-black">Get Your Exact Price</h3>
          </div>
          <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-red-900/40">🧮</div>
        </div>

        {/* Guest count input */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <label className="text-gray-300 text-sm font-semibold">Number of guests</label>
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-3 py-1.5">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="w-16 bg-transparent text-white font-black text-lg text-right outline-none"
                inputMode="numeric"
              />
              <span className="text-gray-400 text-sm">guests</span>
            </div>
          </div>
          <input
            type="range"
            min={50}
            max={1200}
            step={10}
            value={Math.min(guests, 1200)}
            onChange={handleSlider}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${((Math.min(guests, 1200) - 50) / (1200 - 50)) * 100}%, #374151 ${((Math.min(guests, 1200) - 50) / (1200 - 50)) * 100}%, #374151 100%)`
            }}
          />
          <div className="flex justify-between mt-1">
            <span className="text-gray-500 text-xs">50</span>
            <span className="text-gray-500 text-xs">1,200+</span>
          </div>
        </div>

        {/* Tier pills */}
        <div className="flex gap-2 flex-wrap">
          {PRICING_TIERS.map((tier, i) => (
            <button
              key={tier.label}
              onClick={() => { const mid = Math.round((tier.min + Math.min(tier.max, 999)) / 2); setGuests(mid); setInputValue(String(mid)); }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                activeTierIndex === i
                  ? "bg-red-600 text-white border-red-500"
                  : "bg-white/10 text-gray-300 border-white/10 hover:bg-white/20"
              }`}
            >
              {tier.label} · TZS {tier.ratePerCard.toLocaleString()}/card
            </button>
          ))}
          <button
            onClick={() => { setGuests(1100); setInputValue("1100"); }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              isCustom ? "bg-amber-500 text-white border-amber-400" : "bg-white/10 text-gray-300 border-white/10 hover:bg-white/20"
            }`}
          >
            1,000+ · Custom quote
          </button>
        </div>
      </div>

      {/* Bottom: result */}
      <div className="p-6 md:p-8">
        {/* Premium toggle */}
        <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-2xl mb-6">
          <div>
            <p className="font-bold text-gray-900 text-sm">Premium add-on</p>
            <p className="text-xs text-gray-500 mt-0.5">Automated reminders + meal prefs + live dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 font-semibold">+{formatTZS(PREMIUM_ADDON_FEE)} flat</span>
            <button
              onClick={() => setPremium(!premium)}
              className={`relative w-12 h-6 rounded-full transition-all duration-300 ${premium ? "bg-red-600" : "bg-gray-300"}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${premium ? "left-6" : "left-0.5"}`} />
            </button>
          </div>
        </div>

        {/* Price result */}
        {isBelowMin && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-700">
            <span className="text-lg shrink-0">⚠️</span>
            <div>
              <p className="font-bold">Minimum 200 guests</p>
              <p className="text-red-500 text-xs mt-0.5">We don&apos;t take events below 200 guests. Set the slider to 200 or above.</p>
            </div>
          </div>
        )}

        {isCustom && (
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-800 mb-6">
            <span className="text-lg shrink-0">📋</span>
            <div>
              <p className="font-bold">Custom quote needed</p>
              <p className="text-amber-600 text-xs mt-0.5">Events over 1,000 guests are priced individually. Get in touch and we&apos;ll come back within 24 hours.</p>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-3 mb-6">
            {/* Breakdown rows */}
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm text-gray-500">Guest count</span>
              <span className="font-bold text-gray-900">{guests.toLocaleString()} guests</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm text-gray-500">Rate (your tier)</span>
              <div className="text-right">
                <span className="font-bold text-gray-900">{formatTZS(result.perCard)} / card</span>
                <p className="text-xs text-gray-400">{result.tierLabel}</p>
              </div>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm text-gray-500">Base total</span>
              <span className="font-bold text-gray-900">{formatTZS(result.base)}</span>
            </div>
            {premium && (
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-sm text-amber-700 font-medium">Premium add-on</span>
                <span className="font-bold text-amber-700">+ {formatTZS(result.addon)}</span>
              </div>
            )}
            {/* Grand total */}
            <div className="flex justify-between items-center pt-2">
              <span className="font-black text-gray-900">Total estimate</span>
              <div className="text-right">
                <span className="text-3xl font-black text-red-600">{formatTZS(result.total)}</span>
                <p className="text-xs text-gray-400 mt-0.5">one-time · all inclusive</p>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        {result && (
          <button
            onClick={() => onGetQuote(result.total, `Event Invitations – ${guests} guests${premium ? " (Premium)" : ""}`)}
            className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-500/20 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            Get Started for {formatTZS(result.total)}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        )}
        {isCustom && (
          <button
            onClick={() => onGetQuote(0, `Event Invitations – ${guests}+ guests (custom quote)`)}
            className="w-full py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl font-bold hover:from-gray-900 hover:to-black transition-all shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            Request Custom Quote
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        )}
        <p className="text-xs text-gray-400 text-center mt-3">
          Includes design · WhatsApp & SMS delivery · QR scanning · post-event report
        </p>
      </div>
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function DigitalSolutionsPage() {
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
            <span className="text-gray-800 font-medium">Digital Event Cards</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <div className={`mb-6 transition-all duration-700 delay-100 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-red-200/50 shadow-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-900">Digital Event Invitation Cards</span>
                </div>
              </div>

              <h1 className={`transition-all duration-700 delay-200 text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-[1.08] tracking-tight ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                Invitations that
                <span className="relative block mt-1">
                  <span className="text-red-600">Actually Arrive.</span>
                  <span className="absolute -bottom-1 left-0 w-2/3 h-3 bg-red-100/70 rounded-sm -z-0" />
                </span>
                <span className="block text-gray-500 text-3xl md:text-4xl lg:text-5xl font-semibold mt-2">We do the sending.</span>
              </h1>

              <p className={`transition-all duration-700 delay-300 text-xl text-gray-600 mb-10 leading-relaxed max-w-xl ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                We design custom invitation cards, assign every guest a unique QR code, personally send each card via WhatsApp and SMS, scan guests in at the door on event day, and send you a full attendance report after.
              </p>

              <div className={`transition-all duration-700 delay-[400ms] flex flex-col sm:flex-row gap-4 mb-12 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <a
                  href="#pricing"
                  onClick={(e) => { e.preventDefault(); document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-500/30 hover:shadow-xl transform hover:-translate-y-1"
                >
                  Calculate My Price
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
                <button onClick={goContact} className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold border-2 border-red-200 hover:border-red-300 hover:bg-red-50 hover:shadow-lg transition-all">
                  Request a Sample
                </button>
              </div>

              <div className={`transition-all duration-700 delay-500 flex flex-wrap gap-3 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                {[
                  { icon: "🎨", text: "Photoshop design" },
                  { icon: "🔢", text: "Unique QR per guest" },
                  { icon: "📲", text: "We send to guests" },
                  { icon: "📷", text: "QR entry scanning" },
                  { icon: "📊", text: "Post-event report" },
                ].map((pill) => (
                  <div key={pill.text} className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/70 backdrop-blur-sm border border-gray-200/80 rounded-full text-sm text-gray-700 shadow-sm">
                    <span>{pill.icon}</span><span className="font-medium">{pill.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero card mockup */}
            <div className={`lg:col-span-5 transition-all duration-1000 delay-300 ${heroVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-full h-full bg-red-100 rounded-3xl border border-red-200 opacity-40" />
                <div className="absolute -top-2 -right-2 w-full h-full bg-red-50 rounded-3xl border border-red-100 opacity-60" />
                <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
                  <div className="bg-gradient-to-br from-red-600 to-red-700 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-red-200 text-xs font-bold uppercase tracking-widest">You&apos;re Invited</p>
                        <h3 className="text-white text-xl font-black mt-0.5">Zawadi & Ibrahim</h3>
                        <p className="text-red-100 text-sm">Wedding Celebration</p>
                        <p className="text-white font-semibold text-sm mt-1.5">Sat, 15 Feb 2025 · 6:00 PM</p>
                        <p className="text-red-200 text-xs">Serena Hotel, Dar es Salaam</p>
                      </div>
                      <div className="bg-white rounded-xl p-2 shrink-0">
                        <div className="w-12 h-12 grid grid-cols-3 gap-0.5">
                          {Array.from({ length: 9 }).map((_, i) => (
                            <div key={i} className={`rounded-sm ${[0, 1, 3, 5, 7, 8].includes(i) ? "bg-gray-800" : "bg-gray-100"}`} />
                          ))}
                        </div>
                        <p className="text-gray-400 text-[8px] text-center mt-1 font-bold">#INV-0042</p>
                      </div>
                    </div>
                    <div className="bg-white/15 rounded-xl px-3 py-2 text-center">
                      <p className="text-red-100 text-xs">Delivered via <strong className="text-white">WhatsApp & SMS</strong> · Scan at entry</p>
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Delivery status</p>
                      <span className="text-xs font-bold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full">Live</span>
                    </div>
                    {[
                      { name: "Amina Hassan", via: "WhatsApp", status: "Delivered ✓", ok: true },
                      { name: "David Mbeki", via: "SMS", status: "Delivered ✓", ok: true },
                      { name: "Fatuma Ally", via: "WhatsApp", status: "Sending…", ok: false },
                    ].map((guest) => (
                      <div key={guest.name} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{guest.name}</p>
                          <p className="text-xs text-gray-400">via {guest.via}</p>
                        </div>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${guest.ok ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-600"}`}>{guest.status}</span>
                      </div>
                    ))}
                  </div>
                  <div className="px-5 pb-5">
                    <a href="#pricing" onClick={(e) => { e.preventDefault(); document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }); }} className="block w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-sm text-center hover:from-red-700 hover:to-red-800 transition-all">
                      Calculate My Price →
                    </a>
                  </div>
                </div>
                <div className="absolute -top-4 -left-6 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 z-20 animate-float">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center"><span className="text-base">📲</span></div>
                    <div><p className="text-xs font-bold text-gray-800">Sent by us</p><p className="text-xs text-gray-400">WhatsApp + SMS</p></div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 z-20 animate-float-delayed">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center"><span className="text-base">🔢</span></div>
                    <div><p className="text-xs font-bold text-gray-800">Unique QR codes</p><p className="text-xs text-gray-400">Every guest, every card</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHAT WE DO ══ */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-red-700">What We Do</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Everything handled, start to finish</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">From designing the card to scanning guests in at the door — we take care of the whole process.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whatWeDo.map((item) => (
              <div key={item.title} className={`group bg-white rounded-2xl p-6 border transition-all duration-300 ${item.comingSoon ? "border-dashed border-gray-200 opacity-70" : "border-gray-200 hover:border-red-200 hover:shadow-lg"}`}>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{item.icon}</span>
                  {item.comingSoon && <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">Soon</span>}
                </div>
                <h3 className={`font-bold text-gray-900 mb-2 text-base ${!item.comingSoon ? "group-hover:text-red-600" : ""} transition-colors`}>{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                {item.linkText && item.linkHref && (
                  <Link href={item.linkHref} className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-red-600 hover:text-red-700 transition-colors">
                    {item.linkText}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                )}
                {!item.comingSoon && <div className="mt-4 h-1 w-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full group-hover:w-14 transition-all duration-300" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-red-700">How It Works</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">From brief to event day — we run the whole thing</h2>
            <p className="text-gray-500 text-lg">You approve at step 2, then we handle everything else.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {processSteps.map((step) => (
              <div key={step.step} className="group relative flex gap-5 bg-gray-50 border border-gray-200 hover:border-red-200 hover:shadow-md rounded-2xl p-5 transition-all duration-300">
                <div className="shrink-0 w-12 h-12 bg-white border-2 border-red-100 rounded-xl flex items-center justify-center text-2xl shadow-sm group-hover:border-red-300 transition-colors">
                  {step.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black text-red-400 uppercase tracking-widest">Step {step.step}</span>
                    {step.premiumOnly && <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">Premium add-on</span>}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRICING CALCULATOR ══ */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-red-700">Pricing</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Priced per card — the more guests, the less per card</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Type in your guest count and get an instant total. Everything is included in the per-card rate.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
            {/* Calculator */}
            <PricingCalculator onGetQuote={(total, label) => openPayment(label, total)} />

            {/* What's included + tier table */}
            <div className="space-y-6">
              {/* Tier table */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="font-black text-gray-900">Volume pricing tiers</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Minimum 200 guests per event</p>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Guests</th>
                      <th className="text-right px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Per card</th>
                      <th className="text-right px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Example total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { range: "200 – 300", rate: 2000, example: "300 × 2,000 = TZS 600,000" },
                      { range: "301 – 500", rate: 1500, example: "500 × 1,500 = TZS 750,000" },
                      { range: "501 – 1,000", rate: 1000, example: "800 × 1,000 = TZS 800,000" },
                      { range: "1,000+", rate: null, example: "Custom quote" },
                    ].map((row, i) => (
                      <tr key={row.range} className={`border-t border-gray-100 ${i === 3 ? "bg-amber-50" : "hover:bg-gray-50"} transition-colors`}>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{row.range}</td>
                        <td className="px-6 py-4 text-sm font-black text-right text-red-600">
                          {row.rate ? `TZS ${row.rate.toLocaleString()}` : "—"}
                        </td>
                        <td className="px-6 py-4 text-xs text-right text-gray-400">{row.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* What's included */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-black text-gray-900 mb-4">What every card price includes</h3>
                <ul className="space-y-3">
                  {[
                    "Custom Photoshop card design",
                    "Preview sent to you for approval",
                    "Unique card number per guest",
                    "Unique QR code per guest",
                    "We send cards via WhatsApp",
                    "We send cards via SMS",
                    "QR scan check-in system on event day",
                    "Guest RSVP confirmation page",
                    "Post-event attendance report",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                      <svg className="w-5 h-5 shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Premium add-on callout */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl shrink-0">⭐</span>
                  <div>
                    <p className="font-black text-gray-900">Premium Add-on</p>
                    <p className="text-xs text-amber-700 font-bold">+TZS 50,000 flat fee on any tier</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {["Automated reminder messages to guests", "Meal preference collection", "Real-time attendance dashboard"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-amber-900">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Photography upsell */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-start gap-4">
                <span className="text-3xl shrink-0">📸</span>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-sm mb-1">Need wedding photography for your card?</p>
                  <p className="text-gray-500 text-xs">We offer pre-wedding photoshoots to get the perfect image. Add it to your event or book standalone.</p>
                </div>
                <Link href="/services/video-production" className="shrink-0 text-red-600 font-semibold text-xs hover:text-red-700 transition-colors whitespace-nowrap">
                  See photography →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">Common Questions</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "Why is there a minimum of 200 guests?", a: "The design, setup, and QR system have a fixed time cost regardless of event size. Below 200 guests, the per-card rate would need to be very high to cover our work, which wouldn't be fair value for you. 200 guests is the point where per-card pricing becomes genuinely good value for both sides." },
              { q: "Do you personally send the cards to all my guests?", a: "Yes. You give us your guest list (names and phone numbers) and we individually send each guest their own card via WhatsApp and SMS. You don't need to forward or do anything yourself." },
              { q: "How is each guest's card different from others?", a: "Every card has a unique card number (e.g. #INV-0042) and a unique QR code tied to that specific guest. This is what we scan at the door for verification — no duplicate entries, no confusion." },
              { q: "Do you send a preview before sending to guests?", a: "Always. Once the card design is ready, we send you a full preview for review and approval. Nothing goes to any guest until you confirm the design is correct." },
              { q: "What does the QR scan at the door look like?", a: "On event day, guests simply show their card (on their phone) at the entrance. We scan the unique QR code which immediately confirms their identity and marks them as arrived. It's fast and fully paperless." },
              { q: "What's in the post-event report?", a: "After the event we send you a clean report showing total invited, total attended, total absent, and a per-guest breakdown. Useful for corporate events and any occasion where headcount matters." },
              { q: "How does the RSVP confirmation work for guests?", a: "Each card includes a personal RSVP link unique to that guest. They tap it, land on a simple confirmation page, and can confirm attendance, select a meal preference, and leave a short note. You see all responses in real time on your dashboard — no manual follow-up needed." },
              { q: "What if a guest loses their card message?", a: "No problem. Just let us know and we'll resend any guest's card to their WhatsApp or SMS instantly." },
              { q: "Can the invitations be in Swahili?", a: "Absolutely. We design in English, Swahili, or both — just tell us your preference during the briefing." },
            ].map((faq, i) => (
              <details key={i} className="group bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden hover:border-red-200 transition-colors">
                <summary className="flex justify-between items-center px-6 py-5 cursor-pointer font-semibold text-gray-900 hover:text-red-700 transition-colors list-none group-open:text-red-700">
                  {faq.q}
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 group-open:text-red-500 transition-all shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
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
            <span className="text-sm font-medium text-gray-900">Ready to impress your guests?</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
            Tell us about your event.
            <span className="block text-red-600">We handle the rest.</span>
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-xl mx-auto">
            Share your guest list, event details, and design ideas — we&apos;ll have cards in your guests&apos; hands within days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={goContact}
              className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg shadow-red-500/30 hover:shadow-xl transform hover:-translate-y-1"
            >
              Start My Invitations
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
        input[type="range"]::-webkit-slider-thumb { appearance: none; width: 20px; height: 20px; border-radius: 50%; background: #dc2626; cursor: pointer; box-shadow: 0 2px 6px rgba(220,38,38,0.4); }
        input[type="range"]::-moz-range-thumb { width: 20px; height: 20px; border-radius: 50%; background: #dc2626; cursor: pointer; border: none; box-shadow: 0 2px 6px rgba(220,38,38,0.4); }
      `}</style>
    </div>
  );
}
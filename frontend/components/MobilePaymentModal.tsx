"use client";

import { useState } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────
type Step = "info" | "sent";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  amount: number;
  billingPeriod?: "monthly" | "yearly" | "once";
  serviceName?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatTZS(n: number) {
  return `TZS ${n.toLocaleString("en-TZ")}`;
}

const WHATSAPP_NUMBER = "255746014407"; // No + or spaces

function buildWhatsAppMessage(planName: string, amount: number, billingPeriod: string) {
  const period = billingPeriod === "once" ? "one-time" : `/ ${billingPeriod}`;
  return encodeURIComponent(
    `Hi Ricrene! 👋\n\nI'm interested in the *${planName}* plan (${formatTZS(amount)} ${period}).\n\nCould you please get back to me with payment instructions and next steps?\n\nThank you!`
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────
export function MobilePaymentModal({
  isOpen,
  onClose,
  planName,
  amount,
  billingPeriod = "monthly",
  serviceName = "Ricrene Investment Ltd",
}: PaymentModalProps) {
  const [step, setStep] = useState<Step>("info");

  const recordInquiry = async (method: 'whatsapp' | 'email') => {
  try {
    await fetch('http://localhost:8000/api/payment-inquiry/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan_name: planName,
        service_name: serviceName,
        amount: amount,
        billing_period: billingPeriod,
        contact_method: method,
      }),
    })
  } catch {
    // Fail silently — don't block the user flow
  }
}

  const handleWhatsApp = async () => {
    await recordInquiry('whatsapp')   // ← add this
    const msg = buildWhatsAppMessage(planName, amount, billingPeriod)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank")
    setStep("sent")
}

  const handleEmail = async () => {
    const subject = encodeURIComponent(`Interested in ${planName} Plan`);
    await recordInquiry('email')
    const body = encodeURIComponent(
      `Hi Ricrene,\n\nI'm interested in the ${planName} plan (${formatTZS(amount)} ${billingPeriod === "once" ? "one-time" : `/ ${billingPeriod}`}).\n\nPlease get back to me with payment instructions and next steps.\n\nThank you!`
    );
    window.open(`mailto:info@ricrene.co.tz?subject=${subject}&body=${body}`, "_blank");
    setStep("sent");
  };

  const handleContactPage = () => {
    onClose();
    // Small delay so modal closes before scroll
    setTimeout(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else window.location.href = "/#contact";
    }, 150);
  };

  const handleClose = () => {
    setStep("info");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-br from-red-600 to-red-700 p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-red-200 text-xs font-bold uppercase tracking-widest mb-1">{serviceName}</p>
              <h2 className="text-white text-xl font-black">{planName}</h2>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Amount */}
          <div className="mt-4 bg-white/10 rounded-2xl px-4 py-3 flex justify-between items-center">
            <span className="text-red-100 text-sm">Plan price</span>
            <div className="text-right">
              <span className="text-white font-black text-xl">{formatTZS(amount)}</span>
              <span className="text-red-200 text-xs ml-2">
                {billingPeriod === "once" ? "one-time" : `/ ${billingPeriod}`}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">

          {/* ── Step 1: Info ── */}
          {step === "info" && (
            <div>
              {/* Notice */}
              <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl mb-6">
                <span className="text-2xl shrink-0">🛠️</span>
                <div>
                  <p className="font-bold text-amber-900 text-sm mb-0.5">Online payments coming soon</p>
                  <p className="text-amber-700 text-xs leading-relaxed">
                    We&apos;re setting up M-Pesa and card payments. For now, reach out directly — we&apos;ll confirm your plan and send payment instructions within a few hours.
                  </p>
                </div>
              </div>

              {/* Plan summary */}
              <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden mb-6">
                <div className="px-4 py-2 border-b border-gray-200 bg-white">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">You&apos;re interested in</p>
                </div>
                {[
                  { label: "Plan", value: planName },
                  { label: "Price", value: `${formatTZS(amount)} ${billingPeriod === "once" ? "(one-time)" : `/ ${billingPeriod}`}` },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center px-4 py-3 border-b last:border-0 border-gray-100">
                    <span className="text-sm text-gray-500">{row.label}</span>
                    <span className="text-sm font-bold text-gray-900">{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Contact options */}
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Get in touch via</p>

              <div className="space-y-3">
                {/* WhatsApp — primary */}
                <button
                  onClick={handleWhatsApp}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-green-50 border-2 border-green-200 hover:border-green-400 hover:bg-green-100 transition-all group"
                >
                  <div className="w-11 h-11 bg-green-500 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-md shadow-green-200">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-bold text-green-800">Message us on WhatsApp</p>
                    <p className="text-xs text-green-600">Fastest — we&apos;ll reply within hours</p>
                  </div>
                  <svg className="w-4 h-4 text-green-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>

                {/* Email */}
                <button
                  onClick={handleEmail}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all group"
                >
                  <div className="w-11 h-11 bg-red-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-md shadow-red-100">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-bold text-gray-800">Send us an email</p>
                    <p className="text-xs text-gray-500">info@ricrene.co.tz</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>

                {/* Contact form */}
                <button
                  onClick={handleContactPage}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all group"
                >
                  <div className="w-11 h-11 bg-gray-700 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-md shadow-gray-100">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-bold text-gray-800">Use our contact form</p>
                    <p className="text-xs text-gray-500">Fill in your details and we&apos;ll call you</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>

              <p className="text-center text-xs text-gray-400 mt-5">
                No commitment needed — just let us know you&apos;re interested 👍
              </p>
            </div>
          )}

          {/* ── Step 2: Sent confirmation ── */}
          {step === "sent" && (
            <div className="text-center py-4">
              <div className="w-20 h-20 bg-green-50 border-4 border-green-200 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h3 className="font-black text-gray-900 text-2xl mb-2">We&apos;re on it! 🎉</h3>
              <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">
                Thanks for your interest in the <strong className="text-gray-800">{planName}</strong> plan.
                We&apos;ll get back to you with payment details and next steps as soon as possible.
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-left mb-6 space-y-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">What happens next</p>
                {[
                  { icon: "💬", text: "We confirm your plan and send payment instructions" },
                  { icon: "💳", text: "You pay via mobile money or bank transfer" },
                  { icon: "🚀", text: "We start working on your project right away" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <span className="text-lg shrink-0">{item.icon}</span>
                    <p className="text-sm text-gray-600">{item.text}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={handleClose}
                className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold hover:from-red-700 hover:to-red-800 transition-all"
              >
                Back to website
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
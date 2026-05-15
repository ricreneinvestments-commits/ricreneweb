"use client";

import { useState } from "react";
import Link from "next/link";

const BRAND      = "#44B6E8";
const BRAND_DARK = "#2A9FD4";
const BRAND_PALE = "#EBF8FD";

export default function ForgotPasswordPage() {
  const [email,   setEmail]   = useState("");
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`${API}/api/auth/forgot-password/`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email }),
      });
    } catch {
      // always show success — security best practice (don't leak email existence)
    } finally {
      setSent(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">

      {/* ── Left panel (matches login/signup style) ── */}
      <div className="hidden lg:flex lg:w-[45%] bg-gray-950 relative overflow-hidden flex-col justify-between p-14">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full"
            style={{ background: `radial-gradient(circle, ${BRAND}25 0%, transparent 70%)` }}
          />
          <div
            className="absolute bottom-0 left-0 w-72 h-72 rounded-full"
            style={{ background: `radial-gradient(circle, ${BRAND}15 0%, transparent 70%)` }}
          />
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="inline-block h-[120px] w-48">
            <img
              src="/images/Ricrene logo transparent.png"
              alt="Ricrene"
              className="h-full w-full object-contain object-left brightness-0 invert"
            />
          </Link>
        </div>

        {/* Copy */}
        <div className="relative z-10">
          <div className="w-10 h-1 mb-7 rounded-full" style={{ backgroundColor: BRAND }} />
          <h2 className="text-[2.4rem] font-bold text-white leading-[1.15] mb-5 tracking-tight">
            Forgot your<br />password?
          </h2>
          <p className="text-gray-400 text-base leading-relaxed max-w-xs">
            No problem. Enter your email and we&apos;ll send you a secure reset link valid for 1 hour.
          </p>
          <div className="mt-10 space-y-4">
            {[
              { icon: "🔒", text: "Secure one-time reset link" },
              { icon: "⏱️", text: "Link expires in 1 hour"     },
              { icon: "📧", text: "Sent to your registered email" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-sm shrink-0">
                  {item.icon}
                </div>
                <span className="text-gray-300 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-gray-600 text-xs">
          © {new Date().getFullYear()} Ricrene Investment Ltd · Dar es Salaam, Tanzania
        </p>
      </div>

      {/* ── Right form panel ── */}
      <div className="w-full lg:w-[55%] flex items-center justify-center px-6 py-12 lg:px-20">
        <div className="w-full max-w-[400px]">

          {/* Mobile logo */}
          <div className="lg:hidden mb-10">
            <Link href="/" className="inline-block h-[80px] w-40">
              <img
                src="/images/Ricrene logo transparent.png"
                alt="Ricrene"
                className="h-full w-full object-contain object-left"
              />
            </Link>
          </div>

          {sent ? (
            /* ── Success state ── */
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: BRAND_PALE }}
              >
                <svg className="w-8 h-8" style={{ color: BRAND }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Check your inbox</h1>
              <p className="text-gray-500 text-sm leading-relaxed mb-2">
                If an account exists for
              </p>
              <p className="font-semibold text-gray-900 text-sm mb-5">{email}</p>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                you&apos;ll receive a password reset link shortly. The link is valid for <strong>1 hour</strong>.
              </p>

              <Link
                href="/login"
                className="block w-full text-white py-3.5 rounded-xl font-semibold transition-all text-sm text-center"
                style={{ background: `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})` }}
              >
                Back to sign in
              </Link>

              <button
                onClick={() => { setSent(false); setEmail(""); }}
                className="mt-4 text-sm font-medium hover:underline transition-colors"
                style={{ color: BRAND }}
              >
                Try a different email
              </button>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-400 mb-2">Didn&apos;t receive it? Check your spam folder or</p>
                <a
                  href="https://wa.me/255674114407"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600 hover:text-green-700"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Contact us on WhatsApp
                </a>
              </div>
            </div>

          ) : (
            /* ── Form state ── */
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Forgot your password?</h1>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                  Enter your account email and we&apos;ll send you a reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white transition-all text-sm"
                    onFocus={e => { e.target.style.borderColor = BRAND; e.target.style.boxShadow = `0 0 0 3px ${BRAND}20`; }}
                    onBlur={e => { e.target.style.borderColor = ""; e.target.style.boxShadow = ""; }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white py-3.5 rounded-xl font-semibold transition-all disabled:opacity-60 text-sm"
                  style={{
                    background:  loading ? "#9CA3AF" : `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})`,
                    boxShadow:   loading ? "none" : `0 4px 14px ${BRAND}35`,
                  }}
                >
                  {loading ? "Sending..." : "Send reset link"}
                </button>
              </form>

              <div className="mt-8 text-center">
                <Link
                  href="/login"
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors inline-flex items-center gap-1"
                >
                  ← Back to sign in
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
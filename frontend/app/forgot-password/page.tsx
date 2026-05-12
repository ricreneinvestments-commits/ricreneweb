"use client";

import { useState } from "react";
import Link from "next/link";

const BRAND = "#44B6E8";
const BRAND_DARK = "#2A9FD4";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(`${API}/api/auth/forgot-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // always show success (security best practice)
    } finally {
      setSent(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[400px]">

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">

          {sent ? (
            /* SUCCESS STATE */
            <div className="text-center">

              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: `${BRAND}20` }}
              >
                <svg
                  className="w-7 h-7"
                  style={{ color: BRAND }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <h1 className="text-xl font-bold text-gray-900 mb-2">
                Check your email
              </h1>

              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                If an account exists for <strong>{email}</strong>, you will receive reset instructions shortly.
              </p>

              <p className="text-xs text-gray-400 mb-6">
                Didn&apos;t receive it? Check spam or contact us on{" "}
                <a
                  href="https://wa.me/255674114407"
                  className="text-green-600 font-medium hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </p>

              <Link
                href="/login"
                className="block w-full text-white py-3 rounded-xl font-semibold transition-all text-sm text-center"
                style={{
                  background: `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})`,
                }}
              >
                Back to sign in
              </Link>

              {/* 🔵 NEW BUTTON ADDED HERE */}
              <button
                onClick={() => {
                  setSent(false);
                  setEmail("");
                }}
                className="mt-4 text-sm font-medium"
                style={{ color: BRAND }}
              >
                Try another email
              </button>

            </div>
          ) : (
            /* FORM STATE */
            <>
              <div className="mb-7">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Forgot your password?
                </h1>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                  Enter your email and we’ll send you a reset link.
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:bg-white transition-all text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white py-3.5 rounded-xl font-semibold transition-all disabled:opacity-60 text-sm shadow-lg"
                  style={{
                    background: loading
                      ? "#9CA3AF"
                      : `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})`,
                  }}
                >
                  {loading ? "Sending..." : "Send reset link"}
                </button>
              </form>

              <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
                <p className="text-xs text-gray-500 mb-2">
                  Having trouble? Contact us directly
                </p>

                <a
                  href="https://wa.me/255674114407"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium"
                  style={{ color: "#25D366" }}
                >
                  Chat on WhatsApp
                </a>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link href="/login" className="text-xs text-gray-400 hover:text-gray-600">
            ← Back to sign in
          </Link>
        </div>

      </div>
    </div>
  );
}
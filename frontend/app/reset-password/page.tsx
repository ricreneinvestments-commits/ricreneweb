"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

const BRAND      = "#44B6E8";
const BRAND_DARK = "#2A9FD4";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function ResetForm() {
  const params = useSearchParams();
  const router = useRouter();

  // Backend only sends ?token=... — no uid ever — that was the bug
  const token = params.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [success,  setSuccess]  = useState(false);

  // No token → invalid link
  if (!token) {
    return (
      <div className="text-center">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Invalid reset link</h2>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          This link is missing required information. Please request a new one.
        </p>
        <Link
          href="/forgot-password"
          className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl font-semibold text-sm"
          style={{ backgroundColor: BRAND }}
        >
          Request a new link
        </Link>
      </div>
    );
  }

  // Success
  if (success) {
    return (
      <div className="text-center">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Password updated!</h2>
        <p className="text-gray-500 text-sm mb-6">Redirecting you to sign in...</p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl font-semibold text-sm"
          style={{ backgroundColor: BRAND }}
        >
          Go to sign in
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirm)   { setError("Passwords don't match."); return; }
    if (password.length < 8)    { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/reset-password/`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        // Backend expects { token, password } — no uid field
        body: JSON.stringify({ token, password }),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/login"), 3000);
      } else {
        const data = await res.json();
        // Backend returns { error: "..." } not { detail: "..." }
        setError(data.error || "Invalid or expired link. Please request a new one.");
      }
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const strength =
    password.length >= 12 ? 4
    : password.length >= 10 ? 3
    : password.length >= 8  ? 2
    : password.length > 0   ? 1 : 0;
  const strengthLabel = ["", "Weak", "Good", "Strong", "Very strong"][strength];
  const strengthColor = ["", "bg-red-400", "bg-yellow-400", "bg-green-500", "bg-green-600"][strength];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Set a new password</h1>
        <p className="text-gray-500 text-sm mt-2">Must be at least 8 characters long.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* New password */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">New password</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white transition-all text-sm"
              onFocus={e => { e.target.style.borderColor = BRAND; e.target.style.boxShadow = `0 0 0 3px ${BRAND}20`; }}
              onBlur={e  => { e.target.style.borderColor = ""; e.target.style.boxShadow = ""; }}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {showPass
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  : <>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </>
                }
              </svg>
            </button>
          </div>
          {password && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex gap-1 flex-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i < strength ? strengthColor : "bg-gray-200"}`} />
                ))}
              </div>
              <span className="text-xs text-gray-400 w-16">{strengthLabel}</span>
            </div>
          )}
        </div>

        {/* Confirm */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm password</label>
          <input
            type={showPass ? "text" : "password"}
            required
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            placeholder="••••••••"
            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:bg-white transition-all placeholder-gray-400 ${
              confirm && confirm !== password
                ? "border-red-300 bg-red-50 text-red-900"
                : "border-gray-200 bg-gray-50 text-gray-900"
            }`}
            onFocus={e => {
              if (!confirm || confirm === password) {
                e.target.style.borderColor = BRAND;
                e.target.style.boxShadow = `0 0 0 3px ${BRAND}20`;
              }
            }}
            onBlur={e => { e.target.style.borderColor = ""; e.target.style.boxShadow = ""; }}
          />
          {confirm && confirm !== password && (
            <p className="text-red-500 text-xs mt-1.5">Passwords do not match</p>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-red-700 text-sm">{error}</p>
              {(error.toLowerCase().includes("expired") || error.toLowerCase().includes("invalid")) && (
                <Link href="/forgot-password" className="text-xs font-medium underline mt-1 block" style={{ color: BRAND }}>
                  Request a new reset link →
                </Link>
              )}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || (!!confirm && confirm !== password)}
          className="w-full text-white py-3.5 rounded-xl font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
          style={{ backgroundColor: BRAND, boxShadow: `0 4px 14px ${BRAND}35` }}
          onMouseEnter={e => !loading && (e.currentTarget.style.backgroundColor = BRAND_DARK)}
          onMouseLeave={e => !loading && (e.currentTarget.style.backgroundColor = BRAND)}
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Updating password...
            </>
          ) : "Update password"}
        </button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-white flex overflow-hidden">

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[45%] bg-gray-950 relative overflow-hidden flex-col justify-between p-14">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full"
            style={{ background: `radial-gradient(circle, ${BRAND}25 0%, transparent 70%)` }} />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full"
            style={{ background: `radial-gradient(circle, ${BRAND}15 0%, transparent 70%)` }} />
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
            <defs>
              <pattern id="grid3" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid3)" />
          </svg>
        </div>

        <div className="relative z-10">
          <Link href="/" className="inline-block h-[120px] w-48">
            <img src="/images/Ricrene logo transparent.png" alt="Ricrene"
              className="h-full w-full object-contain object-left brightness-0 invert" />
          </Link>
        </div>

        <div className="relative z-10">
          <div className="w-10 h-1 mb-7 rounded-full" style={{ backgroundColor: BRAND }} />
          <h2 className="text-[2.4rem] font-bold text-white leading-[1.15] mb-5 tracking-tight">
            Create a strong<br />new password
          </h2>
          <p className="text-gray-400 text-base leading-relaxed max-w-xs">
            Choose something secure and memorable. At least 10 characters with a mix of letters and numbers works best.
          </p>
          <div className="mt-10 space-y-4">
            {[
              { icon: "✅", text: "At least 8 characters required"        },
              { icon: "🔢", text: "Mix letters and numbers for strength"  },
              { icon: "🚫", text: "Avoid reusing previous passwords"      },
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

      {/* Right panel */}
      <div className="w-full lg:w-[55%] flex items-center justify-center px-6 py-12 lg:px-20">
        <div className="w-full max-w-[400px]">
          <div className="lg:hidden mb-10">
            <Link href="/" className="inline-block h-[80px] w-40">
              <img src="/images/Ricrene logo transparent.png" alt="Ricrene"
                className="h-full w-full object-contain object-left" />
            </Link>
          </div>

          <Suspense fallback={
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse" />
              ))}
            </div>
          }>
            <ResetForm />
          </Suspense>

          <div className="mt-8 text-center">
            <Link href="/login" className="text-xs text-gray-400 hover:text-gray-600 transition-colors inline-flex items-center gap-1">
              ← Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
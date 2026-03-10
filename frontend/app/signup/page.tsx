"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

export default function SignupPage() {
  const { register } = useAuth();
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", phone: "", password: "", confirm: "" });
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    try {
      await register({ first_name: form.first_name, last_name: form.last_name, email: form.email, phone: form.phone, password: form.password });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally { setLoading(false); }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all text-sm";

  const strength = form.password.length >= 12 ? 4 : form.password.length >= 10 ? 3 : form.password.length >= 8 ? 2 : form.password.length > 0 ? 1 : 0;
  const strengthLabel = ["", "Weak", "Good", "Strong", "Very strong"][strength];
  const strengthColor = ["", "bg-red-400", "bg-yellow-400", "bg-green-500", "bg-green-600"][strength];

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">

      {/* ── Left dark panel ── */}
      <div className="hidden lg:flex lg:w-[45%] bg-gray-950 relative overflow-hidden flex-col justify-between p-14">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(220,38,38,0.15) 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(220,38,38,0.1) 0%, transparent 70%)" }} />
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
            <defs>
              <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid2)" />
          </svg>
        </div>

        {/* Logo — same height as navbar */}
        <div className="relative z-10">
          <Link href="/" className="inline-block h-[120px] w-48">
            <img src="/images/Ricrene logo transparent.png" alt="Ricrene"
              className="h-full w-full object-contain object-left brightness-0 invert" />
          </Link>
        </div>

        <div className="relative z-10">
          <div className="w-10 h-1 bg-red-600 mb-7 rounded-full" />
          <h2 className="text-[2.4rem] font-bold text-white leading-[1.15] mb-5 tracking-tight">
            Your business<br />deserves better
          </h2>
          <p className="text-gray-400 text-base leading-relaxed max-w-xs">
            Create your free client account and get instant access to project tracking, invoices, and direct support.
          </p>
          <div className="mt-10 space-y-4">
            {[
              { icon: "🆓", text: "Free to create — no credit card needed" },
              { icon: "📁", text: "Access your projects anytime" },
              { icon: "📨", text: "Direct communication with our team" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-sm shrink-0">{item.icon}</div>
                <span className="text-gray-300 text-sm">{item.text}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              ))}
            </div>
            <p className="text-gray-300 text-sm leading-relaxed italic">&quot;The client portal made it so easy to track our website project from start to finish.&quot;</p>
            <p className="text-gray-500 text-xs mt-2">— Business client, Dar es Salaam</p>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-gray-600 text-xs">© {new Date().getFullYear()} Ricrene Investment Ltd · Dar es Salaam, Tanzania</p>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="w-full lg:w-[55%] flex items-center justify-center px-6 py-12 lg:px-20 overflow-y-auto">
        <div className="w-full max-w-[420px] py-4">

          {/* Mobile logo */}
          <div className="lg:hidden mb-10 flex justify-start">
            <Link href="/" className="inline-block h-[80px] w-40">
              <img src="/images/Ricrene logo transparent.png" alt="Ricrene"
                className="h-full w-full object-contain object-left" />
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Create your free account</h1>
            <p className="text-gray-500 text-sm mt-2">
              Already have an account?{" "}
              <Link href="/login" className="text-red-600 hover:text-red-700 font-semibold">Sign in</Link>
            </p>
          </div>

          {error && (
            <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3.5">
              <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">First name <span className="text-red-500">*</span></label>
                <input type="text" required value={form.first_name} onChange={(e) => update("first_name", e.target.value)} placeholder="John" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Last name <span className="text-red-500">*</span></label>
                <input type="text" required value={form.last_name} onChange={(e) => update("last_name", e.target.value)} placeholder="Doe" className={inputClass} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email address <span className="text-red-500">*</span></label>
              <input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@company.com" className={inputClass} />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone <span className="text-gray-400 font-normal text-xs">(optional)</span></label>
              <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+255 700 000 000" className={inputClass} />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} required value={form.password}
                  onChange={(e) => update("password", e.target.value)} placeholder="Min. 8 characters"
                  className={inputClass + " pr-12"} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {showPass
                      ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      : <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>
                    }
                  </svg>
                </button>
              </div>
              {form.password && (
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

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm password <span className="text-red-500">*</span></label>
              <input type={showPass ? "text" : "password"} required value={form.confirm}
                onChange={(e) => update("confirm", e.target.value)} placeholder="Repeat your password"
                className={inputClass + (form.confirm && form.confirm !== form.password ? " !border-red-300 !bg-red-50" : "")} />
              {form.confirm && form.confirm !== form.password && (
                <p className="text-red-500 text-xs mt-1.5">Passwords do not match</p>
              )}
            </div>

            <p className="text-xs text-gray-400 leading-relaxed pt-1">
              By creating an account you agree to our{" "}
              <Link href="/privacy" className="text-gray-600 underline hover:text-red-600">Privacy Policy</Link>.
            </p>

            <button type="submit" disabled={loading}
              className="w-full bg-red-600 text-white py-3.5 rounded-xl font-semibold hover:bg-red-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm shadow-lg shadow-red-600/20">
              {loading ? (
                <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Creating account...</>
              ) : "Create free account →"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors inline-flex items-center gap-1">← Back to website</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
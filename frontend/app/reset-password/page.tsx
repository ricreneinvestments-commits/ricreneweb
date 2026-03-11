"use client";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function ResetForm() {
  const params   = useSearchParams();
  const router   = useRouter();
  const token    = params.get("token") || "";
  const [password, setPassword]   = useState("");
  const [confirm, setConfirm]     = useState("");
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [success, setSuccess]     = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setError("Passwords don't match."); return; }
    if (password.length < 8)  { setError("Password must be at least 8 characters."); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch(`${API}/api/auth/reset-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      if (res.ok) { setSuccess(true); setTimeout(() => router.push("/login"), 3000); }
      else { const d = await res.json(); setError(d.detail || "Invalid or expired link."); }
    } catch { setError("Something went wrong. Please try again."); }
    finally { setLoading(false); }
  };

  if (!token) return (
    <div className="text-center">
      <p className="text-red-600 text-sm mb-4">Invalid reset link.</p>
      <Link href="/forgot-password" className="text-red-600 font-medium hover:underline">Request a new one →</Link>
    </div>
  );

  if (success) return (
    <div className="text-center">
      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
        <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Password updated!</h2>
      <p className="text-gray-500 text-sm">Redirecting you to sign in...</p>
    </div>
  );

  return (
    <>
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Set a new password</h1>
        <p className="text-gray-500 text-sm mt-2">Must be at least 8 characters.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">New password</label>
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm password</label>
          <input type="password" required value={confirm} onChange={e => setConfirm(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all" />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button type="submit" disabled={loading}
          className="w-full bg-red-600 text-white py-3.5 rounded-xl font-semibold hover:bg-red-700 disabled:opacity-60 transition-all text-sm shadow-lg shadow-red-600/20">
          {loading ? "Updating..." : "Update password"}
        </button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[400px]">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <Suspense fallback={<div className="h-40 animate-pulse bg-gray-100 rounded-xl" />}>
            <ResetForm />
          </Suspense>
        </div>
        <div className="mt-6 text-center">
          <Link href="/login" className="text-xs text-gray-400 hover:text-gray-600 inline-flex items-center gap-1">← Back to sign in</Link>
        </div>
      </div>
    </div>
  );
}
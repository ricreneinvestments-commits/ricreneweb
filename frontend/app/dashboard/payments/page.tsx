"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface Payment {
  id: number;
  plan_name: string;
  amount: number;
  billing_period: string;
  status: string;
  created_at: string;
}

const statusStyle: Record<string, { pill: string; dot: string }> = {
  pending:   { pill: "bg-amber-50 text-amber-700 border border-amber-200",    dot: "bg-amber-400" },
  confirmed: { pill: "bg-blue-50 text-blue-600 border border-blue-200",       dot: "bg-blue-400" },
  paid:      { pill: "bg-emerald-50 text-emerald-700 border border-emerald-200", dot: "bg-emerald-500" },
  cancelled: { pill: "bg-gray-100 text-gray-400 border border-gray-200",      dot: "bg-gray-300" },
};

const fmt     = (n: number) => `TZS ${n.toLocaleString()}`;
const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

function authHeaders() {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : "";
  return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
}

// ── Payment method data ───────────────────────────────────────────────────────

const mobileMethods = [
  { name: "M-Pesa",       initials: "MP",  bg: "bg-green-100",  text: "text-green-800",  ring: "ring-green-200" },
  { name: "Airtel Money", initials: "AM",  bg: "bg-red-100",    text: "text-red-800",    ring: "ring-red-200" },
  { name: "Mix by Yas",   initials: "MX",  bg: "bg-violet-100", text: "text-violet-800", ring: "ring-violet-200" },
  { name: "Halo Pesa",    initials: "HP",  bg: "bg-orange-100", text: "text-orange-800", ring: "ring-orange-200" },
  { name: "Selcom",       initials: "SC",  bg: "bg-sky-100",    text: "text-sky-800",    ring: "ring-sky-200" },
];

const bankMethods = [
  { name: "Local Bank\nTransfer",        initials: "LB", bg: "bg-slate-100", text: "text-slate-700", ring: "ring-slate-200" },
  { name: "International\nWire Transfer", initials: "IW", bg: "bg-slate-100", text: "text-slate-700", ring: "ring-slate-200" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function PaymentsPage() {
  const { user } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    if (!user) return;
    fetch(`${API}/api/payments/`, { headers: authHeaders() })
      .then(r => r.ok ? r.json() : [])
      .then(data => setPayments(Array.isArray(data) ? data : (data.results ?? [])))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  const totalPaid    = payments.filter(p => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  const totalPending = payments.filter(p => p.status === "pending").reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Payments</h1>
        <p className="text-sm text-gray-500 mt-1">Your payment history and available methods</p>
      </div>

      {/* ── Summary cards ── */}
      {!loading && payments.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Total",   value: String(payments.length), sub: "transactions",       accent: "text-gray-900" },
            { label: "Paid",    value: fmt(totalPaid),          sub: "confirmed payments", accent: "text-emerald-600" },
            { label: "Pending", value: fmt(totalPending),       sub: "awaiting payment",   accent: "text-amber-600" },
          ].map(c => (
            <div key={c.label} className="bg-white rounded-2xl border border-gray-200 p-4">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">{c.label}</p>
              <p className={`text-lg font-bold leading-tight ${c.accent}`}>{c.value}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{c.sub}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── Payment history ── */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Payment History</h2>
          <span className="text-xs text-gray-400">{payments.length} record{payments.length !== 1 ? "s" : ""}</span>
        </div>

        {loading ? (
          <div className="divide-y divide-gray-100">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4">
                <div className="w-9 h-9 rounded-full bg-gray-100 animate-pulse shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2" />
                  <div className="h-2.5 bg-gray-100 rounded animate-pulse w-1/4" />
                </div>
                <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse" />
              </div>
            ))}
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center py-14">
            <div className="w-14 h-14 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-gray-400">No payments yet</p>
            <p className="text-xs text-gray-300 mt-1">Records will appear here once payments are made</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {payments.map(pay => {
              const s = statusStyle[pay.status] ?? statusStyle.cancelled;
              return (
                <div key={pay.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                  {/* Status dot avatar */}
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${s.pill.includes("emerald") ? "bg-emerald-50" : s.pill.includes("amber") ? "bg-amber-50" : s.pill.includes("blue") ? "bg-blue-50" : "bg-gray-50"}`}>
                    <div className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{pay.plan_name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-400">{fmtDate(pay.created_at)}</span>
                      {pay.billing_period && (
                        <span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full capitalize">
                          {pay.billing_period}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <p className="text-sm font-bold text-gray-900">{fmt(pay.amount)}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.pill}`}>
                      {pay.status.charAt(0).toUpperCase() + pay.status.slice(1)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Payment methods ── */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-900">Payment Methods</h2>
            <p className="text-xs text-gray-400 mt-0.5">Online payments launching soon</p>
          </div>
          <span className="text-[11px] font-bold bg-amber-50 text-amber-600 border border-amber-200 px-2.5 py-1 rounded-full uppercase tracking-wide">
            Coming Soon
          </span>
        </div>

        <div className="p-5 space-y-6">

          {/* Mobile Money circles */}
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Mobile Money</p>
            <div className="flex flex-wrap gap-4">
              {mobileMethods.map(m => (
                <div key={m.name} className="flex flex-col items-center gap-2 w-16">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ring-2 ${m.bg} ${m.ring} opacity-60`}>
                    <span className={`text-sm font-black ${m.text}`}>{m.initials}</span>
                  </div>
                  <span className="text-[10px] font-medium text-gray-500 text-center leading-tight">{m.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Bank Transfer circles */}
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Bank Transfer</p>
            <div className="flex flex-wrap gap-4">
              {bankMethods.map(m => (
                <div key={m.name} className="flex flex-col items-center gap-2 w-20">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ring-2 ${m.bg} ${m.ring} opacity-60`}>
                    <span className={`text-sm font-black ${m.text}`}>{m.initials}</span>
                  </div>
                  <span className="text-[10px] font-medium text-gray-500 text-center leading-tight whitespace-pre-line">{m.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Manual payment CTA */}
          <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-4">
            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800">Need to pay now?</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                Contact us directly — we&apos;ll send you mobile money or bank details manually.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <a
                  href="https://wa.me/255674114407"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
                <a
                  href="mailto:ricreneinvestments@gmail.com"
                  className="inline-flex items-center gap-1.5 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email us
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
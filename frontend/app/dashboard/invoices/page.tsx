"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface Invoice { id: number; invoice_number: string; amount: number; status: string; issued_date: string; due_date: string | null; project_name: string; }

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-600", sent: "bg-blue-50 text-blue-600",
  paid: "bg-emerald-50 text-emerald-700", overdue: "bg-red-50 text-red-600",
  cancelled: "bg-gray-100 text-gray-400",
};
const statusLabels: Record<string, string> = {
  draft: "Draft", sent: "Sent", paid: "Paid", overdue: "Overdue", cancelled: "Cancelled",
};

const fmt = (n: number) => `TZS ${n.toLocaleString()}`;
const fmtDate = (d: string | null) => d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—";

function authHeaders() {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : "";
  return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
}

export default function InvoicesPage() {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetch(`${API}/api/invoices/`, { headers: authHeaders() })
      .then(r => r.ok ? r.json() : [])
      .then(data => setInvoices(Array.isArray(data) ? data : data.results ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  const handlePrint = (inv: Invoice) => {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html><head><title>Invoice ${inv.invoice_number}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Georgia, serif; padding: 60px; max-width: 680px; margin: 0 auto; color: #111; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 48px; }
        .company { font-size: 22px; font-weight: bold; color: #dc2626; }
        .meta { text-align: right; font-size: 13px; color: #555; line-height: 1.8; }
        .divider { border: none; border-top: 2px solid #dc2626; margin: 32px 0; }
        .invoice-title { font-size: 28px; font-weight: bold; color: #111; margin-bottom: 8px; }
        .invoice-sub { font-size: 14px; color: #777; margin-bottom: 32px; }
        table { width: 100%; border-collapse: collapse; margin-top: 24px; }
        th { text-align: left; padding: 12px 16px; background: #f9f9f9; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #777; border-bottom: 1px solid #e5e7eb; }
        td { padding: 14px 16px; font-size: 14px; border-bottom: 1px solid #f0f0f0; }
        .total-row td { font-weight: bold; font-size: 16px; background: #f9f9f9; color: #111; }
        .footer { margin-top: 48px; font-size: 12px; color: #999; text-align: center; }
        .status-badge { display: inline-block; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; background: #d1fae5; color: #065f46; }
      </style>
      </head><body>
      <div class="header">
        <div>
          <div class="company">Ricrene Investment Ltd</div>
          <div style="font-size:13px;color:#777;margin-top:4px">Samora Tower, Dar es Salaam, Tanzania</div>
          <div style="font-size:13px;color:#777">ricreneinvestments@gmail.com</div>
        </div>
        <div class="meta">
          <strong>INVOICE</strong><br/>
          #${inv.invoice_number}<br/>
          Issued: ${fmtDate(inv.issued_date)}<br/>
          Due: ${fmtDate(inv.due_date)}<br/>
          <span class="status-badge">${statusLabels[inv.status] ?? inv.status}</span>
        </div>
      </div>
      <hr class="divider"/>
      <div class="invoice-title">Invoice #${inv.invoice_number}</div>
      <div class="invoice-sub">For: ${inv.project_name}</div>
      <table>
        <thead><tr><th>Description</th><th style="text-align:right">Amount</th></tr></thead>
        <tbody>
          <tr><td>${inv.project_name}</td><td style="text-align:right">${fmt(inv.amount)}</td></tr>
          <tr class="total-row"><td>Total</td><td style="text-align:right">${fmt(inv.amount)}</td></tr>
        </tbody>
      </table>
      <div class="footer">Thank you for your business. · Ricrene Investment Ltd · Dar es Salaam, Tanzania</div>
      <script>window.print();</script>
      </body></html>
    `);
    win.document.close();
  };

  const unpaid = invoices.filter(i => ["sent", "overdue"].includes(i.status));
  const unpaidTotal = unpaid.reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Invoices</h1>
        <p className="text-sm text-gray-500 mt-1">View and download your invoices</p>
      </div>

      {/* Summary cards */}
      {!loading && invoices.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { label: "Total invoices", value: invoices.length, color: "text-gray-900" },
            { label: "Unpaid", value: unpaid.length, color: "text-red-600" },
            { label: "Amount due", value: fmt(unpaidTotal), color: "text-red-600" },
          ].map(c => (
            <div key={c.label} className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500 font-medium mb-1">{c.label}</p>
              <p className={`text-xl font-bold ${c.color}`}>{c.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="h-32 animate-pulse bg-gray-50" />
        ) : invoices.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-12 h-12 text-gray-200 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <p className="text-gray-400 text-sm font-medium">No invoices yet</p>
            <p className="text-gray-300 text-xs mt-1">Invoices will appear here once a project is billed</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Invoice #</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 hidden sm:table-cell">Project</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 hidden md:table-cell">Issued</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 hidden md:table-cell">Due</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500">Amount</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500">Status</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invoices.map(inv => (
                <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 font-semibold text-gray-900">{inv.invoice_number}</td>
                  <td className="px-5 py-4 text-gray-500 hidden sm:table-cell max-w-[180px] truncate">{inv.project_name}</td>
                  <td className="px-5 py-4 text-gray-500 hidden md:table-cell">{fmtDate(inv.issued_date)}</td>
                  <td className="px-5 py-4 text-gray-500 hidden md:table-cell">{fmtDate(inv.due_date)}</td>
                  <td className="px-5 py-4 text-right font-semibold text-gray-900">{fmt(inv.amount)}</td>
                  <td className="px-5 py-4 text-right">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[inv.status] ?? "bg-gray-100 text-gray-600"}`}>
                      {statusLabels[inv.status] ?? inv.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button onClick={() => handlePrint(inv)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-700 hover:underline">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
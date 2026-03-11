"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ── Types — matched exactly to models.py ─────────────────────────────────────

interface Project {
  id: number;
  title: string;          // model: title (not name)
  description: string;
  status: string;
  start_date: string | null;
  due_date: string | null; // model: due_date (not end_date)
}

interface Invoice {
  id: number;
  invoice_no: string;     // model: invoice_no (not invoice_number)
  amount: number;
  status: string;
  issued_date: string;
  due_date: string | null;
  description: string;    // model has description (not project_name)
}

interface Payment {
  id: number;
  plan_name: string;
  amount: number;
  billing_period: string;
  status: string;
  created_at: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const statusColors: Record<string, string> = {
  inquiry:     "bg-gray-100 text-gray-600",
  proposal:    "bg-blue-50 text-blue-600",
  active:      "bg-green-50 text-green-700",
  in_progress: "bg-green-50 text-green-700",
  review:      "bg-yellow-50 text-yellow-700",
  completed:   "bg-emerald-50 text-emerald-700",
  on_hold:     "bg-orange-50 text-orange-600",
  draft:       "bg-gray-100 text-gray-600",
  sent:        "bg-blue-50 text-blue-600",
  paid:        "bg-emerald-50 text-emerald-700",
  overdue:     "bg-red-50 text-red-600",
  cancelled:   "bg-gray-100 text-gray-400",
  pending:     "bg-yellow-50 text-yellow-700",
  confirmed:   "bg-blue-50 text-blue-600",
};

const statusLabels: Record<string, string> = {
  inquiry:     "Inquiry",
  proposal:    "Proposal Sent",
  active:      "Active",
  in_progress: "In Progress",
  review:      "In Review",
  completed:   "Completed",
  on_hold:     "On Hold",
  draft:       "Draft",
  sent:        "Sent",
  paid:        "Paid",
  overdue:     "Overdue",
  cancelled:   "Cancelled",
  pending:     "Pending",
  confirmed:   "Confirmed",
};

const fmt     = (n: number) => `TZS ${Number(n).toLocaleString()}`;
const fmtDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—";

function authHeaders() {
  const token = localStorage.getItem("access_token");
  return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-bold text-gray-900 mb-4">{children}</h2>;
}

function EmptyState({ message, cta, href }: { message: string; cta?: string; href?: string }) {
  return (
    <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
      <p className="text-gray-400 text-sm mb-3">{message}</p>
      {cta && href && (
        <Link href={href} className="text-sm text-red-600 font-medium hover:underline">{cta} →</Link>
      )}
    </div>
  );
}

function Badge({ s }: { s: string }) {
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[s] ?? "bg-gray-100 text-gray-600"}`}>
      {statusLabels[s] ?? s}
    </span>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  const [activePanel, setActivePanel] = useState<"project" | "message" | null>(null);

  // Project request form
  const [projName,      setProjName]      = useState("");
  const [projService,   setProjService]   = useState("");
  const [projDesc,      setProjDesc]      = useState("");
  const [projBudget,    setProjBudget]    = useState("");
  const [projSubmitting,setProjSubmitting]= useState(false);
  const [projMsg,       setProjMsg]       = useState("");

  // Message form
  const [msgText,       setMsgText]       = useState("");
  const [msgSubmitting, setMsgSubmitting] = useState(false);
  const [msgStatus,     setMsgStatus]     = useState("");

  // Profile edit
  const [editProfile,  setEditProfile]  = useState(false);
  const [firstName,    setFirstName]    = useState("");
  const [lastName,     setLastName]     = useState("");
  const [phone,        setPhone]        = useState("");
  const [company,      setCompany]      = useState("");
  const [profileSaving,setProfileSaving]= useState(false);
  const [profileMsg,   setProfileMsg]   = useState("");

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setPhone(user.phone || "");
      setCompany(user.company_name || "");
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const h = authHeaders();
    Promise.all([
      fetch(`${API}/api/projects/`, { headers: h }).then(r => r.ok ? r.json() : []),
      fetch(`${API}/api/invoices/`, { headers: h }).then(r => r.ok ? r.json() : []),
      fetch(`${API}/api/payments/`, { headers: h }).then(r => r.ok ? r.json() : []),
    ]).then(([p, i, pay]) => {
      setProjects(Array.isArray(p) ? p : p.results ?? []);
      setInvoices(Array.isArray(i) ? i : i.results ?? []);
      setPayments(Array.isArray(pay) ? pay : pay.results ?? []);
    }).catch(() => {}).finally(() => setDataLoading(false));
  }, [user]);

  const handleProjectRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setProjSubmitting(true); setProjMsg("");
    try {
      const res = await fetch(`${API}/api/projects/request/`, {
        method: "POST",
        headers: authHeaders(),
        // Backend expects "title" not "name"
        body: JSON.stringify({
          title: projName,
          description: `Service: ${projService}\nBudget: ${projBudget}\n\n${projDesc}`,
        }),
      });
      if (res.ok) {
        const newProject = await res.json();
        setProjects(prev => [newProject, ...prev]);
        setProjMsg("Project request submitted! We'll be in touch soon.");
        setProjName(""); setProjService(""); setProjDesc(""); setProjBudget("");
        setTimeout(() => { setProjMsg(""); setActivePanel(null); }, 3000);
      } else {
        setProjMsg("Failed to submit. Please try again.");
      }
    } catch {
      setProjMsg("Failed to submit. Please try again.");
    } finally {
      setProjSubmitting(false);
    }
  };

  const handleMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsgSubmitting(true); setMsgStatus("");
    try {
      const res = await fetch(`${API}/api/messages/`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ body: msgText }), // model field is "body"
      });
      if (res.ok) {
        setMsgStatus("Message sent! We'll get back to you soon.");
        setMsgText("");
        setTimeout(() => { setMsgStatus(""); setActivePanel(null); }, 3000);
      } else {
        setMsgStatus("Failed to send. Please try again.");
      }
    } catch {
      setMsgStatus("Failed to send. Please try again.");
    } finally {
      setMsgSubmitting(false);
    }
  };

  const handleSaveProfile = async () => {
    setProfileSaving(true); setProfileMsg("");
    try {
      const res = await fetch(`${API}/api/auth/me/`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({ first_name: firstName, last_name: lastName, phone, company_name: company }),
      });
      if (res.ok) { setProfileMsg("Saved!"); setEditProfile(false); }
      else setProfileMsg("Failed to save.");
    } catch {
      setProfileMsg("Failed to save.");
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePrintInvoice = (inv: Invoice) => {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html><head><title>Invoice ${inv.invoice_no}</title>
      <style>
        body{font-family:sans-serif;padding:40px;max-width:600px;margin:0 auto}
        h1{color:#dc2626}
        table{width:100%;border-collapse:collapse;margin-top:20px}
        td,th{padding:10px;border:1px solid #e5e7eb;text-align:left}
        .total{font-weight:bold;font-size:1.1em}
      </style>
      </head><body>
      <h1>Ricrene Investment Ltd</h1>
      <p>Samora Tower, Dar es Salaam, Tanzania</p>
      <hr/>
      <h2>Invoice #${inv.invoice_no}</h2>
      <table>
        <tr><th>Description</th><th>Amount</th></tr>
        <tr><td>${inv.description || "Services rendered"}</td><td>${fmt(inv.amount)}</td></tr>
        <tr><td class="total">Total</td><td class="total">${fmt(inv.amount)}</td></tr>
      </table>
      <p style="margin-top:20px"><strong>Issued:</strong> ${fmtDate(inv.issued_date)}</p>
      <p><strong>Due:</strong> ${fmtDate(inv.due_date)}</p>
      <p><strong>Status:</strong> ${statusLabels[inv.status] ?? inv.status}</p>
      <script>window.print();</script>
      </body></html>
    `);
    win.document.close();
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Use correct field names from model
  const activeProjects = projects.filter(p => p.status === "in_progress" || p.status === "active").length;
  const unpaidInvoices = invoices.filter(i => ["sent", "overdue"].includes(i.status));
  const unpaidTotal    = unpaidInvoices.reduce((s, i) => s + Number(i.amount), 0);
  const pendingPay     = payments.filter(p => p.status === "pending").length;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-medium">Client Portal</p>
            <h1 className="text-base font-bold text-gray-900">Welcome, {user.first_name} 👋</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActivePanel(activePanel === "message" ? null : "message")}
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Message Us
            </button>
            <button onClick={logout} className="text-sm text-gray-400 hover:text-red-600 transition-colors">
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Message Panel */}
      {activePanel === "message" && (
        <div className="max-w-5xl mx-auto px-6 pt-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Send us a message</h3>
            <form onSubmit={handleMessage} className="space-y-4">
              <textarea
                value={msgText}
                onChange={e => setMsgText(e.target.value)}
                required
                rows={4}
                placeholder="How can we help you?"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              />
              {msgStatus && (
                <p className={`text-sm ${msgStatus.includes("sent") ? "text-green-600" : "text-red-600"}`}>
                  {msgStatus}
                </p>
              )}
              <div className="flex gap-3">
                <button type="submit" disabled={msgSubmitting}
                  className="px-5 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-60 transition-colors">
                  {msgSubmitting ? "Sending..." : "Send Message"}
                </button>
                <button type="button" onClick={() => setActivePanel(null)}
                  className="px-5 py-2 text-sm text-gray-500 hover:text-gray-700">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-10">

        {/* Overview */}
        <section>
          <SectionTitle>Overview</SectionTitle>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Active Projects",  value: activeProjects,        color: "text-green-600" },
              { label: "Unpaid Invoices",  value: unpaidInvoices.length, color: "text-red-600"   },
              { label: "Amount Due",       value: fmt(unpaidTotal),      color: "text-red-600"   },
              { label: "Pending Payments", value: pendingPay,            color: "text-yellow-600"},
            ].map(card => (
              <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-xs text-gray-500 font-medium mb-2">{card.label}</p>
                <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <SectionTitle>My Projects</SectionTitle>
            <button
              onClick={() => setActivePanel(activePanel === "project" ? null : "project")}
              className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Request Project
            </button>
          </div>

          {/* Project Request Form */}
          {activePanel === "project" && (
            <div className="bg-white rounded-xl border border-red-100 p-6 mb-4">
              <h3 className="font-bold text-gray-900 mb-4">New Project Request</h3>
              <form onSubmit={handleProjectRequest} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Project name *</label>
                    <input value={projName} onChange={e => setProjName(e.target.value)} required
                      placeholder="e.g. Company Website"
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Service needed *</label>
                    <select value={projService} onChange={e => setProjService(e.target.value)} required
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white">
                      <option value="">Select a service...</option>
                      <option value="web-development">Website Design & Development</option>
                      <option value="website-maintenance">Website Maintenance & Support</option>
                      <option value="domain-hosting">Domain & Hosting</option>
                      <option value="custom-systems">Business Automation & Systems</option>
                      <option value="data-analysis">Data Analytics & Insights</option>
                      <option value="corporate-email">Business Email Solutions</option>
                      <option value="seo-digital-marketing">SEO & Digital Marketing</option>
                      <option value="digital-solutions">Digital Invitations & Cards</option>
                      <option value="video-production">Video Production & Streaming</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Description *</label>
                  <textarea value={projDesc} onChange={e => setProjDesc(e.target.value)} required rows={3}
                    placeholder="Describe what you need..."
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Budget (optional)</label>
                  <input value={projBudget} onChange={e => setProjBudget(e.target.value)}
                    placeholder="e.g. TZS 500,000 or Not sure"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
                </div>
                {projMsg && (
                  <p className={`text-sm ${projMsg.includes("submitted") ? "text-green-600" : "text-red-600"}`}>
                    {projMsg}
                  </p>
                )}
                <div className="flex gap-3">
                  <button type="submit" disabled={projSubmitting}
                    className="px-5 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-60 transition-colors">
                    {projSubmitting ? "Submitting..." : "Submit Request"}
                  </button>
                  <button type="button" onClick={() => setActivePanel(null)}
                    className="px-5 py-2 text-sm text-gray-500 hover:text-gray-700">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {dataLoading ? (
            <div className="h-24 bg-white rounded-xl border border-gray-200 animate-pulse" />
          ) : projects.length === 0 ? (
            <EmptyState message="No projects yet. Click 'Request Project' to get started." />
          ) : (
            <div className="space-y-3">
              {projects.map(p => (
                <div key={p.id} className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900">{p.title}</p>
                      {p.description && (
                        <p className="text-sm text-gray-400 mt-1 line-clamp-2">{p.description}</p>
                      )}
                      <div className="flex gap-4 mt-1.5 text-xs text-gray-400">
                        {p.start_date && <span>Start: {fmtDate(p.start_date)}</span>}
                        {p.due_date   && <span>Due: {fmtDate(p.due_date)}</span>}
                      </div>
                    </div>
                    <div className="shrink-0">
                      <Badge s={p.status} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Invoices */}
        <section>
          <SectionTitle>Invoices</SectionTitle>
          {dataLoading ? (
            <div className="h-24 bg-white rounded-xl border border-gray-200 animate-pulse" />
          ) : invoices.length === 0 ? (
            <EmptyState message="No invoices yet." />
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Invoice</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 hidden sm:table-cell">Description</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 hidden md:table-cell">Due</th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500">Amount</th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500">Status</th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500">PDF</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {invoices.map(inv => (
                    <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-gray-900">{inv.invoice_no}</td>
                      <td className="px-5 py-3.5 text-gray-500 hidden sm:table-cell truncate max-w-[200px]">
                        {inv.description || "—"}
                      </td>
                      <td className="px-5 py-3.5 text-gray-500 hidden md:table-cell">{fmtDate(inv.due_date)}</td>
                      <td className="px-5 py-3.5 text-right font-medium text-gray-900">{fmt(inv.amount)}</td>
                      <td className="px-5 py-3.5 text-right"><Badge s={inv.status} /></td>
                      <td className="px-5 py-3.5 text-right">
                        <button onClick={() => handlePrintInvoice(inv)}
                          className="text-red-600 hover:text-red-700 text-xs font-medium hover:underline">
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Payments */}
        <section>
          <SectionTitle>Payments</SectionTitle>
          {dataLoading ? (
            <div className="h-24 bg-white rounded-xl border border-gray-200 animate-pulse" />
          ) : payments.length === 0 ? (
            <EmptyState message="No payment records yet." cta="View pricing" href="/#pricing" />
          ) : (
            <div className="space-y-3">
              {payments.map(pay => (
                <div key={pay.id} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-gray-900">{pay.plan_name}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{fmtDate(pay.created_at)}</p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <p className="text-sm font-medium text-gray-700 hidden sm:block">
                      {fmt(pay.amount)}
                      <span className="text-gray-400 font-normal ml-1">/ {pay.billing_period}</span>
                    </p>
                    <Badge s={pay.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Profile */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <SectionTitle>Profile Settings</SectionTitle>
            {!editProfile && (
              <button onClick={() => setEditProfile(true)}
                className="text-sm text-red-600 font-medium hover:text-red-700 transition-colors">
                Edit
              </button>
            )}
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            {editProfile ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">First name</label>
                    <input value={firstName} onChange={e => setFirstName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Last name</label>
                    <input value={lastName} onChange={e => setLastName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Phone</label>
                  <input value={phone} onChange={e => setPhone(e.target.value)}
                    placeholder="+255 700 000 000"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Company name</label>
                  <input value={company} onChange={e => setCompany(e.target.value)}
                    placeholder="Optional"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
                </div>
                {profileMsg && (
                  <p className={`text-sm ${profileMsg === "Saved!" ? "text-green-600" : "text-red-600"}`}>
                    {profileMsg}
                  </p>
                )}
                <div className="flex gap-3">
                  <button onClick={handleSaveProfile} disabled={profileSaving}
                    className="px-5 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-60 transition-colors">
                    {profileSaving ? "Saving..." : "Save changes"}
                  </button>
                  <button onClick={() => { setEditProfile(false); setProfileMsg(""); }}
                    className="px-5 py-2 text-sm text-gray-500 hover:text-gray-700">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
                {[
                  { label: "Full name",    value: `${user.first_name} ${user.last_name}` },
                  { label: "Email",        value: user.email },
                  { label: "Phone",        value: user.phone || "—" },
                  { label: "Company",      value: user.company_name || "—" },
                  { label: "Account type", value: user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Client" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-xs font-semibold text-gray-400 mb-1">{label}</p>
                    <p className="text-sm text-gray-900">{value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
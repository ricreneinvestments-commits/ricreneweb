"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function authHeaders() {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : "";
  return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving]   = useState(false);
  const [msg, setMsg]         = useState("");
  const [msgType, setMsgType] = useState<"success" | "error">("success");

  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [phone,     setPhone]     = useState("");
  const [company,   setCompany]   = useState("");

  // Password change
  const [showPwForm,   setShowPwForm]   = useState(false);
  const [currentPw,    setCurrentPw]    = useState("");
  const [newPw,        setNewPw]        = useState("");
  const [confirmPw,    setConfirmPw]    = useState("");
  const [pwSaving,     setPwSaving]     = useState(false);
  const [pwMsg,        setPwMsg]        = useState("");
  const [pwMsgType,    setPwMsgType]    = useState<"success" | "error">("success");

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name ?? "");
      setLastName(user.last_name ?? "");
      setPhone(user.phone ?? "");
      setCompany(user.company_name ?? "");
    }
  }, [user]);

  const handleSave = async () => {
    setSaving(true); setMsg("");
    try {
      const res = await fetch(`${API}/api/auth/me/`, {
        method: "PATCH", headers: authHeaders(),
        body: JSON.stringify({ first_name: firstName, last_name: lastName, phone, company_name: company }),
      });
      if (res.ok) { setMsg("Profile updated successfully!"); setMsgType("success"); setEditing(false); }
      else { setMsg("Failed to save. Please try again."); setMsgType("error"); }
    } catch { setMsg("Failed to save. Please try again."); setMsgType("error"); }
    finally { setSaving(false); }
  };

  const handlePasswordChange = async () => {
    setPwMsg("");
    if (newPw !== confirmPw) { setPwMsg("New passwords do not match."); setPwMsgType("error"); return; }
    if (newPw.length < 8) { setPwMsg("Password must be at least 8 characters."); setPwMsgType("error"); return; }
    setPwSaving(true);
    try {
      const res = await fetch(`${API}/api/auth/change-password/`, {
        method: "POST", headers: authHeaders(),
        body: JSON.stringify({ current_password: currentPw, new_password: newPw }),
      });
      if (res.ok) {
        setPwMsg("Password changed successfully!"); setPwMsgType("success");
        setCurrentPw(""); setNewPw(""); setConfirmPw("");
        setTimeout(() => { setPwMsg(""); setShowPwForm(false); }, 3000);
      } else {
        const data = await res.json().catch(() => ({}));
        setPwMsg(data?.detail || "Failed to change password. Check your current password."); setPwMsgType("error");
      }
    } catch { setPwMsg("Failed to change password."); setPwMsgType("error"); }
    finally { setPwSaving(false); }
  };

  if (!user) return null;

  const initials = `${user.first_name?.[0] ?? ""}${user.last_name?.[0] ?? ""}`.toUpperCase();
  const inputClass = "w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white";

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account information</p>
      </div>

      {/* Avatar + name card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white flex items-center justify-center text-2xl font-bold shrink-0">
          {initials}
        </div>
        <div>
          <p className="font-bold text-gray-900 text-lg">{user.first_name} {user.last_name}</p>
          <p className="text-gray-500 text-sm">{user.email}</p>
          <span className="inline-block mt-1.5 text-xs font-semibold px-2.5 py-1 bg-red-50 text-red-600 rounded-full capitalize">{user.role}</span>
        </div>
      </div>

      {/* Profile info */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Personal Information</h2>
          {!editing && (
            <button onClick={() => setEditing(true)}
              className="text-sm text-red-600 font-medium hover:text-red-700 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50">
              Edit
            </button>
          )}
        </div>

        <div className="p-6">
          {msg && (
            <div className={`mb-5 px-4 py-3 rounded-lg text-sm font-medium ${msgType === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
              {msg}
            </div>
          )}

          {editing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">First name</label>
                  <input value={firstName} onChange={e => setFirstName(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Last name</label>
                  <input value={lastName} onChange={e => setLastName(e.target.value)} className={inputClass} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Email address</label>
                <input value={user.email} disabled className={inputClass + " opacity-50 cursor-not-allowed"} />
                <p className="text-xs text-gray-400 mt-1">Email cannot be changed. Contact support if needed.</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Phone number</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+255 700 000 000" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Company name</label>
                <input value={company} onChange={e => setCompany(e.target.value)} placeholder="Optional" className={inputClass} />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={handleSave} disabled={saving}
                  className="px-5 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-60 transition-colors">
                  {saving ? "Saving..." : "Save changes"}
                </button>
                <button onClick={() => { setEditing(false); setMsg(""); }}
                  className="px-5 py-2.5 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: "First name",    value: user.first_name },
                { label: "Last name",     value: user.last_name },
                { label: "Email address", value: user.email },
                { label: "Phone number",  value: user.phone || "—" },
                { label: "Company",       value: user.company_name || "—" },
                { label: "Account type",  value: user.role?.charAt(0).toUpperCase() + user.role?.slice(1) },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
                  <p className="text-sm text-gray-900 font-medium">{value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Change password */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="font-semibold text-gray-900">Password</h2>
            <p className="text-xs text-gray-400 mt-0.5">Change your account password</p>
          </div>
          {!showPwForm && (
            <button onClick={() => setShowPwForm(true)}
              className="text-sm text-red-600 font-medium hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
              Change
            </button>
          )}
        </div>

        {showPwForm && (
          <div className="p-6 space-y-4">
            {pwMsg && (
              <div className={`px-4 py-3 rounded-lg text-sm font-medium ${pwMsgType === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                {pwMsg}
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Current password</label>
              <input type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} placeholder="Your current password" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">New password</label>
              <input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="Min. 8 characters" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Confirm new password</label>
              <input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} placeholder="Repeat new password" className={inputClass} />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={handlePasswordChange} disabled={pwSaving}
                className="px-5 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-60 transition-colors">
                {pwSaving ? "Saving..." : "Change password"}
              </button>
              <button onClick={() => { setShowPwForm(false); setPwMsg(""); setCurrentPw(""); setNewPw(""); setConfirmPw(""); }}
                className="px-5 py-2.5 text-sm text-gray-500 hover:text-gray-700">Cancel</button>
            </div>
          </div>
        )}
      </div>

      {/* Danger zone */}
      <div className="bg-white rounded-xl border border-red-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-red-100">
          <h2 className="font-semibold text-red-700">Account</h2>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-4">Need to delete your account or have questions about your data? Contact us and we will handle it within 48 hours.</p>
          <a href="mailto:ricreneinvestments@gmail.com?subject=Account deletion request"
            className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium hover:underline">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            Request account deletion
          </a>
        </div>
      </div>
    </div>
  );
}
"use client";

// frontend/app/dashboard/layout.tsx
// Wraps all /dashboard/* pages with the portal sidebar + header.
// Public Navbar/Footer are already suppressed by ConditionalShell.

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useEffect } from "react";

const navItems = [
  { href: "/dashboard",          label: "Overview", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { href: "/dashboard/payments", label: "Payments", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
  { href: "/dashboard/invoices", label: "Invoices", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { href: "/dashboard/profile",  label: "Profile",  icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router   = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const initials = `${user.first_name?.[0] ?? ""}${user.last_name?.[0] ?? ""}`.toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* ── Portal header ── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 h-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">

          <div className="flex items-center gap-3">
            {/* Logo */}
            <Link href="/" className="inline-block h-[44px] w-28 shrink-0">
              <img src="/images/Ricrene logo transparent.png" alt="Ricrene"
                className="h-full w-full object-contain object-left" />
            </Link>
            <div className="hidden sm:block w-px h-5 bg-gray-200" />
            <span className="hidden sm:block text-[11px] font-bold text-gray-400 uppercase tracking-widest">Client Portal</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                {initials}
              </div>
              <span className="text-sm font-medium text-gray-700">{user.first_name}</span>
            </div>
            <button onClick={logout}
              className="text-xs text-gray-400 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50 font-medium border border-gray-200 hover:border-red-200">
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 gap-6">

        {/* Sidebar — desktop only */}
        <aside className="w-44 shrink-0 hidden md:block">
          <nav className="space-y-0.5 sticky top-20">
            {navItems.map(({ href, label, icon }) => {
              const active = pathname === href;
              return (
                <Link key={href} href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active ? "bg-red-50 text-red-600" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}>
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                  </svg>
                  {label}
                  {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-red-600" />}
                </Link>
              );
            })}

            <div className="pt-3 mt-3 border-t border-gray-200">
              <Link href="/"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to site
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 pb-24 md:pb-0">
          {children}
        </main>
      </div>

      {/* ── Mobile bottom tab bar ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200 flex safe-bottom">
        {navItems.map(({ href, label, icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-[10px] font-semibold transition-colors ${
                active ? "text-red-600" : "text-gray-400"
              }`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
              </svg>
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
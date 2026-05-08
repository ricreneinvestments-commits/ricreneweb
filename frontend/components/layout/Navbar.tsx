"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth";
import type { User } from "@/lib/auth";

// ── Brand ─────────────────────────────────────────────────────────────────────
const BRAND      = "#44B6E8";
const BRAND_DARK = "#2A9FD4";
const BRAND_PALE = "#EBF8FD";

// ── 5 main services — each links ONLY to its own page ────────────────────────
const services = [
  {
    icon: "🌐",
    name: "Website Design & Maintenance",
    description: "Websites, hosting, emails & SEO",
    href: "/services/website-design",
  },
  {
    icon: "📸",
    name: "Photography & Media",
    description: "Photos, video, streaming & marketing",
    href: "/services/photography-media",
  },
  {
    icon: "🖨️",
    name: "Printing Services",
    description: "T-shirts, cards, banners & more",
    href: "/services/printing-services",
  },
  {
    icon: "⚙️",
    name: "Business Automation",
    description: "POS, e-commerce & custom systems",
    href: "/services/business-automation",
  },
  {
    icon: "📊",
    name: "Data Intelligence",
    description: "Analytics, dashboards & databases",
    href: "/services/data-intelligence",
  },
];

// ── Dashboard dropdown links ──────────────────────────────────────────────────
const dropdownLinks = [
  { href: "/dashboard",          label: "My Dashboard", icon: "M3 7h18M3 12h18M3 17h18" },
  { href: "/dashboard/payments", label: "Payments",     icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
  { href: "/dashboard/invoices", label: "Invoices",     icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { href: "/dashboard/profile",  label: "Profile",      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
];

// ── UserAvatar ────────────────────────────────────────────────────────────────
function UserAvatar({ firstName, lastName }: { firstName: string; lastName: string }) {
  const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
  return (
    <div
      className="w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-bold select-none"
      style={{ backgroundColor: BRAND }}
    >
      {initials}
    </div>
  );
}

// ── AuthButton ────────────────────────────────────────────────────────────────
interface AuthButtonProps {
  user: User | null;
  loading: boolean;
  isUserMenuOpen: boolean;
  userButtonRef: React.RefObject<HTMLButtonElement | null>;
  userMenuRef: React.RefObject<HTMLDivElement | null>;
  onToggleUserMenu: () => void;
  onCloseUserMenu: () => void;
  onLogout: () => void;
}

function AuthButton({
  user, loading, isUserMenuOpen,
  userButtonRef, userMenuRef,
  onToggleUserMenu, onCloseUserMenu, onLogout,
}: AuthButtonProps) {
  if (loading) return <div className="w-16 h-8" />;

  if (user) {
    return (
      <div className="relative">
        <button
          ref={userButtonRef}
          onClick={onToggleUserMenu}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-all"
        >
          <UserAvatar firstName={user.first_name} lastName={user.last_name} />
          <span className="text-sm font-medium text-gray-700">{user.first_name}</span>
          <svg
            className={`w-3.5 h-3.5 text-gray-500 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isUserMenuOpen && (
          <div
            ref={userMenuRef}
            className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-200/60 overflow-hidden z-50 animate-fade-down"
          >
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
              <p className="text-sm font-semibold text-gray-900">{user.first_name} {user.last_name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
            <div className="py-1">
              {dropdownLinks.map(({ href, label, icon }) => (
                <Link
                  key={href} href={href} onClick={onCloseUserMenu}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-sky-50 hover:text-[#44B6E8]"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                  </svg>
                  {label}
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-100 py-1">
              <button
                onClick={onLogout}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors hover:bg-sky-50 hover:text-[#44B6E8]"
                style={{ color: BRAND }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all"
      onMouseEnter={e => (e.currentTarget.style.color = BRAND)}
      onMouseLeave={e => (e.currentTarget.style.color = "")}
    >
      Login
    </Link>
  );
}

// ── Services Dropdown — 5 cards, each goes to its own page ───────────────────
function ServicesDropdown({
  dropdownRef,
  onClose,
}: {
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
}) {
  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] bg-white rounded-2xl shadow-2xl border border-gray-200/60 overflow-hidden z-50 animate-slide-down"
    >
      {/* Header */}
      <div className="px-5 pt-4 pb-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Our Services</p>
      </div>

      {/* 5 service cards */}
      <div className="px-3 pb-3 grid grid-cols-1 gap-1">
        {services.map((svc) => (
          <Link
            key={svc.href}
            href={svc.href}
            onClick={onClose}
            className="flex items-center gap-4 px-4 py-3 rounded-xl transition-all group"
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = BRAND_PALE)}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "")}
          >
            {/* Icon */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 transition-colors"
              style={{ backgroundColor: BRAND_PALE }}
            >
              {svc.icon}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 group-hover:text-[#44B6E8] transition-colors">
                {svc.name}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{svc.description}</p>
            </div>

            {/* Arrow */}
            <svg
              className="w-4 h-4 text-gray-300 group-hover:text-[#44B6E8] group-hover:translate-x-0.5 transition-all shrink-0"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>

      {/* Footer strip */}
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-400">Not sure where to start?</span>
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); onClose(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
          className="text-xs font-semibold px-4 py-1.5 rounded-lg text-white transition-all"
          style={{ backgroundColor: BRAND }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = BRAND_DARK)}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = BRAND)}
        >
          Free consultation →
        </a>
      </div>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [isMobileOpen,    setIsMobileOpen]    = useState(false);
  const [isServicesOpen,  setIsServicesOpen]  = useState(false);
  const [isUserMenuOpen,  setIsUserMenuOpen]  = useState(false);
  const [scrolled,        setScrolled]        = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const dropdownRef      = useRef<HTMLDivElement>(null);
  const servicesBtnRef   = useRef<HTMLButtonElement>(null);
  const userMenuRef      = useRef<HTMLDivElement>(null);
  const userButtonRef    = useRef<HTMLButtonElement>(null);

  const { user, loading, logout } = useAuth();

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close services dropdown on outside click
  useEffect(() => {
    const handler = (e: Event) => {
      const t = e.target as Node;
      if (
        dropdownRef.current && !dropdownRef.current.contains(t) &&
        servicesBtnRef.current && !servicesBtnRef.current.contains(t)
      ) setIsServicesOpen(false);
    };
    if (isServicesOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isServicesOpen]);

  // Close user menu on outside click
  useEffect(() => {
    const handler = (e: Event) => {
      const t = e.target as Node;
      if (
        userMenuRef.current && !userMenuRef.current.contains(t) &&
        userButtonRef.current && !userButtonRef.current.contains(t)
      ) setIsUserMenuOpen(false);
    };
    if (isUserMenuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isUserMenuOpen]);

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      setIsMobileOpen(false);
      setIsServicesOpen(false);
    }
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsMobileOpen(false);
    setIsServicesOpen(false);
  };

  const handleLogout = async () => {
    setIsUserMenuOpen(false);
    setIsMobileOpen(false);
    await logout();
  };

  const navLinkClass =
    "px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all";

  return (
    <>
      <nav
        className={`${scrolled ? "fixed top-0" : "relative"} left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50"
            : "bg-white/95 backdrop-blur-md shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <Link href="/" onClick={handleHomeClick} className="relative h-30 w-44 shrink-0 flex items-center">
              <img
                src="/images/logoBlue.png"
                alt="Ricrene Investment"
                className="h-full w-full object-contain object-left"
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">

              <Link
                href="/"
                onClick={handleHomeClick}
                className={navLinkClass}
                onMouseEnter={e => (e.currentTarget.style.color = BRAND)}
                onMouseLeave={e => (e.currentTarget.style.color = "")}
              >
                Home
              </Link>

              {/* Services trigger */}
              <div className="relative">
                <button
                  ref={servicesBtnRef}
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className={`${navLinkClass} flex items-center gap-1`}
                  style={isServicesOpen ? { color: BRAND } : {}}
                >
                  Services
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isServicesOpen && (
                  <ServicesDropdown
                    dropdownRef={dropdownRef}
                    onClose={() => setIsServicesOpen(false)}
                  />
                )}
              </div>

              <a
                href="#why-us"
                onClick={(e) => smoothScroll(e, "#why-us")}
                className={navLinkClass}
                onMouseEnter={e => (e.currentTarget.style.color = BRAND)}
                onMouseLeave={e => (e.currentTarget.style.color = "")}
              >
                Why Us
              </a>

              <a
                href="#contact"
                onClick={(e) => smoothScroll(e, "#contact")}
                className={navLinkClass}
                onMouseEnter={e => (e.currentTarget.style.color = BRAND)}
                onMouseLeave={e => (e.currentTarget.style.color = "")}
              >
                Contact
              </a>
            </div>

            {/* Right: auth + CTA */}
            <div className="hidden lg:flex items-center gap-2">
              <AuthButton
                user={user} loading={loading}
                isUserMenuOpen={isUserMenuOpen}
                userButtonRef={userButtonRef}
                userMenuRef={userMenuRef}
                onToggleUserMenu={() => setIsUserMenuOpen(!isUserMenuOpen)}
                onCloseUserMenu={() => setIsUserMenuOpen(false)}
                onLogout={handleLogout}
              />
              <a
                href="#contact"
                onClick={(e) => smoothScroll(e, "#contact")}
                className="px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-all shadow-sm hover:shadow-md"
                style={{ backgroundColor: BRAND }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = BRAND_DARK)}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = BRAND)}
              >
                Get Started
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* ── Mobile menu ───────────────────────────────────────────────────── */}
        {isMobileOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50">
            <div className="px-4 py-5 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto">

              {/* Auth header */}
              {!loading && (
                user ? (
                  <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl mb-3">
                    <UserAvatar firstName={user.first_name} lastName={user.last_name} />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{user.first_name} {user.last_name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-4 py-3 font-semibold hover:bg-gray-50 rounded-lg transition-all text-sm"
                    style={{ color: BRAND }}
                  >
                    Login / Create Account
                  </Link>
                )
              )}

              {/* Home */}
              <Link
                href="/"
                onClick={handleHomeClick}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-all text-sm"
              >
                Home
              </Link>

              {/* Services accordion */}
              <div className="border-t border-gray-100 pt-2 mt-1">
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left rounded-lg hover:bg-gray-50 transition-all"
                >
                  <span className="font-semibold text-gray-900 text-sm">Services</span>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {mobileServicesOpen && (
                  <div className="mt-1 space-y-1 pb-2">
                    {services.map((svc) => (
                      <Link
                        key={svc.href}
                        href={svc.href}
                        onClick={() => setIsMobileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all group"
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = BRAND_PALE)}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "")}
                      >
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0"
                          style={{ backgroundColor: BRAND_PALE }}
                        >
                          {svc.icon}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 group-hover:text-[#44B6E8] transition-colors">
                            {svc.name}
                          </p>
                          <p className="text-xs text-gray-400">{svc.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <a
                href="#why-us"
                onClick={(e) => { smoothScroll(e, "#why-us"); setIsMobileOpen(false); }}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-all text-sm border-t border-gray-100 mt-1 pt-3"
              >
                Why Us
              </a>

              <a
                href="#contact"
                onClick={(e) => { smoothScroll(e, "#contact"); setIsMobileOpen(false); }}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-all text-sm"
              >
                Contact
              </a>

              {/* Dashboard links when logged in */}
              {user && (
                <div className="border-t border-gray-100 pt-3 mt-2 space-y-1">
                  {dropdownLinks.map(({ href, label }) => (
                    <Link
                      key={href} href={href}
                      onClick={() => setIsMobileOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-sky-50 hover:text-[#44B6E8] rounded-lg transition-all"
                    >
                      {label}
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2.5 text-sm rounded-lg transition-all hover:bg-sky-50"
                    style={{ color: BRAND }}
                  >
                    Sign Out
                  </button>
                </div>
              )}

              {/* Mobile CTA */}
              <a
                href="#contact"
                onClick={(e) => { smoothScroll(e, "#contact"); setIsMobileOpen(false); }}
                className="block w-full text-white px-6 py-3 rounded-xl text-center font-semibold transition-all mt-3"
                style={{ backgroundColor: BRAND }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = BRAND_DARK)}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = BRAND)}
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </nav>

      {scrolled && <div className="h-20" />}

      <style jsx>{`
        .animate-slide-down {
          animation: slideDown 0.18s ease-out;
        }
        .animate-fade-down {
          animation: fadeDown 0.14s ease-out;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0);    }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-5px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </>
  );
}
"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth";
import type { User } from "@/lib/auth";

// ── Static data ───────────────────────────────────────────────────────────────

const serviceCategories = [
  {
    name: "Web Solutions",
    icon: "🌐",
    services: [
      { title: "Website Design & Development", description: "Professional websites that drive results", href: "/services/web-development" },
      { title: "Domain & Hosting Subscriptions", description: "Get a domain name and reliable hosting", href: "/services/domain-hosting" },
      { title: "Website Maintenance & Support", description: "Keep your site running smoothly", href: "/services/website-maintenance" },
    ],
  },
  {
    name: "Business Systems",
    icon: "⚙️",
    services: [
      { title: "Business Automation & Systems", description: "Tailored software for your operations", href: "/services/custom-systems" },
      { title: "Data Analytics & Insights", description: "Make informed business decisions", href: "/services/data-analysis" },
      { title: "Custom Business Email Solutions", description: "Professional email infrastructure", href: "/services/corporate-email" },
    ],
  },
  {
    name: "Digital & Media",
    icon: "🎨",
    services: [
      { title: "SEO & Digital Marketing", description: "Get found online and attract customers", href: "/services/seo-digital-marketing" },
      { title: "Digital Invitations & Cards", description: "Modern event and networking solutions", href: "/services/digital-solutions" },
      { title: "Video Production & Streaming", description: "Modern video solutions for your brand", href: "/services/video-production" },
    ],
  },
];

const dropdownLinks = [
  { href: "/dashboard",          label: "My Dashboard", icon: "M3 7h18M3 12h18M3 17h18" },
  { href: "/dashboard/payments", label: "Payments",     icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
  { href: "/dashboard/invoices", label: "Invoices",     icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { href: "/dashboard/profile",  label: "Profile",      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
];

// ── Standalone components (must be OUTSIDE Navbar to satisfy eslint) ──────────

function UserAvatar({ firstName, lastName }: { firstName: string; lastName: string }) {
  const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
  return (
    <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold select-none">
      {initials}
    </div>
  );
}

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
  user,
  loading,
  isUserMenuOpen,
  userButtonRef,
  userMenuRef,
  onToggleUserMenu,
  onCloseUserMenu,
  onLogout,
}: AuthButtonProps) {
  // Placeholder while restoring session — prevents layout shift
  if (loading) return <div className="w-16 h-8" />;

  // Logged in — avatar + dropdown
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
            className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-200/60 overflow-hidden z-50 animate-in-fast"
          >
            {/* User info header */}
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
              <p className="text-sm font-semibold text-gray-900">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>

            {/* Nav links */}
            <div className="py-1">
              {dropdownLinks.map(({ href, label, icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onCloseUserMenu}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                  </svg>
                  {label}
                </Link>
              ))}
            </div>

            {/* Sign out */}
            <div className="border-t border-gray-100 py-1">
              <button
                onClick={onLogout}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
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

  // Not logged in — simple Login link
  return (
    <Link
      href="/login"
      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-all"
    >
      Login
    </Link>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [isMobileOpen,   setIsMobileOpen]   = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled,       setScrolled]       = useState(false);

  const megaMenuRef       = useRef<HTMLDivElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const userMenuRef       = useRef<HTMLDivElement>(null);
  const userButtonRef     = useRef<HTMLButtonElement>(null);

  const { user, loading, logout } = useAuth();

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mega menu on outside click
  useEffect(() => {
    const handler = (e: Event) => {
      const t = e.target as Node;
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(t) &&
        servicesButtonRef.current &&
        !servicesButtonRef.current.contains(t)
      ) {
        setIsMegaMenuOpen(false);
      }
    };
    if (isMegaMenuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isMegaMenuOpen]);

  // Close user menu on outside click
  useEffect(() => {
    const handler = (e: Event) => {
      const t = e.target as Node;
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(t) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(t)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    if (isUserMenuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isUserMenuOpen]);

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      setIsMobileOpen(false);
      setIsMegaMenuOpen(false);
    }
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsMobileOpen(false);
    setIsMegaMenuOpen(false);
  };

  const handleLogout = async () => {
    setIsUserMenuOpen(false);
    setIsMobileOpen(false);
    await logout();
  };

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
          <div className="flex justify-between items-center h-25">

            {/* Logo */}
            <Link href="/" onClick={handleHomeClick} className="relative h-30 w-48 shrink-0 flex items-center">
              <img
                src="/images/Ricrene logo transparent.png"
                alt="Ricrene Investment"
                className="h-full w-full object-contain object-left"
              />
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1">
              <Link
                href="/"
                onClick={handleHomeClick}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-all"
              >
                Home
              </Link>

              {/* Services mega menu trigger */}
              <div className="relative">
                <button
                  ref={servicesButtonRef}
                  onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-all flex items-center gap-1"
                >
                  Services
                  <svg
                    className={`w-4 h-4 transition-transform ${isMegaMenuOpen ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isMegaMenuOpen && (
                  <div
                    ref={megaMenuRef}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-screen max-w-5xl bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden animate-in"
                  >
                    <div className="grid grid-cols-3 gap-0 p-6">
                      {serviceCategories.map((category, idx) => (
                        <div
                          key={category.name}
                          className={idx !== 0 ? "border-l border-gray-200/50 pl-6" : ""}
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-xl">{category.icon}</span>
                            <h3 className="font-semibold text-gray-900 text-sm">{category.name}</h3>
                          </div>
                          <ul className="space-y-1">
                            {category.services.map((service) => (
                              <li key={service.href}>
                                <a
                                  href={service.href}
                                  onClick={() => setIsMegaMenuOpen(false)}
                                  className="group block p-3 rounded-lg hover:bg-red-50 transition-all"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-red-600 transition-colors text-sm mb-1">
                                    {service.title}
                                  </div>
                                  <div className="text-xs text-gray-500 leading-relaxed">
                                    {service.description}
                                  </div>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <a
                href="#why-us"
                onClick={(e) => smoothScroll(e, "#why-us")}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-all"
              >
                Why Us
              </a>
              <a
                href="#contact"
                onClick={(e) => smoothScroll(e, "#contact")}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-all"
              >
                Contact
              </a>
            </div>

            {/* Right side: Login/Avatar + Get Started */}
            <div className="hidden lg:flex items-center gap-2">
              <AuthButton
                user={user}
                loading={loading}
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
                className="px-5 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-all shadow-sm hover:shadow-md"
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
                {isMobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* ── Mobile menu ─────────────────────────────────────────────────── */}
        {isMobileOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50">
            <div className="px-6 py-6 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">

              {/* Auth header */}
              {!loading && (
                user ? (
                  <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl mb-3">
                    <UserAvatar firstName={user.first_name} lastName={user.last_name} />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {user.first_name} {user.last_name}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-4 py-3 text-red-600 font-semibold hover:bg-red-50 rounded-lg transition-all text-sm"
                  >
                    Login / Create Account
                  </Link>
                )
              )}

              <Link
                href="/"
                onClick={handleHomeClick}
                className="block px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-lg font-medium transition-all"
              >
                Home
              </Link>

              {serviceCategories.map((category) => (
                <div key={category.name} className="border-t border-gray-100 pt-3 mt-3">
                  <div className="flex items-center gap-2 px-4 py-2 mb-2">
                    <span className="text-lg">{category.icon}</span>
                    <h3 className="font-semibold text-gray-900 text-sm">{category.name}</h3>
                  </div>
                  <ul className="space-y-1 ml-2">
                    {category.services.map((service) => (
                      <li key={service.href}>
                        <a
                          href={service.href}
                          onClick={() => setIsMobileOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          {service.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <a
                href="#why-us"
                onClick={(e) => { smoothScroll(e, "#why-us"); setIsMobileOpen(false); }}
                className="block px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-lg font-medium transition-all border-t border-gray-100 mt-3 pt-3"
              >
                Why Us
              </a>
              <a
                href="#contact"
                onClick={(e) => { smoothScroll(e, "#contact"); setIsMobileOpen(false); }}
                className="block px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-lg font-medium transition-all"
              >
                Contact
              </a>

              {/* Dashboard links when logged in */}
              {user && (
                <div className="border-t border-gray-100 pt-3 mt-3 space-y-1">
                  {dropdownLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setIsMobileOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      {label}
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    Sign Out
                  </button>
                </div>
              )}

              <a
                href="#contact"
                onClick={(e) => { smoothScroll(e, "#contact"); setIsMobileOpen(false); }}
                className="block w-full bg-red-600 text-white px-6 py-3 rounded-lg text-center font-medium hover:bg-red-700 transition-all mt-4"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </nav>

      {scrolled && <div className="h-30" />}

      <style jsx>{`
        .animate-in {
          animation: slideDown 0.2s ease-out;
        }
        .animate-in-fast {
          animation: fadeDown 0.15s ease-out;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
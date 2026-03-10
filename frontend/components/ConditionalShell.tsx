"use client";

// frontend/components/ConditionalShell.tsx
//
// Wraps public pages with <Navbar> + <main> + <Footer>.
// Auth and dashboard pages get children only — no shell.

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Every route listed here (and anything nested under it) will skip Navbar + Footer.
const SHELL_EXCLUDED = [
  "/login",
  "/signup",
  "/forgot-password",
  "/dashboard",
];

function isExcluded(pathname: string): boolean {
  return SHELL_EXCLUDED.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
}

export default function ConditionalShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (isExcluded(pathname)) {
    // Auth / dashboard pages — render children with no wrapper at all
    return <>{children}</>;
  }

  // Public pages — identical to what was in your original layout.tsx
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
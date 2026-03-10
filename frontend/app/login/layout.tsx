// frontend/app/login/layout.tsx
// This overrides the root layout for the login page only,
// removing the Navbar and Footer that root layout adds.

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Ricrene Investment Ltd",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
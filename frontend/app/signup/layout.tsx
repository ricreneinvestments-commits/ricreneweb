// frontend/app/signup/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | Ricrene Investment Ltd",
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
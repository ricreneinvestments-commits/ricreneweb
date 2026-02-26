"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: "admin" | "staff" | "client";
  phone: string;
  company_name: string;
}

export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

// ── Context ───────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | null>(null);

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ── Provider ──────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchMe(token);
    } else {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMe = async (token: string) => {
    try {
      const res = await fetch(`${API}/api/auth/me/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setUser(await res.json());
      } else {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
    } catch {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API}/api/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Invalid email or password.");
    }

    const data = await res.json();
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    setUser({
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      role: data.role,
      phone: data.phone || "",
      company_name: data.company_name || "",
    });
    router.push("/dashboard");
  };

  const register = async (formData: RegisterData) => {
    const res = await fetch(`${API}/api/auth/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const err = await res.json();
      const message =
        err.email?.[0] ||
        err.password?.[0] ||
        err.first_name?.[0] ||
        "Registration failed. Please try again.";
      throw new Error(message);
    }

    const data = await res.json();
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    setUser({
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      role: data.role,
      phone: data.phone || "",
      company_name: data.company_name || "",
    });
    router.push("/dashboard");
  };

  const logout = async () => {
    const refresh = localStorage.getItem("refresh_token");
    const access = localStorage.getItem("access_token");
    try {
      await fetch(`${API}/api/auth/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({ refresh }),
      });
    } catch {
      // fail silently
    }
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    router.push("/");
  };

  const updateProfile = async (data: Partial<User>) => {
    const token = localStorage.getItem("access_token");
    const res = await fetch(`${API}/api/auth/me/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update profile.");
    if (token) await fetchMe(token);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
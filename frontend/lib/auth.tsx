"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function extractUser(data: Record<string, unknown>): User {
  const u = (data.user as Record<string, unknown>) ?? data;
  return {
    id:           u.id            as number,
    first_name:  (u.first_name   as string) || "",
    last_name:   (u.last_name    as string) || "",
    email:       (u.email        as string) || "",
    role:       ((u.role         as string) || "client") as User["role"],
    phone:       (u.phone        as string) || "",
    company_name:(u.company_name as string) || "",
  };
}

function clearStorage() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("token_expiry");
}

async function tryRefresh(): Promise<string | null> {
  const refresh = localStorage.getItem("refresh_token");
  if (!refresh) return null;
  try {
    const res = await fetch(`${API}/api/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.access) return null;
    localStorage.setItem("access_token", data.access);
    return data.access;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser]       = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const expiry = localStorage.getItem("token_expiry");
    const token  = localStorage.getItem("access_token");

    if (!expiry || Date.now() > parseInt(expiry)) {
      clearStorage();
      setLoading(false);
      return;
    }

    if (token) {
      fetchMe(token);
    } else {
      tryRefresh().then(newToken => {
        if (newToken) fetchMe(newToken);
        else { clearStorage(); setLoading(false); }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMe = async (token: string) => {
    try {
      const res = await fetch(`${API}/api/auth/me/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(extractUser(data));
      } else if (res.status === 401) {
        const newToken = await tryRefresh();
        if (newToken) {
          const res2 = await fetch(`${API}/api/auth/me/`, {
            headers: { Authorization: `Bearer ${newToken}` },
          });
          if (res2.ok) {
            const data2 = await res2.json();
            setUser(extractUser(data2));
            return;
          }
        }
        clearStorage();
      } else {
        clearStorage();
      }
    } catch {
      clearStorage();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string, rememberMe = false) => {
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
    localStorage.setItem("access_token",  data.access);
    localStorage.setItem("refresh_token", data.refresh);
    const expiry = rememberMe
      ? Date.now() + 30 * 24 * 60 * 60 * 1000
      : Date.now() + 60 * 60 * 1000;
    localStorage.setItem("token_expiry", String(expiry));
    setUser(extractUser(data));
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
        err.error           ||
        err.email?.[0]      ||
        err.password?.[0]   ||
        err.first_name?.[0] ||
        "Registration failed. Please try again.";
      throw new Error(message);
    }
    const data = await res.json();
    localStorage.setItem("access_token",  data.access);
    localStorage.setItem("refresh_token", data.refresh);
    localStorage.setItem("token_expiry", String(Date.now() + 60 * 60 * 1000));
    setUser(extractUser(data));
    router.push("/dashboard");
  };

  const logout = async () => {
    const refresh = localStorage.getItem("refresh_token");
    const access  = localStorage.getItem("access_token");
    try {
      await fetch(`${API}/api/auth/logout/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${access}` },
        body: JSON.stringify({ refresh }),
      });
    } catch { /* fail silently */ }
    clearStorage();
    setUser(null);
    router.push("/");
  };

  const updateProfile = async (data: Partial<User>) => {
    const token = localStorage.getItem("access_token");
    const res = await fetch(`${API}/api/auth/me/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update profile.");
    if (token) await fetchMe(token);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
"use client";

import { createContext, useContext } from "react";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: "admin" | "staff" | "client";
  phone?: string;
  company_name?: string;
}

interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  password: string;
  company_name?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  updateProfile: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Provider 
      value={{
        user: null,
        loading: false,
        login: async () => {
          console.log("Login not implemented yet");
        },
        register: async () => {
          console.log("Register not implemented yet");
        },
        logout: async () => {
          console.log("Logout not implemented yet");
        },
        updateProfile: async () => {
          console.log("Update profile not implemented yet");
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

// Export types for use in other components
export type { User, RegisterData, AuthContextType };
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

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: Partial<User>) => Promise<void>;
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
        login: async () => {},
        register: async () => {},
        logout: async () => {},
        updateProfile: async () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
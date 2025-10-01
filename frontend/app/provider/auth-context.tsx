// ✅ Context for storing user authentication state

import type { User } from "@/types";
import { createContext, useContext, useState } from "react";

// Define shape of AuthContext data
interface AuthContextType {
  user: User | null; // currently logged-in user
  isAuthenticated: boolean; // whether user is logged in
  isLoading: boolean; // track loading state (e.g., while logging in)
  login: (email: string, password: string) => void; // login function
  logout: () => void; // logout function
}

// ✅ Create AuthContext (with undefined default so we can validate later)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ Provider component wraps around App (makes auth available everywhere)
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // State for user object
  const [user, setUser] = useState<User | null>(null);
  // State for whether the user is logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // State for tracking loading (API calls etc.)
  const [isLoading, setIsLoading] = useState(false);

  // Fake login function (TODO: integrate API call)
  const login = (email: string, password: string) => {
    console.log(email, password);
    // setIsLoading(true) → call API → setUser + setIsAuthenticated(true) → setIsLoading(false)
  };

  // Fake logout function (TODO: clear token, reset state)
  const logout = () => {
    console.log("logout");
    // setUser(null); setIsAuthenticated(false)
  };

  // Values available to components via useAuth()
  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  // Provide context to children
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ✅ Hook for accessing AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider"); // safety check
  }
  return context;
};

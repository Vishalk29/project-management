// ✅ Context for storing user authentication state
import type { User } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { queryClient } from "./react-query-provider";
import { useLocation, useNavigate } from "react-router";
import { PUBLIC_ROUTES, publicRoutes } from "@/lib/routes";

// -----------------------------------------------
// 🔑 1. Define AuthContext shape (what data/functions are available)
// -----------------------------------------------
interface AuthContextType {
  user: User | null; // currently logged-in user
  isAuthenticated: boolean; // whether user is logged in
  isLoading: boolean; // track loading state (e.g., while checking token)
  login: (data: any) => void; // login function
  logout: () => void; // logout function
}

// Create AuthContext with "undefined" so we can validate useAuth()
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// -----------------------------------------------
// 🔑 2. Provider Component (wraps around <App />)
// -----------------------------------------------
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // --- Local State ---
  const [user, setUser] = useState<User | null>(null); // store user object
  const [isAuthenticated, setIsAuthenticated] = useState(false); // track auth
  const [isLoading, setIsLoading] = useState(false); // track async checks

  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  const isPublicRoute = publicRoutes.includes(currentPath);

  // -----------------------------------------------
  // 🔑 3. On mount → Check if user already logged in
  // -----------------------------------------------
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const userInfo = localStorage.getItem("user");

      if (userInfo) {
        // User exists → update state
        setUser(JSON.parse(userInfo));
        setIsAuthenticated(true);
      } else {
        // No user → redirect if trying to access private route
        setIsAuthenticated(false);
        if (!isPublicRoute) {
          navigate("/sign-in");
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // -----------------------------------------------
  // 🔑 4. Handle "force logout" (example: token expired event)
  // -----------------------------------------------
  useEffect(() => {
    const handleLogout = () => {
      logout();
      navigate("sign-in");
    };
    window.addEventListener("force-logout", handleLogout);
    return () => window.removeEventListener("force-logout", handleLogout);
  }, []);

  // -----------------------------------------------
  // 🔑 5. Login Function
  //  - Save token + user to localStorage
  //  - Update React state
  // -----------------------------------------------
  const login = async (data: any) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    setIsAuthenticated(true);
  };

  // -----------------------------------------------
  // 🔑 6. Logout Function
  //  - Clear localStorage + reset state
  // -----------------------------------------------
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    queryClient.clear(); // clear cached queries
  };

  // Provide all values to children
  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// -----------------------------------------------
// 🔑 7. Hook for consuming AuthContext safely
// -----------------------------------------------
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

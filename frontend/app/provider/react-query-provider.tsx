import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider } from "./auth-context";

// ✅ Create a single QueryClient instance (manages caching, queries, mutations)
export const queryClient = new QueryClient();

// ✅ Wrapper component to provide React Query + Auth + Toast to the app
const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    // React Query provider (makes queries/mutations available globally)
    <QueryClientProvider client={queryClient}>
      {/* AuthProvider provides authentication state & functions */}
      <AuthProvider>
        {/* children = rest of your app */}
        {children}

        {/* Toaster component (for showing notifications, positioned at top-center) */}
        <Toaster position="top-center" richColors />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import * as authApi from "@/lib/auth";

export default function DashboardGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, user, setUser, setAuthenticated } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // Check if user is authenticated with the backend
        const res = await authApi.getCurrentAuth();

        if (res.success && res.user) {
          // User is authenticated
          setUser(res.user);
          setAuthenticated(true);
          setIsChecking(false);
        } else {
          // Not authenticated - redirect to login
          console.log(
            "[DashboardGuard] Not authenticated, redirecting to /auth"
          );
          setAuthenticated(false);
          setUser(null);
          router.replace("/auth?redirect=/dashboard");
        }
      } catch (error) {
        console.error("[DashboardGuard] Auth check failed:", error);
        setAuthenticated(false);
        setUser(null);
        router.replace("/auth?redirect=/dashboard");
      }
    };

    verifyAuth();
  }, [router, setUser, setAuthenticated]);

  // Prevent rendering dashboard content while checking auth
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Only render children if authenticated
  if (!isAuthenticated || !user) {
    return null;
  }

  return <>{children}</>;
}

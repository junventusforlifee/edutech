"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentAuth } from "@/lib/auth";
import { useAuthStore } from "@/stores/authStore";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { setUser, setAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function verifyAdmin() {
      try {
        const res = await getCurrentAuth();

        if (!mounted) return;

        // Check if authenticated
        if (!res || !res.success) {
          console.log("[AdminGuard] Not authenticated, redirecting to /auth");
          setAuthenticated(false);
          setUser(null);
          router.replace("/auth?redirect=/admin");
          return;
        }

        // Check if user has admin role
        if (res.user && res.user.role !== "admin") {
          console.log(
            "[AdminGuard] User is not admin, redirecting to /dashboard"
          );
          router.replace("/dashboard");
          return;
        }

        // User is admin
        setUser(res.user);
        setAuthenticated(true);
        setIsAdmin(true);
      } catch (error) {
        console.error("[AdminGuard] Error verifying admin:", error);
        if (!mounted) return;
        setAuthenticated(false);
        setUser(null);
        router.replace("/auth?redirect=/admin");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    verifyAdmin();

    return () => {
      mounted = false;
    };
  }, [router, setUser, setAuthenticated]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // Only render children if user is admin
  if (!isAdmin) {
    return null;
  }

  return <>{children}</>;
}

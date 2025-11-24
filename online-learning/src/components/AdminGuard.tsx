"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentAuth } from "@/lib/auth";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("[AdminGuard] Component mounted!");
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("[AdminGuard] useEffect running...");
    let mounted = true;
    async function check() {
      try {
        console.log("[AdminGuard] About to call getCurrentAuth()...");
        const res = await getCurrentAuth();
        console.log(
          "[AdminGuard] getCurrentAuth response:",
          JSON.stringify(res, null, 2)
        );
        if (!mounted) return;
        if (!res || !res.success) {
          console.log("[AdminGuard] Not authenticated, redirecting to /auth");
          router.replace("/auth");
          return;
        }

        // if user exists but is not admin, redirect
        console.log("[AdminGuard] User role:", res.user?.role);
        if (res.user && res.user.role !== "admin") {
          console.log("[AdminGuard] User is not admin, redirecting to /auth");
          router.replace("/auth");
          return;
        }
        console.log("[AdminGuard] ✓ Admin verified, allowing access");
      } catch (error) {
        console.error("[AdminGuard] Error caught:", error);
        if (error instanceof Error) {
          console.error("[AdminGuard] Error message:", error.message);
          console.error("[AdminGuard] Error stack:", error.stack);
        }
        router.replace("/auth");
      } finally {
        if (mounted) {
          console.log("[AdminGuard] Setting loading to false");
          setLoading(false);
        }
      }
    }
    check();
    return () => {
      mounted = false;
    };
  }, [router]);

  if (loading) {
    console.log("[AdminGuard] Rendering loading state...");
    return <div className="p-8">Checking permissions...</div>;
  }

  console.log("[AdminGuard] Rendering children...");
  return <>{children}</>;
}

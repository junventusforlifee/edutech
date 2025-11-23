"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentAuth } from "@/lib/auth";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function check() {
      try {
        const res = await getCurrentAuth();
        console.log("[AdminGuard] getCurrentAuth response:", res);
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
        console.log("[AdminGuard] Admin verified, allowing access");
      } catch (error) {
        console.error("AdminGuard: failed to verify admin status", error);
        router.replace("/auth");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    check();
    return () => {
      mounted = false;
    };
  }, [router]);

  if (loading) return <div className="p-8">Checking permissions...</div>;

  return <>{children}</>;
}

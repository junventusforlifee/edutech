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
        if (!mounted) return;
        if (!res || !res.success) {
          router.replace("/auth");
          return;
        }

        // if user exists but is not admin, redirect
        if (res.user && res.user.role !== "admin") {
          router.replace("/auth");
          return;
        }
      } catch (e) {
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

"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as authApi from "@/lib/auth";
import { useAuthStore } from "@/stores/authStore";
import { LayoutDashboard, Video, Calendar, LogOut } from "lucide-react";

export default function AdminSidebar() {
  const router = useRouter();
  const { user } = useAuthStore();

  const items = [
    { href: "/admin", label: "Overview", icon: <LayoutDashboard size={18} /> },
    {
      href: "/admin/videos",
      label: "Pre-recorded Videos",
      icon: <Video size={18} />,
    },
    {
      href: "/admin/schedule",
      label: "Schedule Live Classes",
      icon: <Calendar size={18} />,
    },
  ];

  const handleLogout = async () => {
    try {
      // Call backend to clear the httpOnly cookie
      const res = await authApi.logout();
      if (!res.success) console.warn("Logout API returned:", res.message);
    } catch (err) {
      console.error("Logout request failed", err);
    }

    // Clear client-side auth state and storage
    useAuthStore.getState().setAuthenticated(false);
    useAuthStore.getState().setUser(null);
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error) {
      console.warn("Admin logout: unable to clear localStorage", error);
    }

    // Use replace instead of push to prevent back button from returning to admin dashboard
    router.replace("/");
  };

  return (
    <div className="bg-blue-600 text-white rounded-2xl shadow-lg p-5 min-h-screen w-64">
      {/* Admin Info */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-full bg-blue-400 flex items-center justify-center text-lg font-bold">
          {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
        </div>
        <div>
          <div className="font-semibold">{user?.name || "Admin"}</div>
          <div className="text-sm text-blue-100">
            {user?.email || "admin@example.com"}
          </div>
          <div className="text-xs text-blue-200 mt-1">Administrator</div>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        {items.map((i) => (
          <Link
            key={i.href}
            href={i.href}
            className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-blue-500 transition-colors"
          >
            <span className="text-white">{i.icon}</span>
            <span>{i.label}</span>
          </Link>
        ))}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 py-2 px-3 rounded-lg bg-white text-blue-600 font-medium mt-4 hover:bg-gray-100 transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </nav>
    </div>
  );
}

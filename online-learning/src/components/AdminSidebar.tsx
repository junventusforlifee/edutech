"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as authApi from "@/lib/auth";
import { useAuthStore } from "@/stores/authStore";
import { LayoutDashboard, Video, Calendar, LogOut } from "lucide-react";

export default function AdminSidebar() {
  const router = useRouter();

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

    // Redirect to homepage
    router.push("/");
  };

  return (
    <div className="bg-blue-600 text-white rounded-2xl shadow-lg p-5 min-h-screen w-64">
      <h3 className="font-semibold text-lg mb-6 text-white tracking-wide">
        Admin Dashboard
      </h3>

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

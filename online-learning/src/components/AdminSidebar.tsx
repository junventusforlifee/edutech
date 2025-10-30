"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Video,
  Calendar,
  LogOut,
} from "lucide-react";

export default function AdminSidebar() {
  const router = useRouter();

  const items = [
    { href: "/admin", label: "Overview", icon: <LayoutDashboard size={18} /> },
    { href: "/admin/videos", label: "Pre-recorded Videos", icon: <Video size={18} /> },
    { href: "/admin/schedule", label: "Schedule Live Classes", icon: <Calendar size={18} /> },
  ];

  const handleLogout = () => {
    // Clear tokens or user data if using JWT auth
    localStorage.removeItem("token");
    localStorage.removeItem("user");

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

"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as authApi from "@/lib/auth";
import { useAuthStore } from "@/stores/authStore";
import {
  BookOpen,
  GraduationCap,
  FileText,
  Layers,
  Cpu,
  LineChart,
  PenTool,
  Monitor,
  Video,
  ClipboardList,
  CheckCircle,
  LogOut,
} from "lucide-react";

export default function DashboardSidebar() {
  const router = useRouter();
  const { user } = useAuthStore();

  const items = [
    { label: "K12", icon: <BookOpen size={18} /> },
    { label: "WAEC/NECO Exam", icon: <FileText size={18} /> },
    { label: "JAMB", icon: <GraduationCap size={18} /> },
    { label: "JUPEB", icon: <Layers size={18} /> },
    { label: "100 Level", icon: <Cpu size={18} /> },
    { label: "Software Development", icon: <Monitor size={18} /> },
    { label: "Data Science", icon: <LineChart size={18} /> },
    { label: "UI/UX", icon: <PenTool size={18} /> },
    { label: "Digital Marketing", icon: <ClipboardList size={18} /> },
    { label: "Join Live Class", icon: <Video size={18} /> },
    { label: "Assignment", icon: <CheckCircle size={18} /> },
    { label: "Progress", icon: <LineChart size={18} /> },
  ];

  const handleLogout = async () => {
    try {
      // call backend to clear httpOnly cookie
      const res = await authApi.logout();
      if (!res.success) console.warn("Logout API returned:", res.message);
    } catch (err) {
      console.error("Logout request failed", err);
    }

    // clear client-side auth state and storage
    useAuthStore.getState().setAuthenticated(false);
    useAuthStore.getState().setUser(null);
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error) {
      console.warn("Dashboard logout: unable to clear localStorage", error);
    }

    // Use replace instead of push to prevent back button from returning to dashboard
    router.replace("/");
  };

  return (
    <div className="bg-blue-600 text-white rounded-2xl shadow-lg p-5 min-h-screen w-64">
      {/* Student Info */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-full bg-blue-400 flex items-center justify-center text-lg font-bold">
          {user?.name ? user.name.charAt(0).toUpperCase() : "S"}
        </div>
        <div>
          <div className="font-semibold">{user?.name || "Student Name"}</div>
          <div className="text-sm text-blue-100">
            {user?.email || "student@example.com"}
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2">
        {items.map((i) => {
          const slug = i.label
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");

          return (
            <Link
              href={`/dashboard/payment/${slug}`}
              key={i.label}
              className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-blue-500 transition-colors"
            >
              <span>{i.icon}</span>
              <span>{i.label}</span>
            </Link>
          );
        })}

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

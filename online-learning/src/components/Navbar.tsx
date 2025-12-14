"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useAuthStore } from "@/stores/authStore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuthStore();

  // Check if user is in student dashboard
  const isInDashboard = pathname?.startsWith("/dashboard");

  // Define menu items based on location
  const menuItems = isInDashboard
    ? [
        { href: "/dashboard/ai-tools", label: "Neo AI" },
        { href: "/dashboard/brainplay-game", label: "BrainPlay Game" },
        { href: "/dashboard/certificates", label: "Earn a Certificate" },
        { href: "/dashboard/app", label: "Get Our App", isButton: true },
      ]
    : [
        { href: "/", label: "Home" },
        { href: "#academy", label: "Academy Program" },
        { href: "#technology", label: "Technology Program" },
        { href: "/auth", label: "Get Started", isButton: true },
      ];

  return (
    <nav className="bg-white shadow-md fixed w-full z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-23">
          <div className="flex items-center">
            <Link
              href={isInDashboard ? "/dashboard" : "/"}
              className="flex items-center flex-shrink-0"
            >
              <Image
                src="/logo.png"
                alt="Neotisa Logo"
                width={120}
                height={40}
                priority
                className="mr-2 items-center h-auto"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-30">
            {menuItems.map((item) =>
              item.isButton ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {menuItems.map((item) =>
                item.isButton ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

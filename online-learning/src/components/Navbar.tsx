"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import logo from "../public/logo.png"
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-23">
          <div className="flex items-center">
            <Link href="/" className="flex items-center flex-shrink-0">
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
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link href="#academy" className="text-gray-700 hover:text-blue-600">
              Academy Program
            </Link>
            <Link
              href="#technology"
              className="text-gray-700 hover:text-blue-600"
            >
              Technology Program
            </Link>
            <Link
              href="/auth"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Get Started
            </Link>
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
              <Link
                href="/"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                Home
              </Link>
              <Link
                href="#academy"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                Academy Program
              </Link>
              <Link
                href="#technology"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                Technology Program
              </Link>
              <Link
                href="/auth"
                className="block px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// @ts-ignore - allow importing global CSS without module declarations
import "./globals.css";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Elearning Platform",
  description: "Learn with the best online courses and live classes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}

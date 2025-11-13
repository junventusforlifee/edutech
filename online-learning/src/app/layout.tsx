import "./globals.css";
import React from "react";
import Navbar from "@/components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import GoogleAuthProvider from "@/providers/GoogleAuthProvider";

export const metadata = {
  title: "Human-led.AI-powered Learning Platform",
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
        <GoogleAuthProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          {/* <Footer /> */}
          <ToastContainer position="top-right" autoClose={4000} />
        </GoogleAuthProvider>
      </body>
    </html>
  );
}

import React from "react";
import Navbar from "../../components/Navbar";
import DashboardSidebar from "../../components/DashboardSidebar";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Dashboard - NEOTISA",
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-12 md:col-span-3 lg:col-span-3">
            <DashboardSidebar />
          </aside>

          <section className="col-span-12 md:col-span-9 lg:col-span-9">
            {children}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

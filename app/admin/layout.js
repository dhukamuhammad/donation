"use client";
import Navbar from "@/layout/admin/Navbar";
import Sidebar from "@/layout/admin/Sidebar";
import { useState } from "react";

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="min-h-screen bg-gray-50 font-outfit">
            <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

            <div className="lg:ml-64 pt-16">
                <main className="min-h-screen">
                    {children}
                </main>
            </div>
        </div>
    );
}
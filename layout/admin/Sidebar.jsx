"use client";
import React, { useState } from "react"; // Added useState
import {
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  Tag,
  Heart,
  X,
  ChevronRight,
  ShieldCheck,
  Users,
  Receipt,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosinstance";
import CustomModal from "@/components/CustomModel"; // Import your CustomModal

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const router = useRouter();

  // ================= STATE =================
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    {
      id: "dashboard",
      icon: LayoutDashboard,
      label: "Dashboard Summary",
      path: "/admin/dashboard",
    },
    {
      id: "categories",
      icon: Tag,
      label: "Cause Categories",
      path: "/admin/category",
    },
    {
      id: "donationFunds",
      icon: Heart,
      label: "Manage Funds",
      path: "/admin/donationFund",
    },
    {
      id: "users",
      icon: Users, // Professional User Management Icon
      label: "User Directory",
      path: "/admin/users",
    },
    {
      id: "payment_info",
      icon: Receipt, // Financial/Invoice Icon for payments
      label: "Financial Ledger",
      path: "/admin/payment_info",
    },

    {
      id: "contacts",
      icon: MessageSquare,
      label: "Contact Messages",
      path: "/admin/contact",
    },
    {
      id: "settings",
      icon: Settings,
      label: "Admin Settings",
      path: "/admin/settings",
    },
  ];

  // ================= LOGOUT LOGIC =================
  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/admin/logout");
      setShowLogoutModal(false); // Close modal
      router.replace("/admin/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      {/* --- Mobile Overlay --- */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-[2px] z-[90] lg:hidden transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-slate-200 z-[100] font-['Outfit'] transition-transform duration-300 ease-in-out lg:translate-x-0 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* --- Sidebar Header --- */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 bg-white">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm">
              <Heart
                size={18}
                fill="white"
                className="text-white"
                strokeWidth={2.5}
              />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Admin<span className="text-blue-600">Portal</span>
            </span>
          </Link>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* --- Main Navigation --- */}
        <div className="p-4 flex flex-col h-[calc(100vh-64px)] overflow-y-auto">
          <nav className="flex-1 space-y-1">
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
              Main Menu
            </p>
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;

                return (
                  <li key={item.id}>
                    <Link
                      href={item.path}
                      onClick={() => {
                        if (window.innerWidth < 1024) toggleSidebar();
                      }}
                      className={`group flex items-center justify-between px-4 py-3 rounded-lg transition-all text-[14px] font-semibold ${
                        isActive
                          ? "bg-blue-50 text-blue-600 border border-blue-100/50"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          size={18}
                          strokeWidth={isActive ? 2.5 : 2}
                          className={
                            isActive
                              ? "text-blue-600"
                              : "text-slate-400 group-hover:text-slate-600"
                          }
                        />
                        <span>{item.label}</span>
                      </div>
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* --- Bottom Section --- */}
          <div className="mt-auto pt-4 border-t border-slate-100">
            {/* Logout Button (Triggers Modal) */}
            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-all font-bold text-[14px] group"
            >
              <LogOut
                size={18}
                className="group-hover:-translate-x-0.5 transition-transform"
                strokeWidth={2.5}
              />
              <span>Logout Session</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ================= MODAL INTEGRATION ================= */}
      <CustomModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Confirm Secure Logout"
        description="Are you sure you want to end your current session? You will need to re-authenticate to access the admin control panel."
        Delete="Logout Now"
      />
    </>
  );
};

export default Sidebar;

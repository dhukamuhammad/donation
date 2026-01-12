"use client";
import React from "react";
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
  Users
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();

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
      id: "reports", 
      icon: FileText, 
      label: "Impact Reports", 
      path: "/admin/reports" 
    },
    { 
      id: "settings", 
      icon: Settings, 
      label: "Admin Settings", 
      path: "/admin/settings" 
    },
  ];

  return (
    <>
      {/* --- Mobile Overlay --- */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[90] lg:hidden transition-opacity"
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
              <Heart size={18} fill="white" className="text-white" strokeWidth={2.5} />
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
                      onClick={() => { if(window.innerWidth < 1024) toggleSidebar(); }}
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
                          className={isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"} 
                        />
                        <span>{item.label}</span>
                      </div>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* --- Bottom Section: Admin Status & Logout --- */}
          <div className="mt-auto pt-4 border-t border-slate-100">
            {/* Admin Badge Card */}
            <div className="mb-4 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
                  <ShieldCheck size={16} className="text-blue-600" strokeWidth={2.5} />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full shadow-sm"></span>
              </div>
              <div className="overflow-hidden">
                <p className="text-[11px] font-bold text-slate-900 leading-none truncate">System Administrator</p>
                <p className="text-[10px] text-slate-500 font-medium mt-1 uppercase tracking-tighter">Verified Access</p>
              </div>
            </div>

            {/* Logout Button */}
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-all font-bold text-[14px] group">
              <LogOut size={18} className="group-hover:-translate-x-0.5 transition-transform" strokeWidth={2.5} />
              <span>Logout Session</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
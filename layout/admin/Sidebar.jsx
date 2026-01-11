"use client";
import {
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  Tag,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Pathname detect karne ke liye

const Sidebar = () => {
  const pathname = usePathname(); // Current URL path nikalne ke liye

  const menuItems = [
    {
      id: "dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      id: "categories",
      icon: Tag,
      label: "Categories",
      path: "/admin/category",
    },
    {
      id: "donationFunds",
      icon: Users,
      label: "Donation Funds",
      path: "/admin/donationFund",
    },
    { id: "reports", icon: FileText, label: "Reports", path: "/reports" },
    { id: "settings", icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transition-transform duration-300 lg:translate-x-0 w-64`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-[#2563EB]">Donation Admin</h2>
          <button className="lg:hidden text-gray-600 hover:text-[#1D4ED8]">
            <X size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              // Agar pathname aur item.path match karte hain toh active class lagegi
              const isActive = pathname === item.path;

              return (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#2563EB] text-white"
                        : "text-gray-700 hover:bg-[#EBF2FE]"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

"use client";
import { FileText, LayoutDashboard, LogOut, Settings, Tag, Users, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Sidebar Component
const Sidebar = () => {
    const [activeMenu, setActiveMenu] = useState('categories');

    const menuItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'categories', icon: Tag, label: 'Categories' },
        { id: 'users', icon: Users, label: 'Users' },
        { id: 'reports', icon: FileText, label: 'Reports' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <div>
            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transition-transform duration-300 lg:translate-x-0 w-64`}>

                {/* Sidebar Header */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-[#2563EB]">Donation </h2>
                    <button
                        className="lg:hidden text-gray-600 hover:text-[#1D4ED8]"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Menu Items */}
                <nav className="p-4">
                    <ul className="space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeMenu === item.id;

                            return (
                                <Link href={item.id} key={item.id}>
                                    <button
                                        onClick={() => setActiveMenu(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                                ? 'bg-[#2563EB] text-white'
                                                : 'text-gray-700 hover:bg-[#EBF2FE]'
                                            }`}
                                    >
                                        <Icon size={20} />
                                        <span className="font-medium">{item.label}</span>
                                    </button>
                                </Link>
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
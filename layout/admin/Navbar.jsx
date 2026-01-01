import React, { useState } from 'react';
import { Menu, X, LayoutDashboard, Tag, Users, FileText, Settings, LogOut, Bell, Search, ChevronDown } from 'lucide-react';

// Navbar Component
const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="h-16 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 lg:px-6">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden text-gray-600 hover:text-[#1D4ED8]"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold text-[#1D4ED8]">Admin Panel</h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <button className="relative text-gray-600 hover:text-[#1D4ED8]">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
            3
          </span>
        </button>
        
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-[#1D4ED8] rounded-full flex items-center justify-center text-white text-sm font-medium">
            A
          </div>
          <span className="hidden sm:block text-sm font-medium text-gray-700">Admin</span>
          <ChevronDown size={16} className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
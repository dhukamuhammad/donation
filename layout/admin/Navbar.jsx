"use client";
import React from "react";
import { 
  Menu, 
  Bell, 
  Search, 
  ChevronDown, 
  Heart, 
  ExternalLink,
  Circle
} from "lucide-react";
import Link from "next/link";

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 fixed top-0 left-0 right-0 z-40 font-['Outfit']">
      <div className="h-full flex items-center justify-between px-4 lg:px-8">
        
        {/* --- Left Side: Toggle & Breadcrumb --- */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition-colors"
          >
            <Menu size={22} />
          </button>

          <div className="hidden sm:flex items-center gap-3 text-slate-400">
            <Link href="/" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider hover:text-blue-600 transition-colors">
              <ExternalLink size={14} />
              View Site
            </Link>
            <span className="text-slate-200">|</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Control Panel
            </span>
          </div>
        </div>

        {/* --- Center: Search Bar (Desktop) --- */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-10">
          <div className="relative w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search donations, donors or campaigns..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:bg-white focus:border-blue-600 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* --- Right Side: Actions & Profile --- */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Notifications */}
          <button className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition-all">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-blue-600 border-2 border-white rounded-full text-[9px] font-black text-white flex items-center justify-center">
              3
            </span>
          </button>

          <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>
          
          {/* Admin Profile */}
          <div className="flex items-center gap-3 pl-2 group cursor-pointer">
            <div className="relative">
              <div className="w-9 h-9 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center text-blue-600 font-bold shadow-sm overflow-hidden group-hover:border-blue-300 transition-colors">
                <span className="text-sm">AD</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            
            <div className="hidden lg:block text-left">
              <p className="text-sm font-bold text-slate-800 leading-none">System Admin</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">Superuser</p>
            </div>
            <ChevronDown size={14} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
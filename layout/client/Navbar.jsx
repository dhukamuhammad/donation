"use client";
import React, { useEffect, useState } from "react";
import { 
  Heart, 
  Menu, 
  X, 
  LogIn, 
  UserPlus, 
  User, 
  LogOut, 
  ChevronDown 
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import axiosInstance from "@/lib/axiosinstance";
import Image from "next/image";
import CustomModel from "@/components/CustomModel";
import {
  showSuccess,
  showError,
  showLoading,
  dismissToast,
} from "@/components/Toaster";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  /* ================= Auth Logic ================= */
  useEffect(() => {
    const updateAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);

      if (token) {
        const userId = localStorage.getItem("userId");
        if (userId) fetchUserById(userId);
      } else {
        setProfileImage(null);
      }
    };

    updateAuth();
    window.addEventListener("auth-changed", updateAuth);
    return () => window.removeEventListener("auth-changed", updateAuth);
  }, []);

  const fetchUserById = async (userId) => {
    try {
      const res = await axiosInstance.get(`/auth/signup/${userId}`);
      setProfileImage(res.data?.profile_img || null);
    } catch (err) {
      setProfileImage(null);
    }
  };

  useEffect(() => {
    const handler = (e) => setProfileImage(e.detail);
    window.addEventListener("profile-image-updated", handler);
    return () => window.removeEventListener("profile-image-updated", handler);
  }, []);

  /* ================= Outside Click Close ================= */
  useEffect(() => {
    const closeMenu = (e) => {
      if (!e.target.closest(".profile-menu-container")) {
        setShowProfileMenu(false);
      }
    };
    if (showProfileMenu) window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, [showProfileMenu]);

  /* ================= Logout ================= */
  const handleLogout = async () => {
    showLoading("Logging out...");
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      setIsLoggedIn(false);
      setShowProfileMenu(false);
      setProfileImage(null);
      window.dispatchEvent(new Event("auth-changed"));
      dismissToast();
      showSuccess("Logged out successfully");
      setShowLogoutModal(false);
      setTimeout(() => { window.location.href = "/"; }, 500);
    } catch (err) {
      dismissToast();
      showError("Logout failed");
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Fundraisers", href: "/fundraisers" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 h-16 font-['Outfit']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex justify-between items-center">
        
        {/* ================= Logo ================= */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image src="/image.png" alt="DonateCare Logo" width={150} height={35} priority />
        </Link>

        {/* ================= Desktop Navigation ================= */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-semibold transition-colors ${
                pathname === link.href ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* ================= Right Section (Desktop) ================= */}
        <div className="hidden lg:flex items-center gap-4">
          {!isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <button className="text-slate-600 hover:text-blue-600 text-sm font-bold px-4 py-2 rounded-md transition-colors">
                  Login
                </button>
              </Link>
              <Link href="/signUp">
                <button className="bg-blue-600 text-white text-sm font-bold px-5 py-2 rounded-md hover:bg-blue-700 shadow-sm transition-all flex items-center gap-2">
                  <UserPlus size={16} />
                  Join Now
                </button>
              </Link>
            </div>
          ) : (
            <div className="relative profile-menu-container">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1 pl-2 border border-slate-200 rounded-full hover:bg-slate-50 transition-all"
              >
                <span className="text-xs font-bold text-slate-600">Menu</span>
                <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                  {profileImage ? (
                    <img src={`/uploads/${profileImage}`} className="w-full h-full object-cover" alt="User" />
                  ) : (
                    <User size={16} className="m-2 text-slate-400" />
                  )}
                </div>
                <ChevronDown size={14} className={`text-slate-400 mr-1 transition-transform ${showProfileMenu ? "rotate-180" : ""}`} />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-xl py-1 z-[60] overflow-hidden">
                  <Link
                    href="/profile"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <User size={16} className="text-slate-400" />
                    My Profile
                  </Link>
                  <Link
                    href="/my-donation"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <Heart size={16} className="text-slate-400" />
                    My Donations
                  </Link>
                  <div className="h-px bg-slate-100 my-1"></div>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      setShowLogoutModal(true);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-bold transition-colors"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ================= Mobile Menu Button ================= */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100 transition-all"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ================= Mobile Menu Panel ================= */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-white border-b border-slate-200 py-4 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-1 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-md text-sm font-bold transition-all ${
                  pathname === link.href ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {!isLoggedIn ? (
              <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full py-2.5 rounded-md font-bold text-slate-600 border border-slate-200 text-sm">Login</button>
                </Link>
                <Link href="/signUp" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full py-2.5 rounded-md font-bold text-white bg-blue-600 text-sm">Sign Up</button>
                </Link>
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-1">
                <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-sm font-bold text-slate-600 flex items-center gap-3">
                  <User size={18}/> My Profile
                </Link>
                <Link href="/my-donation" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-sm font-bold text-slate-600 flex items-center gap-3">
                  <Heart size={18}/> My Donations
                </Link>
                <button onClick={() => setShowLogoutModal(true)} className="px-4 py-3 text-sm font-bold text-red-600 flex items-center gap-3">
                  <LogOut size={18}/> Logout Account
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Logout Confirmation */}
      <CustomModel
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Logout Account"
        description="Are you sure you want to log out? You will need to login again to view your donor dashboard."
        Delete="Logout"
      />
    </nav>
  );
};

export default Navbar;
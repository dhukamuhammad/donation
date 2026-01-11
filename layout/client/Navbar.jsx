"use client";
import React, { useEffect, useState } from "react";
import { Heart, Menu, X, LogIn, UserPlus, User, LogOut } from "lucide-react";
import Link from "next/link";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  /* ================= Auth ================= */
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

    return () => {
      window.removeEventListener("auth-changed", updateAuth);
    };
  }, []);

  /* ================= Profile API ================= */
  const fetchUserById = async (userId) => {
    try {
      const res = await axiosInstance.get(`/auth/signup/${userId}`);
      setProfileImage(res.data?.profile_img || null);
    } catch (err) {
      console.error(err);
      setProfileImage(null);
    }
  };

  /* ================= Real-time Same-tab Update ================= */
  useEffect(() => {
    const handler = (e) => {
      setProfileImage(e.detail);
    };

    window.addEventListener("profile-image-updated", handler);
    return () => window.removeEventListener("profile-image-updated", handler);
  }, []);

  /* ================= Outside Click Close ================= */
  useEffect(() => {
    const closeMenu = (e) => {
      if (!e.target.closest(".profile-menu")) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      window.addEventListener("click", closeMenu);
    }

    return () => window.removeEventListener("click", closeMenu);
  }, [showProfileMenu]);

  /* ================= Logout ================= */
  // const handleLogout = () => {

  //   localStorage.removeItem("token");
  //   localStorage.removeItem("userId");

  //   setIsLoggedIn(false);
  //   setShowProfileMenu(false);
  //   setProfileImage(null);

  //   window.dispatchEvent(new Event("auth-changed"));
  //   window.location.href = "/";
  //   setShowLogoutModal(false);
  // };

  const handleLogout = async () => {
    const loading = showLoading("Logging out...");

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

      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } catch (err) {
      dismissToast();
      showError("Logout failed");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-5">
        <div className="flex justify-between items-center h-16">
          {/* ================= Logo ================= */}
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#2563EB] to-blue-600 bg-clip-text text-transparent">
              <Image src="/image.png" alt="Logo" width={170} height={0} />
            </span>
          </div>

          {/* ================= Desktop Links ================= */}
          <div className="hidden lg:flex items-center gap-8 ml-[-7rem]">
            <Link
              href="/"
              className="text-gray-700 hover:text-[#2563EB] font-medium transition"
            >
              Home
            </Link>
            <Link
              href="/fundraisers"
              className="text-gray-700 hover:text-[#2563EB] font-medium transition"
            >
              Fundraisers
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-[#2563EB] font-medium transition"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-[#2563EB] font-medium transition"
            >
              Contact
            </Link>
          </div>

          {/* ================= Right Section ================= */}
          <div className="hidden lg:flex items-center gap-3">
            {!isLoggedIn ? (
              <div className="flex ">
                <Link href="/login">
                  <button className="flex items-center gap-2 text-gray-700 hover:text-[#2563EB] font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                    <LogIn size={18} />
                    Login
                  </button>
                </Link>

                <Link href="/signUp">
                  <button className="flex items-center gap-2 bg-[#2563EB] text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium shadow-md">
                    <UserPlus size={18} />
                    Sign Up
                  </button>
                </Link>
              </div>
            ) : (
              <div className="relative profile-menu">
                {/* Avatar */}
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-9 h-9 rounded-full bg-[#2563EB] flex items-center justify-center text-white hover:opacity-90 transition"
                >
                  {profileImage ? (
                    <img
                      src={`/uploads/${profileImage}`}
                      className="w-full h-full object-cover rounded-full"
                      alt="Profile"
                    />
                  ) : (
                    <User size={18} />
                  )}
                </button>

                {/* ================= Profile Popup ================= */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                    <Link
                      href="/profile"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    >
                      <User size={16} />
                      My Profile
                    </Link>

                    <Link
                      href="/my-donation"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    >
                      <Heart size={16} />
                      My Donations
                    </Link>

                    <button
                      onClick={() => setShowLogoutModal(true)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
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
            className="lg:hidden text-gray-700 hover:text-[#2563EB] p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ================= Mobile Menu ================= */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-3">
              <Link href="/" className="px-4 py-2 hover:bg-gray-50 rounded">
                Home
              </Link>
              <Link
                href="/fundraisers"
                className="px-4 py-2 hover:bg-gray-50 rounded"
              >
                Fundraisers
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 hover:bg-gray-50 rounded"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 hover:bg-gray-50 rounded"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
      <CustomModel
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Confirm Logout"
        description="Are you sure you want to logout from this website?"
        Delete="Logout"
      />
    </nav>
  );
};

export default Navbar;

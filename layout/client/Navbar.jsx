"use client";
import React, { useEffect, useState } from "react";
import { Heart, Menu, X, LogIn, UserPlus, User, LogOut } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left - Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#2563EB] to-blue-600 bg-clip-text text-transparent">
              Donation
            </span>
          </div>

          {/* Center - Pages */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-[#2563EB] font-medium transition">
              Home
            </Link>
            <Link href="/fundraisers" className="text-gray-700 hover:text-[#2563EB] font-medium transition">
              Fundraisers
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-[#2563EB] font-medium transition">
              About
            </Link>
            <a href="/contact" className="text-gray-700 hover:text-[#2563EB] font-medium transition">
              Contact
            </a>
          </div>

          {/* Right - Login / Signup OR Profile / Logout */}
          <div className="hidden lg:flex items-center gap-3">
            {!isLoggedIn ? (
              <div>
                <Link href="/login">
                  <button className="flex items-center gap-2 text-gray-700 hover:text-[#2563EB] font-medium transition px-4 py-2 rounded-lg hover:bg-gray-50">
                    <LogIn size={18} />
                    <span>Login</span>
                  </button>
                </Link>

                <Link href="/signUp">
                  <button className="flex items-center gap-2 bg-[#2563EB] text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium shadow-md">
                    <UserPlus size={18} />
                    <span>Sign Up</span>
                  </button>
                </Link>
              </div>
            ) : (
              <div>
                <Link href="/profile">
                  <button className="flex items-center gap-2 text-gray-700 hover:text-[#2563EB] font-medium transition px-4 py-2 rounded-lg hover:bg-gray-50">
                    <User size={18} />
                    <span>Profile</span>
                  </button>
                </Link>

                {/* Logout Button 
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition font-medium shadow-md"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
                */}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gray-700 hover:text-[#2563EB] p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-3">
              <a href="/" className="text-gray-700 hover:text-[#2563EB] font-medium transition py-2 px-4 rounded-lg hover:bg-gray-50">
                Home
              </a>
              <a href="/fundraisers" className="text-gray-700 hover:text-[#2563EB] font-medium transition py-2 px-4 rounded-lg hover:bg-gray-50">
                Fundraisers
              </a>
              <a href="/about" className="text-gray-700 hover:text-[#2563EB] font-medium transition py-2 px-4 rounded-lg hover:bg-gray-50">
                About
              </a>
              <a href="/contact" className="text-gray-700 hover:text-[#2563EB] font-medium transition py-2 px-4 rounded-lg hover:bg-gray-50">
                Contact
              </a>

              <div className="border-t border-gray-200 pt-3 mt-2 space-y-2">
                {!isLoggedIn ? (
                  <div>
                    <Link href="/login">
                      <button className="w-full flex items-center justify-center gap-2 text-gray-700 hover:text-[#2563EB] font-medium transition px-4 py-2.5 rounded-lg hover:bg-gray-50">
                        <LogIn size={18} />
                        <span>Login</span>
                      </button>
                    </Link>

                    <Link href="/signUp">
                      <button className="w-full flex items-center justify-center gap-2 bg-[#2563EB] text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium">
                        <UserPlus size={18} />
                        <span>Sign Up</span>
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div>
                    <Link href="/profile">
                      <button className="w-full flex items-center justify-center gap-2 text-gray-700 hover:text-[#2563EB] font-medium transition px-4 py-2.5 rounded-lg hover:bg-gray-50">
                        <User size={18} />
                        <span>Profile</span>
                      </button>
                    </Link>

                    {/* Logout Button 
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2.5 rounded-lg hover:bg-red-600 transition font-medium"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                    */}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

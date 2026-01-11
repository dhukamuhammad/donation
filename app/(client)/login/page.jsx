"use client";

import { useId, useState } from "react";
import Link from "next/link";
import axiosInstance from "@/lib/axiosinstance";
import { useRouter } from "next/navigation";

import { showSuccess, showError } from "@/components/Toaster";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1 = send OTP, 2 = verify OTP

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    otp: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // STEP 1: Send OTP
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await axiosInstance.post("/auth/login", {
  //       email: formData.email,
  //       phone: formData.phone,
  //     });

  //     console.log("userId", res.data.userId);

  //     // OTP verify ke liye save
  //     localStorage.setItem("otpUserId", res.data.userId);

  //     showSuccess("OTP sent to your email 📧");
  //     setStep(2);
  //   } catch (error) {
  //     showError(error.response?.data?.error || "Failed to send OTP");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/auth/login", {
        email: formData.email,
        phone: formData.phone,
      });

      const userId = res.data.userId;
      console.log(userId);

      // OTP verify ke liye save
      localStorage.setItem("userId", userId);

      showSuccess("OTP sent to your email 📧");
      setStep(2);
    } catch (error) {
      showError(error.response?.data?.error || "Failed to send OTP");
    }
  };

  // STEP 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/auth/verify-otp", {
        email: formData.email,
        phone: formData.phone,
        otp: formData.otp,
      });

      localStorage.setItem("token", res.data.token);

      window.dispatchEvent(new Event("auth-changed"));

      router.push("/profile");
      showSuccess("Login successful ✅");
    } catch (error) {
      showError(error.response?.data?.error || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Welcome Back
          </h2>

          {/* STEP 1 FORM (EMAIL + PHONE) */}
          {step === 1 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Phone Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
              >
                Login
              </button>
            </form>
          )}

          {/* STEP 2 FORM (OTP) */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter OTP"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
              >
                Verify OTP
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Signup Link */}
          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/signUp"
              className="text-blue-600 font-semibold hover:text-blue-800"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

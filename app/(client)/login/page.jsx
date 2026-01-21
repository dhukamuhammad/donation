"use client";

import { useState } from "react";
import Link from "next/link";
import axiosInstance from "@/lib/axiosinstance";
import { useRouter } from "next/navigation";
import {
  Mail,
  Phone,
  KeyRound,
  ShieldCheck,
  ArrowRight,
  ChevronLeft,
  Loader2,
} from "lucide-react";
import { z } from "zod";
import { showSuccess, showError } from "@/components/Toaster";

/* ================= ZOD SCHEMAS ================= */

const step1Schema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[6-9]\d{9}$/, "Invalid Indian phone number"),
});

const step2Schema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

export default function LoginPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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

    // clear error on typing
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: undefined,
    }));
  };

  /* ================= STEP 1: SEND OTP ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const result = step1Schema.safeParse({
      email: formData.email,
      phone: formData.phone,
    });

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", {
        email: formData.email,
        phone: formData.phone,
      });

      localStorage.setItem("userId", res.data.userId);
      showSuccess("OTP sent to your email 📧");
      setStep(2);
    } catch (error) {
      showError(error.response?.data?.error || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ================= STEP 2: VERIFY OTP ================= */

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrors({});

    const result = step2Schema.safeParse({
      otp: formData.otp,
    });

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-['Outfit']">
      <div className="w-full max-w-[420px]">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {step === 1 ? "Welcome Back" : "Verify Identity"}
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              {step === 1
                ? "Login to access your donor dashboard."
                : `Enter the code sent to ${formData.email}`}
            </p>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-blue-600 outline-none"
                    placeholder="name@example.com"
                    disabled={loading}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1 ml-1">
                    {errors.email[0]}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-blue-600 outline-none"
                    placeholder="9876543210"
                    disabled={loading}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1 ml-1">
                    {errors.phone[0]}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-bold text-sm"
              >
                {loading ? "Sending OTP..." : "Send Verification Code"}
              </button>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1 text-center block">
                  6-Digit Verification Code
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    maxLength={6}
                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-lg text-lg font-bold tracking-[0.5em] text-center focus:bg-white focus:border-blue-600 outline-none"
                    placeholder="000000"
                    disabled={loading}
                  />
                </div>
                {errors.otp && (
                  <p className="text-xs text-red-500 mt-1 text-center">
                    {errors.otp[0]}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-bold text-sm"
              >
                {loading ? "Verifying..." : "Verify & Login"}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-slate-400 text-xs font-bold"
                disabled={loading}
              >
                <ChevronLeft size={14} className="inline" /> Back to login
              </button>
            </form>
          )}

          <p className="text-center text-sm text-slate-500 mt-8">
            Don’t have an account?{" "}
            <Link href="/signUp" className="text-blue-600 font-bold">
              Sign Up Now
            </Link>
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
          <ShieldCheck size={16} className="text-green-500" />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Secure 256-bit SSL Encryption
          </span>
        </div>
      </div>
    </div>
  );
}

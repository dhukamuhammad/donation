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
  ChevronLeft 
} from "lucide-react";

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

  /* ================= STEP 1: Send OTP ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login", {
        email: formData.email,
        phone: formData.phone,
      });

      const userId = res.data.userId;
      localStorage.setItem("userId", userId);

      showSuccess("OTP sent to your email 📧");
      setStep(2);
    } catch (error) {
      showError(error.response?.data?.error || "Failed to send OTP");
    }
  };

  /* ================= STEP 2: Verify OTP ================= */
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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-['Outfit']">
      <div className="w-full max-w-[420px]">
        
        {/* Login Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 md:p-10">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {step === 1 ? "Welcome Back" : "Verify OTP"}
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              {step === 1 
                ? "Login to access your donor dashboard." 
                : `Enter the code sent to ${formData.email}`}
            </p>
          </div>

          {/* STEP 1: Email & Phone */}
          {step === 1 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
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
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-blue-600 outline-none transition-all"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
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
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-blue-600 outline-none transition-all"
                    placeholder="+91 00000 00000"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-bold text-sm hover:bg-blue-700 shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Send Verification Code
                <ArrowRight size={18} />
              </button>
            </form>
          )}

          {/* STEP 2: OTP Verification */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="space-y-1.5">
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
                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-lg text-lg font-bold tracking-[0.5em] text-center focus:bg-white focus:border-blue-600 outline-none transition-all"
                    placeholder="000000"
                    maxLength={6}
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-bold text-sm hover:bg-blue-700 shadow-sm active:scale-[0.98] transition-all"
                >
                  Verify & Login
                </button>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full flex items-center justify-center gap-1 text-slate-400 hover:text-slate-600 text-xs font-bold transition-colors"
                >
                  <ChevronLeft size={14} />
                  Back to login info
                </button>
              </div>
            </form>
          )}

          {/* Footer Link */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-[0.2em]">
              <span className="px-4 bg-white text-slate-300 italic">DonateCare Secure</span>
            </div>
          </div>

          <p className="text-center text-sm text-slate-500 font-medium">
            Don't have an account?{" "}
            <Link href="/signUp" className="text-blue-600 font-bold hover:underline">
              Sign Up Now
            </Link>
          </p>
        </div>

        {/* Security Trust Badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
          <ShieldCheck size={16} className="text-green-500" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Secure 256-bit SSL Encryption</span>
        </div>

      </div>
    </div>
  );
}
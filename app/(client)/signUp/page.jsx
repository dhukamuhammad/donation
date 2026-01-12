"use client";
import { useState } from "react";
import Link from "next/link";
import axiosInstance from "@/lib/axiosinstance";
import { showSuccess, showError } from "@/components/Toaster";
import { User, Mail, Phone, ShieldCheck, ArrowRight } from "lucide-react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.terms) {
      showError("Please accept terms & conditions");
      return;
    }

    try {
      const res = await axiosInstance.post("/auth/signup", formData);

      setFormData({
        name: "",
        email: "",
        phone: "",
        terms: false,
      });
      showSuccess("Signup successful ✅");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      showError(error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-['Outfit']">
      <div className="w-full max-w-[450px]">
        
        {/* Signup Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 md:p-10">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Create Account</h2>
            <p className="text-sm text-slate-500 font-medium">Join our mission to create a lasting impact.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Name Field */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-blue-600 outline-none transition-all"
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-blue-600 outline-none transition-all"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="space-y-1.5">
              <label htmlFor="phone" className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-blue-600 outline-none transition-all"
                  placeholder="+91 00000 00000"
                  required
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start pt-2">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-600 cursor-pointer"
                  required
                />
              </div>
              <label htmlFor="terms" className="ml-3 text-xs text-slate-500 font-medium leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-blue-600 hover:underline font-bold">
                  Terms & Conditions
                </Link>{" "}
                and acknowledge the privacy policy.
              </label>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-bold text-sm hover:bg-blue-700 shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Create My Account
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
              <span className="px-4 bg-white text-slate-400">Secure Registration</span>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-slate-500 font-medium">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 font-bold hover:underline">
                Login here
              </Link>
            </p>
          </div>

        </div>

        {/* Footer Trust Badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
          <ShieldCheck size={16} />
          <span className="text-[11px] font-bold uppercase tracking-widest">100% Secure & Verified Platform</span>
        </div>

      </div>
    </div>
  );
}
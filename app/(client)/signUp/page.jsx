"use client";
import { useState } from "react";
import Link from "next/link";
import axiosInstance from "@/lib/axiosinstance";
import { showSuccess, showError } from "@/components/Toaster";
import { User, Mail, Phone, ShieldCheck, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { z } from "zod"; // 1. Zod import kiya

/* =======================
    Zod Validation Schema
   ======================= */
const signupSchema = z.object({
  name: z.string().trim().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  terms: z.literal(true, {
    errorMap: () => ({ message: "Please accept terms & conditions" }),
  }),
});

// sequential validation ke liye order define kiya
const fieldOrder = ["name", "email", "phone", "terms"];

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    terms: false,
  });

  const [errors, setErrors] = useState({}); // 2. Errors state add ki

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // Type karte waqt error hatane ke liye
    if (errors[name]) setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Pehle ke errors clear karein

    // 3. Zod Validation Logic
    const result = signupSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      // Line-by-line logic: pehla field dhundo jisme error hai
      const firstErrorField = fieldOrder.find((field) => fieldErrors[field]);

      if (firstErrorField) {
        setErrors({ [firstErrorField]: fieldErrors[firstErrorField][0] });
        showError(fieldErrors[firstErrorField][0]); // Toast mein bhi error dikhayega
      }
      return;
    }

    try {
      // Backend API call
      const res = await axiosInstance.post("/auth/signup", formData);

      setFormData({
        name: "",
        email: "",
        phone: "",
        terms: false,
      });
      showSuccess("Signup successful ✅");
      router.push("/login");
    } catch (error) {
      if (error.response) {
        showError(error.response.data.error || "Signup failed");
      } else {
        showError("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-['Outfit']">
      <div className="w-full max-w-[450px]">
        {/* Signup Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 md:p-10">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Create Account
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Join our mission to create a lasting impact.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Input Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1"
              >
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  // Error hone par border red ho jayega
                  className={`w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-lg text-sm focus:bg-white focus:border-blue-600 outline-none transition-all ${errors.name ? "border-red-500" : "border-slate-200"}`}
                  placeholder="Enter your name"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-[11px] mt-1 font-semibold ml-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Address Input Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-lg text-sm focus:bg-white focus:border-blue-600 outline-none transition-all ${errors.email ? "border-red-500" : "border-slate-200"}`}
                  placeholder="name@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-[11px] mt-1 font-semibold ml-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone Number Input Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="phone"
                className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1"
              >
                Phone Number
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-lg text-sm focus:bg-white focus:border-blue-600 outline-none transition-all ${errors.phone ? "border-red-500" : "border-slate-200"}`}
                  placeholder="+91 00000 00000"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-[11px] mt-1 font-semibold ml-1">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Terms & Conditions Checkbox Section */}
            <div className="flex items-start pt-2">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-600 cursor-pointer"
                />
              </div>
              <label
                htmlFor="terms"
                className="ml-3 text-xs text-slate-500 font-medium leading-relaxed"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-blue-600 hover:underline font-bold"
                >
                  Terms & Conditions
                </Link>{" "}
                and acknowledge the privacy policy.
              </label>
            </div>
            {/* sequential error display for terms */}
            {errors.terms && (
              <p className="text-red-500 text-[11px] font-semibold ml-1">
                {errors.terms}
              </p>
            )}

            {/* Signup Button Section */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-bold text-sm hover:bg-blue-700 shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Create My Account
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Visual Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
              <span className="px-4 bg-white text-slate-400">
                Secure Registration
              </span>
            </div>
          </div>

          {/* Bottom Link to Login Page */}
          <div className="text-center">
            <p className="text-sm text-slate-500 font-medium">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 font-bold hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Security Badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
          <ShieldCheck size={16} />
          <span className="text-[11px] font-bold uppercase tracking-widest">
            100% Secure & Verified Platform
          </span>
        </div>
      </div>
    </div>
  );
}

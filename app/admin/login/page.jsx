"use client";
import React, { useState } from "react";
import { Lock, User, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { showError, showSuccess } from "@/components/Toaster";
import axiosInstance from "@/lib/axiosinstance";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axiosInstance.post("/auth/admin/login", formData);
            if (res.data.success) {
                showSuccess("Authenticated successfully.");
                router.push("/admin/dashboard");
            }
        } catch (error) {
            showError("Invalid administrator credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 font-['Outfit']">

            {/* --- Branding Section --- */}
            <div className="mb-8 flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-lg shadow-sm">
                    <ShieldCheck className="text-white" size={24} strokeWidth={2.5} />
                </div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                    DonateCare <span className="text-blue-600">Admin</span>
                </h1>
            </div>

            {/* --- Login Container --- */}
            <div className="w-full max-w-[400px] bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="p-8">
                    <div className="mb-8 text-left">
                        <h2 className="text-lg font-bold text-slate-800">Sign in</h2>
                        <p className="text-sm text-slate-500 mt-1">Access the central control panel.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">

                        {/* Username Field */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-0.5">
                                Username
                            </label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                    <User size={18} strokeWidth={2} />
                                </div>
                                <input
                                    type="text"
                                    name="username"
                                    required
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    placeholder="Enter username"
                                    className="w-full bg-white border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-300"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-0.5">
                                    Password
                                </label>
                                <button type="button" className="text-[10px] font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wider">
                                    Reset?
                                </button>
                            </div>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                    <Lock size={18} strokeWidth={2} />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="••••••••"
                                    className="w-full bg-white border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-300"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest shadow-sm shadow-blue-600/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
                        >
                            {loading ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : (
                                <>
                                    Enter Dashboard <ArrowRight size={14} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer info inside card */}
                <div className="bg-slate-50 px-8 py-4 border-t border-slate-100">
                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                        Security Note: This is a restricted area. Unauthorized access attempts are monitored and logged.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
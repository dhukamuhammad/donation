"use client";
import React, { useEffect, useState } from "react";
import { 
  Settings, 
  ShieldCheck, 
  Zap, 
  CreditCard, 
  CheckCircle2, 
  Loader2,
  AlertCircle,
  Landmark
} from "lucide-react";
import axiosInstance from "@/lib/axiosinstance";
import { showSuccess, showError } from "@/components/Toaster";

const SettingsPage = () => {
  const [active, setActive] = useState("");
  const [switching, setSwitching] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await axiosInstance.get("payment/settings");
      setActive(res.data.active_gateway);
    } catch (error) {
      showError("System configuration sync failed.");
    }
  };

  const handleSwitch = async (name) => {
    if (active === name) return;
    
    setSwitching(true);
    try {
      await axiosInstance.post("payment/settings", { gateway: name });
      setActive(name);
      showSuccess(`Infrastructure switched to ${name.toUpperCase()}`);
    } catch (error) {
      showError("Gateway migration failed. Verify server logs.");
    } finally {
      setSwitching(false);
    }
  };

  return (
    <div className="p-6 lg:p-6 bg-[#F8FAFC] min-h-screen font-['Outfit']">
      
      {/* --- Page Header --- */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">System Infrastructure</h1>
        </div>
        <p className="text-sm text-slate-500 font-medium ml-1">Configure primary payment routing and gateway parameters.</p>
      </div>

      <div className="max-w-4xl space-y-6">
        
        {/* --- Gateway Selection Grid --- */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-nowrap">
          <div className="p-5 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
               <ShieldCheck size={16} className="text-blue-600" />
               <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Payment Routing Control</span>
            </div>
            {switching && (
              <div className="flex items-center gap-2 text-blue-600">
                <Loader2 size={14} className="animate-spin" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Applying Changes...</span>
              </div>
            )}
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Razorpay Card */}
            <div 
              onClick={() => !switching && handleSwitch("razorpay")}
              className={`relative p-6 rounded-xl border-2 transition-all cursor-pointer group ${
                active === "razorpay" 
                ? "border-blue-600 bg-blue-50/30 shadow-md shadow-blue-600/5" 
                : "border-slate-100 bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${active === "razorpay" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                  <Zap size={20} strokeWidth={2.5} />
                </div>
                {active === "razorpay" && (
                  <span className="flex items-center gap-1 text-[10px] font-black text-blue-600 uppercase tracking-widest bg-white px-2 py-1 rounded border border-blue-200">
                    <CheckCircle2 size={12} /> Active
                  </span>
                )}
              </div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Razorpay Standard</h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">Native Indian UPI, Cards & Netbanking interface.</p>
              
              <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <Landmark size={12} /> Verified Settlement
              </div>
            </div>

            {/* Cashfree Card */}
            <div 
              onClick={() => !switching && handleSwitch("cashfree")}
              className={`relative p-6 rounded-xl border-2 transition-all cursor-pointer group ${
                active === "cashfree" 
                ? "border-emerald-600 bg-emerald-50/30 shadow-md shadow-emerald-600/5" 
                : "border-slate-100 bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${active === "cashfree" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                  <CreditCard size={20} strokeWidth={2.5} />
                </div>
                {active === "cashfree" && (
                  <span className="flex items-center gap-1 text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-white px-2 py-1 rounded border border-emerald-200">
                    <CheckCircle2 size={12} /> Active
                  </span>
                )}
              </div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Cashfree Payments</h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">Enterprise payout and bulk donation processing.</p>
              
              <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <Landmark size={12} /> Scalable Infrastructure
              </div>
            </div>

          </div>
        </div>

        {/* --- Caution Note --- */}
        <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="text-amber-500 mt-0.5" size={18} />
          <div>
            <p className="text-[11px] font-bold text-amber-800 uppercase tracking-widest">Operational Notice</p>
            <p className="text-xs text-amber-700/80 mt-1 font-medium leading-relaxed">
              Switching the gateway will affect all live checkout sessions. Ensure no high-volume traffic is active during migration. Current routing: <span className="font-black uppercase">{active}</span>.
            </p>
          </div>
        </div>

      </div>

      {/* Footer System Meta */}
      <div className="mt-12 pt-8 border-t border-slate-200/60 flex items-center justify-center gap-6">
         <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]">
            <span>Security Engine 4.0</span>
            <span className="w-1 h-1 rounded-full bg-slate-200"></span>
            <span>PCI DSS Compliant</span>
            <span className="w-1 h-1 rounded-full bg-slate-200"></span>
            <span>2026 Admin Panel</span>
         </div>
      </div>

    </div>
  );
};

export default SettingsPage;
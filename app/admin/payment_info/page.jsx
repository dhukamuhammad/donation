"use client";
import React, { useEffect, useState } from "react";
import { 
  CreditCard, 
  Mail, 
  Phone, 
  Calendar, 
  CheckCircle2, 
  Loader2,
  ArrowUpRight,
  TrendingUp,
  Globe
} from "lucide-react";
import axiosInstance from "@/lib/axiosinstance";
import { showError } from "@/components/Toaster";

const PaymentInfo = () => {
  // ================= STATE =================
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH DATA =================
  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axiosInstance.get("/payment");
      setPayments(res.data);
    } catch (error) {
      console.error("Fetch Error:", error);
      showError("Failed to synchronize transaction records");
    } finally {
      setLoading(false);
    }
  };

  // Helper: Currency Formatter (Industrial Standard)
  const formatINR = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amt);
  };

  return (
    <div className="p-6 lg:p-6 bg-[#F8FAFC] min-h-screen font-['Outfit']">
      
      {/* --- Dashboard Header --- */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
          
             <h1 className="text-2xl font-black text-slate-900 tracking-tight">Financial Ledger</h1>
          </div>
          <p className="text-sm text-slate-500 font-medium ml-1">Official record of all incoming donations and platform contributions.</p>
        </div>
        

      </div>

      {/* --- Data Table Container --- */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-nowrap">
        
        {/* Table Toolbar */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
           <div className="flex items-center gap-2">
              <Globe size={14} className="text-blue-600" />
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Transaction Registry</span>
           </div>
           <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-md border border-blue-100 uppercase tracking-widest">
             Records: {payments.length}
           </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-1 text-center">ID</th>
                <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Donor Detail</th>
                <th className=" text-[11px] font-bold text-slate-400 uppercase tracking-widest text-left">Type</th>
                <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-left">Settlement Date</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-24 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="text-blue-600 animate-spin" size={32} />
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Syncing Records...</p>
                    </div>
                  </td>
                </tr>
              ) : (
                payments.map((txn, index) => (
                  <tr key={txn.id} className="hover:bg-slate-50/80 transition-all group">
                    {/* Index ID */}
                    <td className="p-5 text-xs font-bold text-slate-300 text-center group-hover:text-blue-600">
                      #{ (index + 1).toString().padStart(2, '0') }
                    </td>
                    
                    {/* Donor Details */}
                    <td className="p-5">
                      <div className="flex flex-col">
                        <span className="text-[15px] font-bold text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">
                          {txn.name}
                        </span>
                        <div className="flex items-center gap-4 mt-1.5">
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-bold">
                            <Mail size={12} className="text-slate-300" /> {txn.email}
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-bold">
                            <Phone size={12} className="text-slate-300" /> {txn.mobile_no}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Donation Type Indicator */}
                    <td className="text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg group-hover:border-blue-200 transition-colors">
                        <CheckCircle2 size={13} className="text-blue-600" strokeWidth={2.5} />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          {txn.donation_type}
                        </span>
                      </div>
                    </td>

                    {/* Amount Block */}
                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        <span className="text-[16px] font-black text-slate-900 tracking-tight">
                          {formatINR(txn.amount)}
                        </span>
                        <ArrowUpRight size={14} className="text-green-500" />
                      </div>
                    </td>

                    {/* Timestamp */}
                    <td className=" text-left">
                      <div className="inline-flex flex-col items-center">
                        <div className="flex items-center gap-2 text-slate-600 text-[12px] font-bold">
                          <Calendar size={13} className="text-slate-300" />
                          {new Date(txn.created_date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                        <span className="text-[9px] text-slate-400 font-bold mt-0.5 uppercase tracking-tighter italic">
                          Verified Transaction
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {!loading && payments.length === 0 && (
          <div className="text-center py-24 bg-white">
            <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-100 rotate-3">
               <CreditCard className="text-slate-200" size={40} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">No Transactions Recorded</h3>
            <p className="text-slate-400 text-sm mt-1 max-w-xs mx-auto">Verified donation records will be automatically synchronized here.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default PaymentInfo;
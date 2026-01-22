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
  Globe,
  X,
} from "lucide-react";
import axiosInstance from "@/lib/axiosinstance";
import { showError } from "@/components/Toaster";

const PaymentInfo = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchName, setSearchName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axiosInstance.get("/payment");
      setPayments(res.data);
    } catch (error) {
      showError("Failed to synchronize transaction records");
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments = payments.filter((txn) => {
    const nameMatch = txn.name
      ?.toLowerCase()
      .includes(searchName.toLowerCase());

    const txnDate = new Date(txn.created_date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    return (
      nameMatch && (!start || txnDate >= start) && (!end || txnDate <= end)
    );
  });

  const formatINR = (amt) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amt);

  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="text-blue-500 font-black">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      ),
    );
  };

  const clearDateFilter = () => {
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen font-['Outfit']">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-black text-slate-900">Financial Ledger</h1>
        <p className="text-sm text-slate-500">
          Official record of all incoming donations and platform contributions.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-nowrap">
        {/* Toolbar */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/30 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <Globe size={14} className="text-blue-600" />
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              Transaction Registry
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="text-xs px-3 py-1.5 border border-slate-200 rounded-md"
            />

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="text-xs px-2 py-1.5 border border-slate-200 rounded-md"
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="text-xs px-2 py-1.5 border border-slate-200 rounded-md"
            />

            {(startDate || endDate) && (
              <button
                onClick={clearDateFilter}
                className="p-1.5 border border-slate-200 rounded-md hover:bg-slate-100"
              >
                <X size={12} />
              </button>
            )}

            <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-md border border-blue-100 uppercase">
              Records: {filteredPayments.length}
            </span>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">
                  ID
                </th>
                <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Donor Detail
                </th>
                <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Type
                </th>
                <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Amount
                </th>
                <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Settlement Date
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-24 text-center">
                    <Loader2
                      className="animate-spin text-blue-600 mx-auto"
                      size={32}
                    />
                  </td>
                </tr>
              ) : (
                filteredPayments.map((txn, index) => {
                  const formattedDate = new Date(
                    txn.created_date,
                  ).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  });

                  return (
                    <tr key={txn.id} className="hover:bg-slate-50/80">
                      <td className="p-5 text-xs font-bold text-slate-300 text-center">
                        #{(index + 1).toString().padStart(2, "0")}
                      </td>

                      <td className="p-5">
                        <span className="text-[15px] font-bold text-slate-800">
                          {highlightText(txn.name, searchName)}
                        </span>
                        <div className="flex gap-4 mt-1.5 text-xs text-slate-400 font-bold">
                          <span className="flex items-center gap-1">
                            <Mail size={12} /> {txn.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone size={12} /> {txn.mobile_no}
                          </span>
                        </div>
                      </td>

                      <td className="p-5">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
                          <CheckCircle2 size={13} className="text-blue-600" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                            {txn.donation_type}
                          </span>
                        </div>
                      </td>

                      <td className="p-5">
                        <div className="flex items-center gap-2">
                          <span className="text-[16px] font-black text-slate-900">
                            {formatINR(txn.amount)}
                          </span>
                          <ArrowUpRight size={14} className="text-green-500" />
                        </div>
                      </td>

                      <td className="p-5">
                        <div className="flex items-center gap-2 text-xs font-bold">
                          <Calendar size={13} />
                          {startDate || endDate ? (
                            <span className="text-blue-500 font-black">
                              {formattedDate}
                            </span>
                          ) : (
                            <span className="text-slate-600">
                              {formattedDate}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {!loading && filteredPayments.length === 0 && (
          <div className="text-center py-24">
            <CreditCard size={40} className="mx-auto text-slate-200" />
            <h3 className="mt-4 font-bold text-slate-900">
              No Transactions Found
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentInfo;

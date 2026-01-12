"use client";
import React, { useState } from "react";
import { X, CreditCard, User, Phone, Mail, ShieldCheck, Heart } from "lucide-react";
import axiosInstance from "@/lib/axiosinstance";

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const DonationModal = ({ isOpen, onClose, fundId, onsuccess }) => {
  const [amount, setAmount] = useState(0);
  const [showCustom, setShowCustom] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    donationType: "",
  });

  if (!isOpen) return null;

  const predefinedAmounts = [500, 1000, 2500, 5000];

  const startPayment = async () => {
    const userId = localStorage.getItem("userId");

    if (!amount || !form.name || !form.phone || !form.email || !form.donationType) {
      alert("Please fill all required fields");
      return;
    }

    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    try {
      const orderRes = await axiosInstance.post("payment/create-order", { amount });
      const order = orderRes.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "DonateCare Foundation",
        description: "Contribution for social cause",
        order_id: order.id,
        handler: async function (response) {
          const res = await axiosInstance.post("payment/save-donation", {
            fundId,
            amount,
            name: form.name,
            email: form.email,
            phone: form.phone,
            donationType: form.donationType,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          localStorage.setItem("donatedFundId", res.data.fundId);
          alert("Thank you! Your donation was successful.");
          onsuccess();
          onClose();
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#2563eb" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden font-['Outfit'] border border-slate-200">
        
        {/* Modal Header */}
        <div className="bg-slate-50 border-b border-slate-200 p-5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-blue-600" fill="currentColor" />
            <h2 className="text-lg font-bold text-slate-800">Complete Your Donation</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-slate-200 text-slate-400 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          
          {/* Amount Selection Section */}
          <div className="space-y-3">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Select Amount (INR)</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {predefinedAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => { setAmount(amt); setShowCustom(false); }}
                  className={`py-2 text-sm font-bold rounded-lg border transition-all ${
                    amount === amt && !showCustom
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-white border-slate-200 text-slate-600 hover:border-blue-600 hover:text-blue-600"
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
              <button
                onClick={() => { setAmount(0); setShowCustom(true); }}
                className={`py-2 text-sm font-bold rounded-lg border transition-all ${
                  showCustom
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-white border-slate-200 text-slate-600 hover:border-blue-600 hover:text-blue-600"
                }`}
              >
                Other
              </button>
            </div>

            {showCustom && (
              <div className="relative mt-3">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                <input
                  type="number"
                  onChange={(e) => setAmount(Number(e.target.value) || 0)}
                  placeholder="Enter custom amount"
                  className="w-full pl-8 pr-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 text-sm font-bold"
                />
              </div>
            )}
          </div>

          {/* Form Fields Section */}
          <div className="space-y-4">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Donor Information</label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Full Name*"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-blue-600 outline-none transition-all"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  placeholder="Phone Number*"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-blue-600 outline-none transition-all"
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                placeholder="Email Address*"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-blue-600 outline-none transition-all"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <select
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-blue-600 outline-none transition-all appearance-none font-medium text-slate-600"
              onChange={(e) => setForm({ ...form, donationType: e.target.value })}
            >
              <option value="">Choose Donation Type*</option>
              <option value="Sadaqah">Sadaqah (Voluntary Charity)</option>
              <option value="Zakat">Zakat (Obligatory Charity)</option>
              <option value="Lillah">Lillah (In the Path of Allah)</option>
            </select>
          </div>

          {/* Final Calculation & Security Info */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-semibold text-slate-600">Total Contribution:</span>
              <span className="text-2xl font-bold text-blue-600">₹{amount.toLocaleString('en-IN')}</span>
            </div>

            <button
              onClick={startPayment}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg text-base font-bold shadow-lg shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Proceed to Payment
            </button>
            
            <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              <ShieldCheck size={14} className="text-green-500" />
              Secure 256-bit SSL encrypted payment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
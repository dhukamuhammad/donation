"use client";
import React, { useState } from "react";
import {
  X,
  User,
  Phone,
  Mail,
  ShieldCheck,
  Heart,
  CheckCircle2,
  Loader2,
  ArrowRight,
  CreditCard,
  ChevronDown,
} from "lucide-react";
import axiosInstance from "@/lib/axiosinstance";
import { useRouter } from "next/navigation";
import { showError } from "@/components/Toaster";

// 1. Razorpay SDK Loader
const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// 2. Cashfree SDK Loader
const loadCashfree = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const DonationModal = ({ isOpen, onClose, fundId, onsuccess }) => {
  const router = useRouter();
  const [step, setStep] = useState("form");
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [showCustom, setShowCustom] = useState(false);
  const [txnDetails, setTxnDetails] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    donationType: "",
  });

  if (!isOpen) return null;

  const predefinedAmounts = [500, 1000, 2500, 5000];

  const startPayment = async () => {
    // Basic Validations
    if (!amount || !form.name || !form.phone || !form.email || !form.donationType) {
      showError("Please provide all required contributor details.");
      return;
    }

    if (amount < 10) {
      showError("Minimum donation amount is ₹10.");
      return;
    }

    setLoading(true);

    try {
      // Step A: Backend se Order aur Gateway ki information lein
      const orderRes = await axiosInstance.post("payment/create-order", { amount });
      const { gateway, order } = orderRes.data;

      // --- CASE 1: RAZORPAY FLOW ---
      if (gateway === "razorpay") {
        const res = await loadRazorpay();
        if (!res) {
          showError("Razorpay SDK failed to initialize.");
          setLoading(false);
          return;
        }

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: "INR",
          name: "DonateCare Foundation",
          description: `Reference: ${form.donationType}`,
          order_id: order.id,
          handler: async function (response) {
            try {
              await axiosInstance.post("payment/save-donation", {
                fundId,
                amount,
                name: form.name,
                email: form.email,
                phone: form.phone,
                donationType: form.donationType,
                gateway: "razorpay", // Identify gateway in DB
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });

              handleSuccess(response.razorpay_payment_id);
            } catch (err) {
              showError("Error logging the transaction.");
            } finally {
              setLoading(false);
            }
          },
          modal: { ondismiss: () => setLoading(false) },
          prefill: { name: form.name, email: form.email, contact: form.phone },
          theme: { color: "#2563eb" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }

      // --- CASE 2: CASHFREE FLOW ---
      else if (gateway === "cashfree") {
        const res = await loadCashfree();
        if (!res) {
          showError("Cashfree SDK failed to initialize.");
          setLoading(false);
          return;
        }

        // Initialize Cashfree (mode set to 'sandbox' for testing)
        const cashfree = window.Cashfree({ mode: "sandbox" });

        let checkoutOptions = {
          paymentSessionId: order.payment_session_id, // Backend se aayi session id
          redirectTarget: "_modal", // Opens in a modal like Razorpay
        };

        cashfree.checkout(checkoutOptions).then(async (result) => {
          if (result.error) {
            showError(result.error.message);
            setLoading(false);
          }
          if (result.redirect) {
            console.log("Payment redirection requested");
          }
          if (result.paymentDetails) {
            // Payment success or pending
            try {
              await axiosInstance.post("payment/save-donation", {
                fundId,
                amount,
                name: form.name,
                email: form.email,
                phone: form.phone,
                donationType: form.donationType,
                gateway: "cashfree",
                cashfree_order_id: order.order_id,
              });

              handleSuccess(order.order_id);
            } catch (err) {
              showError("Error logging the transaction.");
            } finally {
              setLoading(false);
            }
          }
        });
      }
    } catch (err) {
      console.error(err);
      showError("Server sync failed.");
      setLoading(false);
    }
  };

  const handleSuccess = (paymentId) => {
    setTxnDetails({
      id: paymentId,
      amount: amount,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    });
    setStep("success");
    onsuccess();
  };

  const resetModal = () => {
    setStep("form");
    setAmount(0);
    setShowCustom(false);
    setTxnDetails(null);
    setForm({
      name: "",
      phone: "",
      email: "",
      donationType: "",
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100] font-['Outfit']">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
        {step === "form" && (
          <div className="flex flex-col h-full transition-all duration-300">
            <div className="bg-slate-50 border-b border-slate-200 p-5 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="bg-blue-600 p-1.5 rounded-lg">
                  <CreditCard size={18} className="text-white" />
                </div>
                <h2 className="text-[15px] font-black text-slate-800 uppercase tracking-wider">
                  Transaction Portal
                </h2>
              </div>
              <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-900 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-0.5">
                  Select Amount (INR)
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {predefinedAmounts.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => { setAmount(amt); setShowCustom(false); }}
                      className={`py-2 text-xs font-bold rounded border transition-all ${
                        amount === amt && !showCustom
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-white border-slate-200 text-slate-600 hover:border-blue-600"
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                  <button
                    onClick={() => { setAmount(0); setShowCustom(true); }}
                    className={`py-2 text-xs font-bold rounded border transition-all ${
                      showCustom ? "bg-blue-600 text-white border-blue-600" : "bg-white border-slate-200 text-slate-600"
                    }`}
                  >
                    Other
                  </button>
                </div>
                {showCustom && (
                  <div className="relative mt-3">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">₹</span>
                    <input
                      type="number"
                      onChange={(e) => setAmount(Number(e.target.value) || 0)}
                      placeholder="Enter specific amount"
                      className="w-full pl-8 pr-4 py-2.5 border border-slate-200 rounded text-sm font-bold focus:border-blue-600 outline-none transition-all"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-0.5">
                  Contributor Registry
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative group">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded text-sm focus:bg-white focus:border-blue-600 outline-none transition-all"
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="relative group">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600" />
                    <input
                      type="tel"
                      placeholder="Mobile No."
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded text-sm focus:bg-white focus:border-blue-600 outline-none transition-all"
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="relative group">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded text-sm focus:bg-white focus:border-blue-600 outline-none transition-all"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="relative">
                  <select
                    className="w-full px-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded text-sm font-bold text-slate-600 focus:bg-white focus:border-blue-600 outline-none transition-all appearance-none"
                    onChange={(e) => setForm({ ...form, donationType: e.target.value })}
                  >
                    <option value="">Choose Donation Category</option>
                    <option value="Sadaqah">Sadaqah (Voluntary)</option>
                    <option value="Zakat">Zakat (Obligatory)</option>
                    <option value="Lillah">Lillah (Path of Allah)</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 text-center">
                <button
                  onClick={startPayment}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-600/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:bg-blue-400"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
                  {loading ? "Initializing Secure Gateway..." : `Confirm Payment: ₹${amount.toLocaleString("en-IN")}`}
                </button>
                <p className="mt-4 text-[9px] text-slate-400 font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
                  <ShieldCheck size={12} className="text-green-500" /> Secure 256-bit SSL encrypted contribution
                </p>
              </div>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="p-8 md:p-5 text-center bg-white flex flex-col items-center justify-center h-full transition-all duration-500">
            <div className="mb-6 flex items-center justify-center">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center border border-green-100 shadow-inner">
                <CheckCircle2 size={44} className="text-green-500" strokeWidth={1.5} />
              </div>
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">Contribution Confirmed</h2>
            <p className="text-slate-500 text-sm mt-2 font-medium">Thank you, {form.name}. Your donation has been verified.</p>

            <div className="w-full mt-10 bg-slate-50/50 border border-slate-100 rounded-lg p-6 text-left relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
              <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-slate-200/60 pb-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount Disbursed</span>
                    <span className="text-2xl font-black text-slate-900 leading-none mt-1">₹{txnDetails?.amount.toLocaleString("en-IN")}</span>
                  </div>
                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100 uppercase">{form.donationType}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Receipt ID</span>
                    <span className="text-[11px] font-bold text-slate-700 break-all leading-tight">#{txnDetails?.id}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Settlement Date</span>
                    <span className="text-[11px] font-bold text-slate-700">{txnDetails?.date}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full mt-10">
              <button
                onClick={() => { resetModal(); onClose(); }}
                className="flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white rounded-lg font-black text-[11px] uppercase tracking-[0.2em] hover:bg-black active:scale-[0.98] transition-all shadow-xl shadow-slate-200"
              >
                Return to Fundraisers <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationModal;
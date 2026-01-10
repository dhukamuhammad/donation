"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
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

const DonationModal = ({ isOpen, onClose, fundId }) => {
  const [amount, setAmount] = useState(0);
  const [showCustom, setShowCustom] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    donationType: "",
  });

  if (!isOpen) return null;

  const predefinedAmounts = [500, 1000, 1500, 2000];

  const startPayment = async () => {

    const userId = localStorage.getItem("userId");
    console.log(userId)

    if (
      !amount ||
      !form.name ||
      !form.phone ||
      !form.email ||
      !form.donationType
    ) {
      alert("Please fill all fields");
      return;
    }

    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }
    // Create order

    const orderRes = await axiosInstance.post("payment/create-order", {
      amount,
    });
    const order = orderRes.data;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Donation",
      order_id: order.id,

      // Razorpay handler

      handler: async function (response) {
        const res = await axiosInstance.post("payment/save-donation", {
          fundId,
          userId,
          amount,
          name: form.name,
          email: form.email,
          phone: form.phone,
          donationType: form.donationType,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });

        const data = res.data.fundId;
        console.log(data);
        localStorage.setItem("donatedFundId", data);
        alert("Donation Successful");
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
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-blue-100 p-4 rounded-t-lg flex justify-between items-center sticky top-0">
          <h2 className="text-xl font-bold text-blue-600">
            Choose a donation amount
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Amount Buttons */}
          <div className="flex flex-wrap gap-3">
            {predefinedAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => {
                  setAmount(amt);
                  setShowCustom(false);
                }}
                className={`px-4 h-[40px] rounded-lg transition-all ${amount === amt
                  ? "bg-blue-600 text-white"
                  : "bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
                  }`}
              >
                ₹{amt}
              </button>
            ))}

            <button
              onClick={() => {
                setAmount(0);
                setShowCustom(true);
              }}
              className={`px-4 h-[40px] rounded-lg transition-all ${showCustom
                ? "bg-blue-600 text-white"
                : "bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
                }`}
            >
              Other
            </button>
          </div>

          {showCustom && (
            <input
              type="text"
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              placeholder="Enter custom amount"
              className="w-full px-4 py-2 border border-blue-300 rounded-xl focus:ring-4 focus:ring-blue-100"
            />
          )}

          <input
            type="text"
            placeholder="Your Name*"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="tel"
            placeholder="Your Phone Number*"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            type="email"
            placeholder="Your Email id*"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            onChange={(e) => setForm({ ...form, donationType: e.target.value })}
          >
            <option value="">Select Donation Type*</option>
            <option value="Lillah">Lillah</option>
            <option value="Zakat">Zakat</option>
            <option value="Sadkah">Sadkah</option>
          </select>

          <p className="text-lg font-bold">
            Total Amount : <span className="text-blue-600">₹{amount}</span>
          </p>

          <button
            onClick={startPayment}
            className="w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-bold shadow-lg hover:scale-105 transition"
          >
            Donate Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;

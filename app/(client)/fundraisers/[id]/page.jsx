"use client";
import React, { useEffect, useState } from "react";
import {
  Heart,
  Share2,
  Flag,
  Calendar,
  Target,
  Users,
  CheckCircle,
  ArrowLeft,
  X,
  Clock,
} from "lucide-react";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axiosinstance";
import Image from "next/image";
import { useRouter } from "next/navigation";

const FundraisersDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [activeTab, setActiveTab] = useState("story");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    pan: "",
    donationType: "",
  });

  const [fundraiser, setFundraiser] = useState([]);
  console.log(fundraiser);

  const predefinedAmounts = [500, 1000, 1500, 2000];

  useEffect(() => {
    if (id) fetchDonationFundById();
  }, [id]);

  const fetchDonationFundById = async () => {
    try {
      const res = await axiosInstance.get(`/donationFund/${id}`);
      setFundraiser(res.data);
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // popup

  const raised = parseInt(fundraiser.totalRaised || "0");
  const goal = parseInt(fundraiser.goalAmount || "1");
  const progress = Math.min((raised / goal) * 100, 100);

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount);
    setShowCustomInput(false);
    setCustomAmount("");
  };

  const handleOtherClick = () => {
    setShowCustomInput(true);
    setSelectedAmount(0);
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setCustomAmount(value);
    setSelectedAmount(value ? parseInt(value) : 0);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (
      selectedAmount > 0 &&
      formData.name &&
      formData.phone &&
      formData.email
    ) {
      alert(`Donation of ₹${selectedAmount} submitted successfully!`);
      setIsOpen(false);
      setSelectedAmount(500);
      setCustomAmount("");
      setShowCustomInput(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        pan: "",
        donationType: "",
      });
    } else {
      alert("Please fill all required fields");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Fundraisers</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8  pt-0">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Featured Image */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative w-full h-[400px]">
                {fundraiser.thumbnail ? (
                  <Image
                    src={`/uploads/${fundraiser.thumbnail}`}
                    alt={fundraiser.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 animate-pulse" />
                )}
              </div>
            </div>

            {/* Title & Share */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {fundraiser.title}
              </h1>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Started From - {formatDate(fundraiser.date)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Flag className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab("story")}
                    className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                      activeTab === "story"
                        ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Story
                  </button>
                  <button
                    onClick={() => setActiveTab("updates")}
                    className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                      activeTab === "updates"
                        ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Updates
                    {/* ({fundraiser.updates.length}) */}
                  </button>
                  <button
                    onClick={() => setActiveTab("donations")}
                    className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                      activeTab === "donations"
                        ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Donations
                    {/* ({fundraiser.supporters}) */}
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Story Tab */}
                {activeTab === "story" && (
                  <div className="prose max-w-none">
                    <div
                      className="text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: fundraiser.description,
                      }}
                    />
                  </div>
                )}

                {/* Updates Tab */}
                {/* {activeTab === "updates" && (
                  <div className="space-y-4">
                    {fundraiser.updates.length > 0 ? (
                      fundraiser.updates.map((update) => (
                        <div
                          key={update.id}
                          className="border-l-4 border-blue-600 pl-4 py-2"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-semibold text-gray-900">
                              {update.title}
                            </span>
                            <span className="text-xs text-gray-500">
                              • {update.date}
                            </span>
                          </div>
                          <p className="text-gray-700">{update.description}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 py-8">
                        No updates yet
                      </p>
                    )}
                  </div>
              )}

                {/* Donations Tab */}
                {/* {activeTab === "donations" && (
                  <div className="space-y-3">
                    {fundraiser.recentDonations.length > 0 ? (
                      fundraiser.recentDonations.map((donation) => (
                        <div
                          key={donation.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                              {donation.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {donation.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {donation.time}
                              </p>
                            </div>
                          </div>
                          <span className="text-lg font-bold text-green-600">
                            ₹{donation.amount}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 py-8">
                        No donations yet
                      </p>
                    )}
                  </div>
                )} */}
              </div>
            </div>
          </div>

          {/* Donation Card - Right Side */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              {/* Main Donation Card */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-blue-100 p-6 text-center">
                  <button
                    onClick={() => setIsOpen(true)}
                    className="w-full bg-white text-blue-600 font-bold py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 text-lg"
                  >
                    <Heart className="w-6 h-6" />
                    Donate Now
                  </button>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex items-end justify-between mb-3">
                      <div>
                        <span className="text-3xl font-bold text-gray-900">
                          ₹{fundraiser.total_amount}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-blue-600">
                        {progress.toFixed(0)}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      raised out of ₹{fundraiser.goalAmount}
                    </p>

                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                      <div
                        className="h-full bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full transition-all duration-500 shadow-sm"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2">
                      Started From - {formatDate(fundraiser.date)}
                    </p>
                  </div>

                  {/* Badges */}

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      jakat
                    </span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Sadkah
                    </span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Lillah
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-200">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="font-bold text-gray-900">
                      {fundraiser.supporters}
                    </span>
                    <span className="text-gray-600">Supporters</span>
                  </div>
                </div>
              </div>

              {/* Share Card */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-blue-600" />
                  Share This Campaign
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <button className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
                    Facebook
                  </button>
                  <button className="p-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm font-semibold">
                    Twitter
                  </button>
                  <button className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold">
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-blue-100 p-4 rounded-t-lg flex justify-between items-center sticky top-0 z-11">
              <h2 className="text-xl font-bold text-blue-600">
                Choose a donation amount
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-4">
              {/* Amount Selection */}
              <div className="flex flex-wrap gap-3">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountClick(amount)}
                    className={`px-4 h-[40px] rounded-lg transition-all ${
                      selectedAmount === amount && !showCustomInput
                        ? "bg-blue-600 text-white shadow-lg scale-105"
                        : "bg-white border-2 border-blue-500 text-blue-600 hover:border-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    ₹{amount}
                  </button>
                ))}
                <button
                  onClick={handleOtherClick}
                  className={`px-4 h-[40px] rounded-lg transition-all ${
                    showCustomInput
                      ? "bg-blue-600 text-white shadow-lg scale-105"
                      : "bg-white border-2 border-blue-500 text-blue-600 hover:border-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Other
                </button>
              </div>

              {/* Custom Amount Input */}
              {showCustomInput && (
                <div className="animate-fadeIn">
                  <input
                    type="text"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    placeholder="Enter custom amount"
                    className="w-full px-4 py-2 border-1 border-blue-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-lg"
                  />
                </div>
              )}

              {/* Name Input */}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name*"
                className="w-full px-4 py-2 border-1 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-gray-700"
              />

              {/* Phone Input */}
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Your Phone Number*"
                className="w-full px-4 py-2 border-1 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-gray-700"
              />

              {/* Email Input */}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email id*"
                className="w-full px-4 py-2 border-1 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-gray-700"
              />

              {/* Donation Type */}
              <select
                name="donationType"
                value={formData.donationType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border-1 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-gray-700"
              >
                <option value="">Select Donation Type*</option>
                <option value="education">Education</option>
                <option value="healthcare">Healthcare</option>
                <option value="food">Food & Nutrition</option>
                <option value="environment">Environment</option>
                <option value="general">General</option>
              </select>

              {/* Total Amount Display */}
              <div>
                <p className="text-[18px] font-bold text-gray-800">
                  Total Amount :{" "}
                  <span className="text-blue-600 text-[18px]">
                    ₹{selectedAmount}
                  </span>
                </p>
              </div>

              {/* Donate Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-bold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300"
              >
                Donate Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundraisersDetailsPage;

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
} from "lucide-react";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axiosinstance";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DonationModal from "./DonationModal";

const FundraisersDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [activeTab, setActiveTab] = useState("story");
  const [isOpen, setIsOpen] = useState(false);

  const [fundraiser, setFundraiser] = useState([]);
  console.log(fundraiser);

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
      <DonationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        fundId={id}
      />
    </div>
  );
};

export default FundraisersDetailsPage;

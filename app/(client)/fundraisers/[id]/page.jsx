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
  ChevronDown,
  ChevronUp,
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
  const [expanded, setExpanded] = useState(false);
  const [showDoc, setShowDoc] = useState(false);

  const [activeTab, setActiveTab] = useState("description");
  const [isOpen, setIsOpen] = useState(false);

  const [fundraiser, setFundraiser] = useState({});
  const [supporters, setSupporters] = useState([]);

  console.log(fundraiser);

  useEffect(() => {
    if (id) fetchDonationFundById();
    fetchSupportersById();
  }, [id]);

  const fetchDonationFundById = async () => {
    try {
      const res = await axiosInstance.get(`/donationFund/${id}`);
      setFundraiser(res.data);
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  const fetchSupportersById = async () => {
    try {
      const res = await axiosInstance.get(`/donationFund/by-fund/${id}`);
      setSupporters(res.data);
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
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

  const getProgress = (raised, goal) => {
    if (!goal || goal === 0) return 0;
    return Math.min(Math.round((raised / goal) * 100), 100);
  };

  const isLongDescription = (html) => {
    if (!html) return false;
    const text = html.replace(/<[^>]*>/g, ""); // remove HTML tags
    return text.split("\n").length > 10 || text.length > 500;
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
                    onClick={() => setActiveTab("description")}
                    className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                      activeTab === "description"
                        ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab("documents")}
                    className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                      activeTab === "documents"
                        ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Documents
                  </button>
                  <button
                    onClick={() => setActiveTab("supporters")}
                    className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                      activeTab === "supporters"
                        ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Supporters
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* description Tab */}
                {activeTab === "description" && (
                  <div className="prose max-w-none relative">
                    {fundraiser.description ? (
                      <>
                        <div
                          className={`text-gray-700 leading-relaxed overflow-hidden transition-all duration-500 ${
                            expanded &&
                            isLongDescription(fundraiser.description)
                              ? "max-h-[2000px]"
                              : "max-h-[220px]"
                          }`}
                          dangerouslySetInnerHTML={{
                            __html: fundraiser.description,
                          }}
                        />

                        {/* Fade effect */}
                        {!expanded &&
                          isLongDescription(fundraiser.description) && (
                            <div className="absolute bottom-12 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
                          )}

                        {/* Read More Button */}
                        {isLongDescription(fundraiser.description) && (
                          <div className="flex justify-center mt-6">
                            <button
                              onClick={() => setExpanded(!expanded)}
                              className="flex items-center gap-2 text-blue-500 hover:underline underline-offset-4 transition"
                            >
                              {expanded ? (
                                <>
                                  Read Less <ChevronUp size={16} />
                                </>
                              ) : (
                                <>
                                  Read More <ChevronDown size={16} />
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-center text-gray-500 py-8">
                        No description available.
                      </p>
                    )}
                  </div>
                )}

                {/* Documents Tab */}
                {activeTab === "documents" && (
                  <>
                    <div
                      className="relative w-[17%] h-[180px] cursor-pointer"
                      onClick={() => setShowDoc(true)}
                    >
                      <Image
                        src={`/uploads/${fundraiser.document_img}`}
                        alt={fundraiser.title}
                        fill
                        className="rounded-lg object-cover border border-gray-200 shadow-sm hover:scale-105 transition"
                        priority
                      />
                    </div>

                    {/* Popup Preview */}
                    {showDoc && (
                      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="relative bg-white rounded-xl p-4 max-w-[90vw] max-h-[90vh] shadow-2xl">
                          <button
                            onClick={() => setShowDoc(false)}
                            className="absolute -top-3 -right-3 bg-white text-red-500 rounded-full px-2 py-1 shadow hover:scale-110 transition"
                          >
                            ✕
                          </button>

                          <img
                            src={`/uploads/${fundraiser.document_img}`}
                            className="max-w-full max-h-[80vh] rounded-lg"
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* supporters Tab */}
                {activeTab === "supporters" && (
                  <div className="prose max-w-none relative space-y-4 h-[220px] overflow-y-auto">
                    {supporters.length > 0 ? (
                      supporters.map((supporter, i) => (
                        <div key={i} className="p-3 bg-gray-50 rounded-lg">
                          <p className="font-semibold text-gray-900">
                            {supporter.name}
                          </p>
                          <p className="text-green-600">₹{supporter.amount}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500">
                        No supporters yet
                      </p>
                    )}
                  </div>
                )}
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
                          {formatAmount(fundraiser.raised_amount)}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-blue-600">
                        {getProgress(
                          fundraiser.raised_amount,
                          fundraiser.total_amount
                        )}
                        %
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      raised out of {formatAmount(fundraiser.total_amount)}
                    </p>

                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                      <div
                        className="h-full bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full transition-all duration-500 shadow-sm"
                        style={{
                          width: `${getProgress(
                            fundraiser.raised_amount,
                            fundraiser.total_amount
                          )}%`,
                        }}
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

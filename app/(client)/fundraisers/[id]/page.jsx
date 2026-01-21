"use client";
import React, { useEffect, useState } from "react";
import {
  Heart,
  Share2,
  Flag,
  Calendar,
  Users,
  CheckCircle,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  FileText,
  Facebook,
  Twitter,
  MessageCircle,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosinstance";
import Image from "next/image";
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

  useEffect(() => {
    if (id) {
      fetchDonationFundById();
      fetchSupportersById();
    }
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

  const getProgress = (raised, goal) => {
    if (!goal || goal === 0) return 0;
    return Math.min(Math.round((raised / goal) * 100), 100);
  };

  const isLongDescription = (html) => {
    if (!html) return false;
    const text = html.replace(/<[^>]*>/g, "");
    return text.length > 600;
  };

  return (
    <div className="min-h-screen bg-white font-['Outfit']">
      {/* --- Breadcrumb/Back --- */}
      <div className="border-b border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors text-sm font-semibold"
          >
            <ArrowLeft size={16} />
            <span>Back to Fundraisers</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* --- Left Column: Story & Details --- */}
          <div className="lg:col-span-2 space-y-8">
            <header className="space-y-4">
              <h1 className="text-3xl font-bold text-slate-900 leading-snug">
                {fundraiser.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-blue-600" />
                  <span>Started on {formatDate(fundraiser.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-blue-600" />
                  <span>Verified Campaign</span>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
              {fundraiser.thumbnail ? (
                <Image
                  src={`/uploads/${fundraiser.thumbnail}`}
                  alt={fundraiser.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full animate-pulse" />
              )}
            </div>

            {/* Content Tabs */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="flex bg-slate-50 border-b border-slate-200">
                {[
                  { id: "description", label: "Story", icon: FileText },
                  { id: "documents", label: "Verification", icon: ShieldCheck },
                  { id: "supporters", label: "Donors", icon: Users },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold transition-colors ${
                      activeTab === tab.id
                        ? "bg-white text-blue-600 border-b-2 border-blue-600"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <tab.icon size={16} />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6 md:p-8">
                {activeTab === "description" && (
                  <div className="relative">
                    <div
                      className={`prose prose-slate max-w-none text-slate-600 leading-relaxed overflow-hidden transition-all duration-500 ${
                        expanded ? "max-h-full" : "max-h-[350px]"
                      }`}
                      dangerouslySetInnerHTML={{
                        __html: fundraiser.description,
                      }}
                    />
                    {!expanded && isLongDescription(fundraiser.description) && (
                      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent flex items-end justify-center">
                        <button
                          onClick={() => setExpanded(true)}
                          className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:underline mb-2"
                        >
                          Read Full Story <ChevronDown size={16} />
                        </button>
                      </div>
                    )}
                    {expanded && (
                      <button
                        onClick={() => setExpanded(false)}
                        className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:underline mt-6 mx-auto"
                      >
                        Show Less <ChevronUp size={16} />
                      </button>
                    )}
                  </div>
                )}

                {activeTab === "documents" && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div
                      className="group relative aspect-[3/4] cursor-pointer rounded-lg overflow-hidden border border-slate-200"
                      onClick={() => setShowDoc(true)}
                    >
                      <Image
                        src={`/uploads/${fundraiser.document_img}`}
                        alt="Document"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="text-white text-xs font-bold">
                          View Full Image
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "supporters" && (
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {supporters.length > 0 ? (
                      supporters.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold uppercase">
                              {item.name.charAt(0)}
                            </div>
                            <span className="font-bold text-slate-800 text-sm">
                              {item.name}
                            </span>
                          </div>
                          <span className="font-bold text-blue-600 text-sm">
                            {formatAmount(item.amount)}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-slate-400 py-8 italic">
                        No donations yet. Be the first to help!
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* --- Right Column: Donation Card --- */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Main Widget */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 md:p-8 space-y-6">
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-3xl font-bold text-slate-900">
                        {formatAmount(fundraiser.raised_amount)}
                      </span>
                      <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {getProgress(
                          fundraiser.raised_amount,
                          fundraiser.total_amount,
                        )}
                        %
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">
                      raised out of{" "}
                      <span className="text-slate-800 font-bold">
                        {formatAmount(fundraiser.total_amount)}
                      </span>{" "}
                      goal
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                      style={{
                        width: `${getProgress(fundraiser.raised_amount, fundraiser.total_amount)}%`,
                      }}
                    />
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600 font-semibold py-4 border-y border-slate-100">
                    <Users size={18} className="text-blue-600" />
                    <span>
                      {fundraiser.supporters || 0} People have donated
                    </span>
                  </div>

                  {/* CTA */}
                  {fundraiser.raised_amount >= fundraiser.total_amount ? (
                    <button
                      disabled
                      className="w-full bg-slate-50 text-slate-400 font-bold py-3 rounded-lg cursor-default text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 border border-slate-200"
                    >
                      Campaign Successful
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsOpen(true)}
                      className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all text-[11px] uppercase tracking-[0.2em] shadow-md shadow-blue-600/10 active:scale-[0.98] flex items-center justify-center gap-2 group"
                    >
                      <Heart
                        size={16}
                        className="group-hover:scale-110 transition-transform"
                      />
                      Contribute Now
                    </button>
                  )}

                  <div className="flex flex-wrap justify-center gap-3 mt-5 font-['Outfit']">
                    {["Zakat ", "Sadqah", "Lillah"].map((tag) => (
                      <div
                        key={tag}
                        className="flex items-center gap-1.5 border border-slate-200 px-3 py-1.5 rounded-full transition-colors hover:border-blue-200 hover:bg-blue-50/50"
                      >
                        {/* Premium Lucide Icon */}
                        <CheckCircle
                          size={14}
                          className="text-blue-600"
                          strokeWidth={2.5}
                        />

                        {/* Badge Text */}
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
                          {tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Share Widget */}
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Share2 size={14} /> Help by Sharing
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <button className="flex justify-center p-3 bg-white border border-slate-200 rounded-lg hover:text-blue-600 transition-colors">
                    <Facebook size={20} />
                  </button>
                  <button className="flex justify-center p-3 bg-white border border-slate-200 rounded-lg hover:text-sky-400 transition-colors">
                    <Twitter size={20} />
                  </button>
                  <button className="flex justify-center p-3 bg-white border border-slate-200 rounded-lg hover:text-green-500 transition-colors">
                    <MessageCircle size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Modal Preview (Document) --- */}
      {showDoc && (
        <div
          className="fixed inset-0 z-[100] bg-slate-900/90 flex items-center justify-center p-6"
          onClick={() => setShowDoc(false)}
        >
          <div className="relative max-w-4xl w-full bg-white p-2 rounded-lg">
            <button className="absolute -top-10 right-0 text-white font-bold flex items-center gap-1">
              ✕ Close
            </button>
            <img
              src={`/uploads/${fundraiser.document_img}`}
              className="w-full h-auto rounded shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* --- Donation Modal --- */}
      <DonationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        fundId={id}
        onsuccess={() => {
          fetchDonationFundById();
          fetchSupportersById();
        }}
      />
    </div>
  );
};

export default FundraisersDetailsPage;

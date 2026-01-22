"use client";
import React, { useEffect, useState } from "react";
import {
  Heart,
  Share2,
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
  ExternalLink,
  Eye,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosinstance";
import Image from "next/image";
import DonationModal from "./DonationModal";
import Link from "next/link";

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

  // --- Image Gallery State ---
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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

  const getImagesArray = (thumbnail) => {
    try {
      const parsed = JSON.parse(thumbnail);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return thumbnail ? [thumbnail] : [];
    }
  };

  const images = getImagesArray(fundraiser.thumbnail);

  // Gallery Navigation Functions
  const nextImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
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

            {/* ================= PROFESSIONAL GALLERY START ================= */}
            <div className="space-y-4">
              {/* --- Main Image Stage --- */}
              <div className="relative group aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm">
                {images.length > 0 ? (
                  <Image
                    src={`/uploads/${images[activeImageIndex]}`}
                    alt={fundraiser.title}
                    fill
                    className="object-contain lg:object-cover transition-all duration-500"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 animate-pulse" />
                )}

                {/* Overlays: Navigation Arrows (Visible on Hover) */}
                {images.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <button 
                      onClick={prevImage}
                      className="pointer-events-auto p-2.5 rounded-full bg-white/90 text-slate-900 shadow-xl hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110 active:scale-90"
                    >
                      <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="pointer-events-auto p-2.5 rounded-full bg-white/90 text-slate-900 shadow-xl hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110 active:scale-90"
                    >
                      <ChevronRight size={24} strokeWidth={2.5} />
                    </button>
                  </div>
                )}

                {/* Image Counter Badge */}
                <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-lg border border-white/10 flex items-center gap-2">
                   <Maximize2 size={12} className="text-white/70" />
                   <span className="text-[10px] font-black text-white uppercase tracking-widest">
                     {activeImageIndex + 1} / {images.length}
                   </span>
                </div>
              </div>

              {/* --- Thumbnails Grid --- */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`relative w-24 h-16 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        activeImageIndex === index
                          ? "border-blue-600 ring-4 ring-blue-600/10 scale-95 shadow-inner"
                          : "border-transparent hover:border-slate-300 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={`/uploads/${img}`}
                        alt={`thumb-${index}`}
                        fill
                        className="object-cover"
                      />
                      {/* Selection Overlay */}
                      {activeImageIndex !== index && <div className="absolute inset-0 bg-slate-900/10" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* ================= PROFESSIONAL GALLERY END ================= */}

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
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <div className="group relative aspect-[3/4] cursor-pointer rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="absolute inset-0 flex flex-col">
                        <div className="flex-1 flex flex-col items-center justify-center bg-slate-50/50 group-hover:bg-red-50/30 transition-colors">
                          <div className="relative">
                            <FileText
                              size={48}
                              className="text-red-500 stroke-[1.5]"
                            />
                            <div className="absolute -bottom-1 -right-1 bg-red-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow-sm">
                              PDF
                            </div>
                          </div>
                        </div>
                        <div className="p-3 bg-white border-t border-slate-100">
                          <p className="text-[11px] font-bold text-slate-700 truncate mb-1 uppercase tracking-tight">
                            {fundraiser.document_img?.split("_").pop() || "Document.pdf"}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-bold text-slate-400 uppercase">Medical Doc</span>
                            <ExternalLink size={12} className="text-slate-400" />
                          </div>
                        </div>
                      </div>
                      <a
                        href={`/uploads/${fundraiser.document_img}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]"
                      >
                        <div className="bg-white/10 p-3 rounded-full mb-2">
                          <Eye size={24} className="text-white" />
                        </div>
                        <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">View Full PDF</span>
                      </a>
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
                            <span className="font-bold text-slate-800 text-sm">{item.name}</span>
                          </div>
                          <span className="font-bold text-blue-600 text-sm">{formatAmount(item.amount)}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-slate-400 py-8 italic">No donations yet. Be the first to help!</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* --- Right Column: Donation Card --- */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 md:p-8 space-y-6">
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-3xl font-bold text-slate-900">
                        {formatAmount(fundraiser.raised_amount)}
                      </span>
                      <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {getProgress(fundraiser.raised_amount, fundraiser.total_amount)}%
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">
                      raised out of{" "}
                      <span className="text-slate-800 font-bold">{formatAmount(fundraiser.total_amount)}</span> goal
                    </p>
                  </div>

                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                      style={{ width: `${getProgress(fundraiser.raised_amount, fundraiser.total_amount)}%` }}
                    />
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600 font-semibold py-4 border-y border-slate-100">
                    <Users size={18} className="text-blue-600" />
                    <span>{fundraiser.supporters || 0} People have donated</span>
                  </div>

                  {fundraiser.raised_amount >= fundraiser.total_amount ? (
                    <button disabled className="w-full bg-slate-50 text-slate-400 font-bold py-3 rounded-lg cursor-default text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 border border-slate-200">
                      Campaign Successful
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsOpen(true)}
                      className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all text-[11px] uppercase tracking-[0.2em] shadow-md shadow-blue-600/10 active:scale-[0.98] flex items-center justify-center gap-2 group"
                    >
                      <Heart size={16} className="group-hover:scale-110 transition-transform" />
                      Contribute Now
                    </button>
                  )}

                  <div className="flex flex-wrap justify-center gap-3 mt-5 font-['Outfit']">
                    {["Zakat ", "Sadqah", "Lillah"].map((tag) => (
                      <div key={tag} className="flex items-center gap-1.5 border border-slate-200 px-3 py-1.5 rounded-full transition-colors hover:border-blue-200 hover:bg-blue-50/50">
                        <CheckCircle size={14} className="text-blue-600" strokeWidth={2.5} />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Share2 size={14} /> Help by Sharing
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <button className="flex justify-center p-3 bg-white border border-slate-200 rounded-lg hover:text-blue-600 transition-colors"><Facebook size={20} /></button>
                  <button className="flex justify-center p-3 bg-white border border-slate-200 rounded-lg hover:text-sky-400 transition-colors"><Twitter size={20} /></button>
                  <button className="flex justify-center p-3 bg-white border border-slate-200 rounded-lg hover:text-green-500 transition-colors"><MessageCircle size={20} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
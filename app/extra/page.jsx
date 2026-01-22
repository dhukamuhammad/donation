"use client";
import { useEffect, useState } from "react";
import {
  Search,
  Clock,
  Users,
  ChevronRight,
  Filter,
  CheckCircle,
} from "lucide-react";
import axiosInstance from "@/lib/axiosinstance";
import Link from "next/link";

// --- Internal Component for Professional Slideshow ---
const ImageSlideshow = ({ thumbnail, title }) => {
  const [index, setIndex] = useState(0);

  const getImages = (raw) => {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return raw ? [raw] : [];
    }
  };

  const images = getImages(thumbnail);

  useEffect(() => {
    if (images.length <= 1) return;
    
    // 1-second auto-rotation logic
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="relative h-48 w-full overflow-hidden bg-slate-200">
      {images.map((img, i) => (
        <img
          key={i}
          src={`/uploads/${img}`}
          alt={`${title} - ${i}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      
      {/* Subtle overlay for Verified status */}
      <div className="absolute top-3 left-3 z-10">
        <span className="bg-white/95 text-blue-600 px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider border border-slate-100 shadow-sm">
          Verified Cause
        </span>
      </div>

      {/* Progress indicators for multiple images */}
      {images.length > 1 && (
        <div className="absolute bottom-2 right-3 flex gap-1 z-10">
          {images.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-300 ${i === index ? 'w-4 bg-white' : 'w-1 bg-white/40'}`} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Fundraisers = () => {
  const [categories, setCategories] = useState([]);
  const [donationFunds, setDonationFunds] = useState([]);
  const [filteredFunds, setFilteredFunds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchDonationFund();
  }, []);

  useEffect(() => {
    let data = donationFunds;

    // Filter by Active Status
    data = data.filter((fund) => fund.status === 1);

    // Filter by Category
    if (selectedCategory !== "All") {
      data = data.filter((fund) => fund.fun_cat === selectedCategory);
    }

    // Filter by Search Term
    if (searchTerm.trim() !== "") {
      data = data.filter((fund) =>
        fund.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredFunds(data);
  }, [selectedCategory, searchTerm, donationFunds]);

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/category");
      setCategories(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDonationFund = async () => {
    try {
      const res = await axiosInstance.get("/donationFund");
      setDonationFunds(res.data);
      setFilteredFunds(res.data);
    } catch (error) {
      console.error(error);
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

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getProgress = (raised, goal) => {
    if (!goal || goal === 0) return 0;
    return Math.min(Math.round((raised / goal) * 100), 100);
  };

  const isExpired = (endDate) => {
    if (!endDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0);
    return end < today;
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-['Outfit']">
      <div className="max-w-7xl mx-auto flex gap-8 px-4 py-12 max-lg:flex-col">
        
        {/* --- Sidebar Filter --- */}
        <aside className="w-72 shrink-0 max-lg:w-full">
          <div className="sticky top-24 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-nowrap">
            <div className="p-5 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
              <Filter className="w-4 h-4 text-blue-600" />
              <h2 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.2em]">
                Master Filters
              </h2>
            </div>

            <div className="p-2 space-y-1">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between text-sm font-bold ${
                  selectedCategory === "All"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>Full Directory</span>
                {selectedCategory === "All" && <ChevronRight size={14} />}
              </button>

              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between text-sm font-bold ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>{category.title}</span>
                  {selectedCategory === category.id && <ChevronRight size={14} />}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* --- Main Content Area --- */}
        <main className="flex-1">
          {/* Search Box */}
          <div className="mb-10">
            <div className="relative group max-w-2xl">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Query database for campaigns or keywords..."
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-4 pl-12 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all text-sm shadow-sm font-medium"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-600" />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFunds.map((fund) => {
              const progress = getProgress(fund.raised_amount, fund.total_amount);
              const isCompleted = fund.raised_amount >= fund.total_amount;
              const expired = isExpired(fund.end_date);

              return (
                <div
                  key={fund.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group"
                >
                  {/* --- Slideshow Component --- */}
                  <ImageSlideshow thumbnail={fund.thumbnail} title={fund.title} />

                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-slate-800 text-[16px] tracking-tight leading-tight h-10 group-hover:text-blue-600 transition-colors">
                      {truncateText(fund.title, 45)}
                    </h3>

                    {/* Eligibility Tokens */}
                    <div className="flex items-center gap-3 my-5">
                      {["Zakat", "Sadaqah", "Lillah"].map((tag, idx) => (
                        <div key={tag} className="flex items-center gap-1">
                          <CheckCircle size={12} className="text-blue-600" strokeWidth={3} />
                          <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">{tag}</span>
                          {idx < 2 && <span className="w-px h-2 bg-slate-200 ml-2"></span>}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4 text-[10px] text-slate-400 font-black uppercase tracking-widest mb-6">
                      <div className="flex items-center gap-1">
                        <Clock size={12} strokeWidth={3} />
                        <span>Ends: {formatDate(fund.end_date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={12} strokeWidth={3} />
                        <span>{fund.supporters || 0} Records</span>
                      </div>
                    </div>

                    {/* Metrics Section */}
                    <div className="mt-auto pt-4 border-t border-slate-50">
                      <div className="flex justify-between items-end mb-2">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em]">Verified Assets</span>
                          <span className="text-lg font-black text-slate-900 tracking-tighter italic">
                            {formatAmount(fund.raised_amount)}
                          </span>
                        </div>
                        <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                          {progress}%
                        </span>
                      </div>

                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-5">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      {/* Professional CTA */}
                      {expired || isCompleted ? (
                        <button disabled className="w-full bg-slate-50 text-slate-400 font-black py-3 rounded-lg text-[10px] uppercase tracking-[0.2em] border border-slate-100">
                          Execution Terminated
                        </button>
                      ) : (
                        <Link href={`/fundraisers/${fund.id}`} className="block">
                          <button className="w-full bg-blue-600 text-white font-black py-3 rounded-lg hover:bg-blue-700 transition-all text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-blue-600/10 active:scale-[0.98]">
                            Initiate Contribution
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredFunds.length === 0 && (
            <div className="text-center py-32 bg-white rounded-2xl border border-slate-200 border-dashed">
              <Search className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Database Null</h3>
              <p className="text-slate-400 text-xs mt-1">No active campaign parameters matched the current query.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Fundraisers;
"use client";
import { useEffect, useState } from "react";
import {
  Search,
  Clock,
  Users,
  CheckCircle2,
  ChevronRight,
  Filter,
  HeartHandshake,
  Coins,
  CheckCheck,
  CheckCircle,
} from "lucide-react";
import axiosInstance from "@/lib/axiosinstance";
import Link from "next/link";

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

  // useEffect(() => {
  //   let data = donationFunds;
  //   if (selectedCategory !== "All") {
  //     data = data.filter((fund) => fund.fun_cat === selectedCategory);
  //   }
  //   if (searchTerm.trim() !== "") {
  //     data = data.filter((fund) =>
  //       fund.title.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   }
  //   setFilteredFunds(data);
  // }, [selectedCategory, searchTerm, donationFunds]);

  useEffect(() => {
    let data = donationFunds;

    // ✅ ONLY ACTIVE CAMPAIGNS
    data = data.filter((fund) => fund.status === 1);

    // Category filter
    if (selectedCategory !== "All") {
      data = data.filter((fund) => fund.fun_cat === selectedCategory);
    }

    // Search filter
    if (searchTerm.trim() !== "") {
      data = data.filter((fund) =>
        fund.title.toLowerCase().includes(searchTerm.toLowerCase()),
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

  return (
    <div className="min-h-screen bg-slate-50 font-['Outfit']">
      <div className="max-w-7xl mx-auto flex gap-8 px-4 py-12 max-lg:flex-col">
        {/* Sidebar - Professional Category Filter */}
        <aside className="w-72 shrink-0 max-lg:w-full">
          <div className="sticky top-24 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
              <Filter className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                Filter Causes
              </h2>
            </div>

            <div className="p-2 space-y-1">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`w-full text-left px-4 py-2.5 rounded-md transition-colors flex items-center justify-between text-sm ${
                  selectedCategory === "All"
                    ? "bg-blue-600 text-white font-bold"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span>All Causes</span>
                {selectedCategory === "All" && <ChevronRight size={14} />}
              </button>

              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-md transition-colors flex items-center justify-between text-sm ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white font-bold"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span>{category.title}</span>
                  {selectedCategory === category.id && (
                    <ChevronRight size={14} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          {/* Search Header */}
          <div className="mb-8">
            <div className="relative group max-w-2xl">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by campaign title or keyword..."
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 pl-12 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-sm shadow-sm"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-600" />
            </div>
          </div>

          {/* Cards Grid - Clean Dashboard Style */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFunds.map((fund) => {
              const progress = getProgress(
                fund.raised_amount,
                fund.total_amount,
              );
              const isCompleted = fund.raised_amount >= fund.total_amount;

              return (
                <div
                  key={fund.id}
                  className="bg-white rounded-lg border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow group"
                >
                  {/* Image Area */}
                  <div className="relative h-48 overflow-hidden bg-slate-200">
                    <img
                      src={`/uploads/${fund.thumbnail}`}
                      alt={fund.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/95 text-blue-600 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border border-slate-100 shadow-sm">
                        Verified Cause
                      </span>
                    </div>
                  </div>

                  {/* Body Area */}
                  <div className="p-5 flex-1 flex flex-col font-['Outfit']">
                    {/* Campaign Title */}
                    <h3 className="font-bold text-slate-800 text-[17px] leading-snug  line-clamp-2 h-11 group-hover:text-blue-600 transition-colors">
                      {fund.title}
                    </h3>

                    {/* Eligibility Indicators - Professional Circle Icons (No Background) */}
                    <div className="flex items-center gap-3 mb-5">
                      {/* Zakat */}
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <CheckCircle
                          size={14}
                          className="text-blue-600"
                          strokeWidth={2.5}
                        />
                        <span>Zakat</span>
                      </div>
                      <span className="w-px h-3 bg-slate-200"></span>{" "}
                      {/* Vertical Divider */}
                      {/* Sadaqah */}
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <CheckCircle
                          size={14}
                          className="text-blue-600"
                          strokeWidth={2.5}
                        />
                        <span>Sadaqah</span>
                      </div>
                      <span className="w-px h-3 bg-slate-200"></span>{" "}
                      {/* Vertical Divider */}
                      {/* Lillah */}
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <CheckCircle
                          size={14}
                          className="text-blue-600"
                          strokeWidth={2.5}
                        />
                        <span>Lillah</span>
                      </div>
                    </div>

                    {/* Time & Donor Stats */}
                    <div className="flex items-center gap-4 text-[11px] text-slate-400 font-semibold mb-6">
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} strokeWidth={2} />
                        <span>{formatDate(fund.date)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users size={13} strokeWidth={2} />
                        <span>{fund.supporters || 0} Donors</span>
                      </div>
                    </div>

                    {/* Progress Section */}
                    <div className="mt-auto">
                      <div className="flex justify-between items-end mb-2">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Raised Amount
                          </span>
                          <span className="text-lg font-black text-slate-900">
                            {formatAmount(fund.raised_amount)}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                            Goal: {formatAmount(fund.total_amount)}
                          </span>
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                            {progress}%
                          </span>
                        </div>
                      </div>

                      {/* Professional Progress Bar */}
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-5">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(37,99,235,0.3)]"
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      {/* CTA Button */}
                      <Link href={`/fundraisers/${fund.id}`} className="block">
                        {isCompleted ? (
                          <button className="w-full bg-slate-50 text-slate-400 font-bold py-3 rounded-lg cursor-default text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 border border-slate-200">
                            Campaign Successful
                          </button>
                        ) : (
                          <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all text-[11px] uppercase tracking-[0.2em] shadow-md shadow-blue-600/10 active:scale-[0.98]">
                            Contribute Now
                          </button>
                        )}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State - Professional Minimal */}
          {filteredFunds.length === 0 && (
            <div className="text-center py-32 bg-white rounded-lg border border-slate-200 border-dashed">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-50 rounded-full mb-4">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                No campaigns found
              </h3>
              <p className="text-slate-500 text-sm mt-1">
                Try adjusting your filters or search keywords.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Fundraisers;

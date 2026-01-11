"use client";
import { useEffect, useState } from "react";
import {
  Heart,
  Search,
  Clock,
  Users,
  Target,
  TrendingUp,
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

  // 🔹 Category + Search filter
  useEffect(() => {
    let data = donationFunds;

    // category filter
    if (selectedCategory !== "All") {
      data = data.filter((fund) => fund.fun_cat === selectedCategory);
    }

    // search filter
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

  const isFundCompleted = (raised, goal) => {
    console.log(raised, goal)
    if (!goal || goal === 0) return false;
    return raised >= goal;
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.slice(0, maxLength) + "..."
      : text;
  };


  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto flex gap-6 px-6 py-8">
        {/* Sidebar */}
        <aside className="w-72 shrink-0">
          <div className="sticky top-24 space-y-4">
            {/* Categories Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
              <div className="p-5">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  Categories
                </h2>
              </div>

              <div className="p-4 space-y-1">
                <button
                  onClick={() => setSelectedCategory("All")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between ${selectedCategory === "All"
                    ? "bg-blue-50 text-blue-600 scale-105"
                    : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="font-semibold">All Causes</span>
                  </span>
                </button>

                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between ${selectedCategory === category.id
                      ? "bg-blue-50 text-blue-600 scale-105"
                      : "text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    <span className="">{category.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search fundraisers by title, cause, or location..."
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 pr-12 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 shadow-sm transition-all"
              />
              <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFunds.map((fund) => (
              <div
                key={fund.id}
                className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">

                  <img
                    src={`/uploads/${fund.thumbnail}`}
                    alt={fund.title}
                    className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  {/* Title */}
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {truncateText(fund.title, 25)}
                  </h3>

                  {/* Date */}
                  <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Started — {formatDate(fund.date)}
                  </p>

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

                  {/* Progress Section */}
                  <div className="mb-5">
                    <div className="flex items-end justify-between mb-2">
                      <div>
                        <span className="text-lg font-bold text-gray-900">
                          {formatAmount(fund.raised_amount)}
                        </span>
                        <span className=" text-sm text-gray-500 ml-1">
                          raised out of 
                        </span>
                        <span className=" text-sm text-gray-500 ml-1 pl-1">
                          {formatAmount(fund.total_amount)}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-teal-400 to-emerald-500 h-3 rounded-full transition-all duration-500 
               flex items-center justify-end "
                        style={{
                          width: `${getProgress(
                            fund.raised_amount,
                            fund.total_amount
                          )}%`,
                        }}
                      >
                        <span className="text-[10px] font-semibold text-white">
                          {getProgress(fund.raised_amount, fund.total_amount)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Supporters */}
                  <div className="flex items-center gap-2 text-sm pb-5">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-gray-900">
                      {fund.supporters}
                    </span>
                    <span className="text-gray-500">Supporters</span>
                  </div>

                  {isFundCompleted(fund.raised_amount, fund.total_amount) ? (
                    <Link href={`/fundraisers/${fund.id}`}>
                      <button
                        // disabled
                        className="w-full bg-green-600 text-white font-semibold py-2.5 px-4 rounded-lg cursor-not-allowed opacity-80"
                      >
                        Successfully Funded
                      </button>
                    </Link>
                  ) : (
                    <Link href={`/fundraisers/${fund.id}`}>
                      <button className="w-full bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition">
                        Donate Now
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            ))}

            {filteredFunds.length === 0 && (
              <div className="col-span-full text-center py-16">
                <div className="inline-block p-6 bg-gray-100 rounded-full mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-lg text-gray-600 font-semibold">
                  No fundraisers found
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Fundraisers;

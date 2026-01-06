"use client";
import { useEffect, useState } from "react";
import { Heart, Search, Clock, Users, Target, TrendingUp } from "lucide-react";
import axiosInstance from "@/lib/axiosinstance";

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
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between ${
                    selectedCategory === "All"
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
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between ${
                      selectedCategory === category.id
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
                    src={fund.thumbnail}
                    alt={fund.title}
                    className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  {/* Title */}
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {fund.title}
                  </h3>

                  {/* Date */}
                  <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Started — {fund.date}
                  </p>

                  {/* Progress Section */}
                  <div className="mb-5">
                    <div className="flex items-end justify-between mb-2">
                      <div>
                        <span className="text-lg font-bold text-gray-900">
                          ₹{fund.total_amount}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">
                          raised
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-teal-400 to-emerald-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: "40%" }}
                      />
                    </div>
                  </div>

                  {/* Supporters */}
                  <div className="flex items-center gap-2 text-sm mb-5 pb-5 border-b border-gray-100">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-gray-900">0</span>
                    <span className="text-gray-500">Supporters</span>
                  </div>

                  {/* Action Button */}
                  {/* <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
                    <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Donate Now
                  </button> */}
                  <button className="w-full bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition">
                    Donate Now
                  </button>
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

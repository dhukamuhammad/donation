"use client";
import { useEffect, useState } from "react";
import { Heart, Search } from "lucide-react";
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
      data = data.filter(
        (fund) => fund.fun_cat === selectedCategory
      );
    }

    // search filter
    if (searchTerm.trim() !== "") {
      data = data.filter((fund) =>
        fund.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
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
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-[22%] bg-white p-6 min-h-screen">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            CATEGORIES
          </h2>

          <div className="space-y-1">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`w-full text-left px-4 py-3 rounded-lg ${
                selectedCategory === "All"
                  ? "text-[#2563EB] font-semibold bg-blue-50"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              All
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full text-left px-4 py-3 rounded-lg ${
                  selectedCategory === category.id
                    ? "text-[#2563EB] font-semibold bg-blue-50"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for fundraisers.."
                className="w-full px-6 py-3 border-2 border-[#2563EB] rounded-lg pr-12"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2563EB]">
                <Search className="w-5 h-5" />
              </span>
            </div>
          </div>

          {/* Fundraiser Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFunds.map((fund) => (
              <div
                key={fund.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200"
              >
                <img
                  src={fund.thumbnail}
                  alt={fund.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {fund.title}
                  </h3>

                  <p className="text-sm text-gray-500 mb-4">
                    Started From - {fund.date}
                  </p>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-xl font-bold text-gray-900">
                        ₹{fund.total_amount}
                      </span>
                      <span className="text-xs text-gray-500">
                        raised
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-2 rounded-full"
                        style={{ width: "40%" }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                    <span className="text-sm font-bold text-gray-900">
                      0
                    </span>
                    <span className="text-sm text-gray-500">
                      Supporters
                    </span>
                  </div>

                  <button className="w-full bg-[#2563EB] text-white font-bold py-3 rounded-lg">
                    Donate Now
                  </button>
                </div>
              </div>
            ))}

            {filteredFunds.length === 0 && (
              <p className="col-span-full text-center text-gray-500">
                No fundraisers found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fundraisers;

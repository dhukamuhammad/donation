"use client";
import axiosInstance from "@/lib/axiosinstance";
import {
  ArrowRight,
  CheckCircle,
  Users,
  TrendingUp,
  ChevronRight,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  // const getCategories = async () => {
  //   try {
  //     const res = await axiosInstance.get("/donationFund");
  //     setCategories(res.data);
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //   }
  // };

  const getCategories = async () => {
    try {
      const res = await axiosInstance.get("/donationFund");

      // ✅ only active campaigns
      const activeFunds = res.data.filter((item) => item.status === 1);

      setCategories(activeFunds);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <section className="py-16 bg-slate-50 font-['Outfit']">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-2">
              <TrendingUp size={16} />
              <span>Current Impact</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900">
              Trending Fundraisers
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              Urgent causes that need your immediate support and attention.
            </p>
          </div>

          <Link href="/fundraisers" className="hidden md:block">
            <button className="flex items-center gap-2 text-blue-600 font-bold text-sm hover:underline underline-offset-4 transition-all">
              View All Campaigns
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.slice(0, 3).map((item) => {
            const percentage =
              item.total_amount > 0
                ? Math.min(
                    Math.round((item.raised_amount / item.total_amount) * 100),
                    100,
                  )
                : 0;

            const isCompleted = item.raised_amount >= item.total_amount;

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
              >
                {/* Image Section */}
                <div className="relative h-52 overflow-hidden rounded-t-xl">
                  <img
                    src={`/uploads/${item.thumbnail}`}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/95 px-2.5 py-1 rounded text-[10px] font-bold text-blue-600 uppercase shadow-sm border border-slate-100">
                      Medical Aid
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-800 mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>

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

                  {/* Progress Data */}
                  <div className="mt-auto">
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                          Raised So Far
                        </p>
                        <p className="text-lg font-bold text-slate-900">
                          ₹{item.total_amount.toLocaleString("en-IN")}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-blue-600">
                          {percentage}%
                        </span>
                      </div>
                    </div>

                    {/* Standard Progress Bar */}
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-4">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all duration-700"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>

                    {/* Supporters Info */}
                    <div className="flex items-center justify-between py-3 border-t border-slate-50">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Users size={14} />
                        <span className="text-xs font-semibold">
                          {item.supporters} Donors
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">
                        Goal: ₹{item.total_amount.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* CTA Button */}
                    <Link href={`/fundraisers/${item.id}`} className="block">
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

        {/* Mobile-only View All Button */}
        <div className="mt-10 md:hidden">
          <Link href="/fundraisers">
            <button className="w-full bg-white border border-slate-200 text-slate-600 font-bold py-3 rounded-lg text-sm shadow-sm">
              View All Campaigns
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Category;

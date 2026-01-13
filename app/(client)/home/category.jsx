"use client";
import {
  ArrowRight,
  CheckCircle,
  Users,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const Category = () => {
  const categories = [
    {
      id: 1,
      title: "Monthly Ration Kits",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500",
      amount: 15165,
      goal: 500000,
      supporters: 16,
    },
    {
      id: 2,
      title: "Widow Pension Scheme",
      image: "https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=500",
      amount: 2981,
      goal: 500000,
      supporters: 9,
    },
    {
      id: 3,
      title: "Human Welfare Center",
      image: "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=500",
      amount: 21160,
      goal: 750000,
      supporters: 12,
    },
  ];

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
          {categories.map((item) => {
            const percentage = Math.min(Math.round((item.amount / item.goal) * 100), 100);

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
              >
                {/* Image Section */}
                <div className="relative h-52 overflow-hidden rounded-t-xl">
                  <img
                    src={item.image}
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
                      <CheckCircle size={14} className="text-blue-600" strokeWidth={2.5} />
                      <span>Zakat</span>
                    </div>

                    <span className="w-px h-3 bg-slate-200"></span> {/* Vertical Divider */}

                    {/* Sadaqah */}
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <CheckCircle size={14} className="text-blue-600" strokeWidth={2.5} />
                      <span>Sadaqah</span>
                    </div>

                    <span className="w-px h-3 bg-slate-200"></span> {/* Vertical Divider */}

                    {/* Lillah */}
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <CheckCircle size={14} className="text-blue-600" strokeWidth={2.5} />
                      <span>Lillah</span>
                    </div>
                  </div>


                  {/* Progress Data */}
                  <div className="mt-auto">
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Raised So Far</p>
                        <p className="text-lg font-bold text-slate-900">
                          ₹{item.amount.toLocaleString("en-IN")}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-blue-600">{percentage}%</span>
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
                        <span className="text-xs font-semibold">{item.supporters} Donors</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">Goal: ₹{item.goal.toLocaleString("en-IN")}</span>
                    </div>

                    {/* Action Button */}
                    <Link href={`/fundraisers/${item.id}`}>
                      <button className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2 text-sm">
                        Donate Now
                        <ChevronRight size={16} />
                      </button>
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
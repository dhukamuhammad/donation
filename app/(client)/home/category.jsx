"use client";
import { Heart, Coins, Moon, Book, TrendingUp, ArrowRight } from "lucide-react";

const Category = () => {
  const categories = [
    {
      id: 1,
      title: "Monthly Ration Kits",
      image:
        "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500",
      amount: 15165,
      raised: 500000,
      supporters: 16,
    },
    {
      id: 2,
      title: "Widow Pension",
      image:
        "https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=500",
      amount: 2981,
      raised: 500000,
      supporters: 9,
    },
    {
      id: 3,
      title: "Human Welfare Center",
      image:
        "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=500",
      amount: 21160,
      raised: 71529329,
      supporters: 9,
    },
  ];

  return (
    <div className="min-h-screen  py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Trending Fundraisers
          </h1>
          <p className="text-lg text-gray-600">
            Support the causes that matter most
          </p>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
          {categories.map((category) => {
            const percentage = (category.amount / category.raised) * 100;

            return (
              <div
                key={category.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 min-h-[56px]">
                    {category.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-2">
                    <button className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 text-xs px-3 py-1.5 rounded-lg hover:from-emerald-100 hover:to-teal-100 transition-all">
                      <Coins className="w-3.5 h-3.5" />
                      <span className="font-semibold">Sadaqah</span>
                    </button>
                    <button className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 text-xs px-3 py-1.5 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all">
                      <Moon className="w-3.5 h-3.5" />
                      <span className="font-semibold">Zakat</span>
                    </button>
                    <button className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 text-xs px-3 py-1.5 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-all">
                      <Book className="w-3.5 h-3.5" />
                      <span className="font-semibold">Lillah</span>
                    </button>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ₹{category.amount.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-gray-500">raised</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      Goal: ₹{category.raised.toLocaleString("en-IN")}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-teal-400 to-emerald-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {percentage.toFixed(1)}% funded
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-5 pb-5 border-b border-gray-100">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                      <span className="text-sm text-gray-700 font-semibold">
                        {category.supporters}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">Supporters</span>
                  </div>

                  <div className="flex gap-3">
                    <button className="w-full bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition">
                      Donate Now
                    </button>

                    <button className="w-full bg-gray-200 text-gray-700 font-semibold py-2.5 px-4 rounded-lg hover:bg-gray-300 transition">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-8">
          <button className="group flex items-center gap-2 text-blue-600 font-semibold py-2.5 px-6 rounded-lg hover:text-blue-700 transition">
            View All
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-3"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Category;

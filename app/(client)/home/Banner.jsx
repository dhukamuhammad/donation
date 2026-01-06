import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const Banner = () => {
  return (
    <section className="py-10 px-4 bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 relative overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 border-4 border-blue-400 rounded-full"></div>
        <div className="absolute top-20 right-20 w-16 h-16 border-4 border-indigo-400 rounded-full"></div>
        <div className="absolute bottom-10 left-1/4 w-12 h-12 border-4 border-purple-400 rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-24 h-24 border-4 border-blue-400 rounded-full"></div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-200 to-blue-200 rounded-full filter blur-3xl opacity-20"></div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Main Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
          Every Contribution{" "}
          <span className="text-[#2563EB]">
            Creates Impact
          </span>
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join thousands of compassionate donors making a real difference in
          lives every single day
        </p>

        <div className="flex justify-center">
          <button className="group w-[20%] flex items-center justify-center gap-2 bg-blue-100 text-blue-600 font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-200 transition">
            Start Donating
            <ArrowRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;

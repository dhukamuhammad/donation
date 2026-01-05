import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';

const Banner = () => {
  return (
    <section className="py-12 px-4 bg-gradient-to-br from-[#2563EB] to-blue-700">
      <div className="max-w-4xl mx-auto text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-full mb-6 shadow-lg">
          <Heart size={32} className="text-[#2563EB]" fill="#2563EB" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Your Small Contribution Can Make a Big Difference
        </h2>

        {/* Description */}
        <p className="text-lg md:text-x text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of donors who are changing lives every day. Your generosity brings hope to those in need.
        </p>

        {/* Donate Button */}
        <button className="group bg-white text-[#2563EB] px-10 py-4 rounded-lg hover:bg-blue-50 transition font-bold text-lg shadow-2xl inline-flex items-center gap-3">
          <Heart size={22} fill="#2563EB" />
          Donate Now
          <ArrowRight size={22} className="group-hover:translate-x-1 transition" />
        </button>
      </div>
    </section>
  );
};

export default Banner;
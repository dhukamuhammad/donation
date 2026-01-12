import React from "react";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import Link from "next/link";

const Banner = () => {
  return (
    <>
      <section className="py-20 px-6 bg-white font-['Outfit'] relative overflow-hidden border-t border-slate-100">

        {/* --- Subtle Decorative Background --- */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 border-[4px] border-blue-600 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 border-[4px] border-slate-900 rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">

          {/* Professional Top Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-50 text-blue-600 px-4 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider mb-8 border border-slate-200">
            <Sparkles size={14} />
            <span>Make a Difference Today</span>
          </div>

          {/* Balanced Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
            Every Contribution <br />
            <span className="text-blue-600">Creates Lasting Impact</span>
          </h2>

          {/* Clean Description */}
          <p className="text-sm md:text-base text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed font-medium">
            Join a community of thousands of verified donors who are changing
            lives through transparent and impactful social welfare programs.
          </p>

          {/* Action Buttons Area */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/fundraisers" className="w-full sm:w-auto">
              <button className="group w-full sm:w-52 flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all shadow-sm active:scale-95">
                Start Donating
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <div className="flex items-center gap-2 text-slate-400 font-bold text-xs bg-slate-50 px-4 py-3 rounded-lg border border-slate-200">
              <ShieldCheck size={16} className="text-blue-600" />
              100% Secure & Tax Exempt (80G)
            </div>
          </div>

          {/* Clean Impact Stats Grid */}
          <div className="mt-20 pt-10 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Active Donors', val: '12k+' },
              { label: 'Funds Raised', val: '₹2.5Cr+' },
              { label: 'Lives Impacted', val: '45k+' },
              { label: 'NGO Rating', val: '4.9/5' },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-xl border border-transparent hover:border-slate-100 hover:bg-slate-50 transition-all">
                <p className="text-2xl font-bold text-slate-900">{stat.val}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>

      </section>


      <section className="py-10 bg-blue-600 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to make an impact?
          </h2>
          <p className="text-blue-100 mb-10 text-lg">
            Join thousands of donors who trust DonateCare for their charitable contributions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/fundraisers">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold shadow-xl hover:bg-blue-50 transition-all active:scale-95">
                View Live Fundraisers
              </button>
            </Link>
            <Link href="/signUp">
              <button className="border-2 border-white/30 text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-all">
                Register as a Donor
              </button>
            </Link>
          </div>
        </div>
      </section>

    </>

  );
};

export default Banner;
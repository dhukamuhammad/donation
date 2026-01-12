"use client";
import React from "react";
import { 
  Heart, 
  ShieldCheck, 
  Users, 
  Target, 
  CheckCircle, 
  ArrowRight,
  HandHelping,
  Globe
} from "lucide-react";
import Link from "next/link";

const AboutPage = () => {
  const stats = [
    { label: "Lives Impacted", val: "45,000+" },
    { label: "Verified Campaigns", val: "1,200+" },
    { label: "Active Donors", val: "12,000+" },
    { label: "Success Rate", val: "98%" },
  ];

  const values = [
    {
      title: "100% Transparency",
      desc: "Every rupee you donate is tracked and reported. We ensure donors know exactly where their money goes.",
      icon: ShieldCheck,
    },
    {
      title: "Verified Causes",
      desc: "Our team personally verifies every medical report and document before any fundraiser goes live.",
      icon: CheckCircle,
    },
    {
      title: "Direct Impact",
      desc: "We work directly with hospitals and schools to ensure funds are utilized for their intended purpose.",
      icon: Target,
    },
  ];

  return (
    <div className="min-h-screen bg-white font-['Outfit']">
      
      {/* --- Hero Section --- */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-blue-100">
            <Heart size={14} fill="currentColor" />
            <span>Our Mission</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            Making Kindness <span className="text-blue-600">Transparent</span> and Impactful.
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            DonateCare is a verified donation platform dedicated to bridging the gap between 
            generous hearts and those in urgent need of medical, educational, and social support.
          </p>
        </div>
      </section>

      {/* --- Stats Section --- */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-xl border border-slate-100 bg-slate-50/50">
                <p className="text-3xl font-bold text-blue-600 mb-1">{stat.val}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Our Story Section --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800" 
                alt="Our Impact" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-8 rounded-2xl shadow-xl hidden lg:block">
               <p className="text-4xl font-bold">05+</p>
               <p className="text-xs font-bold uppercase tracking-wider opacity-80">Years of Trust</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">How it all started?</h2>
            <p className="text-slate-600 leading-relaxed">
              Based in <strong>Mahi (Banaskantha, Gujarat)</strong>, DonateCare started with a simple observation: 
              many people want to help, but they are often held back by a lack of trust and transparency. 
            </p>
            <p className="text-slate-600 leading-relaxed">
              We built this platform to ensure that every donor feels secure. Our rigorous verification process 
              ensures that help reaches the right person at the right time. From monthly ration kits to 
              critical heart surgeries, we have been the silent support for thousands of families.
            </p>
            <div className="pt-4">
               <div className="flex items-center gap-4 p-4 rounded-xl border border-blue-100 bg-blue-50/30">
                  <ShieldCheck className="text-blue-600 shrink-0" size={32} />
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Government Approved NGO</p>
                    <p className="text-xs text-slate-500">Registered and compliant with all social welfare regulations.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Core Values --- */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Our Core Principles</h2>
          <p className="text-slate-500 mt-2">The foundation of every life we touch.</p>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {values.map((value, i) => (
            <div key={i} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
                <value.icon className="text-blue-600" size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-3">{value.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Location & Reach --- */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
           <div className="space-y-6 order-2 md:order-1">
              <h2 className="text-3xl font-bold text-slate-900">Rooted in Gujarat, <br /> Serving Humanity.</h2>
              <p className="text-slate-600 leading-relaxed">
                While our headquarters are in <strong>Vadgam, Banaskantha</strong>, our reach extends 
                across the nation. We collaborate with local volunteers and organizations to 
                identify the most marginalized communities.
              </p>
              <ul className="space-y-3">
                {['Widow Support Programs', 'Educational Scholarships', 'Emergency Medical Aid', 'Clean Water Initiatives'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <CheckCircle size={16} className="text-green-500" /> {item}
                  </li>
                ))}
              </ul>
           </div>
           <div className="bg-slate-900 rounded-2xl p-10 text-white relative overflow-hidden order-1 md:order-2">
              <Globe className="absolute -right-10 -bottom-10 text-white/5" size={300} />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Want to collaborate?</h3>
                <p className="text-slate-400 mb-8 text-sm leading-relaxed">
                  We are always looking for volunteers and corporate partners who share our vision 
                  of a better, kinder world.
                </p>
                <Link href="/contact">
                  <button className="bg-white text-slate-900 px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors flex items-center gap-2">
                    Contact Our Team <ArrowRight size={16} />
                  </button>
                </Link>
              </div>
           </div>
        </div>
      </section>

      {/* --- Final Call to Action --- */}
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

    </div>
  );
};

export default AboutPage;
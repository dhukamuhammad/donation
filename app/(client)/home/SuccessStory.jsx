"use client";
import { useState, useEffect } from "react";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Heart,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";

const SuccessStory = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const stories = [
    {
      id: 1,
      name: "Rahul Sharma",
      image: "https://www.shutterstock.com/image-photo/new-delhi-india-19-july-600nw-2342745805.jpg",
      campaign: "Medical Treatment",
      amount: "₹5,00,000",
      title: "A Second Chance at Life",
      description: "Thanks to the generous donations from this platform, I was able to afford my mother's heart surgery. The support we received was overwhelming and life-changing.",
      date: "Dec 2024",
    },
    {
      id: 2,
      name: "Priya Patel",
      image: "https://media.istockphoto.com/id/458346767/photo/street-clinic-new-delhi-india.jpg?s=612x612&w=0&k=20&c=Uru8gSDse-a6nVbR_P8Fhu50m4XMY48jOtfL7wDt2VI=",
      campaign: "Education Support",
      amount: "₹2,50,000",
      title: "Dreams Come True",
      description: "I never thought I could complete my engineering degree due to financial constraints. This platform connected me with amazing donors who believed in my dreams.",
      date: "Nov 2024",
    },
    {
      id: 3,
      name: "Amit Kumar",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-miR6UWBNZWyT2jAvxrTO9fvKk0BJlz1cnQ&s",
      campaign: "Emergency Help",
      amount: "₹3,00,000",
      title: "Rebuilding Hope",
      description: "When our house was damaged in floods, we had nowhere to go. The quick response and generous contributions helped us rebuild our home and our lives.",
      date: "Oct 2024",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stories.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [stories.length]);

  const nextStory = () => setCurrentIndex((prev) => (prev + 1) % stories.length);
  const prevStory = () => setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);

  return (
    <section className="py-20 bg-slate-50 font-['Outfit'] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Heart size={14} fill="currentColor" />
            <span>Impact of your kindness</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Success <span className="text-blue-600">Stories</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
            Real stories from real people whose lives were transformed through your selfless generosity.
          </p>
        </div>

        {/* Navigation & Controls 
        

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">

          <div className="flex gap-2">
            <button
              onClick={prevStory}
              className="p-2.5 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextStory}
              className="p-2.5 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
*/}
        {/* Main Card Container */}
        <div className="relative max-w-5xl mx-auto">

          {/* Story Card - Refined & Balanced */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden relative">

            <div className="grid md:grid-cols-2">

              {/* Left Column: Image */}
              <div className="relative h-[300px] md:h-full group bg-slate-100">
                <img
                  src={stories[currentIndex].image}
                  alt={stories[currentIndex].name}
                  className="w-full h-full object-cover"
                />
                {/* Subtle Image Info */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 px-3 py-1 rounded text-[10px] font-bold text-slate-700 uppercase tracking-widest border border-slate-100 shadow-sm">
                    Verified Outcome
                  </span>
                </div>
              </div>

              {/* Right Column: Content */}
              <div className="p-8 md:p-12 flex flex-col relative">
                {/* Subtle Watermark Quote */}
                <Quote size={80} className="absolute top-6 right-6 text-slate-50 -z-0" fill="currentColor" />

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#2563eb" className="text-blue-600" />
                    ))}
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                    "{stories[currentIndex].title}"
                  </h3>

                  <p className="text-slate-600 text-sm md:text-base leading-relaxed italic">
                    {stories[currentIndex].description}
                  </p>

                  <div className="pt-8 border-t border-slate-100 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Funded Amount</p>
                      <p className="text-xl font-bold text-blue-600">{stories[currentIndex].amount}</p>
                    </div>
                    <div className="text-right flex flex-col justify-end">
                      <p className="font-bold text-slate-800 text-sm">{stories[currentIndex].name}</p>
                      <p className="text-[11px] text-slate-400">{stories[currentIndex].date}</p>
                    </div>
                  </div>

                  {/* Tiny Link/Badge */}
                  <div className="pt-2 flex items-center gap-2">
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {stories[currentIndex].campaign}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Simple Pagination Indicators */}
          <div className="flex justify-center gap-2.5 mt-10">
            {stories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 h-1 rounded-full ${idx === currentIndex
                  ? "w-8 bg-blue-600"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>


      {/* --- Final Call to Action --- */}



    </section>
  );
};

export default SuccessStory;
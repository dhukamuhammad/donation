"use client";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const SuccessStory = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const stories = [
    {
      id: 1,
      name: "Rahul Sharma",
      image:
        "https://www.shutterstock.com/image-photo/new-delhi-india-19-july-600nw-2342745805.jpg",
      campaign: "Medical Treatment",
      amount: "₹5,00,000",
      title: "A Second Chance at Life",
      description:
        "Thanks to the generous donations from this platform, I was able to afford my mother's heart surgery. The support we received was overwhelming and life-changing.",
      rating: 5,
      date: "December 2024",
    },
    {
      id: 2,
      name: "Priya Patel",
      image:
        "https://media.istockphoto.com/id/458346767/photo/street-clinic-new-delhi-india.jpg?s=612x612&w=0&k=20&c=Uru8gSDse-a6nVbR_P8Fhu50m4XMY48jOtfL7wDt2VI=",
      campaign: "Education Support",
      amount: "₹2,50,000",
      title: "Dreams Come True Through Education",
      description:
        "I never thought I could complete my engineering degree due to financial constraints. This platform connected me with amazing donors who believed in my dreams.",
      rating: 5,
      date: "November 2024",
    },
    {
      id: 3,
      name: "Amit Kumar",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-miR6UWBNZWyT2jAvxrTO9fvKk0BJlz1cnQ&s",
      campaign: "Emergency Help",
      amount: "₹3,00,000",
      title: "Rebuilding Hope After Disaster",
      description:
        "When our house was damaged in floods, we had nowhere to go. The quick response and generous contributions helped us rebuild our home.",
      rating: 5,
      date: "October 2024",
    },
    {
      id: 4,
      name: "Sneha Gupta",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuW70DVHU8OhXwx8V4ANPss1lrzSZ-CNzD6Q&s",
      campaign: "Medical Treatment",
      amount: "₹4,00,000",
      title: "My Daughter's Miracle Recovery",
      description:
        "My daughter was diagnosed with a serious illness and we had no resources for treatment. The compassionate donors became our ray of hope.",
      rating: 5,
      date: "September 2024",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stories.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [stories.length]);

  const goToStory = (index) => setCurrentIndex(index);

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real stories from real people whose lives were transformed through
            your generosity
          </p>
        </div>

        {/* Slider */}
        <div className="relative max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {stories.map((story, index) => (
              <div
                key={story.id}
                className={`${index === currentIndex ? "block" : "hidden"}`}
              >
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  {/* Image */}
                  <div className="relative">
                    <div className="relative h-[320px] rounded-2xl overflow-hidden shadow-xl">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                      {/* Name badge - bottom end */}
                      <div className="absolute bottom-6 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md w-fit">
                        <p className="font-bold text-gray-900 text-base">
                          {story.name}
                        </p>
                        <p className="text-sm text-gray-600">{story.date}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center">
                    <h3 className="text-3xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight">
                      {story.title}
                    </h3>

                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      "{story.description}"
                    </p>

                    <div className="text-blue-600 mb-6">
                      <p className="text-2xl font-bold">{story.amount}</p>
                    </div>
                  </div>
                </div>

                {/* Dots bottom */}
                <div className="flex justify-center gap-2 pb-6">
                  {stories.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToStory(idx)}
                      className={`transition-all duration-300 ${
                        idx === currentIndex
                          ? "w-10 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                          : "w-3 h-3 bg-gray-300 hover:bg-gray-400 rounded-full"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStory;

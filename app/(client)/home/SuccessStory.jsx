"use client"
import { useState, useEffect } from 'react';
import { Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const SuccessStory = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const stories = [
    {
      id: 1,
      name: 'Rahul Sharma',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
      campaign: 'Medical Treatment',
      amount: '₹5,00,000',
      title: 'A Second Chance at Life',
      description: 'Thanks to the generous donations from this platform, I was able to afford my mother\'s heart surgery. The support we received was overwhelming and life-changing.',
      rating: 5,
      date: 'December 2024'
    },
    {
      id: 2,
      name: 'Priya Patel',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=400&fit=crop',
      campaign: 'Education Support',
      amount: '₹2,50,000',
      title: 'Dreams Come True Through Education',
      description: 'I never thought I could complete my engineering degree due to financial constraints. This platform connected me with amazing donors who believed in my dreams.',
      rating: 5,
      date: 'November 2024'
    },
    {
      id: 3,
      name: 'Amit Kumar',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=400&fit=crop',
      campaign: 'Emergency Help',
      amount: '₹3,00,000',
      title: 'Rebuilding Hope After Disaster',
      description: 'When our house was damaged in floods, we had nowhere to go. The quick response and generous contributions helped us rebuild our home.',
      rating: 5,
      date: 'October 2024'
    },
    {
      id: 4,
      name: 'Sneha Gupta',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=400&fit=crop',
      campaign: 'Medical Treatment',
      amount: '₹4,00,000',
      title: 'My Daughter\'s Miracle Recovery',
      description: 'My daughter was diagnosed with a serious illness and we had no resources for treatment. The compassionate donors became our ray of hope.',
      rating: 5,
      date: 'September 2024'
    }
  ];

  // Auto slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stories.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [stories.length]);

  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const goToStory = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <h2 className="text-3xl font-bold text-gray-800">Success Stories</h2>
          </div>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Real stories from real people whose lives were transformed through your generosity
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Stories */}
            {stories.map((story, index) => (
              <div
                key={story.id}
                className={`transition-opacity duration-700 ${
                  index === currentIndex ? 'block' : 'hidden'
                }`}
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Left - Image */}
                  <div className="relative h-[300px] md:h-[350px]">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {/* Profile Badge on Image */}
                    <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {story.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-sm">{story.name}</p>
                          <p className="text-xs text-gray-600">{story.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right - Content */}
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    {/* Category Badge */}
                    <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#2563EB] px-3 py-1.5 rounded-full text-xs font-medium mb-3 w-fit">
                      <Heart size={14} fill="#2563EB" />
                      {story.campaign}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                      {story.title}
                    </h3>

                    {/* Rating */}
                    <div className="flex gap-1 mb-3">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="#2563EB" className="text-[#2563EB]" />
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-base leading-relaxed mb-4">
                      {story.description}
                    </p>

                    {/* Amount Raised */}
                    <div className="bg-gradient-to-r from-[#2563EB] to-blue-600 text-white px-5 py-3 rounded-lg inline-block mb-4">
                      <p className="text-xs font-medium mb-0.5">Amount Raised</p>
                      <p className="text-2xl font-bold">{story.amount}</p>
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex gap-2">
                      {stories.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToStory(index)}
                          className={`transition-all duration-300 ${
                            index === currentIndex
                              ? 'w-10 h-2.5 bg-[#2563EB] rounded-full'
                              : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400 rounded-full'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevStory}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-800 p-2.5 rounded-full shadow-lg transition z-10 hidden md:block"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextStory}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-800 p-2.5 rounded-full shadow-lg transition z-10 hidden md:block"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
          <div className="text-center">
            <p className="text-2xl font-bold text-[#2563EB] mb-1">500+</p>
            <p className="text-gray-600 text-xs">Success Stories</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#2563EB] mb-1">₹10 Cr+</p>
            <p className="text-gray-600 text-xs">Funds Raised</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#2563EB] mb-1">10,000+</p>
            <p className="text-gray-600 text-xs">Lives Changed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#2563EB] mb-1">95%</p>
            <p className="text-gray-600 text-xs">Success Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStory;
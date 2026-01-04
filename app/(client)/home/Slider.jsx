"use client"
import { useState, useEffect } from 'react';

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const slides = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=600&fit=crop',
            title: 'Transform Lives Through Giving',
            description: 'Your generosity can bring hope and change lives. Join us in making a difference today.',
            buttonText: 'Start Donating'
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&h=600&fit=crop',
            title: 'Support Medical Emergencies',
            description: 'Help families in critical need. Every contribution counts towards saving lives.',
            buttonText: 'Donate Now'
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1200&h=600&fit=crop',
            title: 'Empower Through Education',
            description: 'Give children the gift of education and a brighter future. Be part of their success story.',
            buttonText: 'Support Education'
        }
    ];

    // Auto slide every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    // Touch handlers for swipe
    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 75) {
            // Swipe left
            nextSlide();
        }

        if (touchStart - touchEnd < -75) {
            // Swipe right
            prevSlide();
        }
    };

    return (
        <div
            className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-gray-900"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    {/* Background Image with Overlay */}
                    <div className="relative w-full h-full">
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                            <div className="max-w-2xl">
                                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                                    {slide.title}
                                </h1>
                                <p className="text-lg md:text-xl text-gray-200 mb-8">
                                    {slide.description}
                                </p>
                                <button className="bg-[#2563EB] text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 duration-300">
                                    {slide.buttonText}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all duration-300 ${index === currentSlide
                                ? 'w-8 h-3 bg-[#2563EB] rounded-full'
                                : 'w-3 h-3 bg-white/50 hover:bg-white/70 rounded-full'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;
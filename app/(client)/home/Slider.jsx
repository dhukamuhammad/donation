"use client";
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const slides = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&h=800&fit=crop',
            title: 'Transform Lives Through Giving',
            description: 'Your small contribution can bring big changes. Join our mission to empower communities across India with transparency and care.',
            buttonText: 'Start Donating',
            link: '/fundraisers'
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&h=800&fit=crop',
            title: 'Support Medical Emergencies',
            description: 'Critical care cannot wait. We help families bridge the gap between life-saving treatment and financial struggle.',
            buttonText: 'Save a Life',
            link: '/fundraisers'
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1600&h=800&fit=crop',
            title: 'Gift of Education',
            description: 'Every child deserves a dream. Support our education funds to build the foundation of a brighter future for the next generation.',
            buttonText: 'Educate a Child',
            link: '/fundraisers'
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    const goToSlide = (index) => setCurrentSlide(index);

    const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
    const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 75) nextSlide();
        if (touchStart - touchEnd < -75) prevSlide();
    };

    return (
        <div
            className="relative w-full h-[450px] md:h-[550px] overflow-hidden bg-slate-900 font-['Outfit']"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Slides Container */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                >
                    {/* Background Image */}
                    <div className="relative w-full h-full">
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                        />
                        {/* Solid Dark Overlay for Professional Contrast */}
                        <div className="absolute inset-0 bg-slate-900/60 bg-gradient-to-r from-slate-900/80 to-transparent"></div>
                    </div>

                    {/* Content Section */}
                    <div className="absolute inset-0 flex items-center">
                        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                            <div className="max-w-xl">
                                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
                                    {slide.title}
                                </h1>
                                <p className="text-sm md:text-lg text-slate-200 mb-8 leading-relaxed max-w-md font-medium">
                                    {slide.description}
                                </p>
                                <Link href={slide.link}>
                                    <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all font-bold text-sm shadow-md flex items-center gap-2 group">
                                        {slide.buttonText}
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows - Standard Solid Style */}
            <div className="hidden md:flex absolute inset-x-6 top-1/2 -translate-y-1/2 justify-between pointer-events-none">
                <button 
                    onClick={prevSlide}
                    className="p-2.5 rounded-md bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all pointer-events-auto active:scale-95"
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={24} />
                </button>
                <button 
                    onClick={nextSlide}
                    className="p-2.5 rounded-md bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all pointer-events-auto active:scale-95"
                    aria-label="Next slide"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Minimalist Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className="focus:outline-none py-2"
                    >
                        <div className={`h-1 rounded-full transition-all duration-500 ${
                            index === currentSlide 
                                ? 'w-10 bg-blue-600' 
                                : 'w-3 bg-white/40 hover:bg-white/60'
                        }`} />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Slider;
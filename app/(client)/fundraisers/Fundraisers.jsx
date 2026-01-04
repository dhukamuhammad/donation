"use client";
import { useState } from "react";

import { Heart, Search } from 'lucide-react';

const Fundraisers = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [statusFilter, setStatusFilter] = useState(false);
    const [eligibilityFilters, setEligibilityFilters] = useState({
        sadaqah: false,
        zakat: false,
        lillah: false,
        bankInterest: false
    });

    const categories = [
        'All',
        'Medical Treatment',
        'Community Development',
        'Disaster Relief',
        'Education',
        'Food & Hunger',
        'Personal Causes',
        'Senior Citizens',
        'Soldiers'
    ];

    const fundraisers = [
        {
            id: 1,
            title: "Save Asif's Life",
            image: "https://images.unsplash.com/photo-1632053002928-9509c6ba878e?w=500",
            startDate: "23 Dec 2025",
            amount: "₹45,561",
            target: "₹1,90,000",
            percentage: 24,
            supporters: 120,
            tags: ["Sadaqah", "Zakat", "Lillah"]
        },
        {
            id: 2,
            title: "Save Saad's Life",
            image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500",
            startDate: "16 Dec 2025",
            amount: "₹98,746",
            target: "₹4,50,000",
            percentage: 22,
            supporters: 169,
            tags: ["Sadaqah", "Zakat", "Lillah"]
        },
        {
            id: 3,
            title: "Support a Future Engineer",
            image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=500",
            startDate: "13 Dec 2025",
            amount: "₹85,996",
            target: "₹3,00,000",
            percentage: 29,
            supporters: 81,
            tags: ["Sadaqah", "Zakat", "Lillah"]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                {/* Sidebar */}
                <div className="w-[22%] bg-white p-6 min-h-screen">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">CATEGORIES</h2>
                    <div className="space-y-1">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${selectedCategory === category
                                    ? 'text-[#2563EB] font-semibold bg-blue-50'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8">
                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search fo fundraisers.."
                                className="w-full px-6 py-3 border-2 border-[#2563EB] rounded-lg focus:outline-none focus:border-[#2563EB] pr-12"
                            />
                            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2563EB]">
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex items-center gap-8 mb-8 flex-wrap">
                        <h3 className="text-2xl font-bold text-gray-900">All</h3>

                        <div className="flex items-center gap-2">
                            <span className="text-gray-700 font-medium">Status</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#2563EB] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                            </label>
                            <span className="text-gray-600 text-sm">Successfully Funded</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-gray-700 font-medium">Eligibility</span>

                            <div className="flex items-center gap-2">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={eligibilityFilters.sadaqah}
                                        onChange={(e) => setEligibilityFilters({ ...eligibilityFilters, sadaqah: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#2563EB] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                </label>
                                <span className="text-gray-600 text-sm">Sadaqah</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={eligibilityFilters.zakat}
                                        onChange={(e) => setEligibilityFilters({ ...eligibilityFilters, zakat: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#2563EB] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                </label>
                                <span className="text-gray-600 text-sm">Zakat</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={eligibilityFilters.lillah}
                                        onChange={(e) => setEligibilityFilters({ ...eligibilityFilters, lillah: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#2563EB] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                </label>
                                <span className="text-gray-600 text-sm">Lillah</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={eligibilityFilters.bankInterest}
                                        onChange={(e) => setEligibilityFilters({ ...eligibilityFilters, bankInterest: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#2563EB] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                </label>
                                <span className="text-gray-600 text-sm">Bank Interest</span>
                            </div>
                        </div>
                    </div>

                    {/* Fundraiser Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {fundraisers.map((fundraiser) => (
                            <div key={fundraiser.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                                <div className="relative">
                                    <img
                                        src={fundraiser.image}
                                        alt={fundraiser.title}
                                        className="w-full h-56 object-cover"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <div className="flex items-center gap-1 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                            <span className="font-semibold">TAX BENEFITS</span>
                                            <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                                                <span className="text-red-500 text-[10px] font-bold">i</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{fundraiser.title}</h3>
                                    <p className="text-sm text-gray-500 mb-4">Started From - {fundraiser.startDate}</p>
                                    <div className="flex gap-2 mb-4">
                                        {fundraiser.tags.map((tag) => (
                                            <button key={tag} className="flex items-center gap-1 bg-emerald-500 text-white text-xs px-2 py-1 rounded">
                                                <span>✓</span>
                                                <span className="font-medium">{tag}</span>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex items-baseline gap-1 mb-2">
                                            <span className="text-xl font-bold text-gray-900">{fundraiser.amount}</span>
                                            <span className="text-xs text-gray-500">raised out of</span>
                                        </div>
                                        <div className="text-sm text-gray-600 mb-2">{fundraiser.target}</div>
                                        <div className="w-full bg-gray-200 rounded-full h-2 relative">
                                            <div
                                                className="bg-emerald-500 h-2 rounded-full"
                                                style={{ width: `${fundraiser.percentage}%` }}
                                            ></div>
                                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white">
                                                {fundraiser.percentage}%
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mb-4">
                                        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                                        <span className="text-sm font-bold text-gray-900">{fundraiser.supporters}</span>
                                        <span className="text-sm text-gray-500">Supporters</span>
                                    </div>

                                    <button className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                                        Donate Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Fundraisers;
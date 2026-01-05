"use client";
import { Heart, Coins, Moon, Book } from 'lucide-react';

const Category = () => {
    const categories = [
        {
            id: 1,
            title: "Monthly Ration Kits",
            image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500",
            amount: 15165,
            raised: 500000,
            supporters: 16,
            tags: ["TAX BENEFITS"]
        },
        {
            id: 2,
            title: "Widow Pension",
            image: "https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=500",
            amount: 2981,
            raised: 500000,
            supporters: 9,
            tags: ["TAX BENEFITS"]
        },
        {
            id: 3,
            title: "Human Welfare Center",
            image: "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=500",
            amount: 21160,
            raised: 71529329,
            supporters: 9,
            tags: ["TAX BENEFITS"]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Trending Fundraisers
                    </h1>
                    <p className="text-gray-600">
                        View the fundraisers that are most active right now
                    </p>
                </div>

                {/* Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-2">
                    {categories.map((category) => {
                        const percentage = (category.amount / category.raised) * 100;

                        return (
                            <div key={category.id} className="bg-white rounded-lg overflow-hidden border border-gray-200">
                                <div className="relative">
                                    <img
                                        src={category.image}
                                        alt={category.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        {category.tags.map((tag, idx) => (
                                            <div key={idx} className="flex items-center gap-1 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                                <span className="font-semibold">{tag}</span>
                                                <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                                                    <span className="text-red-500 text-[10px] font-bold">i</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-4">
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">{category.title}</h3>

                                    <div className="flex gap-2 mb-3">
                                        <button className="flex items-center gap-1 bg-emerald-500 text-white text-xs px-2 py-1 rounded">
                                            <Coins className="w-3 h-3" />
                                            <span className="font-medium">Sadaqah</span>
                                        </button>
                                        <button className="flex items-center gap-1 bg-emerald-500 text-white text-xs px-2 py-1 rounded">
                                            <Moon className="w-3 h-3" />
                                            <span className="font-medium">Zakat</span>
                                        </button>
                                        <button className="flex items-center gap-1 bg-emerald-500 text-white text-xs px-2 py-1 rounded">
                                            <Book className="w-3 h-3" />
                                            <span className="font-medium">Lillah</span>
                                        </button>
                                    </div>

                                    <div className="mb-3">
                                        <div className="flex items-baseline gap-1 mb-1">
                                            <span className="text-xl font-bold text-gray-900">₹{category.amount.toLocaleString('en-IN')}</span>
                                            <span className="text-xs text-gray-500">raised out of ₹{category.raised.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                                            <div className="bg-teal-400 h-1.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1 mb-4">
                                        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                                        <span className="text-sm text-gray-700 font-medium">{category.supporters}</span>
                                        <span className="text-sm text-gray-500">Supporters</span>
                                    </div>

                                    <button className="w-full bg-[#2563EB] text-white font-bold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-all">
                                        Donate Now
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* View More Button
                <div className="text-center mt-8">
                    <button className="bg-[#2563EB] text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-all inline-flex items-center gap-2">
                        View More
                        <span className="text-lg">→</span>
                    </button>
                </div>
                 */}
            </div>
        </div>
    );
};

export default Category;
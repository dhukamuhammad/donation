"use client";
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Calendar } from 'lucide-react';
import Link from 'next/link';

const DonationFundPage = () => {
    const [funds, setFunds] = useState([
        {
            id: 1,
            title: 'Help Jayram Fight Cancer',
            thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100&h=100&fit=crop',
            totalAmount: 90000,
            startDate: '2025-04-25',
            endDate: '2025-06-25'
        },
        {
            id: 2,
            title: "Raza's Heart Surgery Fund",
            thumbnail: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=100&h=100&fit=crop',
            totalAmount: 600000,
            startDate: '2025-04-25',
            endDate: '2025-07-25'
        },
        {
            id: 3,
            title: 'Healing Hope',
            thumbnail: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=100&h=100&fit=crop',
            totalAmount: 762600,
            startDate: '2025-04-25',
            endDate: '2025-05-30'
        }
    ]);

    const handleDelete = (id) => {
        setFunds(funds.filter(fund => fund.id !== id));
    };

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="p-6">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Donation Fund Management
                </h1>
                <Link href="/admin/donationFund/add-donationFund">
                    <button className="flex items-center gap-2 bg-[#2563EB] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md text-sm">
                        <Plus size={18} />
                        <span className="font-medium">Add Donation Fund</span>
                    </button>
                </Link>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 w-16">
                                    ID
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 min-w-[200px]">
                                    TITLE
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 w-28">
                                    THUMBNAIL
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 w-32">
                                    TOTAL AMOUNT
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 w-32">
                                    START DATE
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 w-32">
                                    END DATE
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 w-36">
                                    ACTIONS
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {funds.map((fund) => (
                                <tr key={fund.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3 text-gray-800 font-medium text-sm">
                                        {fund.id}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="text-gray-800 font-medium text-sm">
                                            {fund.title}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-center">
                                            <img
                                                src={fund.thumbnail}
                                                alt={fund.title}
                                                className="w-14 h-14 rounded-lg object-cover border-2 border-gray-200 shadow-sm"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="text-gray-800 font-semibold text-sm">
                                            {formatAmount(fund.totalAmount)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2 text-gray-700 text-sm">
                                            <span>{formatDate(fund.startDate)}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2 text-gray-700 text-sm">
                                            <span>{formatDate(fund.endDate)}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="flex items-center gap-1.5 text-[#2563EB] hover:bg-blue-50 px-2.5 py-1.5 rounded-lg transition-colors">
                                                <Edit2 size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(fund.id)}
                                                className="flex items-center gap-1.5 text-red-600 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {funds.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-gray-500 text-base">No donation funds available</p>
                        <p className="text-gray-400 text-xs mt-1">Click "Add Donation Fund" to create one</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DonationFundPage;
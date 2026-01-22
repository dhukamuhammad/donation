"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft,
    Mail,
    Phone,
    ShieldCheck,
    User as UserIcon,
    Loader2,
    TrendingUp
} from "lucide-react";
import axiosInstance from "@/lib/axiosinstance";
import Image from "next/image";

const UserHistory = () => {
    const { id } = useParams();
    const router = useRouter();

    const [userData, setUserData] = useState(null);
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) fetchUserHistory();
    }, [id]);

    const fetchUserHistory = async () => {
        try {
            const res = await axiosInstance.get(`/users/history/${id}`);
            const donationList = Array.isArray(res.data) ? res.data : [];
            setDonations(donationList);
            setUserData(donationList.length > 0 ? donationList[0] : null);
        } catch (error) {
            console.error("Fetch Error:", error);
            setDonations([]);
            setUserData(null);
        } finally {
            setLoading(false);
        }
    };

    const formatINR = (amt) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amt || 0);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
                <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
        );
    }

    return (
        <div className="p-4 lg:p-6 bg-[#F8FAFC] min-h-screen font-['Outfit']">

            {/* Back Navigation */}
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors mb-6 group"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-widest">
                    Return to Directory
                </span>
            </button>

            {/* Profile Header */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
                <div className="p-6 flex flex-col md:flex-row items-center gap-6">
                    <div className="relative w-24 h-24 rounded-xl border-2 border-slate-50 overflow-hidden shadow-sm bg-slate-100 flex-shrink-0">
                        {userData?.user_profile_img ? (
                            <Image
                                src={`/uploads/${userData.user_profile_img}`}
                                alt="Profile"
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                <UserIcon size={32} />
                            </div>
                        )}
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight capitalize mb-2">
                            {userData?.user_name || "Unknown User"}
                        </h1>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-500">
                            <div className="flex items-center gap-1.5 text-sm font-bold">
                                <Mail size={14} className="text-blue-600" />
                                {userData?.user_email}
                            </div>
                            <div className="flex items-center gap-1.5 text-sm font-bold">
                                <Phone size={14} className="text-blue-600" />
                                {userData?.user_phone || "Not Provided"}
                            </div>

                        </div>

                        <div className="pt-3">
                            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest border border-blue-100">
                                Verified Contributor
                            </span>
                        </div>
                    </div>

                    <div className="bg-slate-900 text-white p-5 rounded-2xl w-full md:w-52">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Given</p>
                        <p className="text-2xl font-black">
                            {formatINR(donations.reduce((sum, item) => sum + (item.amount || 0), 0))}
                        </p>

                        <div className="mt-2 flex items-center gap-2 text-[11px] font-bold text-green-400">
                            <TrendingUp size={14} />
                            {donations.length} Successful Settlements
                        </div>
                    </div>
                </div>
            </div>

            {/* Donation Table - Fixed layout to prevent overflow */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-hidden"> {/* Scroll bandh kiya */}
                    <table className="w-full text-left border-collapse table-fixed">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                <th className="w-12 px-2 py-4">ID</th>
                                <th className="w-14 px-2 py-4 text-center">Fund</th>
                                <th className="px-2 py-4 min-w-[120px]">Title</th>
                                <th className="px-2 py-4 w-28">Donor</th>
                                <th className="px-2 py-4 w-32">Email</th>
                                <th className="px-2 py-4 w-24">Amount</th>
                                <th className="px-2 py-4 w-28">Mobile</th>
                                <th className="px-2 py-4 w-20">Type</th>
                                <th className="px-2 py-4 w-24 text-center">Date</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {donations.length > 0 ? (
                                donations.map((log) => (
                                    <tr key={log.id} className="hover:bg-slate-50 transition-all">
                                        <td className="px-2 py-4 text-xs font-bold text-slate-400">
                                            #{log.id}
                                        </td>

                                        <td className="px-2 py-4">
                                            <div className="relative w-10 h-10 mx-auto rounded overflow-hidden border border-slate-100">
                                                <Image
                                                    src={`/uploads/${log.fund_thumbnail}`}
                                                    alt="fund"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </td>

                                        {/* Title: Text wrap hoga niche ki line mein */}
                                        <td className="px-2 py-4">
                                            <p className="text-sm font-bold text-slate-800 leading-tight break-words">
                                                {log.fund_title}
                                            </p>
                                        </td>

                                        <td className="px-2 py-4 text-sm font-medium text-slate-600 capitalize break-words">
                                            {log.name}
                                        </td>

                                        <td className="px-2 py-4 text-xs text-slate-500 break-all leading-tight">
                                            {log.email}
                                        </td>

                                        <td className="px-2 py-4 text-sm font-black text-slate-900">
                                            {formatINR(log.amount)}
                                        </td>

                                        <td className="px-2 py-4 text-xs text-slate-500 font-bold">
                                            {log.mobile_no}
                                        </td>

                                        <td className="px-2 py-4">
                                            <span className="text-[10px] font-black text-blue-600 uppercase">
                                                {log.donation_type}
                                            </span>
                                        </td>

                                        <td className="px-2 py-4 text-center">
                                            <div className="text-xs font-bold text-slate-600 whitespace-nowrap">
                                                {new Date(log.created_date).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "short"
                                                })}
                                            </div>
                                            <div className="text-[9px] text-green-500 font-bold uppercase">Settled</div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="p-20 text-center text-slate-400">
                                        No transactions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserHistory;
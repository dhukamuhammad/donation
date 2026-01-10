"use client";
import axiosInstance from "@/lib/axiosinstance";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const MyDonation = () => {
    const router = useRouter();
    const pathname = usePathname();

    const [donations, setDonations] = useState([]);
    console.log(donations)

    /* ================= Auth Guard ================= */
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) router.push("/login");
    }, [router]);

    /* ================= Fetch My Donations ================= */
    useEffect(() => {
        fetchMyDonations();
    }, []);

    const fetchMyDonations = async () => {
        const userId = localStorage.getItem("userId");

        try {
            const res = await axiosInstance.get(`/donationFund/by-user/${userId}`);
            setDonations(res.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    /* ================= Logout ================= */
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");

            await axiosInstance.post(
                "/auth/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            localStorage.removeItem("token");
            localStorage.removeItem("userId");

            window.dispatchEvent(new Event("auth-changed"));

            router.push("/login");
            alert("Logout successful ✅");
        } catch (error) {
            alert("Logout failed ❌");
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };



    return (
        <div className="flex gap-8 max-w-[1400px] mx-auto p-8 font-['Outfit'] text-slate-700 max-md:flex-col">

            {/* ================= Sidebar ================= */}
            <div className="w-[280px] bg-white rounded border border-slate-200 p-7 h-fit sticky top-[90px]">

                <div className="pb-5 mb-5 border-b">
                    <h3 className="text-sm font-bold tracking-widest text-slate-500">
                        USER MENU
                    </h3>
                </div>

                <div className="flex flex-col gap-2">
                    <Link
                        href="/profile"
                        className={`px-4 py-3 rounded flex gap-3 items-center text-[15px]
                        ${pathname === "/profile"
                                ? "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                                : "hover:bg-blue-500/5"
                            }`}
                    >
                        My Profile
                    </Link>

                    <Link
                        href="/my-donation"
                        className={`px-4 py-3 rounded flex gap-3 items-center text-[15px]
                        ${pathname === "/my-donation"
                                ? "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                                : "hover:bg-blue-500/5"
                            }`}
                    >
                        My Donations
                    </Link>

                    <div
                        onClick={handleLogout}
                        className="px-4 py-3 rounded cursor-pointer hover:bg-blue-500/5"
                    >
                        Logout
                    </div>
                </div>
            </div>

            {/* ================= Content ================= */}
            <div className="flex-1 bg-white rounded border border-slate-200 p-8">

                <h2 className="text-2xl font-bold mb-6 text-blue-600">
                    My Donations
                </h2>

                {/* ================= Donation List ================= */}
                <div className="flex flex-col gap-5">

                    {donations.length === 0 && (
                        <p className="text-slate-500">No donations found.</p>
                    )}

                    {donations.map((item) => (
                        <div
                            key={item.id}
                            className="flex gap-6 p-5 rounded border border-slate-200 hover:shadow transition"
                        >
                            {/* Image */}
                            <Image
                                src={`/uploads/${item.thumbnail}`}
                                alt={item.title}
                                width={120}
                                height={90}
                                className="w-[120px] h-[90px] rounded object-cover"
                            />

                            {/* Details */}
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold">
                                    {item.title}
                                </h3>

                                <p className="text-sm text-slate-500 mt-1">
                                    Amount Donated:{" "}
                                    <span className="font-semibold text-green-600">
                                        ₹{item.amount}
                                    </span>
                                </p>

                                <p className="text-xs mt-2 text-slate-400">
                                    Date: {formatDate(item.created_date)}
                                </p>
                            </div>

                            {/* Status */}
                            <div className="flex items-center">
                                <span className="px-3 py-1 text-xs rounded bg-green-100 text-green-700">
                                    Successful
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyDonation;

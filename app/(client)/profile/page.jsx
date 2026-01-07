"use client";
import axiosInstance from "@/lib/axiosinstance";
import { User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const router = useRouter()

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        profile_img: ""
    });
    console.log(userData)

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        }
    }, [])


    useEffect(() => {
        const userId = localStorage.getItem("userId");
        fetchUserById(userId);
    }, []);

    const fetchUserById = async (userId) => {
        try {
            const res = await axiosInstance.get(`/auth/signup/${userId}`);
            setUserData(res.data);
        } catch (err) {
            console.error(err);
        }
    };

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
            router.push("/login");
            alert("Logout successful ✅");

            console.log(token)
        } catch (error) {
            alert("Logout failed");
        }
    };
    return (
        <div className="flex gap-8 max-w-[1400px] mx-auto p-8 font-['Outfit'] text-slate-700 max-md:flex-col max-md:p-4 max-md:gap-4">

            {/* ================= Sidebar ================= */}
            <div className="w-[280px] bg-white rounded border border-slate-200/80 p-7 h-fit max-h-[calc(100vh-120px)] sticky top-[90px] overflow-y-auto flex-shrink-0 transition-all duration-200 shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_3px_12px_rgba(0,0,0,0.06)] max-md:w-full max-md:static">

                <div className="pb-5 mb-5 border-b border-slate-200">
                    <h3 className="text-sm font-bold text-slate-500 tracking-[0.1em] relative inline-block after:content-[''] after:absolute after:-bottom-[5px] after:left-0 after:w-8 after:h-[2px] after:bg-gradient-to-r after:from-blue-500 after:to-transparent">
                        USER MENU
                    </h3>
                </div>

                <div className="flex flex-col gap-2">
                    <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-3 text-[15px] rounded border border-blue-500/15 bg-blue-500/10 text-blue-500 font-medium"
                    >
                        <i className="fas fa-user w-5 text-center text-blue-500"></i>
                        <span>My Profile</span>
                    </Link>

                    <Link
                        href="/my-donation"
                        className="flex items-center gap-3 px-4 py-3 text-[15px] text-gray-600 rounded border border-transparent transition-all hover:bg-blue-500/5 hover:text-blue-500"
                    >
                        <i className="fas fa-donate w-5 text-center text-slate-500"></i>
                        <span>My Donations</span>
                    </Link>

                    <div className="flex items-center gap-3 px-4 py-3 text-[15px] text-gray-600 rounded border border-transparent cursor-pointer transition-all hover:bg-blue-500/5 hover:text-blue-500">
                        <i className="fas fa-sign-out-alt w-5 text-center text-slate-500"></i>
                        <span onClick={handleLogout}>Logout</span>
                    </div>
                </div>
            </div>

            {/* ================= Content ================= */}
            <div className="flex-1 bg-white rounded border border-slate-200/80 p-8 transition-all duration-200 shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_3px_12px_rgba(0,0,0,0.06)] max-sm:p-6">

                {/* Header */}
                <div className="mb-8 pb-6 border-b border-slate-200">
                    <h2 className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-blue-700 bg-clip-text text-transparent mb-2">
                        My Profile
                    </h2>
                    <p className="text-slate-500">
                        Manage your account details and preferences
                    </p>
                </div>

                {/* Main */}
                <div className="flex gap-10 max-md:flex-col max-md:gap-6">

                    {/* Avatar */}
                    <div className="flex flex-col items-center p-6 bg-slate-50 rounded border border-slate-200 flex-shrink-0 w-[220px] max-md:w-full">
                        <div className="relative mb-4">
                            <div className="w-[110px] h-[110px] rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center overflow-hidden border-[3px] border-white shadow-[0_4px_10px_rgba(37,99,235,0.2)]">
                                <User size={56} className="text-white" />
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-800 text-center">
                            User Name
                        </h3>
                    </div>

                    {/* Details */}
                    <div className="flex-1">

                        <form>
                            {/* Row 1 */}
                            <div className="flex gap-6 mb-6 max-lg:flex-col max-lg:gap-4">
                                <div className="flex-1">
                                    <label className="block mb-2 text-sm font-medium text-slate-500">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
                                        <input
                                            type="text"
                                            placeholder="Enter full name"
                                            name="name"
                                            value={userData.name}
                                            disabled
                                            className="w-full pl-10 pr-4 py-3 rounded border border-slate-200 text-[15px] text-slate-700 bg-slate-100 cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <label className="block mb-2 text-sm font-medium text-slate-500">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <i className="fas fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
                                        <input
                                            type="tel"
                                            placeholder="Enter phone number"
                                            name="phone"
                                            value={userData.phone}
                                            disabled
                                            className="w-full pl-10 pr-4 py-3 rounded border border-slate-200 text-[15px] text-slate-700 bg-slate-100 cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="flex gap-6 mb-6">
                                <div className="flex-1">
                                    <label className="block mb-2 text-sm font-medium text-slate-500">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
                                        <input
                                            type="email"
                                            placeholder="Enter email"
                                            name="email"
                                            value={userData.email}
                                            disabled
                                            className="w-full pl-10 pr-4 py-3 rounded border border-slate-200 text-[15px] text-slate-700 bg-slate-100 cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>

                        {/* Actions */}
                        <div className="flex gap-4 mt-8 max-sm:flex-col">
                            <button
                                type="button"
                                className="px-6 py-3 rounded font-semibold flex items-center gap-2 bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow hover:shadow-lg transition-all max-sm:w-full justify-center"
                            >
                                <i className="fas fa-edit"></i>
                                Edit Profile
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

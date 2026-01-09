"use client";
import axiosInstance from "@/lib/axiosinstance";
import { Camera, Pencil, Save, User, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const router = useRouter();

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        profile_img: ""
    });

    const [isEdit, setIsEdit] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState("");

    /* ================= Auth Guard ================= */
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        }
    }, [router]);

    /* ================= Fetch User ================= */
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) fetchUserById(userId);
    }, []);

    const fetchUserById = async (userId) => {
        try {
            const res = await axiosInstance.get(`/auth/signup/${userId}`);
            setUserData(res.data);
            setPreview("");
            setSelectedImage(null);
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

    /* ================= Input Change ================= */
    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    /* ================= Image Change ================= */
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    /* ================= Save Profile ================= */
    const handleSave = async () => {
        try {
            const userId = localStorage.getItem("userId");

            const formData = new FormData();
            formData.append("name", userData.name);
            formData.append("email", userData.email);
            formData.append("phone", userData.phone);

            if (selectedImage) {
                formData.append("profile_img", selectedImage);
            }

            const res = await axiosInstance.put(`/auth/signup/${userId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Profile updated ✅");
            setIsEdit(false);
            fetchUserById(userId);

            if (res.data?.profile_img) {
                window.dispatchEvent(
                    new CustomEvent("profile-image-updated", {
                        detail: res.data.profile_img,
                    })
                );
            }


        } catch (err) {
            console.error(err);
            alert("Update failed ❌");
        }
    };

    const handleCancel = () => {
        setIsEdit(false);
        setSelectedImage(null);
        setPreview("");

        const userId = localStorage.getItem("userId");
        if (userId) {
            fetchUserById(userId); // reset data
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

                    <div
                        className="flex items-center gap-3 px-4 py-3 text-[15px] text-gray-600 rounded border border-transparent cursor-pointer transition-all hover:bg-blue-500/5 hover:text-blue-500"
                        onClick={handleLogout}
                    >
                        <i className="fas fa-sign-out-alt w-5 text-center text-slate-500"></i>
                        <span>Logout</span>
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
                            <div
                                className="w-[110px] h-[110px] rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center overflow-hidden border-[3px] border-white shadow-[0_4px_10px_rgba(37,99,235,0.2)] cursor-pointer"
                                onClick={() =>
                                    isEdit && document.getElementById("profileImage").click()
                                }
                            >
                                {preview || userData.profile_img ? (
                                    <img
                                        src={preview || `/uploads/${userData.profile_img}`}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                ) : (
                                    <User size={56} className="text-white" />
                                )}
                            </div>

                            {/* Camera Icon */}
                            {isEdit && (
                                <div
                                    className="absolute bottom-1 right-1 bg-white p-1.5 rounded-full shadow cursor-pointer"
                                    onClick={() =>
                                        document.getElementById("profileImage").click()
                                    }
                                >
                                    <Camera size={16} className="text-blue-600" />
                                </div>
                            )}

                            {/* Hidden File Input */}
                            {isEdit && (
                                <input
                                    type="file"
                                    id="profileImage"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            )}
                        </div>


                        <h3 className="text-xl font-semibold text-gray-800 text-center">
                            {userData.name || "User Name"}
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
                                    <input
                                        type="text"
                                        name="name"
                                        value={userData.name}
                                        onChange={handleChange}
                                        disabled={!isEdit}
                                        className="w-full px-4 py-3 rounded border border-slate-200 text-[15px] bg-slate-100"
                                    />
                                </div>

                                <div className="flex-1">
                                    <label className="block mb-2 text-sm font-medium text-slate-500">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={userData.phone}
                                        onChange={handleChange}
                                        disabled={!isEdit}
                                        className="w-full px-4 py-3 rounded border border-slate-200 text-[15px] bg-slate-100"
                                    />
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="mb-6">
                                <label className="block mb-2 text-sm font-medium text-slate-500">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    disabled
                                    className="w-full px-4 py-3 rounded border border-slate-200 text-[15px] bg-slate-200"
                                />
                            </div>
                        </form>

                        {/* Actions */}
                        <div className="flex gap-4 mt-8 max-sm:flex-col">

                            {!isEdit && (
                                <button
                                    type="button"
                                    onClick={() => setIsEdit(true)}
                                    className="px-6 py-3 rounded font-semibold flex items-center gap-2 bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow hover:shadow-lg transition-all max-sm:w-full justify-center"
                                >
                                    <Pencil size={18} /> Edit Profile
                                </button>
                            )}

                            {isEdit && (
                                <>
                                    {/* Save Button (theme-friendly green/teal) */}
                                    <button
                                        type="button"
                                        onClick={handleSave}
                                        className="px-6 py-3 rounded font-semibold flex items-center gap-2 
                           bg-gradient-to-br from-emerald-500 to-teal-600 
                           text-white shadow hover:shadow-lg transition-all 
                           max-sm:w-full justify-center"
                                    >
                                        <Save size={18} />
                                        Save Changes
                                    </button>

                                    {/* Cancel Button */}
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="px-6 py-3 rounded font-semibold flex items-center gap-2 
                           border border-slate-300 text-slate-600 
                           bg-white hover:bg-slate-100 transition-all 
                           max-sm:w-full justify-center"
                                    >
                                        <X size={18} /> Cancel
                                    </button>
                                </>
                            )}
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";
import axiosInstance from "@/lib/axiosinstance";
import { Camera, HandHeart, LogOut, Pencil, Save, User, X } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CustomModel from "@/components/CustomModel";
import {
  showSuccess,
  showError,
  showLoading,
  dismissToast,
} from "@/components/Toaster";

export default function ProfilePage() {
  const router = useRouter();
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    profile_img: "",
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
      await axiosInstance.post("/auth/logout", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.dispatchEvent(new Event("auth-changed"));
      router.push("/login");
      setShowLogoutModal(false);
    } catch (error) {
      showError("Logout failed");
    }
  };

  /* ================= Input Change ================= */
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
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
    showLoading("Updating profile...");
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
        headers: { "Content-Type": "multipart/form-data" },
      });

      dismissToast();
      showSuccess("Profile updated successfully");
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
      dismissToast();
      showError("Profile update failed");
    }
  };

  const handleCancel = () => {
    setIsEdit(false);
    setSelectedImage(null);
    setPreview("");
    const userId = localStorage.getItem("userId");
    if (userId) fetchUserById(userId);
  };

  return (
    <div className="flex gap-8 max-w-[1400px] mx-auto p-8 font-['Outfit'] text-slate-700 max-md:flex-col max-md:p-4 bg-white min-h-screen">
      
      {/* ================= Sidebar ================= */}
      <div className="w-[280px] bg-white rounded-lg border border-slate-200 p-6 h-fit sticky top-[100px] max-md:w-full max-md:static shadow-sm">
        <div className="pb-4 mb-4 border-b border-slate-100">
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">User Dashboard</h3>
        </div>

        <div className="flex flex-col gap-1">
          <Link
            href="/profile"
            className={`px-4 py-2.5 rounded-md transition-colors flex items-center gap-3 text-sm ${
              pathname === "/profile"
                ? "bg-blue-600 text-white font-bold"
                : "text-slate-600 hover:bg-slate-50 border border-transparent"
            }`}
          >
            <User size={18} />
            <span>My Profile</span>
          </Link>

          <Link
            href="/my-donation"
            className={`px-4 py-2.5 rounded-md transition-colors flex items-center gap-3 text-sm ${
              pathname === "/my-donation"
                ? "bg-blue-600 text-white font-bold"
                : "text-slate-600 hover:bg-slate-50 border border-transparent"
            }`}
          >
            <HandHeart size={18} />
            <span>My Donations</span>
          </Link>

          <div className="my-2 border-t border-slate-50 pt-2">
            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full px-4 py-2.5 rounded-md text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3 text-sm font-semibold"
            >
              <LogOut size={18} />
              <span>Logout Account</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= Content ================= */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-1">
            My Profile
          </h2>
          <p className="text-sm text-slate-500">
            Manage your personal information and account settings
          </p>
        </div>

        {/* Main Body */}
        <div className="flex gap-12 max-lg:flex-col">
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4 w-48 flex-shrink-0">
            <div className="relative">
              <div
                className={`w-32 h-32 rounded-full flex items-center justify-center overflow-hidden border-2 border-slate-100 bg-slate-50 shadow-sm ${
                  isEdit ? "cursor-pointer ring-2 ring-blue-600/20" : ""
                }`}
                onClick={() => isEdit && document.getElementById("profileImage").click()}
              >
                {preview || userData.profile_img ? (
                  <img
                    src={preview || `/uploads/${userData.profile_img}`}
                    className="w-full h-full object-cover"
                    alt="Profile"
                  />
                ) : (
                  <User size={48} className="text-slate-300" />
                )}
              </div>

              {isEdit && (
                <div
                  className="absolute bottom-1 right-1 bg-blue-600 p-2 rounded-full text-white shadow-md cursor-pointer hover:bg-blue-700 transition-colors border-2 border-white"
                  onClick={() => document.getElementById("profileImage").click()}
                >
                  <Camera size={14} />
                </div>
              )}
              <input type="file" id="profileImage" accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>
            <div className="text-center">
              <p className="font-bold text-slate-800">{userData.name || "User"}</p>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Account Member</p>
            </div>
          </div>

          {/* Details Form */}
          <div className="flex-1 max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  disabled={!isEdit}
                  className={`w-full px-4 py-3 rounded-lg border text-sm transition-all outline-none ${
                    !isEdit 
                      ? "bg-slate-50 border-slate-200 text-slate-500" 
                      : "bg-white border-blue-200 focus:border-blue-600 shadow-sm"
                  }`}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  disabled={!isEdit}
                  className={`w-full px-4 py-3 rounded-lg border text-sm transition-all outline-none ${
                    !isEdit 
                      ? "bg-slate-50 border-slate-200 text-slate-500" 
                      : "bg-white border-blue-200 focus:border-blue-600 shadow-sm"
                  }`}
                />
              </div>
            </div>

            <div className="space-y-1.5 mb-8">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                disabled
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-100 text-slate-400 text-sm cursor-not-allowed"
              />
              <p className="text-[10px] text-slate-400 mt-1">* Email cannot be changed for security reasons.</p>
            </div>

            {/* Buttons Area */}
            <div className="flex gap-3 pt-6 border-t border-slate-50">
              {!isEdit ? (
                <button
                  type="button"
                  onClick={() => setIsEdit(true)}
                  className="px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm text-sm"
                >
                  <Pencil size={16} /> Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm text-sm"
                  >
                    <Save size={16} /> Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 transition-colors text-sm"
                  >
                    <X size={16} /> Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      <CustomModel
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Confirm Logout"
        description="Are you sure you want to logout? You will need to login again to manage your donations."
        Delete="Logout"
      />
    </div>
  );
}
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
      setShowLogoutModal(false);
    } catch (error) {
      showError("Logout failed");
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
    const loading = showLoading("Updating profile...");
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
      console.error(err);
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
    <div className="flex gap-8 max-w-[1400px] mx-auto p-8 font-['Outfit'] text-slate-700 max-md:flex-col max-md:p-4 max-md:gap-4 bg-white">
      {/* ================= Sidebar ================= */}
      {/* ================= Sidebar ================= */}
      <div className="w-[280px] bg-white rounded border border-slate-200 p-7 h-fit sticky top-[90px] max-md:w-full max-md:static shadow-sm">
        <div className="pb-5 mb-5 border-b border-slate-200">
          <h3 className="text-sm font-bold tracking-widest text-slate-400">USER MENU</h3>
        </div>

        <div className="flex flex-col gap-2">
          <Link
            href="/profile"
            className={`px-4 py-3 rounded transition-all flex items-center gap-3 ${pathname === "/profile"
              ? "bg-blue-600/10 text-blue-600 border border-blue-600/20 font-medium"
              : "hover:bg-blue-600/5 text-slate-600 border border-transparent"
              }`}
          >
            <User size={20} className={pathname === "/profile" ? "text-blue-600" : "text-slate-400"} />            <span>My Profile</span>
          </Link>

          <Link
            href="/my-donation"
            className={`px-4 py-3 rounded transition-all flex items-center gap-3 ${pathname === "/my-donation"
              ? "bg-blue-600/10 text-blue-600 border border-blue-600/20 font-medium"
              : "hover:bg-blue-600/5 text-slate-600 border border-transparent"
              }`}
          >
            <HandHeart size={20} className={pathname === "/my-donation" ? "text-blue-600" : "text-slate-400"} />            <span>My Donations</span>
          </Link>

          <div
            onClick={() => setShowLogoutModal(true)}
            className="px-4 py-3 rounded cursor-pointer hover:bg-red-50 text-red-600 transition-all flex items-center gap-3 mt-2"
          >
            <LogOut size={20} className="text-red-500" />
            <span>Logout</span>

          </div>
        </div>
      </div>
      {/* ================= Content ================= */}
      <div className="flex-1 bg-white rounded border border-slate-200/80 p-8 transition-all duration-200 shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_3px_12px_rgba(0,0,0,0.06)] max-sm:p-6">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">
            My Profile
          </h2>
          <p className="text-slate-500">
            Manage your account details and preferences
          </p>
        </div>

        {/* Main */}
        <div className="flex gap-10 max-md:flex-col max-md:gap-6">
          {/* Avatar Area */}
          <div className="flex flex-col items-center p-6 bg-slate-50 rounded border border-slate-200 flex-shrink-0 w-[220px] max-md:w-full">
            <div className="relative mb-4">
              <div
                className={`w-[110px] h-[110px] rounded-full flex items-center justify-center overflow-hidden border-[3px] border-white shadow-md ${isEdit ? 'cursor-pointer' : ''}`}
                style={{ backgroundColor: '#2563eb' }}
                onClick={() =>
                  isEdit && document.getElementById("profileImage").click()
                }
              >
                {preview || userData.profile_img ? (
                  <img
                    src={preview || `/uploads/${userData.profile_img}`}
                    className="w-full h-full object-cover rounded-full"
                    alt="Profile"
                  />
                ) : (
                  <User size={56} className="text-white" />
                )}
              </div>

              {/* Camera Icon */}
              {isEdit && (
                <div
                  className="absolute bottom-1 right-1 bg-white p-1.5 rounded-full shadow-md cursor-pointer border border-slate-100"
                  onClick={() =>
                    document.getElementById("profileImage").click()
                  }
                >
                  <Camera size={16} className="text-blue-600" />
                </div>
              )}

              {/* Hidden File Input */}
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            <h3 className="text-lg font-bold text-slate-800 text-center">
              {userData.name || "User Name"}
            </h3>
          </div>

          {/* Details Form */}
          <div className="flex-1">
            <form>
              <div className="flex gap-6 mb-6 max-lg:flex-col max-lg:gap-4">
                <div className="flex-1">
                  <label className="block mb-2 text-sm font-bold text-slate-500 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    disabled={!isEdit}
                    className={`w-full px-4 py-3 rounded border text-[15px] transition-all outline-none ${!isEdit ? 'bg-slate-100 border-slate-200' : 'bg-white border-blue-600/30 focus:border-blue-600 shadow-sm'
                      }`}
                  />
                </div>

                <div className="flex-1">
                  <label className="block mb-2 text-sm font-bold text-slate-500 uppercase tracking-wider">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                    disabled={!isEdit}
                    className={`w-full px-4 py-3 rounded border text-[15px] transition-all outline-none ${!isEdit ? 'bg-slate-100 border-slate-200' : 'bg-white border-blue-600/30 focus:border-blue-600 shadow-sm'
                      }`}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm font-bold text-slate-500 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  disabled
                  className="w-full px-4 py-3 rounded border border-slate-200 text-[15px] bg-slate-200 text-slate-500 cursor-not-allowed"
                />
              </div>
            </form>

            {/* Actions */}
            <div className="flex gap-4 mt-8 max-sm:flex-col">
              {!isEdit && (
                <button
                  type="button"
                  onClick={() => setIsEdit(true)}
                  className="px-6 py-3 rounded font-bold flex items-center gap-2 bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition-all active:scale-95 max-sm:w-full justify-center"
                >
                  <Pencil size={18} /> Edit Profile
                </button>
              )}

              {isEdit && (
                <div>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-6 py-3 rounded font-bold flex items-center gap-2 bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition-all active:scale-95 max-sm:w-full justify-center"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-3 rounded font-bold flex items-center gap-2 border border-slate-300 text-slate-600 bg-white hover:bg-slate-50 transition-all active:scale-95 max-sm:w-full justify-center"
                  >
                    <X size={18} /> Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <CustomModel
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Confirm Logout"
        description="Are you sure you want to logout from this website?"
        Delete="Logout"
      />
    </div>
  );
}
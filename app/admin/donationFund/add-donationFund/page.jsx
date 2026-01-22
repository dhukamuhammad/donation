"use client";
/** * Client-side component as it uses state, effects, and browser APIs.
 */

import React, { useEffect, useState } from "react";
import {
  Calendar,
  DollarSign,
  Tag,
  FileText,
  Image as ImageIcon,
  Plus,
  ChevronLeft,
  Upload,
  Info,
  ExternalLink,
  ChevronDown,
} from "lucide-react"; // Icons for UI decoration and clarity
import axiosInstance from "@/lib/axiosinstance"; // API calls ke liye configured axios
import { useRouter } from "next/navigation"; // Navigation handle karne ke liye (back, push)
import dynamic from "next/dynamic"; // Client-side par heavy libraries load karne ke liye
import { showSuccess, showError } from "@/components/Toaster"; // Success/Error popups
import { z } from "zod"; // Form validation schema library

/**
 * TinyMCE Editor ko dynamic import kiya gaya hai SSR (Server Side Rendering) off karke,
 * kyunki ye browser-specific library hai.
 */
const TinyEditor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  { ssr: false },
);

/* =======================
    Zod Validation Schema
   ======================= 
   Ye define karta hai ki kaunsa field kaisa hona chahiye (Required, Email format, etc.)
*/
const donationSchema = z.object({
  title: z.string().trim().min(1, "Campaign title is required"),
  description: z.string().trim().min(1, "Campaign description is required"),
  thumbnail: z.array(z.any()).min(1, "At least one cover image is required"),
  document_img: z
    .any()
    .refine((file) => file !== null, "Verification document is required"),
  total_amount: z.string().min(1, "Target amount is required"),
  fun_cat: z.string().min(1, "Please select a category"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
});

/**
 * Sequential validation ke liye fields ka order.
 * Iska kaam ye hai ki agar user submit kare, toh isi order mein errors check honge.
 */
const fieldOrder = [
  "title",
  "description",
  "thumbnail",
  "document_img",
  "total_amount",
  "fun_cat",
  "start_date",
  "end_date",
];

const AddDonationFundPage = () => {
  const router = useRouter(); // Next.js router instance

  // States Management
  const [categories, setCategories] = useState([]); // API se aayi categories store karne ke liye
  const [isSubmitting, setIsSubmitting] = useState(false); // Form submission loading state
  const [errors, setErrors] = useState({}); // Zod validation errors store karne ke liye

  // Form Data State: Sare inputs ki values yahan hold hoti hain
  const [formData, setFormData] = useState({
    title: "",
    thumbnail: [], // 🔥 multiple
    document_img: null,
    description: "",
    total_amount: "",
    fun_cat: "",
    start_date: "",
    end_date: "",
  });

  /**
   * Page load hote hi categories fetch karne ke liye Effect hook.
   */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/category");
        setCategories(res.data);
      } catch (err) {
        console.error("Category fetch error:", err);
      }
    };
    fetchCategories();
  }, []);

  /**
   * Text aur Select inputs ki value change handle karne ke liye function.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Typing karte hi us field ka error saaf (clear) karne ke liye
    if (errors[name]) setErrors({});
  };

  /**
   * File upload (Thumbnail aur PDF) handle karne ke liye function.
   */
  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (name === "thumbnail") {
      setFormData((prev) => ({
        ...prev,
        thumbnail: [...prev.thumbnail, ...Array.from(files)],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }

    setErrors({});
  };

  /**
   * Form Submission Logic
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Default form reload rokne ke liye
    setErrors({}); // Pehle ke errors clear

    // Zod Safe Parsing: Data check karega bina crash huye
    const result = donationSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      // Sequential Error Display: Sirf pehle khali field ka error dikhayega
      const firstErrorField = fieldOrder.find((field) => fieldErrors[field]);

      if (firstErrorField) {
        setErrors({ [firstErrorField]: fieldErrors[firstErrorField][0] });
        showError(`${fieldErrors[firstErrorField][0]}`); // Toast mein message dikhana
      }
      return;
    }

    setIsSubmitting(true); // Loading start
    try {
      // Multipart form data (Files + Text) prepare karne ke liye
      const fd = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "thumbnail") {
          // 🔥 MULTIPLE IMAGES
          formData.thumbnail.forEach((img) => {
            fd.append("thumbnail", img);
          });
        } else {
          fd.append(key, formData[key]);
        }
      });

      // API Call
      await axiosInstance.post("/donationFund", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showSuccess("Campaign launched successfully ✅");
      router.push("/admin/donationFund"); // Success ke baad redirect
    } catch (err) {
      showError("Submission failed.");
    } finally {
      setIsSubmitting(false); // Loading stop
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      thumbnail: prev.thumbnail.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="p-6 lg:p-6 bg-slate-50/50 min-h-screen font-['Outfit']">
      {/* Page Header Section: Title aur Sub-title */}
      <div className="max-w-5xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Launch New Campaign
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Provide accurate details to start a verified donation fund.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* --- Section 1: Basic Info (Title & Editor) --- */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
              <FileText size={16} className="text-blue-600" />
              <h2 className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">
                Campaign Overview
              </h2>
            </div>

            <div className="p-6 space-y-6">
              {/* Campaign Title Input */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Campaign Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Help Rahul for Heart Surgery"
                  className={`w-full px-4 py-3 bg-slate-50 border rounded-lg text-sm focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all outline-none font-medium ${errors.title ? "border-red-500" : "border-slate-200"}`}
                />
                {errors.title && (
                  <p className="text-red-500 text-[11px] mt-1 font-semibold ml-1">
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Campaign Description (TinyMCE Editor) */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Campaign Story & Details
                </label>
                <div
                  className={`border rounded-lg overflow-hidden ${errors.description ? "border-red-500" : "border-slate-200"}`}
                >
                  <TinyEditor
                    apiKey="bh3dkf7dq6x8qqpcumphpgwad92mar5ky71n0l1z1yc0rgu2"
                    value={formData.description}
                    onEditorChange={(content) => {
                      setFormData((prev) => ({
                        ...prev,
                        description: content,
                      }));
                      if (errors.description) setErrors({});
                    }}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: "link lists table wordcount",
                      toolbar:
                        "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | link table | removeformat",
                      content_style:
                        "body { font-family:Outfit,Arial,sans-serif; font-size:14px }",
                    }}
                  />
                </div>
                {errors.description && (
                  <p className="text-red-500 text-[11px] mt-1 font-semibold ml-1">
                    {errors.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* --- Section 2: Visual Assets (Image & PDF Upload) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cover Image Upload Area */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <label className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                <ImageIcon size={14} className="text-blue-600" /> Cover Image
              </label>
              <div className="space-y-4">
                <div
                  className={`relative group cursor-pointer border-2 border-dashed rounded-xl p-4 hover:border-blue-400 transition-all text-center ${errors.thumbnail ? "border-red-500 bg-red-50/30" : "border-slate-200"}`}
                >
                  <input
                    type="file"
                    name="thumbnail"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  <Upload
                    size={24}
                    className={`mx-auto mb-2 ${errors.thumbnail ? "text-red-400" : "text-slate-300"} group-hover:text-blue-500`}
                  />
                  <p className="text-xs text-slate-500 font-medium">
                    Click to upload thumbnail
                  </p>
                </div>
                {errors.thumbnail && (
                  <p className="text-red-500 text-[11px] font-semibold">
                    {errors.thumbnail}
                  </p>
                )}
                {/* Image Preview: Upload hote hi display hogi */}
                {formData.thumbnail.length > 0 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {formData.thumbnail.map((img, index) => (
                      <div
                        key={index}
                        className="relative w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden border border-slate-200"
                      >
                        {/* Image */}
                        <img
                          src={URL.createObjectURL(img)}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />

                        {/* ❌ Remove Button */}
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-black/60 hover:bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs transition-all"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Verification Document (PDF) Upload Area */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <label className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                <FileText size={14} className="text-red-600" /> Verification
                Document (PDF)
              </label>
              <div className="space-y-4">
                <div
                  className={`relative group cursor-pointer border-2 border-dashed border-slate-200 rounded-xl p-4 hover:border-red-400 transition-all text-center bg-slate-50/30 ${errors.document_img ? "border-red-500" : ""}`}
                >
                  <input
                    type="file"
                    name="document_img"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload
                    size={20}
                    className="mx-auto text-slate-300 mb-2 group-hover:text-red-500"
                  />
                  <p className="text-xs text-slate-500 font-medium">
                    Click to upload medical PDF
                  </p>
                </div>
                {/* PDF Preview Bar: File select hone par dikhega */}
                {formData.document_img && (
                  <div className="relative flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-white shadow-sm group hover:border-red-200 transition-all">
                    <div className="relative w-10 h-10 bg-red-50 rounded-lg flex flex-col items-center justify-center flex-shrink-0 border border-red-100">
                      <FileText size={20} className="text-red-500 stroke-[2]" />
                      <span className="absolute -bottom-1 text-[6px] font-black bg-red-600 text-white px-1 rounded-[1px] leading-none uppercase">
                        PDF
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-slate-700 truncate">
                        {formData.document_img instanceof File
                          ? formData.document_img.name
                          : formData.document_img}
                      </p>
                    </div>
                    <div className="pl-3 border-l border-slate-100">
                      <a
                        href={
                          formData.document_img instanceof File
                            ? URL.createObjectURL(formData.document_img)
                            : `/uploads/${formData.document_img}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-lg transition-all"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                )}
                {errors.document_img && (
                  <p className="text-red-500 text-[11px] font-semibold pt-2">
                    {errors.document_img}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* --- Section 3: Financials & Categorization --- */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Target Amount Input */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Target Amount (₹)
                </label>
                <div className="relative">
                  <DollarSign
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="number"
                    name="total_amount"
                    value={formData.total_amount}
                    onChange={handleInputChange}
                    placeholder="5,00,000"
                    className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-lg text-sm focus:bg-white focus:border-blue-600 outline-none transition-all font-bold ${errors.total_amount ? "border-red-500" : "border-slate-200"}`}
                  />
                </div>
                {errors.total_amount && (
                  <p className="text-red-500 text-[11px] mt-1 font-semibold ml-1">
                    {errors.total_amount}
                  </p>
                )}
              </div>

              {/* Category Selection Dropdown */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Campaign Category
                </label>
                <div className="relative">
                  <Tag
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <select
                    name="fun_cat"
                    value={formData.fun_cat}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-10 py-3 bg-slate-50 border rounded-lg text-sm focus:bg-white focus:border-blue-600 outline-none transition-all font-medium appearance-none cursor-pointer ${errors.fun_cat ? "border-red-500" : "border-slate-200"}`}
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
                {errors.fun_cat && (
                  <p className="text-red-500 text-[11px] mt-1 font-semibold ml-1">
                    {errors.fun_cat}
                  </p>
                )}
              </div>

              {/* Start Date Input */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Start Date
                </label>
                <div className="relative">
                  <Calendar
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-lg text-sm focus:bg-white focus:border-blue-600 outline-none transition-all font-medium ${errors.start_date ? "border-red-500" : "border-slate-200"}`}
                  />
                </div>
                {errors.start_date && (
                  <p className="text-red-500 text-[11px] mt-1 font-semibold ml-1">
                    {errors.start_date}
                  </p>
                )}
              </div>

              {/* End Date Input */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  End Date
                </label>
                <div className="relative">
                  <Calendar
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-lg text-sm focus:bg-white focus:border-blue-600 outline-none transition-all font-medium ${errors.end_date ? "border-red-500" : "border-slate-200"}`}
                  />
                </div>
                {errors.end_date && (
                  <p className="text-red-500 text-[11px] mt-1 font-semibold ml-1">
                    {errors.end_date}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Bar: Bottom sticky-like bar for Submit and Cancel */}
          <div className="flex items-center justify-between p-6 bg-slate-800 rounded-xl shadow-lg shadow-slate-200">
            <div className="flex items-center gap-2 text-slate-300 text-xs font-medium">
              <Info size={14} />
              <span>Campaign will go live immediately after creation.</span>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest shadow-md flex items-center gap-2 active:scale-95 transition-all"
              >
                {isSubmitting ? (
                  "Launching..."
                ) : (
                  <>
                    <Plus size={16} /> Launch Campaign
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDonationFundPage;

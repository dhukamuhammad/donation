"use client";
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
  ExternalLink
} from "lucide-react";
import axiosInstance from "@/lib/axiosinstance";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { showSuccess, showError } from "@/components/Toaster";

// ✅ TinyMCE client-only
const TinyEditor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  { ssr: false }
);

const AddDonationFundPage = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    thumbnail: null,
    document_img: null,
    description: "",
    total_amount: "",
    fun_cat: "",
    start_date: "",
    end_date: "",
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const fd = new FormData();
      Object.keys(formData).forEach(key => {
        fd.append(key, formData[key]);
      });

      await axiosInstance.post("/donationFund", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showSuccess("Campaign launched successfully ✅");
      router.push("/admin/donationFund");
    } catch (err) {
      showError("Submission failed. Check all fields.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 lg:p-6 bg-slate-50/50 min-h-screen font-['Outfit']">

      {/* --- Page Header --- */}
      <div className="max-w-5xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-slate-400 hover:text-blue-600 transition-colors text-xs font-bold uppercase tracking-widest mb-2"
          >
            <ChevronLeft size={14} /> Back to listing
          </button>
          <h1 className="text-2xl font-bold text-slate-800">Launch New Campaign</h1>
          <p className="text-sm text-slate-500 mt-1">Provide accurate details to start a verified donation fund.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Section 1: Basic Info */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
              <FileText size={16} className="text-blue-600" />
              <h2 className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Campaign Overview</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Campaign Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Help Rahul for Heart Surgery"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all outline-none font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Campaign Story & Details
                </label>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <TinyEditor
                    apiKey="bh3dkf7dq6x8qqpcumphpgwad92mar5ky71n0l1z1yc0rgu2"
                    value={formData.description}
                    onEditorChange={(content) =>
                      setFormData((prev) => ({ ...prev, description: content }))
                    }
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: "link lists table wordcount",
                      toolbar: "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | link table | removeformat",
                      content_style: "body { font-family:Outfit,Arial,sans-serif; font-size:14px }",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Visual Assets & Documents */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Thumbnail */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <label className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                <ImageIcon size={14} className="text-blue-600" /> Cover Image
              </label>
              <div className="space-y-4">
                <div className="relative group cursor-pointer border-2 border-dashed border-slate-200 rounded-xl p-4 hover:border-blue-400 transition-all text-center">
                  <input
                    type="file"
                    name="thumbnail"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload size={24} className="mx-auto text-slate-300 mb-2 group-hover:text-blue-500" />
                  <p className="text-xs text-slate-500 font-medium">Click to upload thumbnail</p>
                </div>
                {formData.thumbnail && (
                  <div className="relative h-40 rounded-lg overflow-hidden border border-slate-200">
                    <img src={URL.createObjectURL(formData.thumbnail)} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            {/* Support Document */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              {/* Header Label */}
              <label className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                <FileText size={14} className="text-red-600" /> Verification Document (PDF)
              </label>

              <div className="space-y-4">
                {/* Upload Area */}
                <div className="relative group cursor-pointer border-2 border-dashed border-slate-200 rounded-xl p-4 hover:border-red-400 transition-all text-center bg-slate-50/30">
                  <input
                    type="file"
                    name="document_img"
                    accept="application/pdf" // Sirf PDF restrict kiya
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload size={20} className="mx-auto text-slate-300 mb-2 group-hover:text-red-500" />
                  <p className="text-xs text-slate-500 font-medium">Click to upload medical PDF</p>
                </div>

                {/* Horizontal PDF Preview Bar */}
                {formData.document_img && (
                  <div className="relative flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-white shadow-sm group hover:border-red-200 transition-all">

                    {/* 1. PDF Icon (Left) */}
                    <div className="relative w-10 h-10 bg-red-50 rounded-lg flex flex-col items-center justify-center flex-shrink-0 border border-red-100">
                      <FileText size={20} className="text-red-500 stroke-[2]" />
                      <span className="absolute -bottom-1 text-[6px] font-black bg-red-600 text-white px-1 rounded-[1px] leading-none uppercase">
                        PDF
                      </span>
                    </div>

                    {/* 2. File Name & Path Info (Middle) */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-[13px] font-bold text-slate-700 truncate max-w-[180px]">
                          {formData.document_img instanceof File
                            ? formData.document_img.name
                            : formData.document_img}
                        </p>
                        <span className="text-[8px] font-black text-green-500 border border-green-200 bg-green-50 px-1.5 py-0.5 rounded uppercase leading-none">
                          Attached
                        </span>
                      </div>

                      <p className="text-[10px] text-slate-400 truncate mt-0.5 flex items-center gap-1">
                        <span className="font-bold text-slate-300 uppercase">Path:</span>
                        <span className="italic">
                          {formData.document_img instanceof File
                            ? "local_preview_temp"
                            : `/uploads/${formData.document_img}`}
                        </span>
                      </p>
                    </div>

                    {/* 3. View Action (Right) */}
                    <div className="pl-3 border-l border-slate-100">
                      <a
                        href={formData.document_img instanceof File
                          ? URL.createObjectURL(formData.document_img)
                          : `/uploads/${formData.document_img}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-lg transition-all group"
                      >
                        <span className="text-[10px] font-black uppercase tracking-widest">View</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>          </div>

          {/* Section 3: Financials & Classification */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Target Amount */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Target Amount (₹)
                </label>
                <div className="relative">
                  <DollarSign size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="number"
                    name="total_amount"
                    required
                    value={formData.total_amount}
                    onChange={handleInputChange}
                    placeholder="5,00,000"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-blue-600 outline-none transition-all font-bold"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Campaign Category
                </label>
                <div className="relative">
                  <Tag size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select
                    name="fun_cat"
                    required
                    value={formData.fun_cat}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-blue-600 outline-none transition-all font-medium appearance-none"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Start Date */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Start Date
                </label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    name="start_date"
                    required
                    value={formData.start_date}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-blue-600 outline-none transition-all font-medium"
                  />
                </div>
              </div>

              {/* End Date (AUTO) */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  End Date
                </label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-blue-600 outline-none transition-all font-medium"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Action Bar */}
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
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest shadow-md active:scale-95 transition-all flex items-center gap-2"
              >
                {isSubmitting ? "Launching..." : <><Plus size={16} /> Launch Campaign</>}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddDonationFundPage;
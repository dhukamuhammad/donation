"use client";
import React, { useEffect, useState } from "react";
import { 
  Calendar, 
  DollarSign, 
  Tag, 
  FileText, 
  Image as ImageIcon, 
  Save, 
  ChevronLeft,
  Upload,
  Info
} from "lucide-react";
import axiosInstance from "@/lib/axiosinstance";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { showSuccess, showError } from "@/components/Toaster";

// ✅ TinyMCE client-only (SSR OFF)
const TinyEditor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  { ssr: false }
);

const EditDonationFundPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: null,
    document_img: null,
    total_amount: "",
    fun_cat: "",
    date: "",
  });

  useEffect(() => {
    fetchDonationFundById();
    fetchCategories();
  }, [id]);

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/category");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDonationFundById = async () => {
    try {
      const res = await axiosInstance.get(`/donationFund/${id}`);
      const donation_fund = res.data;

      const parsedDate = new Date(donation_fund.date);
      const localDateString = parsedDate.toLocaleDateString("en-CA");

      setFormData({
        title: donation_fund.title,
        description: donation_fund.description || "",
        thumbnail: donation_fund.thumbnail || null,
        document_img: donation_fund.document_img || null,
        total_amount: donation_fund.total_amount,
        fun_cat: donation_fund.fun_cat,
        date: localDateString,
      });
    } catch (err) {
      console.error(err);
      showError("Failed to load campaign data");
    }
  };

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
      fd.append("title", formData.title);
      fd.append("date", formData.date);
      fd.append("total_amount", formData.total_amount);
      fd.append("fun_cat", formData.fun_cat);
      fd.append("description", formData.description);

      // Only append if it's a new file (instance of File)
      if (formData.thumbnail instanceof File) fd.append("thumbnail", formData.thumbnail);
      if (formData.document_img instanceof File) fd.append("document_img", formData.document_img);

      await axiosInstance.put(`/donationFund/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      showSuccess("Campaign updated successfully ✅");
      router.back();
    } catch (err) {
      showError("Failed to update campaign");
      console.error("Submit error:", err);
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
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Edit Campaign</h1>
          <p className="text-sm text-slate-500 mt-1">Modify fundraiser details and verify information.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Overview */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
              <FileText size={16} className="text-blue-600" />
              <h2 className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Campaign Details</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Campaign Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all outline-none font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Story & Description
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

          {/* Section 2: Visuals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Thumbnail */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <label className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                <ImageIcon size={14} className="text-blue-600" /> Update Thumbnail
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
                  <p className="text-xs text-slate-500 font-medium">Click to change cover image</p>
                </div>
                {formData.thumbnail && (
                  <div className="relative h-40 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                    <img 
                      src={formData.thumbnail instanceof File ? URL.createObjectURL(formData.thumbnail) : `/uploads/${formData.thumbnail}`} 
                      className="w-full h-full object-cover" 
                      alt="Preview"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Support Document */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <label className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                <FileText size={14} className="text-blue-600" /> Update Verification Doc
              </label>
              <div className="space-y-4">
                <div className="relative group cursor-pointer border-2 border-dashed border-slate-200 rounded-xl p-4 hover:border-blue-400 transition-all text-center">
                  <input
                    type="file"
                    name="document_img"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload size={24} className="mx-auto text-slate-300 mb-2 group-hover:text-blue-500" />
                  <p className="text-xs text-slate-500 font-medium">Click to change medical doc</p>
                </div>
                {formData.document_img && (
                  <div className="relative h-40 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                    <img 
                      src={formData.document_img instanceof File ? URL.createObjectURL(formData.document_img) : `/uploads/${formData.document_img}`} 
                      className="w-full h-full object-cover" 
                      alt="Preview"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Financials */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-blue-600 outline-none transition-all font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Category
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

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Campaign Date
                </label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
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
               <span>Changes will be updated on the public page instantly.</span>
             </div>
             <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-colors"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest shadow-md active:scale-95 transition-all flex items-center gap-2"
                >
                  {isSubmitting ? "Updating..." : <><Save size={16} /> Save Changes</>}
                </button>
             </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditDonationFundPage;
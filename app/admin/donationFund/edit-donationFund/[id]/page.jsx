"use client";
import React, { useEffect, useState } from "react";
import { Calendar, DollarSign, Tag, FileText, Image } from "lucide-react";
import axiosInstance from "@/lib/axiosinstance";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// ✅ TinyMCE client-only (SSR OFF)
const TinyEditor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  { ssr: false }
);

const EditDonationFundPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);

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
  }, []);

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
    }
  };

  // TEXT CHANGE
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // FILE CHANGE
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("date", formData.date);
      fd.append("total_amount", formData.total_amount);
      fd.append("fun_cat", formData.fun_cat);
      fd.append("description", formData.description);

      if (formData.thumbnail) fd.append("thumbnail", formData.thumbnail);
      if (formData.document_img)
        fd.append("document_img", formData.document_img);

      await axiosInstance.put(`/donationFund/${id}`, fd, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      router.back();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add Donation Fund</h1>
        <p className="text-sm text-gray-500 mt-1">
          Create a new donation campaign
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* TITLE */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FileText size={16} /> Campaign Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter campaign title"
                  className="w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FileText size={16} /> Description
                </label>

                <TinyEditor
                  apiKey="bh3dkf7dq6x8qqpcumphpgwad92mar5ky71n0l1z1yc0rgu2"
                  value={formData.description}
                  onEditorChange={(content) =>
                    setFormData((prev) => ({ ...prev, description: content }))
                  }
                  init={{
                    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                  }}

                />
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                {/* THUMBNAIL */}
                <div className="flex-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Image size={16} /> Campaign Thumbnail
                  </label>
                  <input
                    type="file"
                    name="thumbnail"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-4
      file:rounded-lg file:border-0
      file:bg-blue-50 file:text-[#2563EB] file:font-medium
      hover:file:bg-blue-100 transition cursor-pointer"
                  />

                  {formData.thumbnail && (
                    <img
                      // src={URL.createObjectURL(formData.thumbnail)}

                      src={formData.thumbnail instanceof File
                        ? URL.createObjectURL(formData.thumbnail)
                        : `/uploads/${formData.thumbnail}`}
                      className="mt-3 h-32 rounded-lg object-cover border"
                    />
                  )}
                </div>

                {/* DOCUMENT IMAGE */}
                <div className="flex-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Image size={16} /> Supporting Document Image
                  </label>
                  <input
                    type="file"
                    name="document_img"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-4
      file:rounded-lg file:border-0
      file:bg-blue-50 file:text-[#2563EB] file:font-medium
      hover:file:bg-blue-100 transition cursor-pointer"
                  />

                  {formData.document_img && (
                    <img
                      src={formData.document_img instanceof File
                        ? URL.createObjectURL(formData.document_img)
                        : `/uploads/${formData.document_img}`}
                      className="mt-3 h-32 rounded-lg object-cover border"
                    />
                  )}
                </div>
              </div>


              {/* GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* AMOUNT */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <DollarSign size={16} /> Target Amount (₹)
                  </label>
                  <input
                    type="number"
                    name="total_amount"
                    value={formData.total_amount}
                    onChange={handleInputChange}
                    placeholder="Enter target amount"
                    className="w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition"
                  />
                </div>

                {/* CATEGORY */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Tag size={16} /> Category
                  </label>
                  <select
                    name="fun_cat"
                    value={formData.fun_cat}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* DATE */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Calendar size={16} /> Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-8 py-3 rounded-lg text-base font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex bg-[#2563EB] text-white px-5 py-3 rounded-lg text-base font-medium hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Create Campaign
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDonationFundPage;

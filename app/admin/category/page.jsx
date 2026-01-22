"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosinstance";
import {
  Edit2,
  Trash2,
  Tag,
  Plus,
  CheckCircle,
  XCircle,
  Search,
} from "lucide-react";
import DeleteModal from "@/components/CustomModel";
import { showSuccess, showError } from "@/components/Toaster";
import { z } from "zod"; // 1. Zod Import kiya

/* =======================
    Zod Schema
======================= */
const categorySchema = z.object({
  title: z.string().trim().min(1, "Category title is required"),
});

const CategoryPage = () => {
  // ================= STATE =================
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ id: null, title: "" });
  const [errors, setErrors] = useState({}); // 2. Errors State add ki
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState("");

  // ================= FETCH =================
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/category");
      setCategories(res.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  // ================= FILTER =================
  const filteredCategories = categories.filter((cat) =>
    cat.title?.toLowerCase().includes(search.toLowerCase()),
  );

  // ================= HIGHLIGHT =================
  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="text-blue-600">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      ),
    );
  };

  // ================= SUBMIT (With Zod) =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Pehle ke errors clear karo

    // 3. Zod Validation Logic
    const result = categorySchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({ title: fieldErrors.title?.[0] }); // Sirf title ka error set karo
      return;
    }

    try {
      if (form.id) {
        await axiosInstance.put(`/category/${form.id}`, { title: form.title });
        showSuccess("Category updated successfully");
      } else {
        await axiosInstance.post("/category", { title: form.title });
        showSuccess("New category added");
      }

      setForm({ id: null, title: "" });
      fetchCategories();
    } catch {
      showError("Operation failed. Please try again.");
    }
  };

  // ================= DELETE =================
  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/category/${deleteId}`);
      showSuccess("Category deleted successfully");
      setShowDelete(false);
      setDeleteId(null);
      fetchCategories();
    } catch {
      showError("Failed to delete category");
    }
  };

  // ================= EDIT =================
  const handleEdit = (category) => {
    setErrors({}); // Edit karte waqt purane error hatao
    setForm({ id: category.id, title: category.title });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-6 bg-slate-50/50 min-h-screen font-['Outfit']">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Donation Categories
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage cause types for your fundraisers.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* ================= TABLE SECTION ================= */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <Tag size={16} className="text-blue-600" />
              Existing Categories
            </h2>

            <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-3 py-2 bg-white shadow-sm">
              <Search size={16} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search category"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-sm outline-none bg-transparent w-48 placeholder-slate-400"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-16 text-center">
                    #
                  </th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    Category Name
                  </th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center w-32">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((cat, index) => (
                    <tr
                      key={cat.id}
                      className="hover:bg-blue-50/30 transition-colors"
                    >
                      <td className="p-4 text-sm text-slate-500 text-center font-medium">
                        {index + 1}
                      </td>
                      <td className="p-4 text-sm font-semibold text-slate-700">
                        {highlightText(cat.title, search)}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(cat)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => {
                              setDeleteId(cat.id);
                              setShowDelete(true);
                            }}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="p-10 text-center text-slate-400 italic text-sm"
                    >
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= FORM SECTION ================= */}
        <div className="lg:col-span-1 sticky top-24">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                {form.id ? (
                  <Edit2 size={16} className="text-blue-600" />
                ) : (
                  <Plus size={16} className="text-blue-600" />
                )}
                {form.id ? "Edit Category" : "Add New Category"}
              </h3>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Category Title
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    placeholder="e.g. Medical Aid, Education"
                    className={`w-full bg-slate-50 border rounded-lg px-4 py-3 text-sm focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none font-medium transition-all ${
                      errors.title ? "border-red-500" : "border-slate-200"
                    }`}
                  />
                  {/* 4. Error Message Display */}
                  {errors.title && (
                    <p className="text-red-500 text-[11px] mt-1 font-semibold ml-1">
                      {errors.title}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  {form.id && (
                    <button
                      type="button"
                      onClick={() => {
                        setForm({ id: null, title: "" });
                        setErrors({});
                      }}
                      className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 flex items-center justify-center gap-2"
                    >
                      <XCircle size={14} />
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className="flex-[2] bg-blue-600 text-white py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-blue-700 shadow-sm flex items-center justify-center gap-2"
                  >
                    {form.id ? <CheckCircle size={14} /> : <Plus size={14} />}
                    {form.id ? "Update" : "Save Category"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
            <p className="text-[11px] text-blue-600 font-medium">
              <strong>Note:</strong> Categories defined here will appear in the
              fundraiser creation dropdown and public filters.
            </p>
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={confirmDelete}
        title="Delete Category"
        description="Are you sure you want to permanently remove this category?"
        Delete="Confirm Delete"
      />
    </div>
  );
};

export default CategoryPage;

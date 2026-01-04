"use client";
import axiosInstance from "@/lib/axiosinstance";
import { Edit2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const CategoryPage = () => {
  // ================= STATE =================
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ title: "" });

  // ================= FETCH =================
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/category");
      setCategories(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) return;

    try {
      if (form.id) {
        await axiosInstance.put(`/category/${form.id}`, form);
      } else {
        await axiosInstance.post("/category", form);
      }

      setForm({ title: "" });
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/category/${id}`);
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  // ================= EDIT =================
  const handleEdit = (category) => {
    setForm({
      id: category.id,
      title: category.title,
    });
  };

  // ================= UI =================
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Donation Category</h1>

      <div className="flex gap-5 lg:flex-row flex-col">
        {/* ================= TABLE ================= */}
        <div className="flex-[2] bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200" >
          <table className="w-full ">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 ">
                <th className="p-3 text-left text-gray-600">ID</th>
                <th className="p-3 text-left text-gray-600">Title</th>
                <th className="p-3 text-center text-gray-600">Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat, index) => (
                <tr key={cat.id} className="hover:bg-slate-50">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{cat.title}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="text-blue-600 p-2"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="text-red-600 p-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= FORM ================= */}
        <div className="flex-1 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 p-5 h-[20%]">
          <h3 className="font-semibold mb-4">
            {form.id ? "Edit Category" : "Add Category"}
          </h3>

          <input
            type="text"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            placeholder="Enter category title"
            className="w-full border px-4 py-2 rounded mb-4"
          />

          <div className="flex gap-4">

            {form.id && (
              <button
                onClick={() => setForm({ title: "" })}
                className="w-[50%] bg-gray-200 text-black py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            )}

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              {form.id ? "Update Category" : "Add Category"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

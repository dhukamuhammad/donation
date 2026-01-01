"use client";

import { Edit2, Trash2 } from "lucide-react";
import { useState } from "react";

const CategoryPage = () => {
  const [categories, setCategories] = useState([
    { id: 1, title: 'Medical Treatment' },
    { id: 2, title: 'Education Support' },
    { id: 3, title: 'Emergency Help' },
  ]);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, { id: categories.length + 1, title: newCategory }]);
      setNewCategory('');
    }
  };

  const handleDelete = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-[22px] font-semibold text-slate-800">
          Donation Categories
        </h2>
      </div>

      {/* Content Wrapper */}
      <div className="flex gap-5 lg:flex-row flex-col">
        {/* ================= LEFT : TABLE ================= */}
        <div className="flex-[2] bg-white rounded shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="px-5 py-4 border-b">
            <h3 className="text-[16px] font-semibold text-slate-700">
              All Categories
            </h3>
          </div>

          {/* Table */}
          <div className="p-3 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-slate-500 font-medium border-b w-[70px]">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-slate-500 font-medium border-b">
                    Title
                  </th>
                  <th className="px-4 py-3 text-center text-slate-500 font-medium border-b w-[120px]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-700">{category.id}</td>
                    <td className="px-4 py-3 text-slate-700">{category.title}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="text-[#2563EB] hover:bg-blue-50 p-2 rounded-lg transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(category.id)}
                          className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= RIGHT : FORM ================= */}
        <div className="flex-1 min-w-[280px] bg-white rounded shadow-sm overflow-hidden">
          {/* Form Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <h3 className="text-[16px] font-semibold text-slate-700">
              Add Category
            </h3>
          </div>

          {/* Form */}
          <div className="p-5">
            <div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-slate-600">
                  Category Title
                </label>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter category title"
                  className="w-full px-4 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <button
                onClick={handleAddCategory}
                className="w-full bg-[#2563EB] text-white py-2 rounded text-sm font-medium hover:bg-[#1e40af] transition"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CategoryPage;
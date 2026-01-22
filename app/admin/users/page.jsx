"use client";
import React, { useEffect, useState } from "react";
import { User as UserIcon, Mail, History, Search } from "lucide-react";
import axiosInstance from "@/lib/axiosinstance";
import Image from "next/image";
import Link from "next/link";
import { showError } from "@/components/Toaster";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/users");
      setUsers(res.data);
    } catch (error) {
      showError("Failed to synchronize user directory");
    } finally {
      setLoading(false);
    }
  };

  // ================= FILTER =================
  const filteredUsers = users.filter((user) => {
    const q = search.toLowerCase();
    return (
      user.name?.toLowerCase().includes(q) ||
      user.email?.toLowerCase().includes(q)
    );
  });

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

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen font-['Outfit']">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          User Directory
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage and audit all registered platform contributors.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">
            Master Records
          </span>

          <div className="flex items-center gap-3">
            {/* SEARCH */}
            <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-3 py-2 bg-white shadow-sm">
              <Search size={16} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search user"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-sm outline-none bg-transparent w-56 placeholder-slate-400"
              />
            </div>

            {/* TOTAL */}
            <span className="flex items-center h-[40px] px-4 rounded-lg border border-slate-300 bg-slate-50 text-sm font-semibold text-slate-600 shadow-sm">
              Total Users: {filteredUsers.length}
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="p-5 w-16 text-center">#</th>
                <th className="p-5">Profile</th>
                <th className="p-5">Member Name</th>
                <th className="p-5">Email Address</th>
                <th className="p-5 text-center">Activity</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50/80 transition-all group"
                >
                  <td className="p-5 text-xs font-bold text-slate-300 text-center">
                    {index + 1}
                  </td>

                  <td className="p-5">
                    <div className="relative w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden shadow-sm">
                      {user.profile_img ? (
                        <Image
                          src={`/uploads/${user.profile_img}`}
                          alt={user.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <UserIcon size={18} />
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="p-5 text-sm font-bold text-slate-700 tracking-tight">
                    {highlightText(user.name, search)}
                  </td>

                  <td className="p-5 text-sm font-medium text-slate-500">
                    {highlightText(user.email, search)}
                  </td>

                  <td className="p-5 text-center">
                    <Link href={`/admin/users/history/${user.id}`}>
                      <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 uppercase tracking-widest hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm">
                        <History size={14} />
                        View History
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!loading && filteredUsers.length === 0 && (
          <div className="text-center py-16 text-slate-400 text-sm">
            No users found.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;

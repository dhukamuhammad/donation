"use client";
import React, { useEffect, useState } from "react";
import {
  User as UserIcon,
  Mail,
  Phone,
  Users as UsersGroupIcon
} from "lucide-react";
import axiosInstance from "@/lib/axiosinstance";
import Image from "next/image";
import { showError } from "@/components/Toaster";

const UserManagement = () => {
  // ================= STATE =================
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH DATA =================
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Fetch Error:", error);
      showError("Failed to load users data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-6 bg-slate-50/50 min-h-screen font-['Outfit']">

      {/* --- Page Header (Simplified) --- */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
          Registered Users
        </h1>
        <p className="text-sm text-slate-500 mt-1">Directory of all platform contributors and registered members.</p>
      </div>

      {/* --- Data Table Container --- */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-nowrap">

        {/* Table Stats Summary */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">
            User Directory
          </span>
          <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-blue-100">
            Total Records: {users.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200">
                <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-16 text-center">#</th>
                <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Profile</th>
                <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Full Name</th>
                <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Email Address</th>
                <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Contact No.</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {users.map((user, index) => (
                <tr key={user.id} className="hover:bg-blue-50/20 transition-colors group">
                  {/* Serial Number */}
                  <td className="p-5 text-xs font-bold text-slate-400 text-center">
                    {index + 1}
                  </td>

                  {/* Avatar */}
                  <td className="p-5">
                    <div className="relative w-11 h-11 rounded-full bg-slate-100 border border-slate-200 overflow-hidden shadow-sm">
                      {user.profile_img ? (
                        <Image
                          src={`/uploads/${user.profile_img}`}
                          alt={user.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-50">
                          <UserIcon size={22} />
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Name & Role */}
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="text-[15px] font-bold text-slate-700">
                        {user.name}
                      </span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="p-5 text-sm font-medium text-slate-600">
                    <div className="flex items-center gap-2.5">
                      <Mail size={15} className="text-slate-300" />
                      {user.email}
                    </div>
                  </td>

                  {/* Phone */}
                  <td className="p-5 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-600 text-[13px] font-bold group-hover:bg-white group-hover:border-blue-100 transition-all">
                      <Phone size={14} className="text-blue-500" />
                      {user.phone || 'N/A'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {!loading && users.length === 0 && (
          <div className="text-center py-24 bg-white">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
              <UserIcon className="text-slate-300" size={32} />
            </div>
            <p className="text-slate-800 font-bold text-lg tracking-tight">No Users Available</p>
            <p className="text-slate-400 text-sm mt-1">The user database is currently empty.</p>
          </div>
        )}
      </div>

      {/* Footer System Status */}
      <div className="mt-6 flex items-center justify-center gap-2 text-slate-300">
        <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
        <span className="text-[10px] font-bold uppercase tracking-widest italic">Database Sync Active</span>
      </div>
    </div>
  );
};

export default UserManagement;
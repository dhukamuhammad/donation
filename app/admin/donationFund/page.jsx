"use client";
import React, { useEffect, useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Calendar,
  FileText,
  Image as ImageIcon,
  Search,
  Tag,
} from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/lib/axiosinstance";
import Image from "next/image";
import DeleteModal from "@/components/CustomModel";
import { showSuccess, showError } from "@/components/Toaster";

const DonationFundPage = () => {
  const [funds, setFunds] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDonationFund();
  }, []);

  const fetchDonationFund = async () => {
    try {
      const res = await axiosInstance.get("/donationFund");
      setFunds(res.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/donationFund/${deleteId}`);
      showSuccess("Campaign deleted successfully");
      setShowDelete(false);
      setDeleteId(null);
      fetchDonationFund();
    } catch {
      showError("Failed to delete campaign");
    }
  };

  const formatAmount = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const toggleStatus = async (fund) => {
    const updatedStatus = fund.status === 1 ? 0 : 1;
    try {
      await axiosInstance.put(`/donationFund/status/${fund.id}`, {
        status: updatedStatus,
      });
      setFunds((prev) =>
        prev.map((item) =>
          item.id === fund.id ? { ...item, status: updatedStatus } : item,
        ),
      );
      showSuccess("Campaign status updated");
    } catch {
      showError("Failed to update status");
    }
  };

  const truncateText = (text, maxLength = 23) =>
    text && text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  // ================= FILTER =================
  const filteredFunds = funds.filter((fund) =>
    fund.title?.toLowerCase().includes(search.toLowerCase()),
  );

  // ================= HIGHLIGHT (COLOR ONLY) =================
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

  // one image show

  const getFirstThumbnail = (thumbnail) => {
    try {
      const parsed = JSON.parse(thumbnail);
      return Array.isArray(parsed) ? parsed[0] : parsed;
    } catch {
      // old data (single image string)
      return thumbnail;
    }
  };

  return (
    <div className="p-6 bg-slate-50/50 min-h-screen font-['Outfit']">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Campaign Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review and manage all live donation fundraisers.
          </p>
        </div>

        <Link href="/admin/donationFund/add-donationFund">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-sm font-bold text-sm">
            <Plus size={18} strokeWidth={2.5} />
            Launch New Fund
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
          {/* LEFT — unchanged */}
          <div className="flex items-center gap-2 text-slate-400">
            <Tag size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">
              Active Campaigns
            </span>
          </div>

          {/* RIGHT — search + total */}
          <div className="flex items-center gap-3">
            {/* Search Input with Pro Design */}
            <div className="relative group">
              {/* Icon absolute positioning as per the design */}
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <Search size={16} />
              </div>

              <input
                type="text"
                placeholder="Search campaign"
                value={search} // Logic untouched
                onChange={(e) => setSearch(e.target.value)} // Logic untouched
                className="w-64 text-[13px] font-medium bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none placeholder:text-slate-400 shadow-sm"
              />
            </div>

            {/* Total Badge styled to match the Pro UI */}
            <span className="flex items-center text-[13px] font-medium bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-4 py-2 focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none placeholder:text-slate-400">
              Total: {filteredFunds.length}
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200">
                <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-16 text-center">
                  ID
                </th>
                <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Visuals
                </th>
                <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Campaign Title
                </th>
                <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Target Amount
                </th>
                <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">
                  Start Date
                </th>
                <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">
                  End Date
                </th>
                <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">
                  Status
                </th>
                <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredFunds.map((fund) => (
                <tr
                  key={fund.id}
                  className="hover:bg-blue-50/30 transition-colors group"
                >
                  <td className="p-4 text-xs font-bold text-slate-400 text-center">
                    #{fund.id}
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="relative w-10 h-10 rounded border border-slate-200 overflow-hidden">
                        <Image
                          src={`/uploads/${getFirstThumbnail(fund.thumbnail)}`}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="relative w-10 h-10 rounded border border-slate-200 overflow-hidden bg-slate-50 group shadow-sm flex items-center justify-center">
                        {fund.document_img?.toLowerCase().endsWith(".pdf") && (
                          <div className="relative w-10 h-10 rounded border border-slate-200 overflow-hidden bg-slate-50 group shadow-sm flex items-center justify-center flex-shrink-0">
                            <a
                              href={`/uploads/${fund.document_img}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full h-full flex flex-col items-center justify-center bg-red-50/50 transition-all group-hover:bg-red-100/60"
                            >
                              {/* PDF Visual Design */}
                              <div className="relative flex flex-col items-center">
                                {/* PDF Icon */}
                                <FileText
                                  size={18}
                                  className="text-red-500 stroke-[2.5]"
                                />

                                {/* Tiny Red Label */}
                                <span className="absolute -bottom-1.5 text-[7px] font-black bg-red-600 text-white px-0.5 rounded-[1px] leading-none uppercase">
                                  PDF
                                </span>
                              </div>
                            </a>

                            {/* Subtle Hover Overlay */}
                            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors pointer-events-none" />
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="text-sm font-semibold text-slate-700 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {highlightText(truncateText(fund.title), search)}
                    </span>
                  </td>

                  <td className="p-4 text-sm font-bold text-slate-900">
                    {formatAmount(fund.total_amount)}
                  </td>

                  <td className="p-4 text-center text-slate-500 text-[13px] font-medium">
                    <Calendar size={14} className="inline text-blue-500 mr-1" />
                    {formatDate(fund.start_date)}
                  </td>

                  <td className="p-4 text-center text-slate-500 text-[13px] font-medium">
                    <Calendar size={14} className="inline text-red-500 mr-1" />
                    {formatDate(fund.end_date)}
                  </td>

                  <td className="p-4 text-center">
                    <div
                      onClick={() => toggleStatus(fund)}
                      className={`relative w-10 h-5 rounded-full cursor-pointer ${fund.status === 1 ? "bg-blue-500" : "bg-slate-300"
                        }`}
                    >
                      <div
                        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${fund.status === 1 ? "left-5" : "left-1"
                          }`}
                      />
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-1">
                      <Link
                        href={`/admin/donationFund/edit-donationFund/${fund.id}`}
                      >
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Edit2 size={16} />
                        </button>
                      </Link>
                      <button
                        onClick={() => {
                          setDeleteId(fund.id);
                          setShowDelete(true);
                        }}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
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

        {filteredFunds.length === 0 && (
          <div className="text-center py-20">
            <FileText className="mx-auto text-slate-300" size={32} />
            <p className="text-slate-400 text-sm mt-2">No campaigns found</p>
          </div>
        )}
      </div>

      <DeleteModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={confirmDelete}
        title="Remove Campaign"
        description="Are you sure you want to delete this fundraiser?"
        Delete="Delete Permanently"
      />
    </div>
  );
};

export default DonationFundPage;

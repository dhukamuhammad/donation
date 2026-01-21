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
    } catch (error) {
      showError("Failed to delete campaign");
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const toggleStatus = async (fund) => {
    const updatedStatus = fund.status === 1 ? 0 : 1;

    try {
      await axiosInstance.put(`/donationFund/status/${fund.id}`, {
        status: updatedStatus,
      });

      // ✅ IMPORTANT: update UI state
      setFunds((prevFunds) =>
        prevFunds.map((item) =>
          item.id === fund.id ? { ...item, status: updatedStatus } : item,
        ),
      );

      showSuccess("Campaign status updated");
    } catch (error) {
      showError("Failed to update status");
    }
  };

  return (
    <div className="p-6 lg:p-6 bg-slate-50/50 min-h-screen font-['Outfit']">
      {/* --- Dashboard Header --- */}
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
          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-sm font-bold text-sm active:scale-95">
            <Plus size={18} strokeWidth={2.5} />
            <span>Launch New Fund</span>
          </button>
        </Link>
      </div>

      {/* --- Data Table Container --- */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
          <div className="flex items-center gap-2 text-slate-400">
            <Search size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">
              Active Campaigns
            </span>
          </div>
          <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">
            Total: {funds.length}
          </span>
        </div>

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
                <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest min-w-[20px]">
                  Campaign Title
                </th>
                <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-left">
                  Target Amount
                </th>
                <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">
                  Start Date
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
              {funds.map((fund) => (
                <tr
                  key={fund.id}
                  className="hover:bg-blue-50/30 transition-colors group"
                >
                  <td className="p-4 text-xs font-bold text-slate-400 text-center">
                    #{fund.id}
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {/* Thumbnail Preview */}
                      <div className="group/img relative w-10 h-10 rounded border border-slate-200 bg-slate-50 overflow-hidden shadow-sm">
                        <Image
                          src={`/uploads/${fund.thumbnail}`}
                          alt="Thumbnail"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                          <ImageIcon size={12} className="text-white" />
                        </div>
                      </div>
                      {/* Document Preview */}
                      <div className="group/img relative w-10 h-10 rounded border border-slate-200 bg-slate-50 overflow-hidden shadow-sm">
                        <Image
                          src={`/uploads/${fund.document_img}`}
                          alt="Doc"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                          <FileText size={12} className="text-white" />
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className=" text-sm font-semibold text-slate-700 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {fund.title}
                    </span>
                  </td>

                  <td className="p-4 text-left">
                    <span className="text-sm font-bold text-slate-900">
                      {formatAmount(fund.total_amount)}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <div className="inline-flex items-center gap-1.5 text-slate-500 text-[13px] font-medium">
                      <Calendar size={14} className="text-blue-500" />
                      <span>{formatDate(fund.date)}</span>
                    </div>
                  </td>

                  <td className="p-4 text-left">
                    <div
                      onClick={() => toggleStatus(fund)}
                      className={`relative w-10 h-5 rounded-full cursor-pointer transition-colors
      ${fund.status === 1 ? "bg-blue-500" : "bg-slate-300"}
    `}
                    >
                      <div
                        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all
        ${fund.status === 1 ? "left-5" : "left-1"}
      `}
                      />
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center justify-center gap-1">
                      <Link
                        href={`/admin/donationFund/edit-donationFund/${fund.id}`}
                      >
                        <button
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit Campaign"
                        >
                          <Edit2 size={16} />
                        </button>
                      </Link>
                      <button
                        onClick={() => {
                          setDeleteId(fund.id);
                          setShowDelete(true);
                        }}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete Campaign"
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

        {/* Empty State Overlay */}
        {funds.length === 0 && (
          <div className="text-center py-20 bg-white">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
              <FileText className="text-slate-300" size={32} />
            </div>
            <p className="text-slate-800 font-bold">
              No active fundraisers found
            </p>
            <p className="text-slate-400 text-sm mt-1">
              Get started by creating your first campaign.
            </p>
          </div>
        )}
      </div>

      {/* --- Delete Confirmation --- */}
      <DeleteModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={confirmDelete}
        title="Remove Campaign"
        description="Are you sure you want to delete this fundraiser? All associated records will be permanently removed from the system."
        Delete="Delete Permanently"
      />
    </div>
  );
};

export default DonationFundPage;

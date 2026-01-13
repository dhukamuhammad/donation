"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosinstance";
import { Tag } from "lucide-react";

const ContactPage = () => {
  const [contact, setContact] = useState([]);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const res = await axiosInstance.get("/contact");
      setContact(res.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  return (
    <div className="p-6 bg-slate-50/50 min-h-screen font-['Outfit']">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Donation contact</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage cause types for your fundraisers.
        </p>
      </div>

      {/* Table Section — Full Width */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden w-full">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <Tag size={16} className="text-blue-600" />
            Existing contact
          </h2>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200">
                <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-16 text-center">
                  #
                </th>
                <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Name
                </th>
                <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Email
                </th>
                <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Subject
                </th>
                <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Message
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {contact.length > 0 ? (
                contact.map((cont, index) => (
                  <tr
                    key={cont.id}
                    className="hover:bg-blue-50/30 transition-colors group"
                  >
                    <td className="p-4 text-sm text-slate-500 text-center font-medium">
                      {index + 1}
                    </td>
                    <td className="p-4 text-sm font-semibold text-slate-700">
                      {cont.name}
                    </td>
                    <td className="p-4 text-sm font-semibold text-slate-700">
                      {cont.email}
                    </td>
                    <td className="p-4 text-sm font-semibold text-slate-700">
                      {cont.subject}
                    </td>
                    <td className="p-4 text-sm font-semibold text-slate-700">
                      {cont.message}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="p-10 text-center text-slate-400 italic text-sm"
                  >
                    No contact found. Use the form to add one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

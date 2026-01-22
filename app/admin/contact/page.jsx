"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosinstance";
import { Tag, Search, Eye, X } from "lucide-react";

const ContactPage = () => {
  const [contact, setContact] = useState([]);
  const [search, setSearch] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

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

  // ================= FILTER =================
  const filteredContact = contact.filter((item) => {
    const q = search.toLowerCase();
    return (
      item.name?.toLowerCase().includes(q) ||
      item.email?.toLowerCase().includes(q) ||
      item.subject?.toLowerCase().includes(q) ||
      item.message?.toLowerCase().includes(q)
    );
  });

  // ================= HIGHLIGHT =================
  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="text-blue-500 font-medium">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      ),
    );
  };

  return (
    <div className="p-6 bg-slate-50/50 min-h-screen font-['Outfit']">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Donation Contact
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage contact inquiries received from donors.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search contact..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-md outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden w-full">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <Tag size={16} className="text-blue-600" />
            Existing Contact
          </h2>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200">
                <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center w-12">
                  #
                </th>
                <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-40">
                  Name
                </th>
                <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-56">
                  Email
                </th>
                <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-48">
                  Subject
                </th>
                <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Message
                </th>
                <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center w-16">
                  {/* View */}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredContact.length > 0 ? (
                filteredContact.map((cont, index) => (
                  <tr
                    key={cont.id}
                    className="hover:bg-blue-50/30 transition-colors"
                  >
                    <td className="p-4 text-xs text-slate-500 text-center font-medium">
                      {index + 1}
                    </td>

                    <td className="p-4 text-sm text-slate-700 truncate">
                      {highlightText(cont.name, search)}
                    </td>

                    <td className="p-4 text-sm text-slate-600 truncate">
                      {highlightText(cont.email, search)}
                    </td>

                    <td className="p-4 text-sm text-slate-600 truncate">
                      {highlightText(cont.subject, search)}
                    </td>

                    <td className="p-4 text-sm text-slate-600">
                      <p className="line-clamp-2 leading-relaxed">
                        {highlightText(cont.message, search)}
                      </p>
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => {
                          setSelected(cont);
                          setIsOpen(true);
                        }}
                        className="p-2 rounded-md border border-slate-200 hover:bg-slate-100"
                        title="View Details"
                      >
                        <Eye size={16} className="text-blue-600" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="p-10 text-center text-slate-400 italic text-sm"
                  >
                    No contact found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= DETAILS MODAL ================= */}
      {isOpen && selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-100">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Contact Details
            </h3>

            <div className="space-y-3 text-sm text-slate-700">
              <p>
                <span className="font-semibold text-slate-500">Name:</span>{" "}
                {selected.name}
              </p>
              <p>
                <span className="font-semibold text-slate-500">Email:</span>{" "}
                {selected.email}
              </p>
              <p>
                <span className="font-semibold text-slate-500">Subject:</span>{" "}
                {selected.subject}
              </p>
              <p>
                <span className="font-semibold text-slate-500">Message:</span>
              </p>
              <div className="p-3 bg-slate-50 rounded-md text-slate-600 leading-relaxed max-h-[250px] overflow-y-auto whitespace-pre-wrap">
                {selected.message}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;

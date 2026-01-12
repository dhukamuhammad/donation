"use client";
import axiosInstance from "@/lib/axiosinstance";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Components & Icons
import InvoiceTemplate from "@/app/(client)/invoice/[id]/page";
import { HandHeart, LogOut, User, FileText, Calendar, Wallet } from "lucide-react";
import CustomModel from "@/components/CustomModel";

const MyDonation = () => {
    const router = useRouter();
    const pathname = usePathname();

    const [donations, setDonations] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [isDownloading, setIsDownloading] = useState(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const invoiceRef = useRef(null);

    /* ================= Auth Guard ================= */
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) router.push("/login");
    }, [router]);

    /* ================= Fetch My Donations ================= */
    useEffect(() => {
        fetchMyDonations();
    }, []);

    const fetchMyDonations = async () => {
        const userId = localStorage.getItem("userId");
        try {
            const res = await axiosInstance.get(`/donationFund/by-user/${userId}`);
            setDonations(res.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    /* ================= Download Handler ================= */
    const handleDownload = async (id) => {
        setIsDownloading(id);
        try {
            const res = await axiosInstance.get(`/donationFund/invoice/${id}`);
            setSelectedInvoice(res.data);

            setTimeout(async () => {
                if (invoiceRef.current) {
                    const canvas = await html2canvas(invoiceRef.current, {
                        scale: 2,
                        useCORS: true,
                        logging: false,
                        backgroundColor: "#ffffff",
                        onclone: (clonedDoc) => {
                            const allElements = clonedDoc.querySelectorAll('*');
                            allElements.forEach((el) => {
                                const style = window.getComputedStyle(el);
                                if (style.color.includes('lab') || style.color.includes('oklch')) {
                                    el.style.color = 'rgb(30, 41, 59)';
                                }
                                if (style.backgroundColor.includes('lab') || style.backgroundColor.includes('oklch')) {
                                    if (style.backgroundColor !== 'rgba(0, 0, 0, 0)') {
                                        el.style.backgroundColor = 'rgb(255, 255, 255)';
                                    }
                                }
                            });
                        },
                    });

                    const imgData = canvas.toDataURL("image/png");
                    const pdf = new jsPDF("p", "mm", "a4");
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
                    pdf.save(`Donation_Receipt_${id}.pdf`);
                }
                setIsDownloading(null);
                setSelectedInvoice(null);
            }, 600);
        } catch (err) {
            console.error("Download Error:", err);
            setIsDownloading(null);
        }
    };

    /* ================= Logout Logic ================= */
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");
            await axiosInstance.post("/auth/logout", {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            window.dispatchEvent(new Event("auth-changed"));
            router.push("/login");
            setShowLogoutModal(false);
        } catch {
            setShowLogoutModal(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit", month: "short", year: "numeric",
        });
    };

    return (
        <div className="flex gap-8 max-w-[1400px] mx-auto p-8 font-['Outfit'] text-slate-700 max-md:flex-col bg-white min-h-screen">

            {/* HIDDEN INVOICE TEMPLATE */}
            <InvoiceTemplate ref={invoiceRef} invoice={selectedInvoice} />

            {/* ================= Sidebar (Normal & Professional) ================= */}
            <div className="w-[280px] bg-white rounded-lg border border-slate-200 p-6 h-fit sticky top-[100px] max-md:w-full max-md:static shadow-sm">
                <div className="pb-4 mb-4 border-b border-slate-100">
                    <h3 className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">User Dashboard</h3>
                </div>
                <div className="flex flex-col gap-1">
                    <Link
                        href="/profile"
                        className={`px-4 py-2.5 rounded-md transition-colors flex items-center gap-3 text-sm ${pathname === "/profile"
                            ? "bg-blue-600 text-white font-bold"
                            : "text-slate-600 hover:bg-slate-50 border border-transparent"
                            }`}
                    >
                        <User size={18} />
                        <span>My Profile</span>
                    </Link>

                    <Link
                        href="/my-donation"
                        className={`px-4 py-2.5 rounded-md transition-colors flex items-center gap-3 text-sm ${pathname === "/my-donation"
                            ? "bg-blue-600 text-white font-bold"
                            : "text-slate-600 hover:bg-slate-50 border border-transparent"
                            }`}
                    >
                        <HandHeart size={18} />
                        <span>My Donations</span>
                    </Link>

                    <div className="my-2 border-t border-slate-50 pt-2">
                        <button
                            onClick={() => setShowLogoutModal(true)}
                            className="w-full px-4 py-2.5 rounded-md text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3 text-sm font-semibold"
                        >
                            <LogOut size={18} />
                            <span>Logout Account</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* ================= Main Content (Clean Grid) ================= */}
            <div className="flex-1 bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                <div className="mb-8 pb-6 border-b border-slate-100">
                    <h2 className="text-2xl font-bold text-slate-800 mb-1">My Donations</h2>
                    <p className="text-sm text-slate-500">Track all your contributions and download official receipts.</p>
                </div>

                <div className="flex flex-col gap-4">
                    {donations.length === 0 && (
                        <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-xl">
                            <p className="text-slate-400 font-medium">No donations found in your history.</p>
                        </div>
                    )}

                    {donations.map((item) => (
                        <div key={item.id} className="flex gap-6 p-5 rounded-lg border border-slate-200 hover:border-blue-200 transition-colors bg-white items-center max-sm:flex-col max-sm:items-start">
                            {/* Thumbnail */}
                            <div className="w-32 h-24 flex-shrink-0 rounded-md overflow-hidden border border-slate-100">
                                <Image
                                    src={`/uploads/${item.thumbnail}`}
                                    alt={item.title} width={128} height={96}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Details */}
                            <div className="flex-1 space-y-2">
                                <h3 className="text-base font-bold text-slate-800 line-clamp-1">{item.title}</h3>
                                <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                                    <div className="flex items-center gap-1.5">
                                        <Wallet size={14} className="text-blue-600" />
                                        <span>Amount: <span className="text-slate-800 font-bold">₹{item.amount.toLocaleString('en-IN')}</span></span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={14} className="text-blue-600" />
                                        <span>{formatDate(item.created_date)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2 items-end max-sm:w-full max-sm:items-center max-sm:flex-row max-sm:justify-between">
                                <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded text-[10px] font-bold uppercase border border-green-100">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                    Successful
                                </div>

                                <button
                                    onClick={() => handleDownload(item.id)}
                                    disabled={isDownloading === item.id}
                                    className={`flex items-center gap-2 px-5 py-2 text-xs font-bold rounded shadow-sm transition-all border ${isDownloading === item.id
                                        ? "bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed"
                                        : "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 active:scale-95"
                                        }`}
                                >
                                    <FileText size={14} />
                                    {isDownloading === item.id ? "Generating..." : "Download Receipt"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            <CustomModel
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleLogout}
                title="Confirm Logout"
                description="Are you sure you want to logout? You will need to login again to view your dashboard."
                Delete="Logout Account"
            />
        </div>
    );
};

export default MyDonation;
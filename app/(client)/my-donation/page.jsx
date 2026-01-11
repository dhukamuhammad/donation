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
import { HandHeart, LogOut, User } from "lucide-react";
import CustomModel from "@/components/CustomModel"; // Import CustomModel

const MyDonation = () => {
    const router = useRouter();
    const pathname = usePathname();

    const [donations, setDonations] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [isDownloading, setIsDownloading] = useState(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false); // Modal State
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
            alert("Download fail ho gaya!");
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
            setShowLogoutModal(false); // Modal close karein
        } catch {
            alert("Logout failed ❌");
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit", month: "short", year: "numeric",
        });
    };

    return (
        <div className="flex gap-8 max-w-[1400px] mx-auto p-8 font-['Outfit'] text-slate-700 max-md:flex-col bg-white">

            {/* HIDDEN INVOICE TEMPLATE */}
            <InvoiceTemplate ref={invoiceRef} invoice={selectedInvoice} />

            {/* ================= Sidebar ================= */}
            <div className="w-[280px] bg-white rounded border border-slate-200 p-7 h-fit sticky top-[90px] max-md:w-full max-md:static shadow-sm">
                <div className="pb-5 mb-5 border-b border-slate-200">
                    <h3 className="text-sm font-bold tracking-widest text-slate-400">USER MENU</h3>
                </div>
                <div className="flex flex-col gap-2">
                    <Link
                        href="/profile"
                        className={`px-4 py-3 rounded transition-all flex items-center gap-3 border ${pathname === "/profile"
                            ? "bg-blue-600/10 text-blue-600 border-blue-600/20 font-semibold"
                            : "hover:bg-blue-600/5 text-slate-600 border-transparent"
                            }`}
                    >
                        <User size={20} className={pathname === "/profile" ? "text-blue-600" : "text-slate-400"} />
                        <span>My Profile</span>
                    </Link>

                    <Link
                        href="/my-donation"
                        className={`px-4 py-3 rounded transition-all flex items-center gap-3 border ${pathname === "/my-donation"
                            ? "bg-blue-600/10 text-blue-600 border-blue-600/20 font-semibold"
                            : "hover:bg-blue-600/5 text-slate-600 border-transparent"
                            }`}
                    >
                        <HandHeart size={20} className={pathname === "/my-donation" ? "text-blue-600" : "text-slate-400"} />
                        <span>My Donations</span>
                    </Link>

                    {/* Trigger Logout Modal */}
                    <div
                        onClick={() => setShowLogoutModal(true)}
                        className="px-4 py-3 rounded cursor-pointer hover:bg-red-50 text-red-600 transition-all flex items-center gap-3 mt-2 border border-transparent"
                    >
                        <LogOut size={20} className="text-red-500" />
                        <span>Logout</span>
                    </div>
                </div>
            </div>

            {/* ================= Main Content ================= */}
            <div className="flex-1 bg-white rounded border border-slate-200 p-8">
                <h2 className="text-2xl font-bold mb-6 text-blue-600">My Donations</h2>

                <div className="flex flex-col gap-5">
                    {donations.length === 0 && <p className="text-slate-500">No donations found.</p>}

                    {donations.map((item) => (
                        <div key={item.id} className="flex gap-6 p-5 rounded border border-slate-200 hover:shadow-md transition-all bg-white">
                            <Image
                                src={`/uploads/${item.thumbnail}`}
                                alt={item.title} width={120} height={90}
                                className="rounded object-cover border border-slate-100"
                            />

                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-slate-800">{item.title}</h3>
                                <p className="text-sm text-slate-500 mt-1">
                                    Amount Donated: <span className="font-semibold text-blue-600">₹{item.amount}</span>
                                </p>
                                <p className="text-xs mt-2 text-slate-400 font-medium">Date: {formatDate(item.created_date)}</p>
                            </div>

                            <div className="flex flex-col gap-3 items-end">
                                <span className="px-3 py-1 text-xs rounded bg-green-100 text-green-700 font-bold uppercase tracking-wider">Successful</span>

                                <button
                                    onClick={() => handleDownload(item.id)}
                                    disabled={isDownloading === item.id}
                                    className={`px-4 py-2 text-xs font-semibold rounded text-white shadow-sm transition-all ${isDownloading === item.id
                                        ? "bg-slate-400 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700 active:scale-95"
                                        }`}
                                >
                                    {isDownloading === item.id ? "Processing..." : "Download Invoice"}
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
                description="Are you sure you want to logout from this website?"
                Delete="Logout"
            />
        </div>
    );
};

export default MyDonation;
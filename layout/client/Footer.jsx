"use client";
import {
    Heart,
    Mail,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    ChevronRight,
    ShieldCheck,
    Send
} from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
    const quickLinks = [
        { name: 'About Our Mission', href: '/about' },
        { name: 'How It Works', href: '/how-it-works' },
        { name: 'Impact Stories', href: '/stories' },
        { name: 'Become a Volunteer', href: '/volunteer' }
    ];

    const categories = [
        { name: 'Monthly Ration Kits', href: '/category/ration' },
        { name: 'Medical Emergencies', href: '/category/medical' },
        { name: 'Education Support', href: '/category/education' },
        { name: 'Widow Pension', href: '/category/widow' }
    ];

    const supportLinks = [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Refund Policy', href: '/refund' },
        { name: 'Contact Support', href: '/contact' }
    ];

    return (
        <footer className=" bg-white text-slate-900 font-['Outfit'] ">



            {/* --- Main Footer Content --- */}
            <div className="max-w-7xl mx-auto px-6 py-8 md:py-10 border-t border-blue-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                    {/* Column 1: Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm">
                                <Heart size={18} fill="white" stroke="none" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900">DonateCare</span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed font-medium">
                            Dedicated to bringing transparency and efficiency to social welfare. We bridge the gap between compassionate donors and verified causes.
                        </p>
                        <div className="flex gap-3">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600 mb-8">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link, i) => (
                                <li key={i}>
                                    <Link href={link.href} className="text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1.5 text-sm font-semibold">
                                        <ChevronRight size={14} className="text-slate-300" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Categories */}
                    <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600 mb-8">Support Causes</h4>
                        <ul className="space-y-3">
                            {categories.map((link, i) => (
                                <li key={i}>
                                    <Link href={link.href} className="text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1.5 text-sm font-semibold">
                                        <ChevronRight size={14} className="text-slate-300" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact & Verification */}
                    <div className="space-y-6">
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600 mb-8">Get In Touch</h4>
                        <div className="space-y-5">
                            <div className="flex gap-3 items-start text-sm text-slate-500">
                                <div className="p-2 bg-blue-50 rounded-lg shrink-0">
                                    <MapPin size={16} className="text-blue-600" />
                                </div>
                                <span className="font-medium">Mahi Village, Vadgam Taluka,<br /> Banaskantha, Gujarat, India</span>
                            </div>
                            <div className="flex gap-3 items-center text-sm text-slate-500">
                                <div className="p-2 bg-blue-50 rounded-lg shrink-0">
                                    <Mail size={16} className="text-blue-600" />
                                </div>
                                <a href="mailto:support@donatecare.org" className="hover:text-blue-600 transition-colors font-medium">support@donatecare.org</a>
                            </div>
                            <div className="pt-2">
                                <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-3 py-1.5 rounded-lg border border-green-100 shadow-sm shadow-green-600/5">
                                    <ShieldCheck size={14} />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">Verified NGO Profile</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Newsletter Section (Subtle Light Background) --- */}
            <div className="bg-blue-50/50 border-b border-slate-100 ">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left">
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Subscribe to our newsletter</h3>
                            <p className="text-slate-500 text-sm">Stay updated with our latest campaigns and social impact reports.</p>
                        </div>
                        <div className="w-full max-w-md flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all"
                            />
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-blue-600/10 active:scale-95">
                                Subscribe <Send size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Bottom Bar --- */}
            <div className="border-t border-slate-100 bg-slate-50/30 py-8">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-400 text-[11px] font-medium">
                        © 2026 <span className="text-slate-600 font-bold">DonateCare Foundation</span>. All rights reserved.
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        <span className="text-blue-600/80">80G TAX EXEMPTION AVAILABLE</span>
                        <span className="hidden md:inline text-slate-200">|</span>
                        <span>Ahmedabad, Gujarat</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
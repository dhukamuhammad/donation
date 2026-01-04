"use client";
import { Heart, Menu, X, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ChevronRight } from 'lucide-react';

const Footer = () => {
    const quickLinks = [
        { name: 'About Us', href: '/about' },
        { name: 'How It Works', href: '/how-it-works' },
        { name: 'Success Stories', href: '/stories' },
        { name: 'FAQ', href: '/faq' }
    ];

    const supportLinks = [
        { name: 'Help Center', href: '/help' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Contact Us', href: '/contact' }
    ];

    const categories = [
        { name: 'Medical Treatment', href: '/category/medical' },
        { name: 'Education Support', href: '/category/education' },
        { name: 'Emergency Help', href: '/category/emergency' },
        { name: 'Disaster Relief', href: '/category/disaster' }
    ];

    return (
        <footer className="bg-gray-900 text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-[#2563EB] p-2 rounded-lg">
                                <Heart size={20} fill="white" className="text-white" />
                            </div>
                            <span className="text-xl font-bold">HopeChain</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">
                            Connecting compassionate donors with meaningful causes to create lasting impact and positive change.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-[#2563EB] transition">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-[#2563EB] transition">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-[#2563EB] transition">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-[#2563EB] transition">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                        <div className="space-y-2">
                            {quickLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm group"
                                >
                                    <ChevronRight size={14} className="group-hover:translate-x-1 transition" />
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Categories</h3>
                        <div className="space-y-2">
                            {categories.map((category, index) => (
                                <a
                                    key={index}
                                    href={category.href}
                                    className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm group"
                                >
                                    <ChevronRight size={14} className="group-hover:translate-x-1 transition" />
                                    {category.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Contact Us</h3>
                        <div className="space-y-3 text-sm text-gray-400">
                            <div className="flex items-start gap-3">
                                <Mail size={18} className="mt-0.5 text-[#2563EB]" />
                                <div>
                                    <p className="text-white font-medium">Email</p>
                                    <a href="mailto:support@hopechain.org" className="hover:text-white transition">
                                        support@hopechain.org
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone size={18} className="mt-0.5 text-[#2563EB]" />
                                <div>
                                    <p className="text-white font-medium">Phone</p>
                                    <a href="tel:+919876543210" className="hover:text-white transition">
                                        +91 98765 43210
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="mt-0.5 text-[#2563EB]" />
                                <div>
                                    <p className="text-white font-medium">Address</p>
                                    <p>Mumbai, Maharashtra, India</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="border-t border-gray-800 pt-8 pb-8">
                    <div className="max-w-xl mx-auto text-center">
                        <h3 className="font-bold text-xl mb-2">Stay Updated</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Subscribe to our newsletter for latest campaigns and updates
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition"
                            />
                            <button className="bg-[#2563EB] text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">
                        © 2025 HopeChain. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm">
                        <a href="/privacy" className="text-gray-400 hover:text-white transition">
                            Privacy Policy
                        </a>
                        <a href="/terms" className="text-gray-400 hover:text-white transition">
                            Terms of Service
                        </a>
                        <a href="/cookies" className="text-gray-400 hover:text-white transition">
                            Cookie Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};


export default Footer
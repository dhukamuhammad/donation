"use client";
import React, { useState } from 'react';
import { Heart, Search, Menu, X, TrendingUp, Users, Shield, Clock, ArrowRight, CheckCircle, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const campaigns = [
    {
      id: 1,
      title: 'Help Jayram Fight Cancer',
      description: 'Jayram needs urgent medical treatment for his cancer diagnosis. Your support can save his life.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop',
      raised: 90000,
      goal: 150000,
      donors: 234,
      daysLeft: 15,
      category: 'Medical'
    },
    {
      id: 2,
      title: "Raza's Heart Surgery Fund",
      description: 'A young boy needs life-saving heart surgery. Every contribution brings hope to his family.',
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=300&fit=crop',
      raised: 600000,
      goal: 800000,
      donors: 456,
      daysLeft: 20,
      category: 'Medical'
    },
    {
      id: 3,
      title: 'Education for Underprivileged Children',
      description: 'Help provide quality education and resources to children who dream of a better future.',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
      raised: 450000,
      goal: 600000,
      donors: 389,
      daysLeft: 25,
      category: 'Education'
    },
    {
      id: 4,
      title: 'Healing Hope',
      description: 'Supporting families in need with medical care and emotional support during difficult times.',
      image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=400&h=300&fit=crop',
      raised: 762600,
      goal: 1000000,
      donors: 567,
      daysLeft: 10,
      category: 'Medical'
    }
  ];

  const stats = [
    { icon: Heart, value: '₹2.5 Cr+', label: 'Total Donations' },
    { icon: Users, value: '10,000+', label: 'Happy Donors' },
    { icon: TrendingUp, value: '500+', label: 'Campaigns' },
    { icon: CheckCircle, value: '95%', label: 'Success Rate' }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Secure & Transparent',
      description: 'Every donation is tracked and verified for complete transparency'
    },
    {
      icon: Clock,
      title: 'Quick Impact',
      description: 'Funds reach beneficiaries quickly to make immediate difference'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join thousands of donors making a real difference together'
    }
  ];

  const getProgress = (raised, goal) => {
    return Math.min((raised / goal) * 100, 100);
  };

  const formatAmount = (amount) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-[#2563EB] to-blue-600 p-2 rounded-lg">
                <Heart size={24} className="text-white" fill="white" />
              </div>
              <span className="text-xl font-bold text-gray-800">HopeChain</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-gray-700 hover:text-[#2563EB] font-medium transition">Home</a>
              <a href="#campaigns" className="text-gray-700 hover:text-[#2563EB] font-medium transition">Campaigns</a>
              <a href="#about" className="text-gray-700 hover:text-[#2563EB] font-medium transition">About</a>
              <a href="#contact" className="text-gray-700 hover:text-[#2563EB] font-medium transition">Contact</a>
              <button className="bg-[#2563EB] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                Start Campaign
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col gap-4">
                <a href="#home" className="text-gray-700 hover:text-[#2563EB] font-medium transition">Home</a>
                <a href="#campaigns" className="text-gray-700 hover:text-[#2563EB] font-medium transition">Campaigns</a>
                <a href="#about" className="text-gray-700 hover:text-[#2563EB] font-medium transition">About</a>
                <a href="#contact" className="text-gray-700 hover:text-[#2563EB] font-medium transition">Contact</a>
                <button className="bg-[#2563EB] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                  Start Campaign
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight mb-6">
                Transform Lives Through
                <span className="text-[#2563EB]"> Generosity</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Join our community of compassionate donors making a real difference. Every contribution counts, every story matters.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-[#2563EB] text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition font-medium text-lg shadow-lg hover:shadow-xl">
                  Donate Now
                </button>
                <button className="border-2 border-[#2563EB] text-[#2563EB] px-8 py-4 rounded-lg hover:bg-blue-50 transition font-medium text-lg">
                  Browse Campaigns
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=500&fit=crop"
                alt="Hero"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">10,000+</p>
                    <p className="text-sm text-gray-600">Lives Changed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-[#2563EB]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="text-white mx-auto mb-3" size={32} />
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-blue-100">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose HopeChain?</h2>
            <p className="text-lg text-gray-600">Your trust is our priority. Here's what makes us different.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
                  <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                    <Icon className="text-[#2563EB]" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Campaigns Section */}
      <section id="campaigns" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Active Campaigns</h2>
              <p className="text-gray-600">Support causes that matter to you</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-[#2563EB] hover:text-blue-700 font-medium">
              View All <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group">
                <div className="relative overflow-hidden">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs font-medium text-[#2563EB]">
                    {campaign.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {campaign.daysLeft} days left
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {campaign.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {campaign.description}
                  </p>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-semibold text-gray-800">
                        {formatAmount(campaign.raised)}
                      </span>
                      <span className="text-gray-600">
                        of {formatAmount(campaign.goal)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#2563EB] h-2 rounded-full transition-all"
                        style={{ width: `${getProgress(campaign.raised, campaign.goal)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span>{campaign.donors} donors</span>
                    <span>{Math.round(getProgress(campaign.raised, campaign.goal))}% funded</span>
                  </div>

                  <button className="w-full bg-[#2563EB] text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-medium">
                    Donate Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#2563EB] to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Start Your Own Campaign
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Need help? Create a campaign and let our community support you
          </p>
          <button className="bg-white text-[#2563EB] px-8 py-4 rounded-lg hover:bg-gray-100 transition font-medium text-lg shadow-lg">
            Create Campaign
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-[#2563EB] p-2 rounded-lg">
                  <Heart size={20} fill="white" className="text-white" />
                </div>
                <span className="text-xl font-bold">HopeChain</span>
              </div>
              <p className="text-gray-400 text-sm">
                Connecting compassionate donors with meaningful causes to create lasting impact.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-gray-400 hover:text-white transition">About Us</a>
                <a href="#" className="block text-gray-400 hover:text-white transition">How It Works</a>
                <a href="#" className="block text-gray-400 hover:text-white transition">Success Stories</a>
                <a href="#" className="block text-gray-400 hover:text-white transition">FAQ</a>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-gray-400 hover:text-white transition">Help Center</a>
                <a href="#" className="block text-gray-400 hover:text-white transition">Privacy Policy</a>
                <a href="#" className="block text-gray-400 hover:text-white transition">Terms of Service</a>
                <a href="#" className="block text-gray-400 hover:text-white transition">Contact Us</a>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>support@hopechain.org</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>Mumbai, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 HopeChain. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
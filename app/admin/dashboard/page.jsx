"use client";
import React from 'react';
import { DollarSign, Users, TrendingUp, Heart, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const DashboardPage = () => {
  const stats = [
    {
      id: 1,
      title: 'Total Donations',
      value: '₹12,45,000',
      change: '+12.5%',
      isPositive: true,
      icon: DollarSign,
      bgColor: 'bg-blue-50',
      iconColor: 'text-[#2563EB]',
      borderColor: 'border-blue-100'
    },
    {
      id: 2,
      title: 'Active Donors',
      value: '2,847',
      change: '+8.2%',
      isPositive: true,
      icon: Users,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      borderColor: 'border-green-100'
    },
    {
      id: 3,
      title: 'Active Campaigns',
      value: '24',
      change: '+3',
      isPositive: true,
      icon: TrendingUp,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-100'
    },
    {
      id: 4,
      title: 'Lives Impacted',
      value: '1,892',
      change: '-2.4%',
      isPositive: false,
      icon: Heart,
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600',
      borderColor: 'border-pink-100'
    }
  ];

  const recentDonations = [
    { id: 1, donor: 'Rahul Sharma', amount: '₹5,000', campaign: 'Medical Treatment', time: '2 hours ago' },
    { id: 2, donor: 'Priya Patel', amount: '₹10,000', campaign: 'Education Support', time: '4 hours ago' },
    { id: 3, donor: 'Amit Kumar', amount: '₹3,500', campaign: 'Emergency Help', time: '6 hours ago' },
    { id: 4, donor: 'Sneha Gupta', amount: '₹7,500', campaign: 'Medical Treatment', time: '8 hours ago' }
  ];

  const topCampaigns = [
    { id: 1, name: 'Help Jayram Fight Cancer', raised: '₹90,000', goal: '₹1,50,000', progress: 60 },
    { id: 2, name: "Raza's Heart Surgery", raised: '₹6,00,000', goal: '₹8,00,000', progress: 75 },
    { id: 3, name: 'Healing Hope', raised: '₹7,62,600', goal: '₹10,00,000', progress: 76 }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className={`bg-white rounded-lg shadow-sm border ${stat.borderColor} p-5 hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon size={24} className={stat.iconColor} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.isPositive ? (
                    <ArrowUpRight size={16} />
                  ) : (
                    <ArrowDownRight size={16} />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-sm text-gray-600 font-medium mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Donations */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-800">Recent Donations</h3>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {recentDonations.map((donation) => (
                <div
                  key={donation.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-base font-medium text-gray-800">{donation.donor}</p>
                    <p className="text-sm text-gray-500">{donation.campaign}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-semibold text-[#2563EB]">{donation.amount}</p>
                    <p className="text-sm text-gray-400">{donation.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Campaigns */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-800">Top Campaigns</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {topCampaigns.map((campaign) => (
                <div key={campaign.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-base font-medium text-gray-800">{campaign.name}</p>
                    <span className="text-sm font-semibold text-gray-600">{campaign.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div
                      className="bg-[#2563EB] h-2.5 rounded-full transition-all"
                      style={{ width: `${campaign.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Raised: <span className="font-semibold text-gray-800">{campaign.raised}</span>
                    </span>
                    <span className="text-sm text-gray-500">Goal: {campaign.goal}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
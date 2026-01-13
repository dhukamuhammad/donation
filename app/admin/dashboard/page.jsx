"use client";
import React from 'react';
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Heart, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const DashboardPage = () => {
  const stats = [
    {
      id: 1,
      title: 'Total Collections',
      value: '₹12,45,000',
      change: '+12.5%',
      isPositive: true,
      icon: DollarSign,
      color: 'blue'
    },
    {
      id: 2,
      title: 'Verified Donors',
      value: '2,847',
      change: '+8.2%',
      isPositive: true,
      icon: Users,
      color: 'emerald'
    },
    {
      id: 3,
      title: 'Live Campaigns',
      value: '24',
      change: '+3 new',
      isPositive: true,
      icon: Activity,
      color: 'indigo'
    },
    {
      id: 4,
      title: 'Lives Impacted',
      value: '1,892',
      change: '-2.4%',
      isPositive: false,
      icon: Heart,
      color: 'rose'
    }
  ];

  const recentDonations = [
    { id: 1, donor: 'Rahul Sharma', amount: '₹5,000', campaign: 'Medical Treatment', time: '2 hours ago', initial: 'RS' },
    { id: 2, donor: 'Priya Patel', amount: '₹10,000', campaign: 'Education Support', time: '4 hours ago', initial: 'PP' },
    { id: 3, donor: 'Amit Kumar', amount: '₹3,500', campaign: 'Emergency Help', time: '6 hours ago', initial: 'AK' },
    { id: 4, donor: 'Sneha Gupta', amount: '₹7,500', campaign: 'Medical Treatment', time: '8 hours ago', initial: 'SG' }
  ];

  const topCampaigns = [
    { id: 1, name: 'Help Jayram Fight Cancer', raised: '₹90,000', goal: '₹1,50,000', progress: 60 },
    { id: 2, name: "Raza's Heart Surgery", raised: '₹6,00,000', goal: '₹8,00,000', progress: 75 },
    { id: 3, name: 'Healing Hope', raised: '₹7,62,600', goal: '₹10,00,000', progress: 76 }
  ];

  return (
    <div className="p-6 lg:p-6 bg-[#F8FAFC] min-h-screen font-['Outfit']">
      
      {/* --- Page Header --- */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Executive Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
            Real-time insights and monitoring for <strong>DonateCare</strong>.
          </p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 flex items-center gap-3 shadow-sm">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
           <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Live System Status</span>
        </div>
      </div>

      {/* --- Stats Cards Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-lg bg-slate-50 group-hover:bg-blue-600 group-hover:text-white transition-colors text-slate-400`}>
                  <Icon size={20} />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-bold ${
                  stat.isPositive ? 'bg-green-50 text-green-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* --- Two Column Detailed View --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Recent Activity (2 Span) */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Recent Donations</h3>
              <button className="text-xs font-bold text-blue-600 hover:underline">Download CSV</button>
            </div>
            <div className="p-2">
              <div className="space-y-1">
                {recentDonations.map((donation) => (
                  <div key={donation.id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-lg transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                        {donation.initial}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{donation.donor}</p>
                        <p className="text-[11px] font-medium text-slate-400 uppercase tracking-tight">{donation.campaign}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-blue-600">{donation.amount}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{donation.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/admin/donations" className="block text-center py-3 border-t border-slate-50 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest">
                View All Transactions
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Campaign Progress (1 Span) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Top Campaigns</h3>
            </div>
            <div className="p-6 space-y-8">
              {topCampaigns.map((campaign) => (
                <div key={campaign.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-800 truncate pr-4">{campaign.name}</p>
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{campaign.progress}%</span>
                  </div>
                  
                  {/* Thin Industrial Progress Bar */}
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${campaign.progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-medium">
                    <span className="text-slate-400 uppercase tracking-tighter">Raised: <span className="text-slate-700 font-bold">{campaign.raised}</span></span>
                    <span className="text-slate-400 uppercase tracking-tighter italic">Goal: {campaign.goal}</span>
                  </div>
                </div>
              ))}

              <Link href="/admin/donationFund" className="flex items-center justify-center gap-2 w-full mt-4 py-3 bg-slate-50 rounded-lg text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-100">
                Manage All Funds
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
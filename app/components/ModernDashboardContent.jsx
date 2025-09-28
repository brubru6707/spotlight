import React from 'react';

const ModernDashboardContent = () => (
  <div className="px-8 pb-8">
    {/* Header Row */}
    <div className="flex items-center justify-between pt-8 pb-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-lg">Last updated: Feb 28, 2024</span>
    </div>

    {/* Top KPIs */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Leads */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-gray-500">Total Leads</span>
          <span className="text-xs text-gray-400">Apr 03</span>
        </div>
        <div className="flex items-end justify-between">
          <span className="text-3xl font-bold">1,247</span>
          <span className="text-green-500 text-sm font-semibold">↑12.5%</span>
        </div>
        <span className="text-xs text-gray-400">Increased vs last week</span>
        <div className="mt-2">
          {/* Line chart placeholder */}
          <div className="h-12 w-full bg-gradient-to-r from-blue-100 to-blue-300 rounded" />
        </div>
      </div>
      {/* Active Opportunities */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-gray-500">Active Opportunities</span>
          <span className="text-xs text-gray-400">Apr 03</span>
        </div>
        <div className="flex items-end justify-between">
          <span className="text-3xl font-bold">89</span>
          <span className="text-green-500 text-sm font-semibold">↑8.2%</span>
        </div>
        <span className="text-xs text-gray-400">Increased vs last week</span>
        <div className="mt-2">
          {/* Bar chart placeholder */}
          <div className="h-12 w-full bg-gradient-to-r from-gray-100 to-gray-300 rounded" />
        </div>
      </div>
      {/* Conversion Ratios */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-gray-500">Conversion Ratios</span>
        </div>
        <div className="flex items-end justify-between">
          <span className="text-3xl font-bold">12</span>
          <span className="text-blue-500 text-sm font-semibold">↑3</span>
        </div>
        <span className="text-xs text-gray-400">Increased vs last week</span>
        <div className="mt-2">
          {/* Progress bar breakdown */}
          <div className="space-y-2">
            <div>
              <span className="text-xs text-gray-500">Lead to Qualified</span>
              <div className="w-full h-2 bg-gray-100 rounded-full mt-1">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '57%' }} />
              </div>
              <span className="text-xs text-gray-400">57%</span>
            </div>
            <div>
              <span className="text-xs text-gray-500">Qualified to Proposal</span>
              <div className="w-full h-2 bg-gray-100 rounded-full mt-1">
                <div className="h-2 bg-purple-500 rounded-full" style={{ width: '22%' }} />
              </div>
              <span className="text-xs text-gray-400">22%</span>
            </div>
            <div>
              <span className="text-xs text-gray-500">Proposal to Closed</span>
              <div className="w-full h-2 bg-gray-100 rounded-full mt-1">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '21%' }} />
              </div>
              <span className="text-xs text-gray-400">21%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Middle Row: Revenue & Source */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Revenue Performance */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-gray-500">Revenue Performance</span>
          <span className="text-xs text-gray-400">Jan 2024 - Dec 2024</span>
        </div>
        <div className="h-32 w-full bg-gradient-to-r from-blue-100 to-blue-300 rounded mb-2" />
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Total Revenue</span>
          <span>Ava Deal Size</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-lg">$328,000</span>
          <span className="font-bold text-lg">$2,640</span>
        </div>
      </div>
      {/* Source */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-gray-500">Source</span>
          <span className="text-xs text-gray-400">Weekly</span>
        </div>
        <div className="h-32 w-full bg-gradient-to-r from-gray-100 to-gray-300 rounded mb-2" />
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Website</span>
          <span>Email</span>
          <span>Social Media</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-lg">35 <span className="text-green-500 text-xs">↑5.2%</span></span>
          <span className="font-bold text-lg">25 <span className="text-red-500 text-xs">↓3.6%</span></span>
          <span className="font-bold text-lg">15 <span className="text-green-500 text-xs">↑4.5%</span></span>
        </div>
      </div>
    </div>

    {/* Leads Table */}
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-gray-500">Leads</span>
        <span className="text-xs text-gray-400">Jan 2024 - Dec 2024</span>
      </div>
      <table className="w-full mt-4 text-sm">
        <thead>
          <tr className="text-gray-400 text-xs border-b">
            <th className="py-2 text-left">Lead</th>
            <th className="py-2 text-left">Source</th>
            <th className="py-2 text-left">Status</th>
            <th className="py-2 text-left">Last Contact</th>
            <th className="py-2 text-left">Progress</th>
            <th className="py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">JJ</span>
              Jacob Jones
            </td>
            <td className="py-2">Website</td>
            <td className="py-2">Contacted</td>
            <td className="py-2">01 January 2025</td>
            <td className="py-2">
              <div className="w-24 h-2 bg-gray-100 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '30%' }} />
              </div>
              <span className="text-xs ml-2">30%</span>
            </td>
            <td className="py-2 text-blue-500 font-semibold cursor-pointer">View</td>
          </tr>
          <tr>
            <td className="py-2 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">KW</span>
              Kristin Watson
            </td>
            <td className="py-2">Email</td>
            <td className="py-2">Done</td>
            <td className="py-2">07 January 2025</td>
            <td className="py-2">
              <div className="w-24 h-2 bg-gray-100 rounded-full">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '100%' }} />
              </div>
              <span className="text-xs ml-2">100%</span>
            </td>
            <td className="py-2 text-blue-500 font-semibold cursor-pointer">View</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default ModernDashboardContent;

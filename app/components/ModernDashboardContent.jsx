'use client';

import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  ComposedChart,
  CartesianGrid,
} from 'recharts';
import { EllipsisHorizontalIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

// --- DUMMY DATA ---
const totalLeadsData = [
  { name: 'Mon', value: 80 },
  { name: 'Tue', value: 210 },
  { name: 'Wed', value: 10 },
  { name: 'Thu', value: 350 },
  { name: 'Fri', value: 30 },
  { name: 'Sat', value: 400 },
  { name: 'Sun', value: 60 },
];

const activeOpportunitiesData = [
  { name: 'Jul', value: 15 },
  { name: 'Jul', value: 20 },
  { name: 'Jul', value: 12 },
  { name: 'Jul', value: 22 },
  { name: 'Jul', value: 18 },
  { name: 'Jul', value: 25 },
];

const revenuePerformanceData = [
    { name: 'Jan', totalRevenue: 28000, avgDealSize: 2200 },
    { name: 'Feb', totalRevenue: 55000, avgDealSize: 2500 },
    { name: 'Mar', totalRevenue: 42000, avgDealSize: 2800 },
    { name: 'Apr', totalRevenue: 78000, avgDealSize: 2600 },
    { name: 'May', totalRevenue: 95000, avgDealSize: 3200 },
    { name: 'Jun', totalRevenue: 120000, avgDealSize: 2900 },
    { name: 'Jul', totalRevenue: 110000, avgDealSize: 3100 },
    { name: 'Aug', totalRevenue: 135000, avgDealSize: 3400 },
    { name: 'Sep', totalRevenue: 89000, avgDealSize: 2700 },
    { name: 'Oct', totalRevenue: 156000, avgDealSize: 3800 },
    { name: 'Nov', totalRevenue: 142000, avgDealSize: 3300 },
    { name: 'Dec', totalRevenue: 178000, avgDealSize: 4100 },
];

const leadsData = [
    {
        name: 'Jacob Jones',
        initials: 'JJ',
        source: 'Website',
        status: 'Contacted',
        lastContact: '01 January 2025',
        progress: 30,
    },
    {
        name: 'Kristin Watson',
        initials: 'KW',
        source: 'Email',
        status: 'Done',
        lastContact: '07 January 2025',
        progress: 100,
    },
    {
        name: 'Jane Cooper',
        initials: 'JC',
        source: 'Social Media',
        status: 'Proposal',
        lastContact: '12 January 2025',
        progress: 75,
    },
];

// --- REUSABLE COMPONENTS ---
const KpiCard = ({ title, value, change, changeType, date, children }) => (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col">
        <div className="flex items-center justify-between text-gray-500">
            <span className="text-sm font-semibold">{title}</span>
            <EllipsisHorizontalIcon className="h-5 w-5 cursor-pointer" />
        </div>
        <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-3xl font-bold text-gray-800">{value}</span>
            {change && (
                <span className={`text-sm font-semibold ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                    <span className={changeType === 'increase' ? 'inline-block transform rotate-45' : ''}>{changeType === 'increase' ? '↑' : '↓'}</span>{change}
                </span>
            )}
        </div>
        <p className="text-xs text-gray-400 mt-1">Increased vs last week</p>
        <div className="flex-grow mt-4">
            {children}
        </div>
    </div>
);

const ConversionRatioItem = ({ label, percentage, color }) => (
    <div>
        <div className="flex justify-between text-xs">
            <span className="text-gray-600">{label}</span>
            <span className="font-semibold text-gray-700">{percentage}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1">
            <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${percentage}%` }} />
        </div>
    </div>
);


const ModernDashboardContent = () => (
    <div>
        {/* Header Row */}
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <span className="text-xs text-gray-500 bg-white px-3 py-1.5 rounded-lg shadow-sm">
                Last updated: Feb 28, 2024
            </span>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <KpiCard title="Total Leads" value="1,247" change="+12.5%" changeType="increase">
                <ResponsiveContainer width="100%" height={60}>
                    <LineChart data={totalLeadsData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                        <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
                         <Tooltip
                            contentStyle={{ fontSize: '12px', padding: '2px 8px' }}
                            labelStyle={{ display: 'none' }}
                            wrapperStyle={{ outline: 'none' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </KpiCard>
            
            <KpiCard title="Active Opportunities" value="89" change="+8.2%" changeType="increase">
                 <ResponsiveContainer width="100%" height={60}>
                    <BarChart data={activeOpportunitiesData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <defs>
                            <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <Bar 
                            dataKey="value" 
                            fill="url(#blueGradient)" 
                            radius={[0, 0, 0, 0]} 
                            cursor="default"
                            onMouseEnter={() => {}}
                            onMouseLeave={() => {}}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </KpiCard>
            
            <div className="bg-white rounded-xl shadow p-5 flex flex-col">
                <div className="flex items-center justify-between text-gray-500">
                    <span className="text-sm font-semibold">Conversion Ratios</span>
                     <EllipsisHorizontalIcon className="h-5 w-5 cursor-pointer" />
                </div>
                <div className="flex items-baseline space-x-2 mt-2">
                    <span className="text-3xl font-bold text-gray-800">12</span>
                    <span className="text-sm font-semibold text-green-500"><span className="inline-block transform rotate-45">↑</span>+3</span>
                    <span className="text-xs text-gray-400 ml-2">Increased vs last week</span>
                </div>
                <div className="mt-4">
                    {/* Combined Horizontal Bar */}
                    <div className="w-full h-8 bg-gray-200 rounded-lg overflow-hidden flex">
                        <div className="bg-blue-500" style={{ width: '57%' }}></div>
                        <div className="bg-blue-300" style={{ width: '22%' }}></div>
                        <div className="bg-gray-300" style={{ width: '21%' }}></div>
                    </div>
                    {/* Labels below the bar */}
                    <div className="text-xs text-gray-600 mt-2 space-y-1">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                                <span>Lead to Qualified</span>
                            </div>
                            <span>57%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-blue-300 mr-2"></div>
                                <span>Qualified to Proposal</span>
                            </div>
                            <span>22%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-gray-300 mr-2"></div>
                                <span>Proposal to Closed</span>
                            </div>
                            <span>21%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Middle Row: Revenue & Source */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            {/* Revenue Performance */}
            <div className="bg-white rounded-xl shadow p-6 lg:col-span-3">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-gray-700">Revenue Performance</h2>
                    <button className="text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg flex items-center">
                        Jan 2024 - Dec 2024 <ChevronDownIcon className="h-4 w-4 ml-1" />
                    </button>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                     <ComposedChart data={revenuePerformanceData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                        <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" tickFormatter={(value) => `$${value / 1000}K`} />
                        <Tooltip formatter={(value, name) => [name === 'totalRevenue' ? `$${value.toLocaleString()}`: `$${value.toLocaleString()}`, name === 'totalRevenue' ? 'Total Revenue' : 'Avg Deal Size' ]} />
                        <Bar dataKey="avgDealSize" barSize={400} fill="#a5b4fc" />
                        <Line type="monotone" dataKey="totalRevenue" stroke="#4f46e5" strokeWidth={3} dot={{ fill: '#4f46e5', strokeWidth: 2, r: 4 }} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
            
            {/* Source */}
            <div className="bg-white rounded-xl shadow p-6 lg:col-span-2">
                 <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-gray-700">Source</h2>
                    <button className="text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg flex items-center">
                        Weekly <ChevronDownIcon className="h-4 w-4 ml-1" />
                    </button>
                </div>
                <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-gray-800">75</span>
                     <span className="text-sm font-semibold text-green-500"><span className="inline-block transform rotate-45">↑</span>+3</span>
                     <span className="text-xs text-gray-400 ml-2">Increased vs last week</span>
                </div>
                <div className="mt-4">
                    {/* Horizontal Bar for Sources */}
                    <div className="w-full h-6 bg-gray-200 rounded-lg overflow-hidden flex mb-3 border border-gray-300">
                        {/* Alternating pattern: colored segment, transparent segment */}
                        <div className="bg-indigo-500 opacity-80" style={{ width: '3.125%' }}></div>
                        <div style={{ width: '3.125%', backgroundColor: 'transparent' }}></div>
                        <div className="bg-indigo-500 opacity-80" style={{ width: '3.125%' }}></div>
                        <div style={{ width: '3.125%', backgroundColor: 'transparent' }}></div>
                        <div className="bg-indigo-500 opacity-80" style={{ width: '3.125%' }}></div>
                        <div style={{ width: '3.125%', backgroundColor: 'transparent' }}></div>
                        <div className="bg-indigo-500 opacity-80" style={{ width: '3.125%' }}></div>
                        <div style={{ width: '3.125%', backgroundColor: 'transparent' }}></div>
                        <div className="bg-indigo-500 opacity-80" style={{ width: '3.125%' }}></div>
                        <div style={{ width: '3.125%', backgroundColor: 'transparent' }}></div>
                        <div className="bg-indigo-500 opacity-80" style={{ width: '3.125%' }}></div>
                        <div style={{ width: '3.125%', backgroundColor: 'transparent' }}></div>
                        <div className="bg-indigo-500 opacity-80" style={{ width: '3.125%' }}></div>
                        <div style={{ width: '3.125%', backgroundColor: 'transparent' }}></div>
                        <div className="bg-indigo-500 opacity-80" style={{ width: '3.125%' }}></div>
                        <div style={{ width: '3.125%', backgroundColor: 'transparent' }}></div>
                        <div className="bg-indigo-500 opacity-80" style={{ width: '3.125%' }}></div>
                        <div style={{ width: '3.125%', backgroundColor: 'transparent' }}></div>
                        <div className="bg-indigo-500 opacity-80" style={{ width: '3.125%' }}></div>
                        <div style={{ width: '3.125%', backgroundColor: 'transparent' }}></div>
                        <div className="bg-indigo-500 opacity-80" style={{ width: '3.125%' }}></div>
                        <div style={{ width: '3.125%', backgroundColor: 'transparent' }}></div>
                        <div className="bg-indigo-500 opacity-80" style={{ width: '3.125%' }}></div>
                        <div style={{ width: '3.125%', backgroundColor: 'transparent' }}></div>
                        <div className="bg-indigo-500 opacity-80" style={{ width: '3.125%' }}></div>
                        <div style={{ width: '3.125%', backgroundColor: 'transparent' }}></div>
                        <div className="bg-indigo-500 opacity-80" style={{ width: '3.125%' }}></div>
                        <div style={{ width: '3.125%', backgroundColor: 'transparent' }}></div>
                        <div className="bg-indigo-500 opacity-80" style={{ width: '3.125%' }}></div>
                        <div style={{ width: '3.125%', backgroundColor: 'transparent' }}></div>
                        <div className="bg-indigo-500 opacity-80" style={{ width: '3.125%' }}></div>
                        <div style={{ width: '3.125%', backgroundColor: 'transparent' }}></div>
                    </div>
                    {/* Source Details */}
                    <div>
                        {/* Headers */}
                        <div className="grid grid-cols-3 text-xs text-gray-500 font-semibold mb-2 px-1">
                            <span>Channel</span>
                            <span className="text-center">Metric</span>
                            <span className="text-right">Total</span>
                        </div>
                        {/* Data Rows */}
                        <div className="space-y-2">
                            <div className="grid grid-cols-3 items-center text-sm">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                                    <span className="text-gray-600">Website</span>
                                </div>
                                <span className="font-semibold text-gray-800 text-center">35</span>
                                <span className="text-xs text-green-500 font-semibold text-right">5.2%</span>
                            </div>
                            <div className="grid grid-cols-3 items-center text-sm">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-blue-300 mr-2"></div>
                                    <span className="text-gray-600">Email</span>
                                </div>
                                <span className="font-semibold text-gray-800 text-center">25</span>
                                <span className="text-xs text-red-500 font-semibold text-right">3.8%</span>
                            </div>
                            <div className="grid grid-cols-3 items-center text-sm">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-gray-300 mr-2"></div>
                                    <span className="text-gray-600">Social Media</span>
                                </div>
                                <span className="font-semibold text-gray-800 text-center">15</span>
                                <span className="text-xs text-green-500 font-semibold text-right">4.5%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-700">Leads</h2>
                <button className="text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg flex items-center">
                    Jan 2024 - Dec 2024 <ChevronDownIcon className="h-4 w-4 ml-1" />
                </button>
            </div>
            <table className="w-full mt-4 text-sm text-left">
                <thead className="text-gray-500 text-xs border-b">
                    <tr>
                        <th className="py-2 px-3 font-medium w-8"></th>
                        <th className="py-2 px-3 font-medium">Lead</th>
                        <th className="py-2 px-3 font-medium">Source</th>
                        <th className="py-2 px-3 font-medium">Status</th>
                        <th className="py-2 px-3 font-medium">Last Contact</th>
                        <th className="py-2 px-3 font-medium">Progress</th>
                        <th className="py-2 px-3 font-medium">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {leadsData.map((lead, index) => (
                        <tr key={index}>
                            <td className="py-3 px-3">
                                <input 
                                    type="checkbox" 
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                            </td>
                            <td className="py-3 px-3 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 text-xs">
                                    {lead.initials}
                                </span>
                                <span className="font-semibold text-gray-800">{lead.name}</span>
                            </td>
                            <td className="py-3 px-3 text-gray-600">{lead.source}</td>
                            <td className="py-3 px-3 text-gray-600">{lead.status}</td>
                            <td className="py-3 px-3 text-gray-600">{lead.lastContact}</td>
                            <td className="py-3 px-3">
                                <div className="flex items-center">
                                    <div className="w-24 h-1.5 bg-gray-200 rounded-full">
                                        <div 
                                            className={`h-1.5 rounded-full bg-gray-300'`} 
                                            style={{ width: `${lead.progress}%` }} 
                                        />
                                    </div>
                                    <span className="text-xs text-gray-500 ml-2">{lead.progress}%</span>
                                </div>
                            </td>
                            <td className="py-3 px-3">
                                <button className="text-blue-600 font-semibold text-xs">View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default ModernDashboardContent;

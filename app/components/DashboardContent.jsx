'use client';

import { useState } from 'react';
import {
  BellIcon,
  MoonIcon,
  ChevronDownIcon,
  Squares2X2Icon,
  BuildingStorefrontIcon,
  ClipboardDocumentCheckIcon,
  UsersIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';

// Dummy data for the charts and tables
const revenueData = [
  { name: 'Jan', income: 10000, expenses: 8000 },
  { name: 'Feb', income: 12000, expenses: 9000 },
  { name: 'Mar', income: 15000, expenses: 11000 },
  { name: 'Apr', income: 24000, expenses: 18000 },
  { name: 'May', income: 21000, expenses: 19000 },
  { name: 'Jun', income: 22000, expenses: 20000 },
  { name: 'Jul', income: 24000, expenses: 21000 },
];

const orderSummaryData = [
  { name: 'Jun 24', orders: 18, completed: 12 },
  { name: 'Jun 25', orders: 20, completed: 10 },
  { name: 'Jun 26', orders: 21, completed: 15 },
  { name: 'Jun 27', orders: 22, completed: 18 },
];

const StatCard = ({ title, value, icon, percentage, color, iconColor }) => {
  const { isDarkMode } = useTheme();
  
  return (
  <div className={`p-6 rounded-3xl shadow-sm flex-1 ${
    isDarkMode 
      ? 'bg-gray-800 border border-gray-700' 
      : color || 'bg-white'
  }`}>
    <div className="flex items-start justify-between">
      <div>
        <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{title}</h3>
        <p className={`text-2xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
      </div>
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-xl ${iconColor}`}
      >
        {icon}
      </div>
    </div>
    <div className={`w-full h-1 rounded-full mt-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
      <div
        className="h-1 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
    <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
      <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>{percentage}%</span> increase
    </p>
  </div>
  );
};

const DashboardContent = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('Monthly');
  const { isDarkMode } = useTheme();

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Menus"
          value="120"
          icon={
            <ClipboardDocumentCheckIcon className="h-6 w-6 text-gray-600" />
          }
          percentage={45}
          color="bg-white"
          iconColor="bg-gray-100"
        />
        <StatCard
          title="Total Orders Today"
          value="180"
          icon={<DocumentTextIcon className="h-6 w-6 text-white" />}
          percentage={62}
          color="bg-purple-100"
          iconColor="bg-purple-500"
        />
        <StatCard
          title="Total Client Today"
          value="240"
          icon={<UsersIcon className="h-6 w-6 text-white" />}
          percentage={80}
          color="bg-blue-100"
          iconColor="bg-blue-500"
        />
        <StatCard
          title="Revenue Day Ratio"
          value="140"
          icon={<BuildingStorefrontIcon className="h-6 w-6 text-white" />}
          percentage={85}
          color="bg-pink-100"
          iconColor="bg-pink-500"
        />
      </section>
      <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`p-6 rounded-3xl shadow-sm ${
          isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Revenue</h2>
            <div className={`flex items-center space-x-2 p-1 rounded-full text-sm ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <button
                onClick={() => setSelectedTimeframe('Monthly')}
                className={`px-3 py-1 rounded-full transition-colors ${
                  selectedTimeframe === 'Monthly'
                    ? isDarkMode 
                      ? 'bg-gray-600 shadow text-white' 
                      : 'bg-white shadow text-gray-900'
                    : isDarkMode 
                      ? 'text-gray-400 hover:text-gray-200' 
                      : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setSelectedTimeframe('Weekly')}
                className={`px-3 py-1 rounded-full transition-colors ${
                  selectedTimeframe === 'Weekly'
                    ? isDarkMode 
                      ? 'bg-gray-600 shadow text-white' 
                      : 'bg-white shadow text-gray-900'
                    : isDarkMode 
                      ? 'text-gray-400 hover:text-gray-200' 
                      : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setSelectedTimeframe('Today')}
                className={`px-3 py-1 rounded-full transition-colors ${
                  selectedTimeframe === 'Today'
                    ? isDarkMode 
                      ? 'bg-gray-600 shadow text-white' 
                      : 'bg-white shadow text-gray-900'
                    : isDarkMode 
                      ? 'text-gray-400 hover:text-gray-200' 
                      : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Today
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? '#374151' : 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  color: isDarkMode ? 'white' : 'black',
                }}
                formatter={(value) => [`$${value / 1000}k`, '']}
              />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#000"
                strokeWidth={2}
                dot={{ r: 4, fill: '#000' }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#F472B6"
                strokeDasharray="5 5"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={`p-6 rounded-3xl shadow-sm ${
          isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Order Summary</h2>
            <div className={`flex items-center space-x-2 p-1 rounded-full text-sm ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <button
                onClick={() => setSelectedTimeframe('Monthly')}
                className={`px-3 py-1 rounded-full transition-colors ${
                  selectedTimeframe === 'Monthly'
                    ? isDarkMode 
                      ? 'bg-gray-600 shadow text-white' 
                      : 'bg-white shadow text-gray-900'
                    : isDarkMode 
                      ? 'text-gray-400 hover:text-gray-200' 
                      : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setSelectedTimeframe('Weekly')}
                className={`px-3 py-1 rounded-full transition-colors ${
                  selectedTimeframe === 'Weekly'
                    ? isDarkMode 
                      ? 'bg-gray-600 shadow text-white' 
                      : 'bg-white shadow text-gray-900'
                    : isDarkMode 
                      ? 'text-gray-400 hover:text-gray-200' 
                      : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setSelectedTimeframe('Today')}
                className={`px-3 py-1 rounded-full transition-colors ${
                  selectedTimeframe === 'Today'
                    ? isDarkMode 
                      ? 'bg-gray-600 shadow text-white' 
                      : 'bg-white shadow text-gray-900'
                    : isDarkMode 
                      ? 'text-gray-400 hover:text-gray-200' 
                      : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Today
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={orderSummaryData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDarkMode ? '#374151' : 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  color: isDarkMode ? 'white' : 'black',
                }}
              />
              <Bar
                dataKey="orders"
                fill="#E5E7EB"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
              <Bar
                dataKey="completed"
                fill="#4F46E5"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </>
  );
};

export default DashboardContent;

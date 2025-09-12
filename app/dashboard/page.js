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

const orderListData = [
  {
    id: '#14235',
    date: 'Jan 25th, 2021',
    customer: 'Cahyo Nugroho',
    location: 'Lando Street 5th Yogos',
    amount: '$45.30',
    status: 'New Order',
  },
  {
    id: '#14253',
    date: 'Jan 23th, 2021',
    customer: 'Fredo Anggara',
    location: 'Corner Street 5th Lando',
    amount: '$37.30',
    status: 'On Delivery',
  },
  {
    id: '#14299',
    date: 'Jan 20th, 2021',
    customer: 'Dinda Anugrah',
    location: 'Sunset Blvd 10th Los',
    amount: '$52.10',
    status: 'Completed',
  },
];

// Reusable mobile menu component
const MobileMenu = ({ isOpen, onClose }) => {
  const menuClasses = `fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out bg-gray-900 w-64 p-4 z-50 flex flex-col justify-between text-white md:hidden`;

  return (
    <div className={menuClasses}>
      <div>
        <div className="flex justify-between items-center mb-8">
          <div className="w-10 h-10 bg-white rounded-full"></div>
          <button onClick={onClose}>
            <XMarkIcon className="h-6 w-6 text-gray-400" />
          </button>
        </div>
        <nav className="flex flex-col space-y-4">
          <a href="#" className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800 text-white">
            <Squares2X2Icon className="h-6 w-6" />
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white">
            <BuildingStorefrontIcon className="h-6 w-6" />
            <span>Menu</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white">
            <ClipboardDocumentCheckIcon className="h-6 w-6" />
            <span>Orders</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white">
            <UsersIcon className="h-6 w-6" />
            <span>Clients</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white">
            <DocumentTextIcon className="h-6 w-6" />
            <span>Reports</span>
          </a>
        </nav>
      </div>
      <div className="flex flex-col space-y-4">
        <a href="#" className="flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white">
          <Cog6ToothIcon className="h-6 w-6" />
          <span>Settings</span>
        </a>
        <a href="#" className="flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white">
          <ArrowRightOnRectangleIcon className="h-6 w-6" />
          <span>Logout</span>
        </a>
      </div>
    </div>
  );
};

// Original Sidebar for desktop
const Sidebar = () => (
  <aside className="fixed left-0 top-0 h-full w-20 bg-gray-900 shadow-lg p-4 flex-col items-center justify-between text-black font-black hidden md:flex">
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 bg-white rounded-full mb-8"></div>
      <nav className="flex flex-col space-y-4">
        <a href="#" className="p-2 rounded-lg bg-gray-800 text-white">
          <Squares2X2Icon className="h-6 w-6" />
        </a>
        <a href="#" className="p-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white">
          <BuildingStorefrontIcon className="h-6 w-6" />
        </a>
        <a href="#" className="p-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white">
          <ClipboardDocumentCheckIcon className="h-6 w-6" />
        </a>
        <a href="#" className="p-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white">
          <UsersIcon className="h-6 w-6" />
        </a>
        <a href="#" className="p-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white">
          <DocumentTextIcon className="h-6 w-6" />
        </a>
      </nav>
    </div>
    <div className="flex flex-col items-center space-y-4">
      <a href="#" className="p-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white">
        <Cog6ToothIcon className="h-6 w-6" />
      </a>
      <a href="#" className="p-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white">
        <ArrowRightOnRectangleIcon className="h-6 w-6" />
      </a>
    </div>
  </aside>
);

// Updated Header component to include a mobile menu toggle button
const Header = ({ onMenuToggle }) => (
  <header className="flex items-center justify-between p-4 md:p-6 bg-white shadow-sm rounded-xl">
    <div className="flex items-center space-x-4">
      <button onClick={onMenuToggle} className="p-2 rounded-full bg-gray-100 text-gray-600 md:hidden">
        <Bars3Icon className="h-6 w-6" />
      </button>
      <h1 className="text-xl md:text-2xl font-bold">Dashboard</h1>
    </div>
    <div className="flex items-center space-x-2 md:space-x-4">
      <button className="p-2 rounded-full bg-gray-100 text-gray-600">
        <BellIcon className="h-5 w-5" />
      </button>
      <button className="p-2 rounded-full bg-gray-100 text-gray-600">
        <MoonIcon className="h-5 w-5" />
      </button>
      <div className="hidden md:flex items-center space-x-2 bg-gray-100 p-2 pr-4 rounded-full">
        <div className="w-8 h-8 rounded-full bg-gray-400"></div>
        <span className="text-sm font-medium">Devicein</span>
        <ChevronDownIcon className="h-4 w-4 text-gray-600" />
      </div>
    </div>
  </header>
);

const StatCard = ({ title, value, icon, percentage, color, iconColor }) => (
  <div className={`p-6 rounded-3xl shadow-sm ${color} mb-4`}>
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-sm text-gray-500 font-medium">{title}</h3>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-xl ${iconColor}`}
      >
        {icon}
      </div>
    </div>
    <div className="w-full h-1 bg-gray-200 rounded-full mt-4">
      <div
        className="h-1 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
    <p className="text-sm text-gray-500 mt-2">
      <span className="font-semibold text-black">{percentage}%</span> increase
    </p>
  </div>
);

// Simplified table for mobile view
const OrderListMobile = ({ orderListData }) => (
  <div className="grid grid-cols-1 gap-4 md:hidden">
    {orderListData.map((order) => (
      <div key={order.id} className="p-4 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold text-gray-900">{order.customer}</span>
          <span
            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
              order.status === 'New Order'
                ? 'bg-blue-100 text-blue-800'
                : order.status === 'On Delivery'
                ? 'bg-purple-100 text-purple-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {order.status}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          <p>Order ID: <span className="font-medium text-gray-900">{order.id}</span></p>
          <p>Date: {order.date}</p>
          <p>Amount: <span className="font-semibold text-gray-900">{order.amount}</span></p>
          <p>Location: {order.location}</p>
        </div>
        <div className="mt-4 text-right">
          <button className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
        </div>
      </div>
    ))}
  </div>
);

// Full table for desktop view
const OrderListDesktop = ({ orderListData }) => (
  <div className="overflow-x-auto hidden md:block">
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <th className="px-4 py-3">No</th>
          <th className="px-4 py-3">ID</th>
          <th className="px-4 py-3">Date</th>
          <th className="px-4 py-3">Customer Name</th>
          <th className="px-4 py-3">Location</th>
          <th className="px-4 py-3">Amount</th>
          <th className="px-4 py-3">Status Order</th>
          <th className="px-4 py-3">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {orderListData.map((order, index) => (
          <tr key={order.id} className="hover:bg-gray-50">
            <td className="px-4 py-4 text-sm font-medium text-gray-900">{index + 1}</td>
            <td className="px-4 py-4 text-sm text-gray-500">{order.id}</td>
            <td className="px-4 py-4 text-sm text-gray-500">{order.date}</td>
            <td className="px-4 py-4 text-sm text-gray-500">{order.customer}</td>
            <td className="px-4 py-4 text-sm text-gray-500">{order.location}</td>
            <td className="px-4 py-4 text-sm text-gray-500">{order.amount}</td>
            <td className="px-4 py-4 text-sm">
              <span
                className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  order.status === 'New Order'
                    ? 'bg-blue-100 text-blue-800'
                    : order.status === 'On Delivery'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {order.status}
              </span>
            </td>
            <td className="px-4 py-4 text-sm font-medium">
              <button className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Dashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('Monthly');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-black">
      {/* Overlay to close menu when clicking outside */}
      {isMenuOpen && <div className="fixed inset-0 bg-black opacity-50 z-40 md:hidden" onClick={toggleMenu}></div>}
      
      <Sidebar />
      <MobileMenu isOpen={isMenuOpen} onClose={toggleMenu} />
      
      {/* Main content area, adjusted for mobile padding */}
      <div className="p-4 md:pl-24 md:pr-8 md:pt-8 md:pb-8">
        <Header onMenuToggle={toggleMenu} />
        <main className="mt-8">
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
            <div className="bg-white p-6 rounded-3xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Revenue</h2>
                <div className="flex items-center space-x-2 p-1 bg-gray-100 rounded-full text-sm">
                  <button
                    onClick={() => setSelectedTimeframe('Monthly')}
                    className={`px-3 py-1 rounded-full ${
                      selectedTimeframe === 'Monthly'
                        ? 'bg-white shadow'
                        : 'text-gray-500'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setSelectedTimeframe('Weekly')}
                    className={`px-3 py-1 rounded-full ${
                      selectedTimeframe === 'Weekly'
                        ? 'bg-white shadow'
                        : 'text-gray-500'
                    }`}
                  >
                    Weekly
                  </button>
                  <button
                    onClick={() => setSelectedTimeframe('Today')}
                    className={`px-3 py-1 rounded-full ${
                      selectedTimeframe === 'Today'
                        ? 'bg-white shadow'
                        : 'text-gray-500'
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
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
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
            <div className="bg-white p-6 rounded-3xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Order Summary</h2>
                <div className="flex items-center space-x-2 p-1 bg-gray-100 rounded-full text-sm">
                  <button
                    onClick={() => setSelectedTimeframe('Monthly')}
                    className={`px-3 py-1 rounded-full ${
                      selectedTimeframe === 'Monthly'
                        ? 'bg-white shadow'
                        : 'text-gray-500'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setSelectedTimeframe('Weekly')}
                    className={`px-3 py-1 rounded-full ${
                      selectedTimeframe === 'Weekly'
                        ? 'bg-white shadow'
                        : 'text-gray-500'
                    }`}
                  >
                    Weekly
                  </button>
                  <button
                    onClick={() => setSelectedTimeframe('Today')}
                    className={`px-3 py-1 rounded-full ${
                      selectedTimeframe === 'Today'
                        ? 'bg-white shadow'
                        : 'text-gray-500'
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
                  <Tooltip />
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

          <section className="mt-8 bg-white p-6 rounded-3xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Order List</h2>
              <div className="flex items-center space-x-2 p-1 bg-gray-100 rounded-full text-sm">
                <button
                  onClick={() => setSelectedTimeframe('Monthly')}
                  className={`px-3 py-1 rounded-full ${
                    selectedTimeframe === 'Monthly'
                      ? 'bg-white shadow'
                      : 'text-gray-500'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setSelectedTimeframe('Weekly')}
                  className={`px-3 py-1 rounded-full ${
                    selectedTimeframe === 'Weekly'
                      ? 'bg-white shadow'
                      : 'text-gray-500'
                  }`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setSelectedTimeframe('Today')}
                  className={`px-3 py-1 rounded-full ${
                    selectedTimeframe === 'Today'
                      ? 'bg-white shadow'
                      : 'text-gray-500'
                  }`}
                >
                  Today
                </button>
              </div>
            </div>
            <OrderListDesktop orderListData={orderListData} />
            <OrderListMobile orderListData={orderListData} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
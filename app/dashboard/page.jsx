'use client';

import { useState } from 'react';
import {
  BellIcon,
  MoonIcon,
  SunIcon,
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
  ChartBarSquareIcon
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

// Import the new content components
import DashboardContent from './../components/DashboardContent';
import AnalyticsContent from './../components/AnalyticsContent';
import OrdersContent from './../components/OrdersContent';
import ClientsContent from './../components/ClientsContent';
import ReportsContent from './../components/ReportsContent';
import { ThemeProvider, useTheme } from '../../context/ThemeContext';


const Sidebar = ({ activeView, setActiveView }) => {
  const { isDarkMode } = useTheme();
  
  return (
  <aside className={`fixed left-0 top-0 h-full w-20 shadow-lg p-4 flex-col items-center justify-between text-black font-black hidden md:flex ${
    isDarkMode ? 'bg-gray-800' : 'bg-gray-900'
  }`}>
    <div className="flex flex-col items-center">
      <div className={`w-10 h-10 rounded-full mb-8 ${isDarkMode ? 'bg-gray-600' : 'bg-white'}`}></div>
      <nav className="flex flex-col space-y-4">
        <button
          onClick={() => setActiveView('dashboard')}
          className={`p-2 rounded-lg ${activeView === 'dashboard' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
        >
          <Squares2X2Icon className="h-6 w-6" />
        </button>
        <button
          onClick={() => setActiveView('analytics')}
          className={`p-2 rounded-lg ${activeView === 'analytics' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
        >
          <ChartBarSquareIcon className="h-6 w-6" />
        </button>
        <button
          onClick={() => setActiveView('orders')}
          className={`p-2 rounded-lg ${activeView === 'orders' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
        >
          <ClipboardDocumentCheckIcon className="h-6 w-6" />
        </button>
        <button
          onClick={() => setActiveView('clients')}
          className={`p-2 rounded-lg ${activeView === 'clients' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
        >
          <UsersIcon className="h-6 w-6" />
        </button>
        <button
          onClick={() => setActiveView('reports')}
          className={`p-2 rounded-lg ${activeView === 'reports' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
        >
          <DocumentTextIcon className="h-6 w-6" />
        </button>
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
};

const MobileMenu = ({ isOpen, onClose, activeView, setActiveView }) => {
  const { isDarkMode } = useTheme();
  const menuClasses = `fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out w-64 p-4 z-50 flex flex-col justify-between text-white md:hidden ${
    isDarkMode ? 'bg-gray-800' : 'bg-gray-900'
  }`;

  return (
    <div className={menuClasses}>
      <div>
        <div className="flex justify-between items-center mb-8">
          <div className={`w-10 h-10 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-white'}`}></div>
          <button onClick={onClose}>
            <XMarkIcon className="h-6 w-6 text-gray-400" />
          </button>
        </div>
        <nav className="flex flex-col space-y-4">
          <button
            onClick={() => { setActiveView('dashboard'); onClose(); }}
            className={`flex items-center space-x-3 p-3 rounded-lg ${activeView === 'dashboard' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <Squares2X2Icon className="h-6 w-6" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => { setActiveView('analytics'); onClose(); }}
            className={`flex items-center space-x-3 p-3 rounded-lg ${activeView === 'analytics' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <ChartBarSquareIcon className="h-6 w-6" />
            <span>Analytics</span>
          </button>
          <button
            onClick={() => { setActiveView('orders'); onClose(); }}
            className={`flex items-center space-x-3 p-3 rounded-lg ${activeView === 'orders' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <ClipboardDocumentCheckIcon className="h-6 w-6" />
            <span>Orders</span>
          </button>
          <button
            onClick={() => { setActiveView('clients'); onClose(); }}
            className={`flex items-center space-x-3 p-3 rounded-lg ${activeView === 'clients' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <UsersIcon className="h-6 w-6" />
            <span>Clients</span>
          </button>
          <button
            onClick={() => { setActiveView('reports'); onClose(); }}
            className={`flex items-center space-x-3 p-3 rounded-lg ${activeView === 'reports' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <DocumentTextIcon className="h-6 w-6" />
            <span>Reports</span>
          </button>
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

const Header = ({ onMenuToggle }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
  <header className={`flex items-center justify-between p-4 md:p-6 shadow-sm rounded-xl ${
    isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
  }`}>
    <div className="flex items-center space-x-4">
      <button 
        onClick={onMenuToggle} 
        className={`p-2 rounded-full md:hidden ${
          isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
        }`}
      >
        <Bars3Icon className="h-6 w-6" />
      </button>
      <h1 className="text-xl md:text-2xl font-bold">Dashboard</h1>
    </div>
    <div className="flex items-center space-x-2 md:space-x-4">
      <button className={`p-2 rounded-full ${
        isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
      }`}>
        <BellIcon className="h-5 w-5" />
      </button>
      <button 
        onClick={toggleTheme}
        className={`p-2 rounded-full transition-colors ${
          isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
      </button>
      <div className={`hidden md:flex items-center space-x-2 p-2 pr-4 rounded-full ${
        isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
      }`}>
        <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-400'}`}></div>
        <span className="text-sm font-medium">Devicein</span>
        <ChevronDownIcon className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
      </div>
    </div>
  </header>
  );
};

const DashboardMain = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardContent />;
      case 'analytics':
        return <AnalyticsContent />;
      case 'orders':
        return <OrdersContent />;
      case 'clients':
        return <ClientsContent />;
      case 'reports':
        return <ReportsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden max-w-full transition-colors ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'
    }`}>
      {isMenuOpen && <div className="fixed inset-0 bg-black opacity-50 z-40 md:hidden" onClick={toggleMenu}></div>}
      
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <MobileMenu isOpen={isMenuOpen} onClose={toggleMenu} activeView={activeView} setActiveView={setActiveView} />
      
      <div className="p-4 md:pl-24 md:pr-8 md:pt-8 md:pb-8 max-w-full overflow-x-hidden">
        <Header onMenuToggle={toggleMenu} />
        <main className="mt-8 max-w-full overflow-x-hidden">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <ThemeProvider>
      <DashboardMain />
    </ThemeProvider>
  );
};

export default Dashboard;

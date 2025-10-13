'use client';

import React, { useState } from 'react';
import {
  BellIcon,
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
  Squares2X2Icon,
  ClipboardDocumentCheckIcon,
  UsersIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  ChartBarSquareIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import OrdersContent from '../components/OrdersContent';
import ClientsContent from '../components/ClientsContent';
import ReportsContent from '../components/ReportsContent';
import ModernDashboardContent from '../components/ModernDashboardContent';
import AnalyticsContent from '../components/AnalyticsContent';
import SimpleAIAssistant from '../components/SimpleAIAssistant';
import { ThemeProvider, useTheme } from '../../context/ThemeContext';
import { MenuBar } from '../../components/ui/bottom-menu';

// --- Liquid Glass Global Styles & SVG Filter ---
const LiquidGlassStyles = () => (
    <>
      {/* This SVG filter creates the distorted glass effect */}
      <svg style={{ display: 'none' }}>
        <filter id="liquid-glass-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.04" numOctaves="5" seed="2" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"/>
          <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="20" xChannelSelector="R" yChannelSelector="G" x="0%" y="0%" width="100%" height="100%" result="displacementMap"/>
        </filter>
      </svg>
      {/* These styles apply the background animation and the filter effect */}
      <style>{`
        .liquid-glass-bg {
          background-image: url("https://assets.codepen.io/443195/carl-raw-8Gdayy2Lhi0-unsplash.jpg");
          background-size: cover;
          animation: drift 60s ease-in-out infinite alternate;
        }

        @keyframes drift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .liquid-glass-sidebar {
          backdrop-filter: blur(10px) url(#liquid-glass-filter);
          -webkit-backdrop-filter: blur(10px) url(#liquid-glass-filter);
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </>
);


const Sidebar = ({ activeView, setActiveView }) => {
  const { isDarkMode } = useTheme();
  
  // Transformed into a top navigation bar with horizontal layout
  return (
    <nav className="w-full shadow-lg p-4 flex items-center justify-between text-white font-black bg-black/20 liquid-glass-sidebar mb-[25px] mx-5 rounded-[50px]" style={{ width: 'calc(100% - 40px)' }}>
      <div className="flex items-center space-x-6">
        <div className="w-10 h-10 rounded-full bg-white/20"></div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`p-2 rounded-lg transition-colors ${activeView === 'dashboard' ? 'bg-white/30 text-white' : 'text-gray-300 hover:bg-white/20 hover:text-white'}`}
          >
            <Squares2X2Icon className="h-6 w-6" />
          </button>
          <button
            onClick={() => setActiveView('analytics')}
            className={`p-2 rounded-lg transition-colors ${activeView === 'analytics' ? 'bg-white/30 text-white' : 'text-gray-300 hover:bg-white/20 hover:text-white'}`}
          >
            <ChartBarSquareIcon className="h-6 w-6" />
          </button>
          <button
            onClick={() => setActiveView('orders')}
            className={`p-2 rounded-lg transition-colors ${activeView === 'orders' ? 'bg-white/30 text-white' : 'text-gray-300 hover:bg-white/20 hover:text-white'}`}
          >
            <ClipboardDocumentCheckIcon className="h-6 w-6" />
          </button>
          <button
            onClick={() => setActiveView('clients')}
            className={`p-2 rounded-lg transition-colors ${activeView === 'clients' ? 'bg-white/30 text-white' : 'text-gray-300 hover:bg-white/20 hover:text-white'}`}
          >
            <UsersIcon className="h-6 w-6" />
          </button>
          <button
            onClick={() => setActiveView('reports')}
            className={`p-2 rounded-lg transition-colors ${activeView === 'reports' ? 'bg-white/30 text-white' : 'text-gray-300 hover:bg-white/20 hover:text-white'}`}
          >
            <DocumentTextIcon className="h-6 w-6" />
          </button>
          <button
            onClick={() => setActiveView('ai-assistant')}
            className={`p-2 rounded-lg transition-colors ${activeView === 'ai-assistant' ? 'bg-white/30 text-white' : 'text-gray-300 hover:bg-white/20 hover:text-white'}`}
          >
            <SparklesIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <a href="#" className="p-2 rounded-lg text-gray-300 hover:bg-white/20 hover:text-white">
          <Cog6ToothIcon className="h-6 w-6" />
        </a>
        <a href="#" className="p-2 rounded-lg text-gray-300 hover:bg-white/20 hover:text-white">
          <ArrowRightOnRectangleIcon className="h-6 w-6" />
        </a>
      </div>
    </nav>
  );
};

const MobileMenu = ({ isOpen, onClose, activeView, setActiveView }) => {
    // Applied liquid glass effect to mobile menu as well for consistency.
  const menuClasses = `fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out w-64 p-4 z-50 flex flex-col justify-between text-white md:hidden bg-black/20 liquid-glass-sidebar`;

  return (
    <div className={menuClasses}>
      <div>
        <div className="flex justify-between items-center mb-8">
          <div className="w-10 h-10 rounded-full bg-white/20"></div>
          <button onClick={onClose}>
            <XMarkIcon className="h-6 w-6 text-gray-300" />
          </button>
        </div>
        <nav className="flex flex-col space-y-2">
          {[
            { view: 'dashboard', icon: Squares2X2Icon, label: 'Dashboard' },
            { view: 'analytics', icon: ChartBarSquareIcon, label: 'Analytics' },
            { view: 'orders', icon: ClipboardDocumentCheckIcon, label: 'Orders' },
            { view: 'clients', icon: UsersIcon, label: 'Clients' },
            { view: 'reports', icon: DocumentTextIcon, label: 'Reports' },
            { view: 'ai-assistant', icon: SparklesIcon, label: 'AI Assistant' },
          ].map(({ view, icon: Icon, label }) => (
            <button
              key={view}
              onClick={() => { setActiveView(view); onClose(); }}
              className={`flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${activeView === view ? 'bg-white/30 text-white' : 'text-gray-300 hover:bg-white/20 hover:text-white'}`}
            >
              <Icon className="h-6 w-6" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="flex flex-col space-y-2">
        <a href="#" className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-white/20 hover:text-white">
          <Cog6ToothIcon className="h-6 w-6" />
          <span>Settings</span>
        </a>
        <a href="#" className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-white/20 hover:text-white">
          <ArrowRightOnRectangleIcon className="h-6 w-6" />
          <span>Logout</span>
        </a>
      </div>
    </div>
  );
};

// Header is not directly used in the final layout to better showcase the effect, but kept for completeness
const Header = ({ onMenuToggle }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <header className={`flex items-center justify-between p-4 md:p-6 shadow-sm rounded-xl ${
      isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    }`}>
      {/* Header content from original code */}
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

  const menuItems = [
    {
      icon: (props) => <Squares2X2Icon {...props} />,
      label: "Dashboard",
      view: "dashboard"
    },
    {
      icon: (props) => <ChartBarSquareIcon {...props} />,
      label: "Analytics",
      view: "analytics"
    },
    {
      icon: (props) => <ClipboardDocumentCheckIcon {...props} />,
      label: "Orders",
      view: "orders"
    },
    {
      icon: (props) => <UsersIcon {...props} />,
      label: "Clients",
      view: "clients"
    },
    {
      icon: (props) => <DocumentTextIcon {...props} />,
      label: "Reports",
      view: "reports"
    },
    {
      icon: (props) => <SparklesIcon {...props} />,
      label: "AI Assistant",
      view: "ai-assistant"
    },
    {
      icon: (props) => <Cog6ToothIcon {...props} />,
      label: "Settings",
      view: "settings"
    }
  ];

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <ModernDashboardContent />;
      case 'analytics': return <AnalyticsContent />;
      case 'orders': return <OrdersContent />;
      case 'clients': return <ClientsContent />;
      case 'reports': return <ReportsContent />;
      case 'ai-assistant': return <SimpleAIAssistant />;
      default: return <ModernDashboardContent />;
    }
  };

  return (
    // The animated background is now on this main div
    <div className={`min-h-screen font-sans overflow-x-hidden max-w-full liquid-glass-bg`}>
      <LiquidGlassStyles />
      {isMenuOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={toggleMenu}></div>}
      
      <MobileMenu isOpen={isMenuOpen} onClose={toggleMenu} activeView={activeView} setActiveView={setActiveView} />
      
      <div className="pt-5">
        {/* Mobile Header - only shows on mobile */}
        <div className="p-4 md:hidden flex justify-between items-center mx-5 mb-[25px]">
          <h1 className="text-xl font-bold text-white">Dashboard</h1>
          <button 
            onClick={toggleMenu} 
            className="p-2 rounded-full text-white bg-black/20"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
        
        {/* Top Navigation - hidden on mobile */}
        <div className="hidden md:block">
          <Sidebar activeView={activeView} setActiveView={setActiveView} />
        </div>
        
        <main className="px-5 pb-24">
          {renderView()}
        </main>
        
        {/* Bottom Menu Bar */}
        <div className="fixed bottom-6 left-0 right-0 flex items-center justify-center p-6 z-50">
          <MenuBar 
            items={menuItems} 
            activeView={activeView}
            onViewChange={setActiveView}
          />
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => (
  <ThemeProvider>
    <DashboardMain />
  </ThemeProvider>
);

export default Dashboard;

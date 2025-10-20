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
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import OrdersContent from '../components/OrdersContent';
import ClientsContent from '../components/ClientsContent';
import ReportsContent from '../components/ReportsContent';
import ModernDashboardContent from '../components/ModernDashboardContent';
import AnalyticsContent from '../components/AnalyticsContent';
import SimpleAIAssistant from '../components/SimpleAIAssistant';
// Theme removed: defaulting to light theme
import PricingWithChart from '../components/PricingWithChart';
import { MenuBar } from '../../components/ui/bottom-menu';
import MinimalChatBox from '../../components/ui/minimal-chat-box';

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
          background-color: white;
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

        /*
          Remove the black focus outline that appears when clicking chart SVGs or other elements.
          Keep keyboard accessibility by preserving :focus-visible styles; only hide outlines
          for non-keyboard (mouse/touch) focus: :focus:not(:focus-visible).
        */
        button:focus:not(:focus-visible),
        a:focus:not(:focus-visible),
        svg:focus:not(:focus-visible),
        .recharts-wrapper :focus:not(:focus-visible),
        .recharts-surface :focus:not(:focus-visible),
        .recharts-layer :focus:not(:focus-visible) {
          outline: none !important;
          box-shadow: none !important;
        }

        /* Some chart elements render <g> or <path> - target them too when focused via mouse */
        .recharts-wrapper g:focus:not(:focus-visible),
        .recharts-wrapper path:focus:not(:focus-visible),
        .recharts-wrapper circle:focus:not(:focus-visible) {
          outline: none !important;
          box-shadow: none !important;
        }
      `}</style>
    </>
);


const Sidebar = ({ activeView, setActiveView }) => {
  // Transformed into a top navigation bar with horizontal layout (light theme)
  return (
    <nav className="w-full shadow-lg p-4 flex items-center justify-between text-gray-900 font-black bg-white/60 liquid-glass-sidebar mb-[25px] mx-5 rounded-[50px]" style={{ width: 'calc(100% - 40px)' }}>
      <div className="flex items-center space-x-6">
        <div className="w-10 h-10 rounded-full bg-white/40 border border-gray-200"></div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`p-2 rounded-lg transition-colors ${activeView === 'dashboard' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <Squares2X2Icon className="h-6 w-6" />
          </button>
          <button
            onClick={() => setActiveView('analytics')}
            className={`p-2 rounded-lg transition-colors ${activeView === 'analytics' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <ChartBarSquareIcon className="h-6 w-6" />
          </button>
          <button
            onClick={() => setActiveView('orders')}
            className={`p-2 rounded-lg transition-colors ${activeView === 'orders' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <ClipboardDocumentCheckIcon className="h-6 w-6" />
          </button>
          <button
            onClick={() => setActiveView('clients')}
            className={`p-2 rounded-lg transition-colors ${activeView === 'clients' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <UsersIcon className="h-6 w-6" />
          </button>
          <button
            onClick={() => setActiveView('reports')}
            className={`p-2 rounded-lg transition-colors ${activeView === 'reports' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <DocumentTextIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <a href="#" className="p-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900">
          <Cog6ToothIcon className="h-6 w-6" />
        </a>
        <a href="#" className="p-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900">
          <ArrowRightOnRectangleIcon className="h-6 w-6" />
        </a>
      </div>
    </nav>
  );
};

const MobileMenu = ({ isOpen, onClose, activeView, setActiveView }) => {
    // Applied liquid glass effect to mobile menu as well for consistency (light)
  const menuClasses = `fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out w-64 p-4 z-50 flex flex-col justify-between text-gray-900 md:hidden bg-white/60 liquid-glass-sidebar`;

  return (
    <div className={menuClasses}>
      <div>
        <div className="flex justify-between items-center mb-8">
          <div className="w-10 h-10 rounded-full bg-white/40 border border-gray-200"></div>
          <button onClick={onClose}>
            <XMarkIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <nav className="flex flex-col space-y-2">
          {[
            { view: 'dashboard', icon: Squares2X2Icon, label: 'Dashboard' },
            { view: 'analytics', icon: ChartBarSquareIcon, label: 'Analytics' },
            { view: 'orders', icon: ClipboardDocumentCheckIcon, label: 'Orders' },
            { view: 'clients', icon: UsersIcon, label: 'Clients' },
            { view: 'reports', icon: DocumentTextIcon, label: 'Reports' },
          ].map(({ view, icon: Icon, label }) => (
            <button
              key={view}
              onClick={() => { setActiveView(view); onClose(); }}
              className={`flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${activeView === view ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <Icon className="h-6 w-6" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="flex flex-col space-y-2">
          <a href="#" className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900">
            <Cog6ToothIcon className="h-6 w-6" />
            <span>Settings</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900">
            <ArrowRightOnRectangleIcon className="h-6 w-6" />
            <span>Logout</span>
          </a>
      </div>
    </div>
  );
};

// Header is not directly used in the final layout to better showcase the effect, but kept for completeness
const Header = ({ onMenuToggle }) => {
  return (
    <header className={`flex items-center justify-between p-4 md:p-6 shadow-sm rounded-xl bg-white text-gray-900`}>
      {/* Header content from original code */}
    </header>
  );
};

const DashboardMain = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      icon: (props) => <CurrencyDollarIcon {...props} />,
      label: "Pricing",
      view: "pricing"
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
      case 'pricing': return <PricingWithChart />;
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
        {/* Mobile Header - hamburger on top-left to open side menu */}
        <div className="p-4 md:hidden flex items-center mx-5 mb-[25px]">
          <button 
            onClick={toggleMenu} 
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="p-2 rounded-full text-gray-900 bg-white/60 mr-4 border border-gray-200"
          >
            {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        </div>
        
        {/* Top Navigation removed on desktop - we rely on bottom MenuBar for desktop */}
        <div className="hidden md:block">
          {/* Intentionally left blank: desktop uses the bottom MenuBar instead of the top Sidebar */}
        </div>
        
        <main className="px-5 pb-24">
          {renderView()}
        </main>
        
        {/* Bottom Menu Bar - visible on md and larger only */}
        <div className="hidden md:flex fixed bottom-6 left-0 right-0 items-center justify-center p-6 z-40">
          <MenuBar 
            items={menuItems} 
            activeView={activeView}
            onViewChange={setActiveView}
          />
        </div>
        
        {/* Minimal Chat Box */}
        <MinimalChatBox />
      </div>
    </div>
  );
};

export default DashboardMain;

'use client';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useTheme } from '../../context/ThemeContext';

const dummyAnalyticsData = [
  { name: 'Week 1', sales: 4000, clients: 2400 },
  { name: 'Week 2', sales: 3000, clients: 1398 },
  { name: 'Week 3', sales: 2000, clients: 9800 },
  { name: 'Week 4', sales: 2780, clients: 3908 },
  { name: 'Week 5', sales: 1890, clients: 4800 },
  { name: 'Week 6', sales: 2390, clients: 3800 },
  { name: 'Week 7', sales: 3490, clients: 4300 },
];

const AnalyticsContent = () => {
  const { isDarkMode } = useTheme();
  
  return (
  <div className={`p-6 rounded-3xl shadow-sm ${
    isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50'
  }`}>
    <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Sales & Client Analytics</h2>
    <div className="flex flex-col md:flex-row gap-6">
      <div className={`p-6 rounded-3xl shadow-sm w-full ${
        isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-white'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Weekly Performance</h3>
        <div className={`flex items-center space-x-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <span className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-indigo-600 mr-1"></span> Sales
          </span>
          <span className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-gray-400 mr-1"></span> Clients
          </span>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dummyAnalyticsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
            <Bar dataKey="sales" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            <Bar dataKey="clients" fill="#9CA3AF" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
  );
};

export default AnalyticsContent;

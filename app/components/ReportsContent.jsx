'use client';
import { DocumentTextIcon, ChartPieIcon, ArrowUpOnSquareIcon, UsersIcon } from '@heroicons/react/24/outline';

const reportCards = [
  {
    title: 'Revenue Report',
    description: 'Detailed monthly revenue and expense summary.',
    icon: <DocumentTextIcon className="h-6 w-6 text-blue-500" />,
    buttonText: 'View Report',
  },
  {
    title: 'Sales Performance',
    description: 'Quarterly sales analysis by product and region.',
    icon: <ChartPieIcon className="h-6 w-6 text-green-500" />,
    buttonText: 'View Report',
  },
  {
    title: 'Client Growth',
    description: 'Annual report on new client acquisition and retention.',
    icon: <UsersIcon className="h-6 w-6 text-purple-500" />,
    buttonText: 'View Report',
  },
];

const StatCard = ({ title, value, icon, color, iconColor }) => {
  return (
  <div className={`p-6 rounded-3xl shadow-sm flex-1 ${color || 'bg-white'}`}>
    <div className="flex items-start justify-between">
      <div>
        <h3 className={`text-sm font-medium text-gray-500`}>{title}</h3>
        <p className={`text-2xl font-bold mt-1 text-gray-900`}>{value}</p>
      </div>
      <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${iconColor}`}>
        {icon}
      </div>
    </div>
  </div>
  );
};

const ReportsContent = () => {
  // Default to light theme
  return (
  <div className="mt-8">
    <h2 className={`text-xl font-bold mb-6 text-gray-800`}>Reports</h2>
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Reports Generated"
        value="52"
        icon={<ArrowUpOnSquareIcon className="h-6 w-6 text-white" />}
        color="bg-blue-100"
        iconColor="bg-blue-500"
      />
      <StatCard
        title="Most Viewed"
        value="Revenue Report"
        icon={<ChartPieIcon className="h-6 w-6 text-white" />}
        color="bg-green-100"
        iconColor="bg-green-500"
      />
    </section>
    <div className={`rounded-3xl shadow-sm bg-white`}>
      <h3 className={`text-lg font-semibold mb-4 text-gray-800`}>Report Library</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportCards.map((card, index) => (
          <div key={index} className={`flex flex-col p-6 rounded-2xl bg-gray-100`}>
            <div className="flex items-center space-x-4 mb-4">
              {card.icon}
              <h4 className={`text-lg font-semibold text-gray-800`}>{card.title}</h4>
            </div>
            <p className={`text-sm mb-4 text-gray-500`}>{card.description}</p>
            <button className={`self-start px-4 py-2 mt-auto rounded-full text-sm font-medium shadow transition-colors bg-white text-gray-800 hover:bg-gray-200`}>
              {card.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default ReportsContent;

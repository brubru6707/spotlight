'use client';
import { Cog6ToothIcon, UserCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const settingsSections = [
  {
    title: 'Profile Settings',
    description: 'Update your personal information and account details.',
    icon: <UserCircleIcon className="h-6 w-6 text-blue-500" />,
    buttonText: 'Edit Profile',
  },
  {
    title: 'Security',
    description: 'Manage your password, login sessions, and two-factor authentication.',
    icon: <ShieldCheckIcon className="h-6 w-6 text-green-500" />,
    buttonText: 'Security Settings',
  },
  {
    title: 'Notifications',
    description: 'Configure your notification preferences for new orders and reports.',
    icon: <BellIcon className="h-6 w-6 text-purple-500" />,
    buttonText: 'Manage Notifications',
  },
];

const SettingsContent = () => (
  <div className="mt-8">
    <h2 className="text-xl font-bold mb-6 text-gray-800">Settings</h2>
    <div className="bg-white p-6 rounded-3xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Account Settings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsSections.map((section, index) => (
          <div key={index} className="flex flex-col bg-gray-100 p-6 rounded-2xl">
            <div className="flex items-center space-x-4 mb-4">
              {section.icon}
              <h4 className="text-lg font-semibold text-gray-800">{section.title}</h4>
            </div>
            <p className="text-sm text-gray-500 mb-4">{section.description}</p>
            <button className="self-start px-4 py-2 mt-auto rounded-full text-sm font-medium bg-white text-gray-800 shadow hover:bg-gray-200 transition-colors">
              {section.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default SettingsContent;

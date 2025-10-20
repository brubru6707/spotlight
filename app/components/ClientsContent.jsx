'use client';
import { UsersIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

// Dummy data for the clients list
const clientListData = [
  {
    id: 'C-001',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    status: 'Active',
    joined: 'Feb 10, 2023',
    orders: 12,
  },
  {
    id: 'C-002',
    name: 'John Smith',
    email: 'john.smith@example.com',
    status: 'Active',
    joined: 'Jan 15, 2023',
    orders: 8,
  },
  {
    id: 'C-003',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    status: 'Inactive',
    joined: 'Mar 01, 2023',
    orders: 3,
  },
  {
    id: 'C-004',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    status: 'Active',
    joined: 'Feb 20, 2023',
    orders: 25,
  },
];

const StatCard = ({ title, value, icon, color, iconColor }) => {
  return (
  <div className={`p-6 rounded-3xl shadow-sm flex-1`}>
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

// Simplified table for mobile view
const ClientListMobile = ({ clientListData }) => {
  
  return (
  <div className="grid grid-cols-1 gap-4 md:hidden">
    {clientListData.map((client) => (
      <div key={client.id} className={`p-4 rounded-xl shadow-sm border bg-white border-gray-200`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-lg font-semibold`}>{client.name}</span>
          <span
            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
              client.status === 'Active'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {client.status}
          </span>
        </div>
        <div className={`text-sm text-gray-500`}>
          <p>Client ID: <span className={`font-medium text-gray-900`}>{client.id}</span></p>
          <p>Orders: {client.orders}</p>
          <p>Joined: {client.joined}</p>
          <p>Email: {client.email}</p>
        </div>
      </div>
    ))}
  </div>
  );
};

// Full table for desktop view
const ClientListDesktop = ({ clientListData }) => {
  return (
  <div className={`rounded-xl overflow-hidden shadow-sm border hidden md:block bg-white border-gray-200`}>
    <div className="overflow-x-auto">
      <table className={`min-w-full divide-y divide-gray-200`}>
        <thead className={'bg-gray-50'}>
          <tr className={`text-left text-xs font-medium uppercase tracking-wider`}>
            <th className="px-4 py-3">Client ID</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Joined Date</th>
            <th className="px-4 py-3">Total Orders</th>
          </tr>
        </thead>
        <tbody className={`divide-y bg-white divide-gray-200`}>
          {clientListData.map((client) => (
            <tr key={client.id} className={`transition-colors hover:bg-gray-50`}>
              <td className={`px-4 py-4 text-sm font-medium text-gray-900`}>{client.id}</td>
              <td className={`px-4 py-4 text-sm text-gray-500`}>{client.name}</td>
              <td className={`px-4 py-4 text-sm text-gray-500`}>{client.email}</td>
              <td className="px-4 py-4 text-sm">
                <span
                  className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    client.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {client.status}
                </span>
              </td>
              <td className={`px-4 py-4 text-sm text-gray-500`}>{client.joined}</td>
              <td className={`px-4 py-4 text-sm text-gray-500`}>{client.orders}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

const ClientsContent = () => {
  
  return (
  <div className="mt-8">
    <h2 className={`text-xl font-bold mb-6 text-gray-800`}>Clients</h2>
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <StatCard
        title="Total Clients"
        value="240"
        icon={<UsersIcon className="h-6 w-6 text-white" />}
        color="bg-blue-100"
        iconColor="bg-blue-500"
      />
      <StatCard
        title="Active Clients"
        value="180"
        icon={<CheckCircleIcon className="h-6 w-6 text-white" />}
        color="bg-green-100"
        iconColor="bg-green-500"
      />
    </section>
    <div className={`p-6 rounded-3xl shadow-sm bg-white`}>
      <h3 className={`text-lg font-semibold mb-4 text-gray-800`}>Client List</h3>
      <ClientListDesktop clientListData={clientListData} />
      <ClientListMobile clientListData={clientListData} />
    </div>
  </div>
  );
};

export default ClientsContent;

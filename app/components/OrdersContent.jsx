'use client';
import {
  ClipboardDocumentCheckIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
// Theme removed: defaulting to light theme

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

const StatCard = ({ title, value, icon, percentage, color, iconColor }) => {
  return (
  <div className={`p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm mb-4 w-full ${color || 'bg-white'}`}>
    <div className="flex items-start justify-between">
      <div className="flex-1">
  <h3 className={`text-xs md:text-sm font-medium text-gray-500`}>{title}</h3>
  <p className={`text-xl md:text-2xl font-bold mt-1 text-gray-900`}>{value}</p>
      </div>
      <div
        className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg md:rounded-xl ${iconColor} flex-shrink-0`}
      >
        {icon}
      </div>
    </div>
    <div className={`w-full h-1 rounded-full mt-3 md:mt-4 bg-gray-200`}>
      <div
        className="h-1 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
    <p className={`text-xs md:text-sm mt-2 text-gray-500`}>
      <span className={`font-semibold text-gray-900`}>{percentage}%</span> increase
    </p>
  </div>
  );
};

const OrderListMobile = ({ orderListData }) => {
  
  return (
  <div className="grid grid-cols-1 gap-3 md:hidden">
    {orderListData.map((order) => (
      <div key={order.id} className={`p-4 rounded-xl shadow-sm border bg-white border-gray-200`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 pr-2">
            <span className={`text-base font-semibold block text-gray-900`}>{order.customer}</span>
            <span className={`text-sm text-gray-500`}>{order.id}</span>
          </div>
          <span
            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full flex-shrink-0 ${
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
        <div className={`space-y-1 text-sm text-gray-500`}>
          <div className="flex justify-between">
            <span>Date:</span>
            <span className={`font-medium text-gray-900`}>{order.date}</span>
          </div>
          <div className="flex justify-between">
            <span>Amount:</span>
            <span className={`font-semibold text-gray-900`}>{order.amount}</span>
          </div>
          <div className="pt-1">
            <span className="text-xs">Location:</span>
            <p className={`text-xs mt-1 break-words text-gray-600`}>{order.location}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button className={`p-2 rounded-lg transition-colors text-gray-500 hover:text-gray-700 hover:bg-gray-100`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
        </div>
      </div>
    ))}
  </div>
  );
};

const OrderListDesktop = ({ orderListData }) => {

  return (
  <div className={`rounded-xl overflow-hidden shadow-sm border hidden md:block bg-white border-gray-200`}>
    <div className="overflow-x-auto">
      <table className={`min-w-full divide-y divide-gray-200`}>
        <thead className={'bg-gray-50'}>
          <tr className={`text-left text-xs font-medium uppercase tracking-wider text-gray-500`}>
            <th className="px-3 lg:px-4 py-3">No</th>
            <th className="px-3 lg:px-4 py-3">ID</th>
            <th className="px-3 lg:px-4 py-3">Date</th>
            <th className="px-3 lg:px-4 py-3">Customer Name</th>
            <th className="px-3 lg:px-4 py-3">Location</th>
            <th className="px-3 lg:px-4 py-3">Amount</th>
            <th className="px-3 lg:px-4 py-3">Status Order</th>
            <th className="px-3 lg:px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody className={`divide-y bg-white divide-gray-200`}>
          {orderListData.map((order, index) => (
            <tr key={order.id} className={`transition-colors hover:bg-gray-50`}>
              <td className={`px-3 lg:px-4 py-4 text-sm font-medium text-gray-900`}>{index + 1}</td>
              <td className={`px-3 lg:px-4 py-4 text-sm text-gray-500`}>{order.id}</td>
              <td className={`px-3 lg:px-4 py-4 text-sm whitespace-nowrap text-gray-500`}>{order.date}</td>
              <td className={`px-3 lg:px-4 py-4 text-sm font-semibold text-gray-900`}>{order.customer}</td>
              <td className={`px-3 lg:px-4 py-4 text-sm max-w-32 lg:max-w-xs truncate text-gray-500`}>{order.location}</td>
              <td className={`px-3 lg:px-4 py-4 text-sm font-semibold text-gray-900`}>{order.amount}</td>
              <td className="px-3 lg:px-4 py-4 text-sm">
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
              </td>
              <td className="px-3 lg:px-4 py-4 text-sm font-medium">
                <button className={`p-2 rounded-lg transition-colors text-gray-500 hover:text-gray-700 hover:bg-gray-100`}>
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
  </div>
  );
};

const OrdersContent = () => {
  return (
    <div className={`mt-8 p-6 rounded-3xl shadow-sm`}>
      <h2 className={`text-xl font-bold mb-6 text-gray-800`}>Order List</h2>
      <div className="flex items-center justify-between mb-6">
        <StatCard
          title="Total Orders"
          value="180"
          icon={<DocumentTextIcon className="h-6 w-6 text-white" />}
          percentage={62}
          color="bg-purple-100"
          iconColor="bg-purple-500"
        />
        <StatCard
          title="Completed Orders"
          value="140"
          icon={<ClipboardDocumentCheckIcon className="h-6 w-6 text-white" />}
          percentage={85}
          color="bg-pink-100"
          iconColor="bg-pink-500"
        />
      </div>
      <OrderListDesktop orderListData={orderListData} />
      <OrderListMobile orderListData={orderListData} />
    </div>
  );
};

export default OrdersContent;

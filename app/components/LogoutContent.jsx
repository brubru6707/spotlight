'use client';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const LogoutContent = () => {
  return (
    <div className="mt-8 flex items-center justify-center p-6 bg-white rounded-3xl shadow-sm min-h-[300px]">
      <div className="flex flex-col items-center space-y-4">
        <ArrowRightOnRectangleIcon className="h-16 w-16 text-gray-400" />
        <h2 className="text-2xl font-bold text-gray-800">You have been logged out.</h2>
        <p className="text-gray-500">Thank you for using our dashboard. You can close this page now.</p>
      </div>
    </div>
  );
};

export default LogoutContent;

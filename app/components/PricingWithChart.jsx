'use client';

import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function InterestChart() {
  const chartData = [
    { month: 'Jan', interest: 120 },
    { month: 'Feb', interest: 180 },
    { month: 'Mar', interest: 150 },
    { month: 'Apr', interest: 210 },
    { month: 'May', interest: 250 },
    { month: 'Jun', interest: 300 },
    { month: 'Jul', interest: 280 },
    { month: 'Aug', interest: 320 },
    { month: 'Sep', interest: 340 },
    { month: 'Oct', interest: 390 },
    { month: 'Nov', interest: 420 },
    { month: 'Dec', interest: 500 },
  ];

  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ left: 0, right: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: 'none',
              borderRadius: 8,
              boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
            }}
          />
          <Line type="monotone" dataKey="interest" stroke="#6D28D9" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function PricingWithChart() {
  return (
    <div className="mt-8 p-6 rounded-3xl shadow-sm bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Pricing that scales with you</h2>
          <p className="text-sm text-gray-600 mt-2">Choose the right plan to unlock powerful tools and insights.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6 bg-white shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Free</h3>
              <div className="mt-4">
                <span className="text-3xl font-bold text-purple-600">$0</span>
                <p className="text-sm text-gray-500 mt-2">Best for testing and evaluation</p>
              </div>

              <ul className="mt-6 space-y-2 text-sm text-gray-600">
                {['Basic Analytics Dashboard', '5GB Cloud Storage', 'Email & Chat Support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircleIcon className="h-4 w-4 text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <a className="block text-center px-4 py-2 border rounded-lg text-purple-600 border-purple-200 hover:bg-purple-50" href="#">Get Started</a>
            </div>
          </div>

          <div className="md:col-span-2 bg-white border rounded-lg p-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">Pro Monthly</h3>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-purple-600">$299</span>
                  <p className="text-sm text-gray-500 mt-2">Perfect for small businesses & startups</p>
                </div>

                <div className="mt-6">
                  <div className="bg-gray-50 rounded-lg p-3 border">
                    <InterestChart />
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/3">
                <div className="text-sm font-medium text-gray-700">Everything in Free plus:</div>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  {[
                    'Unlimited access to all tools',
                    'Priority customer support',
                    'Advanced analytics dashboard',
                    'Team collaboration included',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircleIcon className="h-4 w-4 text-purple-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 grid grid-cols-2 gap-2">
                  <a className="block text-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700" href="#">Get Started</a>
                  <a className="block text-center px-3 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-center" href="#">Start free trial</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

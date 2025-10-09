'use client';

import React, { useState } from 'react';
import { DocumentTextIcon, ShieldCheckIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function LegalPage() {
  const [selectedDoc, setSelectedDoc] = useState(null);

  const documents = [
    {
      id: 'terms',
      title: 'Terms & Conditions',
      description: 'Read our terms of service and user agreement',
      icon: DocumentTextIcon,
      pdfUrl: 'https://firebasestorage.googleapis.com/v0/b/spotlight-wag5yx.firebasestorage.app/o/legal%2FSpotlight%20T%26C%20Final%20Draft.pdf?alt=media',
      size: '308.15 KB',
      lastModified: 'Oct 8, 2025'
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      description: 'Learn how we protect and manage your data',
      icon: ShieldCheckIcon,
      pdfUrl: 'https://firebasestorage.googleapis.com/v0/b/spotlight-wag5yx.firebasestorage.app/o/legal%2FSpotlight&apos;s%20Privacy%20Policy.pdf?alt=media',
      size: '186.51 KB',
      lastModified: 'Oct 8, 2025'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Legal Center</h1>
              <p className="mt-1 text-sm text-gray-600">Terms, Policies & Agreements</p>
            </div>
            <Link 
              href="/" 
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!selectedDoc ? (
          /* Document Selection View */
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Choose a Document</h2>
              <p className="text-gray-600">Select a document below to view or download</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {documents.map((doc) => {
                const IconComponent = doc.icon;
                return (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc)}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-400 overflow-hidden group"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                          <IconComponent className="h-8 w-8 text-blue-600" />
                        </div>
                        <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{doc.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{doc.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                        <span>Size: {doc.size}</span>
                        <span>Updated: {doc.lastModified}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Additional Info Section */}
            <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Need Help?</h3>
              <p className="text-sm text-gray-700 mb-4">
                If you have any questions about our terms or policies, please don't hesitate to contact us.
              </p>
              <a 
                href="mailto:legal@spotlight.com" 
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Contact Legal Team
                <ChevronRightIcon className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        ) : (
          /* PDF Viewer View */
          <div className="max-w-7xl mx-auto">
            {/* Document Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="mb-4 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  <ChevronRightIcon className="h-4 w-4 mr-1 rotate-180" />
                  Back to documents
                </button>
                <h2 className="text-2xl font-bold text-gray-900">{selectedDoc.title}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Last updated: {selectedDoc.lastModified} • {selectedDoc.size}
                </p>
              </div>
              <a
                href={selectedDoc.pdfUrl}
                download
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                Download PDF
              </a>
            </div>

            {/* PDF Viewer */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <iframe
                src={selectedDoc.pdfUrl}
                className="w-full h-[800px]"
                title={selectedDoc.title}
              />
            </div>

            {/* Alternative Download Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-3">
                Having trouble viewing the document?
              </p>
              <a
                href={selectedDoc.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Open in new tab
                <ChevronRightIcon className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>&copy; 2025 Spotlight. All rights reserved.</p>
            <p className="mt-2">
              These documents are legally binding. Please read them carefully.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

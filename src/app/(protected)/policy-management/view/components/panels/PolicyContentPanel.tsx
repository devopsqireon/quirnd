// File: /app/policy-management/view/components/panels/PolicyContentPanel.tsx

'use client'

import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  DocumentDuplicateIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  PrinterIcon
} from '@heroicons/react/24/outline';

interface PolicyContentPanelProps {
  content: string;
}

export function PolicyContentPanel({ content }: PolicyContentPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fontSize, setFontSize] = useState('text-base');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // Implement search functionality
  };

  const handleCopyContent = async () => {
    try {
      // Strip HTML tags for plain text copy
      const textContent = content.replace(/<[^>]*>/g, '');
      await navigator.clipboard.writeText(textContent);
      // Show success message
    } catch (error) {
      console.error('Failed to copy content:', error);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Policy Content</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; }
            h1, h2, h3, h4, h5, h6 { color: #1f2937; margin-top: 1.5em; margin-bottom: 0.5em; }
            p { margin-bottom: 1em; }
            ul, ol { margin-bottom: 1em; padding-left: 2em; }
            li { margin-bottom: 0.5em; }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const containerClasses = isFullscreen
    ? 'fixed inset-0 z-50 bg-white'
    : 'relative';

  return (
    <div className={containerClasses}>
      {/* Content Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Policy Content</h3>
        
        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Font Size Controls */}
          <div className="flex items-center space-x-1">
            <span className="text-sm text-gray-500">Font:</span>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="text-sm">Small</option>
              <option value="text-base">Normal</option>
              <option value="text-lg">Large</option>
              <option value="text-xl">Extra Large</option>
            </select>
          </div>

          {/* Action Buttons */}
          <button
            onClick={handleCopyContent}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            title="Copy content"
          >
            <DocumentDuplicateIcon className="h-4 w-4" />
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            title="Print content"
          >
            <PrinterIcon className="h-4 w-4" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? (
              <ArrowsPointingInIcon className="h-4 w-4" />
            ) : (
              <ArrowsPointingOutIcon className="h-4 w-4" />
            )}
          </button>

          {isFullscreen && (
            <button
              onClick={toggleFullscreen}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* Content Display */}
      <div className={`${isFullscreen ? 'h-full overflow-auto p-6' : ''}`}>
        <div 
          className={`prose prose-gray max-w-none ${fontSize} ${isFullscreen ? 'max-h-full' : 'max-h-96 overflow-y-auto'}`}
          style={{
            // Custom prose styles
            lineHeight: '1.7',
          }}
        >
          {/* Table of Contents (auto-generated from headings) */}
          <div className="mb-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-900 mb-3">Table of Contents</h4>
            <ul className="text-sm space-y-1">
              <li><a href="#section-1" className="text-blue-600 hover:text-blue-800">1. Purpose</a></li>
              <li><a href="#section-2" className="text-blue-600 hover:text-blue-800">2. Scope</a></li>
              <li><a href="#section-3" className="text-blue-600 hover:text-blue-800">3. Policy Statements</a></li>
              <li><a href="#section-4" className="text-blue-600 hover:text-blue-800">4. Procedures</a></li>
              <li><a href="#section-5" className="text-blue-600 hover:text-blue-800">5. Compliance</a></li>
            </ul>
          </div>

          {/* Actual Content */}
          <div 
            dangerouslySetInnerHTML={{ __html: content }}
            className="policy-content"
          />

          {/* Reading Progress Indicator */}
          {!isFullscreen && (
            <div className="mt-6 flex items-center text-sm text-gray-500">
              <span>Estimated reading time: 5-7 minutes</span>
            </div>
          )}
        </div>

        {/* Content Navigation (for fullscreen) */}
        {isFullscreen && (
          <div className="fixed right-6 top-1/2 transform -translate-y-1/2">
            <div className="bg-white shadow-lg rounded-lg p-4 border">
              <h5 className="text-sm font-semibold text-gray-900 mb-2">Jump to Section</h5>
              <nav className="space-y-1">
                <a href="#section-1" className="block text-sm text-blue-600 hover:text-blue-800">Purpose</a>
                <a href="#section-2" className="block text-sm text-blue-600 hover:text-blue-800">Scope</a>
                <a href="#section-3" className="block text-sm text-blue-600 hover:text-blue-800">Policy Statements</a>
                <a href="#section-4" className="block text-sm text-blue-600 hover:text-blue-800">Procedures</a>
                <a href="#section-5" className="block text-sm text-blue-600 hover:text-blue-800">Compliance</a>
              </nav>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .policy-content h1 {
          @apply text-2xl font-bold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200;
        }
        .policy-content h2 {
          @apply text-xl font-semibold text-gray-800 mt-6 mb-3;
        }
        .policy-content h3 {
          @apply text-lg font-medium text-gray-700 mt-4 mb-2;
        }
        .policy-content p {
          @apply text-gray-600 mb-4 leading-relaxed;
        }
        .policy-content ul {
          @apply list-disc list-inside mb-4 text-gray-600 space-y-2;
        }
        .policy-content ol {
          @apply list-decimal list-inside mb-4 text-gray-600 space-y-2;
        }
        .policy-content li {
          @apply leading-relaxed;
        }
        .policy-content blockquote {
          @apply border-l-4 border-blue-200 pl-4 py-2 bg-blue-50 text-blue-800 italic mb-4;
        }
        .policy-content code {
          @apply bg-gray-100 px-1 py-0.5 rounded text-sm font-mono;
        }
        .policy-content table {
          @apply w-full border-collapse border border-gray-300 mb-4;
        }
        .policy-content th {
          @apply bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium text-gray-900;
        }
        .policy-content td {
          @apply border border-gray-300 px-4 py-2 text-gray-600;
        }
      `}</style>
    </div>
  );
}
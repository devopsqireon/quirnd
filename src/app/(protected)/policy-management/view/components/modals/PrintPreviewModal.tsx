// File: /app/policy-management/view/components/modals/PrintPreviewModal.tsx

'use client'

import React, { useState } from 'react';
import { XMarkIcon, PrinterIcon } from '@heroicons/react/24/outline';
import { PolicyViewData, PrintOptions } from '../../types/policy-view.types';

interface PrintPreviewModalProps {
  policy: PolicyViewData;
  onClose: () => void;
}

export function PrintPreviewModal({ policy, onClose }: PrintPreviewModalProps) {
  const [printOptions, setPrintOptions] = useState<PrintOptions>({
    includeAttachments: true,
    includeComments: false,
    includeHistory: true,
    format: 'pdf',
    headerFooter: true,
    pageNumbers: true
  });

  const handlePrint = () => {
    // Generate print content based on options
    const printContent = generatePrintContent();
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const generatePrintContent = () => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${policy.title}</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; margin: 40px; }
            .header { border-bottom: 2px solid #e5e7eb; padding-bottom: 20px; margin-bottom: 30px; }
            .title { font-size: 24px; font-weight: bold; color: #111827; margin-bottom: 10px; }
            .metadata { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
            .metadata-item { margin-bottom: 10px; }
            .metadata-label { font-weight: 600; color: #374151; }
            .metadata-value { color: #6b7280; }
            .content { margin: 30px 0; }
            .content h2 { font-size: 18px; font-weight: 600; margin-top: 30px; margin-bottom: 15px; }
            .content p { margin-bottom: 15px; }
            .attachments { margin-top: 30px; page-break-before: always; }
            .history { margin-top: 30px; page-break-before: always; }
            @media print {
              .no-print { display: none; }
              body { margin: 0; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="title">${policy.title}</h1>
            <div class="metadata">
              <div>
                <div class="metadata-item">
                  <span class="metadata-label">Version:</span>
                  <span class="metadata-value">${policy.version}</span>
                </div>
                <div class="metadata-item">
                  <span class="metadata-label">Status:</span>
                  <span class="metadata-value">${policy.status}</span>
                </div>
                <div class="metadata-item">
                  <span class="metadata-label">Owner:</span>
                  <span class="metadata-value">${policy.owner}</span>
                </div>
              </div>
              <div>
                <div class="metadata-item">
                  <span class="metadata-label">Effective Date:</span>
                  <span class="metadata-value">${new Date(policy.effectiveDate).toLocaleDateString()}</span>
                </div>
                <div class="metadata-item">
                  <span class="metadata-label">Review Date:</span>
                  <span class="metadata-value">${new Date(policy.reviewDate).toLocaleDateString()}</span>
                </div>
                <div class="metadata-item">
                  <span class="metadata-label">Category:</span>
                  <span class="metadata-value">${policy.category}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="content">
            ${policy.content}
          </div>

          ${printOptions.includeAttachments ? `
            <div class="attachments">
              <h2>Attachments</h2>
              ${policy.attachments.map(att => `
                <div style="margin-bottom: 10px;">
                  <strong>${att.name}</strong> (${att.size})
                  <br>
                  <small>Uploaded by ${att.uploadedBy} on ${new Date(att.uploadDate).toLocaleDateString()}</small>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${printOptions.includeHistory ? `
            <div class="history">
              <h2>Version History</h2>
              ${policy.versionHistory.map(version => `
                <div style="margin-bottom: 15px; padding: 10px; border-left: 3px solid #e5e7eb;">
                  <strong>Version ${version.version}</strong> - ${version.type}
                  <br>
                  <small>By ${version.author} on ${new Date(version.date).toLocaleDateString()}</small>
                  <br>
                  <em>${version.changes}</em>
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          ${printOptions.headerFooter ? `
            <div style="position: fixed; bottom: 20px; right: 20px; font-size: 12px; color: #9ca3af;">
              Generated on ${new Date().toLocaleString()}
            </div>
          ` : ''}
        </body>
      </html>
    `;
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <PrinterIcon className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Print Policy</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Print Options */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">Print Options</h4>
            <div className="space-y-4">
              {/* Include Sections */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Include Sections</p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={printOptions.includeAttachments}
                      onChange={(e) => setPrintOptions({ ...printOptions, includeAttachments: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Attachments list</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={printOptions.includeHistory}
                      onChange={(e) => setPrintOptions({ ...printOptions, includeHistory: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Version history</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={printOptions.includeComments}
                      onChange={(e) => setPrintOptions({ ...printOptions, includeComments: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Comments</span>
                  </label>
                </div>
              </div>

              {/* Format Options */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Format Options</p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={printOptions.headerFooter}
                      onChange={(e) => setPrintOptions({ ...printOptions, headerFooter: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Include header and footer</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={printOptions.pageNumbers}
                      onChange={(e) => setPrintOptions({ ...printOptions, pageNumbers: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Page numbers</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Print Summary</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Policy: {policy.title}</p>
              <p>Version: {policy.version}</p>
              <p>Pages: Estimated 3-5 pages</p>
              <p>Includes: Content{printOptions.includeAttachments ? ', Attachments' : ''}{printOptions.includeHistory ? ', History' : ''}{printOptions.includeComments ? ', Comments' : ''}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PrinterIcon className="h-4 w-4 mr-2" />
              Print Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// /app/risk/treatment-plan/[id]/components/views/DocumentsView.tsx
'use client';

import React, { useState } from 'react';
import { 
  UploadIcon, 
  FileTextIcon, 
  DownloadIcon, 
  EyeIcon, 
  MoreVerticalIcon,
  SearchIcon
} from 'lucide-react';
import { useTreatmentDetails } from '../../contexts/TreatmentDetailsContext';

export const DocumentsView: React.FC = () => {
  const { treatmentDetails, uploadDocument } = useTreatmentDetails();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  if (!treatmentDetails) return null;

  const { documents } = treatmentDetails;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    return <FileTextIcon className="w-5 h-5 text-blue-600" />;
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || doc.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await uploadDocument(file, 'Other');
      } catch (error) {
        console.error('Failed to upload file:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Documents</h2>
          <p className="text-gray-600 text-sm">Manage files and documentation related to this treatment plan</p>
        </div>
        <label className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer">
          <UploadIcon className="w-4 h-4 mr-2" />
          Upload Document
          <input type="file" className="hidden" onChange={handleFileUpload} />
        </label>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="all">All Types</option>
            <option value="Policy">Policy</option>
            <option value="Procedure">Procedure</option>
            <option value="Evidence">Evidence</option>
            <option value="Report">Report</option>
            <option value="Other">Other</option>
          </select>

          <div className="text-sm text-gray-600">
            {filteredDocuments.length} of {documents.length} documents
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.map((document) => (
          <div key={document.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getFileIcon(document.type)}
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{document.name}</h3>
                    <p className="text-xs text-gray-600">{document.type}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVerticalIcon className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-xs text-gray-600">
                  Size: {formatFileSize(document.size)}
                </div>
                <div className="text-xs text-gray-600">
                  Version: {document.version}
                </div>
                <div className="text-xs text-gray-600">
                  Uploaded: {new Date(document.uploadedDate).toLocaleDateString()}
                </div>
                <div className="text-xs text-gray-600">
                  By: {document.uploadedBy}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <a
                  href={document.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-600 hover:text-blue-700"
                >
                  <EyeIcon className="w-3 h-3 mr-1" />
                  View
                </a>
                <a
                  href={document.url}
                  download
                  className="inline-flex items-center px-3 py-1 text-xs font-medium text-gray-600 hover:text-gray-700"
                >
                  <DownloadIcon className="w-3 h-3 mr-1" />
                  Download
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <FileTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
          <p className="text-gray-600">
            {searchTerm || filterType !== 'all'
              ? 'Try adjusting your filters to see more results.'
              : 'Upload your first document to get started.'}
          </p>
        </div>
      )}
    </div>
  );
};
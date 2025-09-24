// File: /app/policy-management/view/components/panels/PolicyAttachmentsPanel.tsx

'use client'

import React, { useState } from 'react';
import {
  DocumentIcon,
  DocumentTextIcon,
  PhotoIcon,
  FilmIcon,
  ArchiveBoxIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  TrashIcon,
  PlusIcon,
  FolderIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import { PolicyAttachment } from '../../types/policy-view.types';

interface PolicyAttachmentsPanelProps {
  attachments: PolicyAttachment[];
}

export function PolicyAttachmentsPanel({ attachments }: PolicyAttachmentsPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size' | 'type'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedAttachments, setSelectedAttachments] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) {
      return <DocumentIcon className="h-8 w-8 text-red-500" />;
    } else if (type.includes('image')) {
      return <PhotoIcon className="h-8 w-8 text-blue-500" />;
    } else if (type.includes('video')) {
      return <FilmIcon className="h-8 w-8 text-purple-500" />;
    } else if (type.includes('spreadsheet') || type.includes('excel')) {
      return <DocumentIcon className="h-8 w-8 text-green-500" />;
    } else if (type.includes('zip') || type.includes('archive')) {
      return <ArchiveBoxIcon className="h-8 w-8 text-yellow-500" />;
    } else {
      return <DocumentTextIcon className="h-8 w-8 text-gray-500" />;
    }
  };

  const formatFileSize = (size: string) => {
    // Assuming size comes as string like "2.1 MB"
    return size;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredAttachments = attachments.filter(attachment =>
    attachment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedAttachments = [...filteredAttachments].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'date':
        comparison = new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
        break;
      case 'size':
        // Simple size comparison (assuming MB format)
        const aSize = parseFloat(a.size.split(' ')[0]);
        const bSize = parseFloat(b.size.split(' ')[0]);
        comparison = aSize - bSize;
        break;
      case 'type':
        comparison = a.type.localeCompare(b.type);
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const handleSelectAttachment = (id: string) => {
    setSelectedAttachments(prev => 
      prev.includes(id) 
        ? prev.filter(attachmentId => attachmentId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedAttachments.length === sortedAttachments.length) {
      setSelectedAttachments([]);
    } else {
      setSelectedAttachments(sortedAttachments.map(att => att.id));
    }
  };

  const handleDownloadSelected = () => {
    selectedAttachments.forEach(id => {
      const attachment = attachments.find(att => att.id === id);
      if (attachment) {
        // Trigger download
        console.log(`Downloading: ${attachment.name}`);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">
          Attachments ({attachments.length})
        </h3>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Attachment
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between space-x-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search attachments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        </div>

        {/* Sort and View Controls */}
        <div className="flex items-center space-x-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
            <option value="size">Sort by Size</option>
            <option value="type">Sort by Type</option>
          </select>

          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-md"
            title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
          >
            <AdjustmentsHorizontalIcon className="h-4 w-4" />
          </button>

          <div className="flex rounded-md shadow-sm">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 text-sm font-medium rounded-l-md border ${
                viewMode === 'list' 
                  ? 'bg-blue-50 border-blue-200 text-blue-700' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 text-sm font-medium rounded-r-md border-l-0 border ${
                viewMode === 'grid' 
                  ? 'bg-blue-50 border-blue-200 text-blue-700' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Grid
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedAttachments.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-800">
              {selectedAttachments.length} attachment{selectedAttachments.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleDownloadSelected}
                className="inline-flex items-center px-3 py-1.5 border border-blue-300 text-sm font-medium rounded text-blue-700 bg-white hover:bg-blue-50"
              >
                <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                Download Selected
              </button>
              <button
                onClick={() => setSelectedAttachments([])}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Attachments List/Grid */}
      {sortedAttachments.length === 0 ? (
        <div className="text-center py-12">
          <FolderIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No attachments found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding an attachment.'}
          </p>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
          {viewMode === 'list' && (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedAttachments.length === sortedAttachments.length && sortedAttachments.length > 0}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</span>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {sortedAttachments.map((attachment) => (
                  <div key={attachment.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={selectedAttachments.includes(attachment.id)}
                          onChange={() => handleSelectAttachment(attachment.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        {getFileIcon(attachment.type)}
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {attachment.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatFileSize(attachment.size)} • 
                            Uploaded by {attachment.uploadedBy} on {formatDate(attachment.uploadDate)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Preview"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Download"
                        >
                          <ArrowDownTrayIcon className="h-4 w-4" />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Remove"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {viewMode === 'grid' && sortedAttachments.map((attachment) => (
            <div key={attachment.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <input
                  type="checkbox"
                  checked={selectedAttachments.includes(attachment.id)}
                  onChange={() => handleSelectAttachment(attachment.id)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div className="flex items-center space-x-1">
                  <button className="p-1 text-gray-400 hover:text-blue-600">
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-blue-600">
                    <ArrowDownTrayIcon className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600">
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="text-center mb-3">
                {getFileIcon(attachment.type)}
              </div>
              
              <h4 className="text-sm font-medium text-gray-900 truncate mb-1">
                {attachment.name}
              </h4>
              <p className="text-xs text-gray-500 mb-2">
                {formatFileSize(attachment.size)}
              </p>
              <p className="text-xs text-gray-400">
                {attachment.uploadedBy} • {formatDate(attachment.uploadDate)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
// /app/(protected)/audit-monitoring/components/tabs/EvidenceLibraryTab.tsx
"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Eye, 
  ExternalLink, 
  Edit, 
  FileText, 
  File,
  Shield,
  Database,
  Clock,
  Grid3X3,
  List,
  Trash2,
  Download,
  Tag,
  Calendar,
  User,
  HardDrive
} from 'lucide-react';
import { toast } from 'sonner';

import { mockEvidence, mockDashboardMetrics } from '../../data/mock-data';
import { filterEvidence, formatFileSize, formatDate } from '../../utils';
import type { Evidence, EvidenceFilters } from '../../types';

import {
  SearchBar,
  FilterPanel,
  ExportDropdown,
  DataTable,
  Pagination,
  BulkActions,
  StatusBadge,
  EmptyState,
  DEFAULT_EVIDENCE_ACTIONS,
  type Column
} from '../shared';

export const EvidenceLibraryTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Filter options with counts
  const filterOptions = [
    // Evidence Type filters
    { key: 'type', label: 'Document', value: 'document', count: mockEvidence.filter(e => e.type === 'document').length },
    { key: 'type', label: 'Certificate', value: 'certificate', count: mockEvidence.filter(e => e.type === 'certificate').length },
    { key: 'type', label: 'Report', value: 'report', count: mockEvidence.filter(e => e.type === 'report').length },
    { key: 'type', label: 'Procedure', value: 'procedure', count: mockEvidence.filter(e => e.type === 'procedure').length },
    { key: 'type', label: 'Policy', value: 'policy', count: mockEvidence.filter(e => e.type === 'policy').length },
    { key: 'type', label: 'Screenshot', value: 'screenshot', count: mockEvidence.filter(e => e.type === 'screenshot').length },
    { key: 'type', label: 'Video', value: 'video', count: mockEvidence.filter(e => e.type === 'video').length },
    { key: 'type', label: 'Other', value: 'other', count: mockEvidence.filter(e => e.type === 'other').length },
    
    // Status filters
    { key: 'status', label: 'Verified', value: 'verified', count: mockEvidence.filter(e => e.status === 'verified').length },
    { key: 'status', label: 'Pending Review', value: 'pending', count: mockEvidence.filter(e => e.status === 'pending').length },
    { key: 'status', label: 'Rejected', value: 'rejected', count: mockEvidence.filter(e => e.status === 'rejected').length },
    { key: 'status', label: 'Archived', value: 'archived', count: mockEvidence.filter(e => e.status === 'archived').length },

    // Category filters
    { key: 'category', label: 'Compliance Certification', value: 'Compliance Certification', count: mockEvidence.filter(e => e.category === 'Compliance Certification').length },
    { key: 'category', label: 'Security Assessment', value: 'Security Assessment', count: mockEvidence.filter(e => e.category === 'Security Assessment').length },
    { key: 'category', label: 'Training Records', value: 'Training Records', count: mockEvidence.filter(e => e.category === 'Training Records').length },
    { key: 'category', label: 'Business Continuity', value: 'Business Continuity', count: mockEvidence.filter(e => e.category === 'Business Continuity').length },
    { key: 'category', label: 'Incident Management', value: 'Incident Management', count: mockEvidence.filter(e => e.category === 'Incident Management').length }
  ];

  // Filtered and paginated data
  const filteredEvidence = useMemo(() => {
    const evidenceFilters: EvidenceFilters = {
      type: filters.type,
      status: filters.status,
      category: filters.category
    };
    return filterEvidence(mockEvidence, evidenceFilters, searchTerm);
  }, [searchTerm, filters]);

  const paginatedEvidence = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredEvidence.slice(startIndex, startIndex + pageSize);
  }, [filteredEvidence, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredEvidence.length / pageSize);

  // Table columns configuration
  const columns: Column<Evidence>[] = [
    {
      key: 'name',
      header: 'Evidence Name',
      sortable: true,
      width: '300px',
      render: (evidence) => (
        <div className="max-w-xs">
          <div className="font-medium text-slate-900 truncate mb-1">
            {evidence.name}
          </div>
          <div className="text-sm text-slate-500 line-clamp-2">
            {evidence.description}
          </div>
          {evidence.version && (
            <Badge variant="outline" className="mt-1 text-xs">
              v{evidence.version}
            </Badge>
          )}
        </div>
      )
    },
    {
      key: 'type',
      header: 'Type',
      render: (_, value) => (
        <StatusBadge status={value} type="status" />
      )
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
      render: (_, value) => (
        <div className="text-sm max-w-32 truncate">{value}</div>
      )
    },
    {
      key: 'uploadDate',
      header: 'Upload Date',
      sortable: true,
      render: (_, value) => (
        <div className="text-sm flex items-center gap-1">
          <Calendar className="w-3 h-3 text-slate-400" />
          {formatDate(value)}
        </div>
      )
    },
    {
      key: 'uploadedBy',
      header: 'Uploaded By',
      render: (_, value) => (
        <div className="text-sm flex items-center gap-1">
          <User className="w-3 h-3 text-slate-400" />
          <span className="truncate max-w-24">{value.split('@')[0]}</span>
        </div>
      )
    },
    {
      key: 'fileSize',
      header: 'File Size',
      render: (_, value) => (
        <div className="text-sm flex items-center gap-1">
          <HardDrive className="w-3 h-3 text-slate-400" />
          {formatFileSize(value)}
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (_, value) => (
        <StatusBadge status={value} type="status" />
      )
    },
    {
      key: 'linkedAudits',
      header: 'Linked Audits',
      render: (_, value) => (
        <div className="text-center">
          <div className="text-sm font-medium text-slate-900">
            {value.length}
          </div>
          <div className="text-xs text-slate-500">
            audit{value.length !== 1 ? 's' : ''}
          </div>
        </div>
      )
    },
    {
      key: 'tags',
      header: 'Tags',
      render: (evidence) => (
        <div className="max-w-32">
          {evidence.tags.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {evidence.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {evidence.tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{evidence.tags.length - 2}
                </Badge>
              )}
            </div>
          ) : (
            <span className="text-xs text-slate-400">No tags</span>
          )}
        </div>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (evidence) => (
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => handleViewDetails(evidence)}
            className="h-8 w-8 p-0"
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => handleDownload(evidence)}
            className="h-8 w-8 p-0"
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => handleEdit(evidence)}
            className="h-8 w-8 p-0"
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  // Event handlers
  const handleUpload = () => {
    toast.success('Upload Modal Opening', {
      description: 'Evidence upload functionality would open here'
    });
  };

  const handleExport = (format: string) => {
    toast.success('Export Started', {
      description: `Exporting evidence library as ${format.toUpperCase()}`
    });
    
    // Simulate export process
    setTimeout(() => {
      toast.success('Export Completed', {
        description: `Evidence library exported successfully as ${format.toUpperCase()}`
      });
    }, 2000);
  };

  const handleViewDetails = (evidence: Evidence) => {
    toast.info('Evidence Details', {
      description: `Viewing details for: ${evidence.name}`
    });
  };

  const handleDownload = (evidence: Evidence) => {
    toast.success('Download Started', {
      description: `Downloading: ${evidence.name}`
    });
    
    // Simulate download process
    setTimeout(() => {
      toast.success('Download Completed', {
        description: `${evidence.name} downloaded successfully`
      });
    }, 1000);
  };

  const handleEdit = (evidence: Evidence) => {
    toast.info('Edit Evidence', {
      description: `Opening editor for: ${evidence.name}`
    });
  };

  const handleSelectionChange = (evidence: Evidence[]) => {
    setSelectedEvidence(evidence);
  };

  const handleClearSelection = () => {
    setSelectedEvidence([]);
  };

  const handleBulkAction = (action: string, selectedIds: string[]) => {
    switch (action) {
      case 'export':
        toast.success('Bulk Export', {
          description: `Exporting ${selectedIds.length} evidence items`
        });
        break;
      case 'verify':
        toast.success('Bulk Verification', {
          description: `Marking ${selectedIds.length} items as verified`
        });
        break;
      case 'tag':
        toast.info('Bulk Tagging', {
          description: 'Tag management modal would open here'
        });
        break;
      case 'delete':
        toast.warning('Bulk Delete', {
          description: `Deleting ${selectedIds.length} evidence items`
        });
        break;
      default:
        console.log(`Bulk action: ${action} on items:`, selectedIds);
    }
  };

  // Enhanced bulk actions with custom handlers
  const enhancedBulkActions = DEFAULT_EVIDENCE_ACTIONS.map(action => ({
    ...action,
    onClick: (selectedIds: string[]) => handleBulkAction(action.key, selectedIds)
  }));

  // Quick stats for dashboard
  const stats = [
    {
      title: 'Total Evidence',
      value: mockDashboardMetrics.totalEvidence,
      icon: <File className="w-5 h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Verified',
      value: mockDashboardMetrics.verifiedEvidence,
      icon: <Shield className="w-5 h-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Pending Review',
      value: mockDashboardMetrics.pendingEvidence,
      icon: <Clock className="w-5 h-5" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Storage Used',
      value: formatFileSize(mockEvidence.reduce((acc, e) => acc + e.fileSize, 0)),
      icon: <Database className="w-5 h-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  // Custom empty state for evidence
  const emptyState = (
    <EmptyState
      title="No evidence found"
      description={
        searchTerm || Object.keys(filters).length > 0
          ? "No evidence items match your current search and filter criteria. Try adjusting your filters or search terms."
          : "No evidence has been uploaded yet. Start by uploading your first piece of compliance evidence."
      }
      icon={<File className="w-12 h-12" />}
      action={{
        label: "Upload Evidence",
        onClick: handleUpload
      }}
    />
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Evidence Library</h2>
          <p className="text-slate-600 mt-1">
            Manage compliance evidence and documentation with secure storage and tracking
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleUpload} className="bg-blue-600 hover:bg-blue-700">
            <Upload className="w-4 h-4 mr-2" />
            Upload Evidence
          </Button>
          <ExportDropdown onExport={handleExport} />
        </div>
      </div>

      {/* Quick Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <div className={stat.color}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and View Controls */}
      <div className="flex items-center justify-between gap-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search evidence by name, category, tags, or description..."
          className="flex-1"
        />
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600 mr-2">View:</span>
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
            className="px-3"
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="px-3"
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      <FilterPanel
        filters={filterOptions}
        activeFilters={filters}
        onFilterChange={setFilters}
      />

      {/* Results Summary */}
      {(searchTerm || Object.keys(filters).length > 0) && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-800">
                Showing {filteredEvidence.length} of {mockEvidence.length} evidence items
              </span>
            </div>
            {(searchTerm || Object.keys(filters).length > 0) && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setSearchTerm('');
                  setFilters({});
                }}
                className="text-blue-700 hover:text-blue-900"
              >
                Clear all filters
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Bulk Actions Bar */}
      <BulkActions
        selectedCount={selectedEvidence.length}
        selectedIds={selectedEvidence.map(e => e.id)}
        actions={enhancedBulkActions}
        onClearSelection={handleClearSelection}
      />

      {/* Evidence Display - Table or Grid View */}
      {viewMode === 'table' ? (
        <Card>
          <CardContent className="p-0">
            <DataTable
              data={paginatedEvidence}
              columns={columns}
              onSelectionChange={handleSelectionChange}
              selectable
              emptyState={emptyState}
              className="min-h-[400px]"
            />
          </CardContent>
        </Card>
      ) : (
        <div className="min-h-[400px]">
          {paginatedEvidence.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedEvidence.map((evidence) => (
                <Card 
                  key={evidence.id} 
                  className="hover:shadow-lg transition-all duration-200 cursor-pointer group"
                  onClick={() => handleViewDetails(evidence)}
                >
                  <CardContent className="p-5">
                    {/* Header with Type Icon and Status */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-blue-100 transition-colors">
                          <FileText className="w-6 h-6 text-slate-600 group-hover:text-blue-600" />
                        </div>
                        <div>
                          <StatusBadge status={evidence.type} type="status" />
                          {evidence.version && (
                            <Badge variant="outline" className="ml-1 text-xs">
                              v{evidence.version}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <StatusBadge status={evidence.status} type="status" />
                    </div>

                    {/* Evidence Name and Description */}
                    <div className="mb-4">
                      <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-900 transition-colors">
                        {evidence.name}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-3">
                        {evidence.description}
                      </p>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-2 mb-4 text-xs text-slate-500">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{evidence.category}</span>
                        <span>{formatFileSize(evidence.fileSize)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Uploaded: {formatDate(evidence.uploadDate)}</span>
                        <span>{evidence.linkedAudits.length} audit{evidence.linkedAudits.length !== 1 ? 's' : ''}</span>
                      </div>
                      {evidence.approvedBy && (
                        <div className="text-green-600 flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          <span>Approved by {evidence.approvedBy.split('@')[0]}</span>
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="mb-4">
                      {evidence.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {evidence.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              <Tag className="w-2 h-2 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                          {evidence.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{evidence.tags.length - 3} more
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">No tags assigned</span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(evidence);
                          }}
                          className="h-8 px-2"
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(evidence);
                          }}
                          className="h-8 px-2"
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(evidence);
                          }}
                          className="h-8 px-2"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      {/* Retention indicator */}
                      <div className="text-xs text-slate-400">
                        Expires: {formatDate(evidence.retention)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            emptyState
          )}
        </div>
      )}

      {/* Pagination */}
      {filteredEvidence.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={filteredEvidence.length}
              onPageChange={setCurrentPage}
              onPageSizeChange={(newPageSize) => {
                setPageSize(newPageSize);
                setCurrentPage(1); // Reset to first page when changing page size
              }}
              pageSizeOptions={[12, 20, 50, 100]}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

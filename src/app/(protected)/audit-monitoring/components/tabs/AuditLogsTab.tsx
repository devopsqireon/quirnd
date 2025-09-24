// /app/(protected)/audit-monitoring/components/tabs/AuditLogsTab.tsx
"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, AlertTriangle, CheckCircle, Clock, Activity } from 'lucide-react';
import { toast } from 'sonner';

import { mockAuditLogs, mockDashboardMetrics } from '../../data/mock-data';
import { filterAuditLogs, formatDateTime } from '../../utils';
import type { AuditLog, AuditLogFilters } from '../../types';

import {
  SearchBar,
  FilterPanel,
  ExportDropdown,
  DataTable,
  Pagination,
  BulkActions,
  StatusBadge,
  EmptyState,
  DEFAULT_AUDIT_LOG_ACTIONS,
  type Column
} from '../shared';

export const AuditLogsTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [selectedLogs, setSelectedLogs] = useState<AuditLog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // Filter options
  const filterOptions = [
    { key: 'category', label: 'Access', value: 'access', count: mockAuditLogs.filter(l => l.category === 'access').length },
    { key: 'category', label: 'Security', value: 'security', count: mockAuditLogs.filter(l => l.category === 'security').length },
    { key: 'category', label: 'Modification', value: 'modification', count: mockAuditLogs.filter(l => l.category === 'modification').length },
    { key: 'category', label: 'System', value: 'system', count: mockAuditLogs.filter(l => l.category === 'system').length },
    { key: 'severity', label: 'Critical', value: 'critical', count: mockAuditLogs.filter(l => l.severity === 'critical').length },
    { key: 'severity', label: 'High', value: 'high', count: mockAuditLogs.filter(l => l.severity === 'high').length },
    { key: 'severity', label: 'Medium', value: 'medium', count: mockAuditLogs.filter(l => l.severity === 'medium').length },
    { key: 'severity', label: 'Low', value: 'low', count: mockAuditLogs.filter(l => l.severity === 'low').length },
    { key: 'status', label: 'Success', value: 'success', count: mockAuditLogs.filter(l => l.status === 'success').length },
    { key: 'status', label: 'Failed', value: 'failed', count: mockAuditLogs.filter(l => l.status === 'failed').length },
    { key: 'status', label: 'Warning', value: 'warning', count: mockAuditLogs.filter(l => l.status === 'warning').length }
  ];

  // Filtered and paginated data
  const filteredLogs = useMemo(() => {
    const auditFilters: AuditLogFilters = {
      category: filters.category,
      severity: filters.severity,
      status: filters.status
    };
    return filterAuditLogs(mockAuditLogs, auditFilters, searchTerm);
  }, [searchTerm, filters]);

  const paginatedLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredLogs.slice(startIndex, startIndex + pageSize);
  }, [filteredLogs, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredLogs.length / pageSize);

  // Table columns
  const columns: Column<AuditLog>[] = [
    {
      key: 'timestamp',
      header: 'Timestamp',
      sortable: true,
      render: (_, value) => (
        <div className="text-sm">
          <div className="font-medium">{formatDateTime(value)}</div>
        </div>
      )
    },
    {
      key: 'user',
      header: 'User',
      sortable: true,
      render: (_, value) => (
        <div className="text-sm font-medium">{value}</div>
      )
    },
    {
      key: 'action',
      header: 'Action',
      sortable: true,
      render: (_, value) => (
        <div className="text-sm">{value}</div>
      )
    },
    {
      key: 'resource',
      header: 'Resource',
      sortable: true,
      render: (_, value) => (
        <div className="text-sm truncate max-w-48">{value}</div>
      )
    },
    {
      key: 'category',
      header: 'Category',
      render: (_, value) => (
        <StatusBadge status={value} type="status" />
      )
    },
    {
      key: 'severity',
      header: 'Severity',
      render: (_, value) => (
        <StatusBadge status={value} type="severity" />
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
      key: 'actions',
      header: 'Actions',
      render: (log) => (
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => handleViewDetails(log)}
        >
          <Eye className="w-4 h-4" />
        </Button>
      )
    }
  ];

  // Event handlers
  const handleExport = (format: string) => {
    toast.success('Export started', {
      description: `Exporting audit logs as ${format.toUpperCase()}`
    });
  };

  const handleViewDetails = (log: AuditLog) => {
    toast.info('Log Details', {
      description: `Viewing details for log: ${log.action}`
    });
  };

  const handleSelectionChange = (logs: AuditLog[]) => {
    setSelectedLogs(logs);
  };

  const handleClearSelection = () => {
    setSelectedLogs([]);
  };

  // Quick stats
  const stats = [
    {
      title: 'Total Logs',
      value: mockDashboardMetrics.totalAuditLogs,
      icon: <Activity className="w-5 h-5" />,
      color: 'text-blue-600'
    },
    {
      title: 'Critical Events',
      value: mockDashboardMetrics.criticalLogs,
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'text-red-600'
    },
    {
      title: 'Failed Actions',
      value: mockDashboardMetrics.failedActions,
      icon: <Clock className="w-5 h-5" />,
      color: 'text-orange-600'
    },
    {
      title: 'Success Rate',
      value: `${Math.round(((mockDashboardMetrics.totalAuditLogs - mockDashboardMetrics.failedActions) / mockDashboardMetrics.totalAuditLogs) * 100)}%`,
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'text-green-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Audit Logs</h2>
          <p className="text-slate-600">Track all system activities and user actions</p>
        </div>
        <ExportDropdown onExport={handleExport} />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <div className={stat.color}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search logs by action, user, or resource..."
          className="flex-1"
        />
      </div>

      <FilterPanel
        filters={filterOptions}
        activeFilters={filters}
        onFilterChange={setFilters}
      />

      {/* Bulk Actions */}
      <BulkActions
        selectedCount={selectedLogs.length}
        selectedIds={selectedLogs.map(log => log.id)}
        actions={DEFAULT_AUDIT_LOG_ACTIONS}
        onClearSelection={handleClearSelection}
      />

      {/* Logs Table */}
      <DataTable
        data={paginatedLogs}
        columns={columns}
        onSelectionChange={handleSelectionChange}
        selectable
        emptyState={
          <EmptyState
            title="No audit logs found"
            description="No audit logs match your current search and filter criteria."
          />
        }
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={filteredLogs.length}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
};
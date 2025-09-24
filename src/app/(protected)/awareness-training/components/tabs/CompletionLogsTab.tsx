// /app/awareness-training/components/tabs/CompletionLogsTab.tsx
import React from 'react';
import { Download, Filter, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCompletionLogs, useModal, useToast } from '../../utils/hooks';
import { 
  SearchBar, 
  FilterDropdown, 
  ActionButtons,
  EmptyState, 
  LoadingSpinner,
  DateRangePicker 
} from '../shared';
import { CompletionLogDrawer } from '../drawers';
import { DEPARTMENTS } from '../../utils/constants';
import { getScoreColor, formatDate } from '../../utils/helpers';

const CompletionLogsTab: React.FC = () => {
  const {
    logs,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    selectedLog,
    selectLog,
    clearSelection,
    exportLogs
  } = useCompletionLogs();

  const { success, error: showError } = useToast();

  const departmentOptions = DEPARTMENTS.map(dept => ({
    value: dept,
    label: dept
  }));

  const certificateOptions = [
    { value: 'issued', label: 'Certificate Issued' },
    { value: 'not-issued', label: 'No Certificate' }
  ];

  const handleExport = async (format: 'csv' | 'excel' | 'pdf') => {
    try {
      await exportLogs(format);
      success(`Export started - ${format.toUpperCase()} file will be downloaded shortly`);
    } catch (err) {
      showError(`Failed to export as ${format.toUpperCase()}`);
    }
  };

  const handleViewDetails = (log: any) => {
    selectLog(log);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-wrap">
          <SearchBar
            value={filters.search || ''}
            onChange={(value) => updateFilters({ search: value })}
            placeholder="Search completion logs..."
            className="w-80"
          />
          
          <FilterDropdown
            label="All Departments"
            value={filters.department || ''}
            options={departmentOptions}
            onChange={(value) => updateFilters({ department: value })}
          />
          
          <FilterDropdown
            label="Certificate Status"
            value={filters.certificateStatus || ''}
            options={certificateOptions}
            onChange={(value) => updateFilters({ certificateStatus: value })}
          />
          
          <DateRangePicker
            startDate={filters.completedDate?.start || ''}
            endDate={filters.completedDate?.end || ''}
            onDateRangeChange={(start, end) => 
              updateFilters({ completedDate: start || end ? { start, end } : undefined })
            }
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport('csv')}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => handleExport('excel')}>
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
          <Button variant="outline" onClick={() => handleExport('pdf')}>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Completion Logs Table */}
      {logs.length === 0 ? (
        <EmptyState
          title="No completion logs found"
          description="Completion logs will appear here once employees complete their training assignments."
        />
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Employee</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Training Program</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Department</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Completed Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Score</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Time Spent</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Attempts</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Certificate</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {logs.map((log) => (
                  <tr 
                    key={log.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleViewDetails(log)}
                  >
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{log.userName}</div>
                        <div className="text-sm text-gray-500">{log.userEmail}</div>
                        <div className="text-sm text-gray-500">{log.role}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 max-w-xs">
                      <div className="truncate" title={log.trainingTitle}>
                        {log.trainingTitle}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">{log.department}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {formatDate(log.completedDate)}
                    </td>
                    <td className="px-4 py-4">
                      <Badge className={getScoreColor(log.score)}>
                        {log.score}%
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">{log.timeSpent}m</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{log.attempts}</td>
                    <td className="px-4 py-4">
                      {log.certificateId ? (
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <ActionButtons
                        onView={() => handleViewDetails(log)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Completion Log Details Drawer */}
      <CompletionLogDrawer
        isOpen={!!selectedLog}
        onClose={clearSelection}
        log={selectedLog}
      />
    </div>
  );
};

export default CompletionLogsTab;
// /app/awareness-training/components/tabs/AssignmentsTab.tsx
import React from 'react';
import { Plus, Filter, UserPlus, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { useAssignments, useModal, useToast } from '../../utils/hooks';
import { 
  SearchBar, 
  FilterDropdown, 
  StatusBadge, 
  PriorityBadge,
  ProgressBar,
  ActionButtons,
  EmptyState, 
  LoadingSpinner 
} from '../shared';
import { AssignTrainingModal, BulkAssignModal } from '../modals';
import { ASSIGNMENT_STATUS, PRIORITY_LEVELS, DEPARTMENTS } from '../../utils/constants';

const AssignmentsTab: React.FC = () => {
  const {
    assignments,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    selectedIds,
    toggleSelection,
    toggleSelectAll,
    clearSelection,
    bulkAction
  } = useAssignments();

  const assignModal = useModal();
  const bulkModal = useModal();
  const { success, error: showError } = useToast();

  const statusOptions = Object.entries(ASSIGNMENT_STATUS).map(([value, config]) => ({
    value,
    label: config.label
  }));

  const priorityOptions = Object.entries(PRIORITY_LEVELS).map(([value, config]) => ({
    value,
    label: config.label
  }));

  const departmentOptions = DEPARTMENTS.map(dept => ({
    value: dept,
    label: dept
  }));

  const handleBulkAction = async (action: string) => {
    if (selectedIds.length === 0) {
      showError('Please select assignments first');
      return;
    }

    try {
      await bulkAction(action, selectedIds);
      success(`${action} completed successfully`);
    } catch (err) {
      showError(`Failed to ${action}`);
    }
  };

  const handleAssignTraining = async (data: any) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      success('Training assigned successfully');
      assignModal.closeModal();
    } catch (err) {
      showError('Failed to assign training');
    }
  };

  const handleExport = () => {
    // Mock export functionality
    success('Export started - you will receive an email when ready');
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
        <div className="flex items-center gap-4">
          <SearchBar
            value={filters.search || ''}
            onChange={(value) => updateFilters({ search: value })}
            placeholder="Search assignments..."
            className="w-80"
          />
          
          <FilterDropdown
            label="All Status"
            value={filters.status || ''}
            options={statusOptions}
            onChange={(value) => updateFilters({ status: value })}
          />
          
          <FilterDropdown
            label="All Departments"
            value={filters.department || ''}
            options={departmentOptions}
            onChange={(value) => updateFilters({ department: value })}
          />
          
          <FilterDropdown
            label="All Priorities"
            value={filters.priority || ''}
            options={priorityOptions}
            onChange={(value) => updateFilters({ priority: value })}
          />
          
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>
        
        <div className="flex gap-2">
          {selectedIds.length > 0 && (
            <>
              <Button 
                variant="outline" 
                onClick={() => handleBulkAction('send-reminder')}
              >
                Send Reminders ({selectedIds.length})
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleBulkAction('extend-deadline')}
              >
                Extend Deadline
              </Button>
            </>
          )}
          
          <Button variant="outline" onClick={bulkModal.openModal}>
            <UserPlus className="w-4 h-4 mr-2" />
            Bulk Assign
          </Button>
          
          <Button onClick={assignModal.openModal} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Assign Training
          </Button>
        </div>
      </div>

      {/* Assignments Table */}
      {assignments.length === 0 ? (
        <EmptyState
          title="No assignments found"
          description="Start by assigning training programs to employees or adjust your search filters."
          actionLabel="Assign Training"
          onAction={assignModal.openModal}
        />
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <Checkbox
                      checked={selectedIds.length === assignments.length}
                      onCheckedChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Assignee</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Training Program</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Department</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Priority</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Assigned Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Due Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Progress</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {assignments.map((assignment) => (
                  <tr key={assignment.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <Checkbox
                        checked={selectedIds.includes(assignment.id)}
                        onCheckedChange={() => toggleSelection(assignment.id)}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{assignment.assigneeName}</div>
                        <div className="text-sm text-gray-500">{assignment.assigneeEmail}</div>
                        <div className="text-sm text-gray-500">{assignment.role}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 max-w-xs">
                      <div className="truncate" title={assignment.trainingTitle}>
                        {assignment.trainingTitle}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">{assignment.department}</td>
                    <td className="px-4 py-4">
                      <PriorityBadge priority={assignment.priority} />
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">{assignment.assignedDate}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{assignment.dueDate}</td>
                    <td className="px-4 py-4">
                      <ProgressBar 
                        progress={assignment.progress} 
                        size="sm" 
                        showLabel={false}
                        className="w-20"
                      />
                      <span className="text-sm text-gray-900 ml-2">{assignment.progress}%</span>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={assignment.status} />
                    </td>
                    <td className="px-4 py-4">
                      <ActionButtons
                        onView={() => console.log('View', assignment.id)}
                        onEdit={() => console.log('Edit', assignment.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Modals */}
      <AssignTrainingModal
        isOpen={assignModal.isOpen}
        onClose={assignModal.closeModal}
        onSubmit={handleAssignTraining}
      />
      
      <BulkAssignModal
        isOpen={bulkModal.isOpen}
        onClose={bulkModal.closeModal}
        onSubmit={handleAssignTraining}
      />
    </div>
  );
};

export default AssignmentsTab;
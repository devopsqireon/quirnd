// /app/awareness-training/components/display/AssignmentTable.tsx
import React from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Assignment } from '../../types';
import { StatusBadge, PriorityBadge, ProgressBar, ActionButtons } from '../shared';
import { formatDate } from '../../utils/helpers';

interface AssignmentTableProps {
  assignments: Assignment[];
  selectedIds: string[];
  onToggleSelection: (id: string) => void;
  onToggleSelectAll: () => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}

const AssignmentTable: React.FC<AssignmentTableProps> = ({
  assignments,
  selectedIds,
  onToggleSelection,
  onToggleSelectAll,
  onView,
  onEdit
}) => {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <Checkbox
                  checked={selectedIds.length === assignments.length && assignments.length > 0}
                  indeterminate={selectedIds.length > 0 && selectedIds.length < assignments.length}
                  onCheckedChange={onToggleSelectAll}
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Assignee</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Training Program</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Department</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Priority</th>
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
                    onCheckedChange={() => onToggleSelection(assignment.id)}
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
                <td className="px-4 py-4 text-sm text-gray-900">
                  {formatDate(assignment.dueDate)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <ProgressBar 
                      progress={assignment.progress} 
                      size="sm" 
                      showLabel={false}
                      className="w-20"
                    />
                    <span className="text-sm text-gray-900 min-w-fit">{assignment.progress}%</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <StatusBadge status={assignment.status} />
                </td>
                <td className="px-4 py-4">
                  <ActionButtons
                    onView={() => onView(assignment.id)}
                    onEdit={() => onEdit(assignment.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default AssignmentTable;
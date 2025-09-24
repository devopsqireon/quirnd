// /app/awareness-training/components/reports/DepartmentMetricsTable.tsx
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { DepartmentMetrics } from '../../types';

interface DepartmentMetricsTableProps {
  metrics: DepartmentMetrics[];
}

const DepartmentMetricsTable: React.FC<DepartmentMetricsTableProps> = ({
  metrics
}) => {
  const getCompletionRateColor = (rate: number) => {
    if (rate >= 90) return 'bg-green-100 text-green-800';
    if (rate >= 80) return 'bg-blue-100 text-blue-800';
    if (rate >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 80) return 'bg-blue-100 text-blue-800';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-3 py-2 text-left font-medium text-gray-900">Department</th>
            <th className="px-3 py-2 text-left font-medium text-gray-900">Employees</th>
            <th className="px-3 py-2 text-left font-medium text-gray-900">Assigned</th>
            <th className="px-3 py-2 text-left font-medium text-gray-900">Completed</th>
            <th className="px-3 py-2 text-left font-medium text-gray-900">Completion %</th>
            <th className="px-3 py-2 text-left font-medium text-gray-900">Avg Score</th>
            <th className="px-3 py-2 text-left font-medium text-gray-900">Overdue</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {metrics.map((dept) => (
            <tr key={dept.department} className="hover:bg-gray-50">
              <td className="px-3 py-2 font-medium text-gray-900">{dept.department}</td>
              <td className="px-3 py-2 text-gray-600">{dept.totalEmployees}</td>
              <td className="px-3 py-2 text-gray-600">{dept.assignedTrainings}</td>
              <td className="px-3 py-2 text-gray-600">{dept.completedTrainings}</td>
              <td className="px-3 py-2">
                <Badge className={getCompletionRateColor(dept.completionRate)}>
                  {dept.completionRate}%
                </Badge>
              </td>
              <td className="px-3 py-2">
                {dept.averageScore > 0 ? (
                  <Badge className={getScoreColor(dept.averageScore)}>
                    {dept.averageScore}%
                  </Badge>
                ) : (
                  <span className="text-gray-400">N/A</span>
                )}
              </td>
              <td className="px-3 py-2">
                {dept.overdueCount > 0 ? (
                  <Badge className="bg-red-100 text-red-800">
                    {dept.overdueCount}
                  </Badge>
                ) : (
                  <span className="text-gray-400">0</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentMetricsTable;
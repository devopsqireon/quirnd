// /app/risk/treatment-plans/components/display/TreatmentPlansTable.tsx
import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { TreatmentPlan, SortConfig } from '../../types';
import { StatusBadge, ActionButtons } from '../shared';
import { formatDate } from '../../utils/helpers';

interface TreatmentPlansTableProps {
  plans: TreatmentPlan[];
  sortConfig?: SortConfig;
  onSort?: (key: keyof TreatmentPlan) => void;
  onView?: (plan: TreatmentPlan) => void;
  onEdit?: (plan: TreatmentPlan) => void;
  onCopy?: (plan: TreatmentPlan) => void;
  onArchive?: (plan: TreatmentPlan) => void;
  onDelete?: (plan: TreatmentPlan) => void;
}

interface TableHeaderProps {
  label: string;
  sortKey?: keyof TreatmentPlan;
  sortConfig?: SortConfig;
  onSort?: (key: keyof TreatmentPlan) => void;
  className?: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  label,
  sortKey,
  sortConfig,
  onSort,
  className = ''
}) => {
  const isSorted = sortConfig && sortKey && sortConfig.key === sortKey;
  const isAsc = isSorted && sortConfig.direction === 'asc';
  const isDesc = isSorted && sortConfig.direction === 'desc';

  return (
    <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}>
      {sortKey && onSort ? (
        <button
          onClick={() => onSort(sortKey)}
          className="flex items-center space-x-1 hover:text-gray-700"
        >
          <span>{label}</span>
          {isSorted ? (
            isAsc ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
          ) : (
            <ArrowUpDown className="w-4 h-4 opacity-50" />
          )}
        </button>
      ) : (
        label
      )}
    </th>
  );
};

export const TreatmentPlansTable: React.FC<TreatmentPlansTableProps> = ({
  plans,
  sortConfig,
  onSort,
  onView,
  onEdit,
  onCopy,
  onArchive,
  onDelete
}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <TableHeader
                label="RTP Ref"
                sortKey="id"
                sortConfig={sortConfig}
                onSort={onSort}
              />
              <TableHeader
                label="Related Risk ID"
                sortKey="riskId"
                sortConfig={sortConfig}
                onSort={onSort}
              />
              <TableHeader
                label="Control Description"
                className="min-w-0"
              />
              <TableHeader
                label="Annex-A Control"
                sortKey="annexAControl"
                sortConfig={sortConfig}
                onSort={onSort}
              />
              <TableHeader
                label="Responsibility"
                sortKey="responsibility"
                sortConfig={sortConfig}
                onSort={onSort}
              />
              <TableHeader
                label="Target Date"
                sortKey="targetDate"
                sortConfig={sortConfig}
                onSort={onSort}
              />
              <TableHeader
                label="Achieved Date"
                sortKey="achievedDate"
                sortConfig={sortConfig}
                onSort={onSort}
              />
              <TableHeader
                label="Status"
                sortKey="status"
                sortConfig={sortConfig}
                onSort={onSort}
              />
              <TableHeader label="Actions" />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {plans.map((plan) => (
              <tr key={plan.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  {plan.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>
                    <div className="font-medium">{plan.riskId}</div>
                    <div className="text-gray-500 text-xs truncate max-w-xs" title={plan.riskTitle}>
                      {plan.riskTitle}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="max-w-xs">
                    <div className="truncate" title={plan.controlDescription}>
                      {plan.controlDescription}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="font-medium">{plan.annexAControl}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {plan.responsibility}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(plan.targetDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(plan.achievedDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={plan.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <ActionButtons
                    onView={() => onView?.(plan)}
                    onEdit={() => onEdit?.(plan)}
                    onCopy={() => onCopy?.(plan)}
                    onArchive={() => onArchive?.(plan)}
                    onDelete={() => onDelete?.(plan)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {plans.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No treatment plans found</h3>
          <p className="text-gray-600">
            No treatment plans match your current filters.
          </p>
        </div>
      )}
    </div>
  );
};
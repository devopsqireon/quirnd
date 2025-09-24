// /app/risk/treatment-plans/components/display/TreatmentPlanCard.tsx
import React from 'react';
import { TreatmentPlan } from '../../types';
import { StatusBadge, PriorityBadge, CategoryBadge, ActionButtons, ProgressBar } from '../shared';
import { formatDate, formatCurrency } from '../../utils/helpers';

interface TreatmentPlanCardProps {
  plan: TreatmentPlan;
  onView?: (plan: TreatmentPlan) => void;
  onEdit?: (plan: TreatmentPlan) => void;
  onCopy?: (plan: TreatmentPlan) => void;
  onArchive?: (plan: TreatmentPlan) => void;
  onDelete?: (plan: TreatmentPlan) => void;
}

export const TreatmentPlanCard: React.FC<TreatmentPlanCardProps> = ({
  plan,
  onView,
  onEdit,
  onCopy,
  onArchive,
  onDelete
}) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 border border-gray-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{plan.title}</h3>
              <span className="text-sm text-gray-500">({plan.id})</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Related Risk: <span className="font-medium">{plan.riskTitle}</span>
            </p>
            <div className="flex items-center space-x-2">
              <CategoryBadge category={plan.category} />
              <PriorityBadge priority={plan.priority} />
              <StatusBadge status={plan.status} />
            </div>
          </div>
          
          <ActionButtons
            onView={() => onView?.(plan)}
            onEdit={() => onEdit?.(plan)}
            onCopy={() => onCopy?.(plan)}
            onArchive={() => onArchive?.(plan)}
            onDelete={() => onDelete?.(plan)}
          />
        </div>

        {/* Progress Bar */}
        <ProgressBar
          value={plan.completionRate}
          className="mb-4"
        />

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <span className="text-gray-600">Owner:</span>
            <p className="font-medium text-gray-900">{plan.owner}</p>
          </div>
          <div>
            <span className="text-gray-600">Assignee:</span>
            <p className="font-medium text-gray-900">{plan.assignee}</p>
          </div>
          <div>
            <span className="text-gray-600">Target Date:</span>
            <p className="font-medium text-gray-900">{formatDate(plan.targetDate)}</p>
          </div>
          <div>
            <span className="text-gray-600">Budget:</span>
            <p className="font-medium text-gray-900">{formatCurrency(plan.budget)}</p>
          </div>
        </div>

        {/* Control Information */}
        <div className="border-t border-gray-200 pt-4">
          <div className="text-sm">
            <span className="text-gray-600">Control:</span>
            <p className="font-medium text-gray-900 mb-1">{plan.annexAControl}</p>
            <p className="text-gray-600 text-xs line-clamp-2">{plan.controlDescription}</p>
          </div>
        </div>

        {/* Actions Summary */}
        {plan.actions.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {plan.actions.length} action{plan.actions.length !== 1 ? 's' : ''}
              </span>
              <div className="flex items-center space-x-2">
                {plan.actions.filter(a => a.status === 'completed').length > 0 && (
                  <span className="text-xs text-green-600 font-medium">
                    {plan.actions.filter(a => a.status === 'completed').length} completed
                  </span>
                )}
                {plan.actions.filter(a => a.status === 'in-progress').length > 0 && (
                  <span className="text-xs text-yellow-600 font-medium">
                    {plan.actions.filter(a => a.status === 'in-progress').length} in progress
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
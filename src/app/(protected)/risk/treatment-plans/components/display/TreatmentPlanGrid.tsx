// /app/risk/treatment-plans/components/display/TreatmentPlanGrid.tsx
import React from 'react';
import { TreatmentPlan } from '../../types';
import { TreatmentPlanCard } from './TreatmentPlanCard';

interface TreatmentPlanGridProps {
  plans: TreatmentPlan[];
  onView?: (plan: TreatmentPlan) => void;
  onEdit?: (plan: TreatmentPlan) => void;
  onCopy?: (plan: TreatmentPlan) => void;
  onArchive?: (plan: TreatmentPlan) => void;
  onDelete?: (plan: TreatmentPlan) => void;
}

export const TreatmentPlanGrid: React.FC<TreatmentPlanGridProps> = ({
  plans,
  onView,
  onEdit,
  onCopy,
  onArchive,
  onDelete
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <TreatmentPlanCard
          key={plan.id}
          plan={plan}
          onView={onView}
          onEdit={onEdit}
          onCopy={onCopy}
          onArchive={onArchive}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
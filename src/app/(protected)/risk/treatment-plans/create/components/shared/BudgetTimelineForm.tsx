// /app/risk/treatment-plans/create/components/shared/BudgetTimelineForm.tsx
import React from 'react';
import { DollarSign, Calendar } from 'lucide-react';
import { TreatmentPlanFormData } from '../../types';

interface BudgetTimelineFormProps {
  formData: TreatmentPlanFormData;
  setFormData: (data: TreatmentPlanFormData) => void;
}

export const BudgetTimelineForm: React.FC<BudgetTimelineFormProps> = ({
  formData,
  setFormData,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <DollarSign className="inline h-4 w-4 mr-1" />
          Estimated Budget
        </label>
        <input
          type="text"
          value={formData.budget || ''}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          placeholder="e.g., $50,000"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Calendar className="inline h-4 w-4 mr-1" />
          Implementation Timeline
        </label>
        <input
          type="text"
          value={formData.timeline || ''}
          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
          placeholder="e.g., 6 months"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};
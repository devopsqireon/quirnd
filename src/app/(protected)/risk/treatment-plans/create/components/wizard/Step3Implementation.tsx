// /app/risk/treatment-plans/create/components/wizard/Step3Implementation.tsx
import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { BudgetTimelineForm } from '../shared/BudgetTimelineForm';
import { ActionItemsManager } from '../shared/ActionItemsManager';
import { TreatmentPlanFormData } from '../../types';

interface Step3Props {
  formData: TreatmentPlanFormData;
  setFormData: (data: TreatmentPlanFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step3Implementation: React.FC<Step3Props> = ({
  formData,
  setFormData,
  onNext,
  onBack,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Implementation Plan</h3>
        <p className="text-gray-600">Define specific actions, timeline, and budget for the treatment plan.</p>
      </div>

      <BudgetTimelineForm
        formData={formData}
        setFormData={setFormData}
      />

      <ActionItemsManager
        formData={formData}
        setFormData={setFormData}
      />

      <div className="flex justify-between pt-6">
        <button
          onClick={onBack}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          Continue <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
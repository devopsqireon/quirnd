// /app/risk/treatment-plans/create/components/wizard/Step4ReviewSubmit.tsx
import React, { useState } from 'react';
import { ArrowLeft, Save, Send } from 'lucide-react';
import { TreatmentPlanSummary } from '../shared/TreatmentPlanSummary';
import { SubmissionOptions } from '../shared/SubmissionOptions';
import { TreatmentPlanFormData } from '../../types';

interface Step4Props {
  formData: TreatmentPlanFormData;
  setFormData: (data: TreatmentPlanFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step4ReviewSubmit: React.FC<Step4Props> = ({
  formData,
  setFormData,
  onNext,
  onBack,
}) => {
  const [submitType, setSubmitType] = useState('draft');

  const handleSubmit = () => {
    console.log('Submitting treatment plan:', { ...formData, submitType });
    // Handle submission logic here
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Review & Submit</h3>
        <p className="text-gray-600">Review your treatment plan before submitting.</p>
      </div>

      <TreatmentPlanSummary formData={formData} />

      <SubmissionOptions
        submitType={submitType}
        onSubmitTypeChange={setSubmitType}
      />

      <div className="flex justify-between pt-6">
        <button
          onClick={onBack}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="flex gap-3">
          <button
            onClick={() => handleSubmit()}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {submitType === 'draft' ? 'Save Draft' : 'Save'}
          </button>
          <button
            onClick={() => handleSubmit()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            {submitType === 'review' ? 'Submit for Review' : submitType === 'activate' ? 'Activate Plan' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};
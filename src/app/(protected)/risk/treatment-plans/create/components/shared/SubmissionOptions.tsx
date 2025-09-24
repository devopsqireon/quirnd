// /app/risk/treatment-plans/create/components/shared/SubmissionOptions.tsx
import React from 'react';

interface SubmissionOptionsProps {
  submitType: string;
  onSubmitTypeChange: (type: string) => void;
}

export const SubmissionOptions: React.FC<SubmissionOptionsProps> = ({
  submitType,
  onSubmitTypeChange,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h4 className="font-semibold text-gray-900 mb-3">Submission Options</h4>
      <div className="space-y-3">
        <label className="flex items-center">
          <input
            type="radio"
            value="draft"
            checked={submitType === 'draft'}
            onChange={(e) => onSubmitTypeChange(e.target.value)}
            className="mr-3"
          />
          <div>
            <div className="font-medium">Save as Draft</div>
            <div className="text-sm text-gray-600">Save for later editing and review</div>
          </div>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            value="review"
            checked={submitType === 'review'}
            onChange={(e) => onSubmitTypeChange(e.target.value)}
            className="mr-3"
          />
          <div>
            <div className="font-medium">Submit for Review</div>
            <div className="text-sm text-gray-600">Send to stakeholders for approval</div>
          </div>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            value="activate"
            checked={submitType === 'activate'}
            onChange={(e) => onSubmitTypeChange(e.target.value)}
            className="mr-3"
          />
          <div>
            <div className="font-medium">Activate Immediately</div>
            <div className="text-sm text-gray-600">Begin implementation right away</div>
          </div>
        </label>
      </div>
    </div>
  );
};
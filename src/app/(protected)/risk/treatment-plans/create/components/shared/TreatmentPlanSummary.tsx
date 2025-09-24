// /app/risk/treatment-plans/create/components/shared/TreatmentPlanSummary.tsx
import React from 'react';
import { TreatmentPlanFormData } from '../../types';
import { mockRisks, treatmentOptions } from '../../data/mockData';

interface TreatmentPlanSummaryProps {
  formData: TreatmentPlanFormData;
}

export const TreatmentPlanSummary: React.FC<TreatmentPlanSummaryProps> = ({
  formData,
}) => {
  const selectedRisks = mockRisks.filter(risk => formData.selectedRisks?.includes(risk.id));
  const selectedStrategy = treatmentOptions.find(option => option.id === formData.treatmentStrategy);

  return (
    <div className="space-y-6">
      {/* Selected Risks */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Selected Risks ({selectedRisks.length})</h4>
        <div className="space-y-2">
          {selectedRisks.map((risk) => (
            <div key={risk.id} className="flex items-center justify-between text-sm">
              <span className="font-medium">{risk.title}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                risk.riskLevel === 'Critical' ? 'bg-red-100 text-red-800' :
                risk.riskLevel === 'High' ? 'bg-orange-100 text-orange-800' :
                risk.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {risk.riskLevel}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Treatment Strategy */}
      {selectedStrategy && (
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Treatment Strategy</h4>
          <div className="space-y-2">
            <div className="font-medium">{selectedStrategy.name}</div>
            <div className="text-sm text-gray-600">{selectedStrategy.description}</div>
            <div className="grid grid-cols-2 gap-4 text-sm mt-2">
              <div>Cost: {selectedStrategy.estimatedCost}</div>
              <div>Timeline: {selectedStrategy.timeframe}</div>
            </div>
            {formData.justification && (
              <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                <strong>Justification:</strong> {formData.justification}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Implementation Plan */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Implementation Plan</h4>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {formData.budget && <div><strong>Budget:</strong> {formData.budget}</div>}
          {formData.timeline && <div><strong>Timeline:</strong> {formData.timeline}</div>}
        </div>
        {formData.actions && formData.actions.length > 0 && (
          <div>
            <h5 className="font-medium mb-2">Action Items ({formData.actions.length})</h5>
            <div className="space-y-2">
              {formData.actions.map((action, index) => (
                action.title && (
                  <div key={action.id} className="text-sm p-2 bg-gray-50 rounded">
                    <div className="font-medium">{action.title}</div>
                    {action.owner && <div className="text-gray-600">Assigned to: {action.owner}</div>}
                    {action.dueDate && <div className="text-gray-600">Due: {action.dueDate}</div>}
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

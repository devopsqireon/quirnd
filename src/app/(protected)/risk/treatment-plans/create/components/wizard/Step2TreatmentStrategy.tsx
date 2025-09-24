// /app/risk/treatment-plans/create/components/wizard/Step2TreatmentStrategy.tsx
import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { TreatmentStrategySelector } from '../shared/TreatmentStrategySelector';
import { JustificationTextarea } from '../shared/JustificationTextarea';
import { TreatmentPlanFormData } from '../../types';

interface Step2Props {
  formData: TreatmentPlanFormData;
  setFormData: (data: TreatmentPlanFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step2TreatmentStrategy: React.FC<Step2Props> = ({
  formData,
  setFormData,
  onNext,
  onBack,
}) => {
  const [selectedStrategy, setSelectedStrategy] = useState(formData.treatmentStrategy || '');
  const [justification, setJustification] = useState(formData.justification || '');

  const handleStrategyChange = (strategyId: string) => {
    setSelectedStrategy(strategyId);
    setFormData({ ...formData, treatmentStrategy: strategyId });
  };

  const handleJustificationChange = (value: string) => {
    setJustification(value);
    setFormData({ ...formData, justification: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Treatment Strategy</h3>
        <p className="text-gray-600">Choose the most appropriate treatment approach for the selected risks.</p>
      </div>

      <TreatmentStrategySelector
        selectedStrategy={selectedStrategy}
        onStrategyChange={handleStrategyChange}
      />

      {selectedStrategy && (
        <JustificationTextarea
          value={justification}
          onChange={handleJustificationChange}
        />
      )}

      <div className="flex justify-between pt-6">
        <button
          onClick={onBack}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <button
          onClick={onNext}
          disabled={!selectedStrategy}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
        >
          Continue <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
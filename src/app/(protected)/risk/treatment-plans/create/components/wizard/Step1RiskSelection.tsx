// /app/risk/treatment-plans/create/components/wizard/Step1RiskSelection.tsx
import React, { useState } from 'react';
import { Search, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { RiskList } from '../shared/RiskList';
import { SearchAndFilter } from '../shared/SearchAndFilter';
import { TreatmentPlanFormData } from '../../types';
import { mockRisks } from '../../data/mockData';

interface Step1Props {
  formData: TreatmentPlanFormData;
  setFormData: (data: TreatmentPlanFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step1RiskSelection: React.FC<Step1Props> = ({
  formData,
  setFormData,
  onNext,
  onBack,
}) => {
  const [selectedRisks, setSelectedRisks] = useState<string[]>(formData.selectedRisks || []);
  const [filteredRisks, setFilteredRisks] = useState(mockRisks);

  const handleRiskSelection = (riskId: string) => {
    const newSelection = selectedRisks.includes(riskId)
      ? selectedRisks.filter(id => id !== riskId)
      : [...selectedRisks, riskId];
    setSelectedRisks(newSelection);
    setFormData({ ...formData, selectedRisks: newSelection });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Risks for Treatment</h3>
        <p className="text-gray-600">Choose one or more risks that require treatment planning.</p>
      </div>

      <SearchAndFilter 
        risks={mockRisks}
        onFilteredRisksChange={setFilteredRisks}
      />

      <RiskList
        risks={filteredRisks}
        selectedRisks={selectedRisks}
        onRiskSelection={handleRiskSelection}
      />

      {selectedRisks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>Select at least one risk to continue</p>
        </div>
      )}

      <div className="flex justify-between pt-6">
        <button
          onClick={onBack}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={selectedRisks.length === 0}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
        >
          Continue <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
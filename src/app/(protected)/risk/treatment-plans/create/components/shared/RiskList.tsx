// /app/risk/treatment-plans/create/components/shared/RiskList.tsx
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Risk } from '../../types';

interface RiskListProps {
  risks: Risk[];
  selectedRisks: string[];
  onRiskSelection: (riskId: string) => void;
}

export const RiskList: React.FC<RiskListProps> = ({
  risks,
  selectedRisks,
  onRiskSelection,
}) => {
  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-3">
      {risks.map((risk) => (
        <div
          key={risk.id}
          className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
            selectedRisks.includes(risk.id)
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => onRiskSelection(risk.id)}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className={`w-4 h-4 rounded border-2 mt-1 flex items-center justify-center ${
                selectedRisks.includes(risk.id)
                  ? 'bg-blue-500 border-blue-500'
                  : 'border-gray-300'
              }`}>
                {selectedRisks.includes(risk.id) && (
                  <CheckCircle className="w-3 h-3 text-white" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-medium text-gray-900">{risk.title}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getRiskLevelColor(risk.riskLevel)}`}>
                    {risk.riskLevel}
                  </span>
                  <span className="text-sm text-gray-500">Score: {risk.riskScore}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{risk.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>Owner: {risk.owner}</span>
                  <span>Category: {risk.category}</span>
                  <span>Last Assessment: {risk.lastAssessment}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
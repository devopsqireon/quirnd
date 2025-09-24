// /app/risk/treatment-plans/create/components/shared/TreatmentStrategySelector.tsx
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { TreatmentOption } from '../../types';
import { treatmentOptions } from '../../data/mockData';

interface TreatmentStrategySelectorProps {
  selectedStrategy: string;
  onStrategyChange: (strategyId: string) => void;
}

export const TreatmentStrategySelector: React.FC<TreatmentStrategySelectorProps> = ({
  selectedStrategy,
  onStrategyChange,
}) => {
  const getEffectivenessColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getFeasibilityColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="grid gap-4">
      {treatmentOptions.map((option) => (
        <div
          key={option.id}
          className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
            selectedStrategy === option.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => onStrategyChange(option.id)}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className={`w-4 h-4 rounded border-2 mt-1 flex items-center justify-center ${
                selectedStrategy === option.id
                  ? 'bg-blue-500 border-blue-500'
                  : 'border-gray-300'
              }`}>
                {selectedStrategy === option.id && (
                  <CheckCircle className="w-3 h-3 text-white" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-2">{option.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Cost Range:</span>
                    <div className="font-medium">{option.estimatedCost}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Timeframe:</span>
                    <div className="font-medium">{option.timeframe}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Effectiveness</span>
                    <span className="text-sm font-medium">{option.effectiveness}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getEffectivenessColor(option.effectiveness)}`}
                      style={{ width: `${option.effectiveness}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Feasibility</span>
                    <span className="text-sm font-medium">{option.feasibility}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getFeasibilityColor(option.feasibility)}`}
                      style={{ width: `${option.feasibility}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
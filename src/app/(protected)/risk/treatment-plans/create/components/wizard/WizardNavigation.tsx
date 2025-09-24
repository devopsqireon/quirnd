// /app/risk/treatment-plans/create/components/wizard/WizardNavigation.tsx
import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { TreatmentPlanStep } from '../../types';

interface WizardNavigationProps {
  steps: TreatmentPlanStep[];
  currentStep: number;
  onStepClick: (stepNumber: number) => void;
}

export const WizardNavigation: React.FC<WizardNavigationProps> = ({
  steps,
  currentStep,
  onStepClick,
}) => {
  return (
    <div className="px-6 py-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.step}>
            <div
              className={`flex items-center cursor-pointer group ${
                step.isActive ? 'text-blue-600' : step.isCompleted ? 'text-green-600' : 'text-gray-400'
              }`}
              onClick={() => onStepClick(step.step)}
            >
              <div className="flex items-center">
                {step.isCompleted ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                    step.isActive
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-gray-300 text-gray-500'
                  }`}>
                    {step.step}
                  </div>
                )}
                <div className="ml-3">
                  <div className={`text-sm font-medium ${
                    step.isActive ? 'text-blue-600' : step.isCompleted ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500">{step.description}</div>
                </div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 mx-4 h-0.5 ${
                steps[index + 1].isCompleted || steps[index + 1].isActive
                  ? 'bg-blue-600'
                  : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
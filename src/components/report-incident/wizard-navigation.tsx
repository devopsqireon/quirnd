// src/components/report-incident/wizard-navigation.tsx
"use client";

import { Check, Circle } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface WizardNavigationProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
  onStepClick: (step: number) => void;
}

export function WizardNavigation({ steps, currentStep, completedSteps, onStepClick }: WizardNavigationProps) {
  const getStepStatus = (stepId: number) => {
    if (completedSteps.includes(stepId)) return 'completed';
    if (stepId === currentStep) return 'current';
    if (stepId < currentStep) return 'available';
    return 'upcoming';
  };

  return (
    <div className="px-8 py-6 border-b border-gray-200 bg-gray-50">
      <nav aria-label="Progress">
        <ol className="flex items-center justify-between">
          {steps.map((step, stepIdx) => {
            const status = getStepStatus(step.id);
            const isClickable = status === 'completed' || status === 'current' || status === 'available';
            
            return (
              <li key={step.id} className="flex-1 relative">
                <div className="flex items-center">
                  <button
                    onClick={() => isClickable && onStepClick(step.id)}
                    disabled={!isClickable}
                    className={`
                      relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200
                      ${status === 'completed' 
                        ? 'bg-green-600 border-green-600 text-white hover:bg-green-700' 
                        : status === 'current'
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : status === 'available'
                        ? 'bg-white border-blue-600 text-blue-600 hover:bg-blue-50'
                        : 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                      }
                      ${isClickable ? 'cursor-pointer' : ''}
                    `}
                  >
                    {status === 'completed' ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-medium">{step.id}</span>
                    )}
                  </button>
                  
                  <div className="ml-3 min-w-0 flex-1">
                    <p className={`text-sm font-medium ${
                      status === 'current' ? 'text-blue-600' :
                      status === 'completed' ? 'text-green-600' :
                      status === 'available' ? 'text-gray-900' :
                      'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500 hidden sm:block">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {stepIdx < steps.length - 1 && (
                  <div 
                    className={`absolute top-5 left-10 w-full h-0.5 transition-colors duration-200 ${
                      completedSteps.includes(step.id) ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                    style={{ width: 'calc(100% - 2.5rem)' }}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
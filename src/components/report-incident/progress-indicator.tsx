// src/components/report-incident/progress-indicator.tsx
"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  progressPercentage: number;
}

const steps = [
  'Basic Info',
  'Description',
  'Reporter',
  'Evidence',
  'Additional'
];

export function ProgressIndicator({ currentStep, totalSteps, progressPercentage }: ProgressIndicatorProps) {
  return (
    <section className="mb-8">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Form Progress</span>
            <span className="text-sm text-gray-500">{Math.round(progressPercentage)}% Complete</span>
          </div>
          <Progress value={progressPercentage} className="h-2 mb-3" />
          <div className="flex justify-between text-xs text-gray-500">
            {steps.map((step, index) => (
              <span 
                key={index}
                className={`${
                  index + 1 <= currentStep ? 'text-blue-600 font-medium' : 'text-gray-500'
                }`}
              >
                {step}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
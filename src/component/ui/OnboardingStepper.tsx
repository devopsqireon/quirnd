'use client';

import React from 'react';
import { Check } from 'lucide-react';

// Define the steps of the onboarding process
const steps = ['Workspace', 'Profile', 'Team', 'Region', 'Summary', 'Agreement'];

// Define the props for the component
interface OnboardingStepperProps {
  currentStep: string;
}

/**
 * A visual stepper component for the onboarding flow.
 * It highlights the current step, shows completed steps with a checkmark,
 * and displays upcoming steps.
 */
export default function OnboardingStepper({ currentStep }: OnboardingStepperProps) {
  const currentStepIndex = steps.indexOf(currentStep);
  // Calculate the width of the green progress line as a percentage of the total line length.
  const progressWidth = currentStepIndex > 0 ? (currentStepIndex / (steps.length - 1)) * 100 : 0;

  return (
    <div className="py-8">
      <div className="relative w-full">
        {/* This container holds the line and has padding on left/right to align with the circles */}
        <div className="absolute top-5 left-0 w-full px-10" aria-hidden="true">
          {/* The gray background line is now a relative container for the green line */}
          <div className="relative h-0.5 w-full bg-gray-300">
            {/* The green progress line is now a child, positioned absolutely inside the gray line */}
            <div
              className="absolute top-0 left-0 h-full bg-green-600 transition-all duration-500"
              style={{ width: `${progressWidth}%` }}
            />
          </div>
        </div>

        {/* The list of steps, spaced out evenly on top of the lines */}
        <ol role="list" className="relative z-10 flex justify-between">
          {steps.map((step, stepIdx) => (
            <li key={step} className="flex flex-col items-center text-center w-20">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  stepIdx < currentStepIndex
                    ? 'bg-green-600' // Completed
                    : stepIdx === currentStepIndex
                    ? 'bg-blue-600' // Current
                    : 'bg-gray-300' // Upcoming
                }`}
              >
                {stepIdx < currentStepIndex ? (
                  <Check className="h-6 w-6 text-white" aria-hidden="true" />
                ) : (
                  <span
                    className={`text-sm font-medium ${
                      stepIdx === currentStepIndex ? 'text-white' : 'text-gray-500'
                    }`}
                  >
                    {stepIdx + 1}
                  </span>
                )}
              </div>
              <p
                className={`mt-2 text-sm font-medium ${
                  stepIdx <= currentStepIndex ? 'text-gray-900' : 'text-gray-500'
                }`}
              >
                {step}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
// /app/risk/treatment-plans/create/hooks/useWizardNavigation.ts
import { useState, useCallback } from 'react';
import { TreatmentPlanStep } from '../types';

const initialSteps: TreatmentPlanStep[] = [
  {
    step: 1,
    title: 'Select Risks',
    description: 'Choose risks for treatment',
    isCompleted: false,
    isActive: true,
  },
  {
    step: 2,
    title: 'Treatment Strategy',
    description: 'Define treatment approach',
    isCompleted: false,
    isActive: false,
  },
  {
    step: 3,
    title: 'Implementation',
    description: 'Plan actions and timeline',
    isCompleted: false,
    isActive: false,
  },
  {
    step: 4,
    title: 'Review & Submit',
    description: 'Finalize and submit plan',
    isCompleted: false,
    isActive: false,
  },
];

export const useWizardNavigation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState(initialSteps);

  const updateStepStatus = useCallback((stepNumber: number, isCompleted: boolean) => {
    setSteps(prev => prev.map(step => ({
      ...step,
      isCompleted: step.step < stepNumber || (step.step === stepNumber && isCompleted),
      isActive: step.step === stepNumber,
    })));
  }, []);

  const goToStep = useCallback((stepNumber: number) => {
    if (stepNumber >= 1 && stepNumber <= steps.length) {
      setCurrentStep(stepNumber);
      updateStepStatus(stepNumber, false);
    }
  }, [steps.length, updateStepStatus]);

  const nextStep = useCallback(() => {
    if (currentStep < steps.length) {
      const nextStepNumber = currentStep + 1;
      setCurrentStep(nextStepNumber);
      updateStepStatus(nextStepNumber, false);
    }
  }, [currentStep, steps.length, updateStepStatus]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      const prevStepNumber = currentStep - 1;
      setCurrentStep(prevStepNumber);
      updateStepStatus(prevStepNumber, false);
    }
  }, [currentStep, updateStepStatus]);

  const markStepCompleted = useCallback((stepNumber: number) => {
    setSteps(prev => prev.map(step =>
      step.step === stepNumber ? { ...step, isCompleted: true } : step
    ));
  }, []);

  return {
    currentStep,
    steps,
    goToStep,
    nextStep,
    prevStep,
    updateStepStatus,
    markStepCompleted,
  };
};
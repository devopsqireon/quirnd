// /app/risk/treatment-plans/create/components/wizard/TreatmentPlanWizard.tsx
import React, { useState } from 'react';
import { WizardNavigation } from './WizardNavigation';
import { Step1RiskSelection } from './Step1RiskSelection';
import { Step2TreatmentStrategy } from './Step2TreatmentStrategy';
import { Step3Implementation } from './Step3Implementation';
import { Step4ReviewSubmit } from './Step4ReviewSubmit';
import { TreatmentPlanStep, TreatmentPlanFormData } from '../../types';

const steps: TreatmentPlanStep[] = [
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

export const TreatmentPlanWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<TreatmentPlanFormData>({
    selectedRisks: [],
    treatmentStrategy: '',
    justification: '',
    budget: '',
    timeline: '',
    actions: [],
  });
  const [wizardSteps, setWizardSteps] = useState(steps);

  const updateStepStatus = (stepNumber: number, isCompleted: boolean) => {
    setWizardSteps(prev => prev.map(step => ({
      ...step,
      isCompleted: step.step < stepNumber || isCompleted,
      isActive: step.step === stepNumber,
    })));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      updateStepStatus(currentStep + 1, false);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      updateStepStatus(currentStep - 1, false);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepNumber: number) => {
    setCurrentStep(stepNumber);
    updateStepStatus(stepNumber, false);
  };

  const renderCurrentStep = () => {
    const stepProps = {
      formData,
      setFormData,
      onNext: handleNext,
      onBack: handleBack,
    };

    switch (currentStep) {
      case 1:
        return <Step1RiskSelection {...stepProps} />;
      case 2:
        return <Step2TreatmentStrategy {...stepProps} />;
      case 3:
        return <Step3Implementation {...stepProps} />;
      case 4:
        return <Step4ReviewSubmit {...stepProps} />;
      default:
        return <Step1RiskSelection {...stepProps} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <WizardNavigation 
        steps={wizardSteps}
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />
      <div className="p-6">
        {renderCurrentStep()}
      </div>
    </div>
  );
};
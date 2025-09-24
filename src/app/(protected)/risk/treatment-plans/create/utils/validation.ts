// /app/risk/treatment-plans/create/utils/validation.ts
import { TreatmentPlanFormData, ActionItem } from '../types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateStep1 = (formData: TreatmentPlanFormData): ValidationResult => {
  const errors: string[] = [];
  
  if (!formData.selectedRisks || formData.selectedRisks.length === 0) {
    errors.push('Please select at least one risk for treatment');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateStep2 = (formData: TreatmentPlanFormData): ValidationResult => {
  const errors: string[] = [];
  
  if (!formData.treatmentStrategy) {
    errors.push('Please select a treatment strategy');
  }

  if (formData.treatmentStrategy && !formData.justification?.trim()) {
    errors.push('Please provide justification for the selected strategy');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateStep3 = (formData: TreatmentPlanFormData): ValidationResult => {
  const errors: string[] = [];
  
  if (!formData.actions || formData.actions.length === 0) {
    errors.push('Please add at least one action item');
  } else {
    const validActions = formData.actions.filter(action => action.title?.trim());
    if (validActions.length === 0) {
      errors.push('Please provide a title for at least one action item');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateActionItem = (action: ActionItem): ValidationResult => {
  const errors: string[] = [];
  
  if (!action.title?.trim()) {
    errors.push('Action title is required');
  }
  
  if (!action.owner?.trim()) {
    errors.push('Action owner is required');
  }
  
  if (!action.dueDate) {
    errors.push('Due date is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateEntireForm = (formData: TreatmentPlanFormData): ValidationResult => {
  const step1Validation = validateStep1(formData);
  const step2Validation = validateStep2(formData);
  const step3Validation = validateStep3(formData);

  const allErrors = [
    ...step1Validation.errors,
    ...step2Validation.errors,
    ...step3Validation.errors
  ];

  return {
    isValid: allErrors.length === 0,
    errors: allErrors
  };
};
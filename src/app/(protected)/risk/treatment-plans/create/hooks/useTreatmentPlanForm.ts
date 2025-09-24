// /app/risk/treatment-plans/create/hooks/useTreatmentPlanForm.ts
import { useState, useCallback } from 'react';
import { TreatmentPlanFormData, ActionItem } from '../types';

export const useTreatmentPlanForm = () => {
  const [formData, setFormData] = useState<TreatmentPlanFormData>({
    selectedRisks: [],
    treatmentStrategy: '',
    justification: '',
    budget: '',
    timeline: '',
    actions: [],
  });

  const updateFormData = useCallback((updates: Partial<TreatmentPlanFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  const addAction = useCallback(() => {
    const newAction: ActionItem = {
      id: Date.now(),
      title: '',
      description: '',
      owner: '',
      dueDate: '',
      priority: 'Medium'
    };
    setFormData(prev => ({
      ...prev,
      actions: [...prev.actions, newAction]
    }));
  }, []);

  const updateAction = useCallback((id: number, updates: Partial<ActionItem>) => {
    setFormData(prev => ({
      ...prev,
      actions: prev.actions.map(action =>
        action.id === id ? { ...action, ...updates } : action
      )
    }));
  }, []);

  const removeAction = useCallback((id: number) => {
    setFormData(prev => ({
      ...prev,
      actions: prev.actions.filter(action => action.id !== id)
    }));
  }, []);

  const validateStep = useCallback((step: number): boolean => {
    switch (step) {
      case 1:
        return formData.selectedRisks.length > 0;
      case 2:
        return !!formData.treatmentStrategy;
      case 3:
        return formData.actions.some(action => action.title.trim() !== '');
      case 4:
        return true; // Review step always valid
      default:
        return false;
    }
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData({
      selectedRisks: [],
      treatmentStrategy: '',
      justification: '',
      budget: '',
      timeline: '',
      actions: [],
    });
  }, []);

  return {
    formData,
    setFormData,
    updateFormData,
    addAction,
    updateAction,
    removeAction,
    validateStep,
    resetForm,
  };
};
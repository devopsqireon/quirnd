// /app/risk/treatment-plans/utils/hooks/useTreatmentPlans.ts
import { useState, useEffect, useMemo } from 'react';
import { TreatmentPlan, FilterState, SortConfig } from '../../types';
import { filterTreatmentPlans, sortTreatmentPlans } from '../helpers';
import { sampleTreatmentPlans } from '../../data/sample-data';

export const useTreatmentPlans = () => {
  const [treatmentPlans, setTreatmentPlans] = useState<TreatmentPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const loadTreatmentPlans = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setTreatmentPlans(sampleTreatmentPlans);
      } catch (err) {
        setError('Failed to load treatment plans');
      } finally {
        setLoading(false);
      }
    };

    loadTreatmentPlans();
  }, []);

  const refreshTreatmentPlans = () => {
    setTreatmentPlans(sampleTreatmentPlans);
  };

  return {
    treatmentPlans,
    loading,
    error,
    refreshTreatmentPlans
  };
};
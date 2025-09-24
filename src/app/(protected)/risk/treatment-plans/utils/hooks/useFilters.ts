// /app/risk/treatment-plans/utils/hooks/useFilters.ts
import { useState, useMemo } from 'react';
import { FilterState, TreatmentPlan, SortConfig } from '../../types';
import { filterTreatmentPlans, sortTreatmentPlans } from '../helpers';

const initialFilters: FilterState = {
  search: '',
  category: '',
  priority: '',
  status: '',
  owner: '',
  department: '',
  dateRange: ''
};

export const useFilters = (treatmentPlans: TreatmentPlan[]) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'lastUpdated',
    direction: 'desc'
  });

  const filteredPlans = useMemo(() => {
    let filtered = filterTreatmentPlans(treatmentPlans, filters);
    return sortTreatmentPlans(filtered, sortConfig.key, sortConfig.direction);
  }, [treatmentPlans, filters, sortConfig]);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  const updateSort = (key: keyof TreatmentPlan) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return {
    filters,
    sortConfig,
    filteredPlans,
    updateFilters,
    clearFilters,
    updateSort
  };
};
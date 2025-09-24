// /app/risk/treatment-plans/types/filter.types.ts
export interface FilterState {
    search: string;
    category: string;
    priority: string;
    status: string;
    owner: string;
    department: string;
    dateRange: string;
  }
  
  export interface SortConfig {
    key: keyof TreatmentPlan;
    direction: 'asc' | 'desc';
  }
  
  export type ViewMode = 'grid' | 'list';
  
  export interface FilterOption {
    value: string;
    label: string;
    count?: number;
  }
// /app/risk/treatment-plans/utils/constants.ts
import { FilterOption } from '../types';

export const TREATMENT_CATEGORIES: FilterOption[] = [
  { value: 'mitigate', label: 'Mitigate' },
  { value: 'transfer', label: 'Transfer' },
  { value: 'avoid', label: 'Avoid' },
  { value: 'accept', label: 'Accept' }
];

export const TREATMENT_PRIORITIES: FilterOption[] = [
  { value: 'critical', label: 'Critical' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' }
];

export const TREATMENT_STATUSES: FilterOption[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'approved', label: 'Approved' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'on-hold', label: 'On Hold' },
  { value: 'overdue', label: 'Overdue' }
];

export const DATE_RANGES: FilterOption[] = [
  { value: 'this-week', label: 'This Week' },
  { value: 'this-month', label: 'This Month' },
  { value: 'next-30-days', label: 'Next 30 Days' },
  { value: 'overdue', label: 'Overdue' }
];
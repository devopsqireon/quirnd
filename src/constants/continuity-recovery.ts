// src/constants/continuity-recovery.ts
export const PLAN_STATUS_OPTIONS = [
    { value: 'all', label: 'All Statuses' },
    { value: 'draft', label: 'Draft' },
    { value: 'active', label: 'Active' },
    { value: 'under-review', label: 'Under Review' },
    { value: 'retired', label: 'Retired' }
  ] as const
  
  export const OWNER_FILTER_OPTIONS = [
    { value: 'all', label: 'All Owners' },
    { value: 'it', label: 'IT Department' },
    { value: 'operations', label: 'Operations' },
    { value: 'finance', label: 'Finance' },
    { value: 'hr', label: 'HR' }
  ] as const
  
  export const PROCESS_PRIORITY_FILTERS = [
    { id: 'all', label: 'All Processes' },
    { id: 'critical', label: 'Critical' },
    { id: 'important', label: 'Important' },
    { id: 'standard', label: 'Standard' }
  ] as const
  
  export const STATUS_COLORS = {
    Active: 'bg-green-100 text-green-800',
    'Under Review': 'bg-yellow-100 text-yellow-800',
    Draft: 'bg-gray-100 text-gray-800',
    Retired: 'bg-red-100 text-red-800',
    Passed: 'bg-green-100 text-green-800',
    Failed: 'bg-red-100 text-red-800',
    Scheduled: 'bg-yellow-100 text-yellow-800',
    Success: 'bg-green-100 text-green-800',
    Running: 'bg-yellow-100 text-yellow-800'
  } as const
  
  export const PRIORITY_COLORS = {
    Critical: 'bg-red-100 text-red-800',
    Important: 'bg-yellow-100 text-yellow-800',
    Standard: 'bg-gray-100 text-gray-800'
  } as const
  
  export const RTO_RPO_COLORS = {
    good: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    critical: 'bg-red-100 text-red-800'
  } as const
  
  export const COMPLIANCE_METRICS = {
    TOTAL_PLANS: 12,
    BCP_PLANS: 8,
    DRP_PLANS: 4,
    UPCOMING_TESTS: 3,
    OVERDUE_REVIEWS: 2,
    COMPLIANCE_SCORE: 94
  } as const
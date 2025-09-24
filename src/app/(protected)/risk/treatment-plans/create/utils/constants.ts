// /app/risk/treatment-plans/create/utils/constants.ts
export const RISK_LEVELS = {
    CRITICAL: 'Critical',
    HIGH: 'High',
    MEDIUM: 'Medium',
    LOW: 'Low'
  } as const;
  
  export const RISK_STATUSES = {
    OPEN: 'Open',
    IN_PROGRESS: 'In Progress',
    CLOSED: 'Closed'
  } as const;
  
  export const TREATMENT_STATUSES = {
    DRAFT: 'Draft',
    UNDER_REVIEW: 'Under Review',
    APPROVED: 'Approved',
    ACTIVE: 'Active',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled'
  } as const;
  
  export const ACTION_PRIORITIES = {
    HIGH: 'High',
    MEDIUM: 'Medium',
    LOW: 'Low'
  } as const;
  
  export const TREATMENT_TYPES = {
    ACCEPT: 'Accept Risk',
    MITIGATE: 'Mitigate Risk',
    TRANSFER: 'Transfer Risk',
    AVOID: 'Avoid Risk'
  } as const;
  
  export const RISK_CATEGORIES = [
    'Cybersecurity',
    'Operational',
    'Financial',
    'Strategic',
    'Compliance',
    'Reputation',
    'Technology',
    'Human Resources',
    'Vendor Management',
    'Business Continuity',
    'Data Privacy',
    'Physical Security'
  ];
  
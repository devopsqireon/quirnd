// src/app/tasks-controls/constants.ts

export const TASK_STATUS = {
    OPEN: 'Open',
    IN_PROGRESS: 'In Progress',
    DONE: 'Done',
    OVERDUE: 'Overdue'
  } as const;
  
  export const TASK_PRIORITY = {
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    CRITICAL: 'Critical'
  } as const;
  
  export const CONTROL_STATUS = {
    IMPLEMENTED: 'Implemented',
    IN_PROGRESS: 'In Progress',
    PLANNED: 'Planned',
    NOT_APPLICABLE: 'Not Applicable'
  } as const;
  
  export const LINKED_ITEM_TYPE = {
    RISK: 'Risk',
    POLICY: 'Policy',
    TRAINING: 'Training',
    CONTROL: 'Control'
  } as const;
  
  export const CONTROL_CATEGORIES = [
    'Information Security Policies',
    'Organization of Information Security',
    'Human Resource Security',
    'Asset Management',
    'Access Control',
    'Cryptography',
    'Physical and Environmental Security',
    'Operations Security',
    'Communications Security',
    'System Acquisition, Development and Maintenance',
    'Supplier Relationships',
    'Information Security Incident Management',
    'Information Security Aspects of Business Continuity Management',
    'Compliance'
  ];
  
  export const MOCK_OWNERS = [
    'John Smith',
    'Sarah Johnson',
    'Mike Davis',
    'Emily Chen',
    'David Wilson',
    'Lisa Brown'
  ];
  
  export const STATUS_VARIANTS = {
    [TASK_STATUS.OPEN]: 'secondary',
    [TASK_STATUS.IN_PROGRESS]: 'default',
    [TASK_STATUS.DONE]: 'default',
    [TASK_STATUS.OVERDUE]: 'destructive',
    [CONTROL_STATUS.IMPLEMENTED]: 'default',
    [CONTROL_STATUS.IN_PROGRESS]: 'secondary',
    [CONTROL_STATUS.PLANNED]: 'outline',
    [CONTROL_STATUS.NOT_APPLICABLE]: 'secondary'
  } as const;
  
  export const PRIORITY_COLORS = {
    [TASK_PRIORITY.LOW]: 'text-gray-600',
    [TASK_PRIORITY.MEDIUM]: 'text-amber-600',
    [TASK_PRIORITY.HIGH]: 'text-blue-600',
    [TASK_PRIORITY.CRITICAL]: 'text-red-600'
  } as const;
  
  export const DUE_DATE_RANGES = [
    { value: '', label: 'All dates' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'today', label: 'Due Today' },
    { value: 'this-week', label: 'This Week' },
    { value: 'next-week', label: 'Next Week' },
    { value: 'this-month', label: 'This Month' },
    { value: 'next-month', label: 'Next Month' }
  ];
  
  export const FILTER_LABELS = {
    status: 'Status',
    owner: 'Owner',
    priority: 'Priority',
    linkedItemType: 'Type',
    category: 'Category',
    dueDateRange: 'Due Date'
  } as const;
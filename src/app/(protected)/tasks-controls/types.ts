// src/app/tasks-controls/types.ts

export interface LinkedItem {
    type: 'Risk' | 'Policy' | 'Training' | 'Control';
    id: string;
    title: string;
  }
  
  export interface Task {
    id: string;
    title: string;
    linkedItem: LinkedItem;
    owner: string;
    dueDate: string;
    status: 'Open' | 'In Progress' | 'Done' | 'Overdue';
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    description?: string;
    createdDate: string;
    updatedDate: string;
  }
  
  export interface Control {
    id: string;
    annexARef: string;
    title: string;
    category: string;
    clauseText: string;
    linkedRisks: Array<{ id: string; title: string; }>;
    linkedPolicies: Array<{ id: string; title: string; }>;
    owner: string;
    status: 'Implemented' | 'In Progress' | 'Planned' | 'Not Applicable';
    nextReviewDate: string;
    linkedTasks: Array<{ id: string; title: string; status: string; }>;
    evidence: Array<{ id: string; name: string; uploadDate: string; }>;
    implementationDate?: string;
    notes?: string;
  }
  
  export interface Evidence {
    id: string;
    name: string;
    type: string;
    size: string;
    uploadDate: string;
    uploadedBy: string;
  }
  
  export interface ActivityLog {
    id: string;
    action: string;
    user: string;
    date: string;
    details: string;
  }
  
  export interface TaskFilters {
    status: string;
    owner: string;
    priority: string;
    linkedItemType: string;
    dueDateRange: string;
  }
  
  export interface ControlFilters {
    status: string;
    owner: string;
    category: string;
    dueDateRange: string;
  }
  
  export interface TaskCenterProps {
    globalSearch: string;
    showFilters: boolean;
  }
  
  export interface ControlTrackerProps {
    globalSearch: string;
    showFilters: boolean;
  }
  
  export interface CreateTaskModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onTaskCreated: (task: Task) => void;
  }
  
  export interface TaskDetailsDrawerProps {
    taskId: string;
    task: Task;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onTaskUpdated: (task: Task) => void;
  }
  
  export interface FilterPanelProps {
    filters: TaskFilters | ControlFilters;
    onFiltersChange: (filters: any) => void;
    uniqueOwners: string[];
    type?: 'task' | 'control';
  }
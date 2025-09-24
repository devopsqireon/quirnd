// /app/risk/treatment-plan/[id]/types/index.ts

export interface Risk {
    id: string;
    title: string;
    description: string;
    category: string;
    subcategory: string;
    likelihood: number;
    impact: number;
    riskScore: number;
    riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
    owner: string;
    department: string;
    status: 'Open' | 'In Progress' | 'Mitigated' | 'Accepted' | 'Closed';
    createdDate: string;
    lastReviewed: string;
    nextReviewDate: string;
  }
  
  export interface TreatmentPlan {
    id: string;
    riskId: string;
    title: string;
    description: string;
    strategy: 'Accept' | 'Avoid' | 'Mitigate' | 'Transfer';
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    status: 'Draft' | 'In Progress' | 'Completed' | 'On Hold' | 'Cancelled';
    owner: string;
    assignedTo: string[];
    startDate: string;
    targetDate: string;
    completionDate?: string;
    budget?: number;
    approvedBy?: string;
    approvalDate?: string;
    createdDate: string;
    lastUpdated: string;
    version: number;
    tags: string[];
  }
  
  export interface ActionItem {
    id: string;
    treatmentPlanId: string;
    title: string;
    description: string;
    type: 'Control Implementation' | 'Process Change' | 'Training' | 'Documentation' | 'Technical' | 'Other';
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    status: 'Not Started' | 'In Progress' | 'Completed' | 'Blocked' | 'Cancelled';
    assignedTo: string;
    startDate: string;
    dueDate: string;
    completedDate?: string;
    progress: number;
    estimatedEffort?: number;
    actualEffort?: number;
    dependencies: string[];
    blockers: string[];
    notes: string;
    attachments: Attachment[];
  }
  
  export interface Milestone {
    id: string;
    treatmentPlanId: string;
    title: string;
    description: string;
    targetDate: string;
    completedDate?: string;
    status: 'Upcoming' | 'In Progress' | 'Completed' | 'Overdue';
    criteria: string[];
    dependencies: string[];
  }
  
  export interface RiskAssessment {
    id: string;
    treatmentPlanId: string;
    assessmentType: 'Initial' | 'Current' | 'Residual' | 'Projected';
    likelihood: number;
    impact: number;
    riskScore: number;
    riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
    assessmentDate: string;
    assessedBy: string;
    notes: string;
    evidenceLinks: string[];
  }
  
  export interface TreatmentMetrics {
    id: string;
    treatmentPlanId: string;
    metricName: string;
    metricType: 'KPI' | 'KRI' | 'Effectiveness' | 'Efficiency';
    targetValue: number;
    currentValue: number;
    unit: string;
    measurementDate: string;
    trend: 'Improving' | 'Stable' | 'Declining';
    thresholds: {
      green: number;
      amber: number;
      red: number;
    };
  }
  
  export interface Document {
    id: string;
    name: string;
    type: 'Policy' | 'Procedure' | 'Evidence' | 'Report' | 'Other';
    url: string;
    uploadedBy: string;
    uploadedDate: string;
    size: number;
    version: string;
  }
  
  export interface Attachment {
    id: string;
    name: string;
    type: string;
    url: string;
    size: number;
    uploadedBy: string;
    uploadedDate: string;
  }
  
  export interface Comment {
    id: string;
    entityId: string;
    entityType: 'treatment' | 'action' | 'milestone';
    author: string;
    content: string;
    createdDate: string;
    updatedDate?: string;
    mentions: string[];
    attachments: Attachment[];
  }
  
  export interface ActivityLog {
    id: string;
    treatmentPlanId: string;
    action: string;
    description: string;
    performedBy: string;
    timestamp: string;
    entityType: 'treatment' | 'action' | 'milestone' | 'document';
    entityId: string;
    previousValue?: any;
    newValue?: any;
  }
  
  export interface TreatmentDetails {
    risk: Risk;
    treatmentPlan: TreatmentPlan;
    actionItems: ActionItem[];
    milestones: Milestone[];
    riskAssessments: RiskAssessment[];
    metrics: TreatmentMetrics[];
    documents: Document[];
    comments: Comment[];
    activityLog: ActivityLog[];
  }
  
  export interface FilterOptions {
    status: string[];
    priority: string[];
    assignedTo: string[];
    type: string[];
    dateRange: {
      start: string;
      end: string;
    };
  }
  
  export interface SortOption {
    field: string;
    direction: 'asc' | 'desc';
  }
  
  export interface ViewMode {
    type: 'overview' | 'actions' | 'timeline' | 'metrics' | 'documents' | 'activity';
    subView?: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    department: string;
    role: string;
    avatar?: string;
  }
  
  export interface NotificationSettings {
    emailUpdates: boolean;
    statusChanges: boolean;
    dueDateReminders: boolean;
    mentions: boolean;
  }
  
  // Context Types
  export interface TreatmentDetailsContextType {
    treatmentDetails: TreatmentDetails | null;
    loading: boolean;
    error: string | null;
    viewMode: ViewMode;
    filterOptions: FilterOptions;
    sortOption: SortOption;
    selectedItems: string[];
    setViewMode: (mode: ViewMode) => void;
    setFilterOptions: (options: FilterOptions) => void;
    setSortOption: (option: SortOption) => void;
    setSelectedItems: (items: string[]) => void;
    refreshData: () => Promise<void>;
    updateTreatmentPlan: (updates: Partial<TreatmentPlan>) => Promise<void>;
    updateActionItem: (id: string, updates: Partial<ActionItem>) => Promise<void>;
    addComment: (comment: Omit<Comment, 'id' | 'createdDate'>) => Promise<void>;
    uploadDocument: (file: File, type: string) => Promise<void>;
  }
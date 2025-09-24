// src/types/improvement-readiness.ts

// Base interfaces
export interface Owner {
    name: string;
    department: string;
    avatar: string;
  }
  
  export interface Participant {
    name: string;
    avatar: string;
  }
  
  // Statistics interface
  export interface Statistics {
    openCorrectiveActions: number;
    overdueActions: number;
    improvementOpportunities: number;
    inProgressImprovements: number;
    scheduledReviews: number;
    nextReviewDate: string;
    certificationProgress: number;
  }
  
  // Corrective Actions
  export interface CorrectiveAction {
    id: string;
    title: string;
    description: string;
    owner: Owner;
    status: 'Open' | 'In Progress' | 'Under Review' | 'Closed' | 'Overdue';
    priority: 'Critical' | 'High' | 'Medium' | 'Low';
    dueDate: string;
    daysOverdue?: number;
    linkedItems: string[];
    createdDate: string;
    updatedDate: string;
  }
  
  // Improvement Opportunities
  export interface ImprovementOpportunity {
    id: string;
    title: string;
    description: string;
    category: 'Security' | 'Operations' | 'Process' | 'Technology';
    owner: Owner;
    status: 'Open' | 'In Progress' | 'Closed';
    priority: 'High' | 'Medium' | 'Low';
    linkedControl?: string;
    createdDate: string;
    updatedDate: string;
  }
  
  // Management Reviews
  export interface ManagementReview {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location?: string;
    participants: Participant[];
    status: 'Scheduled' | 'Completed' | 'Cancelled';
    outcomes?: number;
    hasReport?: boolean;
    agenda?: string;
    createdDate: string;
  }
  
  // Certification Dashboard
  export interface TopRisk {
    name: string;
    description: string;
    severity: 'Critical' | 'High' | 'Medium';
    openActions: number;
  }
  
  export interface RecentActivity {
    type: 'completed' | 'uploaded' | 'overdue' | 'scheduled';
    description: string;
    user?: string;
    time: string;
  }
  
  export interface CertificationData {
    riskCoverage: number;
    controlImplementation: number;
    overdueTasks: number;
    criticalTasks: number;
    highTasks: number;
    evidenceGaps: number;
    documentGaps: number;
    testGaps: number;
    topRisks: TopRisk[];
    recentActivities: RecentActivity[];
  }
  
  // Main data interface
  export interface ImprovementReadinessData {
    statistics: Statistics;
    correctiveActions: CorrectiveAction[];
    improvementOpportunities: ImprovementOpportunity[];
    managementReviews: ManagementReview[];
    certificationData: CertificationData;
  }
  
  // Form interfaces
  export interface CorrectiveActionFormData {
    title: string;
    description: string;
    priority: string;
    owner: string;
    dueDate: string;
    linkedItems: string[];
  }
  
  export interface ImprovementFormData {
    title: string;
    description: string;
    category: string;
    owner: string;
    priority: string;
    linkedControl: string;
  }
  
  export interface ReviewFormData {
    title: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    participants: string[];
    agenda: string;
  }
  
  // Filter interfaces
  export interface CorrectiveActionFilters {
    status?: string;
    owner?: string;
    priority?: string;
    dueDateRange?: {
      from?: string;
      to?: string;
    };
  }
  
  export interface ImprovementFilters {
    status?: string;
    owner?: string;
    category?: string;
    priority?: string;
  }
  
  export interface ReviewFilters {
    status?: string;
    dateRange?: {
      from?: string;
      to?: string;
    };
    participants?: string[];
  }
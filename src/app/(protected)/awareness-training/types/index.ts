// /app/awareness-training/types/index.ts

export interface TrainingProgram {
    id: string;
    title: string;
    category: 'security-awareness' | 'compliance' | 'technical' | 'soft-skills';
    description: string;
    duration: number; // minutes
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    createdDate: string;
    lastUpdated: string;
    isActive: boolean;
    completionRate: number;
    totalAssignments: number;
    tags: string[];
    content?: TrainingContent;
    prerequisites?: string[];
    learningObjectives?: string[];
    certificateTemplate?: string;
  }
  
  export interface TrainingContent {
    modules: TrainingModule[];
    totalSlides: number;
    estimatedDuration: number;
    hasQuiz: boolean;
    passingScore: number;
  }
  
  export interface TrainingModule {
    id: string;
    title: string;
    slides: number;
    duration: number; // minutes
    type: 'presentation' | 'video' | 'interactive' | 'quiz';
  }
  
  export interface Assignment {
    id: string;
    trainingId: string;
    trainingTitle: string;
    assigneeId: string;
    assigneeName: string;
    assigneeEmail: string;
    department: string;
    role: string;
    assignedDate: string;
    dueDate: string;
    status: 'not-started' | 'in-progress' | 'completed' | 'overdue';
    progress: number;
    assignedBy: string;
    assignedById: string;
    priority: 'low' | 'medium' | 'high';
    reminders: AssignmentReminder[];
    notes?: string;
  }
  
  export interface AssignmentReminder {
    id: string;
    type: 'email' | 'system' | 'manager';
    sentDate: string;
    status: 'sent' | 'pending' | 'failed';
  }
  
  export interface CompletionLog {
    id: string;
    trainingId: string;
    trainingTitle: string;
    userId: string;
    userName: string;
    userEmail: string;
    department: string;
    role: string;
    completedDate: string;
    score: number;
    timeSpent: number; // minutes
    certificateId?: string;
    attempts: number;
    startedDate: string;
    lastAccessDate: string;
    ipAddress?: string;
    deviceInfo?: string;
    moduleProgress: ModuleProgress[];
  }
  
  export interface ModuleProgress {
    moduleId: string;
    moduleName: string;
    completed: boolean;
    timeSpent: number;
    score?: number;
    completedDate?: string;
  }
  
  export interface TrainingReport {
    id: string;
    title: string;
    type: 'completion' | 'compliance' | 'performance' | 'detailed';
    generatedDate: string;
    generatedBy: string;
    parameters: ReportParameters;
    data: any;
    exportFormats: ('pdf' | 'excel' | 'csv')[];
  }
  
  export interface ReportParameters {
    dateRange: {
      start: string;
      end: string;
    };
    departments?: string[];
    trainingCategories?: string[];
    includeScores?: boolean;
    includeTimeSpent?: boolean;
    includeCertificates?: boolean;
  }
  
  export interface TrainingMetrics {
    totalPrograms: number;
    activeAssignments: number;
    completionRate: number;
    averageScore: number;
    overdueAssignments: number;
    certificatesIssued: number;
    totalTimeSpent: number; // minutes
    complianceRate: number;
  }
  
  export interface DepartmentMetrics {
    department: string;
    totalEmployees: number;
    assignedTrainings: number;
    completedTrainings: number;
    completionRate: number;
    averageScore: number;
    overdueCount: number;
  }
  
  export interface TrainingFilter {
    search?: string;
    category?: string;
    difficulty?: string;
    status?: string;
    department?: string;
    assignedBy?: string;
    dateRange?: {
      start: string;
      end: string;
    };
    tags?: string[];
  }
  
  export interface AssignmentFilter {
    search?: string;
    status?: string;
    department?: string;
    priority?: string;
    assignedBy?: string;
    trainingCategory?: string;
    dueDate?: {
      start: string;
      end: string;
    };
  }
  
  export interface CompletionFilter {
    search?: string;
    department?: string;
    trainingCategory?: string;
    scoreRange?: {
      min: number;
      max: number;
    };
    completedDate?: {
      start: string;
      end: string;
    };
    certificateStatus?: 'issued' | 'not-issued';
  }
  
  export interface BulkAssignmentRequest {
    trainingId: string;
    assigneeIds: string[];
    dueDate: string;
    priority: 'low' | 'medium' | 'high';
    notes?: string;
    sendNotification: boolean;
  }
  
  export interface TrainingCreateRequest {
    title: string;
    category: string;
    description: string;
    difficulty: string;
    estimatedDuration: number;
    tags: string[];
    content: TrainingContent;
    isActive: boolean;
    prerequisites?: string[];
    learningObjectives?: string[];
  }
  
  export interface CertificateTemplate {
    id: string;
    name: string;
    template: string; // Base64 or URL
    variables: string[]; // e.g., ['userName', 'trainingTitle', 'completionDate', 'score']
    isDefault: boolean;
  }
  
  // UI Component Props Types
  export interface TrainingCardProps {
    training: TrainingProgram;
    onView: (id: string) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onAssign: (id: string) => void;
  }
  
  export interface AssignmentTableProps {
    assignments: Assignment[];
    onView: (id: string) => void;
    onEdit: (id: string) => void;
    onBulkAction: (action: string, ids: string[]) => void;
    filters: AssignmentFilter;
    onFiltersChange: (filters: AssignmentFilter) => void;
  }
  
  export interface CompletionLogTableProps {
    logs: CompletionLog[];
    onView: (id: string) => void;
    onExport: () => void;
    filters: CompletionFilter;
    onFiltersChange: (filters: CompletionFilter) => void;
  }
  
  export interface ReportsChartsProps {
    metrics: TrainingMetrics;
    departmentMetrics: DepartmentMetrics[];
    onExport: (format: string) => void;
  }
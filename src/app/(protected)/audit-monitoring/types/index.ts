// /app/(protected)/audit-monitoring/types/index.ts

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    department?: string;
  }
  
  export interface AuditLog {
    id: string;
    timestamp: Date;
    user: string;
    action: string;
    resource: string;
    category: 'access' | 'modification' | 'deletion' | 'creation' | 'security' | 'system';
    severity: 'low' | 'medium' | 'high' | 'critical';
    details: string;
    ip: string;
    status: 'success' | 'failed' | 'warning';
    metadata?: Record<string, any>;
  }
  
  export interface Evidence {
    id: string;
    name: string;
    type: 'document' | 'screenshot' | 'video' | 'certificate' | 'report' | 'policy' | 'procedure' | 'other';
    category: string;
    uploadDate: Date;
    uploadedBy: string;
    fileSize: number;
    filePath?: string;
    mimeType?: string;
    tags: string[];
    linkedAudits: string[];
    linkedControls?: string[];
    status: 'verified' | 'pending' | 'rejected' | 'archived';
    description: string;
    retention: Date;
    version?: string;
    approvedBy?: string;
    approvedDate?: Date;
    checksum?: string;
  }
  
  export interface MonitoringReport {
    id: string;
    name: string;
    type: 'risk-assessment' | 'control-effectiveness' | 'training-coverage' | 'compliance-status' | 'incident-summary' | 'audit-summary';
    generatedDate: Date;
    generatedBy: string;
    period: string;
    status: 'draft' | 'published' | 'archived' | 'scheduled';
    metrics: {
      [key: string]: number | string;
    };
    findings: Finding[];
    recommendations: Recommendation[];
    charts?: ChartData[];
    scheduledFor?: Date;
    recipients?: string[];
  }
  
  export interface Finding {
    id: string;
    title: string;
    description: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    category: string;
    evidence?: string[];
    status: 'open' | 'in-progress' | 'resolved' | 'acknowledged';
    assignedTo?: string;
    dueDate?: Date;
    createdDate: Date;
  }
  
  export interface Recommendation {
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    category: string;
    estimatedEffort?: string;
    estimatedCost?: number;
    targetDate?: Date;
    status: 'proposed' | 'approved' | 'in-progress' | 'completed' | 'rejected';
    assignedTo?: string;
    relatedFindings?: string[];
  }
  
  export interface InternalAudit {
    id: string;
    title: string;
    description?: string;
    scope: string;
    auditType: 'internal' | 'external' | 'compliance' | 'security' | 'operational' | 'financial';
    standard?: string; // ISO 27001, SOC 2, etc.
    status: 'planned' | 'in-progress' | 'completed' | 'on-hold' | 'cancelled';
    priority: 'low' | 'medium' | 'high' | 'critical';
    scheduledDate: Date;
    completedDate?: Date;
    auditor: string;
    auditTeam?: string[];
    findings: number;
    actions: number;
    progress: number;
    nextReview?: Date;
    evidenceCount: number;
    budget?: number;
    actualCost?: number;
    correctiveActions: CorrectiveAction[];
    nonConformities?: NonConformity[];
  }
  
  export interface CorrectiveAction {
    id: string;
    auditId: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    status: 'planned' | 'in-progress' | 'completed' | 'overdue' | 'cancelled';
    assignedTo: string;
    dueDate: Date;
    completedDate?: Date;
    evidence?: string[];
    cost?: number;
    relatedFinding?: string;
  }
  
  export interface NonConformity {
    id: string;
    auditId: string;
    title: string;
    description: string;
    clause: string; // Standard clause reference
    severity: 'minor' | 'major' | 'critical';
    status: 'open' | 'in-progress' | 'resolved' | 'verified';
    identifiedDate: Date;
    dueDate: Date;
    resolvedDate?: Date;
    rootCause?: string;
    correctiveActions: string[];
    evidence?: string[];
  }
  
  export interface ChartData {
    id: string;
    title: string;
    type: 'line' | 'bar' | 'pie' | 'doughnut' | 'area' | 'heatmap';
    data: any[];
    labels?: string[];
    datasets?: any[];
    options?: any;
  }
  
  export interface AuditLogFilters {
    category?: string[];
    severity?: string[];
    status?: string[];
    dateRange?: {
      start: Date;
      end: Date;
    };
    user?: string[];
    resource?: string;
  }
  
  export interface EvidenceFilters {
    type?: string[];
    category?: string[];
    status?: string[];
    uploadDateRange?: {
      start: Date;
      end: Date;
    };
    tags?: string[];
    linkedAudits?: string[];
  }
  
  export interface AuditFilters {
    auditType?: string[];
    status?: string[];
    priority?: string[];
    auditor?: string[];
    scheduledDateRange?: {
      start: Date;
      end: Date;
    };
    standard?: string[];
  }
  
  export interface ExportOptions {
    format: 'csv' | 'excel' | 'pdf' | 'json';
    includeFilters: boolean;
    selectedFields?: string[];
    dateRange?: {
      start: Date;
      end: Date;
    };
  }
  
  export interface PaginationOptions {
    page: number;
    pageSize: number;
    total: number;
  }
  
  export interface SortOptions {
    field: string;
    direction: 'asc' | 'desc';
  }
  
  export interface BulkActionOptions {
    action: 'delete' | 'export' | 'update-status' | 'assign' | 'tag';
    items: string[];
    params?: Record<string, any>;
  }
  
  // Response types for API calls
  export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
    errors?: string[];
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
      page: number;
      pageSize: number;
      total: number;
      totalPages: number;
    };
    success: boolean;
    message?: string;
  }
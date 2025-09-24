// /app/(protected)/audit-monitoring/constants/index.ts

export const AUDIT_LOG_CATEGORIES = {
    ACCESS: 'access',
    MODIFICATION: 'modification',
    DELETION: 'deletion',
    CREATION: 'creation',
    SECURITY: 'security',
    SYSTEM: 'system'
  } as const;
  
  export const SEVERITY_LEVELS = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical'
  } as const;
  
  export const AUDIT_LOG_STATUS = {
    SUCCESS: 'success',
    FAILED: 'failed',
    WARNING: 'warning'
  } as const;
  
  export const EVIDENCE_TYPES = {
    DOCUMENT: 'document',
    SCREENSHOT: 'screenshot',
    VIDEO: 'video',
    CERTIFICATE: 'certificate',
    REPORT: 'report',
    POLICY: 'policy',
    PROCEDURE: 'procedure',
    OTHER: 'other'
  } as const;
  
  export const EVIDENCE_STATUS = {
    VERIFIED: 'verified',
    PENDING: 'pending',
    REJECTED: 'rejected',
    ARCHIVED: 'archived'
  } as const;
  
  export const REPORT_TYPES = {
    RISK_ASSESSMENT: 'risk-assessment',
    CONTROL_EFFECTIVENESS: 'control-effectiveness',
    TRAINING_COVERAGE: 'training-coverage',
    COMPLIANCE_STATUS: 'compliance-status',
    INCIDENT_SUMMARY: 'incident-summary',
    AUDIT_SUMMARY: 'audit-summary'
  } as const;
  
  export const REPORT_STATUS = {
    DRAFT: 'draft',
    PUBLISHED: 'published',
    ARCHIVED: 'archived',
    SCHEDULED: 'scheduled'
  } as const;
  
  export const AUDIT_TYPES = {
    INTERNAL: 'internal',
    EXTERNAL: 'external',
    COMPLIANCE: 'compliance',
    SECURITY: 'security',
    OPERATIONAL: 'operational',
    FINANCIAL: 'financial'
  } as const;
  
  export const AUDIT_STATUS = {
    PLANNED: 'planned',
    IN_PROGRESS: 'in-progress',
    COMPLETED: 'completed',
    ON_HOLD: 'on-hold',
    CANCELLED: 'cancelled'
  } as const;
  
  export const PRIORITY_LEVELS = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical'
  } as const;
  
  export const CORRECTIVE_ACTION_STATUS = {
    PLANNED: 'planned',
    IN_PROGRESS: 'in-progress',
    COMPLETED: 'completed',
    OVERDUE: 'overdue',
    CANCELLED: 'cancelled'
  } as const;
  
  export const NON_CONFORMITY_SEVERITY = {
    MINOR: 'minor',
    MAJOR: 'major',
    CRITICAL: 'critical'
  } as const;
  
  export const NON_CONFORMITY_STATUS = {
    OPEN: 'open',
    IN_PROGRESS: 'in-progress',
    RESOLVED: 'resolved',
    VERIFIED: 'verified'
  } as const;
  
  export const FINDING_STATUS = {
    OPEN: 'open',
    IN_PROGRESS: 'in-progress',
    RESOLVED: 'resolved',
    ACKNOWLEDGED: 'acknowledged'
  } as const;
  
  export const RECOMMENDATION_STATUS = {
    PROPOSED: 'proposed',
    APPROVED: 'approved',
    IN_PROGRESS: 'in-progress',
    COMPLETED: 'completed',
    REJECTED: 'rejected'
  } as const;
  
  // ISO 27001 Compliance Clauses
  export const ISO_27001_CLAUSES = {
    CLAUSE_7_5: '7.5', // Documented Information
    CLAUSE_9_1: '9.1', // Monitoring, measurement, analysis and evaluation
    CLAUSE_9_2: '9.2', // Internal audit
    CLAUSE_9_3: '9.3'  // Management review
  } as const;
  
  // Color mappings for UI
  export const SEVERITY_COLORS = {
    [SEVERITY_LEVELS.CRITICAL]: 'bg-red-100 text-red-800 border-red-200',
    [SEVERITY_LEVELS.HIGH]: 'bg-orange-100 text-orange-800 border-orange-200',
    [SEVERITY_LEVELS.MEDIUM]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    [SEVERITY_LEVELS.LOW]: 'bg-green-100 text-green-800 border-green-200'
  } as const;
  
  export const STATUS_COLORS = {
    // Audit Log Status
    [AUDIT_LOG_STATUS.SUCCESS]: 'bg-green-100 text-green-800 border-green-200',
    [AUDIT_LOG_STATUS.WARNING]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    [AUDIT_LOG_STATUS.FAILED]: 'bg-red-100 text-red-800 border-red-200',
    
    // Evidence Status
    [EVIDENCE_STATUS.VERIFIED]: 'bg-green-100 text-green-800 border-green-200',
    [EVIDENCE_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    [EVIDENCE_STATUS.REJECTED]: 'bg-red-100 text-red-800 border-red-200',
    [EVIDENCE_STATUS.ARCHIVED]: 'bg-gray-100 text-gray-800 border-gray-200',
    
    // Audit Status
    [AUDIT_STATUS.PLANNED]: 'bg-purple-100 text-purple-800 border-purple-200',
    [AUDIT_STATUS.IN_PROGRESS]: 'bg-blue-100 text-blue-800 border-blue-200',
    [AUDIT_STATUS.COMPLETED]: 'bg-green-100 text-green-800 border-green-200',
    [AUDIT_STATUS.ON_HOLD]: 'bg-orange-100 text-orange-800 border-orange-200',
    [AUDIT_STATUS.CANCELLED]: 'bg-red-100 text-red-800 border-red-200',
    
    // Report Status
    [REPORT_STATUS.DRAFT]: 'bg-gray-100 text-gray-800 border-gray-200',
    [REPORT_STATUS.PUBLISHED]: 'bg-blue-100 text-blue-800 border-blue-200',
    [REPORT_STATUS.ARCHIVED]: 'bg-slate-100 text-slate-800 border-slate-200',
    [REPORT_STATUS.SCHEDULED]: 'bg-purple-100 text-purple-800 border-purple-200'
  } as const;
  
  export const PRIORITY_COLORS = {
    [PRIORITY_LEVELS.CRITICAL]: 'bg-red-100 text-red-800 border-red-200',
    [PRIORITY_LEVELS.HIGH]: 'bg-orange-100 text-orange-800 border-orange-200',
    [PRIORITY_LEVELS.MEDIUM]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    [PRIORITY_LEVELS.LOW]: 'bg-green-100 text-green-800 border-green-200'
  } as const;
  
  // Export formats
  export const EXPORT_FORMATS = {
    CSV: 'csv',
    EXCEL: 'excel',
    PDF: 'pdf',
    JSON: 'json'
  } as const;
  
  // Pagination defaults
  export const PAGINATION_DEFAULTS = {
    PAGE_SIZE: 20,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
    MAX_PAGE_SIZE: 1000
  } as const;
  
  // File size limits
  export const FILE_SIZE_LIMITS = {
    MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
    MAX_TOTAL_SIZE: 500 * 1024 * 1024, // 500MB total per upload session
    ALLOWED_TYPES: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/jpeg',
      'image/png',
      'image/gif',
      'text/plain',
      'text/csv'
    ]
  } as const;
  
  // Retention periods (in years)
  export const RETENTION_PERIODS = {
    DEFAULT: 7,
    CRITICAL_EVIDENCE: 10,
    COMPLIANCE_RECORDS: 7,
    AUDIT_LOGS: 3,
    TRAINING_RECORDS: 5
  } as const;
  
  // Compliance standards
  export const COMPLIANCE_STANDARDS = {
    ISO_27001: 'ISO 27001:2022',
    SOC_2: 'SOC 2 Type II',
    GDPR: 'GDPR',
    HIPAA: 'HIPAA',
    PCI_DSS: 'PCI DSS',
    NIST: 'NIST Cybersecurity Framework',
    SOX: 'Sarbanes-Oxley Act'
  } as const;
  
  // Chart types for reports
  export const CHART_TYPES = {
    LINE: 'line',
    BAR: 'bar',
    PIE: 'pie',
    DOUGHNUT: 'doughnut',
    AREA: 'area',
    HEATMAP: 'heatmap',
    SCATTER: 'scatter'
  } as const;
  
  // Notification types
  export const NOTIFICATION_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
  } as const;
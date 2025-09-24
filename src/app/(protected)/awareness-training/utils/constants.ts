// /app/awareness-training/utils/constants.ts

export const TRAINING_CATEGORIES = {
    'security-awareness': {
      label: 'Security Awareness',
      color: 'bg-red-100 text-red-800',
      icon: '🛡️'
    },
    'compliance': {
      label: 'Compliance',
      color: 'bg-blue-100 text-blue-800',
      icon: '📋'
    },
    'technical': {
      label: 'Technical',
      color: 'bg-green-100 text-green-800',
      icon: '⚙️'
    },
    'soft-skills': {
      label: 'Soft Skills',
      color: 'bg-purple-100 text-purple-800',
      icon: '🤝'
    }
  } as const;
  
  export const DIFFICULTY_LEVELS = {
    'beginner': {
      label: 'Beginner',
      color: 'bg-green-100 text-green-800',
      description: 'Basic concepts and introductory material'
    },
    'intermediate': {
      label: 'Intermediate',
      color: 'bg-yellow-100 text-yellow-800',
      description: 'Moderate complexity requiring some prior knowledge'
    },
    'advanced': {
      label: 'Advanced',
      color: 'bg-red-100 text-red-800',
      description: 'Complex topics requiring extensive background'
    }
  } as const;
  
  export const ASSIGNMENT_STATUS = {
    'not-started': {
      label: 'Not Started',
      color: 'bg-gray-100 text-gray-800',
      icon: 'Clock',
      description: 'Training has been assigned but not yet started'
    },
    'in-progress': {
      label: 'In Progress',
      color: 'bg-blue-100 text-blue-800',
      icon: 'AlertCircle',
      description: 'Training is currently being completed'
    },
    'completed': {
      label: 'Completed',
      color: 'bg-green-100 text-green-800',
      icon: 'CheckCircle',
      description: 'Training has been successfully completed'
    },
    'overdue': {
      label: 'Overdue',
      color: 'bg-red-100 text-red-800',
      icon: 'XCircle',
      description: 'Training has passed its due date without completion'
    }
  } as const;
  
  export const PRIORITY_LEVELS = {
    'low': {
      label: 'Low',
      color: 'bg-gray-100 text-gray-800',
      order: 1
    },
    'medium': {
      label: 'Medium',
      color: 'bg-yellow-100 text-yellow-800',
      order: 2
    },
    'high': {
      label: 'High',
      color: 'bg-red-100 text-red-800',
      order: 3
    }
  } as const;
  
  export const DEPARTMENTS = [
    'Engineering',
    'Marketing',
    'Sales',
    'HR',
    'Finance',
    'Operations',
    'Legal',
    'IT Support',
    'Product',
    'Customer Success'
  ] as const;
  
  export const ROLES = [
    'Manager',
    'Senior Developer',
    'Developer',
    'Analyst',
    'Coordinator',
    'Specialist',
    'Director',
    'VP',
    'C-Level',
    'Intern'
  ] as const;
  
  export const TRAINING_TAGS = [
    'ISO 27001',
    'Security Awareness',
    'Compliance',
    'GDPR',
    'Data Privacy',
    'Phishing',
    'Email Security',
    'Threat Detection',
    'Incident Response',
    'Access Control',
    'Cryptography',
    'Network Security',
    'Mobile Security',
    'Cloud Security',
    'Risk Management',
    'Business Continuity',
    'Vendor Management',
    'Legal Requirements',
    'Audit Preparation',
    'Leadership',
    'Communication',
    'Project Management'
  ] as const;
  
  export const REPORT_TYPES = {
    'completion': {
      label: 'Completion Report',
      description: 'Training completion status and progress',
      icon: 'CheckCircle'
    },
    'compliance': {
      label: 'Compliance Report',
      description: 'Regulatory compliance and certification status',
      icon: 'Shield'
    },
    'performance': {
      label: 'Performance Report',
      description: 'Scores, time spent, and performance metrics',
      icon: 'TrendingUp'
    },
    'detailed': {
      label: 'Detailed Report',
      description: 'Comprehensive analysis with all data points',
      icon: 'FileText'
    }
  } as const;
  
  export const EXPORT_FORMATS = [
    { value: 'pdf', label: 'PDF Document', icon: 'FileText' },
    { value: 'excel', label: 'Excel Spreadsheet', icon: 'Table' },
    { value: 'csv', label: 'CSV File', icon: 'Download' }
  ] as const;
  
  export const CHART_COLORS = {
    primary: '#3B82F6',
    secondary: '#10B981',
    accent: '#F59E0B',
    danger: '#EF4444',
    warning: '#F59E0B',
    info: '#06B6D4',
    success: '#10B981',
    gray: '#6B7280'
  } as const;
  
  export const DATE_FORMATS = {
    display: 'MMM dd, yyyy',
    input: 'yyyy-MM-dd',
    full: 'MMMM dd, yyyy HH:mm',
    short: 'MM/dd/yyyy'
  } as const;
  
  export const PAGINATION_SIZES = [10, 25, 50, 100] as const;
  
  export const REMINDER_TYPES = {
    'email': {
      label: 'Email Reminder',
      description: 'Send email notification to trainee'
    },
    'system': {
      label: 'System Notification',
      description: 'Show in-app notification'
    },
    'manager': {
      label: 'Manager Notification',
      description: 'Notify trainee\'s manager'
    }
  } as const;
  
  export const CERTIFICATE_STATUS = {
    'issued': {
      label: 'Issued',
      color: 'bg-green-100 text-green-800'
    },
    'not-issued': {
      label: 'Not Issued',
      color: 'bg-gray-100 text-gray-800'
    },
    'revoked': {
      label: 'Revoked',
      color: 'bg-red-100 text-red-800'
    }
  } as const;
  
  export const MODULE_TYPES = {
    'presentation': {
      label: 'Presentation',
      icon: 'Presentation',
      description: 'Slide-based content'
    },
    'video': {
      label: 'Video',
      icon: 'Video',
      description: 'Video-based learning'
    },
    'interactive': {
      label: 'Interactive',
      icon: 'MousePointer',
      description: 'Interactive exercises and simulations'
    },
    'quiz': {
      label: 'Quiz',
      icon: 'HelpCircle',
      description: 'Assessment and testing'
    }
  } as const;
  
  // ISO 27001 Clause mapping for training requirements
  export const ISO_27001_CLAUSES = {
    '7.2': {
      title: 'Competence',
      description: 'Ensure persons are competent on the basis of appropriate education, training, or experience',
      requirements: [
        'Determine necessary competence',
        'Ensure competence through training',
        'Evaluate effectiveness of training',
        'Retain documented information'
      ]
    },
    '7.3': {
      title: 'Awareness',
      description: 'Ensure awareness of information security policy and their contribution to ISMS effectiveness',
      requirements: [
        'Information security policy awareness',
        'Understanding of ISMS contribution',
        'Awareness of security implications',
        'Consequences of non-conformity'
      ]
    }
  } as const;
// /app/awareness-training/data/sample-data.ts

import { TrainingProgram, Assignment, CompletionLog, TrainingContent, ModuleProgress } from '../types';

export const sampleTrainingPrograms: TrainingProgram[] = [
  {
    id: 'tr-001',
    title: 'ISO 27001 Security Awareness Fundamentals',
    category: 'security-awareness',
    description: 'Comprehensive introduction to information security management systems and employee responsibilities under ISO 27001 framework.',
    duration: 45,
    difficulty: 'beginner',
    createdDate: '2024-01-15',
    lastUpdated: '2024-09-01',
    isActive: true,
    completionRate: 87,
    totalAssignments: 156,
    tags: ['ISO 27001', 'Security Awareness', 'Compliance', 'ISMS'],
    prerequisites: [],
    learningObjectives: [
      'Understand ISO 27001 framework and requirements',
      'Identify key security responsibilities',
      'Recognize security threats and vulnerabilities',
      'Apply security best practices in daily work'
    ],
    content: {
      modules: [
        {
          id: 'mod-001-1',
          title: 'Introduction to ISO 27001',
          slides: 12,
          duration: 15,
          type: 'presentation'
        },
        {
          id: 'mod-001-2',
          title: 'Security Responsibilities',
          slides: 8,
          duration: 10,
          type: 'interactive'
        },
        {
          id: 'mod-001-3',
          title: 'Common Threats',
          slides: 15,
          duration: 15,
          type: 'video'
        },
        {
          id: 'mod-001-4',
          title: 'Knowledge Check',
          slides: 5,
          duration: 5,
          type: 'quiz'
        }
      ],
      totalSlides: 40,
      estimatedDuration: 45,
      hasQuiz: true,
      passingScore: 80
    }
  },
  {
    id: 'tr-002',
    title: 'Advanced Phishing Recognition & Response',
    category: 'security-awareness',
    description: 'Interactive training on identifying and responding to sophisticated phishing attempts and social engineering attacks.',
    duration: 30,
    difficulty: 'intermediate',
    createdDate: '2024-02-10',
    lastUpdated: '2024-08-15',
    isActive: true,
    completionRate: 92,
    totalAssignments: 89,
    tags: ['Phishing', 'Email Security', 'Threat Detection', 'Social Engineering'],
    prerequisites: ['tr-001'],
    learningObjectives: [
      'Identify sophisticated phishing techniques',
      'Analyze suspicious emails and links',
      'Implement proper incident response procedures',
      'Educate colleagues on phishing awareness'
    ],
    content: {
      modules: [
        {
          id: 'mod-002-1',
          title: 'Evolution of Phishing Attacks',
          slides: 10,
          duration: 8,
          type: 'presentation'
        },
        {
          id: 'mod-002-2',
          title: 'Interactive Phishing Simulation',
          slides: 5,
          duration: 12,
          type: 'interactive'
        },
        {
          id: 'mod-002-3',
          title: 'Response Procedures',
          slides: 8,
          duration: 7,
          type: 'video'
        },
        {
          id: 'mod-002-4',
          title: 'Final Assessment',
          slides: 3,
          duration: 3,
          type: 'quiz'
        }
      ],
      totalSlides: 26,
      estimatedDuration: 30,
      hasQuiz: true,
      passingScore: 85
    }
  },
  {
    id: 'tr-003',
    title: 'Data Privacy & GDPR Compliance',
    category: 'compliance',
    description: 'Essential training on data protection regulations, privacy principles, and GDPR compliance requirements for all employees.',
    duration: 60,
    difficulty: 'intermediate',
    createdDate: '2024-01-20',
    lastUpdated: '2024-07-30',
    isActive: true,
    completionRate: 78,
    totalAssignments: 134,
    tags: ['GDPR', 'Data Privacy', 'Compliance', 'Data Protection'],
    prerequisites: [],
    learningObjectives: [
      'Understand GDPR principles and requirements',
      'Identify personal data and processing activities',
      'Implement data protection by design',
      'Handle data subject requests properly'
    ],
    content: {
      modules: [
        {
          id: 'mod-003-1',
          title: 'GDPR Fundamentals',
          slides: 20,
          duration: 20,
          type: 'presentation'
        },
        {
          id: 'mod-003-2',
          title: 'Data Subject Rights',
          slides: 15,
          duration: 15,
          type: 'interactive'
        },
        {
          id: 'mod-003-3',
          title: 'Data Breach Response',
          slides: 12,
          duration: 18,
          type: 'video'
        },
        {
          id: 'mod-003-4',
          title: 'Compliance Assessment',
          slides: 7,
          duration: 7,
          type: 'quiz'
        }
      ],
      totalSlides: 54,
      estimatedDuration: 60,
      hasQuiz: true,
      passingScore: 80
    }
  },
  {
    id: 'tr-004',
    title: 'Cloud Security Best Practices',
    category: 'technical',
    description: 'Technical training for IT professionals on securing cloud infrastructure, services, and data in multi-cloud environments.',
    duration: 90,
    difficulty: 'advanced',
    createdDate: '2024-03-05',
    lastUpdated: '2024-08-20',
    isActive: true,
    completionRate: 65,
    totalAssignments: 45,
    tags: ['Cloud Security', 'AWS', 'Azure', 'Infrastructure', 'DevSecOps'],
    prerequisites: ['tr-001'],
    learningObjectives: [
      'Implement cloud security architecture',
      'Configure security controls and monitoring',
      'Manage identity and access in cloud environments',
      'Ensure compliance in cloud deployments'
    ],
    content: {
      modules: [
        {
          id: 'mod-004-1',
          title: 'Cloud Security Architecture',
          slides: 25,
          duration: 30,
          type: 'presentation'
        },
        {
          id: 'mod-004-2',
          title: 'Hands-on Security Configuration',
          slides: 10,
          duration: 35,
          type: 'interactive'
        },
        {
          id: 'mod-004-3',
          title: 'Case Studies and Best Practices',
          slides: 20,
          duration: 20,
          type: 'video'
        },
        {
          id: 'mod-004-4',
          title: 'Technical Assessment',
          slides: 5,
          duration: 5,
          type: 'quiz'
        }
      ],
      totalSlides: 60,
      estimatedDuration: 90,
      hasQuiz: true,
      passingScore: 85
    }
  },
  {
    id: 'tr-005',
    title: 'Incident Response & Crisis Management',
    category: 'security-awareness',
    description: 'Training on security incident identification, escalation procedures, and crisis management protocols.',
    duration: 40,
    difficulty: 'intermediate',
    createdDate: '2024-02-28',
    lastUpdated: '2024-09-05',
    isActive: true,
    completionRate: 83,
    totalAssignments: 98,
    tags: ['Incident Response', 'Crisis Management', 'Business Continuity', 'Emergency Procedures'],
    prerequisites: ['tr-001'],
    learningObjectives: [
      'Recognize security incidents and breaches',
      'Follow proper escalation procedures',
      'Participate in incident response activities',
      'Maintain business continuity during incidents'
    ]
  },
  {
    id: 'tr-006',
    title: 'Effective Communication & Leadership',
    category: 'soft-skills',
    description: 'Professional development training focusing on communication skills, leadership principles, and team collaboration.',
    duration: 75,
    difficulty: 'beginner',
    createdDate: '2024-04-10',
    lastUpdated: '2024-08-25',
    isActive: true,
    completionRate: 91,
    totalAssignments: 112,
    tags: ['Leadership', 'Communication', 'Teamwork', 'Professional Development'],
    prerequisites: [],
    learningObjectives: [
      'Develop effective communication strategies',
      'Practice active listening techniques',
      'Lead teams and manage conflicts',
      'Build professional relationships'
    ]
  }
];

export const sampleAssignments: Assignment[] = [
  {
    id: 'as-001',
    trainingId: 'tr-001',
    trainingTitle: 'ISO 27001 Security Awareness Fundamentals',
    assigneeId: 'u-001',
    assigneeName: 'John Smith',
    assigneeEmail: 'john.smith@qireon.com',
    department: 'Engineering',
    role: 'Senior Developer',
    assignedDate: '2024-09-01',
    dueDate: '2024-09-30',
    status: 'in-progress',
    progress: 65,
    assignedBy: 'Sarah Johnson',
    assignedById: 'u-admin-001',
    priority: 'high',
    reminders: [
      {
        id: 'rem-001',
        type: 'email',
        sentDate: '2024-09-15',
        status: 'sent'
      }
    ],
    notes: 'Required for security certification renewal'
  },
  {
    id: 'as-002',
    trainingId: 'tr-002',
    trainingTitle: 'Advanced Phishing Recognition',
    assigneeId: 'u-002',
    assigneeName: 'Emma Davis',
    assigneeEmail: 'emma.davis@qireon.com',
    department: 'Marketing',
    role: 'Marketing Manager',
    assignedDate: '2024-08-15',
    dueDate: '2024-09-15',
    status: 'overdue',
    progress: 30,
    assignedBy: 'Mike Chen',
    assignedById: 'u-admin-002',
    priority: 'medium',
    reminders: [
      {
        id: 'rem-002',
        type: 'email',
        sentDate: '2024-09-10',
        status: 'sent'
      },
      {
        id: 'rem-003',
        type: 'manager',
        sentDate: '2024-09-16',
        status: 'sent'
      }
    ]
  },
  {
    id: 'as-003',
    trainingId: 'tr-003',
    trainingTitle: 'Data Privacy & GDPR Compliance',
    assigneeId: 'u-003',
    assigneeName: 'Alex Wilson',
    assigneeEmail: 'alex.wilson@qireon.com',
    department: 'Sales',
    role: 'Account Manager',
    assignedDate: '2024-09-10',
    dueDate: '2024-10-10',
    status: 'completed',
    progress: 100,
    assignedBy: 'Sarah Johnson',
    assignedById: 'u-admin-001',
    priority: 'high',
    reminders: []
  },
  {
    id: 'as-004',
    trainingId: 'tr-004',
    trainingTitle: 'Cloud Security Best Practices',
    assigneeId: 'u-004',
    assigneeName: 'Lisa Chen',
    assigneeEmail: 'lisa.chen@qireon.com',
    department: 'IT Support',
    role: 'DevOps Engineer',
    assignedDate: '2024-08-20',
    dueDate: '2024-10-20',
    status: 'in-progress',
    progress: 45,
    assignedBy: 'Tech Lead',
    assignedById: 'u-admin-003',
    priority: 'high',
    reminders: [],
    notes: 'Technical role requires advanced certification'
  },
  {
    id: 'as-005',
    trainingId: 'tr-005',
    trainingTitle: 'Incident Response & Crisis Management',
    assigneeId: 'u-005',
    assigneeName: 'David Brown',
    assigneeEmail: 'david.brown@qireon.com',
    department: 'Finance',
    role: 'Financial Analyst',
    assignedDate: '2024-09-05',
    dueDate: '2024-10-05',
    status: 'not-started',
    progress: 0,
    assignedBy: 'Sarah Johnson',
    assignedById: 'u-admin-001',
    priority: 'medium',
    reminders: []
  },
  {
    id: 'as-006',
    trainingId: 'tr-006',
    trainingTitle: 'Effective Communication & Leadership',
    assigneeId: 'u-006',
    assigneeName: 'Maria Rodriguez',
    assigneeEmail: 'maria.rodriguez@qireon.com',
    department: 'HR',
    role: 'HR Coordinator',
    assignedDate: '2024-08-25',
    dueDate: '2024-09-25',
    status: 'completed',
    progress: 100,
    assignedBy: 'HR Director',
    assignedById: 'u-admin-004',
    priority: 'low',
    reminders: []
  },
  {
    id: 'as-007',
    trainingId: 'tr-001',
    trainingTitle: 'ISO 27001 Security Awareness Fundamentals',
    assigneeId: 'u-007',
    assigneeName: 'James Wilson',
    assigneeEmail: 'james.wilson@qireon.com',
    department: 'Operations',
    role: 'Operations Manager',
    assignedDate: '2024-09-12',
    dueDate: '2024-10-12',
    status: 'in-progress',
    progress: 25,
    assignedBy: 'Sarah Johnson',
    assignedById: 'u-admin-001',
    priority: 'high',
    reminders: []
  },
  {
    id: 'as-008',
    trainingId: 'tr-002',
    trainingTitle: 'Advanced Phishing Recognition',
    assigneeId: 'u-008',
    assigneeName: 'Sophie Turner',
    assigneeEmail: 'sophie.turner@qireon.com',
    department: 'Legal',
    role: 'Legal Counsel',
    assignedDate: '2024-08-30',
    dueDate: '2024-09-20',
    status: 'overdue',
    progress: 10,
    assignedBy: 'Mike Chen',
    assignedById: 'u-admin-002',
    priority: 'high',
    reminders: [
      {
        id: 'rem-004',
        type: 'email',
        sentDate: '2024-09-18',
        status: 'sent'
      }
    ]
  }
];

export const sampleCompletionLogs: CompletionLog[] = [
  {
    id: 'cl-001',
    trainingId: 'tr-001',
    trainingTitle: 'ISO 27001 Security Awareness Fundamentals',
    userId: 'u-003',
    userName: 'Alex Wilson',
    userEmail: 'alex.wilson@qireon.com',
    department: 'Sales',
    role: 'Account Manager',
    completedDate: '2024-09-18',
    score: 95,
    timeSpent: 42,
    certificateId: 'cert-001',
    attempts: 1,
    startedDate: '2024-09-10',
    lastAccessDate: '2024-09-18',
    ipAddress: '192.168.1.100',
    deviceInfo: 'Chrome 117.0.0.0 on Windows 10',
    moduleProgress: [
      {
        moduleId: 'mod-001-1',
        moduleName: 'Introduction to ISO 27001',
        completed: true,
        timeSpent: 14,
        completedDate: '2024-09-10'
      },
      {
        moduleId: 'mod-001-2',
        moduleName: 'Security Responsibilities',
        completed: true,
        timeSpent: 9,
        completedDate: '2024-09-12'
      },
      {
        moduleId: 'mod-001-3',
        moduleName: 'Common Threats',
        completed: true,
        timeSpent: 16,
        completedDate: '2024-09-15'
      },
      {
        moduleId: 'mod-001-4',
        moduleName: 'Knowledge Check',
        completed: true,
        timeSpent: 3,
        score: 95,
        completedDate: '2024-09-18'
      }
    ]
  },
  {
    id: 'cl-002',
    trainingId: 'tr-002',
    trainingTitle: 'Advanced Phishing Recognition',
    userId: 'u-004',
    userName: 'Lisa Chen',
    userEmail: 'lisa.chen@qireon.com',
    department: 'IT Support',
    role: 'DevOps Engineer',
    completedDate: '2024-09-17',
    score: 88,
    timeSpent: 28,
    certificateId: 'cert-002',
    attempts: 1,
    startedDate: '2024-09-15',
    lastAccessDate: '2024-09-17',
    moduleProgress: [
      {
        moduleId: 'mod-002-1',
        moduleName: 'Evolution of Phishing Attacks',
        completed: true,
        timeSpent: 7,
        completedDate: '2024-09-15'
      },
      {
        moduleId: 'mod-002-2',
        moduleName: 'Interactive Phishing Simulation',
        completed: true,
        timeSpent: 13,
        completedDate: '2024-09-16'
      },
      {
        moduleId: 'mod-002-3',
        moduleName: 'Response Procedures',
        completed: true,
        timeSpent: 6,
        completedDate: '2024-09-17'
      },
      {
        moduleId: 'mod-002-4',
        moduleName: 'Final Assessment',
        completed: true,
        timeSpent: 2,
        score: 88,
        completedDate: '2024-09-17'
      }
    ]
  },
  {
    id: 'cl-003',
    trainingId: 'tr-003',
    trainingTitle: 'Data Privacy & GDPR Compliance',
    userId: 'u-005',
    userName: 'David Brown',
    userEmail: 'david.brown@qireon.com',
    department: 'Finance',
    role: 'Financial Analyst',
    completedDate: '2024-09-16',
    score: 92,
    timeSpent: 55,
    certificateId: 'cert-003',
    attempts: 2,
    startedDate: '2024-09-08',
    lastAccessDate: '2024-09-16',
    moduleProgress: [
      {
        moduleId: 'mod-003-1',
        moduleName: 'GDPR Fundamentals',
        completed: true,
        timeSpent: 22,
        completedDate: '2024-09-10'
      },
      {
        moduleId: 'mod-003-2',
        moduleName: 'Data Subject Rights',
        completed: true,
        timeSpent: 16,
        completedDate: '2024-09-12'
      },
      {
        moduleId: 'mod-003-3',
        moduleName: 'Data Breach Response',
        completed: true,
        timeSpent: 14,
        completedDate: '2024-09-14'
      },
      {
        moduleId: 'mod-003-4',
        moduleName: 'Compliance Assessment',
        completed: true,
        timeSpent: 3,
        score: 92,
        completedDate: '2024-09-16'
      }
    ]
  },
  {
    id: 'cl-004',
    trainingId: 'tr-006',
    trainingTitle: 'Effective Communication & Leadership',
    userId: 'u-006',
    userName: 'Maria Rodriguez',
    userEmail: 'maria.rodriguez@qireon.com',
    department: 'HR',
    role: 'HR Coordinator',
    completedDate: '2024-09-14',
    score: 96,
    timeSpent: 68,
    certificateId: 'cert-004',
    attempts: 1,
    startedDate: '2024-08-25',
    lastAccessDate: '2024-09-14',
    moduleProgress: []
  },
  {
    id: 'cl-005',
    trainingId: 'tr-001',
    trainingTitle: 'ISO 27001 Security Awareness Fundamentals',
    userId: 'u-009',
    userName: 'Robert Kim',
    userEmail: 'robert.kim@qireon.com',
    department: 'Engineering',
    role: 'Software Engineer',
    completedDate: '2024-09-12',
    score: 89,
    timeSpent: 39,
    certificateId: 'cert-005',
    attempts: 1,
    startedDate: '2024-09-05',
    lastAccessDate: '2024-09-12',
    moduleProgress: []
  }
];

export const sampleUsers = [
  { id: 'u-001', name: 'John Smith', email: 'john.smith@qireon.com', department: 'Engineering', role: 'Senior Developer' },
  { id: 'u-002', name: 'Emma Davis', email: 'emma.davis@qireon.com', department: 'Marketing', role: 'Marketing Manager' },
  { id: 'u-003', name: 'Alex Wilson', email: 'alex.wilson@qireon.com', department: 'Sales', role: 'Account Manager' },
  { id: 'u-004', name: 'Lisa Chen', email: 'lisa.chen@qireon.com', department: 'IT Support', role: 'DevOps Engineer' },
  { id: 'u-005', name: 'David Brown', email: 'david.brown@qireon.com', department: 'Finance', role: 'Financial Analyst' },
  { id: 'u-006', name: 'Maria Rodriguez', email: 'maria.rodriguez@qireon.com', department: 'HR', role: 'HR Coordinator' },
  { id: 'u-007', name: 'James Wilson', email: 'james.wilson@qireon.com', department: 'Operations', role: 'Operations Manager' },
  { id: 'u-008', name: 'Sophie Turner', email: 'sophie.turner@qireon.com', department: 'Legal', role: 'Legal Counsel' },
  { id: 'u-009', name: 'Robert Kim', email: 'robert.kim@qireon.com', department: 'Engineering', role: 'Software Engineer' },
  { id: 'u-010', name: 'Anna Martinez', email: 'anna.martinez@qireon.com', department: 'Product', role: 'Product Manager' },
  { id: 'u-011', name: 'Michael Chang', email: 'michael.chang@qireon.com', department: 'Customer Success', role: 'Customer Success Manager' },
  { id: 'u-012', name: 'Jennifer Lee', email: 'jennifer.lee@qireon.com', department: 'Engineering', role: 'QA Engineer' }
];

export const sampleCertificateTemplates = [
  {
    id: 'cert-template-001',
    name: 'Standard Security Training Certificate',
    template: 'base64-encoded-template-data',
    variables: ['userName', 'trainingTitle', 'completionDate', 'score', 'certificateId'],
    isDefault: true
  },
  {
    id: 'cert-template-002',
    name: 'GDPR Compliance Certificate',
    template: 'base64-encoded-template-data',
    variables: ['userName', 'trainingTitle', 'completionDate', 'score', 'certificateId', 'expiryDate'],
    isDefault: false
  },
  {
    id: 'cert-template-003',
    name: 'Technical Training Certificate',
    template: 'base64-encoded-template-data',
    variables: ['userName', 'trainingTitle', 'completionDate', 'score', 'certificateId', 'technicalLevel'],
    isDefault: false
  }
];

// Additional mock data for reports and analytics
export const sampleDepartmentMetrics = [
  {
    department: 'Engineering',
    totalEmployees: 25,
    assignedTrainings: 75,
    completedTrainings: 68,
    completionRate: 91,
    averageScore: 89,
    overdueCount: 3
  },
  {
    department: 'Sales',
    totalEmployees: 18,
    assignedTrainings: 54,
    completedTrainings: 45,
    completionRate: 83,
    averageScore: 92,
    overdueCount: 4
  },
  {
    department: 'Marketing',
    totalEmployees: 12,
    assignedTrainings: 36,
    completedTrainings: 31,
    completionRate: 86,
    averageScore: 88,
    overdueCount: 2
  },
  {
    department: 'HR',
    totalEmployees: 8,
    assignedTrainings: 32,
    completedTrainings: 30,
    completionRate: 94,
    averageScore: 95,
    overdueCount: 1
  },
  {
    department: 'Finance',
    totalEmployees: 10,
    assignedTrainings: 40,
    completedTrainings: 35,
    completionRate: 88,
    averageScore: 91,
    overdueCount: 2
  },
  {
    department: 'IT Support',
    totalEmployees: 15,
    assignedTrainings: 60,
    completedTrainings: 52,
    completionRate: 87,
    averageScore: 86,
    overdueCount: 5
  },
  {
    department: 'Legal',
    totalEmployees: 6,
    assignedTrainings: 24,
    completedTrainings: 22,
    completionRate: 92,
    averageScore: 94,
    overdueCount: 1
  },
  {
    department: 'Operations',
    totalEmployees: 14,
    assignedTrainings: 42,
    completedTrainings: 36,
    completionRate: 86,
    averageScore: 87,
    overdueCount: 3
  }
];

export const sampleTrainingMetrics = {
  totalPrograms: 24,
  activeAssignments: 156,
  completionRate: 85.2,
  averageScore: 91.7,
  overdueAssignments: 21,
  certificatesIssued: 142,
  totalTimeSpent: 6847, // minutes
  complianceRate: 87.3
};

export const sampleCompletionTrends = [
  { month: 'Jan 2024', completions: 45 },
  { month: 'Feb 2024', completions: 52 },
  { month: 'Mar 2024', completions: 38 },
  { month: 'Apr 2024', completions: 61 },
  { month: 'May 2024', completions: 55 },
  { month: 'Jun 2024', completions: 48 },
  { month: 'Jul 2024', completions: 67 },
  { month: 'Aug 2024', completions: 73 },
  { month: 'Sep 2024', completions: 59 }
];

export const sampleCategoryDistribution = [
  { category: 'Security Awareness', count: 98, percentage: 45 },
  { category: 'Compliance', count: 67, percentage: 31 },
  { category: 'Technical', count: 34, percentage: 16 },
  { category: 'Soft Skills', count: 18, percentage: 8 }
];

export const sampleOverdueAssignments = [
  {
    id: 'overdue-001',
    trainingTitle: 'Advanced Phishing Recognition',
    assigneeName: 'Emma Davis',
    department: 'Marketing',
    daysOverdue: 3,
    priority: 'high'
  },
  {
    id: 'overdue-002',
    trainingTitle: 'Data Privacy & GDPR Compliance',
    assigneeName: 'Sophie Turner',
    department: 'Legal',
    daysOverdue: 1,
    priority: 'high'
  },
  {
    id: 'overdue-003',
    trainingTitle: 'ISO 27001 Security Awareness Fundamentals',
    assigneeName: 'Mark Thompson',
    department: 'Operations',
    daysOverdue: 7,
    priority: 'medium'
  },
  {
    id: 'overdue-004',
    trainingTitle: 'Cloud Security Best Practices',
    assigneeName: 'Rachel Green',
    department: 'IT Support',
    daysOverdue: 2,
    priority: 'high'
  },
  {
    id: 'overdue-005',
    trainingTitle: 'Incident Response & Crisis Management',
    assigneeName: 'Tom Anderson',
    department: 'Finance',
    daysOverdue: 5,
    priority: 'medium'
  }
];

export const sampleUpcomingDueDates = [
  {
    id: 'upcoming-001',
    trainingTitle: 'ISO 27001 Security Awareness Fundamentals',
    assigneeName: 'John Smith',
    department: 'Engineering',
    dueDate: '2024-09-30',
    daysRemaining: 12,
    priority: 'high'
  },
  {
    id: 'upcoming-002',
    trainingTitle: 'Data Privacy & GDPR Compliance',
    assigneeName: 'Alex Wilson',
    department: 'Sales',
    dueDate: '2024-10-10',
    daysRemaining: 22,
    priority: 'medium'
  },
  {
    id: 'upcoming-003',
    trainingTitle: 'Cloud Security Best Practices',
    assigneeName: 'Lisa Chen',
    department: 'IT Support',
    dueDate: '2024-10-20',
    daysRemaining: 32,
    priority: 'high'
  }
];

// Mock functions for API simulation
export const getMockTrainingPrograms = (filters?: any): Promise<TrainingProgram[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleTrainingPrograms);
    }, 300);
  });
};

export const getMockAssignments = (filters?: any): Promise<Assignment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleAssignments);
    }, 300);
  });
};

export const getMockCompletionLogs = (filters?: any): Promise<CompletionLog[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleCompletionLogs);
    }, 300);
  });
};

export const getMockTrainingMetrics = (): Promise<typeof sampleTrainingMetrics> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleTrainingMetrics);
    }, 200);
  });
};

export const getMockDepartmentMetrics = (): Promise<typeof sampleDepartmentMetrics> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleDepartmentMetrics);
    }, 200);
  });
};
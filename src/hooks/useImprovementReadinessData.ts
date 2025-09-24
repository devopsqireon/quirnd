// src/hooks/useImprovementReadinessData.ts
import { useState, useEffect } from 'react';

// Import types from the types file
import type {
  ImprovementReadinessData,
  Statistics,
  CorrectiveAction,
  ImprovementOpportunity,
  ManagementReview,
  CertificationData,
  TopRisk,
  RecentActivity
} from '@/types/improvement-readiness';

// Mock data generator functions
const generateMockStatistics = (): Statistics => ({
  openCorrectiveActions: 23,
  overdueActions: 8,
  improvementOpportunities: 15,
  inProgressImprovements: 5,
  scheduledReviews: 4,
  nextReviewDate: 'Dec 15',
  certificationProgress: 78
});

const generateMockCorrectiveActions = (): CorrectiveAction[] => [
  {
    id: 'CAR-2024-001',
    title: 'Access Control Policy Update',
    description: 'Update access control policies to align with new security requirements and remove deprecated procedures',
    owner: {
      name: 'John Smith',
      department: 'Security Team',
      avatar: '/avatars/john-smith.jpg'
    },
    status: 'Overdue',
    priority: 'Critical',
    dueDate: 'Dec 10, 2024',
    daysOverdue: 5,
    linkedItems: ['Risk-001', 'AC-2.1'],
    createdDate: '2024-11-01',
    updatedDate: '2024-12-05'
  },
  {
    id: 'CAR-2024-002',
    title: 'Data Backup Verification Process',
    description: 'Implement automated verification process for daily data backups to ensure recovery capability',
    owner: {
      name: 'Mike Davis',
      department: 'IT Operations',
      avatar: '/avatars/mike-davis.jpg'
    },
    status: 'In Progress',
    priority: 'High',
    dueDate: 'Dec 20, 2024',
    linkedItems: ['Risk-003', 'CP-9.1'],
    createdDate: '2024-11-15',
    updatedDate: '2024-12-10'
  },
  {
    id: 'CAR-2024-003',
    title: 'Employee Security Training',
    description: 'Develop and deliver comprehensive security awareness training for all employees',
    owner: {
      name: 'Sarah Johnson',
      department: 'HR Department',
      avatar: '/avatars/sarah-johnson.jpg'
    },
    status: 'Under Review',
    priority: 'Medium',
    dueDate: 'Jan 15, 2025',
    linkedItems: ['Risk-005', 'AT-2.1'],
    createdDate: '2024-10-20',
    updatedDate: '2024-12-08'
  },
  {
    id: 'CAR-2024-004',
    title: 'Network Segmentation Implementation',
    description: 'Implement network segmentation to isolate critical systems and reduce attack surface',
    owner: {
      name: 'Lisa Chen',
      department: 'Security Team',
      avatar: '/avatars/lisa-chen.jpg'
    },
    status: 'Open',
    priority: 'High',
    dueDate: 'Jan 30, 2025',
    linkedItems: ['Risk-007', 'SC-7.1'],
    createdDate: '2024-12-01',
    updatedDate: '2024-12-01'
  },
  {
    id: 'CAR-2024-005',
    title: 'Incident Response Plan Update',
    description: 'Update incident response procedures to include new threat vectors and communication protocols',
    owner: {
      name: 'Emma Wilson',
      department: 'Quality Team',
      avatar: '/avatars/emma-wilson.jpg'
    },
    status: 'In Progress',
    priority: 'Medium',
    dueDate: 'Feb 15, 2025',
    linkedItems: ['Risk-002', 'IR-1.1'],
    createdDate: '2024-11-25',
    updatedDate: '2024-12-12'
  },
  {
    id: 'CAR-2024-006',
    title: 'Password Policy Enhancement',
    description: 'Strengthen password policies to include multi-factor authentication requirements',
    owner: {
      name: 'John Smith',
      department: 'Security Team',
      avatar: '/avatars/john-smith.jpg'
    },
    status: 'Overdue',
    priority: 'Critical',
    dueDate: 'Nov 30, 2024',
    daysOverdue: 15,
    linkedItems: ['Risk-001', 'IA-5.1'],
    createdDate: '2024-10-15',
    updatedDate: '2024-11-28'
  }
];

const generateMockImprovementOpportunities = (): ImprovementOpportunity[] => [
  {
    id: 'OFI-2024-001',
    title: 'Automated Vulnerability Scanning',
    description: 'Implement automated vulnerability scanning tools to improve security posture and reduce manual effort',
    category: 'Security',
    owner: {
      name: 'Lisa Chen',
      department: 'Security Team',
      avatar: '/avatars/lisa-chen.jpg'
    },
    status: 'Open',
    priority: 'High',
    linkedControl: 'RA-5.1',
    createdDate: '2024-11-01',
    updatedDate: '2024-11-01'
  },
  {
    id: 'OFI-2024-002',
    title: 'Cloud Cost Optimization',
    description: 'Implement cloud resource monitoring and optimization to reduce operational costs by 20%',
    category: 'Operations',
    owner: {
      name: 'Mike Davis',
      department: 'IT Operations',
      avatar: '/avatars/mike-davis.jpg'
    },
    status: 'In Progress',
    priority: 'Medium',
    linkedControl: 'CM-8.1',
    createdDate: '2024-10-15',
    updatedDate: '2024-12-05'
  },
  {
    id: 'OFI-2024-003',
    title: 'Process Documentation Standards',
    description: 'Establish standardized documentation templates and processes across all departments',
    category: 'Process',
    owner: {
      name: 'Emma Wilson',
      department: 'Quality Team',
      avatar: '/avatars/emma-wilson.jpg'
    },
    status: 'Closed',
    priority: 'Low',
    linkedControl: 'PL-2.1',
    createdDate: '2024-09-01',
    updatedDate: '2024-11-30'
  },
  {
    id: 'OFI-2024-004',
    title: 'API Security Enhancement',
    description: 'Implement API rate limiting, authentication, and monitoring to improve application security',
    category: 'Technology',
    owner: {
      name: 'John Smith',
      department: 'Security Team',
      avatar: '/avatars/john-smith.jpg'
    },
    status: 'Open',
    priority: 'High',
    linkedControl: 'SC-5.1',
    createdDate: '2024-11-20',
    updatedDate: '2024-11-20'
  },
  {
    id: 'OFI-2024-005',
    title: 'Employee Onboarding Automation',
    description: 'Automate employee onboarding processes to reduce time-to-productivity and improve consistency',
    category: 'Operations',
    owner: {
      name: 'Sarah Johnson',
      department: 'HR Department',
      avatar: '/avatars/sarah-johnson.jpg'
    },
    status: 'In Progress',
    priority: 'Medium',
    linkedControl: 'AC-2.2',
    createdDate: '2024-10-01',
    updatedDate: '2024-12-01'
  }
];

const generateMockManagementReviews = (): ManagementReview[] => [
  {
    id: 'MR-2024-Q4',
    title: 'Q4 2024 Management Review',
    description: 'Quarterly compliance assessment and strategic planning session',
    date: 'Dec 15, 2024',
    time: '2:00 PM - 4:00 PM',
    location: 'Conference Room A',
    participants: [
      { name: 'Sarah Johnson', avatar: '/avatars/sarah-johnson.jpg' },
      { name: 'John Smith', avatar: '/avatars/john-smith.jpg' },
      { name: 'Mike Davis', avatar: '/avatars/mike-davis.jpg' },
      { name: 'Lisa Chen', avatar: '/avatars/lisa-chen.jpg' },
      { name: 'Emma Wilson', avatar: '/avatars/emma-wilson.jpg' }
    ],
    status: 'Scheduled',
    agenda: 'Review Q4 metrics, discuss improvement initiatives, plan Q1 2025 objectives',
    createdDate: '2024-11-01'
  },
  {
    id: 'MR-2024-Q3',
    title: 'Q3 2024 Management Review',
    description: 'Quarterly compliance assessment and performance review',
    date: 'Sep 20, 2024',
    time: '2:00 PM - 4:00 PM',
    location: 'Boardroom',
    participants: [
      { name: 'Sarah Johnson', avatar: '/avatars/sarah-johnson.jpg' },
      { name: 'Lisa Chen', avatar: '/avatars/lisa-chen.jpg' },
      { name: 'Emma Wilson', avatar: '/avatars/emma-wilson.jpg' },
      { name: 'David Park', avatar: '/avatars/david-park.jpg' },
      { name: 'Maria Garcia', avatar: '/avatars/maria-garcia.jpg' },
      { name: 'Tom Wilson', avatar: '/avatars/tom-wilson.jpg' }
    ],
    status: 'Completed',
    outcomes: 5,
    hasReport: true,
    agenda: 'Review Q3 performance, identify improvement areas, approve corrective actions',
    createdDate: '2024-08-15'
  },
  {
    id: 'MR-2024-ANNUAL',
    title: 'Annual Security Review',
    description: 'Comprehensive annual security assessment and audit',
    date: 'Aug 15, 2024',
    time: '9:00 AM - 5:00 PM',
    location: 'Conference Room A & B',
    participants: [
      { name: 'John Smith', avatar: '/avatars/john-smith.jpg' },
      { name: 'Alex Rodriguez', avatar: '/avatars/alex-rodriguez.jpg' },
      { name: 'Jennifer Lee', avatar: '/avatars/jennifer-lee.jpg' },
      { name: 'Robert Kim', avatar: '/avatars/robert-kim.jpg' },
      { name: 'Nina Patel', avatar: '/avatars/nina-patel.jpg' },
      { name: 'Chris Taylor', avatar: '/avatars/chris-taylor.jpg' },
      { name: 'Amy Chang', avatar: '/avatars/amy-chang.jpg' }
    ],
    status: 'Completed',
    outcomes: 12,
    hasReport: true,
    agenda: 'Annual security posture review, threat landscape analysis, strategic security planning',
    createdDate: '2024-06-01'
  },
  {
    id: 'MR-2024-SPECIAL',
    title: 'Special Incident Review',
    description: 'Emergency review following security incident',
    date: 'Nov 05, 2024',
    time: '10:00 AM - 12:00 PM',
    location: 'Virtual Meeting',
    participants: [
      { name: 'John Smith', avatar: '/avatars/john-smith.jpg' },
      { name: 'Lisa Chen', avatar: '/avatars/lisa-chen.jpg' },
      { name: 'Mike Davis', avatar: '/avatars/mike-davis.jpg' }
    ],
    status: 'Completed',
    outcomes: 3,
    hasReport: true,
    agenda: 'Incident response review, lessons learned, preventive measures',
    createdDate: '2024-11-01'
  }
];

const generateMockTopRisks = (): TopRisk[] => [
  {
    name: 'Data Breach Risk',
    description: 'Inadequate access controls and outdated security policies',
    severity: 'Critical',
    openActions: 3
  },
  {
    name: 'Compliance Drift',
    description: 'Policy updates needed to maintain regulatory compliance',
    severity: 'High',
    openActions: 5
  },
  {
    name: 'Vendor Risk',
    description: 'Third-party security assessments overdue',
    severity: 'Medium',
    openActions: 2
  },
  {
    name: 'Insider Threat',
    description: 'Insufficient monitoring of privileged user activities',
    severity: 'High',
    openActions: 4
  },
  {
    name: 'System Availability',
    description: 'Legacy systems without adequate backup procedures',
    severity: 'Medium',
    openActions: 1
  }
];

const generateMockRecentActivities = (): RecentActivity[] => [
  {
    type: 'completed',
    description: 'Control AC-2.1 implemented successfully',
    user: 'John Smith',
    time: '2 hours ago'
  },
  {
    type: 'uploaded',
    description: 'Evidence uploaded for CP-9.1 backup procedures',
    user: 'Mike Davis',
    time: '4 hours ago'
  },
  {
    type: 'overdue',
    description: 'Risk assessment for vendor management overdue',
    time: '1 day ago'
  },
  {
    type: 'scheduled',
    description: 'Q4 management review scheduled for Dec 15',
    user: 'Sarah Johnson',
    time: '2 days ago'
  },
  {
    type: 'completed',
    description: 'Employee security training module completed',
    user: 'Emma Wilson',
    time: '3 days ago'
  },
  {
    type: 'uploaded',
    description: 'Network segmentation documentation updated',
    user: 'Lisa Chen',
    time: '4 days ago'
  },
  {
    type: 'overdue',
    description: 'Password policy review overdue by 15 days',
    time: '5 days ago'
  },
  {
    type: 'scheduled',
    description: 'Special incident review meeting scheduled',
    user: 'John Smith',
    time: '1 week ago'
  }
];

const generateMockCertificationData = (): CertificationData => ({
  riskCoverage: 85,
  controlImplementation: 78,
  overdueTasks: 8,
  criticalTasks: 3,
  highTasks: 5,
  evidenceGaps: 12,
  documentGaps: 8,
  testGaps: 4,
  topRisks: generateMockTopRisks(),
  recentActivities: generateMockRecentActivities()
});

// Complete mock data generator
const generateMockData = (): ImprovementReadinessData => ({
  statistics: generateMockStatistics(),
  correctiveActions: generateMockCorrectiveActions(),
  improvementOpportunities: generateMockImprovementOpportunities(),
  managementReviews: generateMockManagementReviews(),
  certificationData: generateMockCertificationData()
});

// Hook implementation
export function useImprovementReadinessData() {
  const [data, setData] = useState<ImprovementReadinessData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Simulate API call with error handling
  const fetchData = async (): Promise<ImprovementReadinessData> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random API errors (5% chance)
        if (Math.random() < 0.05) {
          reject(new Error('Failed to fetch improvement readiness data. Please try again.'));
        } else {
          resolve(generateMockData());
        }
      }, 1500); // Simulate network delay
    });
  };

  // Load data on component mount
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const result = await fetchData();
        
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, []);

  // Refresh data function
  const refreshData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await fetchData();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update specific corrective action
  const updateCorrectiveAction = (actionId: string, updates: Partial<CorrectiveAction>) => {
    if (data) {
      setData(prev => ({
        ...prev!,
        correctiveActions: prev!.correctiveActions.map(action =>
          action.id === actionId ? { ...action, ...updates, updatedDate: new Date().toISOString().split('T')[0] } : action
        )
      }));
    }
  };

  // Add new corrective action
  const addCorrectiveAction = (newAction: Omit<CorrectiveAction, 'id' | 'createdDate' | 'updatedDate'>) => {
    if (data) {
      const id = `CAR-2024-${String(data.correctiveActions.length + 1).padStart(3, '0')}`;
      const now = new Date().toISOString().split('T')[0];
      
      const action: CorrectiveAction = {
        ...newAction,
        id,
        createdDate: now,
        updatedDate: now
      };

      setData(prev => ({
        ...prev!,
        correctiveActions: [...prev!.correctiveActions, action],
        statistics: {
          ...prev!.statistics,
          openCorrectiveActions: prev!.statistics.openCorrectiveActions + 1
        }
      }));
    }
  };

  // Update specific improvement opportunity
  const updateImprovementOpportunity = (opportunityId: string, updates: Partial<ImprovementOpportunity>) => {
    if (data) {
      setData(prev => ({
        ...prev!,
        improvementOpportunities: prev!.improvementOpportunities.map(opportunity =>
          opportunity.id === opportunityId 
            ? { ...opportunity, ...updates, updatedDate: new Date().toISOString().split('T')[0] } 
            : opportunity
        )
      }));
    }
  };

  // Add new improvement opportunity
  const addImprovementOpportunity = (newOpportunity: Omit<ImprovementOpportunity, 'id' | 'createdDate' | 'updatedDate'>) => {
    if (data) {
      const id = `OFI-2024-${String(data.improvementOpportunities.length + 1).padStart(3, '0')}`;
      const now = new Date().toISOString().split('T')[0];
      
      const opportunity: ImprovementOpportunity = {
        ...newOpportunity,
        id,
        createdDate: now,
        updatedDate: now
      };

      setData(prev => ({
        ...prev!,
        improvementOpportunities: [...prev!.improvementOpportunities, opportunity],
        statistics: {
          ...prev!.statistics,
          improvementOpportunities: prev!.statistics.improvementOpportunities + 1
        }
      }));
    }
  };

  // Add new management review
  const addManagementReview = (newReview: Omit<ManagementReview, 'id' | 'createdDate'>) => {
    if (data) {
      const year = new Date().getFullYear();
      const quarter = Math.ceil((new Date().getMonth() + 1) / 3);
      const id = `MR-${year}-${newReview.title.toLowerCase().replace(/\s+/g, '-')}`;
      const now = new Date().toISOString().split('T')[0];
      
      const review: ManagementReview = {
        ...newReview,
        id,
        createdDate: now
      };

      setData(prev => ({
        ...prev!,
        managementReviews: [...prev!.managementReviews, review],
        statistics: {
          ...prev!.statistics,
          scheduledReviews: prev!.statistics.scheduledReviews + 1
        }
      }));
    }
  };

  return {
    data,
    isLoading,
    error,
    refreshData,
    updateCorrectiveAction,
    addCorrectiveAction,
    updateImprovementOpportunity,
    addImprovementOpportunity,
    addManagementReview
  };
}
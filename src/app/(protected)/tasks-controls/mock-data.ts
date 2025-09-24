// src/app/tasks-controls/mock-data.ts

import { Task, Control, LinkedItem, Evidence, ActivityLog } from './types';
import { 
  TASK_STATUS, 
  TASK_PRIORITY, 
  CONTROL_STATUS, 
  LINKED_ITEM_TYPE,
  MOCK_OWNERS 
} from './constants';

export const mockLinkedItems: LinkedItem[] = [
  { type: LINKED_ITEM_TYPE.RISK, id: 'RSK-001', title: 'Data Breach Risk' },
  { type: LINKED_ITEM_TYPE.RISK, id: 'RSK-002', title: 'System Availability Risk' },
  { type: LINKED_ITEM_TYPE.RISK, id: 'RSK-003', title: 'Third-party Risk' },
  { type: LINKED_ITEM_TYPE.POLICY, id: 'POL-001', title: 'Information Security Policy' },
  { type: LINKED_ITEM_TYPE.POLICY, id: 'POL-002', title: 'Access Control Policy' },
  { type: LINKED_ITEM_TYPE.POLICY, id: 'POL-003', title: 'Data Protection Policy' },
  { type: LINKED_ITEM_TYPE.TRAINING, id: 'TRN-001', title: 'Security Awareness Training' },
  { type: LINKED_ITEM_TYPE.TRAINING, id: 'TRN-002', title: 'Phishing Awareness Training' },
  { type: LINKED_ITEM_TYPE.CONTROL, id: 'CTL-A.5.1.1', title: 'Information security policy' },
  { type: LINKED_ITEM_TYPE.CONTROL, id: 'CTL-A.8.1.1', title: 'Inventory of assets' }
];

export const mockTasks: Task[] = [
  {
    id: 'TSK-001',
    title: 'Implement Access Control Policy',
    linkedItem: { type: LINKED_ITEM_TYPE.POLICY, id: 'POL-001', title: 'Access Control Policy' },
    owner: MOCK_OWNERS[0],
    dueDate: '2025-10-15',
    status: TASK_STATUS.IN_PROGRESS,
    priority: TASK_PRIORITY.HIGH,
    description: 'Review and implement new access control procedures',
    createdDate: '2025-09-01',
    updatedDate: '2025-09-15'
  },
  {
    id: 'TSK-002',
    title: 'Risk Assessment Update',
    linkedItem: { type: LINKED_ITEM_TYPE.RISK, id: 'RSK-003', title: 'Data Breach Risk' },
    owner: MOCK_OWNERS[1],
    dueDate: '2025-09-30',
    status: TASK_STATUS.OVERDUE,
    priority: TASK_PRIORITY.CRITICAL,
    description: 'Update quarterly risk assessment',
    createdDate: '2025-08-15',
    updatedDate: '2025-09-10'
  },
  {
    id: 'TSK-003',
    title: 'Security Awareness Training',
    linkedItem: { type: LINKED_ITEM_TYPE.TRAINING, id: 'TRN-001', title: 'Phishing Awareness' },
    owner: MOCK_OWNERS[2],
    dueDate: '2025-10-30',
    status: TASK_STATUS.OPEN,
    priority: TASK_PRIORITY.MEDIUM,
    description: 'Conduct monthly security awareness training',
    createdDate: '2025-09-10',
    updatedDate: '2025-09-10'
  },
  {
    id: 'TSK-004',
    title: 'Control Implementation Review',
    linkedItem: { type: LINKED_ITEM_TYPE.CONTROL, id: 'CTL-A.8.1.1', title: 'Inventory of assets' },
    owner: MOCK_OWNERS[3],
    dueDate: '2025-11-15',
    status: TASK_STATUS.DONE,
    priority: TASK_PRIORITY.LOW,
    description: 'Review asset inventory control implementation',
    createdDate: '2025-08-20',
    updatedDate: '2025-09-12'
  }
];

export const mockControls: Control[] = [
  {
    id: 'CTL-001',
    annexARef: 'A.5.1.1',
    title: 'Information security policy',
    category: 'Information Security Policies',
    clauseText: 'An information security policy shall be defined, approved by management, published and communicated to employees and relevant external parties.',
    linkedRisks: [
      { id: 'RSK-001', title: 'Policy Non-compliance Risk' }
    ],
    linkedPolicies: [
      { id: 'POL-001', title: 'Information Security Policy' }
    ],
    owner: MOCK_OWNERS[0],
    status: CONTROL_STATUS.IMPLEMENTED,
    nextReviewDate: '2025-12-31',
    linkedTasks: [
      { id: 'TSK-001', title: 'Annual Policy Review', status: TASK_STATUS.IN_PROGRESS }
    ],
    evidence: [
      { id: 'EVD-001', name: 'Security Policy v2.1.pdf', uploadDate: '2025-01-15' }
    ],
    implementationDate: '2024-12-01',
    notes: 'Policy reviewed and approved by executive management'
  },
  {
    id: 'CTL-002',
    annexARef: 'A.8.1.1',
    title: 'Inventory of assets',
    category: 'Asset Management',
    clauseText: 'Assets associated with information and information processing facilities shall be identified and an inventory of these assets shall be drawn up and maintained.',
    linkedRisks: [
      { id: 'RSK-002', title: 'Asset Management Risk' },
      { id: 'RSK-003', title: 'Data Loss Risk' }
    ],
    linkedPolicies: [
      { id: 'POL-002', title: 'Asset Management Policy' }
    ],
    owner: MOCK_OWNERS[1],
    status: CONTROL_STATUS.IN_PROGRESS,
    nextReviewDate: '2025-11-30',
    linkedTasks: [
      { id: 'TSK-004', title: 'Update Asset Inventory', status: TASK_STATUS.OPEN }
    ],
    evidence: [
      { id: 'EVD-002', name: 'Asset_Register_Q3_2025.xlsx', uploadDate: '2025-09-01' }
    ]
  },
  {
    id: 'CTL-003',
    annexARef: 'A.9.1.1',
    title: 'Access control policy',
    category: 'Access Control',
    clauseText: 'An access control policy shall be established, documented and reviewed based on business and information security requirements.',
    linkedRisks: [
      { id: 'RSK-004', title: 'Unauthorized Access Risk' }
    ],
    linkedPolicies: [
      { id: 'POL-003', title: 'Access Control Policy' }
    ],
    owner: MOCK_OWNERS[2],
    status: CONTROL_STATUS.PLANNED,
    nextReviewDate: '2025-12-15',
    linkedTasks: [
      { id: 'TSK-002', title: 'Develop Access Control Framework', status: TASK_STATUS.OPEN }
    ],
    evidence: []
  },
  {
    id: 'CTL-004',
    annexARef: 'A.12.6.1',
    title: 'Management of technical vulnerabilities',
    category: 'Systems Security',
    clauseText: 'Information about technical vulnerabilities of information systems being used shall be obtained in a timely fashion.',
    linkedRisks: [
      { id: 'RSK-005', title: 'System Vulnerability Risk' }
    ],
    linkedPolicies: [
      { id: 'POL-004', title: 'Vulnerability Management Policy' }
    ],
    owner: MOCK_OWNERS[3],
    status: CONTROL_STATUS.NOT_APPLICABLE,
    nextReviewDate: '2026-01-31',
    linkedTasks: [],
    evidence: [
      { id: 'EVD-003', name: 'Vulnerability_Scan_Report_Sep2025.pdf', uploadDate: '2025-09-15' }
    ],
    notes: 'Third-party managed service handles vulnerability management'
  }
];

export const mockEvidence: Evidence[] = [
  {
    id: 'EVD-001',
    name: 'security-policy-draft-v1.2.pdf',
    type: 'PDF',
    size: '2.4 MB',
    uploadDate: '2025-09-15',
    uploadedBy: MOCK_OWNERS[0]
  },
  {
    id: 'EVD-002',
    name: 'implementation-checklist.xlsx',
    type: 'Excel',
    size: '1.8 MB',
    uploadDate: '2025-09-12',
    uploadedBy: MOCK_OWNERS[1]
  },
  {
    id: 'EVD-003',
    name: 'review-meeting-notes.docx',
    type: 'Word',
    size: '456 KB',
    uploadDate: '2025-09-10',
    uploadedBy: MOCK_OWNERS[0]
  }
];

export const mockActivityLog: ActivityLog[] = [
  {
    id: 'ACT-001',
    action: 'Task Created',
    user: MOCK_OWNERS[0],
    date: '2025-09-01 09:30',
    details: 'Task created and assigned to John Smith'
  },
  {
    id: 'ACT-002',
    action: 'Status Changed',
    user: MOCK_OWNERS[0],
    date: '2025-09-05 14:22',
    details: 'Status changed from Open to In Progress'
  },
  {
    id: 'ACT-003',
    action: 'Evidence Uploaded',
    user: MOCK_OWNERS[0],
    date: '2025-09-10 11:15',
    details: 'Uploaded review-meeting-notes.docx'
  },
  {
    id: 'ACT-004',
    action: 'Evidence Uploaded',
    user: MOCK_OWNERS[1],
    date: '2025-09-12 16:45',
    details: 'Uploaded implementation-checklist.xlsx'
  },
  {
    id: 'ACT-005',
    action: 'Evidence Uploaded',
    user: MOCK_OWNERS[0],
    date: '2025-09-15 10:30',
    details: 'Uploaded security-policy-draft-v1.2.pdf'
  }
];
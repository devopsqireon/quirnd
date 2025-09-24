// File: /app/policy-management/view/types/policy-view.types.ts

export interface PolicyViewData {
    id: string;
    title: string;
    version: string;
    status: 'Draft' | 'Under Review' | 'Active' | 'Expired' | 'Archived';
    category: string;
    owner: string;
    department: string;
    effectiveDate: string;
    expiryDate: string;
    reviewDate: string;
    reviewFrequency: 'Monthly' | 'Quarterly' | 'Semi-Annually' | 'Annually' | 'Bi-Annually';
    confidentialityLevel: 'Public' | 'Internal' | 'Confidential' | 'Restricted';
    tags: string[];
    description: string;
    content: string;
    attachments: PolicyAttachment[];
    approvalHistory: ApprovalRecord[];
    versionHistory: VersionRecord[];
    acknowledgments: AcknowledgmentData;
    relatedPolicies: RelatedPolicy[];
    metrics: PolicyMetrics;
  }
  
  export interface PolicyAttachment {
    id: string;
    name: string;
    size: string;
    type: string;
    uploadDate: string;
    uploadedBy: string;
    url?: string;
  }
  
  export interface ApprovalRecord {
    id: string;
    approver: string;
    role: string;
    status: 'Pending' | 'Approved' | 'Rejected' | 'Delegated';
    date: string;
    comments?: string;
  }
  
  export interface VersionRecord {
    version: string;
    date: string;
    author: string;
    type: 'Major Revision' | 'Minor Update' | 'Administrative Change';
    changes: string;
    approved?: boolean;
  }
  
  export interface AcknowledgmentData {
    required: boolean;
    totalUsers: number;
    acknowledged: number;
    deadline: string;
    remindersSent: number;
  }
  
  export interface RelatedPolicy {
    id: string;
    title: string;
    relationship: 'Referenced' | 'Supporting' | 'Superseded' | 'Related';
  }
  
  export interface PolicyMetrics {
    views: number;
    downloads: number;
    lastViewed: string;
    averageRating: number;
    totalRatings: number;
  }
  
  export interface PolicyComment {
    id: string;
    author: string;
    authorRole: string;
    content: string;
    timestamp: string;
    isResolved: boolean;
    replies: PolicyCommentReply[];
  }
  
  export interface PolicyCommentReply {
    id: string;
    author: string;
    content: string;
    timestamp: string;
  }
  
  export type ViewTab = 'details' | 'content' | 'history' | 'approvals' | 'attachments' | 'comments';
  
  export interface SharePermission {
    type: 'user' | 'group' | 'role';
    identifier: string;
    name: string;
    permission: 'view' | 'comment' | 'edit';
  }
  
  export interface PrintOptions {
    includeAttachments: boolean;
    includeComments: boolean;
    includeHistory: boolean;
    format: 'pdf' | 'html';
    headerFooter: boolean;
    pageNumbers: boolean;
  }
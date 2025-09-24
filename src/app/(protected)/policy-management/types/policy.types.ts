// Save as: /app/policy-management/types/policy.types.ts

export interface Policy {
    id: string;
    title: string;
    owner: {
        name: string;
        avatar: string;
    };
    status: 'Published' | 'Under Review' | 'Draft' | 'Archived';
    nextReview: string;
    acknowledgement: number;
    category: string;
    annexAControl: string;
    createdAt: string;
    updatedAt: string;
    description: string;
}

export interface PolicySummaryData {
    totalPolicies: number;
    drafts: number;
    pendingApprovals: number;
    published: number;
    acknowledgedPercentage: number;
    trends: {
        totalPolicies: string;
        drafts: string;
        pendingApprovals: string;
        published: string;
        acknowledgedPercentage: string;
    };
    series: {
        totalPolicies: number[];
        drafts: number[];
        pendingApprovals: number[];
        published: number[];
        acknowledgedPercentage: number[];
    };
}

export interface FilterProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    selectedStatus: string;
    setSelectedStatus: (status: string) => void;
    selectedOwner: string;
    setSelectedOwner: (owner: string) => void;
    selectedAnnexControl: string;
    setSelectedAnnexControl: (control: string) => void;
    selectedReviewDue: string;
    setSelectedReviewDue: (reviewDue: string) => void;
    policies: Policy[];
}

export interface PendingApproval {
    id: string;
    title: string;
    submittedBy: string;
    submittedDate: string;
    description: string;
}

export interface DepartmentAcknowledgement {
    department: string;
    percentage: number;
    color: string;
}

export const statusColors = {
    Published: 'bg-green-100 text-green-800',
    'Under Review': 'bg-blue-100 text-blue-800',
    Draft: 'bg-yellow-100 text-yellow-800',
    Archived: 'bg-slate-100 text-slate-600',
};

export const statusOptions = ['All', 'Published', 'Under Review', 'Draft', 'Archived'];

export const categoryOptions = [
    'All', 
    'InfoSec', 
    'Access Control', 
    'Data Management', 
    'Incident Management', 
    'HR', 
    'Business Continuity', 
    'Vendor Management'
];

export const annexAControlOptions = [
    'All',
    'A.5 Information Security Policies',
    'A.6 Organization of Information Security',
    'A.8 Asset Management',
    'A.9 Access Control',
    'A.15 Supplier Relationships',
    'A.16 Information Security Incident Management',
    'A.17 Information Security Aspects of Business Continuity Management'
];

export const reviewDueOptions = [
    'All',
    'Overdue',
    'Next 30 days',
    'Next 90 days'
];
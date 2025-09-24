// Save as: /app/risk/statement-of-applicability/utils.ts

import { SoAStatus, SummaryMetrics } from './types';
import { AnnexAControl } from '@/constants/annex-a-controls';

// SOA Calculation Utilities
export const calculateSoAMetrics = (soaStatuses: SoAStatus[]): SummaryMetrics => {
    const applicable = soaStatuses.filter(s => s.isApplicable === true);
    const implemented = applicable.filter(s => s.implementationStatus === 'Implemented');
    const planned = applicable.filter(s => s.implementationStatus === 'Planned');
    const inProgress = applicable.filter(s => s.implementationStatus === 'In Progress');
    const notApplicable = soaStatuses.filter(s => s.isApplicable === false);
    const highPriority = applicable.filter(s => s.priority === 'Critical' || s.priority === 'High');
    
    // Calculate overdue items
    const today = new Date();
    const overdue = applicable.filter(s => 
        s.targetDate && new Date(s.targetDate) < today && 
        s.implementationStatus !== 'Implemented'
    );
    
    // Calculate items due for review
    const dueReview = soaStatuses.filter(s => 
        s.nextReview && new Date(s.nextReview) <= new Date(Date.now() + 30*24*60*60*1000)
    );
    
    const progress = applicable.length > 0 ? 
        Math.round((implemented.length / applicable.length) * 100) : 0;
    
    return {
        total: soaStatuses.length,
        applicable: applicable.length,
        implemented: implemented.length,
        planned: planned.length,
        inProgress: inProgress.length,
        notApplicable: notApplicable.length,
        overdue: overdue.length,
        highPriority: highPriority.length,
        progress,
        dueReview: dueReview.length
    };
};

// Control Category Utilities
export const getControlCategory = (controlId: string): string => {
    return controlId.substring(0, 4); // e.g., "A.5." from "A.5.1"
};

export const getCategoryName = (category: string): string => {
    const categoryNames: { [key: string]: string } = {
        'A.5': 'Information Security Policies',
        'A.6': 'Organization of Information Security', 
        'A.7': 'Human Resource Security',
        'A.8': 'Asset Management',
        'A.9': 'Access Control',
        'A.10': 'Cryptography',
        'A.11': 'Physical and Environmental Security',
        'A.12': 'Operations Security',
        'A.13': 'Communications Security',
        'A.14': 'System Acquisition, Development and Maintenance'
    };
    return categoryNames[category] || category;
};

export const getCategoryAnalysis = (controls: AnnexAControl[], soaStatuses: SoAStatus[]) => {
    const categories = ['A.5', 'A.6', 'A.7', 'A.8', 'A.9', 'A.10', 'A.11', 'A.12', 'A.13', 'A.14'];
    
    return categories.map(category => {
        const categoryControls = controls.filter(c => c.id.startsWith(category));
        const categoryStatuses = categoryControls.map(c => soaStatuses.find(s => s.controlId === c.id)).filter(Boolean) as SoAStatus[];
        
        const applicable = categoryStatuses.filter(s => s.isApplicable === true).length;
        const implemented = categoryStatuses.filter(s => s.isApplicable === true && s.implementationStatus === 'Implemented').length;
        const planned = categoryStatuses.filter(s => s.isApplicable === true && s.implementationStatus === 'Planned').length;
        
        const completionRate = applicable > 0 ? Math.round((implemented / applicable) * 100) : 0;
        
        return {
            category,
            name: getCategoryName(category),
            total: categoryControls.length,
            applicable,
            implemented,
            planned,
            completionRate
        };
    });
};

// Status Validation Utilities
export const validateSoAStatus = (status: SoAStatus): string[] => {
    const errors: string[] = [];
    
    if (status.isApplicable === null) {
        errors.push('Applicability must be determined');
    }
    
    if (status.isApplicable === true) {
        if (!status.implementationStatus) {
            errors.push('Implementation status is required for applicable controls');
        }
        if (!status.responsibleOwner) {
            errors.push('Responsible owner must be assigned for applicable controls');
        }
        if (!status.justification) {
            errors.push('Justification for inclusion is required');
        }
    }
    
    if (status.isApplicable === false && !status.justification) {
        errors.push('Justification for exclusion is required');
    }
    
    if (status.targetDate && status.implementationDate && 
        new Date(status.targetDate) < new Date(status.implementationDate)) {
        errors.push('Target date cannot be before implementation date');
    }
    
    return errors;
};

// Export Utilities
export const generateComplianceReport = (controls: AnnexAControl[], soaStatuses: SoAStatus[]): string => {
    const categoryAnalysis = getCategoryAnalysis(controls, soaStatuses);
    const overallMetrics = calculateSoAMetrics(soaStatuses);
    
    const report = `
ISO 27001:2022 STATEMENT OF APPLICABILITY - COMPLIANCE REPORT
Generated: ${new Date().toLocaleDateString()}

EXECUTIVE SUMMARY
===============
Overall Implementation Status: ${overallMetrics.progress}% Complete

Key Metrics:
- Total Controls Evaluated: ${overallMetrics.total}
- Controls Declared Applicable: ${overallMetrics.applicable} (${Math.round(overallMetrics.applicable / overallMetrics.total * 100)}%)
- Controls Fully Implemented: ${overallMetrics.implemented} (${Math.round(overallMetrics.implemented / overallMetrics.applicable * 100)}% of applicable)
- Controls In Progress: ${overallMetrics.inProgress}
- Controls Planned: ${overallMetrics.planned}
- Controls Not Applicable: ${overallMetrics.notApplicable}

CATEGORY BREAKDOWN
=================
${categoryAnalysis.map(cat => `
${cat.category} - ${cat.name}
├─ Total Controls: ${cat.total}
├─ Applicable: ${cat.applicable}
├─ Implemented: ${cat.implemented}
├─ Planned: ${cat.planned}
└─ Completion Rate: ${cat.completionRate}%
`).join('\n')}

RISK AREAS & RECOMMENDATIONS
===========================
${categoryAnalysis
    .filter(cat => cat.completionRate < 80 && cat.applicable > 0)
    .map(cat => `
⚠️  ${cat.name} (${cat.completionRate}% complete)
    Recommendation: Prioritize implementation of ${cat.planned} planned controls
    `).join('\n')
}

${overallMetrics.overdue > 0 ? `
OVERDUE ITEMS
============
${overallMetrics.overdue} control(s) are past their target implementation date.
Immediate action required to update timelines and resource allocation.
` : ''}

${overallMetrics.dueReview > 0 ? `
REVIEW SCHEDULE
==============
${overallMetrics.dueReview} control(s) are due for review within the next 30 days.
Schedule review meetings to ensure controls remain effective and appropriate.
` : ''}

NEXT STEPS
==========
1. Focus on categories with completion rates below 80%
2. Address overdue implementation items immediately  
3. Schedule regular review meetings for planned controls
4. Ensure evidence documentation is complete and current
5. Plan for annual SOA review and update cycle

END OF REPORT
============
`;

    return report.trim();
};

// Data Import/Export Utilities
export const exportToCSV = (controls: AnnexAControl[], soaStatuses: SoAStatus[], options: any = {}) => {
    const headers = [
        'Control ID',
        'Control Title', 
        'Description',
        'Applicability',
        'Implementation Status',
        'Priority',
        'Justification',
        'Responsible Owner',
        'Last Review',
        'Next Review',
        'Target Date',
        'Evidence/Linked Risks',
        'Linked Assets',
        'Treatment Actions'
    ];

    const rows = controls.map(control => {
        const status = soaStatuses.find(s => s.controlId === control.id);
        if (!status) return null;
        
        if (!options.includeNotApplicable && status.isApplicable === false) return null;

        return [
            control.id,
            control.description.length > 100 ? control.description.substring(0, 100) + '...' : control.description,
            control.description,
            status.isApplicable === true ? 'Yes' : status.isApplicable === false ? 'No' : 'TBD',
            status.implementationStatus || 'Not Set',
            status.priority || 'Not Set',
            status.justification || '',
            status.responsibleOwner || 'Not Assigned',
            status.lastReview || 'Not Reviewed',
            status.nextReview || 'Not Scheduled',
            status.targetDate || 'Not Set',
            status.evidence || '',
            status.linkedAssets?.join('; ') || '',
            status.treatmentActions?.join('; ') || ''
        ];
    }).filter(Boolean);

    const csvContent = [headers, ...rows]
        .map(row => row?.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
        .join('\n');

    return csvContent;
};

// Search and Filter Utilities
export const filterControls = (
    controls: AnnexAControl[],
    soaStatuses: SoAStatus[],
    searchTerm: string,
    filters: any
) => {
    return controls.filter(control => {
        const status = soaStatuses.find(s => s.controlId === control.id);
        if (!status) return false;

        // Search filter
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            const matches = 
                control.id.toLowerCase().includes(searchLower) ||
                control.description.toLowerCase().includes(searchLower) ||
                status.evidence.toLowerCase().includes(searchLower) ||
                (status.responsibleOwner && status.responsibleOwner.toLowerCase().includes(searchLower)) ||
                (status.justification && status.justification.toLowerCase().includes(searchLower));
            
            if (!matches) return false;
        }

        // Category filter
        if (filters.category && !control.id.startsWith(filters.category)) return false;

        // Implementation status filter
        if (filters.implementationStatus && status.implementationStatus !== filters.implementationStatus) return false;

        // Priority filter
        if (filters.priority && status.priority !== filters.priority) return false;

        // Owner filter
        if (filters.owner && status.responsibleOwner !== filters.owner) return false;

        // Applicability filter
        if (filters.applicability) {
            if (filters.applicability === 'applicable' && status.isApplicable !== true) return false;
            if (filters.applicability === 'not-applicable' && status.isApplicable !== false) return false;
            if (filters.applicability === 'tbd' && status.isApplicable !== null) return false;
        }

        // Tags filter
        if (filters.tags && filters.tags.length > 0) {
            const statusTags = status.tags || [];
            const hasMatchingTag = filters.tags.some((tag: string) => statusTags.includes(tag));
            if (!hasMatchingTag) return false;
        }

        return true;
    });
};

// Risk Integration Utilities
export const mapControlsToRisks = (controls: AnnexAControl[], risks: any[]) => {
    const controlRiskMap = new Map<string, string[]>();
    
    risks.forEach(risk => {
        const existingControls = risk.isoMapping || [];
        const newControls = risk.newControlMapping || [];
        const allControls = [...new Set([...existingControls, ...newControls])];

        allControls.forEach(controlId => {
            if (!controlRiskMap.has(controlId)) {
                controlRiskMap.set(controlId, []);
            }
            controlRiskMap.get(controlId)?.push(risk.id);
        });
    });

    return controlRiskMap;
};

// Audit and Compliance Utilities
export const generateAuditTrail = (status: SoAStatus): string => {
    if (!status.statusHistory || status.statusHistory.length === 0) {
        return 'No audit trail available';
    }

    return status.statusHistory
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map(entry => `${entry.date}: ${entry.status} by ${entry.user}${entry.comment ? ` - ${entry.comment}` : ''}`)
        .join('\n');
};

export const checkComplianceGaps = (soaStatuses: SoAStatus[]): string[] => {
    const gaps: string[] = [];
    
    soaStatuses.forEach(status => {
        const errors = validateSoAStatus(status);
        if (errors.length > 0) {
            gaps.push(`${status.controlId}: ${errors.join(', ')}`);
        }
    });

    return gaps;
};

// Notification Utilities
export const getUpcomingReviews = (soaStatuses: SoAStatus[], daysAhead: number = 30): SoAStatus[] => {
    const cutoffDate = new Date(Date.now() + daysAhead * 24 * 60 * 60 * 1000);
    
    return soaStatuses.filter(status => 
        status.nextReview && 
        new Date(status.nextReview) <= cutoffDate &&
        new Date(status.nextReview) >= new Date()
    ).sort((a, b) => 
        new Date(a.nextReview!).getTime() - new Date(b.nextReview!).getTime()
    );
};

export const getOverdueImplementations = (soaStatuses: SoAStatus[]): SoAStatus[] => {
    const today = new Date();
    
    return soaStatuses.filter(status => 
        status.isApplicable === true &&
        status.targetDate && 
        new Date(status.targetDate) < today &&
        status.implementationStatus !== 'Implemented'
    ).sort((a, b) => 
        new Date(a.targetDate!).getTime() - new Date(b.targetDate!).getTime()
    );
};

// Implementation Planning Utilities
export const generateImplementationPlan = (soaStatuses: SoAStatus[]): any => {
    const pendingControls = soaStatuses.filter(s => 
        s.isApplicable === true && 
        s.implementationStatus !== 'Implemented'
    );

    // Group by priority
    const byPriority = {
        Critical: pendingControls.filter(s => s.priority === 'Critical'),
        High: pendingControls.filter(s => s.priority === 'High'),
        Medium: pendingControls.filter(s => s.priority === 'Medium'),
        Low: pendingControls.filter(s => s.priority === 'Low'),
        Unassigned: pendingControls.filter(s => !s.priority)
    };

    // Group by effort
    const byEffort = {
        Low: pendingControls.filter(s => s.effort === 'Low'),
        Medium: pendingControls.filter(s => s.effort === 'Medium'),
        High: pendingControls.filter(s => s.effort === 'High'),
        Unknown: pendingControls.filter(s => !s.effort)
    };

    // Calculate estimated timeline
    const totalEffortPoints = pendingControls.reduce((sum, control) => {
        const effortPoints = { Low: 1, Medium: 3, High: 8 };
        return sum + (effortPoints[control.effort as keyof typeof effortPoints] || 2);
    }, 0);

    return {
        totalPending: pendingControls.length,
        byPriority,
        byEffort,
        estimatedEffort: totalEffortPoints,
        recommendedSequence: [
            ...byPriority.Critical.sort((a, b) => (a.effort === 'Low' ? -1 : 1)),
            ...byPriority.High.filter(s => s.effort === 'Low'),
            ...byPriority.High.filter(s => s.effort !== 'Low'),
            ...byPriority.Medium.filter(s => s.effort === 'Low'),
            ...byPriority.Medium.filter(s => s.effort !== 'Low'),
            ...byPriority.Low,
            ...byPriority.Unassigned
        ].slice(0, 20) // Top 20 priorities
    };
};

// Performance Metrics
export const calculateImplementationVelocity = (soaStatuses: SoAStatus[], periodDays: number = 90): number => {
    const cutoffDate = new Date(Date.now() - periodDays * 24 * 60 * 60 * 1000);
    
    const recentImplementations = soaStatuses.filter(status => 
        status.implementationDate && 
        new Date(status.implementationDate) >= cutoffDate
    );

    return recentImplementations.length;
};

export const predictCompletionDate = (soaStatuses: SoAStatus[], velocityPeriodDays: number = 90): Date | null => {
    const velocity = calculateImplementationVelocity(soaStatuses, velocityPeriodDays);
    if (velocity === 0) return null;

    const remaining = soaStatuses.filter(s => 
        s.isApplicable === true && 
        s.implementationStatus !== 'Implemented'
    ).length;

    const daysToComplete = (remaining / velocity) * velocityPeriodDays;
    return new Date(Date.now() + daysToComplete * 24 * 60 * 60 * 1000);
};

// Default Export
export default {
    calculateSoAMetrics,
    getControlCategory,
    getCategoryName,
    getCategoryAnalysis,
    validateSoAStatus,
    generateComplianceReport,
    exportToCSV,
    filterControls,
    mapControlsToRisks,
    generateAuditTrail,
    checkComplianceGaps,
    getUpcomingReviews,
    getOverdueImplementations,
    generateImplementationPlan,
    calculateImplementationVelocity,
    predictCompletionDate
};Review > 0 ? `
REVIEW SCHEDULE
==============
${overallMetrics.due
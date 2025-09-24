// Save as: /app/policy-management/components/sidebar/PolicySidebar.tsx
'use client'

import React, { useMemo } from 'react';
import { Bot, Send } from 'lucide-react';
import { Policy, PendingApproval, DepartmentAcknowledgement } from '../../types/policy.types';

interface PolicySidebarProps {
    policies: Policy[];
}

// Custom Gauge Chart Component
const GaugeChart: React.FC<{ percentage: number }> = ({ percentage }) => {
    const circumference = 2 * Math.PI * 45; // radius of 45
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return (
        <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                />
                {/* Progress circle */}
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#14B8A6"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    style={{
                        transition: 'stroke-dashoffset 1s ease-in-out',
                        filter: 'drop-shadow(0 0 6px rgba(20, 184, 166, 0.3))'
                    }}
                />
            </svg>
            {/* Center text */}
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-slate-800">{percentage}%</span>
            </div>
        </div>
    );
};

export const PolicySidebar: React.FC<PolicySidebarProps> = ({ policies }) => {
    // Mock data for pending approvals
    const pendingApprovals: PendingApproval[] = [
        {
            id: 'POL-002',
            title: 'Remote Work Policy',
            submittedBy: 'John Smith',
            submittedDate: '2024-09-15',
            description: 'Updated guidelines for secure remote work practices'
        },
        {
            id: 'POL-005',
            title: 'Incident Response Plan',
            submittedBy: 'Mike Ross',
            submittedDate: '2024-09-14',
            description: 'Revised incident response procedures for 2024'
        },
        {
            id: 'POL-008',
            title: 'Vendor Management Policy',
            submittedBy: 'Sarah Johnson',
            submittedDate: '2024-09-13',
            description: 'New vendor onboarding and assessment requirements'
        }
    ];

    // Calculate acknowledgement analytics
    const acknowledgementData = useMemo(() => {
        const publishedPolicies = policies.filter(p => p.status === 'Published');
        const totalAcknowledgement = publishedPolicies.length > 0 
            ? Math.round(publishedPolicies.reduce((sum, p) => sum + p.acknowledgement, 0) / publishedPolicies.length)
            : 0;

        // Mock department data
        const departments: DepartmentAcknowledgement[] = [
            { department: 'Sales', percentage: 65, color: 'text-red-600' },
            { department: 'Marketing', percentage: 82, color: 'text-orange-500' },
            { department: 'Customer Support', percentage: 88, color: 'text-yellow-500' },
            { department: 'Engineering', percentage: 94, color: 'text-green-500' },
            { department: 'Finance', percentage: 97, color: 'text-green-600' }
        ];

        return {
            overall: totalAcknowledgement,
            departments: departments.sort((a, b) => a.percentage - b.percentage)
        };
    }, [policies]);

    const handleApprove = (approvalId: string) => {
        console.log('Approve policy:', approvalId);
    };

    const handleReject = (approvalId: string) => {
        console.log('Reject policy:', approvalId);
    };

    const handleViewAll = () => {
        console.log('View all pending approvals');
    };

    const handleSendBulkReminders = () => {
        console.log('Send bulk reminders');
    };

    const handleUseAIDraft = () => {
        console.log('Use AI to draft policy');
    };

    return (
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-8">
            {/* Pending Approvals */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                    Pending Your Approval
                </h3>
                <div className="space-y-4">
                    {pendingApprovals.slice(0, 2).map((approval) => (
                        <div key={approval.id} className="p-4 bg-slate-50 rounded-lg">
                            <div className="mb-2">
                                <p className="font-semibold text-slate-800">{approval.title}</p>
                                <p className="text-sm text-slate-500">Submitted by {approval.submittedBy}</p>
                                <p className="text-xs text-slate-400 mt-1">{approval.description}</p>
                            </div>
                            <div className="flex items-center justify-end space-x-2 mt-3">
                                <button 
                                    onClick={() => handleReject(approval.id)}
                                    className="px-3 py-1 text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Reject
                                </button>
                                <button 
                                    onClick={() => handleApprove(approval.id)}
                                    className="px-3 py-1 text-xs font-semibold text-white bg-teal-500 rounded-md hover:bg-teal-600 transition-colors"
                                >
                                    Approve
                                </button>
                            </div>
                        </div>
                    ))}
                    <button 
                        onClick={handleViewAll}
                        className="text-sm font-medium text-slate-800 hover:text-slate-900 hover:underline cursor-pointer transition-colors"
                    >
                        View all ({pendingApprovals.length})
                    </button>
                </div>
            </section>
            
            {/* Acknowledgement Analytics */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                    Acknowledgement Analytics
                </h3>
                
                {/* Gauge Chart */}
                <div className="flex justify-center mb-4">
                    <GaugeChart percentage={acknowledgementData.overall} />
                </div>
                
                {/* Department Breakdown */}
                <div className="mt-4">
                    <p className="text-sm font-medium text-slate-800 mb-3">
                        Departments Needing Attention
                    </p>
                    <ul className="text-sm space-y-2">
                        {acknowledgementData.departments.slice(0, 3).map((dept) => (
                            <li key={dept.department} className="flex justify-between items-center">
                                <span className="text-slate-700">{dept.department}</span>
                                <span className={`font-semibold ${dept.color}`}>
                                    {dept.percentage}%
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <button 
                    onClick={handleSendBulkReminders}
                    className="w-full mt-6 py-2 text-sm font-semibold text-white bg-slate-800 rounded-lg shadow-sm hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                >
                    <Send size={14} />
                    Send Bulk Reminders
                </button>
            </section>
            
            {/* ISO Mentor - AI Assistant */}
            <section className="bg-slate-800 text-white rounded-2xl p-6 text-center">
                <div className="flex justify-center mb-3">
                    <Bot className="w-8 h-8 text-teal-400" />
                </div>
                <h3 className="text-lg font-semibold">ISO Mentor</h3>
                <p className="text-sm text-gray-300 mt-2 mb-4">
                    Need a policy? Let AI draft one for you based on your SoA controls.
                </p>
                <button 
                    onClick={handleUseAIDraft}
                    className="w-full py-2.5 text-sm font-semibold text-slate-800 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
                >
                    Use AI to Draft Policy
                </button>
            </section>
        </aside>
    );
};
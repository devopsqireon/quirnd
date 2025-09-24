// Save as: /app/policy-management/page.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { PolicyHeader } from './components/layout/PolicyHeader';
import { OverviewCards } from './components/cards/OverviewCards';
import { PolicyList } from './components/tables/PolicyList';
import { PolicySidebar } from './components/sidebar/PolicySidebar';
import { Policy } from './types/policy.types';

// Mock data for the policy library
const mockPolicies: Policy[] = [
    { 
        id: 'POL-001', 
        title: 'Information Security Policy', 
        owner: { name: 'Jane Doe', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg' }, 
        status: 'Published', 
        nextReview: '2026-08-15', 
        acknowledgement: 98,
        category: 'InfoSec',
        annexAControl: 'A.5 Information Security Policies',
        createdAt: '2024-01-15',
        updatedAt: '2024-08-15',
        description: 'Comprehensive information security policy covering all organizational security requirements.'
    },
    { 
        id: 'POL-002', 
        title: 'Acceptable Use Policy', 
        owner: { name: 'John Smith', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg' }, 
        status: 'Under Review', 
        nextReview: '2026-09-01', 
        acknowledgement: 95,
        category: 'InfoSec',
        annexAControl: 'A.6 Organization of Information Security',
        createdAt: '2024-02-10',
        updatedAt: '2024-09-01',
        description: 'Guidelines for acceptable use of company IT resources and systems.'
    },
    { 
        id: 'POL-003', 
        title: 'Access Control Policy', 
        owner: { name: 'Jane Doe', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg' }, 
        status: 'Draft', 
        nextReview: 'N/A', 
        acknowledgement: 0,
        category: 'Access Control',
        annexAControl: 'A.9 Access Control',
        createdAt: '2024-03-05',
        updatedAt: '2024-09-10',
        description: 'Policy defining access control procedures and user privilege management.'
    },
    { 
        id: 'POL-004', 
        title: 'Data Classification Policy', 
        owner: { name: 'Mike Ross', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg' }, 
        status: 'Published', 
        nextReview: '2026-07-20', 
        acknowledgement: 78,
        category: 'Data Management',
        annexAControl: 'A.8 Asset Management',
        createdAt: '2024-01-20',
        updatedAt: '2024-07-20',
        description: 'Framework for classifying and handling different types of organizational data.'
    },
    { 
        id: 'POL-005', 
        title: 'Incident Response Plan', 
        owner: { name: 'John Smith', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg' }, 
        status: 'Published', 
        nextReview: '2026-06-10', 
        acknowledgement: 99,
        category: 'Incident Management',
        annexAControl: 'A.16 Information Security Incident Management',
        createdAt: '2024-01-10',
        updatedAt: '2024-06-10',
        description: 'Comprehensive plan for detecting, responding to, and recovering from security incidents.'
    },
    { 
        id: 'POL-006', 
        title: 'Remote Work Policy', 
        owner: { name: 'Jane Doe', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg' }, 
        status: 'Archived', 
        nextReview: '2025-01-01', 
        acknowledgement: 100,
        category: 'HR',
        annexAControl: 'A.6 Organization of Information Security',
        createdAt: '2023-12-15',
        updatedAt: '2025-01-01',
        description: 'Guidelines for secure remote work practices and home office security.'
    },
    { 
        id: 'POL-007', 
        title: 'Business Continuity Plan', 
        owner: { name: 'Sarah Johnson', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg' }, 
        status: 'Published', 
        nextReview: '2026-05-15', 
        acknowledgement: 87,
        category: 'Business Continuity',
        annexAControl: 'A.17 Information Security Aspects of Business Continuity Management',
        createdAt: '2024-02-01',
        updatedAt: '2024-05-15',
        description: 'Framework for maintaining critical business operations during disruptions.'
    },
    { 
        id: 'POL-008', 
        title: 'Vendor Management Policy', 
        owner: { name: 'Mike Ross', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg' }, 
        status: 'Under Review', 
        nextReview: '2026-04-30', 
        acknowledgement: 92,
        category: 'Vendor Management',
        annexAControl: 'A.15 Supplier Relationships',
        createdAt: '2024-01-25',
        updatedAt: '2024-04-30',
        description: 'Guidelines for managing third-party vendor relationships and security requirements.'
    }
];

const PolicyManagementPage = () => {
    const [policies, setPolicies] = useState<Policy[]>(mockPolicies);
    const [filteredPolicies, setFilteredPolicies] = useState<Policy[]>(mockPolicies);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectedOwner, setSelectedOwner] = useState('All');
    const [selectedAnnexControl, setSelectedAnnexControl] = useState('All');
    const [selectedReviewDue, setSelectedReviewDue] = useState('All');

    // Filter policies based on search and filter criteria
    useEffect(() => {
        let filtered = policies;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(policy =>
                policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                policy.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                policy.owner.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Category filter
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(policy => policy.category === selectedCategory);
        }

        // Status filter
        if (selectedStatus !== 'All') {
            filtered = filtered.filter(policy => policy.status === selectedStatus);
        }

        // Owner filter
        if (selectedOwner !== 'All') {
            filtered = filtered.filter(policy => policy.owner.name === selectedOwner);
        }

        // Annex A Control filter
        if (selectedAnnexControl !== 'All') {
            filtered = filtered.filter(policy => policy.annexAControl === selectedAnnexControl);
        }

        // Review Due filter
        if (selectedReviewDue !== 'All') {
            const today = new Date();
            const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
            const ninetyDaysFromNow = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000);

            filtered = filtered.filter(policy => {
                if (policy.nextReview === 'N/A') return false;
                
                const reviewDate = new Date(policy.nextReview);
                
                switch (selectedReviewDue) {
                    case 'Overdue':
                        return reviewDate < today;
                    case 'Next 30 days':
                        return reviewDate >= today && reviewDate <= thirtyDaysFromNow;
                    case 'Next 90 days':
                        return reviewDate >= today && reviewDate <= ninetyDaysFromNow;
                    default:
                        return true;
                }
            });
        }

        setFilteredPolicies(filtered);
    }, [policies, searchTerm, selectedCategory, selectedStatus, selectedOwner, selectedAnnexControl, selectedReviewDue]);

    const filterProps = {
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        selectedStatus,
        setSelectedStatus,
        selectedOwner,
        setSelectedOwner,
        selectedAnnexControl,
        setSelectedAnnexControl,
        selectedReviewDue,
        setSelectedReviewDue,
        policies
    };

    return (
        <div className="bg-slate-50 font-sans min-h-screen">
            <div className="max-w-screen-2xl mx-auto p-8">
                <PolicyHeader />
                <main className="grid grid-cols-12 gap-8">
                    <div className="col-span-12 lg:col-span-9">
                        <OverviewCards policies={policies} />
                        <PolicyList 
                            policies={filteredPolicies} 
                            filterProps={filterProps}
                        />
                    </div>
                    <PolicySidebar policies={policies} />
                </main>
            </div>
        </div>
    );
};

export default PolicyManagementPage;
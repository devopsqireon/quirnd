// File: /app/policy-management/view/[id]/page.tsx

'use client'

import React, { useState, useEffect } from 'react';
import { PolicyViewHeader } from '../components/layout/PolicyViewHeader';
import { PolicyDetailsPanel } from '../components/panels/PolicyDetailsPanel';
import { PolicyContentPanel } from '../components/panels/PolicyContentPanel';
import { PolicyMetadataPanel } from '../components/panels/PolicyMetadataPanel';
import { PolicyHistoryPanel } from '../components/panels/PolicyHistoryPanel';
import { PolicyApprovalPanel } from '../components/panels/PolicyApprovalPanel';
import { PolicyAttachmentsPanel } from '../components/panels/PolicyAttachmentsPanel';
import { PolicyCommentsPanel } from '../components/panels/PolicyCommentsPanel';
import { EditPolicyModal } from '../components/modals/EditPolicyModal';
import { SharePolicyModal } from '../components/modals/SharePolicyModal';
import { PrintPreviewModal } from '../components/modals/PrintPreviewModal';
import { ArchivePolicyModal } from '../components/modals/ArchivePolicyModal';
import { FloatingActionButtons } from '../components/ui/FloatingActionButtons';
import { PolicyBreadcrumb } from '../components/ui/PolicyBreadcrumb';
import { PolicyStatusBadge } from '../components/ui/PolicyStatusBadge';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { PolicyViewData, ViewTab } from '../types/policy-view.types';

interface PolicyViewPageProps {
  params: {
    id: string;
  };
}

export default function PolicyViewPage({ params }: PolicyViewPageProps) {
  const [policyData, setPolicyData] = useState<PolicyViewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ViewTab>('details');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch policy data
    const fetchPolicyData = async () => {
      setLoading(true);
      try {
        // Mock data - replace with actual API call
        const mockData: PolicyViewData = {
          id: params.id,
          title: 'Information Security Policy',
          version: '2.1',
          status: 'Active',
          category: 'Security',
          owner: 'John Smith',
          department: 'IT Security',
          effectiveDate: '2024-01-15',
          expiryDate: '2025-01-14',
          reviewDate: '2024-07-15',
          reviewFrequency: 'Semi-Annually',
          confidentialityLevel: 'Internal',
          tags: ['ISO 27001', 'Security', 'Compliance', 'GDPR'],
          description: 'Comprehensive policy outlining information security requirements and procedures for all organizational personnel.',
          content: `
            <h2>1. Purpose</h2>
            <p>This policy establishes the framework for protecting organizational information assets and ensuring compliance with regulatory requirements.</p>
            <h2>2. Scope</h2>
            <p>This policy applies to all employees, contractors, and third-party vendors who have access to organizational information systems.</p>
            <h2>3. Policy Statements</h2>
            <ul>
              <li>All users must use strong authentication mechanisms</li>
              <li>Data must be classified according to sensitivity levels</li>
              <li>Regular security training is mandatory for all personnel</li>
            </ul>
          `,
          attachments: [
            {
              id: 'att1',
              name: 'Security Guidelines.pdf',
              size: '2.1 MB',
              type: 'application/pdf',
              uploadDate: '2024-01-10',
              uploadedBy: 'John Smith'
            },
            {
              id: 'att2',
              name: 'Implementation Checklist.xlsx',
              size: '145 KB',
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              uploadDate: '2024-01-12',
              uploadedBy: 'Jane Doe'
            }
          ],
          approvalHistory: [
            {
              id: 'app1',
              approver: 'Sarah Johnson',
              role: 'CISO',
              status: 'Approved',
              date: '2024-01-14',
              comments: 'Policy aligns with current security standards.'
            },
            {
              id: 'app2',
              approver: 'Michael Brown',
              role: 'Legal Counsel',
              status: 'Approved',
              date: '2024-01-13',
              comments: 'Regulatory compliance requirements met.'
            }
          ],
          versionHistory: [
            {
              version: '2.1',
              date: '2024-01-15',
              author: 'John Smith',
              type: 'Minor Update',
              changes: 'Updated authentication requirements'
            },
            {
              version: '2.0',
              date: '2023-07-15',
              author: 'John Smith',
              type: 'Major Revision',
              changes: 'Complete policy restructure'
            },
            {
              version: '1.5',
              date: '2023-01-15',
              author: 'Previous Owner',
              type: 'Minor Update',
              changes: 'Added GDPR compliance sections'
            }
          ],
          acknowledgments: {
            required: true,
            totalUsers: 248,
            acknowledged: 187,
            deadline: '2024-02-15',
            remindersSent: 2
          },
          relatedPolicies: [
            {
              id: 'POL-2024-002',
              title: 'Data Privacy Policy',
              relationship: 'Referenced'
            },
            {
              id: 'POL-2024-003',
              title: 'Incident Response Policy',
              relationship: 'Supporting'
            }
          ],
          metrics: {
            views: 1247,
            downloads: 89,
            lastViewed: '2024-09-17',
            averageRating: 4.2,
            totalRatings: 15
          }
        };
        
        setPolicyData(mockData);
        setIsBookmarked(false); // Get from user preferences
      } catch (error) {
        console.error('Error fetching policy data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicyData();
  }, [params.id]);

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handlePrint = () => {
    setShowPrintModal(true);
  };

  const handleArchive = () => {
    setShowArchiveModal(true);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleTabChange = (tab: ViewTab) => {
    setActiveTab(tab);
  };

  if (loading) {
    return <LoadingSpinner message="Loading policy details..." />;
  }

  if (!policyData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Policy Not Found</h2>
          <p className="text-gray-600">The requested policy could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <PolicyBreadcrumb policyTitle={policyData.title} />

      {/* Header */}
      <PolicyViewHeader
        policy={policyData}
        isBookmarked={isBookmarked}
        onEdit={handleEdit}
        onShare={handleShare}
        onPrint={handlePrint}
        onArchive={handleArchive}
        onBookmark={handleBookmark}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6" aria-label="Tabs">
                  {[
                    { id: 'details', name: 'Details', count: null },
                    { id: 'content', name: 'Content', count: null },
                    { id: 'history', name: 'History', count: policyData.versionHistory.length },
                    { id: 'approvals', name: 'Approvals', count: policyData.approvalHistory.length },
                    { id: 'attachments', name: 'Attachments', count: policyData.attachments.length },
                    { id: 'comments', name: 'Comments', count: 0 }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id as ViewTab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <span>{tab.name}</span>
                      {tab.count !== null && (
                        <span className="bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'details' && <PolicyDetailsPanel policy={policyData} />}
                {activeTab === 'content' && <PolicyContentPanel content={policyData.content} />}
                {activeTab === 'history' && <PolicyHistoryPanel history={policyData.versionHistory} />}
                {activeTab === 'approvals' && <PolicyApprovalPanel approvals={policyData.approvalHistory} />}
                {activeTab === 'attachments' && <PolicyAttachmentsPanel attachments={policyData.attachments} />}
                {activeTab === 'comments' && <PolicyCommentsPanel policyId={policyData.id} />}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <PolicyMetadataPanel policy={policyData} />
          </div>
        </div>
      </div>

      {/* Floating Actions */}
      <FloatingActionButtons
        onEdit={handleEdit}
        onShare={handleShare}
        onPrint={handlePrint}
        isBookmarked={isBookmarked}
        onBookmark={handleBookmark}
      />

      {/* Modals */}
      {showEditModal && (
        <EditPolicyModal
          policy={policyData}
          onClose={() => setShowEditModal(false)}
          onSave={(updatedPolicy) => {
            setPolicyData(updatedPolicy);
            setShowEditModal(false);
          }}
        />
      )}

      {showShareModal && (
        <SharePolicyModal
          policy={policyData}
          onClose={() => setShowShareModal(false)}
        />
      )}

      {showPrintModal && (
        <PrintPreviewModal
          policy={policyData}
          onClose={() => setShowPrintModal(false)}
        />
      )}

      {showArchiveModal && (
        <ArchivePolicyModal
          policy={policyData}
          onClose={() => setShowArchiveModal(false)}
          onArchive={() => {
            // Handle archive logic
            setShowArchiveModal(false);
          }}
        />
      )}
    </div>
  );
}
// File: /app/policy-management/create/components/modals/PreviewModal.tsx

import React from 'react';
import { PolicyFormData } from '../../types/policy-create.types';

interface PreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    policyData: PolicyFormData;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
    isOpen,
    onClose,
    policyData
}) => {
    if (!isOpen) return null;

    const handleExportPDF = () => {
        console.log('Exporting policy to PDF...');
        // Implement PDF export functionality
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'Not set';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Policy Preview</h2>
                    <div className="flex items-center space-x-3">
                        <button 
                            onClick={handleExportPDF}
                            className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg border border-gray-300 transition-colors"
                        >
                            <i className="fa-solid fa-download mr-2"></i>
                            Export PDF
                        </button>
                        <button 
                            onClick={onClose}
                            className="text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            <i className="fa-solid fa-times"></i>
                        </button>
                    </div>
                </div>
                
                <div className="p-8 overflow-y-auto max-h-[calc(90vh-80px)]">
                    <div className="prose max-w-none">
                        <div className="text-center mb-8 pb-6 border-b-2 border-gray-300">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {policyData.title || 'Untitled Policy'}
                            </h1>
                            <p className="text-gray-600">Policy ID: {policyData.id} | Version: {policyData.version}</p>
                            <p className="text-gray-600">Effective Date: {formatDate(policyData.effectiveDate)}</p>
                            {policyData.owner && (
                                <p className="text-gray-600">Owner: {policyData.owner}</p>
                            )}
                        </div>
                        
                        <div className="space-y-6">
                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Purpose</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    This policy establishes the framework for information security management within the organization, 
                                    ensuring compliance with ISO 27001 standards and regulatory requirements.
                                </p>
                            </section>
                            
                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Scope</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    This policy applies to all employees, contractors, and third-party vendors who have access to 
                                    organizational information systems and data.
                                </p>
                            </section>
                            
                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Responsibilities</h2>
                                <ul className="list-disc list-inside text-gray-700 space-y-2">
                                    <li>Chief Information Security Officer: Overall policy oversight and implementation</li>
                                    <li>Department Heads: Ensuring compliance within their respective areas</li>
                                    <li>All Personnel: Adhering to security requirements and reporting incidents</li>
                                </ul>
                            </section>
                            
                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Policy Statements</h2>
                                <div className="space-y-3">
                                    <p className="text-gray-700">4.1 Information Classification and Handling</p>
                                    <p className="text-gray-700">4.2 Access Control and Authentication</p>
                                    <p className="text-gray-700">4.3 Incident Response and Management</p>
                                </div>
                            </section>

                            {policyData.content && (
                                <section>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-3">Additional Content</h2>
                                    <div dangerouslySetInnerHTML={{ __html: policyData.content }} />
                                </section>
                            )}
                        </div>
                        
                        {/* Metadata Footer */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                <div>
                                    <p><strong>Category:</strong> {policyData.category || 'Not specified'}</p>
                                    <p><strong>Review Frequency:</strong> {policyData.reviewFrequency}</p>
                                    <p><strong>Confidentiality Level:</strong> {policyData.confidentialityLevel}</p>
                                </div>
                                <div>
                                    <p><strong>Next Review:</strong> {formatDate(policyData.reviewDate)}</p>
                                    <p><strong>Change Type:</strong> {policyData.changeType}</p>
                                    <p><strong>Impact Level:</strong> {policyData.impactLevel}</p>
                                </div>
                            </div>
                            
                            {policyData.tags.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-700 mb-2">Tags:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {policyData.tags.map((tag) => (
                                            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
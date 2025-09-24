// File: /app/policy-management/create/components/layout/CreatePolicyHeader.tsx

import React from 'react';

interface CreatePolicyHeaderProps {
    onCancel: () => void;
    onSaveDraft: () => void;
    onPreview: () => void;
    onSubmitReview: () => void;
}

export const CreatePolicyHeader: React.FC<CreatePolicyHeaderProps> = ({
    onCancel,
    onSaveDraft,
    onPreview,
    onSubmitReview
}) => {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <nav className="flex items-center space-x-2 text-sm text-gray-500">
                            <span className="hover:text-qireon-600 cursor-pointer">Policy Library</span>
                            <i className="fa-solid fa-chevron-right text-xs"></i>
                            <span className="text-gray-900 font-medium">Create Policy</span>
                        </nav>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button 
                            onClick={onCancel}
                            className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg border border-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={onSaveDraft}
                            className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg border border-gray-300 transition-colors"
                        >
                            Save Draft
                        </button>
                        <button 
                            onClick={onPreview}
                            className="text-qireon-600 hover:text-qireon-700 px-4 py-2 rounded-lg border border-qireon-300 transition-colors"
                        >
                            Preview
                        </button>
                        <button 
                            onClick={onSubmitReview}
                            className="bg-green-600 hover:bg-qireon-700 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            Submit for Review
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};
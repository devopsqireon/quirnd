// File: /app/policy-management/create/components/sections/RichTextEditorSection.tsx

import React, { useState } from 'react';
import { Comment } from '../../types/policy-create.types';

interface RichTextEditorSectionProps {
    content: string;
    onChange: (content: string) => void;
}

const mockComments: Comment[] = [
    {
        id: '1',
        author: {
            name: 'Sarah Johnson',
            avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg'
        },
        content: 'Consider adding specific regulatory references',
        timestamp: '2 hours ago',
        resolved: false
    }
];

export const RichTextEditorSection: React.FC<RichTextEditorSectionProps> = ({
    content,
    onChange
}) => {
    const [showComments, setShowComments] = useState(true);

    const defaultContent = `
        <div class="space-y-6">
            <div class="border-l-4 border-qireon-500 pl-4">
                <h2 class="text-xl font-semibold text-gray-900 mb-2">1. Purpose</h2>
                <p class="text-gray-700 leading-relaxed">
                    This policy establishes the framework for information security management within the organization, 
                    ensuring compliance with ISO 27001 standards and regulatory requirements.
                </p>
            </div>
            
            <div class="border-l-4 border-blue-500 pl-4">
                <h2 class="text-xl font-semibold text-gray-900 mb-2">2. Scope</h2>
                <p class="text-gray-700 leading-relaxed">
                    This policy applies to all employees, contractors, and third-party vendors who have access to 
                    organizational information systems and data.
                </p>
            </div>
            
            <div class="border-l-4 border-green-500 pl-4">
                <h2 class="text-xl font-semibold text-gray-900 mb-2">3. Responsibilities</h2>
                <ul class="list-disc list-inside text-gray-700 space-y-2">
                    <li>Chief Information Security Officer: Overall policy oversight and implementation</li>
                    <li>Department Heads: Ensuring compliance within their respective areas</li>
                    <li>All Personnel: Adhering to security requirements and reporting incidents</li>
                </ul>
            </div>
            
            <div class="border-l-4 border-purple-500 pl-4">
                <h2 class="text-xl font-semibold text-gray-900 mb-2">4. Policy Statements</h2>
                <div class="space-y-3">
                    <p class="text-gray-700">4.1 Information Classification and Handling</p>
                    <p class="text-gray-700">4.2 Access Control and Authentication</p>
                    <p class="text-gray-700">4.3 Incident Response and Management</p>
                </div>
            </div>
        </div>
    `;

    const displayContent = content || defaultContent;

    return (
        <section className="mb-8">
            <div className="border border-gray-300 rounded-xl overflow-hidden">
                {/* Editor Toolbar */}
                <div className="bg-gray-50 border-b border-gray-300 p-3">
                    <div className="flex items-center space-x-1">
                        <div className="flex items-center space-x-1 border-r border-gray-300 pr-3 mr-3">
                            <button className="p-2 hover:bg-gray-200 rounded text-gray-600 transition-colors">
                                <i className="fa-solid fa-bold"></i>
                            </button>
                            <button className="p-2 hover:bg-gray-200 rounded text-gray-600 transition-colors">
                                <i className="fa-solid fa-italic"></i>
                            </button>
                            <button className="p-2 hover:bg-gray-200 rounded text-gray-600 transition-colors">
                                <i className="fa-solid fa-underline"></i>
                            </button>
                        </div>
                        
                        <div className="flex items-center space-x-1 border-r border-gray-300 pr-3 mr-3">
                            <button className="p-2 hover:bg-gray-200 rounded text-gray-600 transition-colors">
                                <i className="fa-solid fa-align-left"></i>
                            </button>
                            <button className="p-2 hover:bg-gray-200 rounded text-gray-600 transition-colors">
                                <i className="fa-solid fa-align-center"></i>
                            </button>
                            <button className="p-2 hover:bg-gray-200 rounded text-gray-600 transition-colors">
                                <i className="fa-solid fa-align-right"></i>
                            </button>
                        </div>
                        
                        <div className="flex items-center space-x-1 border-r border-gray-300 pr-3 mr-3">
                            <button className="p-2 hover:bg-gray-200 rounded text-gray-600 transition-colors">
                                <i className="fa-solid fa-list-ul"></i>
                            </button>
                            <button className="p-2 hover:bg-gray-200 rounded text-gray-600 transition-colors">
                                <i className="fa-solid fa-list-ol"></i>
                            </button>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                            <button className="p-2 hover:bg-gray-200 rounded text-gray-600 transition-colors">
                                <i className="fa-solid fa-link"></i>
                            </button>
                            <button className="p-2 hover:bg-gray-200 rounded text-gray-600 transition-colors">
                                <i className="fa-solid fa-image"></i>
                            </button>
                            <button className="p-2 hover:bg-gray-200 rounded text-gray-600 transition-colors">
                                <i className="fa-solid fa-table"></i>
                            </button>
                        </div>
                        
                        <div className="ml-auto flex items-center space-x-2">
                            <button 
                                onClick={() => setShowComments(!showComments)}
                                className="px-3 py-2 bg-qireon-100 text-qireon-700 rounded-lg text-sm hover:bg-qireon-200 transition-colors"
                            >
                                <i className="fa-solid fa-comments mr-1"></i>
                                Comments ({mockComments.length})
                            </button>
                            <button className="px-3 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition-colors">
                                <i className="fa-solid fa-eye mr-1"></i>
                                Accessibility Check
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Editor Content Area */}
                <div className="p-6 min-h-[600px] bg-white">
                    <div 
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: displayContent }}
                        contentEditable
                        onBlur={(e) => onChange(e.currentTarget.innerHTML)}
                    />
                    
                    {/* Comments Section */}
                    {showComments && mockComments.length > 0 && (
                        <div className="mt-6 space-y-3">
                            {mockComments.map((comment) => (
                                <div key={comment.id} className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <div className="flex items-start">
                                        <i className="fa-solid fa-comment-dots text-yellow-600 mt-1 mr-2"></i>
                                        <div>
                                            <p className="text-sm text-yellow-800">
                                                <strong>Review Comment:</strong> {comment.content}
                                            </p>
                                            <p className="text-xs text-yellow-600 mt-1">
                                                by {comment.author.name} • {comment.timestamp}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
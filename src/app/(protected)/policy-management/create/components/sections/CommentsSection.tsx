// File: /app/policy-management/create/components/sections/CommentsSection.tsx

import React, { useState } from 'react';
import { Comment } from '../../types/policy-create.types';

interface CommentsSectionProps {
    comments: Comment[];
}

const mockComments: Comment[] = [
    {
        id: '1',
        author: {
            name: 'Sarah Johnson',
            avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg'
        },
        content: 'Please add specific regulatory references in the Purpose section.',
        timestamp: '2 hours ago',
        resolved: false
    },
    {
        id: '2',
        author: {
            name: 'Michael Chen',
            avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg'
        },
        content: 'Consider adding a section about third-party vendor requirements.',
        timestamp: '1 day ago',
        resolved: false
    }
];

export const CommentsSection: React.FC<CommentsSectionProps> = ({
    comments
}) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const displayComments = comments.length > 0 ? comments : mockComments;
    const activeComments = displayComments.filter(comment => !comment.resolved);

    return (
        <section className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Review Comments</h3>
                <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                        {activeComments.length} Active
                    </span>
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <i className={`fa-solid ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                    </button>
                </div>
            </div>
            
            {isExpanded && (
                <div className="space-y-4">
                    {activeComments.slice(0, 2).map((comment) => (
                        <div key={comment.id} className="p-3 border border-yellow-200 rounded-lg bg-yellow-50">
                            <div className="flex items-start">
                                <img 
                                    src={comment.author.avatar} 
                                    alt={comment.author.name} 
                                    className="w-8 h-8 rounded-full mr-3"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <span className="font-medium text-gray-900">{comment.author.name}</span>
                                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                                    </div>
                                    <p className="text-sm text-gray-700">{comment.content}</p>
                                    <button className="text-qireon-600 text-xs hover:text-qireon-700 mt-1 transition-colors">
                                        Reply
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {activeComments.length > 2 && (
                        <button className="w-full text-qireon-600 hover:text-qireon-700 text-sm font-medium transition-colors">
                            View all comments ({activeComments.length})
                        </button>
                    )}

                    {activeComments.length === 0 && (
                        <div className="text-center py-4 text-gray-500">
                            <i className="fa-solid fa-comments text-2xl mb-2"></i>
                            <p className="text-sm">No active comments</p>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};
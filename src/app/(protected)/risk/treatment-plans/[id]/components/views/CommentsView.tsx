// /app/risk/treatment-plan/[id]/components/views/CommentsView.tsx
'use client';

import React, { useState } from 'react';
import { MessageSquareIcon, SendIcon, UserIcon, AtSignIcon } from 'lucide-react';
import { useTreatmentDetails } from '../../contexts/TreatmentDetailsContext';
import { mockUsers } from '../../data/mockData';

export const CommentsView: React.FC = () => {
  const { treatmentDetails, addComment } = useTreatmentDetails();
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!treatmentDetails) return null;

  const { comments, treatmentPlan } = treatmentDetails;

  const getUserName = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    return user ? user.name : userId;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await addComment({
        entityId: treatmentPlan.id,
        entityType: 'treatment',
        author: 'current-user',
        content: newComment,
        mentions: [],
        attachments: []
      });
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Comments & Discussions</h2>
        <p className="text-gray-600 text-sm">Collaborate and share updates with your team</p>
      </div>

      {/* Add Comment Form */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <form onSubmit={handleSubmitComment}>
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              Add a comment
            </label>
            <textarea
              id="comment"
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share an update, ask a question, or provide feedback..."
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <AtSignIcon className="w-4 h-4" />
              <span>Use @ to mention team members</span>
            </div>
            <button
              type="submit"
              disabled={!newComment.trim() || isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SendIcon className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {sortedComments.map((comment) => (
          <div key={comment.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-gray-600" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-900">{getUserName(comment.author)}</span>
                    <span className="text-sm text-gray-600">commented on</span>
                    <span className="text-sm text-gray-600 capitalize">{comment.entityType}</span>
                  </div>
                  <span className="text-sm text-gray-500">{formatTimestamp(comment.createdDate)}</span>
                </div>
                
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
                </div>

                {/* Mentions */}
                {comment.mentions.length > 0 && (
                  <div className="mt-3 flex items-center gap-2">
                    <AtSignIcon className="w-4 h-4 text-gray-400" />
                    <div className="flex flex-wrap gap-2">
                      {comment.mentions.map((mention, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          @{getUserName(mention)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Attachments */}
                {comment.attachments.length > 0 && (
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-2">
                      {comment.attachments.map((attachment) => (
                        <a
                          key={attachment.id}
                          href={attachment.url}
                          className="inline-flex items-center px-3 py-1 rounded-md text-sm text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300"
                        >
                          {attachment.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {sortedComments.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <MessageSquareIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No comments yet</h3>
            <p className="text-gray-600">Start the conversation by adding the first comment.</p>
          </div>
        )}
      </div>
    </div>
  );
};
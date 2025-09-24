// File: /app/policy-management/view/components/panels/PolicyCommentsPanel.tsx

'use client'

import React, { useState, useEffect } from 'react';
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { PolicyComment } from '../../types/policy-view.types';

interface PolicyCommentsPanelProps {
  policyId: string;
}

export function PolicyCommentsPanel({ policyId }: PolicyCommentsPanelProps) {
  const [comments, setComments] = useState<PolicyComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch comments
    const fetchComments = async () => {
      setLoading(true);
      try {
        // Mock data - replace with actual API call
        const mockComments: PolicyComment[] = [
          {
            id: 'comment1',
            author: 'Sarah Johnson',
            authorRole: 'CISO',
            content: 'The authentication requirements section needs to be updated to reflect our new SSO implementation.',
            timestamp: '2024-09-15T10:30:00Z',
            isResolved: false,
            replies: [
              {
                id: 'reply1',
                author: 'John Smith',
                content: 'Agreed. I\'ll update that section in the next revision.',
                timestamp: '2024-09-15T11:15:00Z'
              }
            ]
          },
          {
            id: 'comment2',
            author: 'Michael Brown',
            authorRole: 'Legal Counsel',
            content: 'Please add a reference to the new data retention regulations that came into effect last month.',
            timestamp: '2024-09-14T14:20:00Z',
            isResolved: true,
            replies: []
          }
        ];
        
        setComments(mockComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [policyId]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: PolicyComment = {
      id: `comment${Date.now()}`,
      author: 'Current User',
      authorRole: 'Policy Manager',
      content: newComment,
      timestamp: new Date().toISOString(),
      isResolved: false,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleSubmitReply = (commentId: string) => {
    if (!replyText.trim()) return;

    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: `reply${Date.now()}`,
              author: 'Current User',
              content: replyText,
              timestamp: new Date().toISOString()
            }
          ]
        };
      }
      return comment;
    });

    setComments(updatedComments);
    setReplyText('');
    setReplyingTo(null);
  };

  const toggleResolved = (commentId: string) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, isResolved: !comment.isResolved };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than an hour ago';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-sm text-gray-600">Loading comments...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
          Comments ({comments.length})
        </h3>
      </div>

      {/* New Comment Form */}
      <form onSubmit={handleSubmitComment} className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <UserCircleIcon className="h-8 w-8 text-gray-400" />
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PaperAirplaneIcon className="h-4 w-4 mr-2" />
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="text-center py-12">
          <ChatBubbleLeftRightIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No comments yet</h3>
          <p className="mt-1 text-sm text-gray-500">Be the first to add a comment.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white border border-gray-200 rounded-lg p-4">
              {/* Comment Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <UserCircleIcon className="h-8 w-8 text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{comment.author}</p>
                    <p className="text-xs text-gray-500">{comment.authorRole} • {formatTimeAgo(comment.timestamp)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleResolved(comment.id)}
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                      comment.isResolved
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {comment.isResolved ? (
                      <>
                        <CheckIcon className="h-3 w-3 mr-1" />
                        Resolved
                      </>
                    ) : (
                      <>
                        <XMarkIcon className="h-3 w-3 mr-1" />
                        Open
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Comment Content */}
              <div className="mt-3 ml-11">
                <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
                
                {/* Reply Button */}
                <button
                  onClick={() => setReplyingTo(comment.id)}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Reply
                </button>
              </div>

              {/* Replies */}
              {comment.replies.length > 0 && (
                <div className="mt-4 ml-11 space-y-3">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="bg-gray-50 rounded-md p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <UserCircleIcon className="h-6 w-6 text-gray-400" />
                        <p className="text-sm font-medium text-gray-900">{reply.author}</p>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{formatTimeAgo(reply.timestamp)}</span>
                      </div>
                      <p className="text-sm text-gray-700 ml-8">{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Form */}
              {replyingTo === comment.id && (
                <div className="mt-4 ml-11">
                  <div className="flex items-start space-x-3">
                    <UserCircleIcon className="h-6 w-6 text-gray-400 flex-shrink-0" />
                    <div className="flex-1">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply..."
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                      <div className="mt-2 flex space-x-2">
                        <button
                          onClick={() => handleSubmitReply(comment.id)}
                          disabled={!replyText.trim()}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Reply
                        </button>
                        <button
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyText('');
                          }}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
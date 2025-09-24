// File: src/components/feedback/FeedbackCard.tsx

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, MessageCircle, MoreVertical } from 'lucide-react';
import { FeedbackItem } from '@/types/feedback';
import { getStatusColor, getPriorityColor, getCategoryColor, formatDate } from '@/utils/feedback';

interface FeedbackCardProps {
  feedback: FeedbackItem;
  onVote?: (id: string, vote: 'up' | 'down') => void;
  onComment?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

export function FeedbackCard({ 
  feedback, 
  onVote, 
  onComment, 
  onEdit, 
  onDelete, 
  showActions = true 
}: FeedbackCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="font-semibold text-gray-900">{feedback.title}</h3>
              <Badge className={`${getCategoryColor(feedback.category)} text-xs`}>
                {feedback.category}
              </Badge>
              <Badge className={`${getPriorityColor(feedback.priority)} text-xs`}>
                {feedback.priority}
              </Badge>
            </div>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{feedback.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>Submitted: {formatDate(feedback.submittedDate)}</span>
              <span>•</span>
              <button 
                onClick={() => onVote?.(feedback.id, 'up')}
                className="flex items-center hover:text-blue-600 transition-colors"
              >
                <ThumbsUp className="w-3 h-3 mr-1" />
                {feedback.votes} votes
              </button>
              <span>•</span>
              <button 
                onClick={() => onComment?.(feedback.id)}
                className="flex items-center hover:text-blue-600 transition-colors"
              >
                <MessageCircle className="w-3 h-3 mr-1" />
                {feedback.comments} comments
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <Badge className={`${getStatusColor(feedback.status)} text-sm font-medium`}>
              {feedback.status}
            </Badge>
            {showActions && (
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// File: src/utils/feedback.ts

import { FeedbackItem, FeedbackFilters } from '@/types/feedback';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    'new': 'bg-gray-100 text-gray-700',
    'under-review': 'bg-yellow-100 text-yellow-700',
    'planned': 'bg-blue-100 text-blue-700',
    'in-progress': 'bg-green-100 text-green-700',
    'completed': 'bg-green-100 text-green-700',
    'rejected': 'bg-red-100 text-red-700'
  };
  return statusColors[status] || 'bg-gray-100 text-gray-700';
}

export function getPriorityColor(priority: string): string {
  const priorityColors: Record<string, string> = {
    'low': 'bg-gray-100 text-gray-700',
    'medium': 'bg-yellow-100 text-yellow-700',
    'high': 'bg-orange-100 text-orange-700',
    'critical': 'bg-red-100 text-red-700'
  };
  return priorityColors[priority] || 'bg-gray-100 text-gray-700';
}

export function getCategoryColor(category: string): string {
  const categoryColors: Record<string, string> = {
    'feature': 'bg-blue-100 text-blue-700',
    'bug': 'bg-red-100 text-red-700',
    'improvement': 'bg-purple-100 text-purple-700',
    'integration': 'bg-green-100 text-green-700',
    'performance': 'bg-orange-100 text-orange-700'
  };
  return categoryColors[category] || 'bg-gray-100 text-gray-700';
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

  if (diffInHours < 1) {
    return 'Just now';
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)} hours ago`;
  } else if (diffInHours < 168) { // 7 days
    return `${Math.floor(diffInHours / 24)} days ago`;
  } else {
    return formatDate(dateString);
  }
}

export function filterFeedback(feedback: FeedbackItem[], filters: FeedbackFilters): FeedbackItem[] {
  let filtered = [...feedback];

  // Search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower)
    );
  }

  // Category filter
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(item => item.category === filters.category);
  }

  // Status filter
  if (filters.status && filters.status !== 'all') {
    filtered = filtered.filter(item => item.status === filters.status);
  }

  // Priority filter
  if (filters.priority && filters.priority !== 'all') {
    filtered = filtered.filter(item => item.priority === filters.priority);
  }

  // Date range filter
  if (filters.dateRange) {
    filtered = filtered.filter(item => {
      const itemDate = new Date(item.submittedDate);
      return itemDate >= filters.dateRange!.start && itemDate <= filters.dateRange!.end;
    });
  }

  // Sort
  filtered.sort((a, b) => {
    switch (filters.sortBy) {
      case 'newest':
        return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
      case 'oldest':
        return new Date(a.submittedDate).getTime() - new Date(b.submittedDate).getTime();
      case 'most-voted':
        return b.votes - a.votes;
      case 'most-commented':
        return b.comments - a.comments;
      default:
        return 0;
    }
  });

  return filtered;
}

export function validateFeedbackForm(data: Partial<FeedbackItem>): string[] {
  const errors: string[] = [];

  if (!data.title?.trim()) {
    errors.push('Title is required');
  } else if (data.title.length > 100) {
    errors.push('Title must be less than 100 characters');
  }

  if (!data.description?.trim()) {
    errors.push('Description is required');
  } else if (data.description.length < 20) {
    errors.push('Description must be at least 20 characters');
  } else if (data.description.length > 1000) {
    errors.push('Description must be less than 1000 characters');
  }

  if (!data.category) {
    errors.push('Category is required');
  }

  if (!data.priority) {
    errors.push('Priority is required');
  }

  if (!data.impactArea) {
    errors.push('Impact area is required');
  }

  return errors;
}

export function generateFeedbackId(): string {
  return `fb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function calculateEngagementScore(item: FeedbackItem): number {
  // Simple engagement score calculation
  const voteWeight = 1;
  const commentWeight = 2;
  const ageWeight = 0.1;
  
  const daysSinceSubmission = (Date.now() - new Date(item.submittedDate).getTime()) / (1000 * 60 * 60 * 24);
  const agePenalty = Math.max(0, daysSinceSubmission * ageWeight);
  
  return Math.max(0, (item.votes * voteWeight + item.comments * commentWeight) - agePenalty);
}

export function groupFeedbackByCategory(feedback: FeedbackItem[]): Record<string, FeedbackItem[]> {
  return feedback.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, FeedbackItem[]>);
}

export function exportFeedbackToCSV(feedback: FeedbackItem[]): string {
  const headers = ['ID', 'Title', 'Description', 'Category', 'Priority', 'Status', 'Votes', 'Comments', 'Submitted Date'];
  
  const csvContent = [
    headers.join(','),
    ...feedback.map(item => [
      item.id,
      `"${item.title.replace(/"/g, '""')}"`,
      `"${item.description.replace(/"/g, '""')}"`,
      item.category,
      item.priority,
      item.status,
      item.votes,
      item.comments,
      item.submittedDate
    ].join(','))
  ].join('\n');

  return csvContent;
}

export function getRandomAvatarColor(seed: string): string {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-orange-500'
  ];
  
  const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}
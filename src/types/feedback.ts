// File: src/types/feedback.ts

export interface FeedbackItem {
    id: string;
    title: string;
    description: string;
    category: 'feature' | 'bug' | 'improvement' | 'integration' | 'performance';
    priority: 'low' | 'medium' | 'high' | 'critical';
    impactArea: 'ux' | 'performance' | 'security' | 'analytics' | 'api';
    status: 'new' | 'under-review' | 'planned' | 'in-progress' | 'completed' | 'rejected';
    votes: number;
    comments: number;
    submittedDate: string;
    updatedDate?: string;
    assignee?: string;
    attachments?: string[];
    tags?: string[];
    organizationId: string;
    userId: string;
  }
  
  export interface RoadmapItem {
    id: string;
    title: string;
    description: string;
    category: string;
    status: 'upcoming' | 'in-progress' | 'planning' | 'completed';
    targetDate: string;
    progress?: number;
    votes: number;
    quarter: string;
    features: string[];
    dependencies?: string[];
  }
  
  export interface CommunityFeedback {
    id: string;
    title: string;
    description: string;
    category: string;
    votes: number;
    comments: number;
    submittedDate: string;
    author: {
      id: string;
      name: string;
      company: string;
      tier: 'free' | 'pro' | 'enterprise';
      avatar: string;
    };
    isPublic: boolean;
    tags: string[];
  }
  
  export interface FeedbackAnalytics {
    totalFeedback: number;
    byCategory: {
      category: string;
      count: number;
      percentage: number;
    }[];
    byStatus: {
      status: string;
      count: number;
      percentage: number;
    }[];
    averageResolutionTime: number;
    satisfactionScore: number;
    implementationRate: number;
    monthlyGrowth: number;
  }
  
  export interface AIInsight {
    id: string;
    type: 'trending' | 'segment' | 'duplicate' | 'suggestion';
    title: string;
    description: string;
    recommendation: string;
    confidence: number;
    relatedFeedback: string[];
    createdAt: string;
  }
  
  export interface EngagementMetrics {
    totalFeedback: number;
    totalVotes: number;
    activeContributors: number;
    featuresDelivered: number;
    monthlyGrowth: {
      feedback: number;
      votes: number;
      contributors: number;
    };
  }
  
  export interface FeedbackFormData {
    title: string;
    description: string;
    category: FeedbackItem['category'];
    priority: FeedbackItem['priority'];
    impactArea: FeedbackItem['impactArea'];
    attachments?: File[];
    tags?: string[];
  }
  
  export interface FeedbackFilters {
    search: string;
    category?: string;
    status?: string;
    priority?: string;
    dateRange?: {
      start: Date;
      end: Date;
    };
    sortBy: 'newest' | 'oldest' | 'most-voted' | 'most-commented';
  }
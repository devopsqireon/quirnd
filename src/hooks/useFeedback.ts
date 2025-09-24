// File: src/hooks/useFeedback.ts

import { useState, useEffect, useCallback } from 'react';
import { FeedbackItem, FeedbackFilters, FeedbackFormData } from '@/types/feedback';
import { toast } from 'sonner';

export function useFeedback() {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFeedback = useCallback(async (filters?: FeedbackFilters) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data would be replaced with actual API call
      const mockData: FeedbackItem[] = [
        {
          id: '1',
          title: 'Enhanced Dashboard Analytics',
          description: 'Need more detailed analytics with custom date ranges and advanced filtering options for better insights.',
          category: 'feature',
          priority: 'high',
          impactArea: 'analytics',
          status: 'in-progress',
          votes: 12,
          comments: 5,
          submittedDate: '2024-10-15',
          organizationId: 'org-1',
          userId: 'user-1'
        }
      ];
      
      setFeedback(mockData);
    } catch (err) {
      setError('Failed to fetch feedback');
      toast.error('Failed to load feedback');
    } finally {
      setLoading(false);
    }
  }, []);

  const submitFeedback = async (data: FeedbackFormData) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Feedback submitted successfully!');
      
      // Refresh feedback list
      await fetchFeedback();
    } catch (err) {
      toast.error('Failed to submit feedback');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const voteFeedback = async (feedbackId: string, vote: 'up' | 'down') => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setFeedback(prev => 
        prev.map(item => 
          item.id === feedbackId 
            ? { ...item, votes: vote === 'up' ? item.votes + 1 : item.votes - 1 }
            : item
        )
      );
      
      toast.success(`Vote ${vote === 'up' ? 'added' : 'removed'} successfully!`);
    } catch (err) {
      toast.error('Failed to vote');
    }
  };

  const deleteFeedback = async (feedbackId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setFeedback(prev => prev.filter(item => item.id !== feedbackId));
      toast.success('Feedback deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete feedback');
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  return {
    feedback,
    loading,
    error,
    fetchFeedback,
    submitFeedback,
    voteFeedback,
    deleteFeedback
  };
}

// File: src/hooks/useRoadmap.ts

import { useState, useEffect, useCallback } from 'react';
import { RoadmapItem } from '@/types/feedback';

export function useRoadmap() {
  const [roadmapItems, setRoadmapItems] = useState<Record<string, RoadmapItem[]>>({});
  const [loading, setLoading] = useState(false);

  const fetchRoadmap = useCallback(async (quarter?: string) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock roadmap data
      const mockData = {
        upcoming: [
          {
            id: '1',
            title: 'Advanced Analytics Dashboard',
            description: 'Comprehensive analytics with custom metrics and real-time data visualization.',
            category: 'Feature',
            status: 'upcoming' as const,
            targetDate: 'Dec 2024',
            votes: 23,
            quarter: 'Q4 2024',
            features: ['Custom metrics', 'Real-time data', 'Advanced charts']
          }
        ],
        'in-progress': [
          {
            id: '2',
            title: 'Dark Mode Interface',
            description: 'System-wide dark mode with automatic switching based on preferences.',
            category: 'Feature',
            status: 'in-progress' as const,
            targetDate: 'Nov 2024',
            progress: 75,
            votes: 42,
            quarter: 'Q4 2024',
            features: ['Dark theme', 'Auto switching', 'User preferences']
          }
        ],
        planning: [],
        completed: []
      };
      
      setRoadmapItems(mockData);
    } catch (err) {
      console.error('Failed to fetch roadmap:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoadmap();
  }, [fetchRoadmap]);

  return {
    roadmapItems,
    loading,
    fetchRoadmap
  };
}

// File: src/hooks/useAnalytics.ts

import { useState, useEffect, useCallback } from 'react';
import { FeedbackAnalytics, EngagementMetrics, AIInsight } from '@/types/feedback';

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<FeedbackAnalytics | null>(null);
  const [engagement, setEngagement] = useState<EngagementMetrics | null>(null);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Mock analytics data
      setAnalytics({
        totalFeedback: 247,
        byCategory: [
          { category: 'Feature Requests', count: 142, percentage: 65 },
          { category: 'Bug Reports', count: 89, percentage: 40 },
          { category: 'Improvements', count: 67, percentage: 30 },
          { category: 'Integrations', count: 34, percentage: 15 }
        ],
        byStatus: [
          { status: 'New', count: 45, percentage: 18 },
          { status: 'In Progress', count: 32, percentage: 13 },
          { status: 'Completed', count: 89, percentage: 36 }
        ],
        averageResolutionTime: 14,
        satisfactionScore: 4.7,
        implementationRate: 68,
        monthlyGrowth: 23
      });

      setEngagement({
        totalFeedback: 1247,
        totalVotes: 8934,
        activeContributors: 456,
        featuresDelivered: 89,
        monthlyGrowth: {
          feedback: 23,
          votes: 45,
          contributors: 12
        }
      });

      setInsights([
        {
          id: '1',
          type: 'trending',
          title: 'Trending Requests',
          description: 'Mobile app improvements are trending 340% higher than usual.',
          recommendation: 'Recommend prioritizing mobile features',
          confidence: 0.89,
          relatedFeedback: ['fb-1', 'fb-2', 'fb-3'],
          createdAt: '2024-10-20'
        }
      ]);
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    analytics,
    engagement,
    insights,
    loading,
    fetchAnalytics
  };
}
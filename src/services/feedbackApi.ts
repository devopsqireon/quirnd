// File: src/services/feedbackApi.ts

import { FeedbackItem, FeedbackFormData, FeedbackFilters } from '@/types/feedback';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export class FeedbackApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
  }

  // Feedback CRUD operations
  async getFeedback(filters?: FeedbackFilters): Promise<{ data: FeedbackItem[]; total: number }> {
    const params = new URLSearchParams();
    
    if (filters?.search) params.append('search', filters.search);
    if (filters?.category && filters.category !== 'all') params.append('category', filters.category);
    if (filters?.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters?.priority && filters.priority !== 'all') params.append('priority', filters.priority);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);

    return this.request(`/feedback?${params.toString()}`);
  }

  async getFeedbackById(id: string): Promise<FeedbackItem> {
    return this.request(`/feedback/${id}`);
  }

  async createFeedback(data: FeedbackFormData): Promise<FeedbackItem> {
    return this.request('/feedback', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateFeedback(id: string, data: Partial<FeedbackItem>): Promise<FeedbackItem> {
    return this.request(`/feedback/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteFeedback(id: string): Promise<void> {
    return this.request(`/feedback/${id}`, {
      method: 'DELETE',
    });
  }

  // Voting
  async voteFeedback(id: string, vote: 'up' | 'down'): Promise<{ votes: number }> {
    return this.request(`/feedback/${id}/vote`, {
      method: 'POST',
      body: JSON.stringify({ vote }),
    });
  }

  // Comments
  async getComments(feedbackId: string): Promise<any[]> {
    return this.request(`/feedback/${feedbackId}/comments`);
  }

  async addComment(feedbackId: string, content: string): Promise<any> {
    return this.request(`/feedback/${feedbackId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  }

  // File uploads
  async uploadAttachment(file: File): Promise<{ url: string; id: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/feedback/attachments`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload file');
    }

    return response.json();
  }

  // Analytics
  async getAnalytics(): Promise<any> {
    return this.request('/feedback/analytics');
  }

  async getEngagementMetrics(): Promise<any> {
    return this.request('/feedback/engagement');
  }

  async getAIInsights(): Promise<any[]> {
    return this.request('/feedback/ai-insights');
  }

  // Roadmap
  async getRoadmap(quarter?: string): Promise<any> {
    const params = quarter ? `?quarter=${quarter}` : '';
    return this.request(`/roadmap${params}`);
  }

  // Community feedback
  async getCommunityFeedback(filters?: any): Promise<any> {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    
    return this.request(`/feedback/community?${params.toString()}`);
  }
}

export const feedbackApi = new FeedbackApiService();
// File: src/config/feedback.ts

export const FEEDBACK_CONFIG = {
    // Form validation
    title: {
      minLength: 5,
      maxLength: 100
    },
    description: {
      minLength: 20,
      maxLength: 1000
    },
    
    // File upload
    attachments: {
      maxSize: 10 * 1024 * 1024, // 10MB
      allowedTypes: ['image/png', 'image/jpeg', 'application/pdf'],
      maxFiles: 5
    },
    
    // Pagination
    itemsPerPage: 10,
    maxItemsPerPage: 50,
    
    // Voting
    voting: {
      cooldownMinutes: 1,
      maxVotesPerUser: 100
    },
    
    // AI suggestions
    ai: {
      minSimilarityScore: 0.7,
      maxSuggestions: 3,
      enabled: true
    },
    
    // Categories
    categories: [
      { value: 'feature', label: 'Feature Request', color: 'blue' },
      { value: 'bug', label: 'Bug Report', color: 'red' },
      { value: 'improvement', label: 'Improvement', color: 'purple' },
      { value: 'integration', label: 'Integration', color: 'green' },
      { value: 'performance', label: 'Performance', color: 'orange' }
    ],
    
    // Priorities
    priorities: [
      { value: 'low', label: 'Low', color: 'gray' },
      { value: 'medium', label: 'Medium', color: 'yellow' },
      { value: 'high', label: 'High', color: 'orange' },
      { value: 'critical', label: 'Critical', color: 'red' }
    ],
    
    // Impact areas
    impactAreas: [
      { value: 'ux', label: 'User Experience', color: 'blue' },
      { value: 'performance', label: 'Performance', color: 'green' },
      { value: 'security', label: 'Security', color: 'red' },
      { value: 'analytics', label: 'Analytics', color: 'purple' },
      { value: 'api', label: 'API', color: 'orange' }
    ],
    
    // Statuses
    statuses: [
      { value: 'new', label: 'New', color: 'gray' },
      { value: 'under-review', label: 'Under Review', color: 'yellow' },
      { value: 'planned', label: 'Planned', color: 'blue' },
      { value: 'in-progress', label: 'In Progress', color: 'green' },
      { value: 'completed', label: 'Completed', color: 'green' },
      { value: 'rejected', label: 'Rejected', color: 'red' }
    ],
    
    // Roadmap quarters
    quarters: [
      { value: 'q4-2024', label: 'Q4 2024' },
      { value: 'q1-2025', label: 'Q1 2025' },
      { value: 'q2-2025', label: 'Q2 2025' },
      { value: 'q3-2025', label: 'Q3 2025' }
    ],
    
    // Analytics refresh intervals
    analytics: {
      refreshIntervalMs: 5 * 60 * 1000, // 5 minutes
      cacheTimeMs: 15 * 60 * 1000, // 15 minutes
    },
    
    // Notifications
    notifications: {
      enabled: true,
      types: {
        newFeedback: true,
        statusUpdate: true,
        newComment: true,
        newVote: false
      }
    }
  };
  
  
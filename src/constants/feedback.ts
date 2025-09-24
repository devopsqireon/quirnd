// File: src/constants/feedback.ts

export const FEEDBACK_MESSAGES = {
    success: {
      submitted: 'Feedback submitted successfully!',
      updated: 'Feedback updated successfully!',
      deleted: 'Feedback deleted successfully!',
      voted: 'Vote recorded successfully!',
      exported: 'Feedback exported successfully!'
    },
    error: {
      submitFailed: 'Failed to submit feedback. Please try again.',
      updateFailed: 'Failed to update feedback. Please try again.',
      deleteFailed: 'Failed to delete feedback. Please try again.',
      voteFailed: 'Failed to record vote. Please try again.',
      loadFailed: 'Failed to load feedback. Please refresh the page.',
      exportFailed: 'Failed to export feedback. Please try again.',
      fileTooLarge: 'File size exceeds the maximum limit of 10MB.',
      invalidFileType: 'Invalid file type. Please upload PNG, JPG, or PDF files only.',
      networkError: 'Network error. Please check your connection.',
      validationError: 'Please check your input and try again.'
    },
    validation: {
      titleRequired: 'Title is required',
      titleTooShort: 'Title must be at least 5 characters',
      titleTooLong: 'Title must be less than 100 characters',
      descriptionRequired: 'Description is required',
      descriptionTooShort: 'Description must be at least 20 characters',
      descriptionTooLong: 'Description must be less than 1000 characters',
      categoryRequired: 'Please select a category',
      priorityRequired: 'Please select a priority',
      impactAreaRequired: 'Please select an impact area'
    },
    loading: {
      submitting: 'Submitting feedback...',
      loading: 'Loading feedback...',
      updating: 'Updating feedback...',
      deleting: 'Deleting feedback...',
      voting: 'Recording vote...',
      exporting: 'Exporting feedback...'
    }
  };
  
  export const ANALYTICS_CHARTS = {
    colors: {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#06B6D4'
    },
    gradients: {
      blue: ['#3B82F6', '#1E40AF'],
      purple: ['#8B5CF6', '#6D28D9'],
      green: ['#10B981', '#047857'],
      orange: ['#F59E0B', '#D97706'],
      red: ['#EF4444', '#DC2626']
    }
  };
  
  export const DEFAULT_FILTERS = {
    search: '',
    category: 'all',
    status: 'all',
    priority: 'all',
    sortBy: 'newest' as const
  };
  
  export const ROADMAP_COLUMNS = {
    upcoming: {
      title: 'Upcoming (Q4 2024)',
      bgColor: 'bg-gray-50',
      dotColor: 'bg-gray-400',
      borderColor: 'border-gray-200'
    },
    'in-progress': {
      title: 'In Progress',
      bgColor: 'bg-blue-50',
      dotColor: 'bg-blue-500',
      borderColor: 'border-blue-200'
    },
    planning: {
      title: 'Planning (Q1 2025)',
      bgColor: 'bg-yellow-50',
      dotColor: 'bg-yellow-500',
      borderColor: 'border-yellow-200'
    },
    completed: {
      title: 'Recently Completed',
      bgColor: 'bg-green-50',
      dotColor: 'bg-green-500',
      borderColor: 'border-green-200'
    }
  };
  
  export const AI_INSIGHT_TYPES = {
    trending: {
      icon: 'TrendingUp',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    segment: {
      icon: 'Users',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    duplicate: {
      icon: 'Copy',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    suggestion: {
      icon: 'Lightbulb',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  };
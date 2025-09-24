// File: src/context/FeedbackContext.tsx

'use client';

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { FeedbackItem, FeedbackFilters, FeedbackFormData } from '@/types/feedback';
import { feedbackApi } from '@/services/feedbackApi';
import { toast } from 'sonner';

interface FeedbackState {
  feedback: FeedbackItem[];
  loading: boolean;
  error: string | null;
  filters: FeedbackFilters;
  total: number;
  currentPage: number;
}

type FeedbackAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_FEEDBACK'; payload: { data: FeedbackItem[]; total: number } }
  | { type: 'ADD_FEEDBACK'; payload: FeedbackItem }
  | { type: 'UPDATE_FEEDBACK'; payload: FeedbackItem }
  | { type: 'DELETE_FEEDBACK'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<FeedbackFilters> }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'UPDATE_VOTES'; payload: { id: string; votes: number } };

const initialState: FeedbackState = {
  feedback: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    category: undefined,
    status: undefined,
    priority: undefined,
    sortBy: 'newest'
  },
  total: 0,
  currentPage: 1
};

function feedbackReducer(state: FeedbackState, action: FeedbackAction): FeedbackState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_FEEDBACK':
      return {
        ...state,
        feedback: action.payload.data,
        total: action.payload.total,
        loading: false,
        error: null
      };
    case 'ADD_FEEDBACK':
      return {
        ...state,
        feedback: [action.payload, ...state.feedback],
        total: state.total + 1
      };
    case 'UPDATE_FEEDBACK':
      return {
        ...state,
        feedback: state.feedback.map(item =>
          item.id === action.payload.id ? action.payload : item
        )
      };
    case 'DELETE_FEEDBACK':
      return {
        ...state,
        feedback: state.feedback.filter(item => item.id !== action.payload),
        total: state.total - 1
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        currentPage: 1
      };
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    case 'UPDATE_VOTES':
      return {
        ...state,
        feedback: state.feedback.map(item =>
          item.id === action.payload.id
            ? { ...item, votes: action.payload.votes }
            : item
        )
      };
    default:
      return state;
  }
}

interface FeedbackContextType {
  state: FeedbackState;
  actions: {
    fetchFeedback: () => Promise<void>;
    submitFeedback: (data: FeedbackFormData) => Promise<void>;
    updateFeedback: (id: string, data: Partial<FeedbackItem>) => Promise<void>;
    deleteFeedback: (id: string) => Promise<void>;
    voteFeedback: (id: string, vote: 'up' | 'down') => Promise<void>;
    setFilters: (filters: Partial<FeedbackFilters>) => void;
    setPage: (page: number) => void;
  };
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(feedbackReducer, initialState);

  const fetchFeedback = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const response = await feedbackApi.getFeedback(state.filters);
      dispatch({ type: 'SET_FEEDBACK', payload: response });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch feedback';
      dispatch({ type: 'SET_ERROR', payload: message });
      toast.error(message);
    }
  }, [state.filters]);

  const submitFeedback = useCallback(async (data: FeedbackFormData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const newFeedback = await feedbackApi.createFeedback(data);
      dispatch({ type: 'ADD_FEEDBACK', payload: newFeedback });
      toast.success('Feedback submitted successfully!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to submit feedback';
      dispatch({ type: 'SET_ERROR', payload: message });
      toast.error(message);
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const updateFeedback = useCallback(async (id: string, data: Partial<FeedbackItem>) => {
    try {
      const updatedFeedback = await feedbackApi.updateFeedback(id, data);
      dispatch({ type: 'UPDATE_FEEDBACK', payload: updatedFeedback });
      toast.success('Feedback updated successfully!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update feedback';
      toast.error(message);
      throw error;
    }
  }, []);

  const deleteFeedback = useCallback(async (id: string) => {
    try {
      await feedbackApi.deleteFeedback(id);
      dispatch({ type: 'DELETE_FEEDBACK', payload: id });
      toast.success('Feedback deleted successfully!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete feedback';
      toast.error(message);
      throw error;
    }
  }, []);

  const voteFeedback = useCallback(async (id: string, vote: 'up' | 'down') => {
    try {
      const response = await feedbackApi.voteFeedback(id, vote);
      dispatch({ type: 'UPDATE_VOTES', payload: { id, votes: response.votes } });
      toast.success(`Vote ${vote === 'up' ? 'added' : 'removed'} successfully!`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to vote';
      toast.error(message);
    }
  }, []);

  const setFilters = useCallback((filters: Partial<FeedbackFilters>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  }, []);

  const setPage = useCallback((page: number) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  }, []);

  // Fetch feedback when filters or page changes
  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback, state.currentPage]);

  const contextValue: FeedbackContextType = {
    state,
    actions: {
      fetchFeedback,
      submitFeedback,
      updateFeedback,
      deleteFeedback,
      voteFeedback,
      setFilters,
      setPage
    }
  };

  return (
    <FeedbackContext.Provider value={contextValue}>
      {children}
    </FeedbackContext.Provider>
  );
}

export function useFeedbackContext() {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedbackContext must be used within a FeedbackProvider');
  }
  return context;
}
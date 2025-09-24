// /app/risk/treatment-plan/[id]/contexts/TreatmentDetailsContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  TreatmentDetails, 
  TreatmentDetailsContextType, 
  ViewMode, 
  FilterOptions, 
  SortOption,
  TreatmentPlan,
  ActionItem,
  Comment
} from '../types';
import { mockTreatmentDetails } from '../data/mockData';

const TreatmentDetailsContext = createContext<TreatmentDetailsContextType | undefined>(undefined);

interface TreatmentDetailsProviderProps {
  children: ReactNode;
  treatmentId: string;
}

export const TreatmentDetailsProvider: React.FC<TreatmentDetailsProviderProps> = ({
  children,
  treatmentId
}) => {
  const [treatmentDetails, setTreatmentDetails] = useState<TreatmentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>({ type: 'overview' });
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    status: [],
    priority: [],
    assignedTo: [],
    type: [],
    dateRange: { start: '', end: '' }
  });

  const [sortOption, setSortOption] = useState<SortOption>({
    field: 'dueDate',
    direction: 'asc'
  });

  // Simulate data loading
  useEffect(() => {
    const loadTreatmentDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In real app, this would be: await fetchTreatmentDetails(treatmentId);
        const data = mockTreatmentDetails.find(t => t.treatmentPlan.id === treatmentId);
        
        if (!data) {
          throw new Error('Treatment plan not found');
        }
        
        setTreatmentDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load treatment details');
      } finally {
        setLoading(false);
      }
    };

    if (treatmentId) {
      loadTreatmentDetails();
    }
  }, [treatmentId]);

  const refreshData = async () => {
    if (treatmentId) {
      setLoading(true);
      try {
        // Simulate API refresh
        await new Promise(resolve => setTimeout(resolve, 500));
        const data = mockTreatmentDetails.find(t => t.treatmentPlan.id === treatmentId);
        if (data) {
          setTreatmentDetails(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to refresh data');
      } finally {
        setLoading(false);
      }
    }
  };

  const updateTreatmentPlan = async (updates: Partial<TreatmentPlan>) => {
    if (!treatmentDetails) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedTreatment = {
        ...treatmentDetails,
        treatmentPlan: {
          ...treatmentDetails.treatmentPlan,
          ...updates,
          lastUpdated: new Date().toISOString(),
          version: treatmentDetails.treatmentPlan.version + 1
        }
      };
      
      setTreatmentDetails(updatedTreatment);
    } catch (err) {
      setError('Failed to update treatment plan');
      throw err;
    }
  };

  const updateActionItem = async (id: string, updates: Partial<ActionItem>) => {
    if (!treatmentDetails) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const updatedActionItems = treatmentDetails.actionItems.map(item =>
        item.id === id ? { ...item, ...updates } : item
      );
      
      setTreatmentDetails({
        ...treatmentDetails,
        actionItems: updatedActionItems
      });
    } catch (err) {
      setError('Failed to update action item');
      throw err;
    }
  };

  const addComment = async (comment: Omit<Comment, 'id' | 'createdDate'>) => {
    if (!treatmentDetails) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newComment: Comment = {
        ...comment,
        id: `comment-${Date.now()}`,
        createdDate: new Date().toISOString()
      };
      
      setTreatmentDetails({
        ...treatmentDetails,
        comments: [...treatmentDetails.comments, newComment]
      });
    } catch (err) {
      setError('Failed to add comment');
      throw err;
    }
  };

  const uploadDocument = async (file: File, type: string) => {
    if (!treatmentDetails) return;
    
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newDocument = {
        id: `doc-${Date.now()}`,
        name: file.name,
        type: type as any,
        url: URL.createObjectURL(file),
        uploadedBy: 'current-user',
        uploadedDate: new Date().toISOString(),
        size: file.size,
        version: '1.0'
      };
      
      setTreatmentDetails({
        ...treatmentDetails,
        documents: [...treatmentDetails.documents, newDocument]
      });
    } catch (err) {
      setError('Failed to upload document');
      throw err;
    }
  };

  const contextValue: TreatmentDetailsContextType = {
    treatmentDetails,
    loading,
    error,
    viewMode,
    filterOptions,
    sortOption,
    selectedItems,
    setViewMode,
    setFilterOptions,
    setSortOption,
    setSelectedItems,
    refreshData,
    updateTreatmentPlan,
    updateActionItem,
    addComment,
    uploadDocument
  };

  return (
    <TreatmentDetailsContext.Provider value={contextValue}>
      {children}
    </TreatmentDetailsContext.Provider>
  );
};

export const useTreatmentDetails = (): TreatmentDetailsContextType => {
  const context = useContext(TreatmentDetailsContext);
  if (!context) {
    throw new Error('useTreatmentDetails must be used within TreatmentDetailsProvider');
  }
  return context;
};
// src/components/improvement-readiness/modals/ModalsProvider.tsx
'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { NewCorrectiveActionModal } from './NewCorrectiveActionModal';
import { NewImprovementModal } from './NewImprovementModal';
import { ScheduleReviewModal } from './ScheduleReviewModal';

// Define available modal types
export type ModalType = 
  | 'new-corrective-action'
  | 'new-improvement' 
  | 'schedule-review'
  | 'edit-corrective-action'
  | 'edit-improvement'
  | 'view-details'
  | null;

// Modal context interface - EXPORTED
export interface ModalsContextType {
  activeModal: ModalType;
  modalData: Record<string, any>;
  openModal: (modalType: ModalType, data?: Record<string, any>) => void;
  closeModal: () => void;
  isModalOpen: (modalType: ModalType) => boolean;
}

// Create context with undefined default - EXPORTED
export const ModalsContext = createContext<ModalsContextType | undefined>(undefined);

// Provider props interface
interface ModalsProviderProps {
  children: React.ReactNode;
}

// Modal data submission handlers
interface ModalHandlers {
  onCorrectiveActionSubmit?: (data: any) => Promise<void> | void;
  onImprovementSubmit?: (data: any) => Promise<void> | void;
  onReviewScheduleSubmit?: (data: any) => Promise<void> | void;
}

// Main ModalsProvider component
export function ModalsProvider({ 
  children 
}: ModalsProviderProps) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [modalData, setModalData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Open modal with optional data
  const openModal = useCallback((modalType: ModalType, data: Record<string, any> = {}) => {
    setActiveModal(modalType);
    setModalData(data);
  }, []);

  // Close modal and clear data
  const closeModal = useCallback(() => {
    if (isSubmitting) {
      return; // Prevent closing while submitting
    }
    setActiveModal(null);
    setModalData({});
  }, [isSubmitting]);

  // Check if specific modal is open
  const isModalOpen = useCallback((modalType: ModalType) => {
    return activeModal === modalType;
  }, [activeModal]);

  // Handle form submissions with loading state
  const handleSubmission = useCallback(async (
    submitFn: (() => Promise<void> | void) | undefined,
    fallbackFn?: () => void
  ) => {
    try {
      setIsSubmitting(true);
      
      if (submitFn) {
        await submitFn();
      } else if (fallbackFn) {
        fallbackFn();
      }
      
      // Close modal on successful submission
      setActiveModal(null);
      setModalData({});
    } catch (error) {
      console.error('Modal submission error:', error);
      // Keep modal open on error so user can retry
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  // Context value
  const contextValue: ModalsContextType = {
    activeModal,
    modalData,
    openModal,
    closeModal,
    isModalOpen
  };

  return (
    <ModalsContext.Provider value={contextValue}>
      {children}
      
      {/* New Corrective Action Modal */}
      <NewCorrectiveActionModal 
        isOpen={isModalOpen('new-corrective-action')}
        onClose={closeModal}
        initialData={modalData}
        isSubmitting={isSubmitting}
        onSubmit={(data) => handleSubmission(
          async () => {
            // Handle corrective action creation
            console.log('Creating corrective action:', data);
            // Add your API call here
            // await createCorrectiveAction(data);
          }
        )}
      />

      {/* Edit Corrective Action Modal */}
      <NewCorrectiveActionModal 
        isOpen={isModalOpen('edit-corrective-action')}
        onClose={closeModal}
        initialData={modalData}
        isSubmitting={isSubmitting}
        isEditMode={true}
        onSubmit={(data) => handleSubmission(
          async () => {
            // Handle corrective action update
            console.log('Updating corrective action:', data);
            // Add your API call here
            // await updateCorrectiveAction(modalData.id, data);
          }
        )}
      />

      {/* New Improvement Modal */}
      <NewImprovementModal 
        isOpen={isModalOpen('new-improvement')}
        onClose={closeModal}
        initialData={modalData}
        isSubmitting={isSubmitting}
        onSubmit={(data) => handleSubmission(
          async () => {
            // Handle improvement opportunity creation
            console.log('Creating improvement opportunity:', data);
            // Add your API call here
            // await createImprovementOpportunity(data);
          }
        )}
      />

      {/* Edit Improvement Modal */}
      <NewImprovementModal 
        isOpen={isModalOpen('edit-improvement')}
        onClose={closeModal}
        initialData={modalData}
        isSubmitting={isSubmitting}
        isEditMode={true}
        onSubmit={(data) => handleSubmission(
          async () => {
            // Handle improvement opportunity update
            console.log('Updating improvement opportunity:', data);
            // Add your API call here
            // await updateImprovementOpportunity(modalData.id, data);
          }
        )}
      />

      {/* Schedule Review Modal */}
      <ScheduleReviewModal 
        isOpen={isModalOpen('schedule-review')}
        onClose={closeModal}
        initialData={modalData}
        isSubmitting={isSubmitting}
        onSubmit={(data) => handleSubmission(
          async () => {
            // Handle review scheduling
            console.log('Scheduling review:', data);
            // Add your API call here
            // await scheduleManagementReview(data);
          }
        )}
      />
    </ModalsContext.Provider>
  );
}

// Custom hook to use modals context
export function useModals(): ModalsContextType {
  const context = useContext(ModalsContext);
  
  if (context === undefined) {
    throw new Error(
      'useModals must be used within a ModalsProvider. ' +
      'Make sure you have wrapped your component tree with <ModalsProvider>.'
    );
  }
  
  return context;
}

// Helper hook for specific modal operations
export function useModalOperations() {
  const { openModal, closeModal, isModalOpen } = useModals();

  return {
    // Corrective Actions
    openNewCorrectiveAction: (data?: Record<string, any>) => 
      openModal('new-corrective-action', data),
    openEditCorrectiveAction: (actionData: Record<string, any>) => 
      openModal('edit-corrective-action', actionData),

    // Improvements
    openNewImprovement: (data?: Record<string, any>) => 
      openModal('new-improvement', data),
    openEditImprovement: (improvementData: Record<string, any>) => 
      openModal('edit-improvement', improvementData),

    // Reviews
    openScheduleReview: (data?: Record<string, any>) => 
      openModal('schedule-review', data),

    // General operations
    closeModal,
    isModalOpen
  };
}

// Export types for use in other components
export type { ModalType, ModalsContextType };
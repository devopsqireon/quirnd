// src/components/improvement-readiness/modals/useModals.tsx
'use client';

import { useContext } from 'react';

// Import types and context from ModalsProvider
import { 
  ModalsContext, 
  type ModalType, 
  type ModalsContextType 
} from './ModalsProvider';

/**
 * Custom hook to access the modals context
 * Provides access to modal state and control functions
 * 
 * @throws Error if used outside of ModalsProvider
 * @returns ModalsContextType - The complete modals context
 */
export function useModals(): ModalsContextType {
  const context = useContext(ModalsContext);
  
  if (context === undefined) {
    throw new Error(
      'useModals must be used within a ModalsProvider. ' +
      'Wrap your component tree with <ModalsProvider> to use this hook.'
    );
  }
  
  return context;
}

/**
 * Specialized hook for corrective action modal operations
 * Provides type-safe methods for corrective action modals
 */
export function useCorrectiveActionModals() {
  const { openModal, closeModal, isModalOpen, modalData } = useModals();

  return {
    // Create new corrective action
    openNew: (initialData?: Record<string, any>) => {
      openModal('new-corrective-action', initialData);
    },
    
    // Edit existing corrective action
    openEdit: (actionData: {
      id: string;
      title: string;
      description: string;
      priority: string;
      owner: string;
      dueDate: string;
      linkedItems?: string[];
    }) => {
      openModal('edit-corrective-action', actionData);
    },
    
    // Check if any corrective action modal is open
    isNewOpen: () => isModalOpen('new-corrective-action'),
    isEditOpen: () => isModalOpen('edit-corrective-action'),
    isAnyOpen: () => isModalOpen('new-corrective-action') || isModalOpen('edit-corrective-action'),
    
    // Get current modal data
    getCurrentData: () => modalData,
    
    // Close modal
    close: closeModal
  };
}

/**
 * Specialized hook for improvement opportunity modal operations
 * Provides type-safe methods for improvement modals
 */
export function useImprovementModals() {
  const { openModal, closeModal, isModalOpen, modalData } = useModals();

  return {
    // Create new improvement opportunity
    openNew: (initialData?: Record<string, any>) => {
      openModal('new-improvement', initialData);
    },
    
    // Edit existing improvement opportunity
    openEdit: (improvementData: {
      id: string;
      title: string;
      description: string;
      category: string;
      owner: string;
      priority: string;
      linkedControl?: string;
    }) => {
      openModal('edit-improvement', improvementData);
    },
    
    // Check if any improvement modal is open
    isNewOpen: () => isModalOpen('new-improvement'),
    isEditOpen: () => isModalOpen('edit-improvement'),
    isAnyOpen: () => isModalOpen('new-improvement') || isModalOpen('edit-improvement'),
    
    // Get current modal data
    getCurrentData: () => modalData,
    
    // Close modal
    close: closeModal
  };
}

/**
 * Specialized hook for management review modal operations
 * Provides type-safe methods for review scheduling
 */
export function useReviewModals() {
  const { openModal, closeModal, isModalOpen, modalData } = useModals();

  return {
    // Schedule new review
    openSchedule: (initialData?: Record<string, any>) => {
      openModal('schedule-review', initialData);
    },
    
    // Pre-fill with template data
    openWithTemplate: (template: 'quarterly' | 'annual' | 'special') => {
      const templateData = getReviewTemplate(template);
      openModal('schedule-review', templateData);
    },
    
    // Check if review modal is open
    isOpen: () => isModalOpen('schedule-review'),
    
    // Get current modal data
    getCurrentData: () => modalData,
    
    // Close modal
    close: closeModal
  };
}

/**
 * Comprehensive hook that combines all modal operations
 * Useful when you need access to multiple modal types
 */
export function useAllModals() {
  const baseHook = useModals();
  const correctiveActions = useCorrectiveActionModals();
  const improvements = useImprovementModals();
  const reviews = useReviewModals();

  return {
    // Base modal operations
    ...baseHook,
    
    // Specialized operations
    correctiveActions,
    improvements,
    reviews,
    
    // Utility methods
    closeAllModals: () => {
      baseHook.closeModal();
    },
    
    hasAnyModalOpen: () => {
      return baseHook.activeModal !== null;
    },
    
    getCurrentModalType: () => {
      return baseHook.activeModal;
    }
  };
}

/**
 * Hook for modal state monitoring
 * Useful for analytics or debugging
 */
export function useModalState() {
  const { activeModal, modalData } = useModals();

  return {
    activeModal,
    modalData,
    hasData: Object.keys(modalData).length > 0,
    isOpen: activeModal !== null,
    modalType: activeModal
  };
}

/**
 * Type-safe modal opener hook
 * Provides strongly typed methods for opening modals
 */
export function useModalOpeners() {
  const { openModal } = useModals();

  return {
    openCorrectiveAction: (data?: Parameters<typeof openModal>[1]) =>
      openModal('new-corrective-action', data),
      
    editCorrectiveAction: (data: Parameters<typeof openModal>[1]) =>
      openModal('edit-corrective-action', data),
      
    openImprovement: (data?: Parameters<typeof openModal>[1]) =>
      openModal('new-improvement', data),
      
    editImprovement: (data: Parameters<typeof openModal>[1]) =>
      openModal('edit-improvement', data),
      
    scheduleReview: (data?: Parameters<typeof openModal>[1]) =>
      openModal('schedule-review', data),
  };
}

/**
 * Utility function to get review template data
 */
function getReviewTemplate(template: 'quarterly' | 'annual' | 'special') {
  const baseTemplate = {
    location: 'Conference Room A',
    participants: []
  };

  switch (template) {
    case 'quarterly':
      return {
        ...baseTemplate,
        title: `Q${Math.ceil((new Date().getMonth() + 1) / 3)} ${new Date().getFullYear()} Management Review`,
        description: 'Quarterly compliance assessment and performance review',
        time: '2:00 PM - 4:00 PM',
        agenda: 'Review quarterly metrics, discuss improvement initiatives, plan next quarter objectives'
      };
      
    case 'annual':
      return {
        ...baseTemplate,
        title: `${new Date().getFullYear()} Annual Security Review`,
        description: 'Comprehensive annual security assessment and audit',
        time: '9:00 AM - 5:00 PM',
        agenda: 'Annual security posture review, threat landscape analysis, strategic security planning'
      };
      
    case 'special':
      return {
        ...baseTemplate,
        title: 'Special Review Meeting',
        description: 'Ad-hoc review meeting',
        time: '10:00 AM - 12:00 PM',
        agenda: 'Special topic discussion and decision making'
      };
      
    default:
      return baseTemplate;
  }
}

// Export types for external use (these are already imported from ModalsProvider)
export type { ModalType, ModalsContextType } from './ModalsProvider';
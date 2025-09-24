// File: src/providers/FeedbackProviders.tsx

'use client';

import React from 'react';
import { FeedbackProvider } from '@/context/FeedbackContext';
import { Toaster } from 'sonner';

interface FeedbackProvidersProps {
  children: React.ReactNode;
}

export function FeedbackProviders({ children }: FeedbackProvidersProps) {
  return (
    <FeedbackProvider>
      {children}
      <Toaster 
        position="top-right"
        richColors
        closeButton
        duration={4000}
      />
    </FeedbackProvider>
  );
}
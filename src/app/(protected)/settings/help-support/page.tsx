// src/app/(protected)/settings/help-support/page.tsx
import React from 'react';
import { Toaster } from 'sonner';
import { HelpSupportLayout } from './components/HelpSupportLayout';

export default function HelpSupportPage() {
  return (
    <>
      <HelpSupportLayout />
      <Toaster position="top-right" richColors />
    </>
  );
}
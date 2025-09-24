// src/app/(protected)/settings/help-support/components/SupportSidebar.tsx
import React from 'react';
import { SupportStatus } from './SupportStatus';
import { QuickChat } from './QuickChat';
import { SuggestedArticles } from './SuggestedArticles';

export function SupportSidebar() {
  return (
    <div className="space-y-8">
      <SupportStatus />
      <QuickChat />
      <SuggestedArticles />
    </div>
  );
}
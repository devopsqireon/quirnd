// /app/risk/treatment-plan/[id]/components/TreatmentDetailsContent.tsx
'use client';

import React from 'react';
import { useTreatmentDetails } from '../contexts/TreatmentDetailsContext';
import { LoadingSpinner } from './shared/LoadingSpinner';
import { ErrorDisplay } from './shared/ErrorDisplay';
import { OverviewView } from './views/OverviewView';
import { ActionItemsView } from './views/ActionItemsView';
import { TimelineView } from './views/TimelineView';
import { MetricsView } from './views/MetricsView';
import { DocumentsView } from './views/DocumentsView';
import { ActivityView } from './views/ActivityView';
import { CommentsView } from './views/CommentsView';

export const TreatmentDetailsContent: React.FC = () => {
  const { treatmentDetails, loading, error, viewMode } = useTreatmentDetails();

  if (loading) {
    return <LoadingSpinner message="Loading treatment details..." />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  if (!treatmentDetails) {
    return <ErrorDisplay error="Treatment plan not found" />;
  }

  const renderView = () => {
    switch (viewMode.type) {
      case 'overview':
        return <OverviewView />;
      case 'actions':
        return <ActionItemsView />;
      case 'timeline':
        return <TimelineView />;
      case 'metrics':
        return <MetricsView />;
      case 'documents':
        return <DocumentsView />;
      case 'activity':
        return <ActivityView />;
      case 'comments':
        return <CommentsView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="space-y-6">
      {renderView()}
    </div>
  );
};
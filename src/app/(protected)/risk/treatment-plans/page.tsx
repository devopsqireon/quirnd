// /app/risk/treatment-plans/page.tsx
'use client';

import React from 'react';
import { TreatmentPlan } from './types';
import { useTreatmentPlans, useFilters, useViewMode } from './utils/hooks';

// Layout Components
import { TreatmentPlanHeader } from './components/layout/TreatmentPlanHeader';
import { StatsDashboard } from './components/layout/StatsDashboard';
import { ViewModeToggle } from './components/layout/ViewModeToggle';

// Filter Components
import { FiltersPanel } from './components/filters/FiltersPanel';

// Display Components
import { TreatmentPlanGrid } from './components/display/TreatmentPlanGrid';
import { TreatmentPlansTable } from './components/display/TreatmentPlansTable';
import { EmptyState } from './components/display/EmptyState';

const TreatmentPlansPage: React.FC = () => {
  const { treatmentPlans, loading, error, refreshTreatmentPlans } = useTreatmentPlans();
  const { 
    filters, 
    sortConfig, 
    filteredPlans, 
    updateFilters, 
    clearFilters, 
    updateSort 
  } = useFilters(treatmentPlans);
  const { viewMode, setViewMode } = useViewMode('grid');

  // Event handlers
  const handleNewPlan = () => {
    console.log('Create new treatment plan');
    // Navigate to create page or open modal
  };

  const handleExport = () => {
    console.log('Export treatment plans');
    // Implement export functionality
  };

  const handleImport = () => {
    console.log('Import treatment plans');
    // Implement import functionality
  };

  const handleSettings = () => {
    console.log('Open settings');
    // Implement settings functionality
  };

  const handleViewPlan = (plan: TreatmentPlan) => {
    console.log('View plan:', plan.id);
    // Navigate to view page
  };

  const handleEditPlan = (plan: TreatmentPlan) => {
    console.log('Edit plan:', plan.id);
    // Navigate to edit page
  };

  const handleCopyPlan = (plan: TreatmentPlan) => {
    console.log('Copy plan:', plan.id);
    // Implement copy functionality
  };

  const handleArchivePlan = (plan: TreatmentPlan) => {
    console.log('Archive plan:', plan.id);
    // Implement archive functionality
  };

  const handleDeletePlan = (plan: TreatmentPlan) => {
    console.log('Delete plan:', plan.id);
    // Implement delete functionality with confirmation
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading treatment plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Data</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={refreshTreatmentPlans}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <TreatmentPlanHeader
        onNewPlan={handleNewPlan}
        onExport={handleExport}
        onImport={handleImport}
        onSettings={handleSettings}
      />
      
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Stats Dashboard */}
        <StatsDashboard plans={treatmentPlans} />
        
        {/* Filters Panel */}
        <FiltersPanel
          filters={filters}
          onFiltersChange={updateFilters}
          onClearFilters={clearFilters}
          resultsCount={filteredPlans.length}
          className="mb-6"
        />
        
        {/* View Mode Toggle */}
        <ViewModeToggle
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalCount={filteredPlans.length}
          className="mb-6"
        />

        {/* Treatment Plans Display */}
        {filteredPlans.length > 0 ? (
          viewMode === 'list' ? (
            <TreatmentPlansTable
              plans={filteredPlans}
              sortConfig={sortConfig}
              onSort={updateSort}
              onView={handleViewPlan}
              onEdit={handleEditPlan}
              onCopy={handleCopyPlan}
              onArchive={handleArchivePlan}
              onDelete={handleDeletePlan}
            />
          ) : (
            <TreatmentPlanGrid
              plans={filteredPlans}
              onView={handleViewPlan}
              onEdit={handleEditPlan}
              onCopy={handleCopyPlan}
              onArchive={handleArchivePlan}
              onDelete={handleDeletePlan}
            />
          )
        ) : (
          <EmptyState
            hasFilters={hasActiveFilters}
            onCreateNew={handleNewPlan}
            onClearFilters={hasActiveFilters ? clearFilters : undefined}
          />
        )}
      </div>
    </div>
  );
};

export default TreatmentPlansPage;
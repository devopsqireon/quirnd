// /app/awareness-training/components/tabs/TrainingLibraryTab.tsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTrainingPrograms, useModal, useToast } from '../../utils/hooks';
import { 
  SearchBar, 
  FilterDropdown, 
  EmptyState, 
  LoadingSpinner 
} from '../shared';
import { TrainingCard } from '../display';
import { CreateTrainingModal } from '../modals';
import { TRAINING_CATEGORIES, DIFFICULTY_LEVELS } from '../../utils/constants';

const TrainingLibraryTab: React.FC = () => {
  const {
    programs,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters
  } = useTrainingPrograms();

  const createModal = useModal();
  const { success, error: showError } = useToast();

  const categoryOptions = Object.entries(TRAINING_CATEGORIES).map(([value, config]) => ({
    value,
    label: config.label
  }));

  const difficultyOptions = Object.entries(DIFFICULTY_LEVELS).map(([value, config]) => ({
    value,
    label: config.label
  }));

  const handleCreateTraining = async (data: any) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      success('Training program created successfully');
      createModal.closeModal();
    } catch (err) {
      showError('Failed to create training program');
    }
  };

  const handleViewTraining = (id: string) => {
    console.log('View training:', id);
  };

  const handleEditTraining = (id: string) => {
    console.log('Edit training:', id);
  };

  const handleDeleteTraining = (id: string) => {
    console.log('Delete training:', id);
  };

  const handleAssignTraining = (id: string) => {
    console.log('Assign training:', id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SearchBar
            value={filters.search || ''}
            onChange={(value) => updateFilters({ search: value })}
            placeholder="Search training programs..."
            className="w-80"
          />
          
          <FilterDropdown
            label="All Categories"
            value={filters.category || ''}
            options={categoryOptions}
            onChange={(value) => updateFilters({ category: value })}
          />
          
          <FilterDropdown
            label="All Difficulty"
            value={filters.difficulty || ''}
            options={difficultyOptions}
            onChange={(value) => updateFilters({ difficulty: value })}
          />
          
          {(filters.search || filters.category || filters.difficulty) && (
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          )}
        </div>
        
        <Button onClick={createModal.openModal} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Training
        </Button>
      </div>

      {/* Training Grid */}
      {programs.length === 0 ? (
        <EmptyState
          title="No training programs found"
          description="Get started by creating your first training program or adjust your search filters."
          actionLabel="Create Training"
          onAction={createModal.openModal}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((training) => (
            <TrainingCard
              key={training.id}
              training={training}
              onView={handleViewTraining}
              onEdit={handleEditTraining}
              onDelete={handleDeleteTraining}
              onAssign={handleAssignTraining}
            />
          ))}
        </div>
      )}

      {/* Create Training Modal */}
      <CreateTrainingModal
        isOpen={createModal.isOpen}
        onClose={createModal.closeModal}
        onSubmit={handleCreateTraining}
      />
    </div>
  );
};

export default TrainingLibraryTab;
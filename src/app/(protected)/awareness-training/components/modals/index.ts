// Update /app/awareness-training/components/modals/index.ts
// Remove CompletionLogDrawer from modals exports since it's now in drawers
export { default as CreateTrainingModal } from './CreateTrainingModal';
export { default as AssignTrainingModal } from './AssignTrainingModal';
export { default as BulkAssignModal } from './BulkAssignModal';
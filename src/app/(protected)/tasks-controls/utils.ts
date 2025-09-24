// src/app/tasks-controls/utils.ts

import { Task, Control } from './types';
import { TASK_STATUS, CONTROL_STATUS } from './constants';

// Date utilities
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const isOverdue = (dueDate: string): boolean => {
  return new Date(dueDate) < new Date();
};

export const getDaysUntilDue = (dueDate: string): number => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Task utilities
export const getTaskStatusColor = (status: string): string => {
  switch (status) {
    case TASK_STATUS.OPEN:
      return 'text-blue-600';
    case TASK_STATUS.IN_PROGRESS:
      return 'text-yellow-600';
    case TASK_STATUS.DONE:
      return 'text-green-600';
    case TASK_STATUS.OVERDUE:
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

export const getTaskPriorityWeight = (priority: string): number => {
  switch (priority) {
    case 'Critical':
      return 4;
    case 'High':
      return 3;
    case 'Medium':
      return 2;
    case 'Low':
      return 1;
    default:
      return 0;
  }
};

// Control utilities
export const getControlStatusColor = (status: string): string => {
  switch (status) {
    case CONTROL_STATUS.IMPLEMENTED:
      return 'text-green-600';
    case CONTROL_STATUS.IN_PROGRESS:
      return 'text-yellow-600';
    case CONTROL_STATUS.PLANNED:
      return 'text-blue-600';
    case CONTROL_STATUS.NOT_APPLICABLE:
      return 'text-gray-600';
    default:
      return 'text-gray-600';
  }
};

export const calculateImplementationProgress = (controls: Control[]) => {
  const total = controls.length;
  if (total === 0) return 0;
  
  const implemented = controls.filter(c => c.status === CONTROL_STATUS.IMPLEMENTED).length;
  return Math.round((implemented / total) * 100);
};

// Search and filter utilities
export const filterTasksBySearch = (tasks: Task[], searchTerm: string): Task[] => {
  if (!searchTerm.trim()) return tasks;
  
  const lowercaseSearch = searchTerm.toLowerCase();
  return tasks.filter(task => 
    task.title.toLowerCase().includes(lowercaseSearch) ||
    task.id.toLowerCase().includes(lowercaseSearch) ||
    task.owner.toLowerCase().includes(lowercaseSearch) ||
    task.linkedItem.title.toLowerCase().includes(lowercaseSearch) ||
    task.linkedItem.type.toLowerCase().includes(lowercaseSearch) ||
    (task.description && task.description.toLowerCase().includes(lowercaseSearch))
  );
};

export const filterControlsBySearch = (controls: Control[], searchTerm: string): Control[] => {
  if (!searchTerm.trim()) return controls;
  
  const lowercaseSearch = searchTerm.toLowerCase();
  return controls.filter(control => 
    control.title.toLowerCase().includes(lowercaseSearch) ||
    control.annexARef.toLowerCase().includes(lowercaseSearch) ||
    control.owner.toLowerCase().includes(lowercaseSearch) ||
    control.category.toLowerCase().includes(lowercaseSearch) ||
    control.clauseText.toLowerCase().includes(lowercaseSearch)
  );
};

// Validation utilities
export const validateTaskForm = (formData: any): string[] => {
  const errors: string[] = [];
  
  if (!formData.title?.trim()) {
    errors.push('Task title is required');
  }
  
  if (!formData.linkedItemId) {
    errors.push('Linked item is required');
  }
  
  if (!formData.owner) {
    errors.push('Task owner is required');
  }
  
  if (!formData.dueDate) {
    errors.push('Due date is required');
  }
  
  return errors;
};

// Export utilities
export const generateTasksCSV = (tasks: Task[]): string => {
  const headers = ['ID', 'Title', 'Owner', 'Status', 'Priority', 'Due Date', 'Linked Item', 'Created Date'];
  const rows = tasks.map(task => [
    task.id,
    task.title,
    task.owner,
    task.status,
    task.priority,
    task.dueDate,
    `${task.linkedItem.type}: ${task.linkedItem.title}`,
    task.createdDate
  ]);
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');
    
  return csvContent;
};

export const generateControlsCSV = (controls: Control[]): string => {
  const headers = ['Control ID', 'Annex A Ref', 'Title', 'Category', 'Owner', 'Status', 'Next Review', 'Implementation Date'];
  const rows = controls.map(control => [
    control.id,
    control.annexARef,
    control.title,
    control.category,
    control.owner,
    control.status,
    control.nextReviewDate,
    control.implementationDate || 'N/A'
  ]);
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');
    
  return csvContent;
};

// Download utilities
export const downloadCSV = (csvContent: string, filename: string): void => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
// /app/awareness-training/utils/hooks/index.ts

import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  TrainingProgram, 
  Assignment, 
  CompletionLog, 
  TrainingFilter,
  AssignmentFilter,
  CompletionFilter,
  TrainingMetrics,
  DepartmentMetrics
} from '../../types';
import { 
  filterTrainingPrograms, 
  filterAssignments, 
  filterCompletionLogs,
  calculateTrainingMetrics,
  calculateDepartmentMetrics,
  sortTrainingPrograms,
  debounce
} from '../helpers';
import {
  getMockTrainingPrograms,
  getMockAssignments,
  getMockCompletionLogs,
  getMockTrainingMetrics,
  getMockDepartmentMetrics
} from '../../data/sample-data';

// Training Programs Hook
export const useTrainingPrograms = () => {
  const [programs, setPrograms] = useState<TrainingProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TrainingFilter>({});
  const [sortBy, setSortBy] = useState<string>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const fetchPrograms = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getMockTrainingPrograms(filters);
      setPrograms(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch training programs');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  const filteredAndSortedPrograms = useMemo(() => {
    const filtered = filterTrainingPrograms(programs, filters);
    return sortTrainingPrograms(filtered, sortBy, sortOrder);
  }, [programs, filters, sortBy, sortOrder]);

  const debouncedSetFilters = useCallback(
    debounce((newFilters: TrainingFilter) => {
      setFilters(newFilters);
    }, 300),
    []
  );

  const updateFilters = useCallback((newFilters: Partial<TrainingFilter>) => {
    debouncedSetFilters({ ...filters, ...newFilters });
  }, [filters, debouncedSetFilters]);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const toggleSort = useCallback((field: string) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  }, [sortBy]);

  return {
    programs: filteredAndSortedPrograms,
    allPrograms: programs,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    sortBy,
    sortOrder,
    toggleSort,
    refetch: fetchPrograms
  };
};

// Assignments Hook
export const useAssignments = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<AssignmentFilter>({});
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const fetchAssignments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getMockAssignments(filters);
      setAssignments(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch assignments');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const filteredAssignments = useMemo(() => {
    return filterAssignments(assignments, filters);
  }, [assignments, filters]);

  const debouncedSetFilters = useCallback(
    debounce((newFilters: AssignmentFilter) => {
      setFilters(newFilters);
    }, 300),
    []
  );

  const updateFilters = useCallback((newFilters: Partial<AssignmentFilter>) => {
    debouncedSetFilters({ ...filters, ...newFilters });
  }, [filters, debouncedSetFilters]);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const toggleSelection = useCallback((id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (selectedIds.length === filteredAssignments.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredAssignments.map(assignment => assignment.id));
    }
  }, [selectedIds.length, filteredAssignments]);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const bulkAction = useCallback(async (action: string, ids: string[]) => {
    // Mock bulk action implementation
    console.log(`Performing ${action} on assignments:`, ids);
    // Here you would implement actual bulk actions like:
    // - Bulk assign training
    // - Send reminders
    // - Update due dates
    // - Delete assignments
    await new Promise(resolve => setTimeout(resolve, 1000));
    await fetchAssignments();
    clearSelection();
  }, [fetchAssignments, clearSelection]);

  return {
    assignments: filteredAssignments,
    allAssignments: assignments,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    selectedIds,
    toggleSelection,
    toggleSelectAll,
    clearSelection,
    bulkAction,
    refetch: fetchAssignments
  };
};

// Completion Logs Hook
export const useCompletionLogs = () => {
  const [logs, setLogs] = useState<CompletionLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CompletionFilter>({});
  const [selectedLog, setSelectedLog] = useState<CompletionLog | null>(null);

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getMockCompletionLogs(filters);
      setLogs(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch completion logs');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const filteredLogs = useMemo(() => {
    return filterCompletionLogs(logs, filters);
  }, [logs, filters]);

  const debouncedSetFilters = useCallback(
    debounce((newFilters: CompletionFilter) => {
      setFilters(newFilters);
    }, 300),
    []
  );

  const updateFilters = useCallback((newFilters: Partial<CompletionFilter>) => {
    debouncedSetFilters({ ...filters, ...newFilters });
  }, [filters, debouncedSetFilters]);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const selectLog = useCallback((log: CompletionLog) => {
    setSelectedLog(log);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedLog(null);
  }, []);

  const exportLogs = useCallback(async (format: 'csv' | 'excel' | 'pdf') => {
    // Mock export implementation
    console.log(`Exporting completion logs as ${format}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Here you would implement actual export functionality
  }, []);

  return {
    logs: filteredLogs,
    allLogs: logs,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    selectedLog,
    selectLog,
    clearSelection,
    exportLogs,
    refetch: fetchLogs
  };
};

// Training Metrics Hook
export const useTrainingMetrics = () => {
  const [metrics, setMetrics] = useState<TrainingMetrics | null>(null);
  const [departmentMetrics, setDepartmentMetrics] = useState<DepartmentMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    try {
      setLoading(true);
      const [metricsData, deptData] = await Promise.all([
        getMockTrainingMetrics(),
        getMockDepartmentMetrics()
      ]);
      setMetrics(metricsData);
      setDepartmentMetrics(deptData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  return {
    metrics,
    departmentMetrics,
    loading,
    error,
    refetch: fetchMetrics
  };
};

// Toast Notifications Hook
export const useToast = () => {
  const [toasts, setToasts] = useState<Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    description?: string;
    duration?: number;
  }>>([]);

  const addToast = useCallback((toast: Omit<typeof toasts[0], 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);

    // Auto-remove toast after duration
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, toast.duration || 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const success = useCallback((title: string, description?: string) => {
    addToast({ type: 'success', title, description });
  }, [addToast]);

  const error = useCallback((title: string, description?: string) => {
    addToast({ type: 'error', title, description });
  }, [addToast]);

  const warning = useCallback((title: string, description?: string) => {
    addToast({ type: 'warning', title, description });
  }, [addToast]);

  const info = useCallback((title: string, description?: string) => {
    addToast({ type: 'info', title, description });
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info
  };
};

// Modal Management Hook
export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<any>(null);

  const openModal = useCallback((data?: any) => {
    setModalData(data);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalData(null);
  }, []);

  return {
    isOpen,
    modalData,
    openModal,
    closeModal
  };
};

// Pagination Hook
export const usePagination = <T>(items: T[], pageSize: number = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentItems = items.slice(startIndex, endIndex);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);

  const goToNextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const goToPreviousPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  const goToFirstPage = useCallback(() => {
    goToPage(1);
  }, [goToPage]);

  const goToLastPage = useCallback(() => {
    goToPage(totalPages);
  }, [goToPage, totalPages]);

  // Reset to first page when items change
  useEffect(() => {
    setCurrentPage(1);
  }, [items.length]);

  return {
    currentPage,
    totalPages,
    currentItems,
    pageSize,
    totalItems: items.length,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1
  };
};

// Search Hook with Debouncing
export const useSearch = <T>(
  items: T[],
  searchFields: (keyof T)[],
  initialQuery: string = ''
) => {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  const debouncedSetQuery = useCallback(
    debounce((value: string) => {
      setDebouncedQuery(value);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSetQuery(query);
  }, [query, debouncedSetQuery]);

  const filteredItems = useMemo(() => {
    if (!debouncedQuery.trim()) return items;

    const searchTerms = debouncedQuery.toLowerCase().split(' ');
    
    return items.filter(item =>
      searchTerms.every(term =>
        searchFields.some(field => {
          const value = item[field];
          return typeof value === 'string' && 
                 value.toLowerCase().includes(term);
        })
      )
    );
  }, [items, debouncedQuery, searchFields]);

  const clearSearch = useCallback(() => {
    setQuery('');
  }, []);

  return {
    query,
    setQuery,
    filteredItems,
    clearSearch,
    isSearching: query !== debouncedQuery
  };
};

// Local Storage Hook
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
};
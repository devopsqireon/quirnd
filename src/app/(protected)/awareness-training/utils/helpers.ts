// /app/awareness-training/utils/helpers.ts

import { format, parseISO, differenceInDays, isAfter, isBefore } from 'date-fns';
import { 
  TrainingProgram, 
  Assignment, 
  CompletionLog, 
  TrainingMetrics,
  DepartmentMetrics,
  TrainingFilter,
  AssignmentFilter,
  CompletionFilter
} from '../types';

// Date Formatting Helpers
export const formatDate = (date: string | Date, formatStr: string = 'MMM dd, yyyy'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr);
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

export const formatTimeSpent = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} minutes`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours === 1) {
    return remainingMinutes > 0 ? `1 hour ${remainingMinutes} minutes` : '1 hour';
  }
  return remainingMinutes > 0 ? `${hours} hours ${remainingMinutes} minutes` : `${hours} hours`;
};

// Status Helpers
export const getAssignmentStatus = (assignment: Assignment): string => {
  const today = new Date();
  const dueDate = parseISO(assignment.dueDate);
  
  if (assignment.status === 'completed') {
    return 'completed';
  }
  
  if (isAfter(today, dueDate)) {
    return 'overdue';
  }
  
  if (assignment.progress > 0) {
    return 'in-progress';
  }
  
  return 'not-started';
};

export const getDaysUntilDue = (dueDate: string): number => {
  const today = new Date();
  const due = parseISO(dueDate);
  return differenceInDays(due, today);
};

export const isOverdue = (dueDate: string, status: string): boolean => {
  if (status === 'completed') return false;
  const today = new Date();
  const due = parseISO(dueDate);
  return isAfter(today, due);
};

export const isDueSoon = (dueDate: string, status: string, days: number = 7): boolean => {
  if (status === 'completed') return false;
  const today = new Date();
  const due = parseISO(dueDate);
  const daysDiff = differenceInDays(due, today);
  return daysDiff >= 0 && daysDiff <= days;
};

// Score Helpers
export const getScoreColor = (score: number): string => {
  if (score >= 90) return 'bg-green-100 text-green-800';
  if (score >= 80) return 'bg-blue-100 text-blue-800';
  if (score >= 70) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
};

export const getScoreGrade = (score: number): string => {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
};

export const isPassing = (score: number, passingScore: number = 80): boolean => {
  return score >= passingScore;
};

// Progress Helpers
export const getProgressColor = (progress: number): string => {
  if (progress === 100) return 'bg-green-600';
  if (progress >= 75) return 'bg-blue-600';
  if (progress >= 50) return 'bg-yellow-600';
  if (progress >= 25) return 'bg-orange-600';
  return 'bg-gray-600';
};

export const calculateCompletionRate = (total: number, completed: number): number => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

// Filtering Helpers
export const filterTrainingPrograms = (
  programs: TrainingProgram[], 
  filters: TrainingFilter
): TrainingProgram[] => {
  return programs.filter(program => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = 
        program.title.toLowerCase().includes(searchLower) ||
        program.description.toLowerCase().includes(searchLower) ||
        program.tags.some(tag => tag.toLowerCase().includes(searchLower));
      if (!matchesSearch) return false;
    }

    // Category filter
    if (filters.category && filters.category !== 'all') {
      if (program.category !== filters.category) return false;
    }

    // Difficulty filter
    if (filters.difficulty && filters.difficulty !== 'all') {
      if (program.difficulty !== filters.difficulty) return false;
    }

    // Status filter (active/inactive)
    if (filters.status && filters.status !== 'all') {
      const isActive = filters.status === 'active';
      if (program.isActive !== isActive) return false;
    }

    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag => 
        program.tags.some(programTag => 
          programTag.toLowerCase().includes(tag.toLowerCase())
        )
      );
      if (!hasMatchingTag) return false;
    }

    return true;
  });
};

export const filterAssignments = (
  assignments: Assignment[], 
  filters: AssignmentFilter
): Assignment[] => {
  return assignments.filter(assignment => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = 
        assignment.assigneeName.toLowerCase().includes(searchLower) ||
        assignment.assigneeEmail.toLowerCase().includes(searchLower) ||
        assignment.trainingTitle.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Status filter
    if (filters.status && filters.status !== 'all') {
      const currentStatus = getAssignmentStatus(assignment);
      if (currentStatus !== filters.status) return false;
    }

    // Department filter
    if (filters.department && filters.department !== 'all') {
      if (assignment.department !== filters.department) return false;
    }

    // Priority filter
    if (filters.priority && filters.priority !== 'all') {
      if (assignment.priority !== filters.priority) return false;
    }

    // Assigned by filter
    if (filters.assignedBy && filters.assignedBy !== 'all') {
      if (assignment.assignedBy !== filters.assignedBy) return false;
    }

    // Due date range filter
    if (filters.dueDate) {
      const dueDate = parseISO(assignment.dueDate);
      if (filters.dueDate.start) {
        const startDate = parseISO(filters.dueDate.start);
        if (isBefore(dueDate, startDate)) return false;
      }
      if (filters.dueDate.end) {
        const endDate = parseISO(filters.dueDate.end);
        if (isAfter(dueDate, endDate)) return false;
      }
    }

    return true;
  });
};

export const filterCompletionLogs = (
  logs: CompletionLog[], 
  filters: CompletionFilter
): CompletionLog[] => {
  return logs.filter(log => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = 
        log.userName.toLowerCase().includes(searchLower) ||
        log.userEmail.toLowerCase().includes(searchLower) ||
        log.trainingTitle.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Department filter
    if (filters.department && filters.department !== 'all') {
      if (log.department !== filters.department) return false;
    }

    // Score range filter
    if (filters.scoreRange) {
      if (filters.scoreRange.min && log.score < filters.scoreRange.min) return false;
      if (filters.scoreRange.max && log.score > filters.scoreRange.max) return false;
    }

    // Completed date range filter
    if (filters.completedDate) {
      const completedDate = parseISO(log.completedDate);
      if (filters.completedDate.start) {
        const startDate = parseISO(filters.completedDate.start);
        if (isBefore(completedDate, startDate)) return false;
      }
      if (filters.completedDate.end) {
        const endDate = parseISO(filters.completedDate.end);
        if (isAfter(completedDate, endDate)) return false;
      }
    }

    // Certificate status filter
    if (filters.certificateStatus) {
      const hasCertificate = !!log.certificateId;
      const wantsCertificate = filters.certificateStatus === 'issued';
      if (hasCertificate !== wantsCertificate) return false;
    }

    return true;
  });
};

// Metrics Calculation Helpers
export const calculateTrainingMetrics = (
  programs: TrainingProgram[],
  assignments: Assignment[],
  logs: CompletionLog[]
): TrainingMetrics => {
  const activeAssignments = assignments.filter(a => a.status !== 'completed');
  const completedAssignments = assignments.filter(a => a.status === 'completed');
  const overdueAssignments = assignments.filter(a => isOverdue(a.dueDate, a.status));
  const certificatesIssued = logs.filter(l => l.certificateId).length;
  const totalTimeSpent = logs.reduce((sum, log) => sum + log.timeSpent, 0);
  
  const completionRate = calculateCompletionRate(assignments.length, completedAssignments.length);
  const averageScore = logs.length > 0 
    ? Math.round(logs.reduce((sum, log) => sum + log.score, 0) / logs.length)
    : 0;

  return {
    totalPrograms: programs.length,
    activeAssignments: activeAssignments.length,
    completionRate,
    averageScore,
    overdueAssignments: overdueAssignments.length,
    certificatesIssued,
    totalTimeSpent,
    complianceRate: completionRate // For ISO 27001 compliance tracking
  };
};

export const calculateDepartmentMetrics = (
  assignments: Assignment[],
  logs: CompletionLog[]
): DepartmentMetrics[] => {
  const departmentData = new Map<string, {
    totalEmployees: Set<string>;
    assignedTrainings: number;
    completedTrainings: number;
    scores: number[];
    overdueCount: number;
  }>();

  // Process assignments
  assignments.forEach(assignment => {
    const dept = assignment.department;
    if (!departmentData.has(dept)) {
      departmentData.set(dept, {
        totalEmployees: new Set(),
        assignedTrainings: 0,
        completedTrainings: 0,
        scores: [],
        overdueCount: 0
      });
    }

    const data = departmentData.get(dept)!;
    data.totalEmployees.add(assignment.assigneeId);
    data.assignedTrainings++;
    
    if (assignment.status === 'completed') {
      data.completedTrainings++;
    }
    
    if (isOverdue(assignment.dueDate, assignment.status)) {
      data.overdueCount++;
    }
  });

  // Process completion logs for scores
  logs.forEach(log => {
    const dept = log.department;
    if (departmentData.has(dept)) {
      departmentData.get(dept)!.scores.push(log.score);
    }
  });

  // Convert to array and calculate final metrics
  return Array.from(departmentData.entries()).map(([department, data]) => {
    const completionRate = calculateCompletionRate(data.assignedTrainings, data.completedTrainings);
    const averageScore = data.scores.length > 0 
      ? Math.round(data.scores.reduce((sum, score) => sum + score, 0) / data.scores.length)
      : 0;

    return {
      department,
      totalEmployees: data.totalEmployees.size,
      assignedTrainings: data.assignedTrainings,
      completedTrainings: data.completedTrainings,
      completionRate,
      averageScore,
      overdueCount: data.overdueCount
    };
  }).sort((a, b) => b.completionRate - a.completionRate);
};

// Sorting Helpers
export const sortTrainingPrograms = (
  programs: TrainingProgram[], 
  sortBy: string, 
  sortOrder: 'asc' | 'desc' = 'asc'
): TrainingProgram[] => {
  return [...programs].sort((a, b) => {
    let aValue: any, bValue: any;

    switch (sortBy) {
      case 'title':
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      case 'category':
        aValue = a.category;
        bValue = b.category;
        break;
      case 'duration':
        aValue = a.duration;
        bValue = b.duration;
        break;
      case 'completionRate':
        aValue = a.completionRate;
        bValue = b.completionRate;
        break;
      case 'createdDate':
        aValue = parseISO(a.createdDate);
        bValue = parseISO(b.createdDate);
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
};

// Export Helpers
export const generateCSVContent = (data: any[], headers: string[]): string => {
  const csvRows = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape commas and quotes in CSV
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value || '';
      }).join(',')
    )
  ];
  return csvRows.join('\n');
};

export const downloadCSV = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportTrainingData = (programs: TrainingProgram[]): void => {
  const headers = ['id', 'title', 'category', 'difficulty', 'duration', 'completionRate', 'totalAssignments', 'isActive'];
  const csvContent = generateCSVContent(programs, headers);
  downloadCSV(csvContent, `training-programs-${formatDate(new Date(), 'yyyy-MM-dd')}.csv`);
};

export const exportAssignmentData = (assignments: Assignment[]): void => {
  const headers = ['id', 'assigneeName', 'assigneeEmail', 'trainingTitle', 'department', 'assignedDate', 'dueDate', 'status', 'progress'];
  const csvContent = generateCSVContent(assignments, headers);
  downloadCSV(csvContent, `training-assignments-${formatDate(new Date(), 'yyyy-MM-dd')}.csv`);
};

export const exportCompletionData = (logs: CompletionLog[]): void => {
  const headers = ['id', 'userName', 'userEmail', 'trainingTitle', 'department', 'completedDate', 'score', 'timeSpent', 'attempts', 'certificateId'];
  const csvContent = generateCSVContent(logs, headers);
  downloadCSV(csvContent, `completion-logs-${formatDate(new Date(), 'yyyy-MM-dd')}.csv`);
};

// Validation Helpers
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateDueDate = (dueDate: string): boolean => {
  const due = parseISO(dueDate);
  const today = new Date();
  return isAfter(due, today);
};

export const validateTrainingData = (training: Partial<TrainingProgram>): string[] => {
  const errors: string[] = [];

  if (!training.title || training.title.trim().length < 3) {
    errors.push('Title must be at least 3 characters long');
  }

  if (!training.description || training.description.trim().length < 10) {
    errors.push('Description must be at least 10 characters long');
  }

  if (!training.duration || training.duration < 1) {
    errors.push('Duration must be at least 1 minute');
  }

  if (!training.category) {
    errors.push('Category is required');
  }

  if (!training.difficulty) {
    errors.push('Difficulty level is required');
  }

  return errors;
};

// Search Helpers
export const highlightSearchTerm = (text: string, searchTerm: string): string => {
  if (!searchTerm) return text;
  
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

export const createSearchIndex = (items: any[], fields: string[]): Map<string, any[]> => {
  const index = new Map<string, any[]>();
  
  items.forEach(item => {
    fields.forEach(field => {
      const value = item[field];
      if (typeof value === 'string') {
        const words = value.toLowerCase().split(/\s+/);
        words.forEach(word => {
          if (!index.has(word)) {
            index.set(word, []);
          }
          if (!index.get(word)!.includes(item)) {
            index.get(word)!.push(item);
          }
        });
      }
    });
  });
  
  return index;
};

// Notification Helpers
export const shouldSendReminder = (assignment: Assignment, reminderDays: number = 3): boolean => {
  if (assignment.status === 'completed') return false;
  
  const daysUntilDue = getDaysUntilDue(assignment.dueDate);
  return daysUntilDue <= reminderDays && daysUntilDue >= 0;
};

export const getNextReminderDate = (dueDate: string, reminderDays: number = 3): string => {
  const due = parseISO(dueDate);
  const reminderDate = new Date(due);
  reminderDate.setDate(reminderDate.getDate() - reminderDays);
  return reminderDate.toISOString();
};

// Performance Helpers
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};

// Chart Data Helpers
export const prepareChartData = (logs: CompletionLog[], assignments: Assignment[]) => {
  // Completion trends over time
  const completionTrends = logs
    .sort((a, b) => parseISO(a.completedDate).getTime() - parseISO(b.completedDate).getTime())
    .reduce((acc, log) => {
      const month = format(parseISO(log.completedDate), 'MMM yyyy');
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  // Department completion rates
  const departmentData = calculateDepartmentMetrics(assignments, logs);

  // Category distribution
  const categoryDistribution = logs.reduce((acc, log) => {
    // You'd need to map training IDs to categories
    // This is a simplified version
    const category = 'Security'; // Would be looked up from training data
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    completionTrends: Object.entries(completionTrends).map(([month, count]) => ({
      month,
      completions: count
    })),
    departmentData,
    categoryDistribution: Object.entries(categoryDistribution).map(([category, count]) => ({
      category,
      count
    }))
  };
};
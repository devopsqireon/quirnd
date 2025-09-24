// /app/(protected)/audit-monitoring/utils/index.ts

import { 
    SEVERITY_COLORS, 
    STATUS_COLORS, 
    PRIORITY_COLORS,
    RETENTION_PERIODS,
    EXPORT_FORMATS
  } from '../constants';
  import type { 
    AuditLog, 
    Evidence, 
    InternalAudit, 
    ExportOptions,
    AuditLogFilters,
    EvidenceFilters,
    AuditFilters
  } from '../types';
  
  // Date formatting utilities
  export const formatDateTime = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'UTC'
    }).format(new Date(date));
  };
  
  export const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  export const formatShortDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };
  
  export const getRelativeTime = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (days < 30) {
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else {
      return formatDate(date);
    }
  };
  
  // File size formatting
  export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Color utilities
  export const getSeverityColor = (severity: string): string => {
    return SEVERITY_COLORS[severity as keyof typeof SEVERITY_COLORS] || 'bg-gray-100 text-gray-800';
  };
  
  export const getStatusColor = (status: string): string => {
    return STATUS_COLORS[status as keyof typeof STATUS_COLORS] || 'bg-gray-100 text-gray-800';
  };
  
  export const getPriorityColor = (priority: string): string => {
    return PRIORITY_COLORS[priority as keyof typeof PRIORITY_COLORS] || 'bg-gray-100 text-gray-800';
  };
  
  // Validation utilities
  export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const isValidFileSize = (size: number, maxSize: number = 50 * 1024 * 1024): boolean => {
    return size <= maxSize;
  };
  
  export const isValidFileType = (mimeType: string, allowedTypes: string[]): boolean => {
    return allowedTypes.includes(mimeType);
  };
  
  // Progress calculation
  export const calculateProgress = (completed: number, total: number): number => {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  };
  
  // Retention date calculation
  export const calculateRetentionDate = (uploadDate: Date, retentionYears: number = RETENTION_PERIODS.DEFAULT): Date => {
    const retentionDate = new Date(uploadDate);
    retentionDate.setFullYear(retentionDate.getFullYear() + retentionYears);
    return retentionDate;
  };
  
  // Search and filter utilities
  export const filterAuditLogs = (logs: AuditLog[], filters: AuditLogFilters, searchTerm: string = ''): AuditLog[] => {
    return logs.filter(log => {
      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          log.action.toLowerCase().includes(searchLower) ||
          log.user.toLowerCase().includes(searchLower) ||
          log.resource.toLowerCase().includes(searchLower) ||
          log.details.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }
  
      // Category filter
      if (filters.category && filters.category.length > 0) {
        if (!filters.category.includes(log.category)) return false;
      }
  
      // Severity filter
      if (filters.severity && filters.severity.length > 0) {
        if (!filters.severity.includes(log.severity)) return false;
      }
  
      // Status filter
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(log.status)) return false;
      }
  
      // Date range filter
      if (filters.dateRange) {
        const logDate = new Date(log.timestamp);
        if (logDate < filters.dateRange.start || logDate > filters.dateRange.end) {
          return false;
        }
      }
  
      // User filter
      if (filters.user && filters.user.length > 0) {
        if (!filters.user.includes(log.user)) return false;
      }
  
      // Resource filter
      if (filters.resource) {
        if (!log.resource.toLowerCase().includes(filters.resource.toLowerCase())) {
          return false;
        }
      }
  
      return true;
    });
  };
  
  export const filterEvidence = (evidence: Evidence[], filters: EvidenceFilters, searchTerm: string = ''): Evidence[] => {
    return evidence.filter(item => {
      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          item.name.toLowerCase().includes(searchLower) ||
          item.category.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          item.tags.some(tag => tag.toLowerCase().includes(searchLower));
        
        if (!matchesSearch) return false;
      }
  
      // Type filter
      if (filters.type && filters.type.length > 0) {
        if (!filters.type.includes(item.type)) return false;
      }
  
      // Category filter
      if (filters.category && filters.category.length > 0) {
        if (!filters.category.includes(item.category)) return false;
      }
  
      // Status filter
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(item.status)) return false;
      }
  
      // Upload date range filter
      if (filters.uploadDateRange) {
        const uploadDate = new Date(item.uploadDate);
        if (uploadDate < filters.uploadDateRange.start || uploadDate > filters.uploadDateRange.end) {
          return false;
        }
      }
  
      // Tags filter
      if (filters.tags && filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some(tag => item.tags.includes(tag));
        if (!hasMatchingTag) return false;
      }
  
      // Linked audits filter
      if (filters.linkedAudits && filters.linkedAudits.length > 0) {
        const hasMatchingAudit = filters.linkedAudits.some(auditId => item.linkedAudits.includes(auditId));
        if (!hasMatchingAudit) return false;
      }
  
      return true;
    });
  };
  
  export const filterAudits = (audits: InternalAudit[], filters: AuditFilters, searchTerm: string = ''): InternalAudit[] => {
    return audits.filter(audit => {
      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          audit.title.toLowerCase().includes(searchLower) ||
          audit.scope.toLowerCase().includes(searchLower) ||
          audit.auditor.toLowerCase().includes(searchLower) ||
          (audit.description && audit.description.toLowerCase().includes(searchLower));
        
        if (!matchesSearch) return false;
      }
  
      // Audit type filter
      if (filters.auditType && filters.auditType.length > 0) {
        if (!filters.auditType.includes(audit.auditType)) return false;
      }
  
      // Status filter
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(audit.status)) return false;
      }
  
      // Priority filter
      if (filters.priority && filters.priority.length > 0) {
        if (!filters.priority.includes(audit.priority)) return false;
      }
  
      // Auditor filter
      if (filters.auditor && filters.auditor.length > 0) {
        if (!filters.auditor.includes(audit.auditor)) return false;
      }
  
      // Scheduled date range filter
      if (filters.scheduledDateRange) {
        const scheduledDate = new Date(audit.scheduledDate);
        if (scheduledDate < filters.scheduledDateRange.start || scheduledDate > filters.scheduledDateRange.end) {
          return false;
        }
      }
  
      // Standard filter
      if (filters.standard && filters.standard.length > 0) {
        if (!audit.standard || !filters.standard.includes(audit.standard)) {
          return false;
        }
      }
  
      return true;
    });
  };
  
  // Sorting utilities
  export const sortData = <T>(data: T[], field: keyof T, direction: 'asc' | 'desc'): T[] => {
    return [...data].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];
  
      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };
  
  // Pagination utilities
  export const paginateData = <T>(data: T[], page: number, pageSize: number): T[] => {
    const startIndex = (page - 1) * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  };
  
  export const calculateTotalPages = (totalItems: number, pageSize: number): number => {
    return Math.ceil(totalItems / pageSize);
  };
  
  // Export utilities
  export const generateCSV = (data: any[], filename: string): void => {
    if (data.length === 0) return;
  
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row =>
        headers.map(header => {
          const value = row[header];
          // Escape quotes and wrap in quotes if contains comma
          const escaped = String(value).replace(/"/g, '""');
          return escaped.includes(',') ? `"${escaped}"` : escaped;
        }).join(',')
      )
    ].join('\n');
  
    downloadFile(csvContent, filename, 'text/csv');
  };
  
  export const generateJSON = (data: any[], filename: string): void => {
    const jsonContent = JSON.stringify(data, null, 2);
    downloadFile(jsonContent, filename, 'application/json');
  };
  
  const downloadFile = (content: string, filename: string, mimeType: string): void => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  // Risk calculation utilities
  export const calculateRiskScore = (likelihood: number, impact: number): number => {
    // Risk matrix calculation (1-5 scale)
    return Math.round((likelihood * impact) / 5 * 10) / 10;
  };
  
  export const getRiskLevel = (riskScore: number): 'low' | 'medium' | 'high' | 'critical' => {
    if (riskScore >= 4) return 'critical';
    if (riskScore >= 3) return 'high';
    if (riskScore >= 2) return 'medium';
    return 'low';
  };
  
  // Compliance calculation utilities
  export const calculateCompliancePercentage = (compliantItems: number, totalItems: number): number => {
    if (totalItems === 0) return 0;
    return Math.round((compliantItems / totalItems) * 100);
  };
  
  export const calculateControlEffectiveness = (effectiveControls: number, totalControls: number): number => {
    if (totalControls === 0) return 0;
    return Math.round((effectiveControls / totalControls) * 100);
  };
  
  // Trend analysis utilities
  export const calculateTrend = (currentValue: number, previousValue: number): {
    direction: 'up' | 'down' | 'stable';
    percentage: number;
  } => {
    if (previousValue === 0) {
      return { direction: 'stable', percentage: 0 };
    }
  
    const change = ((currentValue - previousValue) / previousValue) * 100;
    const percentage = Math.abs(Math.round(change * 10) / 10);
  
    if (change > 5) return { direction: 'up', percentage };
    if (change < -5) return { direction: 'down', percentage };
    return { direction: 'stable', percentage };
  };
  
  // Data aggregation utilities
  export const aggregateByCategory = <T>(data: T[], categoryField: keyof T): Record<string, number> => {
    return data.reduce((acc, item) => {
      const category = String(item[categoryField]);
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };
  
  export const aggregateBySeverity = (items: { severity: string }[]): Record<string, number> => {
    return items.reduce((acc, item) => {
      acc[item.severity] = (acc[item.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };
  
  export const aggregateByStatus = (items: { status: string }[]): Record<string, number> => {
    return items.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };
  
  // Time-based aggregation
  export const aggregateByTimeRange = (items: { timestamp: Date }[], range: 'daily' | 'weekly' | 'monthly'): Record<string, number> => {
    return items.reduce((acc, item) => {
      let key: string;
      const date = new Date(item.timestamp);
      
      switch (range) {
        case 'daily':
          key = date.toISOString().split('T')[0];
          break;
        case 'weekly':
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          key = weekStart.toISOString().split('T')[0];
          break;
        case 'monthly':
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          break;
        default:
          key = date.toISOString().split('T')[0];
      }
      
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };
  
  // Performance metrics
  export const calculateAverageResolutionTime = (items: { createdDate: Date; resolvedDate?: Date }[]): number => {
    const resolvedItems = items.filter(item => item.resolvedDate);
    if (resolvedItems.length === 0) return 0;
  
    const totalTime = resolvedItems.reduce((sum, item) => {
      const resolutionTime = item.resolvedDate!.getTime() - item.createdDate.getTime();
      return sum + resolutionTime;
    }, 0);
  
    return Math.round(totalTime / resolvedItems.length / (1000 * 60 * 60 * 24)); // Convert to days
  };
  
  export const calculateOverdueItems = (items: { dueDate?: Date; status: string }[]): number => {
    const now = new Date();
    return items.filter(item => 
      item.dueDate && 
      item.dueDate < now && 
      !['completed', 'resolved', 'verified'].includes(item.status)
    ).length;
  };
  
  // Chart data transformation utilities
  export const transformToChartData = (data: Record<string, number>, type: 'pie' | 'bar' | 'line' = 'bar') => {
    const labels = Object.keys(data);
    const values = Object.values(data);
  
    switch (type) {
      case 'pie':
        return {
          labels,
          datasets: [{
            data: values,
            backgroundColor: [
              '#3B82F6', '#10B981', '#F59E0B', '#EF4444',
              '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'
            ].slice(0, labels.length)
          }]
        };
      case 'line':
        return {
          labels,
          datasets: [{
            label: 'Trend',
            data: values,
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true
          }]
        };
      default: // bar
        return {
          labels,
          datasets: [{
            label: 'Count',
            data: values,
            backgroundColor: '#3B82F6',
            borderColor: '#1D4ED8',
            borderWidth: 1
          }]
        };
    }
  };
  
  // URL and query parameter utilities
  export const buildQueryParams = (params: Record<string, any>): string => {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(v => searchParams.append(key, String(v)));
        } else {
          searchParams.set(key, String(value));
        }
      }
    });
    
    return searchParams.toString();
  };
  
  export const parseQueryParams = (search: string): Record<string, any> => {
    const params = new URLSearchParams(search);
    const result: Record<string, any> = {};
    
    for (const [key, value] of params.entries()) {
      if (result[key]) {
        // Multiple values for the same key
        if (Array.isArray(result[key])) {
          result[key].push(value);
        } else {
          result[key] = [result[key], value];
        }
      } else {
        result[key] = value;
      }
    }
    
    return result;
  };
  
  // Debounce utility for search
  export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(null, args), wait);
    };
  };
  
  // Local storage utilities
  export const saveToLocalStorage = (key: string, data: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };
  
  export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return defaultValue;
    }
  };
  
  export const removeFromLocalStorage = (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  };
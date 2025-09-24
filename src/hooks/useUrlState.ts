// hooks/useUrlState.ts

'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { FilterOptions, PaginationOptions, ViewMode } from '@/lib/improvement-readiness/types';
import { getUrlParams, updateUrlParams } from '@/lib/improvement-readiness/utils';

export interface UrlState {
  view: ViewMode;
  pagination: PaginationOptions;
  filters: FilterOptions;
}

export function useUrlState() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentState: UrlState = {
    view: (searchParams.get('view') as ViewMode) || 'table',
    pagination: {
      page: parseInt(searchParams.get('page') || '1'),
      pageSize: parseInt(searchParams.get('pageSize') || '25'),
      sortBy: searchParams.get('sortBy') || 'createdDate',
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
    },
    filters: {
      search: searchParams.get('search') || '',
      status: searchParams.get('status')?.split(',').filter(Boolean) || [],
      priority: searchParams.get('priority')?.split(',').filter(Boolean) || [],
      category: searchParams.get('category')?.split(',').filter(Boolean) || [],
      source: searchParams.get('source')?.split(',').filter(Boolean) || [],
      assignee: searchParams.get('assignee')?.split(',').filter(Boolean) || [],
      dateRange: searchParams.get('dateFrom') && searchParams.get('dateTo') ? {
        from: searchParams.get('dateFrom')!,
        to: searchParams.get('dateTo')!,
      } : undefined,
    },
  };

  const updateUrl = useCallback((updates: Partial<UrlState>) => {
    const params: Record<string, string | string[] | number | null> = {};

    if (updates.view !== undefined) {
      params.view = updates.view;
    }

    if (updates.pagination) {
      if (updates.pagination.page !== undefined) params.page = updates.pagination.page;
      if (updates.pagination.pageSize !== undefined) params.pageSize = updates.pagination.pageSize;
      if (updates.pagination.sortBy !== undefined) params.sortBy = updates.pagination.sortBy;
      if (updates.pagination.sortOrder !== undefined) params.sortOrder = updates.pagination.sortOrder;
    }

    if (updates.filters) {
      if (updates.filters.search !== undefined) params.search = updates.filters.search;
      if (updates.filters.status !== undefined) params.status = updates.filters.status;
      if (updates.filters.priority !== undefined) params.priority = updates.filters.priority;
      if (updates.filters.category !== undefined) params.category = updates.filters.category;
      if (updates.filters.source !== undefined) params.source = updates.filters.source;
      if (updates.filters.assignee !== undefined) params.assignee = updates.filters.assignee;
      if (updates.filters.dateRange !== undefined) {
        if (updates.filters.dateRange) {
          params.dateFrom = updates.filters.dateRange.from;
          params.dateTo = updates.filters.dateRange.to;
        } else {
          params.dateFrom = null;
          params.dateTo = null;
        }
      }
    }

    const newUrl = `${pathname}?${updateUrlParams(searchParams, params)}`;
    router.push(newUrl);
  }, [searchParams, router, pathname]);

  const setView = useCallback((view: ViewMode) => {
    updateUrl({ view });
  }, [updateUrl]);

  const setPagination = useCallback((pagination: Partial<PaginationOptions>) => {
    updateUrl({ pagination });
  }, [updateUrl]);

  const setFilters = useCallback((filters: Partial<FilterOptions>) => {
    // Reset to first page when filters change
    updateUrl({ 
      filters,
      pagination: { page: 1 }
    });
  }, [updateUrl]);

  const resetFilters = useCallback(() => {
    updateUrl({
      filters: {
        search: '',
        status: [],
        priority: [],
        category: [],
        source: [],
        assignee: [],
        dateRange: undefined,
      },
      pagination: { page: 1 }
    });
  }, [updateUrl]);

  const resetAll = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  return {
    ...currentState,
    setView,
    setPagination,
    setFilters,
    resetFilters,
    resetAll,
    updateUrl,
  };
}
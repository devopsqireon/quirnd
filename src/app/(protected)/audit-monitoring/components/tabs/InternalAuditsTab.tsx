// /app/(protected)/audit-monitoring/components/tabs/InternalAuditsTab.tsx
"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  Eye, 
  Edit, 
  Calendar, 
  Users, 
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Target,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Award,
  Building,
  User,
  MapPin,
  BookOpen,
  Settings,
  Download,
  ExternalLink,
  CheckSquare,
  XCircle,
  PlayCircle,
  PauseCircle,
  RotateCcw,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';

import { mockInternalAudits, mockDashboardMetrics, mockUsers } from '../../data/mock-data';
import { filterAudits, formatDate, formatFileSize, calculateProgress } from '../../utils';
import type { InternalAudit, AuditFilters, CorrectiveAction, NonConformity } from '../../types';
import { AUDIT_TYPES, PRIORITY_LEVELS, AUDIT_STATUS, COMPLIANCE_STANDARDS } from '../../constants';

import {
  SearchBar,
  FilterPanel,
  ExportDropdown,
  DataTable,
  Pagination,
  BulkActions,
  StatusBadge,
  EmptyState,
  DEFAULT_AUDIT_ACTIONS,
  type Column
} from '../shared';

export const InternalAuditsTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [selectedAudits, setSelectedAudits] = useState<InternalAudit[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  
  // Modal and drawer states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState<InternalAudit | null>(null);
  
  // Create audit form state
  const [createForm, setCreateForm] = useState({
    title: '',
    description: '',
    scope: '',
    auditType: '',
    standard: '',
    priority: 'medium',
    auditor: '',
    budget: ''
  });

  // Filter options with counts
  const filterOptions = [
    // Audit Type filters
    { key: 'auditType', label: 'Compliance', value: 'compliance', count: mockInternalAudits.filter(a => a.auditType === 'compliance').length },
    { key: 'auditType', label: 'Security', value: 'security', count: mockInternalAudits.filter(a => a.auditType === 'security').length },
    { key: 'auditType', label: 'Operational', value: 'operational', count: mockInternalAudits.filter(a => a.auditType === 'operational').length },
    { key: 'auditType', label: 'Financial', value: 'financial', count: mockInternalAudits.filter(a => a.auditType === 'financial').length },
    { key: 'auditType', label: 'External', value: 'external', count: mockInternalAudits.filter(a => a.auditType === 'external').length },
    
    // Status filters
    { key: 'status', label: 'Planned', value: 'planned', count: mockInternalAudits.filter(a => a.status === 'planned').length },
    { key: 'status', label: 'In Progress', value: 'in-progress', count: mockInternalAudits.filter(a => a.status === 'in-progress').length },
    { key: 'status', label: 'Completed', value: 'completed', count: mockInternalAudits.filter(a => a.status === 'completed').length },
    { key: 'status', label: 'On Hold', value: 'on-hold', count: mockInternalAudits.filter(a => a.status === 'on-hold').length },
    { key: 'status', label: 'Cancelled', value: 'cancelled', count: mockInternalAudits.filter(a => a.status === 'cancelled').length },
    
    // Priority filters
    { key: 'priority', label: 'Critical', value: 'critical', count: mockInternalAudits.filter(a => a.priority === 'critical').length },
    { key: 'priority', label: 'High', value: 'high', count: mockInternalAudits.filter(a => a.priority === 'high').length },
    { key: 'priority', label: 'Medium', value: 'medium', count: mockInternalAudits.filter(a => a.priority === 'medium').length },
    { key: 'priority', label: 'Low', value: 'low', count: mockInternalAudits.filter(a => a.priority === 'low').length },

    // Standard filters
    { key: 'standard', label: 'ISO 27001', value: 'ISO 27001:2022', count: mockInternalAudits.filter(a => a.standard === 'ISO 27001:2022').length },
    { key: 'standard', label: 'SOC 2', value: 'SOC 2 Type II', count: mockInternalAudits.filter(a => a.standard === 'SOC 2 Type II').length },
    { key: 'standard', label: 'GDPR', value: 'GDPR', count: mockInternalAudits.filter(a => a.standard === 'GDPR').length },
    { key: 'standard', label: 'SOX', value: 'SOX', count: mockInternalAudits.filter(a => a.standard === 'SOX').length }
  ];

  // Filtered and paginated data
  const filteredAudits = useMemo(() => {
    const auditFilters: AuditFilters = {
      auditType: filters.auditType,
      status: filters.status,
      priority: filters.priority,
      standard: filters.standard
    };
    return filterAudits(mockInternalAudits, auditFilters, searchTerm);
  }, [searchTerm, filters]);

  const paginatedAudits = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredAudits.slice(startIndex, startIndex + pageSize);
  }, [filteredAudits, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredAudits.length / pageSize);

  // Status icon mapping
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'planned': return <Calendar className="w-4 h-4" />;
      case 'in-progress': return <PlayCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'on-hold': return <PauseCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  // Table columns configuration
  const columns: Column<InternalAudit>[] = [
    {
      key: 'title',
      header: 'Audit Information',
      sortable: true,
      width: '300px',
      render: (audit) => (
        <div className="max-w-xs">
          <div className="font-medium text-slate-900 mb-1">
            {audit.title}
          </div>
          <div className="text-sm text-slate-500 line-clamp-2 mb-2">
            {audit.scope}
          </div>
          <div className="flex items-center gap-2">
            {audit.standard && (
              <Badge variant="outline" className="text-xs">
                {audit.standard}
              </Badge>
            )}
            <StatusBadge status={audit.auditType} type="status" />
          </div>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (audit) => (
        <div className="flex items-center gap-2">
          <div className={`p-1 rounded ${
            audit.status === 'completed' ? 'bg-green-100' :
            audit.status === 'in-progress' ? 'bg-blue-100' :
            audit.status === 'on-hold' ? 'bg-orange-100' :
            audit.status === 'cancelled' ? 'bg-red-100' :
            'bg-gray-100'
          }`}>
            {getStatusIcon(audit.status)}
          </div>
          <StatusBadge status={audit.status} type="status" />
        </div>
      )
    },
    {
      key: 'priority',
      header: 'Priority',
      render: (_, value) => (
        <StatusBadge status={value} type="priority" />
      )
    },
    {
      key: 'progress',
      header: 'Progress',
      render: (audit) => (
        <div className="w-28">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-600">{audit.progress}%</span>
            <span className="text-xs text-slate-500">
              {audit.findings}/{audit.actions}
            </span>
          </div>
          <Progress value={audit.progress} className="h-2" />
          <div className="text-xs text-slate-500 mt-1">
            {audit.findings} findings, {audit.actions} actions
          </div>
        </div>
      )
    },
    {
      key: 'scheduledDate',
      header: 'Schedule',
      sortable: true,
      render: (audit) => {
        const isOverdue = audit.status !== 'completed' && audit.scheduledDate < new Date();
        return (
          <div>
            <div className={`text-sm flex items-center gap-1 ${
              isOverdue ? 'text-red-600' : 'text-slate-900'
            }`}>
              <Calendar className="w-3 h-3" />
              {formatDate(audit.scheduledDate)}
            </div>
            {audit.completedDate && (
              <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Completed: {formatDate(audit.completedDate)}
              </div>
            )}
            {audit.nextReview && (
              <div className="text-xs text-blue-600 mt-1">
                Next review: {formatDate(audit.nextReview)}
              </div>
            )}
            {isOverdue && (
              <Badge variant="destructive" className="mt-1 text-xs">
                Overdue
              </Badge>
            )}
          </div>
        );
      }
    },
    {
      key: 'auditor',
      header: 'Team',
      render: (audit) => (
        <div>
          <div className="text-sm font-medium flex items-center gap-1">
            <User className="w-3 h-3 text-slate-400" />
            {audit.auditor}
          </div>
          {audit.auditTeam && audit.auditTeam.length > 0 && (
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <Users className="w-3 h-3" />
              +{audit.auditTeam.length} team member{audit.auditTeam.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      )
    },
    {
      key: 'budget',
      header: 'Budget',
      render: (audit) => (
        <div className="text-right">
          {audit.budget && (
            <div className="text-sm font-medium">
              ${audit.budget.toLocaleString()}
            </div>
          )}
          {audit.actualCost && (
            <div className={`text-xs mt-1 ${
              audit.actualCost > (audit.budget || 0) ? 'text-red-600' : 'text-green-600'
            }`}>
              Actual: ${audit.actualCost.toLocaleString()}
            </div>
          )}
          {audit.budget && audit.actualCost && (
            <div className="text-xs text-slate-500 mt-1">
              {Math.round((audit.actualCost / audit.budget) * 100)}% used
            </div>
          )}
        </div>
      )
    },
    {
      key: 'evidenceCount',
      header: 'Evidence',
      render: (audit) => (
        <div className="text-center">
          <div className="text-sm font-medium">{audit.evidenceCount}</div>
          <div className="text-xs text-slate-500">items</div>
        </div>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (audit) => (
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => handleViewDetails(audit)}
            className="h-8 w-8 p-0"
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => handleSchedule(audit)}
            className="h-8 w-8 p-0"
          >
            <Calendar className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => handleEdit(audit)}
            className="h-8 w-8 p-0"
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  // Event handlers
  const handleCreateAudit = () => {
    setIsCreateModalOpen(true);
  };

  const handleSubmitCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!createForm.title || !createForm.scope || !createForm.auditType) {
      toast.error('Missing required fields', {
        description: 'Please fill in title, scope, and audit type'
      });
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Audit Created', {
        description: `${createForm.title} has been created successfully`
      });
      
      // Reset form and close modal
      setCreateForm({
        title: '',
        description: '',
        scope: '',
        auditType: '',
        standard: '',
        priority: 'medium',
        auditor: '',
        budget: ''
      });
      setIsCreateModalOpen(false);
      
    } catch (error) {
      toast.error('Creation failed', {
        description: 'Please try again or contact support'
      });
    }
  };

  const handleExport = (format: string) => {
    toast.success('Export started', {
      description: `Exporting ${filteredAudits.length} audits as ${format.toUpperCase()}`
    });
    
    // Simulate export process
    setTimeout(() => {
      toast.success('Export completed', {
        description: `Audit data exported successfully as ${format.toUpperCase()}`
      });
    }, 2000);
  };

  const handleViewDetails = (audit: InternalAudit) => {
    setSelectedAudit(audit);
    setIsDetailsDrawerOpen(true);
  };

  const handleSchedule = (audit: InternalAudit) => {
    toast.info('Schedule Audit', {
      description: `Opening schedule modal for: ${audit.title}`
    });
  };

  const handleEdit = (audit: InternalAudit) => {
    toast.info('Edit Audit', {
      description: `Opening editor for: ${audit.title}`
    });
  };

  const handleStatusChange = (audit: InternalAudit, newStatus: string) => {
    toast.success('Status Updated', {
      description: `${audit.title} status changed to ${newStatus}`
    });
  };

  const handleSelectionChange = (audits: InternalAudit[]) => {
    setSelectedAudits(audits);
  };

  const handleClearSelection = () => {
    setSelectedAudits([]);
  };

  const handleBulkAction = (action: string, selectedIds: string[]) => {
    switch (action) {
      case 'export':
        toast.success('Bulk Export', {
          description: `Exporting ${selectedIds.length} audits`
        });
        break;
      case 'update-status':
        toast.info('Bulk Status Update', {
          description: 'Status update modal would open here'
        });
        break;
      case 'delete':
        toast.warning('Bulk Delete', {
          description: `Deleting ${selectedIds.length} audits`
        });
        break;
      default:
        console.log(`Bulk action: ${action} on items:`, selectedIds);
    }
  };

  // Enhanced bulk actions with custom handlers
  const enhancedBulkActions = DEFAULT_AUDIT_ACTIONS.map(action => ({
    ...action,
    onClick: (selectedIds: string[]) => handleBulkAction(action.key, selectedIds)
  }));

  // Quick stats calculation
  const stats = [
    {
      title: 'Total Audits',
      value: mockInternalAudits.length,
      icon: <FileText className="w-5 h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+2 this month'
    },
    {
      title: 'Active Audits', 
      value: mockInternalAudits.filter(a => a.status === 'in-progress').length,
      icon: <PlayCircle className="w-5 h-5" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '3 in progress'
    },
    {
      title: 'Completed',
      value: mockInternalAudits.filter(a => a.status === 'completed').length,
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '85% success rate'
    },
    {
      title: 'Overdue',
      value: mockInternalAudits.filter(a => 
        a.status !== 'completed' && 
        a.scheduledDate < new Date()
      ).length,
      icon: <AlertCircle className="w-5 h-5" />,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      change: 'Need attention'
    }
  ];

  // Upcoming audits for quick view
  const upcomingAudits = mockInternalAudits
    .filter(audit => 
      audit.status === 'planned' && 
      audit.scheduledDate > new Date() &&
      audit.scheduledDate < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    )
    .sort((a, b) => a.scheduledDate.getTime() - b.scheduledDate.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Internal Audits</h2>
          <p className="text-slate-600 mt-1">
            Manage and track internal audit processes across all compliance frameworks
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleCreateAudit} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Audit
          </Button>
          <ExportDropdown onExport={handleExport} />
        </div>
      </div>

      {/* Quick Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <div className={stat.color}>
                    {stat.icon}
                  </div>
                </div>
                {stat.title === 'Overdue' && stat.value > 0 && (
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-slate-900 mb-2">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-500">
                  {stat.change}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Audits Alert */}
      {upcomingAudits.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming Audits (Next 30 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingAudits.map((audit) => (
                <div key={audit.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div>
                      <div className="font-medium text-slate-900">{audit.title}</div>
                      <div className="text-sm text-slate-600">{audit.auditor}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-blue-700">
                      {formatDate(audit.scheduledDate)}
                    </div>
                    <StatusBadge status={audit.priority} type="priority" className="text-xs" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and View Controls */}
      <div className="flex items-center justify-between gap-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search audits by title, scope, auditor, or standard..."
          className="flex-1"
        />
      </div>

      {/* Advanced Filters */}
      <FilterPanel
        filters={filterOptions}
        activeFilters={filters}
        onFilterChange={setFilters}
      />

      {/* Results Summary */}
      {(searchTerm || Object.keys(filters).length > 0) && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-800">
                Showing {filteredAudits.length} of {mockInternalAudits.length} audits
              </span>
            </div>
            {(searchTerm || Object.keys(filters).length > 0) && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setSearchTerm('');
                  setFilters({});
                }}
                className="text-blue-700 hover:text-blue-900"
              >
                Clear all filters
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Bulk Actions Bar */}
      <BulkActions
        selectedCount={selectedAudits.length}
        selectedIds={selectedAudits.map(a => a.id)}
        actions={enhancedBulkActions}
        onClearSelection={handleClearSelection}
      />

      {/* Audits Table */}
      <Card>
        <CardContent className="p-0">
          <DataTable
            data={paginatedAudits}
            columns={columns}
            onSelectionChange={handleSelectionChange}
            selectable
            emptyState={
              <EmptyState
                title="No audits found"
                description={
                  searchTerm || Object.keys(filters).length > 0
                    ? "No audits match your current search and filter criteria. Try adjusting your filters or search terms."
                    : "No audits have been created yet. Start by creating your first internal audit."
                }
                icon={<FileText className="w-12 h-12" />}
                action={{
                  label: "Create Audit",
                  onClick: handleCreateAudit
                }}
              />
            }
            className="min-h-[400px]"
          />
        </CardContent>
      </Card>

      {/* Pagination */}
      {filteredAudits.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={filteredAudits.length}
              onPageChange={setCurrentPage}
              onPageSizeChange={(newPageSize) => {
                setPageSize(newPageSize);
                setCurrentPage(1);
              }}
              pageSizeOptions={[10, 20, 50, 100]}
            />
          </CardContent>
        </Card>
      )}

      {/* Create Audit Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create New Audit
            </DialogTitle>
            <DialogDescription>
              Create and schedule a new internal audit with detailed planning information
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitCreate} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Audit Title *</Label>
                <Input
                  id="title"
                  value={createForm.title}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter comprehensive audit title..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={createForm.description}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Provide detailed description of audit objectives and methodology..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="scope">Audit Scope *</Label>
                <Textarea
                  id="scope"
                  value={createForm.scope}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, scope: e.target.value }))}
                  placeholder="Define specific areas, processes, and boundaries for this audit..."
                  rows={2}
                  required
                />
              </div>
            </div>

            {/* Audit Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="auditType">Audit Type *</Label>
                <Select 
                  value={createForm.auditType} 
                  onValueChange={(value) => setCreateForm(prev => ({ ...prev, auditType: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select audit type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(AUDIT_TYPES).map(([key, value]) => (
                      <SelectItem key={key} value={value}>
                        <div className="flex items-center gap-2">
                          {value === 'compliance' && <Award className="w-4 h-4" />}
                          {value === 'security' && <Shield className="w-4 h-4" />}
                          {value === 'operational' && <Settings className="w-4 h-4" />}
                          {value === 'financial' && <DollarSign className="w-4 h-4" />}
                          {value === 'external' && <Building className="w-4 h-4" />}
                          {value.charAt(0).toUpperCase() + value.slice(1)}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="standard">Compliance Standard</Label>
                <Select 
                  value={createForm.standard} 
                  onValueChange={(value) => setCreateForm(prev => ({ ...prev, standard: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select standard (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(COMPLIANCE_STANDARDS).map(([key, value]) => (
                      <SelectItem key={key} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority *</Label>
                <Select 
                  value={createForm.priority} 
                  onValueChange={(value) => setCreateForm(prev => ({ ...prev, priority: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(PRIORITY_LEVELS).map(([key, value]) => (
                      <SelectItem key={key} value={value}>
                        <div className="flex items-center gap-2">
                          {value === 'critical' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                          {value === 'high' && <TrendingUp className="w-4 h-4 text-orange-500" />}
                          {value === 'medium' && <Target className="w-4 h-4 text-yellow-500" />}
                          {value === 'low' && <CheckCircle className="w-4 h-4 text-green-500" />}
                          {value.charAt(0).toUpperCase() + value.slice(1)}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget (USD)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={createForm.budget}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, budget: e.target.value }))}
                  placeholder="Enter estimated budget..."
                />
              </div>
            </div>

            {/* Team Assignment */}
            <div className="space-y-2">
              <Label htmlFor="auditor">Lead Auditor</Label>
              <Input
                id="auditor"
                value={createForm.auditor}
                onChange={(e) => setCreateForm(prev => ({ ...prev, auditor: e.target.value }))}
                placeholder="Enter lead auditor name and credentials..."
              />
            </div>

            {/* Information Notice */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium mb-1">Audit Creation Guidelines:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Audit team members will be notified after creation</li>
                      <li>• Evidence collection templates will be automatically prepared</li>
                      <li>• Progress tracking will begin once audit starts</li>
                      <li>• All activities will be logged for compliance purposes</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-4 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsCreateModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Audit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Audit Details Drawer */}
      <Sheet open={isDetailsDrawerOpen} onOpenChange={setIsDetailsDrawerOpen}>
        <SheetContent side="right" className="w-full sm:w-[600px] sm:max-w-none overflow-y-auto">
          {selectedAudit && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {selectedAudit.title}
                </SheetTitle>
                <SheetDescription>
                  Detailed audit information and progress tracking
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Status and Priority */}
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg">
                      {getStatusIcon(selectedAudit.status)}
                    </div>
                    <div>
                      <StatusBadge status={selectedAudit.status} type="status" />
                      <div className="text-sm text-slate-600 mt-1">
                        {selectedAudit.progress}% Complete
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={selectedAudit.priority} type="priority" />
                </div>

                {/* Progress Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Progress Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Overall Progress</span>
                        <span className="font-medium">{selectedAudit.progress}%</span>
                      </div>
                      <Progress value={selectedAudit.progress} className="h-3" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {selectedAudit.findings}
                        </div>
                        <div className="text-xs text-blue-700">Findings</div>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">
                          {selectedAudit.actions}
                        </div>
                        <div className="text-xs text-orange-700">Actions</div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {selectedAudit.evidenceCount}
                        </div>
                        <div className="text-xs text-green-700">Evidence</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Audit Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-600">Audit Type</label>
                        <div className="mt-1">
                          <StatusBadge status={selectedAudit.auditType} type="status" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-600">Standard</label>
                        <div className="mt-1 text-sm">
                          {selectedAudit.standard ? (
                            <Badge variant="outline">{selectedAudit.standard}</Badge>
                          ) : (
                            <span className="text-slate-400">Not specified</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-600">Scope</label>
                      <p className="mt-1 text-sm text-slate-900 bg-slate-50 p-3 rounded-lg">
                        {selectedAudit.scope}
                      </p>
                    </div>

                    {selectedAudit.description && (
                      <div>
                        <label className="text-sm font-medium text-slate-600">Description</label>
                        <p className="mt-1 text-sm text-slate-900 bg-slate-50 p-3 rounded-lg">
                          {selectedAudit.description}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Schedule Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Schedule Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-600">Scheduled Date</label>
                        <div className="mt-1 text-sm font-medium">
                          {formatDate(selectedAudit.scheduledDate)}
                        </div>
                      </div>
                      {selectedAudit.completedDate && (
                        <div>
                          <label className="text-sm font-medium text-slate-600">Completed Date</label>
                          <div className="mt-1 text-sm text-green-600 font-medium">
                            {formatDate(selectedAudit.completedDate)}
                          </div>
                        </div>
                      )}
                    </div>

                    {selectedAudit.nextReview && (
                      <div>
                        <label className="text-sm font-medium text-slate-600">Next Review</label>
                        <div className="mt-1 text-sm font-medium text-blue-600">
                          {formatDate(selectedAudit.nextReview)}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Team Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Audit Team
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-600">Lead Auditor</label>
                      <div className="mt-1 text-sm font-medium flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-400" />
                        {selectedAudit.auditor}
                      </div>
                    </div>

                    {selectedAudit.auditTeam && selectedAudit.auditTeam.length > 0 && (
                      <div>
                        <label className="text-sm font-medium text-slate-600">Team Members</label>
                        <div className="mt-1 space-y-2">
                          {selectedAudit.auditTeam.map((member, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <User className="w-3 h-3 text-slate-400" />
                              {member}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Budget Information */}
                {(selectedAudit.budget || selectedAudit.actualCost) && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Budget Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        {selectedAudit.budget && (
                          <div>
                            <label className="text-sm font-medium text-slate-600">Planned Budget</label>
                            <div className="mt-1 text-sm font-medium">
                              ${selectedAudit.budget.toLocaleString()}
                            </div>
                          </div>
                        )}
                        {selectedAudit.actualCost && (
                          <div>
                            <label className="text-sm font-medium text-slate-600">Actual Cost</label>
                            <div className={`mt-1 text-sm font-medium ${
                              selectedAudit.actualCost > (selectedAudit.budget || 0) 
                                ? 'text-red-600' : 'text-green-600'
                            }`}>
                              ${selectedAudit.actualCost.toLocaleString()}
                            </div>
                          </div>
                        )}
                      </div>

                      {selectedAudit.budget && selectedAudit.actualCost && (
                        <div>
                          <label className="text-sm font-medium text-slate-600">Budget Utilization</label>
                          <div className="mt-2">
                            <Progress 
                              value={(selectedAudit.actualCost / selectedAudit.budget) * 100} 
                              className="h-2"
                            />
                            <div className="text-xs text-slate-600 mt-1">
                              {Math.round((selectedAudit.actualCost / selectedAudit.budget) * 100)}% of budget used
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Corrective Actions */}
                {selectedAudit.correctiveActions && selectedAudit.correctiveActions.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <CheckSquare className="w-4 h-4" />
                        Corrective Actions ({selectedAudit.correctiveActions.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedAudit.correctiveActions.slice(0, 3).map((action) => (
                          <div key={action.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                            <div className="p-1 bg-white rounded">
                              {action.status === 'completed' ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : action.status === 'in-progress' ? (
                                <PlayCircle className="w-4 h-4 text-blue-600" />
                              ) : (
                                <Clock className="w-4 h-4 text-orange-600" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{action.title}</div>
                              <div className="text-xs text-slate-600 mt-1">
                                Due: {formatDate(action.dueDate)}
                              </div>
                              <StatusBadge status={action.status} type="status" className="text-xs mt-1" />
                            </div>
                          </div>
                        ))}
                        {selectedAudit.correctiveActions.length > 3 && (
                          <div className="text-center">
                            <Button variant="outline" size="sm">
                              View All {selectedAudit.correctiveActions.length} Actions
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Non-Conformities */}
                {selectedAudit.nonConformities && selectedAudit.nonConformities.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Non-Conformities ({selectedAudit.nonConformities.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedAudit.nonConformities.map((nc) => (
                          <div key={nc.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="font-medium text-sm text-red-900">{nc.title}</div>
                                <div className="text-xs text-red-700 mt-1">
                                  Clause: {nc.clause} • Severity: {nc.severity}
                                </div>
                                <StatusBadge status={nc.status} type="status" className="text-xs mt-2" />
                              </div>
                              <StatusBadge status={nc.severity} type="severity" className="text-xs" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Quick Actions */}
                <div className="flex items-center gap-2 pt-4 border-t">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(selectedAudit)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Audit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Evidence
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};
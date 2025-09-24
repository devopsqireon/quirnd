// src/app/(protected)/incident-management/page.tsx
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Plus, 
  FileText, 
  Upload, 
  Settings, 
  Search,
  Filter,
  Download,
  Table,
  Grid3x3,
  Bell,
  Clock,
  ExclamationTriangle,
  CheckCircle,
  Calendar,
  TrendingUp,
  TrendingDown,
  Users,
  FileSpreadsheet,
  AlertTriangle,
  Fire,
  ChevronDown
} from 'lucide-react';

import { IncidentHeader } from '@/components/incident-management/incident-header';
import { ActivityOverview } from '@/components/incident-management/activity-overview';
import { QuickActions } from '@/components/incident-management/quick-actions';
import { IncidentFilters } from '@/components/incident-management/incident-filters';
import { IncidentTable } from '@/components/incident-management/incident-table';
import { IncidentCards } from '@/components/incident-management/incident-cards';
import { IncidentAnalytics } from '@/components/incident-management/incident-analytics';
import { ActivityFeed } from '@/components/incident-management/activity-feed';
import { ImportModal } from '@/components/incident-management/import-modal';
import { IncidentDrawer } from '@/components/incident-management/incident-drawer';

export default function IncidentManagementPage() {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [showFilters, setShowFilters] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <IncidentHeader />

      {/* Call-to-Action Section */}
      <section className="px-8 py-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors group">
            <FileText className="mr-3 h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Report via Form</div>
              <div className="text-blue-100 text-sm">Submit new incident</div>
            </div>
            <Plus className="ml-auto group-hover:translate-x-1 transition-transform h-4 w-4" />
          </button>

          <button 
            className="flex items-center justify-center px-6 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors group"
            onClick={() => setShowImportModal(true)}
          >
            <FileSpreadsheet className="mr-3 h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Import from Excel</div>
              <div className="text-green-100 text-sm">Upload .xlsx/.csv files</div>
            </div>
            <Upload className="ml-auto group-hover:translate-x-1 transition-transform h-4 w-4" />
          </button>

          <button className="flex items-center justify-center px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors group">
            <Settings className="mr-3 h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Configure Integrations</div>
              <div className="text-purple-100 text-sm">SIEM, Jira, ServiceNow</div>
            </div>
            <Settings className="ml-auto group-hover:translate-x-1 transition-transform h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Activity Overview */}
      <ActivityOverview />

      {/* Filters and Search Section */}
      <section className="px-8 py-4 bg-white border-t border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search incidents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-80 pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
              <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">View:</span>
              <Button
                variant={viewMode === 'table' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <Table className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'cards' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('cards')}
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Incident
            </Button>
          </div>
        </div>

        {/* Collapsible Filters Panel */}
        {showFilters && <IncidentFilters />}
      </section>

      {/* Incident Content */}
      <section className="px-8 pb-8">
        {viewMode === 'table' ? (
          <IncidentTable 
            searchQuery={searchQuery}
            onIncidentSelect={setSelectedIncident}
          />
        ) : (
          <IncidentCards 
            searchQuery={searchQuery}
            onIncidentSelect={setSelectedIncident}
          />
        )}
      </section>

      {/* Analytics Section */}
      <IncidentAnalytics />

      {/* Recent Activity Feed */}
      <ActivityFeed />

      {/* Quick Actions Panel */}
      <QuickActions />

      {/* Modals and Drawers */}
      <ImportModal 
        isOpen={showImportModal} 
        onClose={() => setShowImportModal(false)} 
      />
      
      <IncidentDrawer 
        incidentId={selectedIncident}
        isOpen={!!selectedIncident}
        onClose={() => setSelectedIncident(null)}
      />
    </div>
  );
}
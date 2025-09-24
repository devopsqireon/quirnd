// /app/awareness-training/components/tabs/ReportsTab.tsx
import React from 'react';
import { Download, TrendingUp, BarChart3, Users, BookOpen, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTrainingMetrics, useToast } from '../../utils/hooks';
import { LoadingSpinner } from '../shared';
import { ReportsChartsSection, MetricsOverview } from '../reports';

const ReportsTab: React.FC = () => {
  const { metrics, departmentMetrics, loading, error } = useTrainingMetrics();
  const { success, error: showError } = useToast();

  const handleExportReport = async (format: string) => {
    try {
      // Mock export functionality
      await new Promise(resolve => setTimeout(resolve, 1000));
      success(`Report exported as ${format.toUpperCase()}`);
    } catch (err) {
      showError(`Failed to export report as ${format}`);
    }
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

  if (!metrics) {
    return <div>No metrics available</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Training Analytics & Reports</h3>
          <p className="text-sm text-gray-500">
            Comprehensive training metrics and compliance reporting for ISO 27001 requirements
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExportReport('pdf')}>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={() => handleExportReport('excel')}>
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Metrics Overview Cards */}
      <MetricsOverview metrics={metrics} />

      {/* Charts and Analytics */}
      <ReportsChartsSection 
        metrics={metrics}
        departmentMetrics={departmentMetrics}
        onExport={handleExportReport}
      />

      {/* ISO 27001 Compliance Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              Compliance Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-green-900">ISO 27001 Clause 7.2 - Competence</p>
                  <p className="text-sm text-green-700">Training completion tracking active</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Compliant</Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-green-900">ISO 27001 Clause 7.3 - Awareness</p>
                  <p className="text-sm text-green-700">Security awareness program implemented</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Compliant</Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium text-yellow-900">Training Effectiveness</p>
                  <p className="text-sm text-yellow-700">Some employees need refresher training</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Attention Required</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overdue Assignments Alert</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="font-medium text-red-900">Advanced Phishing Recognition</p>
                  <p className="text-sm text-red-700">5 employees overdue</p>
                </div>
                <Badge className="bg-red-100 text-red-800">Critical</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium text-yellow-900">Data Privacy & GDPR Compliance</p>
                  <p className="text-sm text-yellow-700">3 employees due soon</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Due Soon</Badge>
              </div>
              
              <Button size="sm" className="w-full">
                Send Reminder Notifications
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsTab;
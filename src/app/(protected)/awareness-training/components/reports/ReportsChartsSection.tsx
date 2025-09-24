// /app/awareness-training/components/reports/ReportsChartsSection.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { TrainingMetrics, DepartmentMetrics } from '../../types';
import DepartmentMetricsTable from './DepartmentMetricsTable';

interface ReportsChartsSectionProps {
  metrics: TrainingMetrics;
  departmentMetrics: DepartmentMetrics[];
  onExport: (format: string) => void;
}

const ReportsChartsSection: React.FC<ReportsChartsSectionProps> = ({
  metrics,
  departmentMetrics,
  onExport
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Completion Trends Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Training Completion Trends</CardTitle>
          <Button size="sm" variant="outline" onClick={() => onExport('chart-trends')}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-3">
                📈
              </div>
              <p className="text-gray-600 font-medium">Line Chart</p>
              <p className="text-sm text-gray-500 mt-1">Monthly completion trends</p>
              <p className="text-xs text-gray-400 mt-2">
                Would integrate with Chart.js or Recharts
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Department Performance Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Department Performance</CardTitle>
          <Button size="sm" variant="outline" onClick={() => onExport('chart-departments')}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-3">
                📊
              </div>
              <p className="text-gray-600 font-medium">Bar Chart</p>
              <p className="text-sm text-gray-500 mt-1">Completion by department</p>
              <p className="text-xs text-gray-400 mt-2">
                Would show department comparison
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Training Categories Distribution */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Training Categories Distribution</CardTitle>
          <Button size="sm" variant="outline" onClick={() => onExport('chart-categories')}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center bg-gradient-to-br from-purple-50 to-violet-100 rounded-lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-3">
                🥧
              </div>
              <p className="text-gray-600 font-medium">Pie Chart</p>
              <p className="text-sm text-gray-500 mt-1">Category breakdown</p>
              <p className="text-xs text-gray-400 mt-2">
                Security, Compliance, Technical, Soft Skills
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Department Metrics Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Department Metrics</CardTitle>
          <Button size="sm" variant="outline" onClick={() => onExport('table-departments')}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <DepartmentMetricsTable metrics={departmentMetrics} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsChartsSection;
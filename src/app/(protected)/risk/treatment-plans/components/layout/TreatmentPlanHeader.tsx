// /app/risk/treatment-plans/components/layout/TreatmentPlanHeader.tsx
import React from 'react';
import { Plus, Download, Upload, Settings } from 'lucide-react';

interface TreatmentPlanHeaderProps {
  onNewPlan?: () => void;
  onExport?: () => void;
  onImport?: () => void;
  onSettings?: () => void;
}

export const TreatmentPlanHeader: React.FC<TreatmentPlanHeaderProps> = ({
  onNewPlan,
  onExport,
  onImport,
  onSettings
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Risk Treatment Plans</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage and monitor risk mitigation strategies and action plans
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {onExport && (
            <button 
              onClick={onExport}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          )}
          
          {onImport && (
            <button 
              onClick={onImport}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import
            </button>
          )}
          
          {onSettings && (
            <button 
              onClick={onSettings}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Settings className="w-4 h-4" />
            </button>
          )}
          
          {onNewPlan && (
            <button 
              onClick={onNewPlan}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Treatment Plan
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
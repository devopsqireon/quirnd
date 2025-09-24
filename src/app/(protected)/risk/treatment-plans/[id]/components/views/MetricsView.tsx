// /app/risk/treatment-plan/[id]/components/views/MetricsView.tsx
'use client';

import React from 'react';
import { TrendingUpIcon, TrendingDownIcon, MinusIcon, TargetIcon } from 'lucide-react';
import { useTreatmentDetails } from '../../contexts/TreatmentDetailsContext';
import { ProgressBar } from '../shared/ProgressBar';

export const MetricsView: React.FC = () => {
  const { treatmentDetails } = useTreatmentDetails();

  if (!treatmentDetails) return null;

  const { metrics, riskAssessments } = treatmentDetails;

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'Improving': return <TrendingUpIcon className="w-5 h-5 text-green-600" />;
      case 'Declining': return <TrendingDownIcon className="w-5 h-5 text-red-600" />;
      default: return <MinusIcon className="w-5 h-5 text-gray-600" />;
    }
  };

  const getMetricStatus = (current: number, thresholds: any) => {
    if (current >= thresholds.green) return { color: 'green', label: 'Good' };
    if (current >= thresholds.amber) return { color: 'yellow', label: 'Attention' };
    return { color: 'red', label: 'Critical' };
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Performance Metrics</h2>
        <p className="text-gray-600 text-sm">Track key performance indicators and risk metrics</p>
      </div>

      {/* Risk Assessment Progress */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Risk Assessment Progress</h3>
        </div>
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {riskAssessments.map((assessment) => (
              <div key={assessment.id} className="text-center">
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-600">{assessment.assessmentType}</span>
                </div>
                <div className="text-3xl font-bold mb-1">
                  <span className={`${
                    assessment.riskLevel === 'Low' ? 'text-green-600' :
                    assessment.riskLevel === 'Medium' ? 'text-yellow-600' :
                    assessment.riskLevel === 'High' ? 'text-orange-600' :
                    'text-red-600'
                  }`}>
                    {assessment.riskScore}
                  </span>
                </div>
                <div className="text-sm text-gray-600">{assessment.riskLevel}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(assessment.assessmentDate).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KPIs and KRIs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {metrics.map((metric) => {
          const status = getMetricStatus(metric.currentValue, metric.thresholds);
          const progressPercentage = Math.min(100, (metric.currentValue / metric.targetValue) * 100);
          
          return (
            <div key={metric.id} className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{metric.metricName}</h3>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(metric.trend)}
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                      ${status.color === 'green' ? 'bg-green-100 text-green-800' :
                        status.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}`}>
                      {status.label}
                    </span>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {metric.currentValue}
                      <span className="text-sm text-gray-600 ml-1">{metric.unit}</span>
                    </div>
                    <div className="text-sm text-gray-600">Current</div>
                  </div>
                  <TargetIcon className="w-6 h-6 text-gray-400" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {metric.targetValue}
                      <span className="text-sm text-gray-600 ml-1">{metric.unit}</span>
                    </div>
                    <div className="text-sm text-gray-600">Target</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Progress to Target</span>
                    <span className="text-sm text-gray-600">{Math.round(progressPercentage)}%</span>
                  </div>
                  <ProgressBar progress={progressPercentage} size="md" />
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-green-600 font-medium">{metric.thresholds.green}+</div>
                    <div className="text-gray-600">Good</div>
                  </div>
                  <div className="text-center">
                    <div className="text-yellow-600 font-medium">{metric.thresholds.amber}+</div>
                    <div className="text-gray-600">Attention</div>
                  </div>
                  <div className="text-center">
                    <div className="text-red-600 font-medium">&lt;{metric.thresholds.red}</div>
                    <div className="text-gray-600">Critical</div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
                  Last updated: {new Date(metric.measurementDate).toLocaleDateString()}
                  <br />
                  Type: {metric.metricType}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
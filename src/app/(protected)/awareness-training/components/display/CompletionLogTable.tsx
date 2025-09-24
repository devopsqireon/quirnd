// /app/awareness-training/components/display/CompletionLogTable.tsx
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { CompletionLog } from '../../types';
import { ActionButtons } from '../shared';
import { formatDate, getScoreColor, formatTimeSpent } from '../../utils/helpers';

interface CompletionLogTableProps {
  logs: CompletionLog[];
  onView: (log: CompletionLog) => void;
  onDownloadCertificate?: (certificateId: string) => void;
}

const CompletionLogTable: React.FC<CompletionLogTableProps> = ({
  logs,
  onView,
  onDownloadCertificate
}) => {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Employee</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Training Program</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Department</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Completed Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Score</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Time Spent</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Attempts</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Certificate</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.map((log) => (
              <tr 
                key={log.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onView(log)}
              >
                <td className="px-4 py-4">
                  <div>
                    <div className="font-medium text-gray-900">{log.userName}</div>
                    <div className="text-sm text-gray-500">{log.userEmail}</div>
                    <div className="text-sm text-gray-500">{log.role}</div>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-900 max-w-xs">
                  <div className="truncate" title={log.trainingTitle}>
                    {log.trainingTitle}
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">{log.department}</td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  {formatDate(log.completedDate)}
                </td>
                <td className="px-4 py-4">
                  <Badge className={getScoreColor(log.score)}>
                    {log.score}%
                  </Badge>
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  {formatTimeSpent(log.timeSpent)}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  <div className="flex items-center gap-1">
                    <span>{log.attempts}</span>
                    {log.attempts > 1 && (
                      <Badge variant="outline" className="text-xs">
                        Retried
                      </Badge>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  {log.certificateId ? (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDownloadCertificate?.(log.certificateId!);
                      }}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <ActionButtons
                    onView={() => onView(log)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default CompletionLogTable;
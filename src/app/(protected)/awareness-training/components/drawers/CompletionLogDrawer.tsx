// /app/awareness-training/components/drawers/CompletionLogDrawer.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Download, Clock, Trophy, Target, Monitor } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { CompletionLog } from '../../types';
import { formatDate, formatTimeSpent, getScoreColor } from '../../utils/helpers';

interface CompletionLogDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  log: CompletionLog | null;
}

const CompletionLogDrawer: React.FC<CompletionLogDrawerProps> = ({
  isOpen,
  onClose,
  log
}) => {
  if (!log) return null;

  const handleDownloadCertificate = () => {
    console.log('Download certificate:', log.certificateId);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="text-lg">Training Completion Details</SheetTitle>
              <SheetDescription>
                Complete information about this training completion
              </SheetDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Employee Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                Employee Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Name</label>
                <p className="text-gray-900">{log.userName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-900">{log.userEmail}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Department</label>
                  <p className="text-gray-900">{log.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Role</label>
                  <p className="text-gray-900">{log.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Training Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-500" />
                Training Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Training Program</label>
                <p className="text-gray-900">{log.trainingTitle}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Started Date</label>
                  <p className="text-gray-900">{formatDate(log.startedDate)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Completed Date</label>
                  <p className="text-gray-900">{formatDate(log.completedDate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-500" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Final Score</label>
                  <div className="flex items-center gap-2">
                    <Badge className={getScoreColor(log.score)}>
                      {log.score}%
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Attempts</label>
                  <p className="text-gray-900">{log.attempts}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Time Spent</label>
                <p className="text-gray-900">{formatTimeSpent(log.timeSpent)}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Last Access</label>
                <p className="text-gray-900">{formatDate(log.lastAccessDate)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Module Progress */}
          {log.moduleProgress && log.moduleProgress.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Module Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {log.moduleProgress.map((module, index) => (
                    <div key={module.moduleId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{module.moduleName}</p>
                        <p className="text-sm text-gray-500">
                          {formatTimeSpent(module.timeSpent)}
                          {module.score && ` • Score: ${module.score}%`}
                          {module.completedDate && ` • Completed: ${formatDate(module.completedDate)}`}
                        </p>
                      </div>
                      <Badge className={module.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {module.completed ? 'Complete' : 'Incomplete'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Technical Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Monitor className="w-4 h-4 text-gray-500" />
                Technical Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {log.deviceInfo && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Device & Browser</label>
                  <p className="text-gray-900 text-sm">{log.deviceInfo}</p>
                </div>
              )}
              {log.ipAddress && (
                <div>
                  <label className="text-sm font-medium text-gray-500">IP Address</label>
                  <p className="text-gray-900 text-sm">{log.ipAddress}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Certificate */}
          {log.certificateId && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Certificate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-green-900">Certificate Available</p>
                    <p className="text-sm text-green-700">Certificate ID: {log.certificateId}</p>
                  </div>
                  <Button size="sm" onClick={handleDownloadCertificate}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button variant="outline" className="flex-1">
              Export Details
            </Button>
            <Button variant="outline" className="flex-1">
              Send Summary
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CompletionLogDrawer;
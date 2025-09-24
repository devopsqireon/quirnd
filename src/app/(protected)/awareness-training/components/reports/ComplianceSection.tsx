// /app/awareness-training/components/reports/ComplianceSection.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  Download, 
  Shield,
  Clock,
  Users,
  Target,
  TrendingUp,
  Calendar,
  Mail,
  Eye,
  ExternalLink
} from 'lucide-react';
import { TrainingMetrics } from '../../types';
import { ISO_27001_CLAUSES } from '../../utils/constants';
import { useToast } from '../../utils/hooks';

interface ComplianceSectionProps {
  metrics: TrainingMetrics;
  onGenerateReport: (type: string) => void;
}

interface ComplianceItem {
  clause: string;
  title: string;
  description: string;
  status: 'compliant' | 'attention' | 'non-compliant';
  details: string;
  action: string;
  requirements?: string[];
  evidence?: string[];
  lastReviewed?: string;
  nextReview?: string;
}

const ComplianceSection: React.FC<ComplianceSectionProps> = ({
  metrics,
  onGenerateReport
}) => {
  const [selectedClause, setSelectedClause] = useState<string | null>(null);
  const { success, error: showError } = useToast();

  const complianceItems: ComplianceItem[] = [
    {
      clause: 'ISO 27001 Clause 7.2',
      title: 'Competence',
      description: 'Training completion tracking and competence evaluation',
      status: metrics.completionRate >= 80 ? 'compliant' : 'attention',
      details: `${metrics.completionRate}% completion rate ${metrics.completionRate >= 80 ? 'meets' : 'below'} requirements`,
      action: 'View Details',
      requirements: [
        'Determine necessary competence for personnel',
        'Ensure competence through training or experience',
        'Evaluate effectiveness of training actions',
        'Retain documented information as evidence'
      ],
      evidence: [
        'Training completion records',
        'Competence assessment reports',
        'Skills matrix documentation',
        'Performance evaluation data'
      ],
      lastReviewed: '2024-09-15',
      nextReview: '2024-12-15'
    },
    {
      clause: 'ISO 27001 Clause 7.3',
      title: 'Awareness',
      description: 'Security awareness program implementation',
      status: metrics.totalPrograms >= 5 ? 'compliant' : 'attention',
      details: `${metrics.totalPrograms} active programs covering key security areas`,
      action: 'View Details',
      requirements: [
        'Awareness of information security policy',
        'Understanding of ISMS contribution',
        'Awareness of security implications',
        'Consequences of non-conformity'
      ],
      evidence: [
        'Awareness training records',
        'Communication materials',
        'Assessment results',
        'Incident response awareness'
      ],
      lastReviewed: '2024-09-10',
      nextReview: '2024-12-10'
    },
    {
      clause: 'Training Effectiveness',
      title: 'Performance Monitoring',
      description: 'Assessment of training program effectiveness',
      status: metrics.averageScore >= 85 ? 'compliant' : 'attention',
      details: `Average score ${metrics.averageScore}% ${metrics.averageScore >= 85 ? 'exceeds' : 'needs improvement'}`,
      action: 'Review',
      requirements: [
        'Regular effectiveness evaluation',
        'Performance metrics tracking',
        'Continuous improvement process',
        'Feedback collection and analysis'
      ],
      evidence: [
        'Training assessment scores',
        'Performance improvement data',
        'Feedback analysis reports',
        'Program enhancement records'
      ],
      lastReviewed: '2024-09-12',
      nextReview: '2024-10-12'
    },
    {
      clause: 'Documentation Requirements',
      title: 'Record Keeping',
      description: 'Maintenance of training records and documentation',
      status: 'compliant',
      details: `${metrics.certificatesIssued} certificates issued and maintained`,
      action: 'Export Records',
      requirements: [
        'Comprehensive training records',
        'Certificate management',
        'Audit trail maintenance',
        'Document retention policy'
      ],
      evidence: [
        'Training certificates',
        'Completion logs',
        'Audit trail records',
        'Document version control'
      ],
      lastReviewed: '2024-09-08',
      nextReview: '2024-11-08'
    },
    {
      clause: 'Continuous Monitoring',
      title: 'Ongoing Assessment',
      description: 'Regular monitoring of training compliance and effectiveness',
      status: metrics.overdueAssignments <= 10 ? 'compliant' : 'attention',
      details: `${metrics.overdueAssignments} overdue assignments requiring attention`,
      action: 'Monitor',
      requirements: [
        'Regular compliance monitoring',
        'Deadline tracking',
        'Escalation procedures',
        'Corrective action planning'
      ],
      evidence: [
        'Monitoring reports',
        'Escalation records',
        'Corrective action logs',
        'Trend analysis data'
      ],
      lastReviewed: '2024-09-18',
      nextReview: '2024-10-18'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant':
        return <Badge className="bg-green-100 text-green-800">Compliant</Badge>;
      case 'attention':
        return <Badge className="bg-yellow-100 text-yellow-800">Attention Required</Badge>;
      case 'non-compliant':
        return <Badge className="bg-red-100 text-red-800">Non-Compliant</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'attention':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'non-compliant':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'bg-green-50 border-green-200';
      case 'attention':
        return 'bg-yellow-50 border-yellow-200';
      case 'non-compliant':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const calculateOverallCompliance = () => {
    const compliantCount = complianceItems.filter(item => item.status === 'compliant').length;
    return Math.round((compliantCount / complianceItems.length) * 100);
  };

  const handleGenerateReport = async (type: string) => {
    try {
      await onGenerateReport(type);
      success(`${type.replace('-', ' ')} report generation started`);
    } catch (error) {
      showError(`Failed to generate ${type} report`);
    }
  };

  const handleViewClauseDetails = (clause: string) => {
    setSelectedClause(selectedClause === clause ? null : clause);
  };

  const handleSendReminders = async () => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      success('Reminder notifications sent successfully');
    } catch (error) {
      showError('Failed to send reminders');
    }
  };

  return (
    <div className="space-y-6">
      {/* Compliance Overview Header */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-500" />
              ISO 27001 Compliance Dashboard
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Training and awareness program compliance with ISO 27001 requirements
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => handleGenerateReport('compliance')}>
              <Download className="w-4 h-4 mr-2" />
              Compliance Report
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleGenerateReport('audit')}>
              <Download className="w-4 h-4 mr-2" />
              Audit Package
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Overall Compliance Score */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Overall Compliance Score</h3>
              <p className="text-sm text-gray-600">Based on current training metrics and requirements</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">{calculateOverallCompliance()}%</div>
              <p className="text-sm text-gray-500">
                {complianceItems.filter(item => item.status === 'compliant').length} of {complianceItems.length} requirements met
              </p>
            </div>
          </div>
          
          <Progress value={calculateOverallCompliance()} className="h-3 mb-4" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {complianceItems.filter(item => item.status === 'compliant').length}
              </div>
              <p className="text-sm text-green-700">Compliant</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {complianceItems.filter(item => item.status === 'attention').length}
              </div>
              <p className="text-sm text-yellow-700">Needs Attention</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {complianceItems.filter(item => item.status === 'non-compliant').length}
              </div>
              <p className="text-sm text-red-700">Non-Compliant</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Compliance Items */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Requirements Detail</CardTitle>
          <p className="text-sm text-gray-600">
            Click on any requirement to view detailed information and evidence
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceItems.map((item, index) => (
              <div key={index}>
                <div 
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${getStatusColor(item.status)} ${
                    selectedClause === item.clause ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => handleViewClauseDetails(item.clause)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getStatusIcon(item.status)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900">{item.title}</h4>
                          <span className="text-sm text-gray-500">({item.clause})</span>
                          {getStatusBadge(item.status)}
                          <Eye className="w-4 h-4 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{item.description}</p>
                        <p className="text-sm text-gray-500">{item.details}</p>
                        
                        {item.lastReviewed && (
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Last reviewed: {item.lastReviewed}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Next review: {item.nextReview}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        {item.action}
                      </Button>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedClause === item.clause && (
                  <div className="mt-2 p-4 bg-white border rounded-lg shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Requirements
                        </h5>
                        <ul className="space-y-2 text-sm">
                          {item.requirements?.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Evidence & Documentation
                        </h5>
                        <ul className="space-y-2 text-sm">
                          {item.evidence?.map((evidence, evidenceIndex) => (
                            <li key={evidenceIndex} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                              <span>{evidence}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t flex gap-2">
                      <Button size="sm" onClick={() => handleGenerateReport(`${item.clause.toLowerCase().replace(/\s+/g, '-')}-evidence`)}>
                        <Download className="w-4 h-4 mr-2" />
                        Export Evidence
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View Documentation
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Items & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Action Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.overdueAssignments > 0 && (
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-red-900">Overdue Training Assignments</p>
                    <p className="text-sm text-red-700">{metrics.overdueAssignments} employees overdue</p>
                  </div>
                  <Badge className="bg-red-100 text-red-800">Critical</Badge>
                </div>
              )}
              
              {metrics.averageScore < 85 && (
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium text-yellow-900">Low Training Scores</p>
                    <p className="text-sm text-yellow-700">Average score below target (85%)</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Review</Badge>
                </div>
              )}
              
              {metrics.completionRate < 90 && (
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-blue-900">Completion Rate Improvement</p>
                    <p className="text-sm text-blue-700">Target 90% completion rate</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Optimize</Badge>
                </div>
              )}
              
              <div className="pt-2">
                <Button size="sm" className="w-full" onClick={handleSendReminders}>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Reminder Notifications
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Compliance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">This Month</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: `${calculateOverallCompliance()}%`}}></div>
                  </div>
                  <span className="text-sm font-bold">{calculateOverallCompliance()}%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Last Month</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                  <span className="text-sm">85%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">3 Months Ago</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{width: '78%'}}></div>
                  </div>
                  <span className="text-sm">78%</span>
                </div>
              </div>

              <div className="pt-3 border-t">
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>+{calculateOverallCompliance() - 78}% improvement over 3 months</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Generate Compliance Report</h4>
                <p className="text-sm text-gray-500">Full ISO 27001 compliance documentation</p>
              </div>
            </div>
            <Button 
              size="sm" 
              className="w-full mt-3" 
              onClick={() => handleGenerateReport('full-compliance')}
            >
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Audit Trail Export</h4>
                <p className="text-sm text-gray-500">Complete training activity logs</p>
              </div>
            </div>
            <Button 
              size="sm" 
              className="w-full mt-3" 
              onClick={() => handleGenerateReport('audit-trail')}
            >
              Export Logs
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Exception Report</h4>
                <p className="text-sm text-gray-500">Overdue and non-compliance issues</p>
              </div>
            </div>
            <Button 
              size="sm" 
              className="w-full mt-3" 
              onClick={() => handleGenerateReport('exceptions')}
            >
              View Exceptions
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Metrics Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Metrics Summary</CardTitle>
          <p className="text-sm text-gray-600">
            Key performance indicators for training compliance management
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {Math.round(metrics.complianceRate)}%
              </div>
              <p className="text-sm text-green-700 font-medium">Overall Compliance</p>
              <p className="text-xs text-green-600 mt-1">ISO 27001 Requirements</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {metrics.totalPrograms}
              </div>
              <p className="text-sm text-blue-700 font-medium">Active Programs</p>
              <p className="text-xs text-blue-600 mt-1">Training Curriculum</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {metrics.certificatesIssued}
              </div>
              <p className="text-sm text-purple-700 font-medium">Certificates Issued</p>
              <p className="text-xs text-purple-600 mt-1">Evidence Documentation</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {metrics.overdueAssignments}
              </div>
              <p className="text-sm text-orange-700 font-medium">Action Items</p>
              <p className="text-xs text-orange-600 mt-1">Requiring Attention</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceSection;
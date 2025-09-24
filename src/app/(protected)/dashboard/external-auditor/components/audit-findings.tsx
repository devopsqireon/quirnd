// src/app/(protected)/dashboard/external-dashboard/components/audit-findings.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AlertTriangle, Lightbulb } from 'lucide-react'

interface AuditFindingsProps {
  onRaiseNC: () => void
  onRaiseOFI: () => void
}

const findings = [
  {
    type: 'NC',
    typeColor: 'red',
    reference: 'A.5.1 - Security Policy',
    description: 'Information security policy lacks specific incident response procedures...',
    severity: 'Major',
    severityColor: 'orange',
    status: 'In Progress',
    statusColor: 'yellow',
    dueDate: 'Apr 15, 2024',
    owner: 'Compliance Officer'
  },
  {
    type: 'OFI',
    typeColor: 'orange',
    reference: 'A.8.1 - User Endpoints',
    description: 'Consider implementing automated endpoint monitoring for better visibility...',
    severity: 'Medium',
    severityColor: 'blue',
    status: 'Open',
    statusColor: 'red',
    dueDate: 'May 30, 2024',
    owner: 'IT Manager'
  },
  {
    type: 'NC',
    typeColor: 'red',
    reference: 'A.6.1 - Screening',
    description: 'Background check process not documented for contractor access...',
    severity: 'Minor',
    severityColor: 'red',
    status: 'Closed',
    statusColor: 'green',
    dueDate: 'Mar 30, 2024',
    owner: 'HR Manager'
  }
]

const getTypeIcon = (type: string) => {
  return type === 'NC' ? <AlertTriangle className="w-3 h-3 mr-1" /> : <Lightbulb className="w-3 h-3 mr-1" />
}

export function AuditFindings({ onRaiseNC, onRaiseOFI }: AuditFindingsProps) {
  return (
    <section className="mb-8">
      <Card className="border border-gray-100">
        <CardHeader className="border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your Findings</CardTitle>
              <CardDescription>Raise non-conformities and opportunities for improvement</CardDescription>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="destructive" onClick={onRaiseNC}>
                <AlertTriangle className="w-4 h-4 mr-2" />
                Raise NC
              </Button>
              <Button 
                onClick={onRaiseOFI}
                className="bg-orange-600 hover:bg-orange-700"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Raise OFI
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Severity/Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Owner</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {findings.map((finding, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell>
                      <Badge 
                        variant={finding.typeColor === 'red' ? 'destructive' : 'secondary'}
                        className={finding.typeColor === 'orange' ? 'bg-orange-100 text-orange-800' : ''}
                      >
                        {getTypeIcon(finding.type)}
                        {finding.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{finding.reference}</TableCell>
                    <TableCell className="max-w-xs truncate">{finding.description}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          finding.severityColor === 'orange' ? 'secondary' : 
                          finding.severityColor === 'blue' ? 'outline' : 'destructive'
                        }
                        className={
                          finding.severityColor === 'orange' ? 'bg-orange-100 text-orange-800' : 
                          finding.severityColor === 'blue' ? 'bg-blue-100 text-blue-800' : ''
                        }
                      >
                        {finding.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          finding.statusColor === 'yellow' ? 'secondary' : 
                          finding.statusColor === 'red' ? 'destructive' : 'default'
                        }
                        className={finding.statusColor === 'yellow' ? 'bg-yellow-100 text-yellow-800' : ''}
                      >
                        {finding.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-500">{finding.dueDate}</TableCell>
                    <TableCell className="text-gray-500">{finding.owner}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
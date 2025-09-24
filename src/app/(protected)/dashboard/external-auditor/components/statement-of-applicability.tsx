// src/app/(protected)/dashboard/external-dashboard/components/statement-of-applicability.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Download, Check, Clock, X } from 'lucide-react'

const controls = [
  {
    id: 'A.5.1',
    name: 'Information security policies',
    category: 'Organizational',
    status: 'Implemented',
    implementationDate: 'Jan 15, 2023',
    statusColor: 'green'
  },
  {
    id: 'A.5.2',
    name: 'Information security risk management',
    category: 'Organizational',
    status: 'Implemented',
    implementationDate: 'Feb 20, 2023',
    statusColor: 'green'
  },
  {
    id: 'A.6.1',
    name: 'Screening',
    category: 'People',
    status: 'Planned',
    implementationDate: 'Q2 2024',
    statusColor: 'yellow'
  },
  {
    id: 'A.7.1',
    name: 'Physical security perimeters',
    category: 'Physical',
    status: 'Not Applicable',
    implementationDate: '-',
    statusColor: 'gray'
  },
  {
    id: 'A.8.1',
    name: 'User endpoint devices',
    category: 'Technology',
    status: 'Implemented',
    implementationDate: 'Mar 10, 2023',
    statusColor: 'green'
  }
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Implemented':
      return <Check className="w-3 h-3 mr-1" />
    case 'Planned':
      return <Clock className="w-3 h-3 mr-1" />
    case 'Not Applicable':
      return <X className="w-3 h-3 mr-1" />
    default:
      return null
  }
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'Implemented':
      return 'default'
    case 'Planned':
      return 'secondary'
    case 'Not Applicable':
      return 'outline'
    default:
      return 'outline'
  }
}

export function StatementOfApplicability() {
  return (
    <section className="mb-8">
      <Card className="border border-gray-100">
        <CardHeader className="border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Statement of Applicability (SoA)</CardTitle>
              <CardDescription>ISO 27001 Annex A controls mapping and implementation status</CardDescription>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Input placeholder="Search controls..." className="w-48" />
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="implemented">Implemented</SelectItem>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="na">Not Applicable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Export SoA
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Control ID</TableHead>
                  <TableHead>Control Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Implementation Date</TableHead>
                  <TableHead>Evidence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {controls.map((control) => (
                  <TableRow key={control.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{control.id}</TableCell>
                    <TableCell>{control.name}</TableCell>
                    <TableCell>{control.category}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(control.status)}>
                        {getStatusIcon(control.status)}
                        {control.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-500">{control.implementationDate}</TableCell>
                    <TableCell>
                      {control.status === 'Implemented' ? (
                        <Button variant="link" className="p-0 h-auto font-medium">
                          View Evidence
                        </Button>
                      ) : (
                        <span className="text-gray-400">
                          {control.status === 'Planned' ? 'Pending' : 'N/A'}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Showing 1-5 of 114 controls</span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="default" size="sm">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}